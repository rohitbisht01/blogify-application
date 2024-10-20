import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const CommentSection = ({ comment, onDelete, onEdit }) => {
  const { user, isLoading } = useSelector((state) => state.user);

  const isCommentOwner = user && comment.user._id === user.id;

  if (isLoading) return <Loader />;

  return (
    <div className="mt-5">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="" alt="@shadcn" />
          <AvatarFallback>
            {comment.user.username.slice(0, 1).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col text-sm text-gray-500">
            <div>{comment.user.username}</div>
            <div>{new Date(comment.createdAt).toLocaleDateString()}</div>
          </div>

          {isCommentOwner && (
            <div className="flex items-center">
              <Button
                variant="outline"
                className="ml-4"
                size="sm"
                onClick={() => onEdit(comment._id, comment.comment)}
              >
                Edit
              </Button>
              <Button
                variant="outline"
                className="ml-4"
                size="sm"
                onClick={() => onDelete(comment._id)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 pl-14">{comment.comment}</div>
    </div>
  );
};

export default CommentSection;
