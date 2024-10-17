import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainBlog from "./components/MainBlog";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<MainBlog />} />
      </Route>
    </Routes>
  );
};

export default App;
