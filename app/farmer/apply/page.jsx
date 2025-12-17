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
    This gives you powerful tools that make your stand more visible to customers —
    helping you sell more eggs and build repeat business.
  </p>
</div> 

          {/* RUN SALES */}
          <BenefitCard icon="🔥" title="Run Sales (Golden Egg)">
            Every time you run a sale — for example <strong>20% off</strong> —
            your stand’s icon becomes a <strong>large golden egg</strong> on the
            map. This makes your egg icon stand out, and dramatically
            increases your chances of being chosen.
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

          <BenefitCard icon="💳" title="QR Code Payments">
            Every verified stand receives a free laminated QR code with a holder.
            Customers scan it to pay instantly through EggMap. This feature is
            <strong> completely free for verified farmers</strong>.
          </BenefitCard>

          <BenefitCard icon="🛒" title="Online Ordering">
            Let customers request and pre-pay for eggs before driving out.
            Payments only process <strong>after you accept</strong> the order.
          </BenefitCard>

          <BenefitCard icon="📊" title="Stats & Insights">
            See your busiest times, busiest months, and repeat customer patterns
            so you can plan better and sell more.
          </BenefitCard>

          <BenefitCard icon="🟣" title="Farmers Market Mode">
            When attending a farmers market, activate Market Mode and appear as a
            <strong> purple egg</strong> on the map for up to <strong>8 hours</strong>.
          </BenefitCard>

          <BenefitCard icon="⚡" title="Instant Payouts & Easy Taxes">
            Payments go directly to you immediately. EggMap organizes quarterly
            summaries to make tax filing simple.
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
            <p style={{ fontSize: "17px", marginBottom: "16px" }}>
              EggMap officially launches <strong>March 15, 2026</strong>.
              Verified Farmer applications will open at launch.
            </p>

            <button
              onClick={() =>
                window.dispatchEvent(new Event("openHatchingPopup"))
              }
              style={{
                padding: "14px 26px",
                borderRadius: "30px",
                border: "none",
                background: "#651eff",
                color: "white",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
            >
              Get Verified — Coming Soon
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 