import { useState } from "react";
import css from "./Form.module.css";
import * as yup from "yup";
import eye from "../../images/eye.svg";
import eyeOff from "../../images/eye-off.svg";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../store";
import { Link } from "react-router-dom";

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).max(30).required(),
});

export interface SubmitValues {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth((state) => ({
    login: state.login,
  }));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SubmitValues>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SubmitValues> = async (data) => {
    login(data);
  };

  return (
    <div className={css.wrapper}>
      <h3 className={css.title}>Login</h3>
      <p className={css.text}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <input
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors && (
            <span className={css.errormessage}>{errors.email?.message}</span>
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
          Log In
        </button>
      </form>
      <Link className={css.link} to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginForm;
