import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold cursor-pointer">Blogify</h1>
      </div>

      <div className="flex items-center gap-5">
        <Button variant="outline">Login</Button>
        <Button variant="outline">Register</Button>
      </div>
    </div>
  );
};

export default Header;
