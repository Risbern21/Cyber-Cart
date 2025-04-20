import React from "react";
import Image from "next/image";
import {
  SendHorizontal,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-foreground text-background">
      <div className="flex flex-col lg:flex-row gap-x-5 gap-y-20 lg:gap-10 border-b border-b-[#3D3D3D] lg:px-20 px-5 py-10 justify-center">
        <ul className="flex flex-col gap-4 items-center lg:items-start text-xs">
          <li className="text-base">CyberCart</li>
          <li>Subscribe</li>
          <li className="text-sm">Get 10% off your first order</li>
          <li className="flex border border-white w-fit rounded-md p-2 ">
            <input
              className="focus:outline-none"
              type="text"
              placeholder="Enter your email"
            />
            <SendHorizontal strokeWidth={1.5} />
          </li>
        </ul>
        <ul className="flex flex-col gap-4 w-full lg:w-1/6 items-center justify-center lg:items-start text-xs ">
          <li className="text-base">Support</li>
          <li>Risbern Goa</li>
          <li>exclusive@gmail.com</li>
          <li>+88015-88888-9999</li>
        </ul>
        <ul className="flex flex-col gap-4 lg:w-1/6 w-full items-center justify-center lg:items-start text-xs ">
          <li className="text-base"> Account</li>
          <li>
            <Link href={"/account"}>My Account</Link>
          </li>
          <li>
            <Link href={"/login"}>Login </Link>
          </li>
          <li>
            <Link href={"/cart/cartpage"}>Cart</Link>
          </li>
          <li>
            <Link href={"/wishlist"}>Wishlist</Link>
          </li>
          <li>
            <Link href={"/"}>Shop</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 lg:w-1/6 w-full items-center justify-center lg:items-start text-xs ">
          <li className="text-base">Quick Link</li>
          <li>
            <Link href={'/about'}>Privacy Policy</Link>
          </li>
          <li>
            <Link href={'/about'}>Terms Of Use</Link>
          </li>
          <li>
            <Link href={'/about'}>FAQ</Link>
          </li>
          <li>
            <Link href={'/contact'}>Contact</Link>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 w-full lg:w-1/6 items-center lg:items-start text-xs">
          <li className="text-base">Download App</li>
          <li>Save ₹3 with App(New Users Only)</li>
          <li>
            <Image
              src="https://www.emoderationskills.com/wp-content/uploads/2010/08/QR1.jpg"
              alt="dummy qr code"
              width={50}
              height={50}
            />
          </li>
          <li className="flex justify-around gap-5">
            <Facebook />
            <Twitter />
            <Instagram />
            <Linkedin />
          </li>
        </ul>
      </div>
      <h2 className="text-[#3D3D3D] text-center py-5">
        &copy; Copyright Cyber Cart 2022. All right reserved
      </h2>
    </div>
  );
};

export default Footer;
