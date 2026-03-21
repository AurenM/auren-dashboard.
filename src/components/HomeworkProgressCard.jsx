import { useMemo, useState } from "react";
import { statusAbordagemEtapas } from "../data/dashboardData";

function ProgressRing({ value, color }) {
  const size = 48;
  const stroke = 5;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative grid h-12 w-12 place-items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#2C2C2C" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 550ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <span className="absolute text-[10px] font-semibold">{value}%</span>
    </div>
  );
}

export default function HomeworkProgressCard() {
  const [filtro, setFiltro] = useState("dia");

  const listaEtapas = useMemo(() => {
    return statusAbordagemEtapas.map((item) => ({
      ...item,
      progresso: filtro === "dia" ? item.progressoDia : item.progressoSemana,
    }));
  }, [filtro]);

  return (
    <article className="glass-card p-4">
      <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-3 flex items-center justify-between border-b border-aurenStroke bg-[#1A1A1A] px-4 py-3">
        <div>
          <p className="text-2xl font-semibold text-aurenGold">Status de Abordagem</p>
          <p className="text-xs text-zinc-400">Pipeline de social selling</p>
        </div>
        <div className="rounded-full border border-aurenStroke/80 bg-[#141414] p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setFiltro("dia")}
            className={`rounded-full px-2.5 py-1 ${filtro === "dia" ? "bg-aurenGold/90 text-[#111]" : "text-zinc-400 hover:text-aurenGold"}`}
          >
            Dia
          </button>
          <button
            type="button"
            onClick={() => setFiltro("semana")}
            className={`rounded-full px-2 py-1 ${
              filtro === "semana" ? "bg-aurenGold/90 text-[#111]" : "text-zinc-400 hover:text-aurenGold"
            }`}
          >
            Semana
          </button>
        </div>
      </div>

      <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
        {listaEtapas.map((item) => (
          <button
            key={item.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-xl border border-aurenStroke bg-[#141414] p-2.5 text-left transition hover:border-aurenGold/60"
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#3A3422] to-[#1F1A12]" />
            <div className="flex-1">
              <p className="text-xs leading-4">{item.etapa}</p>
              <p className="text-[10px] text-zinc-500">Atualizado em tempo real</p>
            </div>
            <ProgressRing value={item.progresso} color={item.cor} />
          </button>
        ))}
      </div>
    </article>
  );
}
