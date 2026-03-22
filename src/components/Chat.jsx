import { useRef, useEffect, useState, useCallback } from "react";
import {
  Send, Phone, Video, MoreHorizontal, Search, Menu,
  Paperclip, Smile, Instagram, User, BellOff, Star, Ban,
  Trash, Trash2, Image, FileText, Mic, MapPin, ExternalLink,
  Users, Link2, ChevronLeft, X, CheckCheck, Maximize2, Minimize2,
  Pin, PinOff, Bot, UserCheck, Calendar, Reply, Slash,
  AlarmClock, StickyNote, Filter, MessageCircle,
} from "lucide-react";
import { chatConversations, chatChannels, temperaturaTags, funnelTags } from "../data/dashboardData";

/* ─── Quick Replies ──────────────────────────────────────────────────────── */
const QUICK_REPLIES = [
  { key: "oi",        text: "Olá! Tudo bem? Posso te ajudar com algo?" },
  { key: "proposta",  text: "Já preparei uma proposta personalizada para você! Posso enviar agora?" },
  { key: "call",      text: "Que tal agendarmos uma call de 30 minutos para conversar melhor?" },
  { key: "obrigado",  text: "Muito obrigado pelo seu contato! Fico à disposição." },
  { key: "aguarda",   text: "Perfeito! Pode aguardar um momento, vou verificar para você." },
  { key: "fechamento",text: "Excelente decisão! Vamos avançar com o contrato?" },
];

/* ─── 3-Dot Menu Options ─────────────────────────────────────────────────── */
const MENU_OPTIONS = [
  { label: "Dados do contato",         icon: User,       action: "contact" },
  { label: "Lembrar em 24h (Follow-up)", icon: AlarmClock, action: "followup" },
  { label: "Silenciar notificações",   icon: BellOff,    action: "mute" },
  { label: "Adicionar aos Favoritos",  icon: Star,       action: "fav" },
  { divider: true },
  { label: "Bloquear",                 icon: Ban,        action: "block",  danger: true },
  { divider: true },
  { label: "Limpar conversa",          icon: Trash,      action: "clear",  danger: true },
  { label: "Apagar conversa",          icon: Trash2,     action: "delete", danger: true },
];

/* ─── Attachment Options ─────────────────────────────────────────────────── */
const ATTACH_OPTIONS = [
  { label: "Foto",       icon: Image },
  { label: "Documento",  icon: FileText },
  { label: "Áudio",      icon: Mic },
  { label: "Localização",icon: MapPin },
];

/* ─── Emoji List ─────────────────────────────────────────────────────────── */
const EMOJI_LIST = [
  "😀","😂","😍","🥰","😎","🤔","😢","😅","👍","👎",
  "🙏","🔥","💯","❤️","✨","🎉","🚀","💪","👏","🤝",
  "😊","🥳","🤣","😇","🤩","😏","🙄","😬","🫶","💬",
];

/* ─── Filter Dropdown Options ────────────────────────────────────────────── */
const FILTER_OPTS = [
  { id: "whatsapp",  label: "WhatsApp",   icon: MessageCircle, color: "#25D366" },
  { id: "instagram", label: "Instagram",  icon: Instagram,     color: "#E1306C" },
  { id: "messenger", label: "Messenger",  icon: MessageCircle, color: "#006AFF" },
  { id: "unread",    label: "Não Lidos",  icon: MessageCircle, color: "#D4AF37" },
];

/* ─── Channel SVG Icons ─────────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="10" cy="10" r="10" fill="#25D366" />
      <path d="M14.35 5.65A6.1 6.1 0 0 0 10 4a6.1 6.1 0 0 0-5.3 9.12L4 16l2.94-.69A6.1 6.1 0 0 0 16 10c0-1.63-.64-3.16-1.65-4.35zm-4.35 9.4a5.07 5.07 0 0 1-2.6-.71l-.18-.11-1.9.5.51-1.85-.12-.19a5.07 5.07 0 0 1 7.83-6.4 5.07 5.07 0 0 1-3.54 8.76zm2.78-3.8c-.15-.08-.9-.44-1.04-.5-.14-.05-.24-.08-.34.08s-.4.5-.49.6c-.08.1-.17.11-.32.04a4.12 4.12 0 0 1-1.21-.74 4.54 4.54 0 0 1-.84-1.04c-.09-.15 0-.23.07-.31l.22-.26c.07-.09.09-.15.14-.25.04-.1.02-.18-.01-.26-.04-.08-.34-.82-.47-1.12-.12-.29-.25-.25-.34-.25h-.29c-.1 0-.26.04-.4.18-.13.14-.52.51-.52 1.25s.53 1.45.61 1.55c.07.1 1.05 1.6 2.54 2.25.35.15.63.24.84.31.36.11.68.1.94.06.29-.05.9-.37 1.02-.72.13-.35.13-.66.09-.72-.04-.07-.14-.1-.29-.18z" fill="white" />
    </svg>
  );
}

function InstagramChannelIcon() {
  return (
    <span className="inline-flex items-center justify-center w-full h-full rounded-sm" style={{ background: "linear-gradient(135deg,#F58529 0%,#DD2A7B 50%,#8134AF 100%)" }}>
      <Instagram size={10} color="white" strokeWidth={2.5} />
    </span>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <defs><linearGradient id="ms-g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#00B2FF" /><stop offset="100%" stopColor="#006AFF" /></linearGradient></defs>
      <circle cx="10" cy="10" r="10" fill="url(#ms-g)" />
      <path d="M10 3.5C6.41 3.5 3.5 6.18 3.5 9.5c0 1.87.9 3.54 2.3 4.66V16.5l2.1-1.16c.56.16 1.15.24 1.77.24h.33C13.59 15.58 16.5 12.9 16.5 9.5c0-3.32-2.91-6-6.5-6zm.65 8.07L8.9 9.68 5.7 11.57l3.5-3.71 1.73 1.9 3.17-1.9-3.45 3.71z" fill="white" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="10" cy="10" r="10" fill="#26A5E4" />
      <path d="M4.5 9.8l9.5-3.67c.44-.16.82.11.68.77l-1.62 7.63c-.12.54-.44.67-.9.42L9.6 13.12l-1.18 1.14c-.13.13-.24.24-.49.24l.17-2.44L13.5 7.6c.22-.2-.05-.3-.34-.12L6.22 12.1 4.05 11.43c-.52-.17-.53-.52.45-.73z" fill="white" />
    </svg>
  );
}

function WebChatIconSvg() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <rect width="20" height="20" rx="5" fill="rgba(212,175,55,0.2)" />
      <path d="M4 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-3 2V7z" stroke="#D4AF37" strokeWidth="1.3" fill="none" strokeLinejoin="round" />
    </svg>
  );
}

const channelIconMap = {
  whatsapp: <WhatsAppIcon />,
  instagram: <InstagramChannelIcon />,
  messenger: <MessengerIcon />,
  telegram: <TelegramIcon />,
  webchat: <WebChatIconSvg />,
};

function ChannelIcon({ channel }) {
  return (
    <span className="inline-flex h-4 w-4 flex-shrink-0 rounded-sm overflow-hidden" title={chatChannels[channel]?.label}>
      {channelIconMap[channel]}
    </span>
  );
}

function ChannelDot({ channel, borderColor = "#1A1A1A" }) {
  return (
    <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full flex items-center justify-center overflow-hidden border-2" style={{ borderColor }}>
      {channelIconMap[channel]}
    </span>
  );
}

/* ─── Tag ────────────────────────────────────────────────────────────────── */
function Tag({ label, color, bg }) {
  return (
    <span className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold leading-none tracking-wide whitespace-nowrap" style={{ color, background: bg }}>
      {label}
    </span>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ initials, photoUrl, size = "md" }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = size === "xl" ? "h-14 w-14 text-lg" : size === "lg" ? "h-10 w-10 text-sm" : "h-9 w-9 text-xs";
  if (photoUrl && !imgError) {
    return <img src={photoUrl} alt={initials} className={`${sizeClass} rounded-full border border-aurenGold/20 object-cover flex-shrink-0`} onError={() => setImgError(true)} />;
  }
  return (
    <div className={`flex-shrink-0 ${sizeClass} rounded-full border border-aurenGold/25 bg-zinc-800 flex items-center justify-center font-bold text-aurenGold`}>
      {initials}
    </div>
  );
}

/* ─── Typing Indicator ───────────────────────────────────────────────────── */
function TypingIndicator() {
  return (
    <div className="flex justify-start msg-enter">
      <div className="bg-[#1C1C1C] border border-aurenStroke/60 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        {[1,2,3].map((n) => (
          <span key={n} className="typing-dot h-2 w-2 rounded-full bg-zinc-500 inline-block" />
        ))}
      </div>
    </div>
  );
}

/* ─── Schedule Call Modal ────────────────────────────────────────────────── */
const MONTHS = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const DAYS   = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
const TIME_SLOTS = ["09:00","09:30","10:00","10:30","11:00","14:00","14:30","15:00","15:30","16:00"];

function ScheduleModal({ convName, onClose }) {
  const today = new Date();
  const [selDate, setSelDate] = useState(null);
  const [selTime, setSelTime] = useState(null);

  const year  = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  function confirm() {
    if (selDate && selTime) onClose();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-sm rounded-2xl border border-aurenGold/15 bg-[#141414] shadow-2xl shadow-black/70 overflow-hidden dropdown-enter" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-aurenStroke px-5 py-4">
          <div>
            <h3 className="font-playfair text-base font-bold text-aurenGold">Agendar Call</h3>
            <p className="text-[11px] text-zinc-500 mt-0.5">com {convName}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Month header */}
          <div className="text-center">
            <p className="text-sm font-semibold text-zinc-200">{MONTHS[month]} {year}</p>
          </div>
          {/* Day labels */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d) => <p key={d} className="text-[10px] text-zinc-600 font-medium">{d}</p>)}
          </div>
          {/* Date grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <span key={i} />;
              const isPast = day < today.getDate();
              const isSel  = selDate === day;
              return (
                <button key={i} type="button" disabled={isPast}
                  onClick={() => { setSelDate(day); setSelTime(null); }}
                  className={`h-8 w-8 mx-auto rounded-full text-xs font-medium transition-all
                    ${isPast ? "text-zinc-700 cursor-default" : ""}
                    ${isSel  ? "bg-aurenGold text-[#111] font-bold" : !isPast ? "text-zinc-300 hover:bg-aurenGold/15 hover:text-aurenGold" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Time slots */}
          {selDate && (
            <div>
              <p className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">Horários disponíveis — dia {selDate}</p>
              <div className="grid grid-cols-5 gap-1.5">
                {TIME_SLOTS.map((t) => (
                  <button key={t} type="button" onClick={() => setSelTime(t)}
                    className={`rounded-lg py-1.5 text-[11px] font-medium transition-all border
                      ${selTime === t ? "bg-aurenGold text-[#111] border-aurenGold" : "border-aurenStroke text-zinc-400 hover:border-aurenGold/40 hover:text-aurenGold"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Confirm */}
          <button type="button" onClick={confirm} disabled={!selDate || !selTime}
            className={`w-full rounded-xl py-3 text-sm font-semibold transition-all
              ${selDate && selTime ? "bg-aurenGold text-[#111] hover:brightness-110" : "bg-aurenGold/20 text-aurenGold/40 cursor-not-allowed"}`}
          >
            {selDate && selTime ? `Confirmar — ${MONTHS[month].slice(0,3)} ${selDate} às ${selTime}` : "Selecione data e horário"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Contact Drawer ─────────────────────────────────────────────────────── */
function ContactDrawer({ conv, onClose }) {
  const [note, setNote] = useState("");
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const tempTag  = temperaturaTags[conv.temperature];
  const funnelTag = funnelTags[conv.funnel];
  const ch = chatChannels[conv.channel];
  const cd = conv.channelData || {};

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-[320px] flex-col border-l border-aurenGold/10 bg-[#141414] shadow-2xl shadow-black/60 overflow-y-auto custom-scrollbar drawer-enter">
        <div className="flex items-center justify-between border-b border-aurenStroke px-5 py-4 flex-shrink-0">
          <h3 className="font-playfair text-lg font-bold text-aurenGold">Dados do Contato</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          {/* Avatar + name */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-5">
            <div className="relative">
              <Avatar initials={conv.avatar} photoUrl={conv.photoUrl} size="xl" />
              <ChannelDot channel={conv.channel} borderColor="#1A1A1A" />
            </div>
            <div className="text-center">
              <p className="font-playfair text-xl font-bold text-white">{conv.name}</p>
              <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                <ChannelIcon channel={conv.channel} />
                <span className="text-[11px] text-zinc-500">{ch?.label}</span>
                {conv.online && <span className="text-[10px] text-emerald-400 font-medium">● Online</span>}
              </div>
            </div>
            <button type="button" onClick={() => setScheduleOpen(true)}
              className="flex items-center gap-2 rounded-xl border border-aurenGold/30 bg-aurenGold/10 px-4 py-2 text-xs text-aurenGold font-semibold hover:bg-aurenGold/20 transition-colors w-full justify-center"
            >
              <Calendar size={13} />
              Agendar Call
            </button>
          </div>

          {/* Pipeline */}
          <div className="rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-4 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Pipeline</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Etapa do Funil</span>
              {funnelTag && <Tag label={funnelTag.label} color={funnelTag.color} bg={funnelTag.bg} />}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Temperatura</span>
              {tempTag && <Tag label={tempTag.label} color={tempTag.color} bg={tempTag.bg} />}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-400">Origem</span>
              <div className="flex items-center gap-1.5">
                <ChannelIcon channel={conv.channel} />
                <span className="text-xs text-zinc-300">{ch?.label}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp fields */}
          {conv.channel === "whatsapp" && (cd.phone || cd.recado) && (
            <div className="rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">WhatsApp</p>
              {cd.phone && (
                <div className="flex items-start gap-3">
                  <Phone size={14} className="text-aurenGold/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">Telefone</p>
                    <p className="text-xs text-zinc-200 font-medium">{cd.phone}</p>
                  </div>
                </div>
              )}
              {cd.recado && (
                <div className="flex items-start gap-3">
                  <FileText size={14} className="text-aurenGold/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">Recado</p>
                    <p className="text-xs text-zinc-200 leading-relaxed">{cd.recado}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Instagram fields */}
          {conv.channel === "instagram" && (cd.username || cd.bio) && (
            <div className="rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Instagram</p>
              {cd.username && (
                <div className="flex items-center gap-3">
                  <Instagram size={14} className="text-[#E1306C] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">@Username</p>
                    <a href={`https://instagram.com/${cd.username.replace("@","")}`} target="_blank" rel="noreferrer" className="text-xs text-[#E1306C] font-medium hover:underline flex items-center gap-1">
                      {cd.username}<ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              )}
              {cd.followers && (
                <div className="flex items-center gap-3">
                  <Users size={14} className="text-aurenGold/60 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">Seguidores</p>
                    <p className="text-xs text-zinc-200 font-semibold">{cd.followers}</p>
                  </div>
                </div>
              )}
              {cd.bio && (
                <div className="flex items-start gap-3">
                  <User size={14} className="text-aurenGold/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">Bio</p>
                    <p className="text-xs text-zinc-200 leading-relaxed">{cd.bio}</p>
                  </div>
                </div>
              )}
              {cd.linkInBio && (
                <div className="flex items-center gap-3">
                  <Link2 size={14} className="text-aurenGold/60 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">Link na Bio</p>
                    <a href={cd.linkInBio} target="_blank" rel="noreferrer" className="text-xs text-aurenGold hover:underline flex items-center gap-1">
                      {cd.linkInBio.replace("https://","")}<ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Internal Notes */}
          <div className="rounded-2xl border border-aurenGold/20 bg-[#1A160A] p-4 space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <StickyNote size={13} className="text-aurenGold/70" />
              <p className="text-[10px] uppercase tracking-widest text-aurenGold/70 font-semibold">Notas Internas</p>
              <span className="ml-auto text-[9px] text-aurenGold/40 italic">invisível ao lead</span>
            </div>
            <textarea
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Adicione uma observação interna..."
              className="w-full resize-none bg-transparent text-xs text-zinc-300 outline-none placeholder:text-zinc-600 leading-relaxed"
            />
          </div>
        </div>
      </aside>

      {scheduleOpen && <ScheduleModal convName={conv.name} onClose={() => setScheduleOpen(false)} />}
    </>
  );
}

/* ─── useClickOutside ────────────────────────────────────────────────────── */
function useClickOutside(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

/* ─── Main Chat Component ────────────────────────────────────────────────── */
export default function Chat({ onMenuOpen, focusMode, onFocusToggle }) {
  const [selected, setSelected]     = useState(chatConversations[0]);
  const [input, setInput]           = useState("");
  const [messages, setMessages]     = useState(
    Object.fromEntries(chatConversations.map((c) => [c.id, [...c.messages]]))
  );
  const [showList, setShowList]     = useState(true);
  const [search, setSearch]         = useState("");
  const [activeFilter, setFilter]   = useState("all");
  const [pinnedIds, setPinnedIds]   = useState(new Set([1]));
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [filterOpen, setFilterOpen]   = useState(false);
  const [attachOpen, setAttachOpen]   = useState(false);
  const [emojiOpen, setEmojiOpen]     = useState(false);
  const [quickOpen, setQuickOpen]     = useState(false);
  const [replyTo, setReplyTo]         = useState(null);
  const [isTyping, setIsTyping]       = useState(false);
  const [agentMode, setAgentMode]     = useState("human");
  const [hoveredMsg, setHoveredMsg]   = useState(null);

  const messagesEndRef = useRef(null);
  const menuRef        = useRef(null);
  const filterRef      = useRef(null);
  const attachRef      = useRef(null);
  const emojiRef       = useRef(null);
  const quickRef       = useRef(null);
  const typingTimer    = useRef(null);

  useClickOutside(menuRef,   useCallback(() => setMenuOpen(false),   []));
  useClickOutside(filterRef, useCallback(() => setFilterOpen(false), []));
  useClickOutside(attachRef, useCallback(() => setAttachOpen(false), []));
  useClickOutside(emojiRef,  useCallback(() => setEmojiOpen(false),  []));
  useClickOutside(quickRef,  useCallback(() => setQuickOpen(false),  []));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selected, isTyping]);

  function togglePin(id, e) {
    e.stopPropagation();
    setPinnedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function selectConv(conv) {
    setSelected(conv);
    setShowList(false);
    setDrawerOpen(false);
    setReplyTo(null);
    setIsTyping(false);
    clearTimeout(typingTimer.current);
  }

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      replyTo: replyTo ? { from: replyTo.from, text: replyTo.text } : null,
    };
    setMessages((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), newMsg] }));
    setInput("");
    setReplyTo(null);
    setQuickOpen(false);

    if (selected?.online) {
      clearTimeout(typingTimer.current);
      typingTimer.current = setTimeout(() => {
        setIsTyping(true);
        typingTimer.current = setTimeout(() => setIsTyping(false), 3000);
      }, 800);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setInput(val);
    if (val === "/") {
      setQuickOpen(true);
      setAttachOpen(false);
      setEmojiOpen(false);
    } else if (!val.startsWith("/")) {
      setQuickOpen(false);
    }
  }

  function insertEmoji(emoji) {
    setInput((prev) => prev + emoji);
    setEmojiOpen(false);
  }

  function applyQuickReply(text) {
    setInput(text);
    setQuickOpen(false);
  }

  function handleMenuAction(action) {
    setMenuOpen(false);
    if (action === "contact") { setDrawerOpen(true); return; }
    if (action === "clear")   { setMessages((prev) => ({ ...prev, [selected.id]: [] })); return; }
    if (action === "followup") return;
  }

  /* ── Filter logic ── */
  function applyFilter(conv) {
    if (activeFilter === "all")       return true;
    if (activeFilter === "whatsapp")  return conv.channel === "whatsapp";
    if (activeFilter === "instagram") return conv.channel === "instagram";
    if (activeFilter === "messenger") return conv.channel === "messenger";
    if (activeFilter === "unread")    return conv.unread > 0;
    if (activeFilter === "hot")       return conv.temperature === "hot";
    if (activeFilter === "proposal")  return conv.funnel === "proposal";
    if (activeFilter === "waiting")   return conv.funnel === "waiting";
    return true;
  }

  const baseFiltered = chatConversations.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) && applyFilter(c)
  );

  const pinned   = baseFiltered.filter((c) => pinnedIds.has(c.id));
  const unpinned = baseFiltered.filter((c) => !pinnedIds.has(c.id));
  const filtered = [...pinned, ...unpinned];

  const currentMessages = messages[selected?.id] || [];
  const tempTag   = selected ? temperaturaTags[selected.temperature] : null;
  const funnelTag = selected ? funnelTags[selected.funnel] : null;

  /* ── Conversation item ── */
  function ConvItem({ conv }) {
    const tt = temperaturaTags[conv.temperature];
    const ft = funnelTags[conv.funnel];
    const isPinned = pinnedIds.has(conv.id);
    return (
      <button
        type="button"
        onClick={() => selectConv(conv)}
        className={`w-full group flex items-start gap-3 px-4 py-3 text-left transition-all border-b border-aurenStroke/30 hover:bg-white/[0.04] ${
          selected?.id === conv.id ? "bg-aurenGold/10 border-l-2 border-l-aurenGold pl-[14px]" : ""
        }`}
      >
        <div className="relative mt-0.5 flex-shrink-0">
          <Avatar initials={conv.avatar} photoUrl={conv.photoUrl} />
          <ChannelDot channel={conv.channel} borderColor="#1A1A1A" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1 mb-0.5">
            <p className="text-sm font-medium text-zinc-100 truncate">{conv.name}</p>
            <div className="flex items-center gap-1 flex-shrink-0">
              {isPinned && <Pin size={10} className="text-aurenGold/60" />}
              <span className="text-[10px] text-zinc-500">{conv.time}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mb-1 flex-wrap">
            <ChannelIcon channel={conv.channel} />
            {tt && <Tag label={tt.label} color={tt.color} bg={tt.bg} />}
            {ft && <Tag label={ft.label} color={ft.color} bg={ft.bg} />}
            {conv.unread > 0 && (
              <span className="ml-auto flex-shrink-0 h-4 w-4 rounded-full bg-aurenGold text-[9px] font-bold text-[#111] flex items-center justify-center">
                {conv.unread}
              </span>
            )}
          </div>
          <p className="text-[11px] text-zinc-500 truncate leading-tight">{conv.lastMessage}</p>
        </div>
        {/* Pin toggle (visible on hover) */}
        <button
          type="button"
          onClick={(e) => togglePin(conv.id, e)}
          className="opacity-0 group-hover:opacity-100 flex-shrink-0 mt-0.5 p-1 rounded text-zinc-600 hover:text-aurenGold transition-opacity"
          title={isPinned ? "Desafixar" : "Fixar"}
        >
          {isPinned ? <PinOff size={12} /> : <Pin size={12} />}
        </button>
      </button>
    );
  }

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-aurenStroke relative">

      {/* ── Conversation List ─────────────────────────────────────────────── */}
      {!focusMode && (
        <aside
          className={`
            flex flex-col border-r border-aurenStroke bg-aurenCard
            w-full md:w-[290px] lg:w-[310px] flex-shrink-0
            ${showList ? "flex" : "hidden"} md:flex
          `}
        >
          {/* List header */}
          <div className="border-b border-aurenStroke px-4 pt-4 pb-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-playfair text-xl font-bold text-aurenGold">Conversas</h2>
              <button type="button" onClick={onMenuOpen} className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold md:hidden">
                <Menu size={18} />
              </button>
            </div>
            <div className="flex gap-2">
              <label className="flex flex-1 h-9 items-center rounded-xl border border-aurenStroke bg-[#141414] px-3 gap-2">
                <Search size={13} className="text-zinc-500 flex-shrink-0" />
                <input
                  className="w-full bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
                  placeholder="Buscar conversa..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>

              {/* Filter icon + dropdown */}
              <div className="relative flex-shrink-0" ref={filterRef}>
                <button
                  type="button"
                  onClick={() => setFilterOpen((v) => !v)}
                  title="Filtrar conversas"
                  className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-all ${
                    activeFilter !== "all"
                      ? "border-aurenGold bg-aurenGold/15 text-aurenGold"
                      : "border-aurenStroke bg-[#141414] text-zinc-500 hover:border-aurenGold/40 hover:text-aurenGold"
                  }`}
                >
                  <Filter size={14} />
                </button>

                {filterOpen && (
                  <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/60 py-1 overflow-hidden dropdown-enter">
                    <p className="px-4 py-2 text-[10px] uppercase tracking-wider text-zinc-600 border-b border-aurenStroke/40">Filtrar por</p>
                    {FILTER_OPTS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => { setFilter(activeFilter === f.id ? "all" : f.id); setFilterOpen(false); }}
                        className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                          activeFilter === f.id ? "text-aurenGold" : "text-zinc-300"
                        }`}
                      >
                        <span className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                        <span className="font-poppins text-xs">{f.label}</span>
                        {activeFilter === f.id && <span className="ml-auto text-[10px] text-aurenGold">✓</span>}
                      </button>
                    ))}
                    <div className="border-t border-aurenStroke/40 mt-1 pt-1">
                      <button
                        type="button"
                        onClick={() => { setFilter("all"); setFilterOpen(false); }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-xs text-zinc-500 hover:bg-white/5 hover:text-zinc-300 transition-colors"
                      >
                        <X size={12} className="flex-shrink-0" />
                        Limpar filtro
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pinned label */}
          {pinned.length > 0 && (
            <div className="px-4 pt-2 pb-1">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">
                <Pin size={9} /> Fixados
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {filtered.length === 0 ? (
              <p className="px-4 py-6 text-xs text-zinc-600 text-center">Nenhuma conversa encontrada.</p>
            ) : (
              filtered.map((conv, i) => (
                <div key={conv.id}>
                  {i === pinned.length && pinned.length > 0 && unpinned.length > 0 && (
                    <div className="px-4 pt-3 pb-1">
                      <p className="text-[10px] uppercase tracking-widest text-zinc-600 font-semibold">Todas</p>
                    </div>
                  )}
                  <ConvItem conv={conv} />
                </div>
              ))
            )}
          </div>
        </aside>
      )}

      {/* ── Chat Window ──────────────────────────────────────────────────── */}
      <div className={`flex flex-col flex-1 min-w-0 bg-[#0C0C0C] ${!focusMode && showList ? "hidden md:flex" : "flex"}`}>
        {selected ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-2 border-b border-aurenStroke bg-[#111] px-4 py-3 flex-shrink-0">
              {/* Back (mobile) */}
              {!focusMode && (
                <button type="button" onClick={() => setShowList(true)} className="md:hidden rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold flex-shrink-0">
                  <ChevronLeft size={18} />
                </button>
              )}

              {/* Avatar + name → opens drawer (no hover effect) */}
              <button type="button" onClick={() => setDrawerOpen(true)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                <div className="relative flex-shrink-0">
                  <Avatar initials={selected.avatar} photoUrl={selected.photoUrl} size="lg" />
                  <ChannelDot channel={selected.channel} borderColor="#111" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-playfair text-base font-bold text-white leading-tight truncate">{selected.name}</p>
                    {/* Dynamic AI/Human icon badge next to name */}
                    <span
                      title={agentMode === "ai" ? "IA Atendendo" : "Humano Atendendo"}
                      className={`flex-shrink-0 flex items-center justify-center h-5 w-5 rounded-full ${
                        agentMode === "ai"
                          ? "bg-violet-500/20 text-violet-300"
                          : "bg-aurenGold/15 text-aurenGold"
                      }`}
                    >
                      {agentMode === "ai" ? <Bot size={11} /> : <UserCheck size={11} />}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <ChannelIcon channel={selected.channel} />
                    <span className="text-[10px] text-zinc-500">{chatChannels[selected.channel]?.label}</span>
                    {tempTag   && <Tag label={tempTag.label}   color={tempTag.color}   bg={tempTag.bg} />}
                    {funnelTag && <Tag label={funnelTag.label} color={funnelTag.color} bg={funnelTag.bg} />}
                    {/* Status indicator */}
                    {isTyping
                      ? <span className="text-[10px] text-aurenGold font-medium animate-pulse">Digitando...</span>
                      : selected.online && <span className="text-[10px] text-emerald-400 font-medium">● Online</span>
                    }
                  </div>
                </div>
              </button>

              {/* Right controls */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {/* AI / Human action button */}
                <button
                  type="button"
                  onClick={() => setAgentMode((v) => v === "ai" ? "human" : "ai")}
                  className={`hidden sm:flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-semibold border transition-all whitespace-nowrap ${
                    agentMode === "ai"
                      ? "bg-aurenGold/10 border-aurenGold/30 text-aurenGold hover:bg-aurenGold/20"
                      : "bg-violet-500/10 border-violet-500/25 text-violet-300 hover:bg-violet-500/20"
                  }`}
                >
                  {agentMode === "ai"
                    ? <><UserCheck size={12} /> Assumir Atendimento</>
                    : <><Bot size={12} /> Transferir para IA</>
                  }
                </button>

                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <Phone size={15} />
                </button>
                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <Video size={15} />
                </button>

                {/* Focus mode toggle */}
                <button type="button" onClick={onFocusToggle} title={focusMode ? "Sair do Modo Foco" : "Modo Foco"} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  {focusMode ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                </button>

                {/* 3-dot menu */}
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className={`rounded-lg p-2 hover:bg-white/5 transition-colors ${menuOpen ? "text-aurenGold bg-white/5" : "text-zinc-400 hover:text-aurenGold"}`}
                  >
                    <MoreHorizontal size={15} />
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/60 py-1 overflow-hidden dropdown-enter">
                      {MENU_OPTIONS.map((opt, i) =>
                        opt.divider ? (
                          <div key={`d${i}`} className="my-1 border-t border-aurenStroke/50" />
                        ) : (
                          <button
                            key={opt.action}
                            type="button"
                            onClick={() => handleMenuAction(opt.action)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${opt.danger ? "text-red-400 hover:text-red-300" : "text-zinc-300 hover:text-zinc-100"}`}
                          >
                            <opt.icon size={14} className="flex-shrink-0" />
                            <span className="font-poppins">{opt.label}</span>
                          </button>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-5 space-y-3">
              {currentMessages.length === 0 && !isTyping && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-zinc-600 text-sm">Nenhuma mensagem ainda.</p>
                </div>
              )}

              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`group flex items-end gap-2 msg-enter ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                  onMouseEnter={() => setHoveredMsg(msg.id)}
                  onMouseLeave={() => setHoveredMsg(null)}
                >
                  {/* Reply button (them side) */}
                  {msg.from !== "me" && hoveredMsg === msg.id && (
                    <button type="button" onClick={() => setReplyTo(msg)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-white/10 text-zinc-500 hover:text-aurenGold transition-all flex-shrink-0">
                      <Reply size={13} />
                    </button>
                  )}

                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.from === "me"
                      ? "bg-aurenGold text-[#111] rounded-br-sm font-medium"
                      : "bg-[#1C1C1C] border border-aurenStroke/60 text-zinc-100 rounded-bl-sm"
                  }`}>
                    {/* Quoted reply preview */}
                    {msg.replyTo && (
                      <div className={`mb-2 border-l-2 pl-2 pb-1 text-[11px] leading-snug rounded-sm ${
                        msg.from === "me" ? "border-[#111]/30 text-[#111]/60 bg-[#111]/10" : "border-aurenGold/30 text-zinc-400 bg-white/5"
                      }`}>
                        <p className="font-semibold mb-0.5">{msg.replyTo.from === "me" ? "Você" : selected.name}</p>
                        <p className="truncate">{msg.replyTo.text}</p>
                      </div>
                    )}
                    <p>{msg.text}</p>
                    <div className={`mt-1.5 flex items-center justify-end gap-1 ${msg.from === "me" ? "text-[#111]/50" : "text-zinc-600"}`}>
                      <span className="text-[10px]">{msg.time}</span>
                      {msg.from === "me" && <CheckCheck size={12} className="text-[#111]/60" />}
                    </div>
                  </div>

                  {/* Reply button (me side) */}
                  {msg.from === "me" && hoveredMsg === msg.id && (
                    <button type="button" onClick={() => setReplyTo(msg)} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-full hover:bg-white/10 text-zinc-500 hover:text-aurenGold transition-all flex-shrink-0">
                      <Reply size={13} />
                    </button>
                  )}
                </div>
              ))}

              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-aurenStroke bg-[#111] px-4 py-3 flex-shrink-0">
              {/* Reply preview */}
              {replyTo && (
                <div className="mb-2 flex items-start gap-2 rounded-xl border-l-2 border-aurenGold bg-aurenGold/8 px-3 py-2">
                  <Reply size={13} className="text-aurenGold mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-aurenGold font-semibold mb-0.5">{replyTo.from === "me" ? "Você" : selected.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{replyTo.text}</p>
                  </div>
                  <button type="button" onClick={() => setReplyTo(null)} className="text-zinc-500 hover:text-zinc-300 flex-shrink-0">
                    <X size={13} />
                  </button>
                </div>
              )}

              <div className="flex items-end gap-2">
                <div className="flex-1 flex flex-col rounded-2xl border border-aurenStroke bg-[#1A1A1A] px-4 py-3 transition-colors focus-within:border-aurenGold/40">
                  <textarea
                    rows={1}
                    className="w-full resize-none bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500 leading-relaxed"
                    placeholder="Digite / para respostas rápidas..."
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    style={{ maxHeight: "6rem", overflowY: "auto" }}
                  />

                  <div className="flex items-center gap-1 mt-2 pt-2 border-t border-aurenStroke/40">
                    {/* Attach */}
                    <div className="relative" ref={attachRef}>
                      <button type="button" onClick={() => { setAttachOpen((v) => !v); setEmojiOpen(false); setQuickOpen(false); }}
                        className={`rounded-lg p-1.5 transition-colors ${attachOpen ? "text-aurenGold" : "text-zinc-500 hover:text-aurenGold"}`}>
                        <Paperclip size={15} />
                      </button>
                      {attachOpen && (
                        <div className="absolute bottom-full left-0 mb-2 z-50 w-44 rounded-xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/50 py-1 dropdown-enter">
                          {ATTACH_OPTIONS.map((opt) => (
                            <button key={opt.label} type="button" onClick={() => setAttachOpen(false)}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-aurenGold transition-colors">
                              <opt.icon size={14} className="text-aurenGold/60 flex-shrink-0" />
                              <span className="font-poppins">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Emoji */}
                    <div className="relative" ref={emojiRef}>
                      <button type="button" onClick={() => { setEmojiOpen((v) => !v); setAttachOpen(false); setQuickOpen(false); }}
                        className={`rounded-lg p-1.5 transition-colors ${emojiOpen ? "text-aurenGold" : "text-zinc-500 hover:text-aurenGold"}`}>
                        <Smile size={15} />
                      </button>
                      {emojiOpen && (
                        <div className="absolute bottom-full left-0 mb-2 z-50 w-56 rounded-xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/50 p-3 dropdown-enter">
                          <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-wider">Emojis</p>
                          <div className="grid grid-cols-6 gap-1">
                            {EMOJI_LIST.map((emoji) => (
                              <button key={emoji} type="button" onClick={() => insertEmoji(emoji)}
                                className="flex items-center justify-center h-8 w-8 rounded-lg text-lg hover:bg-white/10 transition-colors">
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Quick replies / */}
                    <div className="relative" ref={quickRef}>
                      <button type="button" onClick={() => { setQuickOpen((v) => !v); setInput(quickOpen ? "" : "/"); setAttachOpen(false); setEmojiOpen(false); }}
                        className={`rounded-lg p-1.5 transition-colors ${quickOpen ? "text-aurenGold" : "text-zinc-500 hover:text-aurenGold"}`}
                        title="Respostas Rápidas (/)">
                        <Slash size={15} />
                      </button>
                      {quickOpen && (
                        <div className="absolute bottom-full left-0 mb-2 z-50 w-72 rounded-xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/50 py-1 dropdown-enter">
                          <p className="px-4 py-2 text-[10px] uppercase tracking-wider text-zinc-500 border-b border-aurenStroke/40">Respostas Rápidas</p>
                          {QUICK_REPLIES.map((qr) => (
                            <button key={qr.key} type="button" onClick={() => applyQuickReply(qr.text)}
                              className="flex w-full items-start gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors">
                              <span className="text-[10px] font-bold text-aurenGold bg-aurenGold/10 rounded px-1.5 py-0.5 mt-0.5 flex-shrink-0">/{qr.key}</span>
                              <span className="text-xs text-zinc-300 leading-relaxed line-clamp-2">{qr.text}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <span className="ml-auto text-[10px] text-zinc-600 font-poppins hidden sm:block">Enter para enviar</span>
                  </div>
                </div>

                <button type="button" onClick={sendMessage}
                  className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-aurenGold text-[#111] hover:brightness-110 shadow-lg shadow-aurenGold/15 transition">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="font-playfair text-2xl text-aurenGold/30">Selecione uma conversa</p>
          </div>
        )}
      </div>

      {/* Contact Drawer */}
      {drawerOpen && selected && (
        <ContactDrawer conv={selected} onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  );
}
