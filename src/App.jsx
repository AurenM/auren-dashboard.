import { useState } from "react";
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

  const isChat = activeMenu === "chat";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0A] font-poppins text-zinc-100">
      <Sidebar
        activeItem={activeMenu}
        onSelect={setActiveMenu}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className={`flex-1 min-w-0 bg-[#0F0F0F] ${isChat ? "flex flex-col overflow-hidden" : "overflow-y-auto custom-scrollbar"}`}>
        <div className={`p-4 sm:p-6 lg:p-10 ${isChat ? "flex flex-col flex-1 min-h-0" : "mx-auto"}`}>
          <Header
            onMenuOpen={() => setSidebarOpen(true)}
            title={isChat ? "Chat" : "Dashboard"}
          />

          {isChat ? (
            <div className="flex-1 min-h-0 pb-4">
              <Chat />
            </div>
          ) : (
            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1fr]">
              {/* Coluna Principal */}
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

              {/* Coluna Lateral */}
              <div className="flex flex-col gap-6">
                <HomeworkProgressCard />
                <CalendarCard />
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
