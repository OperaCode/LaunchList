import React from 'react'

const SideBar = ({trending}) => {
  return (
    <div>
      <aside className="bg-white shadow-lg rounded-xl p-4 w-full lg:w-64 sticky top-8 h-fit max-h-[80vh] overflow-y-auto">
            <div className="items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-600 text-center p-2">
                🔥 Trending Coins
              </h2>
              <h3 className="text-center">
                {" "}
                Based on search popularity on CoinGecko in the last 24 hours.
              </h3>
            </div>

            {trending.length === 0 ? (
              <p className="text-sm text-gray-500">Loading trending coins...</p>
            ) : (
              trending.map(({ item }, index) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 mb-3 hover:bg-gray-50 p-2 rounded-lg transition"
                >
                  <span className="text-sm font-bold text-gray-600 w-5">
                    {index + 1}.
                  </span>
                  <img
                    src={item.thumb}
                    alt={item.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium">
                      {item.name}{" "}
                      <span className="text-gray-500">
                        ({item.symbol.toUpperCase()})
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">Rank: #{index + 1}</p>
                  </div>
                </div>
              ))
            )}
          </aside>
    </div>
  )
}

export default SideBar
