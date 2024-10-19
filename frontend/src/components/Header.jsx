import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  loginUserAction,
  logoutAction,
  registerUserAction,
} from "@/store/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import Loader from "./Loader";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.user
  );

  if (isLoading) return <Loader />;

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1
          className="text-3xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Blogify
        </h1>
      </div>

      <div className="flex items-center gap-5">
        {isAuthenticated ? (
          <div className="flex items-center gap-5">
            {user.username}
            {pathname === "/create-blog" ? null : (
              <Button
                onClick={() => navigate("/create-blog")}
                variant="outline"
              >
                Write Blog
              </Button>
            )}
            <LogoutComponent />
          </div>
        ) : (
          <>
            <LoginAuthComponent />
            <RegisterAuthComponent />
          </>
        )}
      </div>
    </div>
  );
};

const LogoutComponent = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutAction())
      .then((response) => {
        if (response.payload.success) {
          toast.success("Successfull logged out");
        } else {
          toast.error("Logout failed");
        }
      })
      .catch((error) => {
        toast.error("An error occurred during logout");
      });
  };

  return (
    <div onClick={handleLogout}>
      <Button className="sm:block md:hidden" variant="outline">
        <LogOut />
      </Button>
      <Button variant="outline" className="hidden lg:block md:block">
        Logout
      </Button>
    </div>
  );
};

const RegisterAuthComponent = () => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      dispatch(registerUserAction({ username, email, password })).then(
        (response) => {
          if (response.payload.success) {
            toast.success("User registered");
            setEmail("");
            setUsername("");
            setPassword("");
            setOpen(false);
          }
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Error registering user");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleRegister}>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>
              {"Enter your credentials below to register your account"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="username"
                placeholder="test-user"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="flex justify-center w-full" type="submit">
              Register
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const LoginAuthComponent = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUserAction({ email, password })).then((result) => {
        if (result.payload.success) {
          toast.success(`${result.payload.user.username} is logged in`);
          setEmail("");
          setPassword("");
          setOpen(false);
        }
      });
    } catch (error) {
      console.log("Error", error);
      toast.error("Error logging in");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              {"Enter your email below to login to your account."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="flex justify-center w-full" type="submit">
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Header;
