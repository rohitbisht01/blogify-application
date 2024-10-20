import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { deleteBlogAction } from "@/store/blog-slice";
import { getUserBlogsAction } from "@/store/user-slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const AllBlogs = () => {
  const { id } = useParams();
  const { blogs, isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const [page, setPage] = useState(1);
  //   const totalPages = Math.ceil(totalBlogs / 3);

  useEffect(() => {
    // Only fetch blogs if not already loaded
    if (id && blogs.length === 0) {
      dispatch(getUserBlogsAction(id));
    }
  }, [id, blogs, dispatch]);

  //   const handlePageChange = (status) => {
  //     if (status === "prev") {
  //       setPage((page) => (page > 1 ? page - 1 : page));
  //     } else if (status === "next") {
  //       setPage((page) => (page < totalPages ? page + 1 : page));
  //     }
  //   };

  const handleDeleteBlog = (blogId) => {
    console.log(blogId);

    dispatch(deleteBlogAction(blogId))
      .then((response) => {
        if (response.payload.success) {
          toast.success("blog deleted");
          //   dispatch(getUserBlogsAction(id));
          //   navigate("/");
        }
      })
      .catch((error) => {
        toast.error("Error deleting blog");
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mt-10">
        <h1 className="flex justify-center font-bold text-xl">
          {user.username}&apos;s Blogs
        </h1>
      </div>

      {blogs.map((blog) => {
        return (
          <BlogComponent
            blog={blog}
            key={blog._id}
            onBlogDelete={handleDeleteBlog}
          />
        );
      })}
      {/* <div className="my-6">
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
      </div> */}
    </div>
  );
};

const BlogComponent = ({ blog, onBlogDelete }) => {
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

          <div className="flex items-center gap-4 justify-end mt-4 sm:mt-8">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/create-blog")}
            >
              Edit
            </Button> */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onBlogDelete(blog._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
