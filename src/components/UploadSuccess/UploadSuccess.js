import "./UploadSuccess.css";
import SuccessIcon from "./SuccessIcon";

const UploadSuccess = ({ imgUrl }) => {

  return (
    <div className="upload-success-box">
      <SuccessIcon />
      <div className="upload-success-text">Here are the results</div>
      <img src={imgUrl} alt="" className="uploaded-img" />
      <form className="img-link-container">
        <input
          type="text"
          readOnly
          value={`${imgUrl}`} // String de la imagen = Clasificacion
          className="url-text-input"
        />
      </form>
    </div>
  );
};

export default UploadSuccess;
