import { Suspense } from 'react';


import Login from '../components/Login/Login';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>  
     <Login/>
    </Suspense>
  );
}
