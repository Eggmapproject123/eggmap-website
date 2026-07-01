"use client";
import Image from "next/image";
import SidebarNav from "../../../components/SidebarNav";

function BenefitCard({ icon, title, children }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.92)",
        borderRadius: "16px",
        padding: "18px 20px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
        marginBottom: "18px",
      }}
    >
      <h3 style={{ margin: "0 0 6px", fontSize: "20px", color: "#651eff" }}>
        {icon} {title}
      </h3>
      <div style={{ fontSize: "16px", lineHeight: 1.45 }}>{children}</div>
    </div>
  );
}

export default function VerifiedFarmerPage() {
  return (
    <>
      <SidebarNav />

      <div
        style={{
          minHeight: "100vh",
          padding: "100px 16px 40px", 
          backgroundImage: 'url("/farm2.png")',
          backgroundSize: "auto 100%",
          backgroundPosition: "center top",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            color: "#d24dff",
            textShadow: `
              -2px -2px 0 white,
               2px -2px 0 white,
              -2px  2px 0 white,
               2px  2px 0 white
            `,
            marginBottom: "16px",
          }}
        >
          Become a Verified Farmer
        </h1>

        <div
          style={{
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {/* INTRO */}
      {/* INTRO */}
<div
  style={{
    background: "rgba(255,255,255,0.9)",
    borderRadius: "18px",
    padding: "22px 22px 22px 26px",
    boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
    marginBottom: "22px",
    fontSize: "17px",
    lineHeight: 1.55,
    borderLeft: "6px solid #1DA1F2",
  }}
>
  <p style={{ margin: 0 }}>
    <strong style={{ color: "#1DA1F2", fontSize: "18px" }}>
      Verified Farmers
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "18px",
          height: "18px",
          backgroundColor: "#1DA1F2",
          color: "white",
          borderRadius: "50%",
          fontSize: "12px",
          fontWeight: "bold",
          marginLeft: "6px",
        }}
      >
        ✔
      </span>
    </strong>{" "}
    get full control of their own stand on the map.
  </p>

  <p style={{ marginTop: "12px", marginBottom: 0 }}>
    This gives you tools that make your stand more visible to customers —
    helping you sell more eggs and build repeat business.
  </p>
</div> 

          {/* RUN SALES */}
          <BenefitCard icon="🔥" title="Run Sales (Golden Egg)">
            Every time you run a sale — for example <strong>$1 off</strong> —
            your stand’s icon becomes a <strong>large golden egg</strong> on the
            map. This makes your egg icon stand out to users.
          </BenefitCard>

          {/* PHONE IMAGE — DIRECTLY AFTER GOLDEN EGG */}
          <div style={{ textAlign: "center", marginBottom: "26px" }}>
            <Image
              src="/goldonphone.png"
              alt="Golden Egg on Map"
              width={320}
              height={640}
              style={{
                width: "100%",
                maxWidth: "360px",
                height: "auto",
                borderRadius: "22px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              }}
            />
          </div>

        


          <BenefitCard icon="📊" title="Stats & Insights">
            See your busiest times, busiest months, and how often customers find your stand using EggMap.
            
          </BenefitCard>

          <BenefitCard icon="🟣" title="Farmers Market Mode">
            If you are selling eggs at a farmers market or simmilar event, activate Farmers Market Mode. This will move your virtual egg stand to the location of the event - and your stand will appear as a
            <strong> large purple egg</strong> on the map for up to <strong>8 hours</strong>.
          </BenefitCard>

          <BenefitCard icon="⚡" title="control your virtual stand">
             When you verifiy your stand, it gives you access to delete photos you dont like, change the name of your stand, cutomize your egg avatar, 
             and create a virtual storefront. The virtual storefront really helps users get to know what goods you sell, and what your prices are.
          </BenefitCard>

          {/* CTA */}
          <div
            style={{
              marginTop: "32px",
              textAlign: "center",
              background: "rgba(255,255,255,0.9)",
              padding: "24px",
              borderRadius: "20px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
            }}
          >
   
          </div>
        </div>
      </div>
    </>
  );
} 
