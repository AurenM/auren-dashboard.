import { Clock3, MessageCircle } from "lucide-react";

export default function ConsultationCard() {
  return (
    <article className="glass-card p-4">
      <p className="text-2xl font-medium text-aurenGold">Consultoria VIP</p>
      <p className="mt-5 text-lg">Receba orientacao dedicada</p>
      <p className="mt-1 text-sm text-zinc-400">
        Receba apoio estrategico para acelerar seus resultados e aumentar sua performance de conversao.
      </p>
      <div className="mt-6 flex items-center gap-2 text-xs text-zinc-400">
        <span>Individual</span>
        <MessageCircle size={14} />
        <span>10</span>
        <Clock3 size={14} />
        <span>7h</span>
        <button
          type="button"
          className="ml-auto rounded-full border border-aurenGold bg-aurenGold px-3 py-1 text-[#121212] transition hover:brightness-110"
        >
          Entrar
        </button>
      </div>
    </article>
  );
}
