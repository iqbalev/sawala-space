import { useNavigate, Link } from "react-router";
import { useForm } from "react-hook-form";
import { SignInFormData, signInSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../components/FormInput";

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (data: SignInFormData) => {
    console.log("Submitted form:", data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/sign-in`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      console.log("Result:", result);

      if (!result.success) {
        return setError("root", { message: result.message });
      }
      return navigate("/");
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
            <p className="text-sm text-white bg-red-400 p-3 rounded-xl">
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
          className="text-xl p-4 text-white rounded-xl bg-blue-400/100 font-semibold hover:bg-blue-400/80 active:scale-95 transition-all duration-200"
        >
          {isSubmitting ? "Submitting..." : "Sign In"}
        </button>

        <p>
          Don't have an account?
          <Link
            to="/sign-up"
            className="mx-1 font-semibold hover:text-blue-400 transition-all duration-200"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
