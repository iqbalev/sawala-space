import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { SignUpFormData, signUpSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";

type SignUpResponse = {
  success: boolean;
  message: string;
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({ resolver: zodResolver(signUpSchema) });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-up`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result: SignUpResponse = await response.json();
      if (!result.success) {
        return setError("email", { message: result.message });
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
    <div className="flex flex-col gap-4 max-w-xl w-full mx-auto py-8">
      <section className="flex flex-col gap-2 bg-blue-50 p-6 rounded-xl">
        <h1 className="text-4xl sm:text-5xl font-semibold">
          Join <span className="text-blue-400 font-semibold">SawalaSpace</span>
        </h1>

        <p className="text-xl">
          ... and start sharing your ideas with the world.
        </p>
      </section>

      <p>
        Already have an account?
        <Link
          to="/sign-in"
          className="mx-1 font-semibold hover:text-blue-400 transition-all duration-200"
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
            <p className="text-sm text-white bg-red-400 p-3 rounded-xl">
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="text-xl p-4 text-white rounded-xl bg-blue-400 font-semibold hover:bg-blue-400/80 active:scale-95 transition-all duration-200"
        >
          {isSubmitting ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
