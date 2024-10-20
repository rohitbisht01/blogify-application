import { getAllBlogsAction } from "@/store/blog-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const MainBlog = () => {
  const dispatch = useDispatch();
  const { blogLists, totalBlogs, isLoading } = useSelector(
    (state) => state.blog
  );
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalBlogs / 3);

  useEffect(() => {
    dispatch(getAllBlogsAction(page));
  }, [dispatch, page]);

  const handlePageChange = (status) => {
    if (status === "prev") {
      setPage((page) => (page > 1 ? page - 1 : page));
    } else if (status === "next") {
      setPage((page) => (page < totalPages ? page + 1 : page));
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div>
      {blogLists.map((blog) => {
        return <BlogPost key={blog._id} blog={blog} />;
      })}
      <div className="my-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange("prev")}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange("next")}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

const BlogPost = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blog/${blog._id}`)}
      className="my-5 cursor-pointer"
      style={{
        height: 200,
      }}
    >
      <div className="grid grid-cols-3 gap-5">
        <div
          style={{
            height: 200,
          }}
        >
          <img
            src={blog.cover}
            alt="Blog Image"
            className="object-cover h-full w-full rounded-md"
            loading="lazy"
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-bold">{blog.title}</h1>

          <div className="h-18 mt-2">
            <p className="line-clamp-3">{blog.summary}</p>
          </div>

          <div className="flex flex-row sm:items-center items-start gap-3 text-gray-600 mt-2 text-xs">
            <Avatar className="">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>
                {blog.author.username.slice(0, 1).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col text-sm">
              <p className="">{blog.author.username}</p>
              <p>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlog;
