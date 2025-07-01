export default function CatalogsSkeleton() {
  return (
    <div className="col-span-4">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 animate-pulse">
        {/* Skeleton for Title */}
        <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>

        <div className="space-y-4">
          {/* Skeleton for Name Input */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-10 bg-gray-200 rounded w-full"></div>
          </div>

          {/* Skeleton for Notes Textarea */}
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-20 bg-gray-200 rounded w-full"></div>
          </div>

          {/* Skeleton for Button */}
          <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
        </div>
      </div>
    </div>
  );
}
