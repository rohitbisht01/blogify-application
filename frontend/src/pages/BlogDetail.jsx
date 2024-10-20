import CommentSection from "@/components/CommentSection";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getBlogByIdAction } from "@/store/blog-slice";
import {
  createCommentAction,
  deleteCommentAction,
  getBlogCommentAction,
  updateCommentAction,
} from "@/store/comment-slice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CreateBlog from "./CreateBlog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { countWords } from "@/lib/helper";

const BlogDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { blog, isLoading } = useSelector((state) => state.blog);
  const { comments, isLoading: commentIsLoading } = useSelector(
    (state) => state.comment
  );
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editBlogId, setEditBlogId] = useState(null);

  useEffect(() => {
    dispatch(getBlogByIdAction(id));
    dispatch(getBlogCommentAction(id));
  }, [id, dispatch]);

  const isBlogOwner = user && user.id === blog?.author?._id;

  const handleAddComment = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to continue.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    if (isEditEnabled) {
      // Handle comment update
      dispatch(
        updateCommentAction({ commentId: editCommentId, body: { comment } })
      )
        .then((response) => {
          if (response.payload.success) {
            toast.success("Comment updated successfully");
            setComment("");
            setIsEditEnabled(false);
            setEditCommentId(null);
            dispatch(getBlogCommentAction(id));
          }
        })
        .catch((error) => {
          toast.error("Error updating comment");
        });
    } else {
      // Handle new comment creation
      dispatch(createCommentAction({ blogId: id, body: { comment } }))
        .then((response) => {
          if (response.payload.success) {
            toast.success("Successfully created comment");
            setComment(""); // Clear input after comment is added
            dispatch(getBlogCommentAction(id));
          }
        })
        .catch((error) => {
          toast.error("Error creating comment");
        });
    }
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentAction(commentId))
      .then((response) => {
        if (response.payload.success) {
          toast.success("Comment deleted");
          dispatch(getBlogCommentAction(id));
        }
      })
      .catch((error) => {
        toast.error("Error deleting comment");
      });
  };

  const handleEditComment = (commentId, userComment) => {
    setIsEditEnabled(true);
    setEditCommentId(commentId);
    setComment(userComment);
  };

  const handleEditBlog = (blog) => {
    setEditBlogId(blog._id);
  };

  if (isLoading || commentIsLoading || !blog) return <Loader />;

  return (
    <div className="my-10">
      {editBlogId ? (
        <CreateBlog blog={blog} />
      ) : (
        <>
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="flex gap-5">
              <h1 className="text-2xl font-bold">{blog.title}</h1>
              {isBlogOwner && (
                <Button
                  variant="outline"
                  className=""
                  onClick={() => handleEditBlog(blog)}
                >
                  Edit Blog
                </Button>
              )}
            </div>

            <div className="-mt-2 flex flex-col sm:flex-col md:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt="@shadcn" />
                <AvatarFallback>
                  {blog.author.username.slice(0, 1).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <p className="font-semibold text-gray-700">
                  Written by {blog.author.username}
                </p>
                <div className="flex flex-row gap-2">
                  <p className="border border-gray-300 p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="border border-gray-300 p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition duration-200">
                    {countWords(blog.content)} words
                  </p>
                </div>
              </div>
            </div>

            <p className="">{blog.summary}</p>
            <img src={blog.cover} alt={blog.title} loading="lazy" />
            <div
              className="container"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
          <div className="mt-10">
            <h1 className="font-semibold text-xl text-gray-600">Comments</h1>
            <div className="flex items-center justify-between gap-2 my-2">
              <Input
                id="text"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
              <Button onClick={handleAddComment}>
                {isEditEnabled ? "Update" : "Send"}{" "}
              </Button>
            </div>
          </div>
          <div>
            {comments &&
              comments.length !== 0 &&
              comments.map((comment) => {
                return (
                  <CommentSection
                    key={comment._id}
                    comment={comment}
                    onDelete={handleDeleteComment}
                    onEdit={handleEditComment}
                  />
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
