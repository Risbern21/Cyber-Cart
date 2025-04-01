import React,{ useContext } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { showSideSectionContext } from "./context/context";

const SideSection = () => {
  const sideSectionContext = useContext(showSideSectionContext);
  return (
    <div>
      {sideSectionContext.showSideSection && (
        <div className="w-[200px] h-screen absolute top-0 border border-[#b3b3b3] right-0 z-50 bg-white text-black p-3 sm:hidden flex flex-col gap-5 text-xl">
          <X
            onClick={() =>
              sideSectionContext.setshowSideSection(
                !sideSectionContext.showSideSection
              )
            }
          />
          <Link href={"/"}><div>Home</div></Link>
          <Link href={"/cart/cartpage"}><div>Cart</div></Link>
          <Link href={"/wishlist"}><div>Wishlist</div></Link>
          <Link href={"/contact"}><div>Contact</div></Link>
          <Link href={"/about"}><div>About</div></Link>
        </div>
      )}
    </div>
  );
};

export default SideSection;
