import React from "react";

interface QuizOptionProps {
  label: string;
  text: string;
  isSelected: boolean;
  isCorrect: boolean;
  isIncorrect: boolean;
  showCorrectAnswer: boolean;
  onClick: () => void;
}

const QuizOption: React.FC<QuizOptionProps> = ({
  label,
  text,
  isSelected,
  isIncorrect,
  showCorrectAnswer,
  isCorrect,
  onClick,
}) => {
  return (
    <button
      className={`w-full py-3 px-6 flex items-center text-left border rounded-lg transition-all duration-200 ${
        showCorrectAnswer
          ? "bg-sagnir-200 border-sagnir-200 text-sagnir-100"
          : isIncorrect
          ? "bg-sagnir-100 border-sagnir-200 text-sagnir-200"
          : isSelected
          ? isCorrect
            ? "bg-sagnir-100 border-sagnir-200 text-sagnir-100"
            : "bg-sagnir-100 border-sagnir-100 text-sagnir-200"
          : "bg-sagnir-100 border-sagnir-200"
      }`}
      onClick={onClick}
    >
      {/* Option Label */}
      <span
        className={`font-glare text-xl ${
          showCorrectAnswer || (isSelected && isCorrect)
            ? "text-sagnir-100"
            : "text-sagnir-200"
        }`}
      >
        {label}
      </span>

      {/* Vertical Line */}
      <div className="w-px h-9 bg-sagnir-200 mx-4"></div>

      {/* Option Text */}
      <span
        className={`font-glare text-xl ${
          showCorrectAnswer || (isSelected && isCorrect)
            ? "text-sagnir-100"
            : "text-sagnir-200"
        }`}
      >
        {text}
      </span>

      {/* Icons for Correct/Incorrect */}
      {isIncorrect && (
        <span className="font-serifExtra ml-auto text-sagnir-200">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 7L17 17M17 7L7 17"
              stroke="#F0ECDD"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </span>
      )}
      {showCorrectAnswer && (
        <span className="ml-auto">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-sagnir-100"
          >
            <path
              d="M19 7L9.66667 16L5 11.5"
              stroke="#1A1616"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  );
};

export default QuizOption;
