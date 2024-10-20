import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainBlog from "./components/MainBlog";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuthentication } from "./store/user-slice";
import CreateBlog from "./pages/CreateBlog";
import BlogDetail from "./pages/BlogDetail";
import Loader from "./components/Loader";
import AllBlogs from "./pages/AllBlogs";

const App = () => {
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    dispatch(checkAuthentication(token));
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<MainBlog />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        {/* <Route path="/blogs/:id" element={<AllBlogs />} /> */}
        <Route path="/user-blogs" element={<AllBlogs />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
