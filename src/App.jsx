import { useState } from "react";
import Agents from "./components/Agents";
import CalendarCard from "./components/CalendarCard";
import Chat from "./components/Chat";
import ConsultationCard from "./components/ConsultationCard";
import CourseCard from "./components/CourseCard";
import Header from "./components/Header";
import HomeworkProgressCard from "./components/HomeworkProgressCard";
import InboxCard from "./components/InboxCard";
import LearningProgressCard from "./components/LearningProgressCard";
import MyGroupCard from "./components/MyGroupCard";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatFocusMode, setChatFocusMode] = useState(false);

  const isChat   = activeMenu === "chat";
  const isAgents = activeMenu === "agents";

  function handleMenuSelect(item) {
    setActiveMenu(item);
    setChatFocusMode(false);
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0A] font-poppins text-zinc-100">
      {!chatFocusMode && (
        <Sidebar
          activeItem={activeMenu}
          onSelect={handleMenuSelect}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      {isChat ? (
        <main className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0F0F0F] p-3 sm:p-4">
          <Chat
            onMenuOpen={() => setSidebarOpen(true)}
            focusMode={chatFocusMode}
            onFocusToggle={() => setChatFocusMode((v) => !v)}
          />
        </main>
      ) : isAgents ? (
        <main className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#0F0F0F]">
          <Agents onMenuOpen={() => setSidebarOpen(true)} />
        </main>
      ) : (
        <main className="flex-1 min-w-0 overflow-y-auto custom-scrollbar bg-[#0F0F0F]">
          <div className="mx-auto p-4 sm:p-6 lg:p-10">
            <Header onMenuOpen={() => setSidebarOpen(true)} title="Dashboard" />
            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1fr]">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <CourseCard />
                  <ConsultationCard />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-[0.8fr_1.2fr]">
                  <MyGroupCard />
                  <LearningProgressCard />
                </div>
                <InboxCard />
              </div>
              <div className="flex flex-col gap-6">
                <HomeworkProgressCard />
                <CalendarCard />
              </div>
            </section>
          </div>
        </main>
      )}
    </div>
  );
}
