import { Suspense } from 'react';

import Signin from '../components/Signin/Signin';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>  
     <Signin/>
    </Suspense>
  );
}
