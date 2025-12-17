import { Cherry_Bomb_One } from "next/font/google";
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
      <body style={{ margin: 0, background: "#e8daf9" }}>
        <MenuProvider>
          {children}
          <HatchingPopup />
        </MenuProvider>
      </body>
    </html>
  );
} 
