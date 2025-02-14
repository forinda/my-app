/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouteError, Link } from 'react-router-dom';

export default function BaseErrorPage() {
  const error = useRouteError() as any;
  const reset = () => window.location.reload();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-6 max-w-md">
        {/* Error Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Something went wrong!
          </h1>
          <p className="text-gray-600">
            {error.message ||
              'An unexpected error occurred. Please try again later.'}
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500">
              Error ID: <span className="font-mono">{error.digest}</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            Try again
          </button>
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Go back home
          </Link>
        </div>

        {/* Support Link */}
        <p className="text-sm text-gray-500">
          If the problem persists, please{' '}
          <Link
            to="/contact"
            className="font-medium text-red-600 hover:text-red-500 underline"
          >
            contact support
          </Link>
        </p>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] rounded-full bg-gradient-to-r from-red-50 to-orange-50 opacity-30 blur-3xl" />
      </div>
    </div>
  );
}
