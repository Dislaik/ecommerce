import React, { useState } from "react";
import { motion } from 'framer-motion';
import './register.css';
import googleIcon from '../../assets/svg/icon-google.svg';
import authService from '../../services/auth';

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!email) newErrors.email = "El correo es obligatorio";
    if (!password) newErrors.password = "La contraseña es obligatoria";
    if (!repeatPassword) newErrors.repeatPassword = "Debes repetir la contraseña";
    if (password && repeatPassword && password !== repeatPassword) newErrors.repeatPassword = "Las contraseñas no coinciden";
    if (!firstName) newErrors.firstName = "El nombre es obligatorio";
    if (!lastName) newErrors.lastName = "El apellido es obligatorio";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field) => {
    setErrors((prev) => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  const onClickRegister = (type) => {
    if (type === "GoogleAccount") {
      authService.register({ type: "GoogleAccount" });
    } else if (type === "SimpleAccount") {
      if (!validate()) return;

      const payload = {
        email,
        password,
        repeatPassword,
        firstName,
        lastName
      };

      console.log(payload);
      authService.register(payload);
    }
  };

  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        <div className="login-card-container">
          <div className="login-card">
            <div className="card-content">
              <h4>Registrarse</h4>
              <p>Crea una cuenta</p>

              <div className="d-flex justify-content-center">
                <button className="google-btn" onClick={() => onClickRegister("GoogleAccount")}>
                  <div className="google-icon">
                    <img src={googleIcon} alt='Logo' draggable='false' />
                  </div>
                  <span>Registrate con Google</span>
                </button>
              </div>

              <div className="or-border mb-3"> o registrate con</div>
              <div className="input-field mb-0">
                <input
                  id="email"
                  type="email"
                  className={`${errors.email ? 'invalid' : ''}`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    clearError("email");
                  }}
                />
                <label htmlFor="email">Correo electrónico</label>
                {errors.email && <span className="helper-text red-text">{errors.email}</span>}
              </div>

              <div className="input-field mb-0">
                <input
                  id="password"
                  type="password"
                  className={`${errors.password ? 'invalid' : ''}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    clearError("password");
                  }}
                />
                <label htmlFor="password">Contraseña</label>
                {errors.password && <span className="helper-text red-text">{errors.password}</span>}
              </div>

              <div className="input-field mb-0">
                <input
                  id="repeatPassword"
                  type="password"
                  className={`${errors.repeatPassword ? 'invalid' : ''}`}
                  value={repeatPassword}
                  onChange={(e) => {
                    setRepeatPassword(e.target.value);
                    clearError("repeatPassword");
                  }}
                />
                <label htmlFor="repeatPassword">Repetir Contraseña</label>
                {errors.repeatPassword && <span className="helper-text red-text">{errors.repeatPassword}</span>}
              </div>

              <div className="row no-outer-margin">
                <div className="col s6">
                  <div className="input-field mb-0">
                    <input
                      id="firstName"
                      type="text"
                      className={`${errors.firstName ? 'invalid' : ''}`}
                      value={firstName}
                      onChange={(e) => {
                        setFirstName(e.target.value);
                        clearError("firstName");
                      }}
                    />
                    <label htmlFor="firstName">Nombre</label>
                    {errors.firstName && <span className="helper-text red-text">{errors.firstName}</span>}
                  </div>
                </div>
                <div className="col s6">
                  <div className="input-field mb-0">
                    <input
                      id="lastName"
                      type="text"
                      className={`${errors.lastName ? 'invalid' : ''}`}
                      value={lastName}
                      onChange={(e) => {
                        setLastName(e.target.value);
                        clearError("lastName");
                      }}
                    />
                    <label htmlFor="lastName">Apellido</label>
                    {errors.lastName && <span className="helper-text red-text">{errors.lastName}</span>}
                  </div>
                </div>
              </div>
            </div>

            <div className="card-action">
              <a
                className="waves-effect waves-light btn"
                onClick={() => onClickRegister("SimpleAccount")}
              >
                Ingresar
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}