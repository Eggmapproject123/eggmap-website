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
          Last updated: 05/10/2026
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
          <li>Phone number, when provided for verified stand owners or support communication</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Address Information
        </h3>

        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Physical stand locations provided by users</li>
          <li>Mailing addresses for verified stand owners, when needed to send QR codes or related materials</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Location Data
        </h3>

        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Precise or approximate location data, used to display nearby egg stands and enable map-based features</li>
          <li>Location data is not tracked continuously and is not used for advertising or tracking across apps</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          User Content
        </h3>

        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Photos uploaded by users, such as stand photos or verification images</li>
          <li>Stand information, descriptions, egg types, and stock status updates</li>
          <li>Comments, reviews, or other content users choose to submit</li>
        </ul>

        <h3 style={{ fontSize: "20px", marginTop: "12px", marginBottom: "6px" }}>
          Technical &amp; Usage Data
        </h3>

        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Device type, app version, timestamps, and basic server logs</li>
          <li>This information is used for security, troubleshooting, app functionality, and reliability</li>
          <li>Analytics may be used to understand general website or app usage, improve reliability, and troubleshoot issues</li>
        </ul>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          PAYMENTS
        </h2>

        <p style={{ fontSize: "18px", color: "#444" }}>
          Payments may be processed securely by third-party payment processors such as Stripe.
        </p>

        <p style={{ fontSize: "18px", color: "#444" }}>
          EggMap does not collect, store, or have access to full credit card numbers, debit card numbers, bank account details, Social Security numbers, or tax information.
        </p>

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
          <li>Communicate important account, support, or app-related information</li>
          <li>Improve app reliability, security, and performance</li>
          <li>Review, moderate, approve, or remove user-submitted content when necessary</li>
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
          <li>Payment processors, such as Stripe</li>
          <li>Cloud hosting, database, authentication, and storage providers, such as Firebase</li>
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
          We retain information only as long as necessary to provide the service, support app functionality, meet legal obligations, resolve disputes, or while an account remains active.
        </p>

        <p style={{ fontSize: "18px", color: "#444" }}>
          Users may request account and data deletion at any time.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          ACCOUNT AND DATA DELETION
        </h2>

        <p style={{ fontSize: "18px", color: "#444" }}>
          EggMap users can delete their account directly inside the EggMap app by going to the Account screen and selecting Delete Account.
        </p>

        <p style={{ fontSize: "18px", color: "#444" }}>
          If you no longer have access to the app and need help requesting deletion of your EggMap account and associated data, contact us at contacteggmap@gmail.com with the subject line “Delete my EggMap account.”
        </p>

        <p style={{ fontSize: "18px", color: "#444" }}>
          When an account deletion request is completed, we delete or de-identify personal account information unless we are required or permitted to retain certain information for legal, security, fraud-prevention, payment, or recordkeeping purposes.
        </p>

        <h2 style={{ fontSize: "24px", marginTop: "16px", marginBottom: "8px" }}>
          YOUR CHOICES &amp; RIGHTS
        </h2>

        <p style={{ fontSize: "18px", color: "#444" }}>
          You may:
        </p>

        <ul style={{ fontSize: "18px", color: "#444", paddingLeft: "20px" }}>
          <li>Delete your account directly inside the EggMap app</li>
          <li>Request deletion of your account and associated data by contacting us</li>
          <li>Control location permissions through your device settings</li>
          <li>Contact us with privacy-related questions or requests</li>
        </ul>

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
          If you have questions about this Privacy Policy or want to request help deleting your account or data, please contact us at:
        </p>

        <p style={{ fontSize: "18px", color: "#444" }}>
          contacteggmap@gmail.com
        </p>
      </main>
    </>
  );
} 
