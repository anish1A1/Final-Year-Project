"use client";
import { useState } from "react";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-72">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for something..."
          className="w-full pl-10 pr-10 py-2 border rounded-full shadow-md 
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition duration-300 ease-in-out"
        />
        {/* Search Icon */}
        <Image
          src="/SearchIcon.png"
          alt="Search"
          width={20}
          height={20}
          className="absolute left-3 top-2.5 opacity-60"
        />
        {/* Clear (×) Button */}
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700
                       transition duration-200 ease-in-out"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
}
