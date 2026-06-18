import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import PostCard from "../components/PostCard";
import type { Post } from "../types/Post";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const q = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];

      setPosts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const likePost = () => {
    // luego conectamos los likes a Firebase
  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Cargando publicaciones...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-semibold mb-12">
          Publicaciones
        </h1>

        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={String(post.id)}
              post={post}
              onLike={likePost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}