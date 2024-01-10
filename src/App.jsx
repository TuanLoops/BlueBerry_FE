import { useDispatch, useSelector } from "react-redux";
import Router from "./Router.jsx";
import { getCurrentUser } from "./redux/service/userService.jsx";

function App() {
  const dispatch = useDispatch();
  const accessToken = useSelector(({ user }) => user.accessToken);
  if (accessToken) {
    dispatch(getCurrentUser());
  }

  return <Router />;
}

export default App;
