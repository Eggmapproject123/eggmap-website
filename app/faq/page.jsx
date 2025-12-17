"use client";
import { useState } from "react";
import SidebarNav from "../../components/SidebarNav";

// Verified Badge Icon
function VerifiedIcon({ size = 18 }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        backgroundColor: "#1DA1F2",
        color: "white",
        borderRadius: "50%",
        fontSize: size * 0.65,
        fontWeight: "bold",
        marginLeft: "2px", // ⬅ reduced spacing
        position: "relative",
        top: "-4px", // ⬅ lifts it slightly
      }}
    >
      ✔
    </span>
  );
} 
/* ---------------- FAQ DATA ---------------- */

const customerFaq = [
  
  {
    question: "What is EggMap?",
    answer: (
      <p>
        EggMap is a live map showing nearby egg stands and what egg types are
        available at each one — chicken, duck, quail, goose, or other. It also
        helps you determine if a stand is in or out of stock!
      </p>
    ),
    
  },
  {
    question: "How do I know if a stand is in stock?",
    answer: (
      <>
        <p>EggMap uses a <em>buddy system</em>:</p>
        <ul style={{ paddingLeft: "20px", marginTop: "6px" }}>
          <li>
            If a customer arrives and takes the last eggs, they mark the stand{" "}
            <strong>“Out of Stock.”</strong>
          </li>
          <li>
            The timestamp shows how recently that update was made.
          </li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          <strong>Verified Stands</strong> <VerifiedIcon />
        </p>
        <p>
          These stands update their own inventory directly, so their stock status
          is much more accurate and reliable.
        </p>
      </>
    ),
  },
  {
    question: "Can I pre-order eggs?",
    answer: (
      <p>
        Yes — some verified stands will offer optional online pre-pay so your
        order is ready when you arrive.
      </p>
    ),
  },
  {
    question: "How do I get directions to a stand?",
    answer: (
      <>
        <p>
          Tap any stand on the map and choose <strong>“Directions.”</strong>
        </p>
        <p>Your phone’s GPS will route you there automatically.</p>
      </>
    ),
  },
  {
    question: "Can I pay with a card or Apple Pay?",
    answer: (
      <>
        <p>
          At <strong>verified stands</strong> <VerifiedIcon />:
        </p>
        <p>
          Yes. All verified stands display a large{" "}
          <strong>“Pay with EggMap” QR code</strong> at the physical stand. You
          can scan it to pay with Apple Pay, Google Pay, or a card.
        </p>
        <p style={{ marginTop: "10px" }}>
          At <strong>unverified stands:</strong>
        </p>
        <p>
          Card payments may not be available, but cash is usually accepted.
        </p>
      </>
    ),
  },
  {
    question: "How do I know what stands are closest to me?",
    answer: (
      <p>
        Your physical location appears on the map as a <strong>blue dot</strong>,
        which you can use to see which egg stands are closest to you.
      </p>
    ),
  },
  {
    question: "What if the stand is empty when I arrive?",
    answer: (
      <>
        <ul style={{ paddingLeft: "20px", marginTop: "6px" }}>
          <li>
            At <strong>verified stands</strong> <VerifiedIcon /> this is unlikely, because
            farmers update their stock in real time.
          </li>
          <li>
            At <strong>unverified stands</strong>, it can be unpredictable —
            it’s “the wild west.”
          </li>
        </ul>
        <p style={{ marginTop: "10px" }}>
          If you arrive and the stand is empty, please help the next visitor by
          marking it <strong>Out of Stock.</strong>
        </p>
        <p>It’s not fool-proof, but it is helpful!</p>
      </>
    ),
  },
  
  {
    question: "Is my payment information safe?",
    answer: (
      <p>
        Yes. EggMap processes all payments through <strong>Square</strong>, a
        trusted, widely used payment platform used by millions of businesses
        nationwide.
      </p>
    ),
  },
  {
  question: "What does it mean when an egg is gray and transparent on the map?",
  answer: (
    <>
      <p>
        It means that stand is currently <strong>out of stock</strong>.
        <br />
        <strong>OR</strong>
        <br />
        you have searched for a specific egg type or stand name.
      </p>

      <p>
        For example, if you search for <strong>duck eggs</strong>, EggMap will
        automatically gray out every stand that does <strong>not</strong> currently
        have duck eggs in stock.
      </p>

      <p>
        The same thing happens if you search for a{" "}
        <strong>specific stand name</strong>. Any stand that doesn’t match what
        you’re searching for will appear gray, so you can quickly find the stand
        or product you’re looking for.
      </p>
    </>
  ),
}, 
  {
    question: "What is the 'create a stand' button for?",
    answer: (
      <>
        <p>
          If you find an egg stand in real life that is not on our map, you can
          create that stand!
        </p>
        <p>Here’s how it works:</p>
        <p>
          You must physically be at the egg stand location — then, click{" "}
          <strong>“Create a Stand.”</strong> This will prompt you to take a photo
          of the stand, name it, and let us know what egg types are currently in
          stock.
        </p>
        <p>
          That’s it! You’ve now helped other EggMap users find a new stand.
        </p>
      </>
    ),
  },
]; 
const farmerFaq = [
  {
    question: "How do I become a Verified Farmer?",
    answer: (
      <p>
        Apply through the EggMap website. Once approved, you’ll receive a free
        laminated QR code <strong>with a plastic holder</strong> to place at your stand.
      </p>
    ),
  },
 {
  question: "What does being Verified get me?",
  answer: (
    <>
      <ul style={{ paddingLeft: "35px", margin: 0 }}>
        <li>Golden Egg sale mode</li>
        <li>Farmers market visibility mode</li>
        <li>QR code payments</li>
        <li>Online ordering</li>
        <li>Ratings &amp; photos</li>
        <li>Verified checkmark <VerifiedIcon /> on your stand</li>
        <li>Statistics dashboard</li>
        <li>Instant payouts</li>
      </ul>

      <p style={{ marginTop: "10px" }}>
        To learn more about these features, check out the{" "}
        <strong>“Become a Verified Farmer”</strong> tab!
      </p>
    </>
  ),
}, 

  {
    question: "Are QR code payments free for farmers?",
    answer: (
      <p>
        Yes. Customers pay a small EggMap fee. Farmers keep{" "}
        <strong>100% of their earnings.</strong>
      </p>
    ),
  },
  {
    question: "How do Golden Egg sales work?",
    answer: (
      <>
        <p>
          you can choose to run a sale (for example, <strong>20% off</strong>) up to{" "}
          <strong>three times per week.</strong>
        </p>
        <p>
          A sale can run for a <strong>maximum of two hours.</strong>
        </p>
        <p>
          During this time, your stand icon becomes a{" "}
          <strong>large golden egg</strong>, making it highly visible on the map
          and attracting more traffic.
        </p>
      </>
    ),
  },
  {
    question: "What is Farmers Market Mode?",
    answer: (
      <p>
        When you attend a farmers market, you can activate Farmers Market Mode.
        Your stand will appear as a <strong>purple egg</strong> on the map for up
        to <strong>8 hours</strong>, helping customers find you quickly. This is 
        the only time you can move your stands location on the map.
      </p>
    ),
  },
  {
    question: "How does online ordering work?",
    answer: (
      <>
        <p>
          Customers can <strong>request an order</strong> from your stand. The
          payment only processes <strong>after you accept</strong> the order.
        </p>
        <p>Once accepted, you must:</p>
        <ol style={{ paddingLeft: "20px", marginTop: "6px" }}>
          <li>Prepare the order</li>
          <li>Place it in your stand</li>
          <li>
            Bag it in a{" "}
            <strong>plastic bag labeled with the customer’s name</strong>
          </li>
          <li>
            Upload a <strong>photo of the bag in your stand</strong> to EggMap
          </li>
        </ol>
        <p>
          This protects you in case of disputes by proving the order was placed
          correctly.
        </p>
      </>
    ),
  },
  {
    question: "How do I update my stock?",
    answer: (
      <p>
        You can update your stock instantly through the app. Keeping your stock
        levels accurate prevents customers from driving out when the stand is
        empty.
      </p>
    ),
  },
  {
    question: "Can EggMap help with taxes?",
    answer: (
      <p>
        Yes. Verified Farmers can request organized quarterly earnings summaries
        to make tax filing simple.
      </p>
    ),
  },
  {
    question: "What if my stand has a dispute with a customer?",
    answer: (
      <>
        <p>
          EggMap reviews each situation fairly. Verified stands follow clear
          guidelines designed to protect both customers and farmers.
        </p>
        <p>
          Always upload a photo of the labeled order in your stand — this serves
          as proof that the order was fulfilled properly.
        </p>
      </>
    ),
  },
  {
    question: "Do I get to choose my own prices?",
    answer: (
      <p>
        Yes. You set your own prices directly on your EggMap stand page. If
        customers choose to pay with card or through online ordering, EggMap’s
        small fee is added <strong>on top</strong> of your price.
      </p>
    ),
  },
  {
    question: "Is it okay if I have a cash option at my stand as well?",
    answer: (
      <p>
        Absolutely, of course. We understand that egg stands primarily
        use cash as their main form of payment. All that we ask is that your
        EggMap QR code is always visible at your stand as a form of payment.
      </p>
    ),
  },
]; 

/* ---------------- COMPONENTS ---------------- */

function AccordionItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid #eee",
        padding: "12px 0",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          textAlign: "left",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        {question}
      </button>

      {open && (
       <div style={{ marginTop: "8px", fontSize: "15px", lineHeight: "1.4" }}>
  {answer}
</div> 
      )}
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function FaqPage() {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <>
      <SidebarNav />

      <div
        style={{
          minHeight: "100vh",
          padding: "28px 16px",
          backgroundImage: 'url("/backgroundFAQ.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "38px",
            color: "#d24dff",
            marginBottom: "24px",
            textShadow: `
              -2px -2px 0 white,
               2px -2px 0 white,
              -2px  2px 0 white,
               2px  2px 0 white
            `,
          }}
        >
          EggMap FAQ
        </h1>

        {/* SECTION TOGGLES */}
        <div style={{ maxWidth: "520px", margin: "0 auto" }}>
          <button
            onClick={() =>
              setActiveSection(activeSection === "customers" ? null : "customers")
            }
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "12px",
              borderRadius: "16px",
              border: "none",
              fontSize: "18px",
              fontWeight: "700",
              background: "#07ffd6",
              cursor: "pointer",
            }}
          >
            FAQ for Customers
          </button>

          {activeSection === "customers" && (
            <div
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "18px",
                marginBottom: "20px",
              }}
            >
              {customerFaq.map((item, i) => (
                <AccordionItem key={i} {...item} />
              ))}
            </div>
          )}

          <button
            onClick={() =>
              setActiveSection(activeSection === "farmers" ? null : "farmers")
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "16px",
              border: "none",
              fontSize: "18px",
              fontWeight: "700",
              background: "#b388ff",
              cursor: "pointer",
            }}
          >
           FAQ for Verified Farmers <VerifiedIcon size={22} /> 
          </button>

          {activeSection === "farmers" && (
            <div
              style={{
                background: "white",
                borderRadius: "18px",
                padding: "18px",
                marginTop: "12px",
              }}
            >
              {farmerFaq.map((item, i) => (
                <AccordionItem key={i} {...item} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
} 