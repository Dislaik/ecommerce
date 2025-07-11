import React from "react";
import { motion } from 'framer-motion';
import styles from "./categories.module.css";
import Breadcrumb from '../../components/breadcrumb/breadcrumb';

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};


export default function Categories() {
  const breadcrumbItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Categorias', href: '/categories' },
  ];

  return (
    <>
      <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
        <Breadcrumb items={breadcrumbItems} />
        <div className="container">
          <div className="row">
            <div className="col s3">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Card Title</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
};