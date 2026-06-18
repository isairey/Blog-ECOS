
/*
import { useState } from "react";
import type { Post } from "../types/Post";

interface Props {
  onCreate: (post: Post) => void;
}

export default function CreatePostModal({
  onCreate,
}: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = () => {
    if (!title || !content) return;

    onCreate({
      id: Date.now(),
      title,
      content,
      category: "General",
      likes: 0,
      alias:
        "Anónimo #" +
        Math.floor(Math.random() * 9999),
    });

    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Crear publicación
      </h2>

      <input
        placeholder="Título"
        className="w-full border p-3 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="¿Qué quieres compartir?"
        className="w-full border p-3 rounded mb-3"
        rows={5}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={createPost}
        className="bg-violet-600 text-white px-6 py-3 rounded-xl"
      >
        Publicar
      </button>
    </div>
  );
}

*/