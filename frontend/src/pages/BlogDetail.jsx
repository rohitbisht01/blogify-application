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

const BlogDetail = () => {
  const { id } = useParams();
  const { blog, isLoading } = useSelector((state) => state.blog);
  const { comments, isLoading: commentIsLoading } = useSelector(
    (state) => state.comment
  );
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    dispatch(getBlogByIdAction(id));
    dispatch(getBlogCommentAction(id));
  }, [id, dispatch]);

  const handleAddComment = () => {
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

  if (isLoading || commentIsLoading || !blog) return <Loader />;

  return (
    <div className="my-10">
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
    </div>
  );
};

export default BlogDetail;
