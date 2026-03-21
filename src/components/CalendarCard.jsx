const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
const months = [
  "Janeiro",
  "Fevereiro",
  "Marco",
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
    <article className="glass-card flex h-full min-h-[330px] flex-col justify-center p-4">
      <p className="text-2xl font-semibold text-aurenGold">{`${months[currentMonth]} ${currentYear}`}</p>
      <div className="mt-5 grid grid-cols-7 gap-x-2 gap-y-3 text-center text-xs">
        {days.map((day) => (
          <span key={day} className="text-zinc-400">
            {day}
          </span>
        ))}
        {numbers.map((day) => (
          <button
            key={day}
            type="button"
            className={`rounded-full py-1 transition ${
              day === 21
                ? "bg-aurenGold text-[#121212]"
                : day === 22
                  ? "border border-aurenGold text-aurenGold"
                : "text-zinc-300 hover:bg-aurenGold/10 hover:text-aurenGold"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="mt-4 border-t border-aurenStroke/80 pt-3">
        <p className="text-[11px] text-zinc-500">Eventos de hoje: Nenhum agendado</p>
      </div>
    </article>
  );
}
