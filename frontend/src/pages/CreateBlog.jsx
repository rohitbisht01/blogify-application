import Editor from "@/components/Editor";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBlogAction } from "@/store/blog-slice";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.blog);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState("");

  const handleCreateBlog = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("cover", cover[0]);
    formData.append("content", content);

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
  };

  // if (isLoading) return <Loader />;

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
          <Input
            type="file"
            onChange={(e) => {
              setCover(e.target.files);
            }}
            disabled={isLoading}
            placeholder="Enter your blog's title"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label>Blog Content</Label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="flex flex-row-reverse mb-4" onClick={handleCreateBlog}>
          <Button disabled={isLoading}>Post Blog</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
