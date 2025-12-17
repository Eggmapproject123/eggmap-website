export default function GlowPulse() {
  return (
    <div style={{
      width: "260px",
      height: "260px",
      borderRadius: "50%",
      background: "rgba(255, 246, 163, 0.8)",
      filter: "blur(40px)",
      position: "absolute",
      top: "20%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      animation: "pulse 3s ease-in-out infinite"
    }} />

  );
} 
