const ShimmerNews = () => {
  return (
      <>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="flex flex-col w-[90%] md:w-[30%] rounded-lg bg-slate-900 p-4">
            <div className="w-full h-48 bg-gray-500 animate-pulse rounded-t-lg"></div>
            <div className="my-3 px-2">
              <div className="bg-gray-500 h-4 w-full animate-pulse rounded mb-2"></div>
              <div className="bg-gray-500 h-4 w-3/4 animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </>
  )
}

export default ShimmerNews;