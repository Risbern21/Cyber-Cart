"use client"
import { useState } from "react";
import Image from "next/image";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <div></div>
  );
}

export default ControlledCarousel;
