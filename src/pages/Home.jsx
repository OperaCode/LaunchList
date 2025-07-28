import React, { useEffect, useState } from "react";
import axios from "axios";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import TokenList from "../component/TokenList";
import SideBar from "../component/SideBar";
import TokenDetailModal from "../component/TokenDetailModal";

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
        <Link to="/">
          <button className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition">
            <RocketLaunchIcon className="w-5 h-5" />
            Go Back
          </button>
        </Link>
      </header>

      <main className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
          🚀 Market Mint Dasboard
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
          <TokenList
            loading={loading}
            tokens={tokens}
            filteredTokens={filteredTokens}
            setSelectedToken={setSelectedToken}
            setPage={setPage}
            error={error}
          />

          {/* Sidebar */}
          <SideBar trending={trending} />
        </div>

        {/* Token Details Modal */}
        {selectedToken && (
          <TokenDetailModal
            selectedToken={selectedToken}
            setSelectedToken={setSelectedToken}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
