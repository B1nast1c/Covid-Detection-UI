import "./Home.css";
import image from "../../assets/image.svg";

const url = '';

const Home = ({ setLoading, setImgUrl }) => {
  function preventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleSubmit(file) {
    setLoading(1);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    /*fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // return response.json();
      })
      .then((data) => {
        setImgUrl(data.url);
      })
      .then(() => setLoading(2))
      .catch((err) => console.log(err));*/
      setLoading(2)
    }

  return (
    <div className="img-upload-box">
      <div className="img-upload-box-heading">Sube una radiografia</div>
      <div className="img-upload-box-subtitle">Recuerda que la imagen debe ser JPEG o PNG</div>
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
            Arrastra y suelta tu imagen aqui
          </div>
        </div>
      </div>
      <div className="or-class">O</div>
      <div className="upload-button-container">
        <label htmlFor="img-upload" className="upload-button">
          <span className="upload-button-text">Selecciona...</span>
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
  );
};

export default Home;
