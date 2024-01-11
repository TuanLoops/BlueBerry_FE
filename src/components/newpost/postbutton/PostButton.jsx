import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./postButton.scss";
import CircularProgress from "@mui/material/CircularProgress";

function PostButton({ onClick, disabled, loading, className }) {
  return (
    <button
      disabled={disabled || loading}
      onClick={onClick}
      className={className}
    >
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <>
          <span>Post</span>
          <SendRoundedIcon className={!(disabled || loading) ? "active" : ""} />
        </>
      )}
    </button>
  );
}
export default PostButton;
