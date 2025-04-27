import React from "react";
import { motion } from 'framer-motion';
import './register.css';

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Register() {
  return (
    <>
      <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
        <div className="container">
        <p>Bienvenido a Register</p>
        </div>
      </motion.div>
    </>
  )
};