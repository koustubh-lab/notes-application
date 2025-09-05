"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import ReactQuill from "react-quill"

type Props = {
  initial?: { title: string; content: string }
  onSubmit: (values: { title: string; content: string }) => Promise<void> | void
  submitLabel?: string
}

export function NoteForm({
  initial,
  onSubmit,
  submitLabel = "Save note",
}: Props) {
  const [title, setTitle] = useState(initial?.title ?? "")
  const [content, setContent] = useState(initial?.content ?? "")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTitle(initial?.title ?? "")
    setContent(initial?.content ?? "")
  }, [initial])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSubmit({ title, content })
      setTitle("")
      setContent("")
    } finally {
      setLoading(false)
    }
  }

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

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <Input
        placeholder="Note title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Note title"
      />
      <div>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          placeholder="Write your note here..."
          theme="snow"
          className="bg-white"
        />
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={loading}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
