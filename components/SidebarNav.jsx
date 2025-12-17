"use client";
import Link from "next/link";
import { useMenu } from "../app/MenuContext";

export default function SidebarNav() {
  const { isMenuOpen, toggleMenu } = useMenu();

  const closeMenu = () => {
    if (isMenuOpen) toggleMenu();
  };

  const linkStyle = {
    display: "block",
    padding: "12px 20px",
    background: "#07ffd6ff",
    marginBottom: "12px",
    borderRadius: "14px",
    textDecoration: "none",
    color: "#004b46",
    fontWeight: "600",
    fontSize: "18px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
    transition: "transform 0.2s ease",
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 4,
        zIndex: 1000,
      }}
    >
      {/* MENU + JELLY */}
      <div
        onClick={toggleMenu}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
    <span
  style={{
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.95)",
    fontFamily: "sans-serif",
    fontSize: "18px",
    fontWeight: "600",
    color: "#651eff",
    boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
    marginBottom: "6px",
  }}
>
  Menu
</span> 

        <img
          src="/clickjelly.png"
          alt="Menu"
          onClick={(e) => {
            e.stopPropagation();
            const img = e.currentTarget;
            img.style.animation = "none";
            void img.offsetWidth;
            img.style.animation = "jellySquish 0.35s ease";
            toggleMenu();
          }}
          style={{
            width: "70px",
            height: "70px",
            transition: "transform 0.2s ease",
            transform: isMenuOpen ? "scale(1.08)" : "scale(1)",
          }}
        />
      </div>

      {/* MENU ITEMS */}
      <div
        style={{
          width: "200px",
          maxHeight: isMenuOpen ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        {isMenuOpen && (
          <div style={{ marginTop: "10px", fontFamily: "'Fredoka', sans-serif" }}>
            <Link href="/" style={linkStyle} onClick={closeMenu}>Home</Link>

<Link href="/how-it-works" style={linkStyle} onClick={closeMenu}>
  How It Works
</Link>

<Link
  href="#"
  style={linkStyle}
  onClick={(e) => {
    e.preventDefault();
    window.dispatchEvent(new Event("openHatchingPopup"));
    closeMenu();
  }}
>
  Create Account
</Link> 

            <Link href="/farmer/apply" style={linkStyle} onClick={closeMenu}>
              Become a Verified Farmer
            </Link>

            <Link href="/faq" style={linkStyle} onClick={closeMenu}>
              FAQ
            </Link>

            <Link href="/contact" style={linkStyle} onClick={closeMenu}>
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </div>
  );
} 