export default function ListSkeleton() {
  return (
    <div className="col-span-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto animate-pulse">
      {/* Skeleton for Title */}
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-6"></div>

      <div className="min-w-full divide-y divide-gray-200">
        {/* Skeleton for Table Head */}
        <div className="bg-gray-50">
          <div className="flex justify-between px-6 py-3">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
            <div className="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>

        {/* Skeleton for Table Body */}
        <div className="bg-white divide-y divide-gray-200">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center w-1/4">
                <div className="h-10 w-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
              <div className="w-1/6">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
              <div className="w-1/6">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="w-1/6 flex justify-end gap-4">
                <div className="h-4 bg-gray-300 rounded w-12"></div>
                <div className="h-4 bg-gray-300 rounded w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
