import React from "react";
import Image from "next/image";
import arrowImg from "../../public/resources/arrow left dm.svg";

interface ArrowLeftProps {
  onClick: () => void;
}

const ArrowLeft: React.FC<ArrowLeftProps> = ({ onClick }) => {
  return (
    <div className="pt-8 pb-6 pl-9">
      <button
        onClick={onClick}
        className="w-38 h-21 flex items-center justify-center bg-transparent rounded-full hover:text-black transition"
        aria-label="Navigate left"
      >
        <Image src={arrowImg} alt="Left arrow icon" width={38} height={21} />
      </button>
    </div>
  );
};

export default ArrowLeft;
