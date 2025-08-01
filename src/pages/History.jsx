import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Trash } from "lucide-react";

export default function History() {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("lookupHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (query) => {
    const updated = history.filter((entry) => entry.query !== query);
    setHistory(updated);
    localStorage.setItem("lookupHistory", JSON.stringify(updated));
  };

  const handleClearAll = () => {
    localStorage.removeItem("lookupHistory");
    setHistory([]);
  };

  const filtered = history.filter((entry) =>
    entry.query.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">📜 Lookup History</h1>

      <div className="flex items-center gap-2 mb-6">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search ENS or address..."
          className="flex-1 bg-white/10 backdrop-blur-md border border-white/10 text-white placeholder:text-slate-400 px-4 py-2 rounded-lg outline-none"
        />
        {history.length > 0 && (
          <button
            onClick={handleClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium flex items-center gap-2"
          >
            <Trash size={16} /> Clear All
          </button>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.length === 0 ? (
          <p className="text-slate-400">No matches found.</p>
        ) : (
          filtered.map((entry, idx) => (
            <motion.div
              key={entry.query}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="relative bg-white/5 p-5 rounded-xl border border-white/10 backdrop-blur shadow hover:scale-[1.02] transition"
            >
              <button
                onClick={() => handleDelete(entry.query)}
                className="absolute top-3 right-3 text-red-400 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={entry.avatar || "/avatar-placeholder.png"}
                  alt="avatar"
                  className="w-14 h-14 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h2 className="font-semibold text-lg">
                    {entry.name || entry.query}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {entry.address?.slice(0, 10)}...
                  </p>
                </div>
              </div>
              <div className="text-sm space-y-1">
                {entry.twitter && (
                  <p>
                    <span className="text-white font-medium">Twitter:</span> @{entry.twitter}
                  </p>
                )}
                {entry.website && (
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
                )}
                {entry.bio && (
                  <p>
                    <span className="text-white font-medium">Bio:</span> {entry.bio}
                  </p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
