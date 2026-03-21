import { melhoresClientes } from "../data/dashboardData";
import { useState } from "react";

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function AvatarCircle({ src, initials }) {
  const [hasError, setHasError] = useState(false);

  if (src && !hasError) {
    return (
      <img
        src={src}
        alt={initials}
        className="mb-4 h-10 w-10 rounded-full border border-aurenGold/50 object-cover"
        onError={() => setHasError(true)}
      />
    );
  }

  return (
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-aurenGold text-xs font-bold text-aurenGold">
      {initials}
    </div>
  );
}

export default function InboxCard() {
  return (
    <article className="glass-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xl font-semibold text-aurenGold">Melhores Clientes</p>
        <button type="button" className="text-xs text-zinc-400 hover:text-aurenGold">
          Ver tudo
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {melhoresClientes.map((cliente) => (
          <button
            key={cliente.id}
            type="button"
            className="rounded-2xl border border-aurenStroke bg-[#141414] p-3 text-left transition hover:border-aurenGold/70"
          >
            <AvatarCircle src={cliente.avatarUrl} initials={cliente.avatar} />
            <p className="text-sm font-medium">{cliente.nome}</p>
            <p className="mt-1 text-xs text-zinc-400">Base: {cliente.tempoNaBase}</p>
            <p className="mt-1 text-xs text-zinc-400">Compras: {cliente.comprasRealizadas}</p>
            <p className="mt-2 font-poppins text-sm font-medium text-aurenGold">
              Faturamento: {formatCurrency(cliente.faturamentoGerado)}
            </p>
            <p className="mt-1 font-poppins text-sm font-medium text-emerald-300">
              Lucro real: {formatCurrency(cliente.lucroReal)}
            </p>
          </button>
        ))}
      </div>
    </article>
  );
}
