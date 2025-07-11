import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./image-slider.module.css";

const images = [
  "800x300.png",
  "800x300.png",
  "800x300.png",
  "800x300.png"
];

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  const nextSlide = (manual = true) => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    if (manual) resetInterval();
  };

  const resetInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 10000);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetInterval();
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    resetInterval();
  };

  useEffect(() => {
    resetInterval();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetInterval]);

  return (
    <div className={styles.slider}>
      <div className={styles.sliderContent}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.sliderImage}
        />

        <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prevSlide}>
          &#10094;
        </button>
        <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => nextSlide()}>
          &#10095;
        </button>
      </div>

      <div className={styles.dots}>
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.dot} ${idx === currentIndex ? styles.active : ""}`}
            onClick={() => goToSlide(idx)}
          />
        ))}
      </div>
    </div>
  );
}