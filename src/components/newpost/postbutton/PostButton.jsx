import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./postButton.scss";
import CircularProgress from "@mui/material/CircularProgress";

function PostButton({ onClick, disabled, loading }) {
  return (
    <button disabled={disabled || loading} onClick={onClick} className="btn">
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <span>Post</span>
          <SendRoundedIcon />
        </>
      )}
    </button>
  );
}
export default PostButton;
