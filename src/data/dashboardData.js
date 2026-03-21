import {
  BookOpen,
  CalendarDays,
  FileText,
  Home,
  LayoutGrid,
  MessageCircle,
  Users,
} from "lucide-react";

export const menuItems = [
  { id: "home", icon: Home, label: "Inicio" },
  { id: "statistic", icon: LayoutGrid, label: "Estatísticas" },
  { id: "my-class", icon: BookOpen, label: "Minha Turma" },
  { id: "schedules", icon: CalendarDays, label: "Agenda" },
  { id: "notes", icon: FileText, label: "Notas" },
];

export const communityItems = [
  { id: "chat", icon: MessageCircle, label: "Chat", hasNotification: true },
  { id: "meetings", icon: Users, label: "Reuniões", hasNotification: true },
];

export const progressSeries = [
  { name: "Seg", value: 12 },
  { name: "Ter", value: 38 },
  { name: "Qua", value: 22 },
  { name: "Qui", value: 58 },
  { name: "Sex", value: 35 },
  { name: "Sáb", value: 66 },
  { name: "Dom", value: 52 },
];

export const leadDestaque = {
  id: 1,
  nome: "Rodrigo Viriato",
  segmento: "Empresário Premium",
  temperatura: "Hot",
  interacoes: 42,
  dataEntrada: "2026-02-14",
  ultimaAcao: "Call estratégica marcada para hoje",
};

export const melhoresClientes = [
  {
    id: 1,
    nome: "Rodrigo Viriato",
    avatar: "RV",
    avatarUrl: "https://i.pravatar.cc/80?img=12",
    tempoNaBase: "6 meses",
    faturamentoGerado: 148000,
    lucroReal: 59200,
    comprasRealizadas: 9,
  },
  {
    id: 2,
    nome: "Helena M. Albuquerque",
    avatar: "HA",
    avatarUrl: "https://i.pravatar.cc/80?img=47",
    tempoNaBase: "11 meses",
    faturamentoGerado: 236000,
    lucroReal: 88400,
    comprasRealizadas: 14,
  },
  {
    id: 3,
    nome: "Guilherme S. Fontana",
    avatar: "GF",
    avatarUrl: "https://i.pravatar.cc/80?img=33",
    tempoNaBase: "8 meses",
    faturamentoGerado: 172500,
    lucroReal: 67180,
    comprasRealizadas: 10,
  },
  {
    id: 4,
    nome: "Marina L. Paiva",
    avatar: "MP",
    avatarUrl: "https://i.pravatar.cc/80?img=5",
    tempoNaBase: "4 meses",
    faturamentoGerado: 119700,
    lucroReal: 43820,
    comprasRealizadas: 7,
  },
];

export const statusAbordagemEtapas = [
  { id: 1, etapa: "Lead Qualificado", progressoDia: 25, progressoSemana: 40, cor: "#D4AF37" },
  { id: 2, etapa: "Reunião Agendada", progressoDia: 55, progressoSemana: 68, cor: "#B9932F" },
  { id: 3, etapa: "Proposta Enviada", progressoDia: 78, progressoSemana: 86, cor: "#E0BF5A" },
  { id: 4, etapa: "Fechamento/Assinatura", progressoDia: 95, progressoSemana: 100, cor: "#F0D27A" },
];

export const chatChannels = {
  whatsapp: { label: "WhatsApp", color: "#25D366", bg: "rgba(37,211,102,0.15)" },
  instagram: { label: "Instagram", color: "#E1306C", bg: "rgba(225,48,108,0.15)" },
  messenger: { label: "Messenger", color: "#0084FF", bg: "rgba(0,132,255,0.15)" },
  telegram: { label: "Telegram", color: "#26A5E4", bg: "rgba(38,165,228,0.15)" },
  webchat: { label: "WebChat", color: "#D4AF37", bg: "rgba(212,175,55,0.15)" },
};

export const chatConversations = [
  {
    id: 1,
    name: "Rodrigo Viriato",
    avatar: "RV",
    channel: "whatsapp",
    lastMessage: "Perfeito! Até amanhã então para a call estratégica.",
    time: "09:41",
    unread: 2,
    online: true,
    messages: [
      { id: 1, from: "them", text: "Olá! Tudo bem? Vi que temos uma call marcada.", time: "09:30" },
      { id: 2, from: "me", text: "Sim! Às 10h. Vai ser sobre o alinhamento de tráfego.", time: "09:32" },
      { id: 3, from: "them", text: "Ótimo. Já separei os relatórios de performance.", time: "09:35" },
      { id: 4, from: "me", text: "Perfeito, vamos revisar tudo juntos.", time: "09:38" },
      { id: 5, from: "them", text: "Perfeito! Até amanhã então para a call estratégica.", time: "09:41" },
    ],
  },
  {
    id: 2,
    name: "Helena M. Albuquerque",
    avatar: "HA",
    channel: "instagram",
    lastMessage: "Adorei a proposta! Quando podemos fechar?",
    time: "08:55",
    unread: 1,
    online: true,
    messages: [
      { id: 1, from: "them", text: "Oi! Vi a proposta que vocês enviaram.", time: "08:40" },
      { id: 2, from: "me", text: "Oi Helena! Ficou com alguma dúvida?", time: "08:45" },
      { id: 3, from: "them", text: "Adorei a proposta! Quando podemos fechar?", time: "08:55" },
    ],
  },
  {
    id: 3,
    name: "Guilherme S. Fontana",
    avatar: "GF",
    channel: "messenger",
    lastMessage: "Pode me enviar o link da reunião?",
    time: "Ontem",
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: "me", text: "Guilherme, confirmando nossa reunião de amanhã.", time: "14:00" },
      { id: 2, from: "them", text: "Confirmado! Qual o horário?", time: "14:10" },
      { id: 3, from: "me", text: "15h no Google Meet.", time: "14:12" },
      { id: 4, from: "them", text: "Pode me enviar o link da reunião?", time: "14:15" },
    ],
  },
  {
    id: 4,
    name: "Marina L. Paiva",
    avatar: "MP",
    channel: "telegram",
    lastMessage: "Muito obrigada pelo suporte!",
    time: "Ontem",
    unread: 0,
    online: false,
    messages: [
      { id: 1, from: "them", text: "Preciso de ajuda com o acesso à plataforma.", time: "11:00" },
      { id: 2, from: "me", text: "Claro! Vou te enviar o link de redefinição de senha.", time: "11:05" },
      { id: 3, from: "them", text: "Funcionou! Consegui entrar.", time: "11:20" },
      { id: 4, from: "them", text: "Muito obrigada pelo suporte!", time: "11:21" },
    ],
  },
  {
    id: 5,
    name: "Carlos Eduardo Braga",
    avatar: "CB",
    channel: "webchat",
    lastMessage: "Quero saber mais sobre o plano premium.",
    time: "Seg",
    unread: 3,
    online: false,
    messages: [
      { id: 1, from: "them", text: "Olá! Vim pelo site de vocês.", time: "10:00" },
      { id: 2, from: "me", text: "Seja bem-vindo! Como posso te ajudar?", time: "10:02" },
      { id: 3, from: "them", text: "Quero saber mais sobre o plano premium.", time: "10:03" },
    ],
  },
];
