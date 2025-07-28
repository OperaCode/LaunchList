import React from 'react'

const TokenList = ({loading, tokens, filteredTokens, setSelectedToken, error}) => {
  return (
    <div>
      <div className="flex-1">
            {loading && tokens.length === 0 ? (
              <p className="text-center text-gray-500">Loading tokens...</p>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTokens.map((token) => (
                    <div
                      key={token.id}
                      onClick={() => setSelectedToken(token)}
                      className="cursor-pointer bg-white rounded-xl shadow p-4 flex items-center space-x-4 hover:shadow-md transition"
                    >
                      <img
                        src={token.image}
                        alt={token.name}
                        className="w-12 h-12"
                      />
                      <div>
                        <h2 className="text-lg font-semibold">
                          {token.name} ({token.symbol.toUpperCase()})
                        </h2>
                        <p className="text-sm text-gray-600">
                          💲Price: ${token.current_price.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600">
                          📈 24h Change:{" "}
                          <span
                            className={
                              token.price_change_percentage_24h >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {token.price_change_percentage_24h?.toFixed(2)}%
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          🏦 Market Cap: ${token.market_cap.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    className="bg-gray-800 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-700"
                  >
                    Load More
                  </button>
                </div>
              </>
            )}
          </div>
    </div>
  )
}

export default TokenList
