import React from "react";

interface ArrowButtonProps {
  onClick: () => void;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-8 h-20 flex items-center justify-center bg-transparent rounded-full hover:text-black transition"
      aria-label="Navigate left"
    >
      <svg
        width="38"
        height="21"
        viewBox="0 0 38 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform scale-x-[-1]"
      >
        <path
          d="M1.38268 9.3826C0.848652 9.91663 0.848652 10.7825 1.38268 11.3165L10.0853 20.0191C10.6193 20.5531 11.4851 20.5531 12.0192 20.0191C12.5532 19.485 12.5532 18.6192 12.0192 18.0852L4.28354 10.3495L12.0192 2.61393C12.5532 2.07989 12.5532 1.21405 12.0192 0.680021C11.4851 0.145988 10.6193 0.145988 10.0853 0.680021L1.38268 9.3826ZM37.9041 8.98207L2.34964 8.98207V11.717L37.9041 11.717V8.98207Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
