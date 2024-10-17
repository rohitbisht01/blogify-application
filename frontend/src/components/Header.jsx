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
import { url } from "@/lib/config";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold cursor-pointer">Blogify</h1>
      </div>

      <div className="flex items-center gap-5">
        <AuthComponent
          title="Login"
          buttonLabel="Login"
          description="Enter your email below to login to your account."
        />
        <AuthComponent
          title="Register"
          buttonLabel="Register"
          description="Enter your credentials below to register your account."
        />
      </div>
    </div>
  );
};

const AuthComponent = ({ title, buttonLabel, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const loginUser = async (body) => {
  //   try {
  //     const response = await axios.post(`${url}/api/v1/user/login`, body);
  //     return response.data;
  //   } catch (error) {
  //     console.log("Error logging in", error);
  //   }
  // };

  // const registerUser = async (body) => {
  //   try {
  //     const response = await axios.post(`${url}/api/v1/user/register`, body);
  //     return response.data;
  //   } catch (error) {
  //     console.log("Error registering user", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //   const body = { email, password };
    //   const result = await loginUser(body);
    //   console.log(result.user);

    //   if (result.success) {
    //     toast(`${result.user.username} is logged in`);
    //     setEmail("");
    //     setPassword("");
    //     setIsOpen(false);
    //   }
    // } catch (error) {
    //   console.log("Error", error);
    // }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{buttonLabel}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {title === "Register" && (
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
            )}
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
              {title}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Header;
