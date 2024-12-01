export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Loading Container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Primary Spinner */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 rounded-full border-4 border-gray-200">
            {/* Inner spinner */}
            <div className="absolute top-0 left-0 w-24 h-24 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          </div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 w-4 h-4 -ml-2 -mt-2 rounded-full bg-blue-600 animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="space-y-3 text-center">
          <h2
            className="text-xl font-semibold text-gray-900"
            aria-live="polite"
          >
            Loading
          </h2>
          <p className="text-sm text-gray-500 animate-pulse" aria-hidden="true">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Progress Bar */}
        <div
          className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-label="Loading progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={75}
        >
          <div className="h-full bg-blue-600 rounded-full animate-progress" />
        </div>
      </div>

      {/* Background Decoration */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-[50%] top-0 h-[1000px] w-[1000px] -translate-x-[50%] rounded-full bg-gradient-to-r from-blue-50 to-gray-50 opacity-30 blur-3xl" />
      </div>

      {/* Add keyframes for progress animation */}
      {/* <style jsx global>{`

      `}</style> */}
    </div>
  );
}
