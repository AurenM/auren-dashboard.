import { useRef, useState } from "react";
import {
  Bot,
  BookOpen,
  ChevronDown,
  FileText,
  Link2,
  Plus,
  Save,
  Shield,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from "lucide-react";

/* ─── tiny shared helpers ─── */

function SectionCard({ icon: Icon, iconBg, title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#141414] p-6 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <span className={`inline-flex items-center justify-center h-10 w-10 rounded-xl ${iconBg}`}>
          <Icon size={18} />
        </span>
        <div>
          <p className="font-playfair text-base font-bold text-white">{title}</p>
          <p className="text-[11px] text-zinc-500 font-poppins">{subtitle}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-zinc-400 mb-1.5 font-poppins">
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/[0.08] bg-[#0F0F0F] px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 font-poppins outline-none focus:border-aurenGold/40 focus:ring-1 focus:ring-aurenGold/20 transition-all";

const selectCls =
  "w-full rounded-xl border border-white/[0.08] bg-[#0F0F0F] px-4 py-2.5 text-sm text-zinc-100 font-poppins outline-none focus:border-aurenGold/40 focus:ring-1 focus:ring-aurenGold/20 transition-all appearance-none cursor-pointer";

/* ─── Tag input ─── */
function TagInput({ tags, onChange, placeholder }) {
  const [val, setVal] = useState("");

  function addTag(raw) {
    const t = raw.trim();
    if (!t || tags.includes(t)) return;
    onChange([...tags, t]);
    setVal("");
  }

  function onKey(e) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(val);
    } else if (e.key === "Backspace" && !val && tags.length) {
      onChange(tags.slice(0, -1));
    }
  }

  return (
    <div className="min-h-[44px] flex flex-wrap gap-2 items-center rounded-xl border border-white/[0.08] bg-[#0F0F0F] px-3 py-2 focus-within:border-aurenGold/40 focus-within:ring-1 focus-within:ring-aurenGold/20 transition-all">
      {tags.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-lg bg-aurenGold/10 border border-aurenGold/20 px-2.5 py-0.5 text-[11px] font-semibold text-aurenGold font-poppins"
        >
          {t}
          <button type="button" onClick={() => onChange(tags.filter((x) => x !== t))} className="hover:text-red-400 transition-colors">
            <X size={10} />
          </button>
        </span>
      ))}
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={onKey}
        onBlur={() => addTag(val)}
        placeholder={tags.length === 0 ? placeholder : ""}
        className="flex-1 min-w-[120px] bg-transparent text-sm text-zinc-100 placeholder-zinc-600 outline-none font-poppins"
      />
    </div>
  );
}

/* ─── Toggle switch ─── */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-200 ${
        checked ? "border-aurenGold bg-aurenGold/20" : "border-white/10 bg-white/5"
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-4 w-4 rounded-full shadow-md transition-transform duration-200 mt-[1px] ${
          checked ? "translate-x-5 bg-aurenGold" : "translate-x-0.5 bg-zinc-500"
        }`}
      />
    </button>
  );
}

/* ─── Product Row ─── */
function ProductRow({ product, onChange, onRemove }) {
  const isHigh = product.type === "high";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_auto_1fr_auto] gap-3 items-center p-4 rounded-xl border border-white/[0.05] bg-[#0A0A0A]">
      {/* Name */}
      <input
        value={product.name}
        onChange={(e) => onChange({ ...product, name: e.target.value })}
        placeholder="Nome do produto"
        className={inputCls}
      />

      {/* Price */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm font-poppins">R$</span>
        <input
          value={product.price}
          onChange={(e) => onChange({ ...product, price: e.target.value })}
          placeholder="0,00"
          className={`${inputCls} pl-9`}
        />
      </div>

      {/* Toggle + label */}
      <div className="flex items-center gap-2 sm:justify-center">
        <span className={`text-[10px] font-bold tracking-wider font-poppins transition-colors ${!isHigh ? "text-aurenGold" : "text-zinc-600"}`}>
          LOW
        </span>
        <Toggle checked={isHigh} onChange={(v) => onChange({ ...product, type: v ? "high" : "low", actionLink: "" })} />
        <span className={`text-[10px] font-bold tracking-wider font-poppins transition-colors ${isHigh ? "text-violet-400" : "text-zinc-600"}`}>
          HIGH
        </span>
      </div>

      {/* Action link */}
      <div className="relative">
        <Link2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          value={product.actionLink}
          onChange={(e) => onChange({ ...product, actionLink: e.target.value })}
          placeholder={isHigh ? "Link de Agendamento" : "Link de Checkout"}
          className={`${inputCls} pl-8`}
        />
        {/* Animated badge */}
        <span
          className={`absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-bold px-1.5 py-0.5 rounded-md tracking-wider font-poppins transition-all ${
            isHigh
              ? "bg-violet-500/15 text-violet-300 border border-violet-500/20"
              : "bg-aurenGold/10 text-aurenGold border border-aurenGold/20"
          }`}
        >
          {isHigh ? "CALL" : "BUY"}
        </span>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="no-lift flex items-center justify-center h-10 w-10 rounded-xl text-zinc-600 hover:text-red-400 hover:bg-red-400/10 transition-colors border border-white/[0.05]"
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
}

/* ─── URL List ─── */
function UrlList({ urls, onChange }) {
  const [val, setVal] = useState("");

  function add() {
    const t = val.trim();
    if (!t || urls.includes(t)) return;
    onChange([...urls, t]);
    setVal("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          placeholder="https://site.com.br/pagina"
          className={`${inputCls} flex-1`}
        />
        <button
          type="button"
          onClick={add}
          className="no-lift flex items-center gap-1.5 rounded-xl border border-aurenGold/30 bg-aurenGold/10 px-4 text-sm font-semibold text-aurenGold hover:bg-aurenGold/20 transition-colors whitespace-nowrap font-poppins"
        >
          <Plus size={14} /> Adicionar
        </button>
      </div>
      {urls.length > 0 && (
        <div className="flex flex-col gap-1.5 mt-1">
          {urls.map((u, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-white/[0.05] bg-[#0A0A0A] px-3 py-2">
              <Link2 size={12} className="text-aurenGold/50 flex-shrink-0" />
              <span className="flex-1 text-xs text-zinc-400 font-poppins truncate">{u}</span>
              <button
                type="button"
                onClick={() => onChange(urls.filter((_, j) => j !== i))}
                className="no-lift text-zinc-600 hover:text-red-400 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Dropzone ─── */
function Dropzone({ files, onAdd, onRemove }) {
  const inputRef = useRef();

  function handleDrop(e) {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files).filter(
      (f) => f.type === "application/pdf" || f.name.endsWith(".doc") || f.name.endsWith(".docx")
    );
    onAdd(dropped);
  }

  function handleChange(e) {
    onAdd(Array.from(e.target.files));
    e.target.value = "";
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="relative flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-aurenGold/20 bg-aurenGold/[0.03] px-6 py-8 cursor-pointer hover:border-aurenGold/40 hover:bg-aurenGold/[0.06] transition-all group"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-aurenGold/10 text-aurenGold group-hover:bg-aurenGold/20 transition-colors">
          <Upload size={22} />
        </span>
        <div className="text-center">
          <p className="text-sm font-semibold text-zinc-300 font-poppins">Arraste arquivos aqui ou clique para selecionar</p>
          <p className="text-[11px] text-zinc-600 mt-0.5 font-poppins">PDF, DOC, DOCX — máx. 10 MB por arquivo</p>
        </div>
        <input ref={inputRef} type="file" multiple accept=".pdf,.doc,.docx" onChange={handleChange} className="hidden" />
      </div>

      {files.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-white/[0.05] bg-[#0A0A0A] px-3 py-2.5">
              <FileText size={14} className="text-aurenGold/60 flex-shrink-0" />
              <span className="flex-1 text-xs text-zinc-300 font-poppins truncate">{f.name}</span>
              <span className="text-[10px] text-zinc-600 font-poppins">{(f.size / 1024).toFixed(0)} KB</span>
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="no-lift text-zinc-600 hover:text-red-400 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─── */
let _id = 0;
function uid() { return ++_id; }

export default function Agents({ onMenuOpen }) {
  /* Section 1 */
  const [agentName, setAgentName]   = useState("Auren Vendas");
  const [persona, setPersona]       = useState("consultivo");
  const [prompt, setPrompt]         = useState("");

  /* Section 2 */
  const [bannedWords, setBannedWords]   = useState(["concorrente", "desconto", "grátis"]);
  const [spillTriggers, setSpillTriggers] = useState(["falar com humano", "quero o suporte"]);

  /* Section 3 */
  const [kbFiles, setKbFiles] = useState([]);
  const [kbUrls, setKbUrls]   = useState([]);

  /* Section 4 */
  const [products, setProducts] = useState([
    { id: uid(), name: "Mentoria Express",   price: "297",   type: "low",  actionLink: "" },
    { id: uid(), name: "Programa Elite VIP", price: "5.900", type: "high", actionLink: "" },
  ]);

  function addProduct() {
    setProducts((p) => [...p, { id: uid(), name: "", price: "", type: "low", actionLink: "" }]);
  }

  function updateProduct(id, data) {
    setProducts((p) => p.map((x) => (x.id === id ? data : x)));
  }

  function removeProduct(id) {
    setProducts((p) => p.filter((x) => x.id !== id));
  }

  function addFiles(newFiles) {
    setKbFiles((prev) => [...prev, ...newFiles]);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Top bar */}
      <div className="flex-shrink-0 border-b border-white/[0.05] bg-[#0F0F0F] px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={onMenuOpen}
            className="no-lift md:hidden rounded-lg p-2 text-zinc-400 hover:text-aurenGold hover:bg-white/5 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-aurenGold/15 text-aurenGold">
                <Bot size={14} />
              </span>
              <h1 className="font-playfair text-xl font-bold text-white">Configuração de Agentes</h1>
            </div>
            <p className="text-[11px] text-zinc-500 font-poppins mt-0.5 ml-9">Personalize a inteligência do seu agente de vendas</p>
          </div>
        </div>

        <button
          type="button"
          className="no-lift hidden sm:flex items-center gap-2 rounded-xl bg-aurenGold px-5 py-2.5 text-[12px] font-bold uppercase tracking-wider text-[#0A0A0A] hover:brightness-110 transition-all shadow-lg shadow-aurenGold/15 font-poppins"
        >
          <Save size={14} /> Salvar Configuração
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-5 sm:px-8 py-6">
        {/* Active agent pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
          <span className="text-[11px] font-semibold text-emerald-400 font-poppins tracking-wide">Agente ativo: {agentName || "Sem nome"}</span>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* ── Column left ── */}
          <div className="flex flex-col gap-6">

            {/* 1 — Identidade e Tom de Voz */}
            <SectionCard
              icon={Bot}
              iconBg="bg-aurenGold/10 text-aurenGold"
              title="Identidade e Tom de Voz"
              subtitle="Defina quem é seu agente e como ele se comunica"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Nome do Agente</Label>
                  <input
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    placeholder="Ex: Auren Vendas"
                    className={inputCls}
                  />
                </div>

                <div>
                  <Label>Persona</Label>
                  <div className="relative">
                    <select
                      value={persona}
                      onChange={(e) => setPersona(e.target.value)}
                      className={selectCls}
                    >
                      <option value="autoritario">Autoritário — direto, assertivo, fechador</option>
                      <option value="consultivo">Consultivo — diagnóstico, empático, estratégico</option>
                      <option value="amigavel">Amigável — leve, próximo, relacional</option>
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  </div>
                  {/* Persona preview badge */}
                  <div className="mt-2 flex gap-2">
                    {[
                      { val: "autoritario", label: "Direto", color: "text-red-400 border-red-400/20 bg-red-400/5" },
                      { val: "consultivo",  label: "Estratégico", color: "text-aurenGold border-aurenGold/20 bg-aurenGold/5" },
                      { val: "amigavel",    label: "Relacional", color: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5" },
                    ].map(({ val, label, color }) => (
                      <span
                        key={val}
                        className={`text-[10px] font-semibold px-2.5 py-1 rounded-lg border font-poppins transition-opacity ${color} ${persona === val ? "opacity-100" : "opacity-30"}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Prompt Mestre</Label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={5}
                    placeholder="Descreva o comportamento central do agente. Ex: Você é um consultor de vendas especializado em infoprodutos premium. Nunca mencione preço antes de entender a dor do lead..."
                    className={`${inputCls} resize-none leading-relaxed`}
                  />
                  <p className="mt-1 text-right text-[10px] text-zinc-600 font-poppins">{prompt.length} caracteres</p>
                </div>
              </div>
            </SectionCard>

            {/* 2 — Segurança */}
            <SectionCard
              icon={Shield}
              iconBg="bg-red-500/10 text-red-400"
              title="Segurança (Brand Safety)"
              subtitle="Controle o que o agente pode e não pode dizer"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Palavras Banidas</Label>
                  <TagInput tags={bannedWords} onChange={setBannedWords} placeholder="Digite e pressione Enter..." />
                  <p className="mt-1.5 text-[10px] text-zinc-600 font-poppins">O agente nunca usará essas palavras em suas respostas.</p>
                </div>

                <div>
                  <Label>Gatilhos de Transbordo</Label>
                  <TagInput tags={spillTriggers} onChange={setSpillTriggers} placeholder="Ex: falar com humano..." />
                  <p className="mt-1.5 text-[10px] text-zinc-600 font-poppins">Quando detectados, a conversa é escalada para atendimento humano.</p>
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── Column right ── */}
          <div className="flex flex-col gap-6">

            {/* 3 — Base de Conhecimento */}
            <SectionCard
              icon={BookOpen}
              iconBg="bg-blue-500/10 text-blue-400"
              title="Base de Conhecimento"
              subtitle="Documentos e URLs que o agente usa como referência"
            >
              <div className="flex flex-col gap-5">
                <div>
                  <Label>Upload de Arquivos (PDF / DOC)</Label>
                  <Dropzone
                    files={kbFiles}
                    onAdd={addFiles}
                    onRemove={(i) => setKbFiles((f) => f.filter((_, j) => j !== i))}
                  />
                </div>

                <div>
                  <Label>URLs de Referência</Label>
                  <UrlList urls={kbUrls} onChange={setKbUrls} />
                </div>
              </div>
            </SectionCard>

            {/* 4 — Estratégia de Vendas */}
            <SectionCard
              icon={TrendingUp}
              iconBg="bg-violet-500/10 text-violet-400"
              title="Estratégia de Vendas"
              subtitle="Produtos do funil — defina tipo e link de conversão"
            >
              <div className="flex flex-col gap-3">
                {/* Column headers — visible on sm+ */}
                <div className="hidden sm:grid grid-cols-[1fr_120px_auto_1fr_auto] gap-3 px-4">
                  {["Produto", "Valor", "Ticket", "Link de Ação", ""].map((h) => (
                    <span key={h} className="text-[10px] font-semibold uppercase tracking-[0.15em] text-zinc-600 font-poppins">{h}</span>
                  ))}
                </div>

                {products.length === 0 && (
                  <p className="text-center text-sm text-zinc-600 font-poppins py-4">Nenhum produto adicionado.</p>
                )}

                {products.map((p) => (
                  <ProductRow
                    key={p.id}
                    product={p}
                    onChange={(data) => updateProduct(p.id, data)}
                    onRemove={() => removeProduct(p.id)}
                  />
                ))}

                <button
                  type="button"
                  onClick={addProduct}
                  className="no-lift mt-1 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] py-3 text-sm font-semibold text-zinc-500 hover:border-aurenGold/30 hover:text-aurenGold hover:bg-aurenGold/[0.03] transition-all font-poppins"
                >
                  <Plus size={15} /> Adicionar Produto
                </button>
              </div>
            </SectionCard>
          </div>
        </div>

        {/* Mobile save button */}
        <div className="mt-6 sm:hidden">
          <button
            type="button"
            className="no-lift flex w-full items-center justify-center gap-2 rounded-xl bg-aurenGold py-3.5 text-sm font-bold uppercase tracking-wider text-[#0A0A0A] hover:brightness-110 transition-all shadow-lg shadow-aurenGold/15 font-poppins"
          >
            <Save size={16} /> Salvar Configuração
          </button>
        </div>

        <div className="h-6" />
      </div>
    </div>
  );
}
