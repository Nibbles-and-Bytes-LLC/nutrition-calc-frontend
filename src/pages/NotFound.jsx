import React from 'react';


const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
            <a
                href="/"
                className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition"
            >
                Go Home
            </a>
        </div>
    );
};

export default NotFound;