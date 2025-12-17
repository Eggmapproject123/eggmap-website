"use client";

export default function EggHero() {
  const handleLaunchClick = () => {
    window.dispatchEvent(new Event("openHatchingPopup"));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: 'url("/newbackdrop.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "40px",
      }}
    >
      <div style={{ marginBottom: "10px", transform: "translateX(12px)" }}>
        <h1
          style={{
            fontSize: "60px",
            marginTop: "20px",
            color: "#b300ffff",
            fontWeight: "normal",
            fontFamily: "Cherry Bomb One, sans-serif",
            textShadow: `
              -3px -3px 0 white,
               3px -3px 0 white,
              -3px  3px 0 white,
               3px  3px 0 white
            `,
          }}
        >
          Welcome to EggMap!
     <span
  style={{
    fontSize: "14px",
    fontWeight: "700",
    marginLeft: "4px",
    fontFamily: "sans-serif",
    color: "#8f52f9ff",     // purple
    position: "relative",
    top: "-29px",         // lifts it to upper-right
    textShadow: "none",   // ❗ removes white outline
  }}
>
  TM
</span> 

        </h1>
      </div>

      <p
        style={{
          fontSize: "20px",
          color: "#ffffffff",
          marginTop: "10px",
          marginBottom: "45px",
          textShadow: "0px 1px 3px rgba(0,0,0,0.2)",
          transform: "translateY(-10px)",
        }}
      >
        Find fresh local eggs in seconds.
      </p>

      <div style={{ transform: "translateY(-10px)" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleLaunchClick();
          }}
          style={{
            background: "#6a00ffff",
            padding: "16px 34px",
            borderRadius: "30px",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
            textDecoration: "none",
            boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.25)",
          }}
        >
          Launch Map
        </a>
      </div>
    </div>
  );
}
