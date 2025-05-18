import { MessageProps } from "../types";

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4">
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default Message;
