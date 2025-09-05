import { useState } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

const NoteEditor = () => {
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }], // Headings
      ["bold", "italic", "underline"], // Formatting
      [{ list: "ordered" }, { list: "bullet" }], // Lists
      ["link"], // Media
      ["clean"], // Clear formatting
    ],
  }

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
    "image",
  ]

  const handleSubmit = () => {
    console.log("Editor HTML:", content)
    alert(content)
  }

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <section>
        <Label htmlFor="title">Enter Title</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </section>
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write your note here..."
        theme="snow"
        className="bg-white"
      />
      <Button
        onClick={handleSubmit}
        className="bg-emerald-500 hover:bg-emerald-600"
      >
        Submit
      </Button>
    </div>
  )
}

export default NoteEditor
