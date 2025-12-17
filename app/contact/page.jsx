"use client";

import { useState } from "react";
import SidebarNav from "../../components/SidebarNav";

export default function ContactPage() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Sending...");

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent!");
      e.target.reset();
    } else {
      setStatus("Error sending message.");
    }
  }

  return (
    <>
      <SidebarNav />

      <div
        style={{
          minHeight: "100vh",
          padding: "100px 20px 40px",
          backgroundImage: 'url("/contactusbackground1.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >

        {/* GLASSY 3D FORM CONTAINER */}
        <div
          style={{
            width: "100%",
            maxWidth: "650px",
            background: "rgba(240, 250, 255, 0.82)",
            padding: "40px",
            borderRadius: "24px",
            boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
            backdropFilter: "blur(8px)",
            border: "2px solid rgba(255,255,255,0.7)",
            animation: "fadeIn 0.5s ease",
          }}
        >

          {/* HELPER LINE */}
          <p style={{
            textAlign: "center",
            margin: "0",
            marginBottom: "12px",
            fontSize: "16px",
            color: "#555",
            fontWeight: "500",
          }}>
            The EggMap team will email you back as soon as we can! 🥚
          </p>

          <h1
            style={{
              fontSize: "38px",
              marginBottom: "20px",
              color: "#d24dff",
              textAlign: "center",
              letterSpacing: "1px",
            }}
          >
            Contact Us
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
            }}
          >
            <input
              name="name"
              placeholder="Your Name"
              required
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />

            <input
              name="email"
              placeholder="Your Email"
              required
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />

            <input
              name="phone"
              placeholder="Your Phone Number"
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              style={{
                padding: "14px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                fontSize: "16px",
              }}
            />

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                padding: "16px",
                background: "linear-gradient(90deg, #651eff, #8c4dff)",
                color: "white",
                borderRadius: "30px",
                fontWeight: "bold",
                fontSize: "18px",
                cursor: "pointer",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                transition: "0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Send Message
            </button>
          </form>

          {status && (
            <p
              style={{
                marginTop: "18px",
                fontWeight: "bold",
                textAlign: "center",
                color: "#333",
              }}
            >
              {status}
            </p>
          )}
        </div>
      </div>
    </>
  );
} 