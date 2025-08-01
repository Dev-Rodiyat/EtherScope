export default function Home() {
  return (
    <div className="space-y-32">
      <section className="relative bg-gradient-to-b from-[#0c0c0c]/90 to-black text-white py-24 px-4 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Explore Ethereum Identities
          </h1>
          <p className="text-slate-300 text-lg mt-4">
            EtherScope lets you discover ENS names, wallet details, and profiles - beautifully and instantly.
          </p>
          <a
            href="/lookup"
            className="inline-block mt-8 px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-lg hover:bg-white/20 transition font-semibold"
          >
            🔍 Start Lookup
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">🔑 Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "ENS → Wallet Address",
              desc: "Enter any .eth name and get its Ethereum wallet address.",
            },
            {
              title: "Wallet → ENS Name",
              desc: "Paste a wallet address to find the reverse ENS record.",
            },
            {
              title: "Profile Metadata",
              desc: "Discover ENS-linked profile data like avatars and Twitter handles.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md text-white shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">{f.title}</h3>
              <p className="text-slate-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">📦 How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Enter Name or Address",
              desc: "Type in any ENS name like vitalik.eth or a wallet address.",
            },
            {
              step: "2",
              title: "We Resolve It",
              desc: "We query the Ethereum blockchain to resolve identity data.",
            },
            {
              step: "3",
              title: "View Profile",
              desc: "Get results with ENS name, wallet, and profile metadata instantly.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md text-white shadow-md hover:shadow-xl transition"
            >
              <div className="text-cyan-300 text-2xl font-bold mb-2">Step {item.step}</div>
              <h4 className="text-lg font-semibold mb-1">{item.title}</h4>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative text-center py-20 px-4 bg-gradient-to-r from-[#0f0f1f]/80 to-[#151515]/80 rounded-3xl backdrop-blur-xl border border-white/10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to explore Ethereum identities?
        </h2>
        <a
          href="/lookup"
          className="inline-block px-8 py-3 rounded-full bg-white/10 border border-white/20 text-white font-semibold backdrop-blur-md hover:bg-white/20 transition"
        >
          🔍 Start Exploring Now
        </a>
      </section>
    </div>
  );
}