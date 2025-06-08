import type { LoadingScreenProps } from "../types";

const LoadingScreen = ({ className }: LoadingScreenProps) => {
  return (
    <div
      className={`flex min-h-[45dvh] items-center justify-center gap-[1ch] ${className}`}
    >
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-400"></div>
      <span className="text-sm">Loading...</span>
    </div>
  );
};

export default LoadingScreen;
