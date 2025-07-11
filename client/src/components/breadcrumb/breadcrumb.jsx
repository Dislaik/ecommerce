import React from "react";
import { Link } from 'react-router-dom';
import styles from "./breadcrumb.module.css";

export default function Breadcrumb({ items }) {
  return (
    <div className={styles["breadcrumb-background"]}>
      <div className="container">
        <nav aria-label="breadcrumb" className={styles.breadcrumb}>
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <span key={idx} className={styles.breadcrumbItem}>
                {!isLast ? (
                  <>
                    <Link to={item.href}>{item.label}</Link>
                    <span className={styles.separator}> &gt; </span>
                  </>
                ) : (
                  <span className={styles.current}>{item.label}</span>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
}