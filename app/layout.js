import { Inter } from "next/font/google";
import "./Deck.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Swipe2Learn",
  description: "AI Flashcard SaaS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
