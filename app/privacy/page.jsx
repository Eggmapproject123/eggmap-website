"use client";

import SidebarNav from "../../components/SidebarNav";

export default function PrivacyPage() {
  return (
    <>
      <SidebarNav />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Our privacy policy will be published here soon.
        </p>
      </main>
    </>
  );
}
