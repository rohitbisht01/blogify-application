import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainBlog from "./components/MainBlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthentication } from "./store/user-slice";
import CreateBlog from "./pages/CreateBlog";

const App = () => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    dispatch(checkAuthentication(token));
  }, [dispatch]);

  if (isLoading) return <div>loading..</div>;

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<MainBlog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
      </Route>
    </Routes>
  );
};

export default App;
