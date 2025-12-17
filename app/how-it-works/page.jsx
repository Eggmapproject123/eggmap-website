"use client";

import SidebarNav from "../../components/SidebarNav";

export default function HowItWorksPage() {
  // ✅ Tiny manual nudges (change these numbers anytime)
  // Positive X = right, Negative X = left
  // Positive Y = down,  Negative Y = up
  const VIDEO_NUDGE_X = 0;
  const VIDEO_NUDGE_Y = 0;

  // ✅ Sizes (adjust if you want it bigger)
  const PHONE_WIDTH = 420; // frame image size
  const VIDEO_WIDTH = 300; // video window size (should be slightly smaller than frame)

  return (
    <>
      {/* CLICK JELLY / MENU */}
      <SidebarNav />

      <main
        style={{
          minHeight: "100vh",
          position: 'relative',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "12px 10px",
          gap: "8px",
        }}
      >
       <div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: "12px",   // nudges everything off the left edge
    marginBottom: "-25px", // controls spacing before the phone
  }}
>
  {/* Click Jelly */}
  {/* DO NOT CHANGE YOUR JELLY CODE */}
  {/* just leave it here */}

 <h1
  style={{
    fontSize: "24px",
    fontWeight: "700",
    color: "#2f00ffff",
    textAlign: "left",

    marginLeft: "70px",   // moves it right of the click jelly
    marginTop: "55px",    // positions it lower
    marginBottom: "-10px", // ⭐ THIS controls how much it pushes the video

    whiteSpace: "nowrap",
  }}
>
  Watch the Egg Map Demo!
</h1> 
</div> 

        {/* Phone mock + video stack */}
        <div
          style={{
            position: "relative",
            width: `${PHONE_WIDTH}px`,
            height: `${Math.round(PHONE_WIDTH * (16 / 9))}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* VIDEO (behind the phone frame) */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${VIDEO_WIDTH}px`,
              height: `${Math.round(VIDEO_WIDTH * (16 / 9))}px`,
              transform: `translate(-50%, -50%) translate(${VIDEO_NUDGE_X}px, ${VIDEO_NUDGE_Y}px)`,
              borderRadius: "28px",
              overflow: "hidden",
              backgroundColor: "#000",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              zIndex: 1,
            }}
          >
            <video
              src="/Video4EggMapWeb.mp4"
              controls
              playsInline
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          {/* PHONE FRAME (on top) */}
          <img
            src="/phone7.png"
            alt="Egg Map phone frame"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: `${PHONE_WIDTH}px`,
              transform: "translate(-50%, -50%) translate(5px, -5px) scale(1.03)",
              zIndex: 2,
              pointerEvents: "none",
              userSelect: "none",
              display: "block",
            }}
          />
        </div>
      </main>
    </>
  );
} 