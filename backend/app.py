from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import faiss
import numpy as np
import os
import logging
from groq import Groq
from sentence_transformers import SentenceTransformer
from transformers import pipeline

sentiment_analyzer = pipeline("sentiment-analysis")

# Setup logging
logging.basicConfig(level=logging.ERROR)

app = Flask(__name__)
CORS(app)

# Database configuration (SQLite for simplicity)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database
db = SQLAlchemy(app)

# GROQ API Setup
os.environ['GROQ_API_KEY'] = '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'
client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

# Sentence Transformer model for embeddings
model = SentenceTransformer('all-MiniLM-L6-v2')
embedding_size = model.get_sentence_embedding_dimension()
faiss_index = faiss.IndexFlatL2(embedding_size)

# In-memory storage
stored_messages = []
stored_interactions = {}

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)

# Create the database
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    return "Flask server is running!"

# ====================== AUTH ROUTES ======================

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and Password are required'}), 400

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        return jsonify({'message': 'Login successful!', 'token': 'dummy_token'}), 200
    else:
        return jsonify({'message': 'Invalid email or password. Please sign up first.'}), 401

@app.route('/signin', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Email and Password are required'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'message': 'User already exists. Please log in.'}), 400

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@app.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [{'id': user.id, 'email': user.email, 'password': user.password} for user in users]
    return jsonify(users_list), 200

# ====================== CONTACT ROUTES ======================

@app.route('/contact', methods=['POST'])
def contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    message = data.get('message')

    if not name or not email or not message:
        return jsonify({'message': 'All fields are required'}), 400

    new_message = Message(name=name, email=email, message=message)
    db.session.add(new_message)
    db.session.commit()

    return jsonify({'message': 'Message sent successfully'}), 201

@app.route('/messages', methods=['GET'])
def get_messages():
    messages = Message.query.all()
    messages_list = [{'id': msg.id, 'name': msg.name, 'email': msg.email, 'message': msg.message} for msg in messages]
    return jsonify(messages_list), 200

# ====================== SENTIMENT ANALYSIS ======================

def store_message(message, response):
    embedding = model.encode([message]).astype(np.float32)
    faiss_index.add(embedding)
    stored_messages.append({"message": message, "response": response})

def retrieve_similar_messages(message, top_k=3):
    if len(stored_messages) == 0:
        return []
    embedding = model.encode([message]).astype(np.float32)
    _, indices = faiss_index.search(embedding, top_k)
    return [stored_messages[i] for i in indices[0] if i < len(stored_messages)]

def analyze_sentiment(message, conversation_history=[]):
    retrieved_context = retrieve_similar_messages(message)
    messages = [{"role": "system", "content": "You analyze customer messages for sentiment. Classify sentiment as Positive, Neutral, or Negative."}]
    for item in retrieved_context:
        messages.append({"role": "user", "content": f"Past message: {item['message']}"})
        messages.append({"role": "assistant", "content": f"Past sentiment: {item['response']}"})
    messages.append({"role": "user", "content": message})
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=messages,
        max_tokens=150,
        temperature=0.7
    )
    sentiment = response.choices[0].message.content.strip()
    conversation_history.append({"role": "assistant", "content": sentiment})
    return sentiment

# ====================== COMMUNICATION QUALITY ======================

def store_interaction(business_type, customer_id, customer_message, business_response, feedback):
    if business_type not in stored_interactions:
        stored_interactions[business_type] = {}
    if customer_id not in stored_interactions[business_type]:
        stored_interactions[business_type][customer_id] = []
    embedding = model.encode([customer_message]).astype(np.float32)
    faiss_index.add(embedding)
    stored_interactions[business_type][customer_id].append({
        "customer_message": customer_message,
        "business_response": business_response,
        "feedback": feedback
    })

def retrieve_similar_interactions(customer_message, business_type, customer_id, top_k=3):
    if business_type not in stored_interactions or customer_id not in stored_interactions[business_type] or len(stored_interactions[business_type][customer_id]) == 0:
        return []
    embedding = model.encode([customer_message]).astype(np.float32)
    _, indices = faiss_index.search(embedding, top_k)
    return [stored_interactions[business_type][customer_id][i] for i in indices[0] if i < len(stored_interactions[business_type][customer_id])]

def get_business_specific_guidelines(business_type):
    guidelines = {
        "e-commerce": "Evaluate clarity, product information accuracy, and customer engagement. Empathy and promotional opportunities are key.",
        "finance": "Ensure responses are professional, clear, and secure. Avoid misleading statements and maintain regulatory compliance.",
        "healthcare": "Prioritize empathy, medical accuracy, and confidentiality. Use a reassuring and professional tone.",
        "tech support": "Assess technical clarity, troubleshooting effectiveness, and patience. Ensure step-by-step guidance is provided."
    }
    return guidelines.get(business_type, "Use general communication best practices.")

def evaluate_communication_quality(business_type, customer_id, customer_message, business_response):
    retrieved_context = retrieve_similar_interactions(customer_message, business_type, customer_id, top_k=5)
    business_guidelines = get_business_specific_guidelines(business_type)
    messages = [{"role": "system", "content": f"You are an expert in evaluating business communication quality. {business_guidelines} Rate the business response on clarity, empathy, and effectiveness. Identify mistakes and suggest improvements. Ensure responses align with industry-specific communication standards."}]
    for item in retrieved_context:
        messages.append({"role": "user", "content": f"Past customer message: {item['customer_message']}"})
        messages.append({"role": "assistant", "content": f"Past business response: {item['business_response']}"})
        messages.append({"role": "assistant", "content": f"Feedback on past response: {item['feedback']}"})
    messages.append({"role": "user", "content": f"Business Type: {business_type}\nCustomer ID: {customer_id}\nCustomer Message: '{customer_message}'\nBusiness Response: '{business_response}'\nEvaluate the response based on clarity, empathy, and effectiveness. Provide a rating from 1-10 and identify specific mistakes with actionable improvement suggestions."})
    response = client.chat.completions.create(
        model="llama3-8b-8192",
        messages=messages,
        max_tokens=300,
        temperature=0.7
    )
    feedback = response.choices[0].message.content.strip()
    store_interaction(business_type, customer_id, customer_message, business_response, feedback)
    return feedback

# ====================== CUSTOMER JOURNEY ======================

def analyze_customer_journey(business_type, customer_id, conversations):
    journey_analysis = []
    for i, (customer_message, business_response) in enumerate(conversations):
        if i == 0:
            feedback = "Initial interaction. Respond with empathy and clarity."
        else:
            feedback = evaluate_communication_quality(business_type, customer_id, customer_message, business_response)
        journey_analysis.append({
            "interaction": i+1,
            "customer_message": customer_message,
            "business_response": business_response,
            "feedback": feedback
        })
    return journey_analysis

@app.route('/evaluate-communication', methods=['POST'])
def evaluate_communication_route():
    data = request.json
    required_fields = ['business_type', 'customer_id', 'customer_message', 'business_response']

    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        feedback = evaluate_communication_quality(
            data['business_type'],
            data['customer_id'],
            data['customer_message'],
            data['business_response']
        )
        return jsonify({'evaluation': feedback}), 200
    except Exception as e:
        app.logger.error(f"Error evaluating communication: {e}", exc_info=True)
        return jsonify({'error': 'An error occurred while evaluating communication'}), 500

@app.route('/analyze-journey', methods=['POST'])
def analyze_journey():
    data = request.get_json()
    if not all(key in data for key in ['business_type', 'customer_id', 'conversations']):
        return jsonify({"error": "Missing required fields"}), 400

    try:
        result = analyze_customer_journey(
            data['business_type'],
            data['customer_id'],
            data['conversations']
        )
        return jsonify({"summary": result}), 200
    except Exception as e:
        app.logger.error(f"Error analyzing journey: {e}", exc_info=True)
        return jsonify({"error": "An error occurred during journey analysis"}), 500

# ====================== MAIN ======================

if __name__ == '__main__':
    app.run(debug=True)
