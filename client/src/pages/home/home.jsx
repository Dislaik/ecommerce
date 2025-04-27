import React from "react";
import { motion } from 'framer-motion';
import './home.css';

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Home() {
  return (
    <>
      <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
        <div className="container">
        <p>Bienvenido a Home</p>
        </div>
      </motion.div>
    </>
  )
};