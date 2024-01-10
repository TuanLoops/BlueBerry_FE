import "./changeAvatar.scss";

function ChangeAvatar({ onClose }) {
  const handleClose = (e) => {
    onClose();
  };

  return (
    <div className="change-avatar" onClick={handleClose}>
      <div className="ca-container">
        <div className="ca-wrapper">
          <div></div>
        </div>
      </div>
    </div>
  );
}
export default ChangeAvatar;
