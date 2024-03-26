import React, { useState } from "react";
import Header from "../../components/Header/Header";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/auth/authActions";
import * as Yup from "yup";
import { IoIosWarning } from "react-icons/io";

const REACT_APP_VETOLIB_BACKEND_URL = process.env.REACT_APP_VETOLIB_BACKEND_URL;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [emailErrors, setEmailErrors] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const redirect = searchParams.get("redirect");

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .email("Identifiant ou mot de passe incorrect")
      .required(),
    password: Yup.string()
      .min(5, "Identifiant ou mot de passe incorrect")
      .required(),
  });

  const validateForm = async () => {
    try {
      await loginSchema.validate(
        { username: email, password },
        { abortEarly: false }
      );
      const action = await dispatch(loginUser({ username: email, password }));
      if (loginUser.rejected.match(action)) {
        setValidationErrors([action.error.message]);
        setEmailErrors(false);
        setPasswordErrors(false);
      } else {
        redirect
          ? navigate("/professional?fromLogin=true")
          : navigate("/account/appointments");
        setValidationErrors([]);
        setEmailErrors(false);
        setPasswordErrors(false);
      }
    } catch (error) {
      if (error.name === "ValidationError") {
        const emailErrors = error.inner.filter(
          (e) =>
            e.type === "required" &&
            e.message.toLowerCase().includes("username")
        );
        const passwordErrors = error.inner.filter(
          (e) =>
            e.type === "required" &&
            e.message.toLowerCase().includes("password")
        );

        if (emailErrors.length > 0 && passwordErrors.length > 0) {
          setEmailErrors(true);
          setPasswordErrors(true);
          setValidationErrors([]);
        } else if (emailErrors.length > 0) {
          setEmailErrors(true);
          setPasswordErrors(false);
          setValidationErrors([]);
        } else if (passwordErrors.length > 0) {
          setPasswordErrors(true);
          setEmailErrors(false);
          setValidationErrors([]);
        } else {
          setValidationErrors(error.errors);
          setEmailErrors(false);
          setPasswordErrors(false);
        }
      } else {
        console.error("Login error:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validateForm();
    } catch (error) {
      console.error("Form submission failed:", error);
    }
  };

  const handleGoogleLogin = async (e) => {
    if (redirect) {
      window.location.href = `${REACT_APP_VETOLIB_BACKEND_URL}/api/auth/google?redirect=${redirect}`;
    } else {
      window.location.href = `${REACT_APP_VETOLIB_BACKEND_URL}/api/auth/google`;
    }
  };

  return (
    <div className="login_register">
      <Header />
      <div className="page">
        <div className="login">
          <h1>J'ai déjà un compte Vetolib</h1>
          {validationErrors.length > 0 && (
            <div className="error-details">
              <IoIosWarning className="svg" />
              {validationErrors[0]}
            </div>
          )}
          <input
            type="email"
            name="email"
            placeholder="Adresse e-mail"
            className={`login_input ${emailErrors ? "error_input" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            className={`login_input ${passwordErrors ? "error_input" : ""}`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="connect" onClick={handleSubmit}>
            SE CONNECTER
          </button>
          <Link to="/reset_password" className="forgotten">
            MOT DE PASSE OUBLIÉ
          </Link>
        </div>
        <div className="register">
          <h1>Nouveau sur Vetolib ?</h1>
          <Link to="/register" className="register-link">
            S'INSCRIRE
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
