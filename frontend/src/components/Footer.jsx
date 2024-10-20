import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

const socialLinks = [
  {
    label: "About",
    href: "https://github.com/rohitbisht01/blogify-application",
  },
  {
    label: "Github",
    href: "https://github.com/rohitbisht01/blogify-application",
  },
  {
    label: "Contact",
    href: "https://github.com/rohitbisht01",
  },
];

const Footer = () => {
  return (
    <div className="">
      <div className="flex items-center justify-between flex-col sm:flex-col md:flex-row">
        <div className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 cursor-pointer">
          <Link to={"/"}>Blogify</Link>
        </div>

        <div className="flex flex-row gap-4">
          {socialLinks.map((link, index) => {
            return (
              <Link
                key={index}
                to={link.href}
                className="cursor-pointer text-gray-500 hover:text-gray-900 text-sm"
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>

      <Separator className="my-4" />

      <div className="text-gray-500 text-center text-sm">
        @ {new Date().getFullYear()}{" "}
        <Link to={"https://github.com/rohitbisht01"} target="__blank">
          <span className="font-bold cursor-pointer">Blogify</span>
        </Link>
        . All Rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
