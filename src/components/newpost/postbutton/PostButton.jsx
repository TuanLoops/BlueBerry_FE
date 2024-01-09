import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./postButton.scss";

function PostButton({ disabled, onClick }) {
  if (!disabled) {
    return (
      <button onClick={onClick} className="btn">
        <span>Post</span>
        <SendRoundedIcon />
      </button>
    );
  } else {
    return (
      <button disabled className="disabled">
        <span>Post</span>
        <SendRoundedIcon />
      </button>
    );
  }
}
export default PostButton;
