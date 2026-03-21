import { CircleHelp, X } from "lucide-react";
import { communityItems, menuItems } from "../data/dashboardData";

export default function Sidebar({ activeItem, onSelect, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-[260px] border-r border-aurenStroke bg-aurenCard p-5
          flex flex-col justify-between transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex md:flex-shrink-0
        `}
      >
        {/* Container Superior: Logo e Menus */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-aurenGold/25 shadow-[0_0_15px_rgba(212,175,55,0.2)]" />
              <h1 className="font-playfair text-2xl font-bold text-aurenGold tracking-tight italic">Auren</h1>
            </div>
            {/* Close button visible only on mobile */}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1 text-zinc-400 hover:text-aurenGold md:hidden"
            >
              <X size={20} />
            </button>
          </div>

          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-aurenMuted font-medium font-poppins">Ferramentas</p>
          <nav className="space-y-1.5 mb-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onSelect(item.id); onClose(); }}
                className={`menu-btn flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-aurenGold/15 text-aurenGold shadow-sm"
                    : "text-zinc-400 hover:text-aurenGold hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span className="font-poppins">{item.label}</span>
              </button>
            ))}
          </nav>

          <p className="mb-3 text-[10px] uppercase tracking-[0.25em] text-aurenMuted font-medium font-poppins">Comunidade</p>
          <nav className="space-y-1.5">
            {communityItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => { onSelect(item.id); onClose(); }}
                className={`menu-btn relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                  activeItem === item.id
                    ? "bg-aurenGold/15 text-aurenGold"
                    : "text-zinc-400 hover:text-aurenGold hover:bg-white/5"
                }`}
              >
                <item.icon size={18} />
                <span className="font-poppins">{item.label}</span>
                {item.hasNotification && (
                  <span className="absolute right-4 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Central de Ajuda */}
        <div className="mt-auto pt-6">
          <div className="rounded-2xl border border-aurenGold/20 bg-gradient-to-b from-[#2A2212]/40 to-transparent p-4 backdrop-blur-sm">
            <div className="mb-3 inline-flex rounded-xl bg-aurenGold/20 p-2.5 text-aurenGold">
              <CircleHelp size={20} />
            </div>
            <p className="font-poppins text-sm font-semibold text-aurenGold">Central de Ajuda</p>
            <p className="mt-2 font-poppins text-[11px] leading-relaxed text-zinc-400">
              Precisa de suporte com sua conta? Nosso time está pronto para ajudar.
            </p>
            <button
              type="button"
              className="mt-4 w-full rounded-xl bg-aurenGold py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#121212] transition hover:brightness-110 shadow-lg shadow-aurenGold/10"
            >
              Ir para a Central
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
