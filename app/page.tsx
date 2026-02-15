"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  useEffect(() => {
  let channel: any;

  const setup = async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    setUser(data.user);
    fetchBookmarks(data.user.id);

    channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        () => {
          fetchBookmarks(data.user.id);
        }
      )
      .subscribe();
  };

  setup();

  return () => {
    if (channel) {
      supabase.removeChannel(channel);
    }
  };
}, []);


  const fetchBookmarks = async (userId: string) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setBookmarks(data);
    }
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setBookmarks([]);
  };

  const addBookmark = async () => {
    if (!title || !url) return alert("Fill all fields");

    const { error } = await supabase.from("bookmarks").insert([
      {
        title,
        url,
        user_id: user.id,
      },
    ]);

    if (error) {
      alert("Error adding bookmark");
      console.log(error);
    } else {
      setTitle("");
      setUrl("");
      fetchBookmarks(user.id); // refresh list
    }
  };
  const deleteBookmark = async (id: string) => {
  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id);

  if (error) {
    alert("Error deleting bookmark");
    console.log(error);
  } else {
    fetchBookmarks(user.id);
  }
};


  return (
  <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
    
    <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-6">
      
      <h1 className="text-2xl font-bold text-white text-center mb-6">
        Smart Bookmark App 🚀
      </h1>

      {!user ? (
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
        >
          Login with Google
        </button>
      ) : (
        <>
          <p className="text-slate-300 text-center mb-4">
            Welcome, {user.user_metadata.full_name}
          </p>

          {/* Add Bookmark */}
          <div className="space-y-3 mb-6">
            <input
              type="text"
              placeholder="Bookmark title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="url"
              placeholder="Bookmark URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={addBookmark}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Add Bookmark
            </button>
          </div>

          {/* Bookmark List */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {bookmarks.length === 0 ? (
              <p className="text-slate-400 text-center">
                No bookmarks yet
              </p>
            ) : (
              bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded-lg"
                >
                  <a
                    href={bookmark.url}
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    {bookmark.title}
                  </a>

                  <button
                    onClick={() => deleteBookmark(bookmark.id)}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full mt-6 bg-slate-600 hover:bg-slate-700 text-white py-2 rounded-lg transition"
          >
            Logout
          </button>
        </>
      )}
      
    </div>

  </main>
)};


