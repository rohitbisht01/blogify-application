import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center content-center">
      <PropagateLoader color="#412b2b" size={10} />
    </div>
  );
};

export default Loader;
