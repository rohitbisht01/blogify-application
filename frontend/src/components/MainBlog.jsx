import { getAllBlogsAction } from "@/store/blog-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { Navigate, useNavigate } from "react-router-dom";

const MainBlog = () => {
  const dispatch = useDispatch();
  const { blogLists, isLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getAllBlogsAction());
  }, [dispatch]);

  if (isLoading) return <Loader />;

  return (
    <div>
      {blogLists.map((blog) => {
        return <BlogPost key={blog._id} blog={blog} />;
      })}
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
          <div className="flex sm:flex-row flex-col items-center gap-3 text-gray-600 my-1 text-sm">
            <p>{blog.author.username}</p>
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
