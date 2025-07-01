export default function ListSkeleton() {
  return (
    <div className="col-span-8 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto animate-pulse">
      {/* Skeleton for Title */}
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>

      <div className="space-y-4">
        {/* Skeleton for a single cart item - repeat this for a few items */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48"></div>
              </div>
              <div className="flex gap-2">
                <div className="h-5 bg-gray-200 rounded w-12"></div>
                <div className="h-5 bg-gray-200 rounded w-16"></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-4">
              <div>
                <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-24"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-20"></div>
              </div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-5 bg-gray-200 rounded w-8"></div>
              </div>
            </div>

            <div>
              <div className="h-4 bg-gray-200 rounded w-40 mb-2"></div>
              <div className="bg-gray-100 rounded-lg p-3 h-24"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
