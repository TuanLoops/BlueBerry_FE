import "./previewImg.scss";
import Img from "./img/Img";

function PreviewImg({ imageList, remove }) {
  const handleRemove = (e, index) => {
    e.stopPropagation();
    remove(index);
  };

  return (
    <div className="preview-container">
      {imageList.map((item, index) => (
        <Img
          onRemove={(e) => handleRemove(e, index)}
          key={index}
          src={item.imageLink}
        />
      ))}
    </div>
  );
}

export default PreviewImg;
