import { Cherry_Bomb_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { MenuProvider } from "./MenuContext";
import HatchingPopup from "../components/HatchingPopup";

const cherry = Cherry_Bomb_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cherry",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cherry.variable}>
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-8QV64D3784"
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', 'G-8QV64D3784', {
            send_page_view: true
          });
        `}
      </Script>

      <body style={{ margin: 0, background: "#e8daf9" }}>
        <MenuProvider>
          {children}
          <HatchingPopup />
        </MenuProvider>
      </body>
    </html>
  );
} 
