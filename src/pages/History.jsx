import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function History() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lookupHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const filtered = history.filter((entry) =>
    entry.query.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📜 Lookup History</h1>

      <div className="mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ENS or address..."
          className="w-full bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-400 px-4 py-2 rounded-lg outline-none"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <p className="text-slate-400">No matches found.</p>
        ) : (
          filtered.map((entry, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur shadow hover:scale-[1.02] transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={entry.avatar}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h2 className="font-semibold text-lg">{entry.name}</h2>
                  <p className="text-slate-400 text-sm">{entry.address.slice(0, 10)}...</p>
                </div>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="text-white font-medium">Twitter:</span> {entry.twitter}</p>
                <p>
                  <span className="text-white font-medium">Website:</span>{" "}
                  <a
                    href={entry.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-300 hover:underline"
                  >
                    {entry.website}
                  </a>
                </p>
                <p><span className="text-white font-medium">Bio:</span> {entry.bio}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
