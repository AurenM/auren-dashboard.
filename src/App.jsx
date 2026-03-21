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
    <div className="min-h-screen w-full overflow-y-auto bg-[#0A0A0A] font-poppins text-zinc-100">
      <div className="min-h-screen w-full p-8">
        <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col rounded-2xl border border-aurenStroke bg-[#101010] shadow-soft xl:flex-row">
          <Sidebar activeItem={activeMenu} onSelect={setActiveMenu} />

          <main className="flex-1 p-8">
            <Header />

            <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.8fr_1fr]">
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <CourseCard />
                  <ConsultationCard />
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_2fr]">
                  <MyGroupCard />
                  <LearningProgressCard />
                </div>
                <InboxCard />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <HomeworkProgressCard />
                <CalendarCard />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
