import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Note {
  id: string;
  text: string;
  created_at: string;
  updated_at: string;
}

export default function AdminNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newText, setNewText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("admin_notes")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Kunde inte hämta anteckningar");
      return;
    }
    setNotes((data ?? []) as Note[]);
  };

  useEffect(() => {
    load();
  }, []);

  const handleSave = async () => {
    const text = newText.trim();
    if (!text) return;
    setLoading(true);
    const { error } = await supabase.from("admin_notes").insert({ text });
    setLoading(false);
    if (error) {
      toast.error("Kunde inte spara anteckning");
      return;
    }
    setNewText("");
    toast.success("Anteckning sparad");
    load();
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const handleUpdate = async (id: string) => {
    const text = editingText.trim();
    if (!text) return;
    const { error } = await supabase
      .from("admin_notes")
      .update({ text, updated_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast.error("Kunde inte uppdatera");
      return;
    }
    setEditingId(null);
    setEditingText("");
    toast.success("Anteckning uppdaterad");
    load();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("admin_notes").delete().eq("id", id);
    if (error) {
      toast.error("Kunde inte ta bort");
      return;
    }
    toast.success("Anteckning borttagen");
    load();
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Anteckningar</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            placeholder="Skriv en ny anteckning..."
            rows={3}
          />
          <Button onClick={handleSave} disabled={loading || !newText.trim()}>
            Spara anteckning
          </Button>
        </div>

        {notes.length === 0 ? (
          <p className="text-sm text-muted-foreground">Inga anteckningar ännu.</p>
        ) : (
          <ul className="space-y-2">
            {notes.map((note) => (
              <li
                key={note.id}
                className="rounded-md border border-border p-3 bg-card"
              >
                {editingId === note.id ? (
                  <div className="space-y-2">
                    <Textarea
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleUpdate(note.id)}>
                        Spara
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setEditingText("");
                        }}
                      >
                        Avbryt
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="whitespace-pre-wrap break-words text-sm">
                        {note.text}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(note.created_at).toLocaleString("sv-SE")}
                        {note.updated_at !== note.created_at && " (ändrad)"}
                      </p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => startEdit(note)}
                      >
                        Ändra
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(note.id)}
                      >
                        Ta bort
                      </Button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
