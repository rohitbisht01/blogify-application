import Loader from "@/components/Loader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  const navigate = useNavigate();
  const { blogs, isLoading, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Only fetch blogs if not already loaded
    if (user && user._id && blogs.length === 0) {
      dispatch(getUserBlogsAction(user._id));
    }
  }, [user, blogs, dispatch]);

  // const handleDeleteBlog = (blogId) => {
  //   dispatch(deleteBlogAction(blogId))
  //     .then((response) => {
  //       if (response.payload.success) {
  //         toast.success("blog deleted");
  //         //   dispatch(getUserBlogsAction(id));
  //         //   navigate("/");
  //       }
  //     })
  //     .catch((error) => {
  //       toast.error("Error deleting blog");
  //     });
  // };

  if (!user) return;

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

      {(blogs === null || blogs.length === 0) && (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <h2 className="text-lg font-semibold text-gray-700">
            No Blogs Written Yet
          </h2>
          <p className="text-gray-500">
            It seems there are no blogs available at the moment.
          </p>
          <p className="text-gray-500">Be the first to share your thoughts!</p>
          <div className="mt-4">
            <Button
              className="px-4 py-2  text-white rounded-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              onClick={() => navigate("/create-blog")}
            >
              Write a Blog
            </Button>
          </div>
        </div>
      )}

      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => {
          return (
            <BlogComponent blog={blog} key={blog._id} onBlogDelete={() => {}} />
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

          <div className="flex flex-row sm:items-center items-start gap-3 text-gray-600 mt-2 text-sm">
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

          <div className="flex items-center gap-4 justify-end mt-4 sm:mt-8">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/create-blog")}
            >
              Edit
            </Button> */}
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => onBlogDelete(blog._id)}
            >
              Delete
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
