import { useRef, useEffect, useState } from "react";
import {
  Send, Phone, Video, MoreHorizontal, Search, Menu,
  Paperclip, Smile, Instagram, User, CheckSquare, BellOff,
  Timer, Star, XCircle, Flag, Ban, Trash, Trash2,
  Image, FileText, Mic, MapPin, ExternalLink, Users, Link2,
  ChevronLeft, X,
} from "lucide-react";
import { chatConversations, chatChannels, temperaturaTags, funnelTags } from "../data/dashboardData";

/* ─── Channel SVG Icons ─────────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="10" cy="10" r="10" fill="#25D366" />
      <path
        d="M14.35 5.65A6.1 6.1 0 0 0 10 4a6.1 6.1 0 0 0-5.3 9.12L4 16l2.94-.69A6.1 6.1 0 0 0 16 10c0-1.63-.64-3.16-1.65-4.35zm-4.35 9.4a5.07 5.07 0 0 1-2.6-.71l-.18-.11-1.9.5.51-1.85-.12-.19a5.07 5.07 0 0 1 7.83-6.4 5.07 5.07 0 0 1-3.54 8.76zm2.78-3.8c-.15-.08-.9-.44-1.04-.5-.14-.05-.24-.08-.34.08s-.4.5-.49.6c-.08.1-.17.11-.32.04a4.12 4.12 0 0 1-1.21-.74 4.54 4.54 0 0 1-.84-1.04c-.09-.15 0-.23.07-.31l.22-.26c.07-.09.09-.15.14-.25.04-.1.02-.18-.01-.26-.04-.08-.34-.82-.47-1.12-.12-.29-.25-.25-.34-.25h-.29c-.1 0-.26.04-.4.18-.13.14-.52.51-.52 1.25s.53 1.45.61 1.55c.07.1 1.05 1.6 2.54 2.25.35.15.63.24.84.31.36.11.68.1.94.06.29-.05.9-.37 1.02-.72.13-.35.13-.66.09-.72-.04-.07-.14-.1-.29-.18z"
        fill="white"
      />
    </svg>
  );
}

function InstagramChannelIcon() {
  return (
    <span
      className="inline-flex items-center justify-center w-full h-full rounded-sm"
      style={{ background: "linear-gradient(135deg, #F58529 0%, #DD2A7B 50%, #8134AF 100%)" }}
    >
      <Instagram size={10} color="white" strokeWidth={2.5} />
    </span>
  );
}

function MessengerIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="ms-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B2FF" />
          <stop offset="100%" stopColor="#006AFF" />
        </linearGradient>
      </defs>
      <circle cx="10" cy="10" r="10" fill="url(#ms-grad)" />
      <path
        d="M10 3.5C6.41 3.5 3.5 6.18 3.5 9.5c0 1.87.9 3.54 2.3 4.66V16.5l2.1-1.16c.56.16 1.15.24 1.77.24h.33C13.59 15.58 16.5 12.9 16.5 9.5c0-3.32-2.91-6-6.5-6zm.65 8.07L8.9 9.68 5.7 11.57l3.5-3.71 1.73 1.9 3.17-1.9-3.45 3.71z"
        fill="white"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <circle cx="10" cy="10" r="10" fill="#26A5E4" />
      <path
        d="M4.5 9.8l9.5-3.67c.44-.16.82.11.68.77l-1.62 7.63c-.12.54-.44.67-.9.42L9.6 13.12l-1.18 1.14c-.13.13-.24.24-.49.24l.17-2.44L13.5 7.6c.22-.2-.05-.3-.34-.12L6.22 12.1 4.05 11.43c-.52-.17-.53-.52.45-.73z"
        fill="white"
      />
    </svg>
  );
}

function WebChatIconSvg() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-full h-full">
      <rect width="20" height="20" rx="5" fill="rgba(212,175,55,0.2)" />
      <path
        d="M4 7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-3 2V7z"
        stroke="#D4AF37" strokeWidth="1.3" fill="none" strokeLinejoin="round"
      />
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

function ChannelDot({ channel }) {
  return (
    <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center overflow-hidden">
      {channelIconMap[channel]}
    </span>
  );
}

/* ─── Tag ────────────────────────────────────────────────────────────────── */
function Tag({ label, color, bg }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold leading-none tracking-wide whitespace-nowrap"
      style={{ color, background: bg }}
    >
      {label}
    </span>
  );
}

/* ─── Avatar ─────────────────────────────────────────────────────────────── */
function Avatar({ initials, photoUrl, size = "md" }) {
  const [imgError, setImgError] = useState(false);
  const sizeClass = size === "xl" ? "h-14 w-14 text-lg" : size === "lg" ? "h-10 w-10 text-sm" : "h-9 w-9 text-xs";

  if (photoUrl && !imgError) {
    return (
      <img
        src={photoUrl}
        alt={initials}
        className={`${sizeClass} rounded-full border border-aurenGold/20 object-cover flex-shrink-0`}
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div className={`flex-shrink-0 ${sizeClass} rounded-full border border-aurenGold/25 bg-zinc-800 flex items-center justify-center font-bold text-aurenGold`}>
      {initials}
    </div>
  );
}

/* ─── Contact Drawer ─────────────────────────────────────────────────────── */
function ContactDrawer({ conv, onClose }) {
  const tempTag = temperaturaTags[conv.temperature];
  const funnelTag = funnelTags[conv.funnel];
  const ch = chatChannels[conv.channel];
  const cd = conv.channelData || {};

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <aside className="fixed right-0 top-0 z-50 flex h-full w-[320px] flex-col border-l border-aurenGold/10 bg-[#141414] shadow-2xl shadow-black/60 overflow-y-auto custom-scrollbar">
        <div className="flex items-center justify-between border-b border-aurenStroke px-5 py-4">
          <h3 className="font-playfair text-lg font-bold text-aurenGold">Dados do Contato</h3>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5">
          {/* Avatar + name section */}
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-5">
            <div className="relative">
              <Avatar initials={conv.avatar} photoUrl={conv.photoUrl} size="xl" />
              <ChannelDot channel={conv.channel} />
            </div>
            <div className="text-center">
              <p className="font-playfair text-xl font-bold text-white">{conv.name}</p>
              <div className="mt-1 flex items-center justify-center gap-1.5 flex-wrap">
                <ChannelIcon channel={conv.channel} />
                <span className="text-[11px] text-zinc-500">{ch?.label}</span>
                {conv.online && <span className="text-[10px] text-emerald-400 font-medium">● Online</span>}
              </div>
            </div>
          </div>

          {/* Always visible: Funil + Temperatura */}
          <div className="rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-4 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-aurenMuted font-semibold">Pipeline</p>
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

          {/* WhatsApp-specific fields */}
          {conv.channel === "whatsapp" && (cd.phone || cd.recado) && (
            <div className="rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-aurenMuted font-semibold">WhatsApp</p>
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

          {/* Instagram-specific fields */}
          {conv.channel === "instagram" && (cd.username || cd.bio) && (
            <div className="rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] p-4 space-y-3">
              <p className="text-[10px] uppercase tracking-widest text-aurenMuted font-semibold">Instagram</p>
              {cd.username && (
                <div className="flex items-center gap-3">
                  <Instagram size={14} className="text-[#E1306C] flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-zinc-500 mb-0.5">@Username</p>
                    <a
                      href={`https://instagram.com/${cd.username.replace("@", "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-[#E1306C] font-medium hover:underline flex items-center gap-1"
                    >
                      {cd.username}
                      <ExternalLink size={10} />
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
                    <a
                      href={cd.linkInBio}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-aurenGold hover:underline flex items-center gap-1"
                    >
                      {cd.linkInBio.replace("https://", "")}
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ─── Dropdown Menu ──────────────────────────────────────────────────────── */
const MENU_OPTIONS = [
  { label: "Dados do contato", icon: User, action: "contact" },
  { label: "Selecionar mensagens", icon: CheckSquare, action: "select" },
  { label: "Silenciar notificações", icon: BellOff, action: "mute" },
  { label: "Mensagens temporárias", icon: Timer, action: "temp" },
  { label: "Adicionar aos Favoritos", icon: Star, action: "fav" },
  { divider: true },
  { label: "Fechar conversa", icon: XCircle, action: "close" },
  { divider: true },
  { label: "Denunciar", icon: Flag, action: "report", danger: true },
  { label: "Bloquear", icon: Ban, action: "block", danger: true },
  { divider: true },
  { label: "Limpar conversa", icon: Trash, action: "clear", danger: true },
  { label: "Apagar conversa", icon: Trash2, action: "delete", danger: true },
];

const ATTACH_OPTIONS = [
  { label: "Foto", icon: Image },
  { label: "Documento", icon: FileText },
  { label: "Áudio", icon: Mic },
  { label: "Localização", icon: MapPin },
];

const EMOJI_LIST = [
  "😀","😂","😍","🥰","😎","🤔","😢","😡","👍","👎",
  "🙏","🔥","💯","❤️","✨","🎉","🚀","💪","👏","🤝",
  "😊","🥳","😅","🤣","😇","🤩","😏","🙄","😬","😴",
];

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

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function Chat({ onMenuOpen }) {
  const [selected, setSelected] = useState(chatConversations[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(
    Object.fromEntries(chatConversations.map((c) => [c.id, [...c.messages]]))
  );
  const [showList, setShowList] = useState(true);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachOpen, setAttachOpen] = useState(false);
  const [emojiOpen, setEmojiOpen] = useState(false);

  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);
  const attachRef = useRef(null);
  const emojiRef = useRef(null);

  useClickOutside(menuRef, () => setMenuOpen(false));
  useClickOutside(attachRef, () => setAttachOpen(false));
  useClickOutside(emojiRef, () => setEmojiOpen(false));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selected]);

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), newMsg] }));
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleMenuAction(action) {
    setMenuOpen(false);
    if (action === "contact") setDrawerOpen(true);
    if (action === "clear") {
      setMessages((prev) => ({ ...prev, [selected.id]: [] }));
    }
  }

  function insertEmoji(emoji) {
    setInput((prev) => prev + emoji);
    setEmojiOpen(false);
  }

  const filtered = chatConversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentMessages = messages[selected?.id] || [];
  const tempTag = selected ? temperaturaTags[selected.temperature] : null;
  const funnelTag = selected ? funnelTags[selected.funnel] : null;

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-aurenStroke relative">
      {/* ── Conversation List ─────────────────────────────────────────────── */}
      <aside
        className={`
          flex flex-col border-r border-aurenStroke bg-aurenCard
          w-full md:w-[290px] lg:w-[310px] flex-shrink-0
          ${showList ? "flex" : "hidden"} md:flex
        `}
      >
        <div className="border-b border-aurenStroke px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-playfair text-xl font-bold text-aurenGold">Conversas</h2>
            <button
              type="button"
              onClick={onMenuOpen}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold md:hidden"
            >
              <Menu size={18} />
            </button>
          </div>
          <label className="flex h-9 items-center rounded-xl border border-aurenStroke bg-[#141414] px-3 gap-2">
            <Search size={13} className="text-zinc-500 flex-shrink-0" />
            <input
              className="w-full bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
              placeholder="Buscar conversa..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filtered.map((conv) => {
            const tt = temperaturaTags[conv.temperature];
            const ft = funnelTags[conv.funnel];
            return (
              <button
                key={conv.id}
                type="button"
                onClick={() => { setSelected(conv); setShowList(false); setDrawerOpen(false); }}
                className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-all border-b border-aurenStroke/30 hover:bg-white/[0.04] ${
                  selected?.id === conv.id
                    ? "bg-aurenGold/10 border-l-2 border-l-aurenGold pl-[14px]"
                    : ""
                }`}
              >
                <div className="relative mt-0.5">
                  <Avatar initials={conv.avatar} photoUrl={conv.photoUrl} />
                  <ChannelDot channel={conv.channel} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <p className="text-sm font-medium text-zinc-100 truncate">{conv.name}</p>
                    <span className="text-[10px] text-zinc-500 flex-shrink-0">{conv.time}</span>
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
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── Chat Window ──────────────────────────────────────────────────── */}
      <div
        className={`
          flex flex-col flex-1 min-w-0 bg-[#0C0C0C]
          ${showList ? "hidden" : "flex"} md:flex
        `}
      >
        {selected ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-aurenStroke bg-[#111] px-4 py-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowList(true)}
                className="md:hidden rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-aurenGold flex-shrink-0"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Clickable avatar + name → opens drawer */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
              >
                <div className="relative flex-shrink-0">
                  <Avatar initials={selected.avatar} photoUrl={selected.photoUrl} size="lg" />
                  <ChannelDot channel={selected.channel} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-playfair text-base font-bold text-white leading-tight truncate">
                    {selected.name}
                  </p>
                  <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                    <ChannelIcon channel={selected.channel} />
                    <span className="text-[10px] text-zinc-500">{chatChannels[selected.channel]?.label}</span>
                    {tempTag && <Tag label={tempTag.label} color={tempTag.color} bg={tempTag.bg} />}
                    {funnelTag && <Tag label={funnelTag.label} color={funnelTag.color} bg={funnelTag.bg} />}
                    {selected.online && <span className="text-[10px] text-emerald-400 font-medium">● Online</span>}
                  </div>
                </div>
              </button>

              {/* Action buttons */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <Phone size={15} />
                </button>
                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <Video size={15} />
                </button>

                {/* 3-dot dropdown */}
                <div className="relative" ref={menuRef}>
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className={`rounded-lg p-2 hover:bg-white/5 transition-colors ${menuOpen ? "text-aurenGold bg-white/5" : "text-zinc-400 hover:text-aurenGold"}`}
                  >
                    <MoreHorizontal size={15} />
                  </button>

                  {menuOpen && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-56 rounded-2xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/60 py-1 overflow-hidden">
                      {MENU_OPTIONS.map((opt, i) =>
                        opt.divider ? (
                          <div key={`divider-${i}`} className="my-1 border-t border-aurenStroke/50" />
                        ) : (
                          <button
                            key={opt.action}
                            type="button"
                            onClick={() => handleMenuAction(opt.action)}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                              opt.danger ? "text-red-400 hover:text-red-300" : "text-zinc-300 hover:text-zinc-100"
                            }`}
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

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-5 space-y-3">
              {currentMessages.length === 0 && (
                <div className="flex h-full items-center justify-center">
                  <p className="text-zinc-600 text-sm font-poppins">Nenhuma mensagem ainda.</p>
                </div>
              )}
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.from === "me"
                        ? "bg-aurenGold text-[#111] rounded-br-sm font-medium"
                        : "bg-[#1C1C1C] border border-aurenStroke/60 text-zinc-100 rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`mt-1.5 text-[10px] text-right ${msg.from === "me" ? "text-[#111]/55" : "text-zinc-600"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="border-t border-aurenStroke bg-[#111] px-4 py-3 flex-shrink-0">
              <div className="flex items-end gap-2">
                <div className="flex-1 flex flex-col rounded-2xl border border-aurenStroke bg-[#1A1A1A] px-4 py-3 transition-colors focus-within:border-aurenGold/40">
                  <textarea
                    rows={1}
                    className="w-full resize-none bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500 leading-relaxed"
                    placeholder="Digite uma mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    style={{ maxHeight: "6rem", overflowY: "auto" }}
                  />
                  <div className="flex items-center gap-1 mt-2 pt-2 border-t border-aurenStroke/40">
                    {/* Attach menu */}
                    <div className="relative" ref={attachRef}>
                      <button
                        type="button"
                        onClick={() => { setAttachOpen((v) => !v); setEmojiOpen(false); }}
                        className={`rounded-lg p-1.5 transition-colors ${attachOpen ? "text-aurenGold" : "text-zinc-500 hover:text-aurenGold"}`}
                      >
                        <Paperclip size={15} />
                      </button>
                      {attachOpen && (
                        <div className="absolute bottom-full left-0 mb-2 z-50 w-44 rounded-xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/50 py-1 overflow-hidden">
                          {ATTACH_OPTIONS.map((opt) => (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => setAttachOpen(false)}
                              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-zinc-300 hover:bg-white/5 hover:text-aurenGold transition-colors"
                            >
                              <opt.icon size={14} className="text-aurenGold/60 flex-shrink-0" />
                              <span className="font-poppins">{opt.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Emoji picker */}
                    <div className="relative" ref={emojiRef}>
                      <button
                        type="button"
                        onClick={() => { setEmojiOpen((v) => !v); setAttachOpen(false); }}
                        className={`rounded-lg p-1.5 transition-colors ${emojiOpen ? "text-aurenGold" : "text-zinc-500 hover:text-aurenGold"}`}
                      >
                        <Smile size={15} />
                      </button>
                      {emojiOpen && (
                        <div className="absolute bottom-full left-0 mb-2 z-50 w-56 rounded-xl border border-aurenGold/10 bg-[#1A1A1A] shadow-2xl shadow-black/50 p-3">
                          <p className="text-[10px] text-zinc-500 mb-2 font-poppins uppercase tracking-wider">Emojis</p>
                          <div className="grid grid-cols-6 gap-1">
                            {EMOJI_LIST.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => insertEmoji(emoji)}
                                className="flex items-center justify-center h-8 w-8 rounded-lg text-lg hover:bg-white/10 transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <span className="ml-auto text-[10px] text-zinc-600 font-poppins">Enter para enviar</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={sendMessage}
                  className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-2xl bg-aurenGold text-[#111] hover:brightness-110 shadow-lg shadow-aurenGold/15 transition"
                >
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

      {/* ── Contact Drawer ────────────────────────────────────────────────── */}
      {drawerOpen && selected && (
        <ContactDrawer conv={selected} onClose={() => setDrawerOpen(false)} />
      )}
    </div>
  );
}
