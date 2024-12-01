import { ArrowLeft, LogIn, ShieldX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
export default function UnAuthorizedPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-8 max-w-md">
        {/* Error Icon */}
        <div className="mx-auto w-24 h-24 rounded-full bg-red-100 flex items-center justify-center animate-pulse">
          <ShieldX className="w-12 h-12 text-red-600" aria-hidden="true" />
        </div>

        {/* Error Status */}
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Access Denied
          </h1>
          <p className="text-lg text-gray-600">
            Sorry, you don&apos;t have permission to access this resource.
          </p>
        </div>

        {/* Error Code */}
        <div className="flex items-center justify-center gap-x-2 text-sm text-gray-500">
          <span className="font-mono bg-gray-100 px-2 py-1 rounded">403</span>
          <span>Unauthorized Access</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back
          </button>
          <Link
            to="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Log in
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500">
          If you believe this is a mistake, please{' '}
          <Link
            to="/contact"
            className="font-medium text-red-600 hover:text-red-500 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            contact support
          </Link>
          .
        </p>
      </div>

      {/* Decorative Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] rounded-full bg-gradient-to-r from-red-50 to-orange-50 opacity-30 blur-3xl"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
