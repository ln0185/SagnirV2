interface ProgressBarProps {
  questionNumber: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  questionNumber,
  totalQuestions,
}) => {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="w-full">
      {/* Top Section: Question Count */}
      <div className="flex items-center justify-between pb-2">
        <span className="font-glare text-sagnir-200 text-base">{`Question ${questionNumber}/${totalQuestions}`}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-sagnir-300 rounded overflow-hidden">
        <div
          className="h-full bg-sagnir-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
