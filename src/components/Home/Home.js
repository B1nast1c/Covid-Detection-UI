import "./Home.css";
import image from "../../assets/image.svg";

const url = 'http://127.0.0.1:5000/cargarImagen';

const Home = ({ setLoading, setImgUrl, setResult }) => {
  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleSubmit(file) {
    setLoading(1);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
         return response.json();
      })
      .then((data) => {
        console.log("API Response:", data); // Agrega esta línea para imprimir la respuesta en la consola
        setImgUrl(data.img);
        setResult(data.data)
        console.log(data.data);
      })
      .then(() => setLoading(2))
      .catch((err) => console.log(err));
      setLoading(2)
    }

  return (
    <>
    <div className="img-upload-box">
      <div className="img-upload-box-heading">Upload a tomography</div>
      <div className="img-upload-box-subtitle">Only available in JPEG or PNG image formats</div>
      <div
        className="img-upload-stage-container"
        onDragEnter={(e) => {
          preventDefault(e);
        }}
        onDragEnd={(e) => {
          preventDefault(e);
        }}
        onDragOver={(e) => {
          preventDefault(e);
        }}
        onDrop={(e) => {
          preventDefault(e);
          handleSubmit(e.dataTransfer.files[0]);
        }}
      >
        <div className="img-upload-stage">
          <img src={image} alt="" className="placeholder-img" />
          <div className="img-upload-stage-text">
            Drag and Drop your image here
          </div>
        </div>
      </div>
      <div className="or-class">O</div>
      <div className="upload-button-container">
        <label htmlFor="img-upload" className="upload-button">
          <span className="upload-button-text">Select a file...</span>
          {/* Proceso de seleccion de imagenes */}
        </label>
        <input
          type="file"
          accept="image"
          id="img-upload"
          onChange={(e) => handleSubmit(e.target.files[0])}
        />
      </div>
    </div>
    </>
  );
};

export default Home;
