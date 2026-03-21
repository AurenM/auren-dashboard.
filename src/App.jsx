import { useState } from "react";
import CalendarCard from "./components/CalendarCard";
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

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0A0A0A] font-poppins text-zinc-100">
      {/* Sidebar Fixa */}
      <Sidebar activeItem={activeMenu} onSelect={setActiveMenu} />

      {/* Área de Conteúdo com Rolagem Independente */}
      <main className="flex-1 overflow-y-auto bg-[#0F0F0F] custom-scrollbar">
        <div className="container mx-auto p-6 lg:p-10">
          <Header />

          <section className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[1.8fr_1fr]">
            {/* Coluna Principal */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <CourseCard />
                <ConsultationCard />
              </div>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <MyGroupCard />
                <LearningProgressCard />
              </div>
              
              <InboxCard />
            </div>

            {/* Coluna Lateral do Dashboard */}
            <div className="flex flex-col gap-6">
              <HomeworkProgressCard />
              <CalendarCard />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}