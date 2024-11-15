import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import React from 'react';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Toaster/>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
