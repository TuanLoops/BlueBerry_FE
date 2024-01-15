import "./time.scss";
import { format, formatDistanceToNow } from "date-fns";

function Time({ time }) {
  return (
    <span className="time">
      <div className="time-container">{formatDistanceToNow(time) + " ago"}</div>
      <div className="time-popup">
        <div className="popup-wrapper">
          {format(time, "dd/MM/yyyy hh:mm:ss")}
        </div>
      </div>
    </span>
  );
}
export default Time;
