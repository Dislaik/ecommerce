import React, { useRef, useEffect, useState } from "react";
import { useParams, useLoaderData } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import CheckoutButton from "../../components/checkout-button/checkout-button";
import styles from "./product.module.css";
import axios from "axios";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const IMAGE_URL = "https://digenerator.mnsalas.cl/image/200x200.png";

const productsByCategory = {
  notebook: [
    { id: 1, name: "Notebook 1", description: "Descripción de Notebook 1" },
    { id: 2, name: "Notebook 2", description: "Descripción de Notebook 2" },
  ],
  mouse: [
    { id: 1, name: "Mouse 1", description: "Descripción de Mouse 1" },
    { id: 2, name: "Mouse 2", description: "Descripción de Mouse 2" },
  ],
  keyboard: [
    { id: 1, name: "Keyboard 1", description: "Descripción de Keyboard 1" },
    { id: 2, name: "Keyboard 2", description: "Descripción de Keyboard 2" },
  ],
};

export async function productLoader({ params }) {
  const productId = Number(params.product);
  const categoryProducts = productsByCategory[params.category];
  if (!categoryProducts) {
    throw new Response("category not found", { status: 404 });
  }

  const product = categoryProducts.find((p) => p.id === productId);
  if (!product) {
    throw new Response("product not found", { status: 404 });
  }

  return product;
}

export default function Product() {
  const { category } = useParams();
  const product = useLoaderData();

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Categorias", href: "/categories" },
    {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/categories/${category}`,
    },
    { label: product.name, href: "#" },
  ];

  const thumbnails = [IMAGE_URL, IMAGE_URL, IMAGE_URL, IMAGE_URL];
  const [mainImage, setMainImage] = useState(IMAGE_URL);

  const imgRef = useRef(null);
  const [showZoom, setShowZoom] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    const lensSize = 100;
    const maxX = rect.width - lensSize;
    const maxY = rect.height - lensSize;

    x = Math.max(0, Math.min(x - lensSize / 2, maxX));
    y = Math.max(0, Math.min(y - lensSize / 2, maxY));

    const xPct = ((x + lensSize / 2) / rect.width) * 100;
    const yPct = ((y + lensSize / 2) / rect.height) * 100;

    setLensPos({ x, y });
    setZoomPos({ x: xPct, y: yPct });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  // const [result, setResult] = useState(null);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   const token = params.get("token_ws");
  //   if (token) {
  //     axios
  //       .put(`http://localhost:8080/api/v1/payment/commit/${token}`)
  //       .then((res) => setResult(res.data));
  //   }
  // }, []);

  const handleClickBuy = async (id) => {
    console.log("pruducto con id: ", id)
    const response = await axios.post(`http://localhost:8080/api/v1/payment/create`, { "orderId": "1", "amount": 1})

    const { token, url } = response.data;
    console.log(token, url)

    // Crear formulario y redirigir
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "token_ws";
    input.value = token;
    form.appendChild(input);

    document.body.appendChild(form);
    form.submit();

    //const test = await axios.put(`http://localhost:8080/api/v1/payment/commit/${response.data.token}`).then((res) => setResult(res.data));
    //console.log(test)
    
  };

  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      <Breadcrumb items={breadcrumbItems} />

      <div className="container">
        <div className="row">
          <div className="col s12 p-0">
            <div className="card white m-0">
              <div className="card-content">
                <div className={styles.productView}>
                  {/* Miniaturas */}
                  <div className={styles.thumbnails}>
                    {thumbnails.map((thumb, idx) => (
                      <img
                        key={idx}
                        src={thumb}
                        alt={`thumb-${idx}`}
                        onClick={() => setMainImage(thumb)}
                        className={styles.thumbnail}
                      />
                    ))}
                  </div>

                  {/* Imagen principal + overlay */}
                  <div className={styles.mainImageContainer}>
                    <div
                      className={styles.zoomContainer}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        ref={imgRef}
                        src={mainImage}
                        alt={product.name}
                        className={styles.mainImage}
                      />
                      {showZoom && (
                        <div
                          className={styles.lens}
                          style={{ top: lensPos.y, left: lensPos.x }}
                        />
                      )}
                    </div>

                    {showZoom && (
                      <div
                        className={styles.zoomOverlay}
                        style={{
                          backgroundImage: `url(${mainImage})`,
                          backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                        }}
                      />
                    )}
                  </div>
                  {/* Información */}
                  <div className={styles.info}>
                    <h2>{product.name}</h2>
                    <h3 className={styles.price}>
                      $28.990 <span className={styles.discount}>17% OFF</span>
                    </h3>
                    <p>{product.description}</p>
                    <ul>
                      <li>Switch: Red</li>
                      <li>Idioma: Inglés US</li>
                      <li>Retroiluminación: RGB</li>
                      <li>Color: Blanco</li>
                      <li>Conector: USB + Tipo C</li>
                    </ul>
                    <a className="waves-effect waves-light btn" onClick={() => handleClickBuy(product.id)}>Comprar ahora</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}