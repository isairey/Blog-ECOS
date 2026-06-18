import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

export default function CategoryPage() {
  const { category } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    const q = query(
      collection(db, "posts"),
      where("category", "==", category)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(data);
      setLoading(false);
    });

    return () => unsub();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7]">
        <p className="text-gray-500 animate-pulse">
          Cargando categoría...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 py-16">

        {/* HEADER */}
        <div className="mb-10">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Volver
          </Link>

          <h1 className="text-5xl font-semibold mt-4">
            📂 {category}
          </h1>

          <p className="text-gray-500 mt-2">
            Publicaciones de esta categoría
          </p>
        </div>

        {/* POSTS */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <p className="text-gray-500">
              No hay publicaciones en esta categoría.
            </p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>

      </div>
    </div>
  );
}