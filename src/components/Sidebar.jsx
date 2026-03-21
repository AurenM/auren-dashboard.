import { CircleHelp } from "lucide-react";
import { communityItems, menuItems } from "../data/dashboardData";

export default function Sidebar({ activeItem, onSelect }) {
  return (
    <aside className="w-full border-r border-aurenStroke bg-aurenCard p-5 lg:w-[260px]">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-aurenGold/25" />
        <h1 className="font-playfair text-2xl font-bold text-aurenGold">Auren</h1>
      </div>

      <p className="mb-3 text-xs uppercase tracking-[0.25em] text-aurenMuted">Ferramentas</p>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`menu-btn flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
              activeItem === item.id
                ? "bg-aurenGold/15 text-aurenGold"
                : "text-zinc-300 hover:text-aurenGold"
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <p className="mb-3 mt-8 text-xs uppercase tracking-[0.25em] text-aurenMuted">Comunidade</p>
      <div className="space-y-2">
        {communityItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className="menu-btn relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 hover:text-aurenGold"
          >
            <item.icon size={16} />
            <span>{item.label}</span>
            {item.hasNotification && <span className="absolute right-4 h-2 w-2 rounded-full bg-red-500" />}
          </button>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-aurenGold/40 bg-gradient-to-b from-[#2A2212] to-[#1A1711] p-4">
        <div className="mb-3 inline-flex rounded-xl bg-aurenGold/20 p-3 text-aurenGold">
          <CircleHelp size={20} />
        </div>
        <p className="text-base font-semibold text-aurenGold">Central de Ajuda</p>
        <p className="mt-2 text-xs text-zinc-300">Precisa de suporte com sua conta? Nosso time esta pronto para ajudar.</p>
        <button
          type="button"
          className="mt-4 w-full rounded-xl border border-aurenGold bg-aurenGold py-2 text-xs font-semibold text-[#121212] transition hover:brightness-110"
        >
          Ir para a Central de Ajuda
        </button>
      </div>
    </aside>
  );
}
