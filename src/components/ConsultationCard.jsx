import { Clock3, MessageCircle, Calendar } from "lucide-react";
import { useState, useEffect } from "react";

export default function ConsultationCard() {
  // Simulação de cronômetro regressivo para a próxima call
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 37, seconds: 8 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <article className="glass-card p-6 border border-aurenGold/20 bg-gradient-to-br from-aurenCard to-[#151515] relative overflow-hidden group">
      {/* Efeito de brilho de fundo */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-aurenGold/10 blur-3xl group-hover:bg-aurenGold/20 transition-colors" />
      
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-aurenGold font-bold mb-1">Próxima Call</p>
          {/* Título padronizado: Poppins Semibold 2xl */}
          <h2 className="font-poppins text-2xl font-semibold text-white">Call Estratégica</h2>
          <p className="font-poppins text-[11px] font-medium text-aurenGold italic mt-1">
            Pauta: Alinhamento de Tráfego - V7x Educação
          </p>
        </div>
        <div className="bg-aurenGold/10 p-2 rounded-lg text-aurenGold">
          <Calendar size={20} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-aurenGold">
            RV
          </div>
          <div>
            <p className="text-sm font-medium text-zinc-100 font-poppins">Rodrigo Viriato</p>
            <p className="text-[11px] text-zinc-500 font-poppins">Estrategista & Founder</p>
          </div>
        </div>

        {/* Cronômetro Regressivo Dourado */}
        <div className="py-3 px-4 rounded-xl bg-black/40 border border-aurenGold/10 flex justify-between items-center">
          <span className="text-[11px] text-zinc-400 font-medium uppercase tracking-wider italic font-poppins">Inicia em:</span>
          <div className="flex gap-2 font-poppins font-bold text-aurenGold text-lg">
            <span className="animate-pulse">{String(timeLeft.hours).padStart(2, '0')}</span>:
            <span className="animate-pulse">{String(timeLeft.minutes).padStart(2, '0')}</span>:
            <span className="animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-4 text-[11px] text-zinc-500 font-medium font-poppins">
        <div className="flex items-center gap-1.5">
          <MessageCircle size={14} className="text-aurenGold/60" />
          <span>Individual</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock3 size={14} className="text-aurenGold/60" />
          <span>60 min</span>
        </div>
        
        <button
          type="button"
          className="ml-auto rounded-xl bg-aurenGold px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-black shadow-lg shadow-aurenGold/10 hover:scale-105 hover:bg-white transition-all duration-300 font-poppins"
        >
          Acessar Sala
        </button>
      </div>
    </article>
  );
}