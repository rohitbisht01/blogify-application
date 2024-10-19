import Loader from "@/components/Loader";
import { getBlogByIdAction } from "@/store/blog-slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();

  const { blog, isLoading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogByIdAction(id));
  }, [id, dispatch]);

  if (isLoading || !blog) return <Loader />;

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h1 className="text-2xl font-bold">{blog.title}</h1>
        <div className="mt-2 flex flex-col sm:flex-col md:flex-row items-center justify-center gap-2 text-sm text-gray-500">
          <p>{blog.author.username}</p>
          <p>{new Date(blog.author.createdAt).toLocaleDateString()}</p>
        </div>
        <p className="">{blog.summary}</p>
        <img src={blog.cover} alt={blog.title} loading="lazy" />
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </div>
  );
};

export default BlogDetail;
