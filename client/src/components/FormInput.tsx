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
          className="rounded-xl bg-gray-200 p-3"
        />
      </label>

      {error && <p className="p-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default FormInput;
