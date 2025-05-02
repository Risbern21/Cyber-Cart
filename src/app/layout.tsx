import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";
import Navbar from "@/components/Navbar";
import createCartTable from "../lib/database/createCartTable";
import createProductsTable from "../lib/database/createProductsTable";
import createWishlistTable from "../lib/database/createWishlistTable";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyber Cart",
  description: "Order And Buy Your Favourite Items On Cyber Cart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  createCartTable();
  createProductsTable();
  createWishlistTable()
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${geistMono.variable} antialiased`}>
        <SessionWrapper>
          <div>
            <h1 className="text-white bg-black text-center py-3 text-sm">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!
              <span className="underline">ShopNow</span>
            </h1>
          </div>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </SessionWrapper>
        <div id="modal"/>
      </body>
    </html>
  );
}
