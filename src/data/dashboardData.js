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
