import type { ButtonProps } from "../types";

const Button = ({ label, type, disabled, className, onClick }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {label}
    </button>
  );
};

export default Button;
