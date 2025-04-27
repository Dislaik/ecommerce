import React from "react";
import { motion } from 'framer-motion';

import './login.css';
import googleIcon from '../../assets/svg/icon-google.svg';


const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

function onLoginGoogle() {
  console.log("asdas")
}

export default function Login() {
  return (
    <>
      <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
        <div className="container">
          <div className="login-card-container">
            <div className="login-card">
              <div className="card-content">
                <h4>Ingresar</h4>
                <p>Ingresa a tu cuenta</p>
                <div className="d-flex justify-content-center">
                  <button className="google-btn" onClick={onLoginGoogle}>
                    <div className="google-icon">
                        <img src={googleIcon} alt='Logo' draggable='false'/>
                    </div>
                    <span>Ingresa con Google</span>
                  </button>
                </div>
                <div class="or-border mb-3"> o ingresar con</div>
                <div class="input-field">
                  <input id="email" type="email" class="validate"/>
                  <label for="email">Correo electrónico</label>
                  <span class="helper-text" data-error="wrong" data-success="right"></span>
                </div>
                <div class="input-field">
                  <input id="password" type="password" class="validate"/>
                  <label for="password">Contraseña</label>
                  <span class="helper-text" data-error="wrong" data-success="right"></span>
                </div>
              </div>
              <div className="card-action">
                <a class="waves-effect waves-light btn">Ingresar</a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
};