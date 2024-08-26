import { useState } from "react";
import css from "./Form.module.css";
import * as yup from "yup";
import eye from "../../images/eye.svg";
import eyeOff from "../../images/eye-off.svg";
import googleIcon from "../../images/google-icon.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../store";
import { Link } from "react-router-dom";

const registerSchema = yup.object({
  name: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(30).required(),
});

export interface SubmitValues {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register: signup } = useAuth((state) => ({
    register: state.register,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubmitValues>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SubmitValues> = async (data) => {
    signup(data);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Register</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors && (
            <span className={css.errormessage}>{errors.password?.message}</span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors && (
            <span className={css.errormessage}>{errors.password?.message}</span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          {errors && (
            <span className={css.errormessage}>{errors.password?.message}</span>
          )}
          <button
            type="button"
            className={css.btnShowPassword}
            onClick={() => setShowPassword(!showPassword)}
          >
            <img src={showPassword ? eye : eyeOff} alt="ShowPassword" />
          </button>
        </div>
        <button className={css.btn} type="submit">
          Register
        </button>
      </form>
      <a
        className={css.googleLogin}
        href="http://localhost:5000/api/auth/google"
      >
        <img src={googleIcon} width={20} height={20} alt="google" />
        Enter with Google
      </a>
      <Link className={css.link} to="/login">
        Login
      </Link>
    </div>
  );
};

export default RegisterForm;
