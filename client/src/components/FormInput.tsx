import type { FormInputProps } from "../types";

const FormInput = ({
  label,
  register,
  type,
  placeholder,
  error,
}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="flex flex-col gap-1">
        {label}
        <input
          {...register}
          type={type}
          placeholder={placeholder}
          className="p-3 bg-gray-100 rounded-xl"
        />
      </label>

      {error && <p className="text-sm text-red-400 p-1">{error}</p>}
    </div>
  );
};

export default FormInput;
