import { useState } from "react";
import { Send, Phone, Video, MoreHorizontal, Search } from "lucide-react";
import { chatConversations, chatChannels } from "../data/dashboardData";

function ChannelBadge({ channel }) {
  const ch = chatChannels[channel];
  return (
    <span
      className="inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
      style={{ color: ch.color, background: ch.bg }}
    >
      {ch.label}
    </span>
  );
}

function ChannelDot({ channel }) {
  const ch = chatChannels[channel];
  return (
    <span
      className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-aurenCard flex items-center justify-center"
      style={{ background: ch.color }}
      title={ch.label}
    />
  );
}

function Avatar({ initials, size = "md" }) {
  const sizeClass = size === "lg" ? "h-10 w-10 text-sm" : "h-9 w-9 text-xs";
  return (
    <div
      className={`relative flex-shrink-0 ${sizeClass} rounded-full border border-aurenGold/30 bg-gradient-to-br from-[#2A2212] to-[#1A1A1A] flex items-center justify-center font-bold text-aurenGold`}
    >
      {initials}
    </div>
  );
}

export default function Chat() {
  const [selected, setSelected] = useState(chatConversations[0]);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(
    Object.fromEntries(chatConversations.map((c) => [c.id, [...c.messages]]))
  );
  const [showList, setShowList] = useState(true);

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), from: "me", text: input.trim(), time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => ({ ...prev, [selected.id]: [...(prev[selected.id] || []), newMsg] }));
    setInput("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const currentMessages = messages[selected?.id] || [];

  return (
    <div className="flex h-full gap-0 overflow-hidden rounded-2xl border border-aurenStroke bg-[#111]">
      {/* Conversation List */}
      <aside
        className={`
          flex flex-col border-r border-aurenStroke bg-aurenCard
          w-full md:w-[300px] lg:w-[320px] flex-shrink-0
          ${showList ? "flex" : "hidden"} md:flex
        `}
      >
        <div className="border-b border-aurenStroke p-4">
          <h2 className="font-playfair text-xl font-bold text-aurenGold mb-3">Conversas</h2>
          <label className="flex h-9 items-center rounded-xl border border-aurenStroke bg-[#141414] px-3 gap-2">
            <Search size={14} className="text-zinc-500" />
            <input
              className="w-full bg-transparent text-xs text-zinc-100 outline-none placeholder:text-zinc-500"
              placeholder="Buscar conversa..."
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {chatConversations.map((conv) => (
            <button
              key={conv.id}
              type="button"
              onClick={() => { setSelected(conv); setShowList(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all border-b border-aurenStroke/40 hover:bg-white/5 ${
                selected?.id === conv.id ? "bg-aurenGold/10 border-l-2 border-l-aurenGold" : ""
              }`}
            >
              <div className="relative">
                <Avatar initials={conv.avatar} />
                <ChannelDot channel={conv.channel} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className="text-sm font-medium text-zinc-100 truncate">{conv.name}</p>
                  <span className="text-[10px] text-zinc-500 flex-shrink-0 ml-1">{conv.time}</span>
                </div>
                <div className="flex items-center justify-between gap-1">
                  <p className="text-[11px] text-zinc-500 truncate">{conv.lastMessage}</p>
                  {conv.unread > 0 && (
                    <span className="flex-shrink-0 h-4 w-4 rounded-full bg-aurenGold text-[9px] font-bold text-[#111] flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <ChannelBadge channel={conv.channel} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <div
        className={`
          flex flex-col flex-1 min-w-0
          ${showList ? "hidden" : "flex"} md:flex
        `}
      >
        {selected ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center gap-3 border-b border-aurenStroke bg-aurenCard px-4 py-3 flex-shrink-0">
              {/* Back button on mobile */}
              <button
                type="button"
                onClick={() => setShowList(true)}
                className="md:hidden rounded-lg p-1 text-zinc-400 hover:text-aurenGold mr-1"
              >
                ←
              </button>
              <div className="relative">
                <Avatar initials={selected.avatar} size="lg" />
                <ChannelDot channel={selected.channel} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-zinc-100">{selected.name}</p>
                <div className="flex items-center gap-2">
                  <ChannelBadge channel={selected.channel} />
                  {selected.online && (
                    <span className="text-[10px] text-emerald-400">● Online</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <Phone size={16} />
                </button>
                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <Video size={16} />
                </button>
                <button type="button" className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-aurenGold">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-3 bg-[#0F0F0F]">
              {currentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.from === "me"
                        ? "bg-aurenGold text-[#111] rounded-br-sm font-medium"
                        : "bg-[#1E1E1E] border border-aurenStroke text-zinc-100 rounded-bl-sm"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p
                      className={`mt-1 text-[10px] text-right ${
                        msg.from === "me" ? "text-[#111]/60" : "text-zinc-500"
                      }`}
                    >
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-aurenStroke bg-aurenCard px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex-1 flex items-center rounded-xl border border-aurenStroke bg-[#141414] px-4 py-2.5 gap-2">
                  <input
                    className="flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                    placeholder="Digite uma mensagem..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <button
                  type="button"
                  onClick={sendMessage}
                  className="rounded-xl bg-aurenGold p-2.5 text-[#111] hover:brightness-110 shadow-lg shadow-aurenGold/10 transition"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center text-zinc-500">
            <p className="font-playfair text-xl text-aurenGold/40">Selecione uma conversa</p>
          </div>
        )}
      </div>
    </div>
  );
}
