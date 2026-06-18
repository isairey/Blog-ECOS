import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  console.log("🚀 Iniciando publicación");

  if (!title.trim() || !content.trim()) {
    alert("Completa todos los campos.");
    return;
  }

  try {
    setLoading(true);

    console.log("📦 DB:", db);

    const postData = {
      title,
      content,
      category,
      likes: 0,
      alias:
        "Anónimo #" +
        Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
    };

    console.log("📝 Datos a guardar:", postData);

    const docRef = await addDoc(
      collection(db, "posts"),
      postData
    );

    console.log(
      "✅ Documento guardado:",
      docRef.id
    );

    alert("Publicación creada");

    setTitle("");
    setContent("");

    navigate("/");
  } catch (error: any) {
    console.error("❌ ERROR FIREBASE:", error);

    alert(
      `Error: ${
        error?.message || "Error desconocido"
      }`
    );
  } finally {
    console.log("🏁 Finalizando proceso");
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-semibold text-[#1d1d1f]">
            Crear publicación
          </h1>

          <p className="text-[#6e6e73] mt-4">
            Comparte tus ideas de forma anónima.
          </p>
        </div>

        <div className="bg-white rounded-[32px] border border-gray-200 p-8 mt-10">
          <input
            type="text"
            placeholder="Título de la publicación"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              text-3xl
              font-medium
              border-none
              outline-none
              bg-transparent
            "
          />

          <div className="h-px bg-gray-200 my-6"></div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="
              w-full
              p-3
              rounded-xl
              border
              border-gray-200
              mb-6
            "
          >
            <option>General</option>
            <option>Amor</option>
            <option>Historias</option>
            <option>Humor</option>
            <option>Escuela</option>
            <option>Trabajo</option>
            <option>Opiniones</option>
            <option>Confesiones</option>
          </select>

          <textarea
            placeholder="¿Qué quieres compartir hoy?"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="
              w-full
              min-h-[300px]
              resize-none
              border-none
              outline-none
              text-lg
              bg-transparent
            "
          />

          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="
                bg-black
                text-white
                px-8
                py-4
                rounded-full
                hover:opacity-90
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Publicando..."
                : "Publicar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}