import React from 'react'
import { RocketLaunchIcon, ArrowRightIcon } from "@heroicons/react/24/solid";



const Landing = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <RocketLaunchIcon className="h-6 w-6 text-blue-600" />
            LaunchList
          </h1>
          <Link
            to="/projects"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Explore Projects
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-100 to-blue-200 py-20 px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Discover the Next Big Thing in Web3</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Stay ahead of the curve by tracking live token launches, IDOs, and ICOs across top launchpads. Powered by real-time data from CoinMarketCap and CryptoRank.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          View Upcoming Launches <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </section>

      {/* Features */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h3 className="text-2xl font-bold text-center mb-10">Why Use LaunchList?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-bold mb-2">Live Token Sales</h4>
            <p>Track verified upcoming ICOs, IDOs, and private rounds from trusted sources.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-bold mb-2">Multi-Chain Insights</h4>
            <p>Discover new projects across Ethereum, Solana, BNB Chain, and more.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h4 className="font-bold mb-2">Launchpad Filters</h4>
            <p>Easily filter projects by launchpad, category, or raise amount.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-sm text-gray-500 border-t">
        &copy; {new Date().getFullYear()} LaunchList. Built for Web3 explorers.
      </footer>
    </div>
  );
}

export default Landing
