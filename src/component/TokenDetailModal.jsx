import React from "react";

const TokenDetailModal = ({selectedToken,setSelectedToken}) => {
  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative animate-fadeIn">
          <button
            onClick={() => setSelectedToken(null)}
            className="absolute top-3 right-4 text-gray-500 dark:text-gray-300 text-2xl hover:text-red-500 transition"
            aria-label="Close modal"
          >
            &times;
          </button>

          <div className="flex items-center gap-4 mb-5">
            <img
              src={selectedToken.image}
              alt={selectedToken.name}
              className="w-14 h-14 rounded-full border border-gray-200"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {selectedToken.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm uppercase">
                {selectedToken.symbol}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-gray-700 dark:text-gray-200">
            <p>
              <strong>💰 Price:</strong> $
              {selectedToken.current_price.toLocaleString()}
            </p>
            <p>
              <strong>🏦 Market Cap:</strong> $
              {selectedToken.market_cap.toLocaleString()}
            </p>
            <p>
              <strong>📈 24h Change:</strong>{" "}
              <span
                className={
                  selectedToken.price_change_percentage_24h >= 0
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {selectedToken.price_change_percentage_24h?.toFixed(2)}%
              </span>
            </p>
            <p>
              <strong>🚀 ATH:</strong> ${selectedToken.ath.toLocaleString()}
            </p>
            <p>
              <strong>📊 Total Volume:</strong> $
              {selectedToken.total_volume.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetailModal;
