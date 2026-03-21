import { Bell, Search, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="mb-5 flex flex-wrap items-center gap-4">
      <div>
        <p className="text-sm text-zinc-400">Bem-vindo de volta, Mateus!</p>
        <h2 className="font-playfair text-4xl font-bold text-aurenGold lg:text-5xl">Dashboard</h2>
      </div>
      <div className="ml-auto flex w-full items-center gap-3 sm:w-auto">
        <label className="flex h-11 flex-1 items-center rounded-xl border border-aurenStroke bg-aurenCard px-3 sm:w-[320px]">
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
        <div className="h-10 w-10 rounded-full border border-aurenGold/50 bg-zinc-700" />
      </div>
    </header>
  );
}
