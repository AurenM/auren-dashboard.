import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { progressSeries } from "../data/dashboardData";

export default function LearningProgressCard() {
  const [mode, setMode] = useState("diario");

  const data = useMemo(() => {
    if (mode === "diario") {
      return progressSeries;
    }
    return progressSeries.map((item, index) => ({
      ...item,
      value: Math.min(100, item.value + index * 4),
    }));
  }, [mode]);

  const metrics = useMemo(() => {
    const total = data.reduce((acc, item) => acc + item.value, 0);
    const average = Math.round(total / data.length);
    return { total, average };
  }, [data]);

  return (
    <article className="glass-card p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-xl font-semibold">Performance de Leads</p>
        <div className="rounded-full border border-aurenStroke bg-[#141414] p-1 text-xs">
          <button
            type="button"
            onClick={() => setMode("diario")}
            className={`rounded-full px-2 py-1 ${mode === "diario" ? "bg-aurenGold text-[#121212]" : "text-zinc-400"}`}
          >
            Diario
          </button>
          <button
            type="button"
            onClick={() => setMode("semanal")}
            className={`rounded-full px-2 py-1 ${
              mode === "semanal" ? "bg-aurenGold text-[#121212]" : "text-zinc-400"
            }`}
          >
            Semanal
          </button>
        </div>
      </div>

      <div className="mt-3 h-[230px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.05} />
                <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#262626" />
            <XAxis dataKey="name" tick={{ fill: "#9A9A9A", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              cursor={{ stroke: "#D4AF37", strokeOpacity: 0.2 }}
              contentStyle={{ background: "#000000", border: "1px solid #D4AF37", borderRadius: 12, color: "#FFFFFF" }}
              labelStyle={{ color: "#D4AF37" }}
              itemStyle={{ color: "#FFFFFF" }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#D4AF37"
              strokeWidth={3}
              fill="url(#goldFill)"
              dot={{ r: 3, stroke: "#D4AF37", strokeWidth: 1, fill: "#121212" }}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="mt-3 text-[11px] font-poppins text-zinc-400">
        Total: {metrics.total} leads | Média: {metrics.average}/dia
      </p>
    </article>
  );
}
