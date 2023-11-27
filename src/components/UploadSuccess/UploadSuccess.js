import "./UploadSuccess.css";
import SuccessIcon from "./SuccessIcon";

const UploadSuccess = ({ imgUrl, result }) => {

  let classificationText;

  if (result === 0) {
    classificationText = "It's Covid";
  } else if (result === 1) {
    classificationText = "It's normal";
  } else if (result === 2) {
    classificationText = "It's lung opacity";
  } else if (result === 3) {
    classificationText = "It's viral neumonía";
  } else {
    classificationText = "Unidentified";
  }

  return (
    <div className="upload-success-box">
      <SuccessIcon />
      <div className="upload-success-text">Here are the results</div>
      <img src={imgUrl} alt="" className="uploaded-img" />
      <form className="img-link-container">
        <input
          type="text"
          readOnly
          value={ classificationText } // String de la imagen = Clasificacion
          className="url-text-input"
        />
      </form>
    </div>
  );
};

export default UploadSuccess;
