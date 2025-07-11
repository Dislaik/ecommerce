import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import styles from "./category.module.css";

const animation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const productsByCategory = {
  notebook: [
    { id: 1, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Notebook 1", description: "Descripción de Notebook 1" },
    { id: 2, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Notebook 2", description: "Descripción de Notebook 2" },
    { id: 3, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Notebook 3", description: "Descripción de Notebook 3" },
  ],
  mouse: [
    { id: 1, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Mouse 1", description: "Descripción de Mouse 1" },
    { id: 2, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Mouse 2", description: "Descripción de Mouse 2" },
    { id: 3, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Mouse 3", description: "Descripción de Mouse 3" },
  ],
  keyboard: [
    { id: 1, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Keyboard 1", description: "Descripción de Keyboard 1" },
    { id: 2, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Keyboard 2", description: "Descripción de Keyboard 2" },
    { id: 3, image_preview: "https://digenerator.mnsalas.cl/image/200x200.png", name: "Keyboard 3", description: "Descripción de Keyboard 3" },
  ],
};

export async function categoryLoader({ params }) {
  const res = productsByCategory[params.category];
  if (!res) {
    throw new Response("Category not found", { status: 404 });
  }
  return res;
}

export default function Category() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = parseInt(searchParams.get("page"), 10);
  const [currentPage, setCurrentPage] = useState(isNaN(pageParam) ? 1 : pageParam);
  const itemsPerPage = 2;

  const products = productsByCategory[category] || [];
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Categorias", href: "/categories" },
    {
      label: category.charAt(0).toUpperCase() + category.slice(1),
      href: `/categories/${category}`,
    },
  ];

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages || isNaN(currentPage)) {
      setSearchParams({ page: 1 });
      setCurrentPage(1);
    }

    if (!searchParams.has("page")) {
      setSearchParams({ page: 1 });
    }
  }, [currentPage, totalPages, setSearchParams]);


  
  const handleClick = (productId) => {
    navigate(`/categories/${category}/${productId}`);
  };

  const changePage = (page) => {
    setCurrentPage(page);
    setSearchParams({ page });
  };

  const nextPage = () => {
    if (currentPage < totalPages) changePage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) changePage(currentPage - 1);
  };

  const goToPage = (page) => {
    changePage(page);
  };

  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
          <div className="col s3 ps-0 pe-4">
            <div className="card white">
              <div className="card-content">
                <span className="card-title">Filtros</span>
                <p>Filtrar productos aquí.</p>
              </div>
            </div>
          </div>

          <div className="col s9 px-0">
            <div className="row">
              <div className="col s12 p-0">
                {paginatedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="card white mb-2"
                    onClick={() => handleClick(product.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card-content p-2">
                      <div className="d-flex">
                        <img
                          src={product.image_preview}
                          alt={product.name}
                          style={{
                            width: "200px",
                            height: "200px",
                            objectFit: "cover",
                            marginRight: "1rem",
                          }}
                        />
                        <div className="d-flex flex-column">
                          <span className="card-title">{product.name}</span>
                          <p>{product.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {products.length === 0 && (
                  <p>No hay productos para esta categoría.</p>
                )}

                <div className="d-flex justify-content-center">
                  <ul className="pagination">
                    <li
                      className={`${styles.arrow} waves-effect ${styles.arrowLeft}`}
                      onClick={prevPage}
                    >
                      &#10094;
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index + 1}
                        className={
                          currentPage === index + 1
                            ? "active"
                            : "waves-effect"
                        }
                        onClick={() => goToPage(index + 1)}
                      >
                        <a>{index + 1}</a>
                      </li>
                    ))}
                    <li
                      className={`${styles.arrow} waves-effect ${styles.arrowRight}`}
                      onClick={nextPage}
                    >
                      &#10095;
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}