"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Note } from "@/lib/types"
import { format } from "date-fns"
import { Pencil, Trash2 } from "lucide-react"
import { Link } from "react-router-dom"

type Props = {
  note: Note
  onEdit: (note: Note) => void
  onDelete: (note: Note) => void
}

export function NoteCard({ note, onEdit, onDelete }: Props) {
  return (
    <Card className="border flex flex-col h-full">
      <CardHeader>
        <CardTitle className="text-lg">
          <Link to={`/notes/${note.id}`} className="hover:text-blue-500 hover:underline">
            {note.title || "Untitled"}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2 text-xs text-slate-500">
        <span>
          Last Modified:{" "}
          {note.updatedAt
            ? format(new Date(note.updatedAt), "M/d/yyyy h:mm a")
            : "N/A"}
        </span>
        <span>
          Created:{" "}
          {note.createdAt
            ? format(new Date(note.createdAt), "M/d/yyyy h:mm a")
            : "N/A"}
        </span>
        <div className="grid gap-2 grid-cols-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1 bg-transparent"
            onClick={() => onEdit(note)}
          >
            <Pencil size={14} />
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="text-background"
            onClick={() => onDelete(note)}
          >
            <Trash2 size={14} />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
