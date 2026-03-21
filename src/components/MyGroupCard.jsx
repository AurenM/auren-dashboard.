export default function MyGroupCard() {
  return (
    <article className="glass-card p-4">
      <div className="mb-5 flex items-center justify-between">
        <p className="text-lg font-semibold">Meu Grupo</p>
        <button type="button" className="text-xs text-zinc-400 hover:text-aurenGold">
          Ver tudo
        </button>
      </div>
      <p className="text-4xl font-semibold text-aurenGold">18</p>
      <p className="text-xs text-zinc-400">membros</p>
      <div className="mt-3 flex">
        {[0, 1, 2, 3].map((n) => (
          <div key={n} className="-mr-2 h-8 w-8 rounded-full border-2 border-aurenCard bg-zinc-500" />
        ))}
      </div>
      <p className="mt-6 text-sm">Pontos da Equipe</p>
      <p className="text-4xl font-semibold">+32</p>
      <div className="mt-3 grid h-16 grid-cols-7 items-end gap-1 rounded-xl bg-[#141414] p-2">
        {[38, 45, 30, 64, 70, 42, 55].map((value) => (
          <span key={value} className="rounded-full bg-aurenGold/90" style={{ height: `${value}%` }} />
        ))}
      </div>
    </article>
  );
}
