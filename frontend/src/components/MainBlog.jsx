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
      className="my-10 cursor-pointer"
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
          <div className="flex sm:flex-row flex-col  sm:items-center items-start gap-3 text-gray-600 my-1 text-sm">
            <p className="sm:text-left text-center">{blog.author.username}</p>
            <div className="hidden sm:flex gap-2">
              <p>{new Date(blog.createdAt).toLocaleDateString()}</p>
              <p>{new Date(blog.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>

          <div className="h-16">
            <p className="line-clamp-3">{blog.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBlog;
