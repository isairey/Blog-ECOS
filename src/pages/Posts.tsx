import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // 🔥 PRIMERA PÁGINA
  const loadPosts = async () => {
    setLoading(true);

    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      limit(10)
    );

    const snap = await getDocs(q);

    const data: Post[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Post),
    }));

    setPosts(data);
    setLastDoc(snap.docs[snap.docs.length - 1] || null);
    setLoading(false);
  };

  // 🔥 SIGUIENTE PÁGINA
  const nextPage = async () => {
    if (!lastDoc) return;

    setLoading(true);

    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc"),
      startAfter(lastDoc),
      limit(10)
    );

    const snap = await getDocs(q);

    const data: Post[] = snap.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Post),
    }));

    setPosts(data);
    setLastDoc(snap.docs[snap.docs.length - 1] || null);
    setPage((p) => p + 1);
    setLoading(false);
  };

  // 🔙 RESET SIMPLE
  const prevPage = () => {
    if (page === 1) return;
    loadPosts();
    setPage(1);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <h1 className="text-5xl font-semibold mb-12">
          📅 Publicaciones recientes
        </h1>

        {/* CONTENT */}
        {loading ? (
          <p className="text-gray-500">Cargando publicaciones...</p>
        ) : (
          <>
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* PAGINACIÓN */}
            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 rounded-full bg-gray-200 disabled:opacity-50"
              >
                Anterior
              </button>

              <span className="px-4 py-2">
                Página {page}
              </span>

              <button
                onClick={nextPage}
                disabled={posts.length < 10}
                className="px-4 py-2 rounded-full bg-black text-white disabled:opacity-50"
              >
                Siguiente
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}