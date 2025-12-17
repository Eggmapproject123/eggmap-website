"use client";

export default function TopRightLogin() {
  return (
   <button
  onClick={() =>
    window.dispatchEvent(new Event("openHatchingPopup"))
  }
  style={{
    position: "fixed",
    top: 20,
    right: 20,
    background: "#1bf451ff",
    padding: "10px 16px",
    borderRadius: "20px",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    zIndex: 10
  }}
>
  Login
</button> 
  );
} 