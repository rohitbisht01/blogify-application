import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBlogAction, updateBlogAction } from "@/store/blog-slice";
import { DeleteIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlog = ({ blog }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.blog);

  const [title, setTitle] = useState(blog?.title || "");
  const [summary, setSummary] = useState(blog?.summary || "");
  const [cover, setCover] = useState(blog?.cover || null);
  const [content, setContent] = useState(blog?.content || "");
  const [imageUrl, setImageUrl] = useState(null);

  const handleCreateBlog = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);

    if (cover instanceof FileList) {
      formData.append("cover", cover[0]); // For new images
    } else if (typeof cover === "string") {
      formData.append("cover", cover); // For existing cover URL
    }
    formData.append("content", content);

    if (blog) {
      // update the blog
      dispatch(updateBlogAction({ blogId: blog._id, blogBody: formData }))
        .then((result) => {
          if (result.payload.success) {
            setTitle("");
            setSummary("");
            setCover("");
            setContent("");

            toast.success("Blog Updated");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log("Error updating blog", error);
          toast.error("Error updating blog");
        });
    } else {
      // create the blog
      dispatch(createBlogAction(formData)).then((result) => {
        if (result.payload.success) {
          setTitle("");
          setSummary("");
          setCover("");
          setContent("");

          toast.success("Blog Posted");
          navigate("/");
        }
      });
    }
  };

  const handleDeleteCover = () => {
    setCover(null);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label>Blog Title</Label>
          <Input
            type="type"
            value={title}
            disabled={isLoading}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog's title"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label>Blog Summary</Label>
          <Textarea
            value={summary}
            disabled={isLoading}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="A short summary"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label>Blog Cover</Label>

          {cover ? (
            <div className="mb-2 relative group">
              <img
                src={imageUrl || cover}
                alt="cover"
                className="h-40 w-40 object-cover"
              />
              <DeleteIcon
                className="absolute top-16 left-14 text-black-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                onClick={handleDeleteCover}
              />
            </div>
          ) : (
            <Input
              type="file"
              onChange={(e) => {
                setCover(e.target.files);
                setImageUrl(URL.createObjectURL(e.target.files[0]));
              }}
              disabled={isLoading}
              placeholder="Enter your blog's title"
              required
            />
          )}
        </div>

        <div className="grid gap-2">
          <Label>Blog Content</Label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="flex flex-row-reverse mb-4" onClick={handleCreateBlog}>
          <Button disabled={isLoading}>
            {blog ? "Update Blog" : "Post Blog"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
