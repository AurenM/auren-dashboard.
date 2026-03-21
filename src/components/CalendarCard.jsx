const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const months = [
  "Janeiro",
  "Fevereiro",
  "Março", // Corrigido: Marco -> Março
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function CalendarCard() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const numbers = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  return (
    <article className="glass-card flex h-full min-h-[330px] flex-col p-6 border border-aurenGold/10">
      {/* Título Centralizado Mantendo a Fonte da Imagem */}
      <div className="flex flex-col items-center justify-center mb-6 w-full text-center">
        <h2 className="font-poppins text-2xl font-bold text-aurenGold tracking-tight">
          {`${months[currentMonth]} ${currentYear}`}
        </h2>
      </div>

      <div className="mt-2 grid grid-cols-7 gap-x-2 gap-y-3 text-center text-[10px] font-poppins uppercase tracking-widest">
        {days.map((day) => (
          <span key={day} className="text-zinc-500 font-bold">
            {day}
          </span>
        ))}
        {numbers.map((day) => (
          <button
            key={day}
            type="button"
            className={`rounded-lg py-2 transition-all duration-200 font-poppins text-xs ${
              day === 21
                ? "bg-aurenGold text-[#121212] font-bold shadow-lg shadow-aurenGold/20 scale-110"
                : day === 22
                ? "border border-aurenGold/50 text-aurenGold bg-aurenGold/5"
                : "text-zinc-400 hover:bg-white/5 hover:text-aurenGold"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Informativo de Eventos com Acentuação Corrigida */}
      <div className="mt-auto border-t border-white/5 pt-4">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          <p className="text-[11px] text-zinc-500 font-poppins italic">
            Eventos de hoje: Nenhum agendado no momento.
          </p>
        </div>
      </div>
    </article>
  );
}