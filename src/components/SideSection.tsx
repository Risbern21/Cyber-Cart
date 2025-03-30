import React from "react";
import { X } from "lucide-react";

interface SideSectionProps {
  showMyself: boolean;
}

const SideSection = ({ showMyself }: SideSectionProps) => {
  return (
    <div>
      {showMyself && (
        <div className="w-[300px] h-screen absolute top-0 border border-[#b3b3b3] right-0 z-50 bg-white text-black p-3 sm:hidden">
            <X/>
        </div>
      )}
    </div>
  );
};

export default SideSection;
