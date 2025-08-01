const faqs = [
  {
    q: "What is EtherScope?",
    a: "EtherScope is a frontend-only Web3 tool that lets you explore Ethereum identities using ENS names or wallet addresses.",
  },
  {
    q: "Do I need to connect my wallet?",
    a: "No, EtherScope is completely read-only. You don’t need to connect a wallet to use it.",
  },
  {
    q: "Which chains are supported?",
    a: "We currently support Ethereum mainnet via ENS. Multichain support is on the roadmap.",
  },
  {
    q: "Where does the data come from?",
    a: "We use public blockchain APIs such as Alchemy and Ethers.js to resolve identities and metadata."
  }
];

export default function About() {

  return (
    <div className="space-y-24 md:pt-12 pt-6">
      {/* About Us */}
      <section className="max-w-4xl mx-auto px-4 text-white text-center">
        <h1 className="text-4xl font-bold mb-4">🧠 About EtherScope</h1>
        <p className="text-slate-300 text-lg">
          EtherScope is a futuristic tool for navigating the world of Ethereum identities. It’s fast, intuitive, and fully frontend-based - powered by public APIs.
        </p>
      </section>

      {/* Our Mission */}
      <section className="max-w-5xl mx-auto px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">🚀 Our Mission</h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          We believe everyone should have seamless access to blockchain identity data. Our mission is to make ENS resolution simple, beautiful, and accessible for all.
        </p>
      </section>

      {/* Why Us */}
      <section className="max-w-6xl mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">✨ Why Choose EtherScope</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            "Frontend-only — no backend needed.",
            "Clean and modern UI with glassy Web3 vibes.",
            "Instant ENS + wallet resolution.",
            "Free and open — no wallet required.",
            "Powered by Ethereum APIs.",
            "Responsive and mobile-ready."
          ].map((reason, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur text-white text-sm shadow hover:shadow-lg transition"
            >
              ✅ {reason}
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md hover:shadow transition"
            >
              <summary className="cursor-pointer text-cyan-300 font-medium">{faq.q}</summary>
              <p className="mt-2 text-slate-300 text-sm">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
