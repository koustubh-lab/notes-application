import NoteEditor from "@/components/note-editor"
import { Button } from "@/components/ui/button"
import { MoveLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function CreateNote() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen p-3 space-y-2">
      <div className="flex items-center gap-2">
        <Button size={"sm"} onClick={() => navigate(-1)} variant={"outline"}>
          <MoveLeft />
          Back
        </Button>
        <h1 className="text-2xl font-semibold">Create Note</h1>
      </div>
      <NoteEditor />
    </div>
  )
}
