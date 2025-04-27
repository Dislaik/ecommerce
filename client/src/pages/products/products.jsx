import React from "react";
import { motion } from 'framer-motion';
import './products.css';

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};


export default function Products() {
  return (
    <>
      <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
        <div className="container">
          <h2>Productos</h2>
          <div className="row">
            <div className="col s3">
              Filtrar
            </div>
            <div className="col s9">
              <div className="row">
                <div className="col s4">
                  Producto
                </div>
                <div className="col s4">
                  Producto
                </div>
                <div className="col s4">
                  Producto
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
};