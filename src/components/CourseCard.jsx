import { Flame, MoreHorizontal } from "lucide-react";
import { leadDestaque } from "../data/dashboardData";

export default function CourseCard() {
  const temperaturaStyle = {
    Hot: {
      label: "Quente",
      borderColor: "rgba(212, 175, 55, 0.12)",
      glow: "0 0 0 1px rgba(38, 38, 38, 0.9)",
      badge: "bg-white/10 text-white border border-white/20 backdrop-blur-md font-bold",
    },
    Warm: {
      label: "Warm",
      borderColor: "rgba(212, 175, 55, 0.75)",
      glow: "0 0 0 1px rgba(212, 175, 55, 0.45), 0 0 24px rgba(212, 175, 55, 0.2)",
      badge: "bg-aurenGold/20 text-aurenGold border border-aurenGold/40",
    },
    Cold: {
      label: "Cold",
      borderColor: "rgba(96, 165, 250, 0.75)",
      glow: "0 0 0 1px rgba(96, 165, 250, 0.4), 0 0 24px rgba(96, 165, 250, 0.2)",
      badge: "bg-sky-500/20 text-sky-300 border border-sky-400/40",
    },
  };

  const current = temperaturaStyle[leadDestaque.temperatura] ?? temperaturaStyle.Warm;

  return (
    <article className="glass-card p-4">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-2xl font-semibold text-aurenGold">Lead em Destaque</p>
          <p className="text-xs text-zinc-400">Continuar</p>
        </div>
        <button type="button" className="rounded-lg p-1 hover:bg-aurenGold/10 hover:text-aurenGold">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div
        className="rounded-2xl border bg-[#141414] p-3"
        style={{ borderColor: current.borderColor, boxShadow: current.glow }}
      >
        <div className="flex min-h-[72px] items-center gap-3">
          <div className="h-11 w-11 rounded-lg bg-aurenGold/20" />
          <div className="flex min-h-[52px] flex-col justify-center">
            <p className="text-sm font-medium">{leadDestaque.nome}</p>
            <p className="text-xs text-zinc-400">{leadDestaque.segmento}</p>
          </div>
          <span
            className={`badge-shimmer ml-auto inline-flex items-center gap-1.5 overflow-hidden rounded-full px-2.5 py-1 text-[10px] ${current.badge}`}
          >
            <Flame size={11} color="#C41E3A" />
            <span className="tracking-[0.08em]">Quente</span>
          </span>
        </div>
        <div className="mt-3 grid min-h-[44px] grid-cols-3 items-center gap-2 text-[11px] text-zinc-300">
          <span className="rounded-lg bg-zinc-900/80 px-2 py-1">Interações: {leadDestaque.interacoes}</span>
          <span className="rounded-lg bg-zinc-900/80 px-2 py-1">Entrada: {leadDestaque.dataEntrada}</span>
          <span className="rounded-lg bg-zinc-900/80 px-2 py-1">{leadDestaque.ultimaAcao}</span>
        </div>
      </div>
    </article>
  );
}
