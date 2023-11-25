import { useEffect, useState } from "react";
import "./Uploading.css";

const Uploading = () => {
  const [loaderPosition, setLoaderPosition] = useState(0);

  useEffect(() => {
    const counter = setInterval(() => {
      if (loaderPosition < 100) {
        setLoaderPosition((prevPos) => (prevPos < 100 ? prevPos + 3 : -20));
      } else {
        setLoaderPosition(0);
      }
    }, 90);

    return () => {
      clearInterval(counter);
    };
  });

  return (
    <div className="uploading-box">
      <div className="uploading-text">Uploading Image...</div>
      {/* Barra de carga de las imagenes */}
      <div className="loading-strip">
        <div
          className="loading-bar"
          style={{ position: "relative", left: `${loaderPosition}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Uploading;
