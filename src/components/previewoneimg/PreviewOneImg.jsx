import './previewOne.sass'
import {OneImg} from "./oneimg/OneImg.jsx";

function PreviewOneImg ({ imageList, remove }) {
    return (
        <div className="preview-container">
            {imageList.map((item, index) => (
                <OneImg onRemove={() => remove(index)} key={index} src={item.imageLink} />
            ))}
        </div>
    );
}
export default PreviewOneImg;