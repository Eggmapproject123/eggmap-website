"use client";

import SidebarNav from "../components/SidebarNav";
import TopRightLogin from "../components/TopRightLogin";
import EggHero from "../components/EggHero";

export default function HomePage() {
  return (
    <>
      <SidebarNav />
      <TopRightLogin />

      <div>
        <EggHero />
      </div>
    </>
  );
} 