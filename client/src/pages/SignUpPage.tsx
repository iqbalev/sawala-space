import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignUpResponse } from "../types";
import FormInput from "../components/FormInput";
import Button from "../components/Button";

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data: SignUpResponse = await response.json();
      if (!data.success) {
        return setError("email", { message: data.message });
      }

      return navigate("/sign-in");
    } catch (error) {
      console.log("Unexpected error:", error);
      return setError("root", {
        message: "Oops! Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto flex min-h-[80dvh] w-full max-w-lg flex-col justify-center gap-4">
      <section className="flex flex-col gap-2 rounded-xl text-center">
        <h1 className="text-4xl font-semibold">
          Join <span className="text-blue-400">SawalaSpace</span>
        </h1>
      </section>

      <p className="text-center">
        Already have an account?
        <Link
          to="/sign-in"
          className="mx-1 font-semibold transition-all duration-200 hover:text-blue-400"
        >
          Sign In
        </Link>
      </p>

      <form
        method="post"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          {errors.root && (
            <p className="rounded-xl bg-red-400 p-3 text-sm text-white">
              {errors.root.message}
            </p>
          )}

          <FormInput
            label="Name"
            register={register("name")}
            type="text"
            placeholder="Jane Doe"
            error={errors.name && errors.name.message}
          />

          <FormInput
            label="Email"
            register={register("email")}
            type="email"
            placeholder="janedoe@gmail.com"
            error={errors.email && errors.email.message}
          />

          <FormInput
            label="Password"
            register={register("password")}
            type="password"
            placeholder="Enter password"
            error={errors.password && errors.password.message}
          />

          <FormInput
            label="Confirm Password"
            register={register("confirmPassword")}
            type="password"
            placeholder="Re-enter password"
            error={errors.confirmPassword && errors.confirmPassword.message}
          />
        </div>

        <Button
          label={isSubmitting ? "Submitting..." : "Sign Up"}
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-400 p-3 text-xl font-semibold text-white transition-all duration-200 hover:bg-blue-400/80 active:scale-95"
        />
      </form>
    </div>
  );
};

export default SignUpPage;
