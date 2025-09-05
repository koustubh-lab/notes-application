import {
  createNoteApi,
  deleteNoteApi,
  fetchNotesApi,
  updateNoteApi,
} from "@/api/NotesApiService"
import { useAuth } from "@/components/auth/auth-context"
import { NoteCard } from "@/components/notes/note-card"
import { NoteForm } from "@/components/notes/note-form"
import { UpdateNoteForm } from "@/components/notes/update-note-form"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Note } from "@/lib/types"
import { Plus, Search, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function NotesPage() {
  return (
    <main>
      <SiteHeader />
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <NotesContent />
        </div>
      </section>
    </main>
  )
}

function NotesContent() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState<Note | null>(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const { authLoading, isAuthenticated } = useAuth()

  // pagination state
  const [page, setPage] = useState(1)
  const pageSize = 6

  // fetch notes (simulate API)
  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        const response = await fetchNotesApi(page, pageSize)
        const { status, data } = response
        if (status === 200) {
          setNotes(data)
        }
      } catch (err) {
        console.error("Failed to load notes", err)
      } finally {
        setIsLoading(false)
      }
    }
    if (!authLoading) {
      fetchNotes()
    }
  }, [authLoading])

  const addNote = async (note: Omit<Note, "id" | "createdAt">) => {
    setIsLoading(true)
    try {
      const response = await createNoteApi(note)
      const { status, data } = response
      if (status === 201) {
        setNotes((prev) => {
          const newList = [...prev]
          newList.unshift(data)
          return newList
        })
      }
    } catch (err) {
      console.error("Failed to create note", err)
    } finally {
      setIsLoading(false)
    }
  }

  const updateNote = async (id: string, updated: Note) => {
    setIsLoading(true)
    try {
      const response = await updateNoteApi(id, updated)
      const { status, data } = response as { status: number; data: Note }
      if (status === 200) {
        setNotes((prev) =>
          prev.map((n) => (n.id === id ? { ...n, ...data } : n))
        )
      }
    } catch (err) {
      console.error("Failed to update note", err)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteNote = async (id: string) => {
    try {
      const response = await deleteNoteApi(id)
      const { status } = response
      if (status === 200) {
        setNotes((prev) => prev.filter((n) => n.id !== id))
      }
    } catch (err) {
      console.error("Failed to delete note", err)
    }
  }

  // filtering + sorting
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let data = [...notes]
    if (q) {
      data = data.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
      )
    }
    // sort by createdAt descending
    data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return data
  }, [notes, query])

  // pagination logic
  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  if (!isAuthenticated) {
    navigate("/login", { replace: true })
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Your Notes</h1>
          <p className="text-sm text-slate-600">
            Create, search, edit, and delete notes.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700 gap-2">
              <Plus size={16} />
              New note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create a note</DialogTitle>
            </DialogHeader>
            <NoteForm
              onSubmit={async (v) => {
                await addNote(v)
                setOpen(false)
              }}
              submitLabel="Create note"
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search bar */}
      <div className="mt-6 flex items-center gap-2">
        <div className="relative w-full sm:max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1) // reset page when searching
            }}
            placeholder="Search notes..."
            className="pl-9"
            aria-label="Search notes"
          />
          {query && (
            <button
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              onClick={() => setQuery("")}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Notes grid */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-48 rounded-md border animate-pulse bg-slate-50"
            />
          ))
        ) : paginated.length === 0 ? (
          <div className="col-span-full text-center text-slate-600">
            No notes found.
          </div>
        ) : (
          paginated.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(n) => setEditing(n)}
              onDelete={(n) => deleteNote(n.id)}
            />
          ))
        )}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Prev
          </Button>
          <span className="text-sm text-slate-600">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit note</DialogTitle>
          </DialogHeader>
          {editing && (
            <UpdateNoteForm
              initial={editing}
              onSubmit={async (v) => {
                await updateNote(editing.id, v)
                setEditing(null)
              }}
              submitLabel="Update note"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
