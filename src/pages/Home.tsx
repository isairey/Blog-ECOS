import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,

} from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

const categories = [
  "Amor",
  "Historias",
  "Humor",
  "Escuela",
  "Trabajo",
  "Opiniones",
  "Confesiones",
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data: Post[] = snap.docs.map((doc) => {
  const d = doc.data();

        return {
          id: doc.id,
          title: d.title,
          content: d.content,
          category: d.category,
          likes: d.likes,
          alias: d.alias,
          createdAt: d.createdAt,
        };
      });

      setPosts(data);
    });

    return () => unsub();
  }, []);

  const filteredPosts =
    selectedCategory.length > 0
      ? posts.filter((p) => p.category === selectedCategory)
      : posts;

  const topPosts = posts
    .slice()
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f]">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-gray-500">
          Comunidad anónima
        </span>

        <h1 className="text-5xl md:text-7xl font-semibold mt-6 leading-tight">
          Expresa lo que piensas,
          <br />
          sin ser juzgado.
        </h1>

        <p className="text-gray-500 mt-6 max-w-2xl mx-auto text-lg">
          ECOS es un espacio donde puedes compartir ideas,
          pensamientos y confesiones de forma totalmente anónima.
        </p>

        <Link
          to="/crear"
          className="inline-flex mt-10 px-8 py-4 rounded-full bg-black text-white text-sm font-medium hover:scale-105 transition"
        >
          ✍️ Escribir publicación
        </Link>
      </section>

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white rounded-3xl p-8 border">
            <p className="text-gray-500 text-sm">Publicaciones</p>
            <h2 className="text-4xl font-semibold mt-2">
              {posts.length}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 border">
            <p className="text-gray-500 text-sm">Reacciones</p>
            <h2 className="text-4xl font-semibold mt-2">
              {posts.reduce((t, p) => t + (p.likes || 0), 0)}
            </h2>
          </div>

          <div className="bg-white rounded-3xl p-8 border">
            <p className="text-gray-500 text-sm">Anonimato</p>
            <h2 className="text-4xl font-semibold mt-2">100%</h2>
          </div>

        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* FEED */}
          <div className="lg:col-span-2">

            <div className="mb-8">
              <h2 className="text-3xl font-semibold">
                {selectedCategory || "Recientes"}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {filteredPosts.length} publicaciones
              </p>
            </div>

            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={() => {}}
                />
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">

            {/* POPULAR */}
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">
                🔥 Tendencia
              </h3>

              <div className="space-y-4">
                {topPosts.map((post) => (
                  <div key={post.id} className="pb-3 border-b last:border-none">
                    <p className="font-medium text-sm line-clamp-1">
                      {post.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      ❤️ {post.likes}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="bg-white rounded-3xl p-6 border">
              <h3 className="text-lg font-semibold mb-4">
                🏷️ Categorías
              </h3>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`px-3 py-1 text-sm rounded-full transition ${
                    selectedCategory === ""
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Todas
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-sm rounded-full transition ${
                      selectedCategory === cat
                        ? "bg-black text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* QUOTE */}
            <div className="bg-black text-white rounded-3xl p-6">
              <p className="text-sm opacity-80">
                “A veces lo que no dices pesa más que lo que publicas.”
              </p>
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
}