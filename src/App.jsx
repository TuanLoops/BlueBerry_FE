import { useDispatch, useSelector } from "react-redux";
import Router from "./Router.jsx";
import { getCurrentUser } from "./redux/service/userService.jsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(({ user }) => user.accessToken);
  useEffect(() => {
    if (accessToken) {
      dispatch(getCurrentUser());
    }
  }, [accessToken, dispatch]);

  return <Router />;
}

export default App;
