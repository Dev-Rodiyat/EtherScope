export default function Footer() {
  return (
    <footer className="bg-[#0f0f1f] text-slate-400 py-6 mt-10 text-center text-sm">
      © {new Date().getFullYear()} EtherScope. All rights reserved.
    </footer>
  );
}
