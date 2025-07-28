import React, { useEffect, useState } from "react";
import axios from "axios";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Home = () => {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [trending, setTrending] = useState([]);
  const [sortKey, setSortKey] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [selectedToken, setSelectedToken] = useState(null);

  const fetchTokens = async (reset = false) => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: sortKey,
            per_page: 12,
            page: reset ? 1 : page,
            sparkline: false,
          },
        }
      );
      setTokens((prev) => (reset ? res.data : [...prev, ...res.data]));
    } catch (err) {
      setError("Failed to fetch tokens. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchNewTokens = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 20,
            page: 1,
            sparkline: false,
          },
        }
      );
      setTokens(res.data);
    } catch (err) {
      setError("Failed to fetch tokens. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchTrending = async () => {
    try {
      const res = await axios.get(
        "https://api.coingecko.com/api/v3/search/trending"
      );
      setTrending(res.data.coins);
    } catch (err) {
      console.error("Failed to fetch trending coins", err);
    }
  };

  useEffect(() => {
    fetchNewTokens();
    fetchTrending();
  }, []);

  useEffect(() => {
    setPage(1);
    fetchTokens(true);
  }, [sortKey]);

  useEffect(() => {
    if (page > 1) fetchTokens();
  }, [page]);

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(search.toLowerCase()) ||
      token.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      {/* Header */}
      <header className="flex items-center bg-blue-700 justify-between p-6 rounded-xl shadow text-white mb-6">
        <h1 className="text-2xl font-bold">🧊 MarketMint</h1>
        <Link to="/home">
          <button className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
            <RocketLaunchIcon className="w-5 h-5" />
            Launch Dashboard
          </button>
        </Link>
      </header>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          🚀 Crypto Launch Tracker
        </h1>

        {/* Search, Filter, Refresh */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or symbol"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/3 px-4 py-2 border rounded-xl shadow-sm"
          />

          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value)}
            className="px-4 py-2 rounded-xl shadow-sm"
          >
            <option value="market_cap_desc">Sort by Market Cap</option>
            <option value="volume_desc">Sort by Volume</option>
            <option value="id_asc">Sort by Name (A-Z)</option>
            <option value="gecko_desc">Sort by Trending</option>
            <option value="price_change_percentage_24h_desc">
              Sort by 24h % Gain
            </option>
          </select>

          <button
            onClick={() => fetchTokens(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            🔄 Refresh
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Tokens List */}
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

          {/* Sidebar */}
          <aside className="bg-white shadow-lg rounded-xl p-4 w-full lg:w-64 sticky top-8 h-fit max-h-[80vh] overflow-y-auto">
           

            <div className="items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-blue-600 text-center p-2">
                🔥 Trending Coins
              </h2>
              <h3 className="text-center"> Based on search popularity on CoinGecko in the last 24 hours.</h3>
              
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

        {/* Token Details Modal */}
        {selectedToken && (
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
        )}
      </div>
    </div>
  );
};

export default Home;
