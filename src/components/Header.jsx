import { Bell, Menu, Search, Settings } from "lucide-react";

export default function Header({ onMenuOpen, title = "Dashboard" }) {
  return (
    <header className="mb-5 flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3">
        {/* Hamburger — visible only on mobile */}
        <button
          type="button"
          onClick={onMenuOpen}
          className="rounded-xl border border-aurenStroke bg-aurenCard p-2.5 hover:text-aurenGold md:hidden"
          aria-label="Abrir menu"
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-sm text-zinc-400">Bem-vindo de volta, Mateus!</p>
          <h2 className="font-playfair text-3xl font-bold text-aurenGold sm:text-4xl lg:text-5xl">{title}</h2>
        </div>
      </div>
      <div className="ml-auto flex w-full items-center gap-3 sm:w-auto">
        <label className="flex h-11 flex-1 items-center rounded-xl border border-aurenStroke bg-aurenCard px-3 sm:w-[280px] lg:w-[320px]">
          <input
            className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
            placeholder="O que voce quer encontrar?"
          />
          <Search size={16} className="text-aurenGold" />
        </label>
        <button type="button" className="rounded-xl border border-aurenStroke bg-aurenCard p-2.5 hover:text-aurenGold">
          <Settings size={16} />
        </button>
        <button type="button" className="rounded-xl border border-aurenStroke bg-aurenCard p-2.5 hover:text-aurenGold">
          <Bell size={16} />
        </button>
        <div className="h-10 w-10 flex-shrink-0 rounded-full border border-aurenGold/50 bg-zinc-700" />
      </div>
    </header>
  );
}
