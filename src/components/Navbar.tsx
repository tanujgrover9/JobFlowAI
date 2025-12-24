import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const navItems = [
  { label: "Solution", href: "#solution" },
  { label: "Features", href: "#features" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Pricing", href: "#pricing" },
  { label: "Demo", href: "#demo" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "";

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = item.href;
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Main Bar */}
        <div className="flex items-center justify-between rounded-full bg-white/30 px-6 py-3 backdrop-blur-md border border-white/20">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="AutoApplyAI"
              className="w-10 h-10 object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 text-sm">
            {navItems.map((item) => {
              const isActive = active === item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`px-4 py-2 rounded-full transition
                    ${
                      isActive
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:bg-white/10"
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-5 py-2 text-sm font-semibold text-black hover:bg-lime-300 transition"
            >
              Free trial
              <span className="w-5 h-5 rounded-full bg-black text-lime-400 flex items-center justify-center text-xs">
                →
              </span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            {open ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="mt-3 md:hidden rounded-2xl bg-black/90 backdrop-blur-xl border border-white/10 overflow-hidden">

            <nav className="flex flex-col divide-y divide-white/10">
              {navItems.map((item) => {
                const isActive = active === item.href;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`px-6 py-4 transition
                      ${
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-white/80 hover:bg-white/5"
                      }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <div className="p-4">
              <a
                href="#pricing"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-medium text-black hover:bg-white/90 transition"
              >
                Start free trial →
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
