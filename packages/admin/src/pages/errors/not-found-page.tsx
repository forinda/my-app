import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (<div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-12">
    <div className="text-center space-y-6 max-w-md">
      {/* Error Code */}
      <h1 className="text-9xl font-bold text-gray-900">
        <span className="sr-only">Error</span>
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">404</span>
      </h1>

      {/* Error Message */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900">Page not found</h2>
        <p className="text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
      </div>

      {/* Navigation Options */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
        >
          Go back home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Go back
        </button>
      </div>

      {/* Additional Help */}
      <p className="text-sm text-gray-500">
        Need help? {' '}
        <Link
          to="/contact"
          className="font-medium text-blue-600 hover:text-blue-500 underline"
        >
          Contact support
        </Link>
      </p>
    </div>

    {/* Decorative Elements */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] rounded-full bg-gradient-to-r from-blue-50 to-purple-50 opacity-30 blur-3xl" />
    </div>
  </div>
  )
}
