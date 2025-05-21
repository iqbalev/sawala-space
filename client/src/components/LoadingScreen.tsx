import type { LoadingScreenProps } from "../types";

const LoadingScreen = ({ className }: LoadingScreenProps) => {
  return (
    <div
      className={`flex min-h-[45dvh] items-center justify-center ${className}`}
    >
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
