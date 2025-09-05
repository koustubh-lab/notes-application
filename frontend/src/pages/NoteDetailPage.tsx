"use client"

import { fetchNoteByIdApi } from "@/api/NotesApiService"
import { Button } from "@/components/ui/button"
import type { Note } from "@/lib/types"
import { format } from "date-fns"
import DOMPurify from "dompurify"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function NoteDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    const fetchNote = async () => {
      setLoading(true)
      try {
        const response = await fetchNoteByIdApi(id)
        const { status, data } = response
        if (status === 200) setNote(data)
      } catch (err) {
        console.error("Failed to fetch note", err)
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (!note) return <p>Note not found.</p>

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-4">
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-2">Title: {note.title || "Untitled"}</h1>
      <div className="text-sm text-slate-500 mb-4">
        <span>
          Created: {format(new Date(note.createdAt), "M/d/yyyy h:mm a")}
        </span>
        <br />
        <span>
          Last Modified:{" "}
          {note.updatedAt
            ? format(new Date(note.updatedAt), "M/d/yyyy h:mm a")
            : "N/A"}
        </span>
      </div>
      <h1 className="text-xl font-bold">Content: </h1>
      <div className="p-2 bg-muted rounded-md">
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content) }}
        />
      </div>
    </div>
  )
}
