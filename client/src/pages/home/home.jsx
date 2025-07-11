import React, { JSX } from "react";
import { motion } from 'framer-motion';
import ImageSlider from "../../components/image-slider/image-slider";
import './home.module.css';
import Breadcrumb from "../../components/breadcrumb/breadcrumb";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

export default function Home() {
  const breadcrumbItems = [
    { label: "Inicio", href: "/" }
  ];

  return (
    <>
      <motion.div variants={animation} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }}>
        <Breadcrumb items={breadcrumbItems} />
        <div className="container">
          <ImageSlider />
          <div className="row mt-2">
            <div className="col s3">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Card Title</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
            <div className="col s3">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Card Title</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
            <div className="col s3">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                  <span className="card-title">Card Title</span>
                  <p>I am a very simple card. I am good at containing small bits of information.
                  I am convenient because I require little markup to use effectively.</p>
                </div>
              </div>
            </div>
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