import { useNavigate, Link } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { SignInFormData, signInSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignInResponse } from "../types";
import FormInput from "../components/FormInput";

const SignInPage = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (formData: SignInFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data: SignInResponse = await response.json();
      if (!data.success) {
        return setError("root", { message: data.message });
      }

      const token = "Bearer " + data.token;
      signIn(token);
      return navigate("/");
    } catch (error) {
      console.log("Unexpected error:", error);
      return setError("root", {
        message: "Oops! Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-4 py-8">
      <section className="flex flex-col gap-2 rounded-xl bg-blue-50 p-6">
        <h1 className="text-4xl font-semibold sm:text-5xl">
          Continue Your Journey
        </h1>
        <p className="text-xl">Let’s pick up where you left off.</p>
      </section>

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
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-xl bg-blue-400/100 p-4 text-xl font-semibold text-white transition-all duration-200 hover:bg-blue-400/80 active:scale-95"
        >
          {isSubmitting ? "Submitting..." : "Sign In"}
        </button>

        <p>
          Don't have an account?
          <Link
            to="/sign-up"
            className="mx-1 font-semibold transition-all duration-200 hover:text-blue-400"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
