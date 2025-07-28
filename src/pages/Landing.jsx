import React from "react";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const features = [
  {
    title: "Live Market Data",
    description: "Access real-time prices, market cap, and 24-hour performance.",
    icon: "📊",
  },
  {
    title: "Trending Coins",
    description: "Explore what’s hot — updated daily from global search trends.",
    icon: "🔥",
  },
  {
    title: "Smart Sorting",
    description: "Filter tokens by volume, gains, or name to find what matters.",
    icon: "⚙️",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="flex items-center bg-blue-700 justify-between p-6 mx-auto">
        <h1 className="text-2xl text-white font-bold">🌿 MarketMint</h1>
        <Link to="/home">
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-white font-medium flex items-center gap-2">
            <RocketLaunchIcon className="w-5 h-5" />
            Launch Dashboard
          </button>
        </Link>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Mint the Market. Track Crypto Trends Instantly.
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Discover live market data, follow trending coins, and spot the next crypto breakout — all in one place.
          </p>
          <Link
            to="/home"
            className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-gray-100 transition"
          >
            Enter App →
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Why MarketMint?</h2>
          <p className="text-gray-600 mb-10">
            MarketMint pulls fresh data from CoinGecko so you're always in sync with the crypto pulse.
          </p>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">See What's Trending 🔍</h2>
          <p className="text-gray-600 mb-6">
            Get a live snapshot of top searched coins and market movers — powered by real-time data.
          </p>
          <Link
            to="/home"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium shadow hover:bg-blue-700 transition"
          >
            Start Exploring →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 text-center py-6 mt-10 border-t">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} MarketMint — Crafted with 💡 & 💻
        </p>
      </footer>
    </div>
  );
};

export default Landing;
