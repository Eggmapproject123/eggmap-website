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
          padding: "80px 20px",
          textAlign: "left",
          gap: "16px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1 style={{ fontSize: "36px", marginBottom: "8px", textAlign: "center" }}>
          PRIVACY POLICY
        </h1>
        <p style={{ fontSize: "16px", color: "#444", textAlign: "center" }}>
          Last updated: 02/01/2026
        </p>

        <p style={{ fontSize: "18px", color: "#444" }}>
          EggMap (“we,” “our,” or “us”) respects your privacy. This Privacy Policy explains how information is collected, used, and handled when you use the EggMap mobile app and website.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          INFORMATION WE COLLECT
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          EggMap collects only the information necessary to provide core app functionality.
        </p>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Account &amp; Contact Information
        </h3>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Username</li>
          <li>Email address</li>
          <li>Phone number (for verified stand owners and support communication)</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Address Information
        </h3>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Physical stand locations provided by users</li>
          <li>Mailing addresses for verified stand owners (used to send QR codes or related materials)</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Location Data
        </h3>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Precise or approximate location data, used solely to display nearby egg stands and enable map-based features</li>
          <li>Location data is not tracked continuously and is not used for advertising or tracking across apps</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          User Content
        </h3>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Photos uploaded by users (such as stand photos or verification images)</li>
          <li>Stand information, descriptions, egg types, and stock status updates</li>
          <li>Comments, reviews, or other content users choose to submit</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Technical &amp; Usage Data
        </h3>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Device type, app version, timestamps, and basic server logs</li>
          <li>This information is used only for security, troubleshooting, and app functionality</li>
          <li>Any analytics are used only in aggregate form and are not used to identify individual users</li>
        </ul>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          PAYMENTS
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          All payments are processed securely by third-party payment processors such as Stripe.
        </p>
        <p style={{ fontSize: "18px", color: "#444" }}>
          EggMap does NOT collect, store, or have access to:
        </p>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Credit or debit card numbers</li>
          <li>Bank account details</li>
          <li>Social Security numbers or tax information</li>
        </ul>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Any payment information is handled directly by the payment processor under their own privacy policies.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          HOW WE USE INFORMATION
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Information is used only to:
        </p>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Display nearby egg stands and map features</li>
          <li>Allow users to create, manage, and verify egg stands</li>
          <li>Enable stock updates, sales, and marketplace features</li>
          <li>Communicate important account or app-related information</li>
          <li>Improve app reliability, security, and performance</li>
        </ul>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          DATA SHARING
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          We do not sell personal information.
        </p>
        <p style={{ fontSize: "18px", color: "#444" }}>
          Information may be shared only with trusted third-party service providers necessary to operate the app, such as:
        </p>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Payment processors (e.g., Stripe)</li>
          <li>Cloud hosting, database, and storage providers (e.g., Firebase)</li>
        </ul>
        <p style={{ fontSize: "18px", color: "#444" }}>
          These providers are authorized to use information only as needed to perform services for EggMap.
        </p>
        <p style={{ fontSize: "18px", color: "#444" }}>
          We may disclose information if required by law or to protect the rights, safety, or security of EggMap, its users, or the public.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          DATA RETENTION
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          We retain information only as long as necessary to provide the service or while an account remains active. Users may request account and data deletion at any time.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          YOUR CHOICES &amp; RIGHTS
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          You may:
        </p>
        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Request deletion of your account and associated data</li>
          <li>Control location permissions through your device settings</li>
        </ul>
        <p style={{ fontSize: "18px", color: "#444" }}>
          To request account deletion, contact us at:
        </p>
        <p style={{ fontSize: "18px", color: "#444" }}>
          [insert contact email]
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          CHILDREN’S PRIVACY
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          EggMap is not intended for children under the age of 13, and we do not knowingly collect personal information from children.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          CHANGES TO THIS POLICY
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          We may update this Privacy Policy from time to time. Updates will be posted on this page with a revised “Last updated” date.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          CONTACT US
        </h2>
        <p style={{ fontSize: "18px", color: "#444" }}>
          If you have questions about this Privacy Policy, please contact us at:
        </p>
        <p style={{ fontSize: "18px", color: "#444" }}>
          contacteggmap@gmail.com
        </p>
      </main>
    </>
  );
}
