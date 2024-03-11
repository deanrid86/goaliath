interface ProgressBarProps {
    timeframe: number;
    daysLeft: number;
  }

  export const ProgressBar = ({ timeframe, daysLeft }: ProgressBarProps) => {
    const percentageCompleted = ((timeframe - daysLeft) / timeframe) * 100;
    const percentageRemaining = 100 - percentageCompleted;
  
    return (
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden border border-black">
          <div className="flex h-full">
            <div
              className="bg-green-500 transition-width duration-300 ease-in-out"
              style={{ width: `${percentageRemaining}%` }}
            ></div>
            <div
              className="bg-red-500 transition-width duration-300 ease-in-out"
              style={{ width: `${percentageCompleted}%` }}
            ></div>
          </div>
        </div>
      );
    };