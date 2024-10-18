import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState("");

  const handleCreateBlog = () => {
    setTitle("");
    setSummary("");
    setCover("");
    setContent("");

    navigate("/");
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <Label>Blog Title</Label>
          <Input
            type="type"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog's title"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label>Blog Summary</Label>
          <Textarea
            value={summary}
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
            placeholder="Enter your blog's title"
            required
          />
        </div>

        <div className="grid gap-2">
          <Label>Blog Content</Label>
          <Editor content={content} setContent={setContent} />
        </div>

        <div className="flex flex-row-reverse mb-4" onClick={handleCreateBlog}>
          <Button>Post Blog</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
