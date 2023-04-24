import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center text-3xl mt-10">
      <h1 className="mt-20 mb-8 font-serif text-slate-500 sm:text-7xl md:text-9xl font-extrabold tracking-tighter">
        404
      </h1>
      <p className="font-mono">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="mt-10 hover:underline hover:text-cyan-700">
        <Link to="/">Back To Homepage</Link>
      </p>
    </div>
  );
};

export default ErrorPage;
