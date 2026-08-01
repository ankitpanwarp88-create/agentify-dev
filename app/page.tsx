"use client";

import { useState } from "react";

export default function Home() {
  // 🧭 Navigation state
  const [currentView, setCurrentView] = useState<"home" | "login" | "dashboard">("home");

  // 👤 User profile
  const [userProfile, setUserProfile] = useState({
    name: "Ankit Panwar",
    id: "ankit_dev",
    bio: "Full-stack & AI Developer building micro-tools.",
    isLoggedIn: false,
  });

  // 📊 Posts state
  const [posts, setPosts] = useState([
    { id: 1, title: "AI Chat Box Interface", author: "Ankit Panwar", category: "AI Chat", description: "A plug-and-play ChatGPT style UI block.", downloads: 1240 },
    { id: 2, title: "Streaming Text Effect", author: "Rahul Dev", category: "Typography", description: "Simulate real-time typing animation.", downloads: 850 },
    { id: 3, title: "Glassmorphism Pricing Card", author: "Priya Sharma", category: "UI Blocks", description: "Modern high-conversion pricing card.", downloads: 620 },
  ]);

  // 🔍 Search
  const [searchQuery, setSearchQuery] = useState("");

  // ➕ New Post
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("UI Blocks");
  const [newDesc, setNewDesc] = useState("");

  // ⚙️ Settings
  const [tempName, setTempName] = useState(userProfile.name);
  const [tempEmail, setTempEmail] = useState("");
  const [tempBio, setTempBio] = useState(userProfile.bio);

  // Filter posts
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const createdPost = {
      id: Date.now(),
      title: newTitle,
      author: userProfile.name,
      category: newCategory,
      description: newDesc || "No description provided.",
      downloads: 0,
    };

    setPosts([createdPost,...posts]);
    setNewTitle("");
    setNewDesc("");
    alert("🎉 Material published successfully!");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({...userProfile, name: tempName, bio: tempBio });
    alert("⚙️ Profile updated!");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
     ...userProfile,
      name: tempName,
      id: tempEmail.split('@')[0] || "user",
      isLoggedIn: true
    });
    setCurrentView("dashboard");
    alert("🎉 Welcome! You are signed in.");
  };

  const myPosts = posts.filter(p => p.author === userProfile.name);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">

      {/* 🧭 Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <button onClick={() => setCurrentView("home")} className="font-bold text-lg tracking-wider flex items-center space-x-2">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
          <span>Agentify<span className="text-indigo-400">.dev</span></span>
        </button>

        <div className="flex items-center space-x-4">
          {!userProfile.isLoggedIn? (
            <button onClick={() => setCurrentView("login")} className="text-sm text-slate-300 hover:text-white">
              Sign In
            </button>
          ) : (
            <button onClick={() => { setUserProfile({...userProfile, isLoggedIn: false}); setCurrentView("home"); }} className="text-sm text-red-400 hover:text-red-300">
              Sign Out
            </button>
          )}

          <button
            onClick={() => setCurrentView(userProfile.isLoggedIn? "dashboard" : "login")}
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            {userProfile.isLoggedIn? "Dashboard" : "Get Started"}
          </button>
        </div>
      </nav>

      {/* ================= HOME ================= */}
      {currentView === "home" && (
        <main>
          <section className="max-w-4xl mx-auto px-6 py-20 text-center">
            <div className="inline-block mb-4 px-3 py-1 bg-indigo-950 border-indigo-800 rounded-full text-indigo-300 text-xs font-semibold">
              🚀 The Global Developer Marketplace
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent">
              नमस्ते Next.js! 🚀
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
              Discover, Copy, and Deploy Components. यह मेरा Tailwind CSS के साथ पहला पेज है।
            </p>

            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="Search by component or creator..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900 border-slate-800 rounded-xl px-4 py-3.5 pl-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <svg className="w-5 h-5 text-slate-500 absolute left-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-6 pb-24">
            <h2 className="text-lg font-semibold text-slate-200 mb-6">📊 Live Community Feed</h2>
            <div className="space-y-4">
              {filteredPosts.map((item) => (
                <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-indigo-950 text-indigo-300 rounded">{item.category}</span>
                    <h3 className="text-md font-bold text-slate-100 mt-1">{item.title}</h3>
                    <p className="text-xs text-slate-400">By {item.author} • 📥 {item.downloads}</p>
                  </div>
                  <button
                    onClick={() => navigator.clipboard.writeText(`// ${item.title}`)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs"
                  >
                    Copy Code
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ================= LOGIN ================= */}
      {currentView === "login" && (
        <main className="flex justify-center items-center py-24 px-4">
          <div className="w-full max-w-md bg-slate-900 border-slate-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-center mb-6">🔐 Creator Sign In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <input type="text" required value={tempName} onChange={(e) => setTempName(e.target.value)} placeholder="Your Name" className="w-full bg-slate-950 border-slate-800 rounded-lg px-4 py-3 text-sm" />
              <input type="email" required value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm" />
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-lg">Access Dashboard</button>
            </form>
          </div>
        </main>
      )}

      {/* ================= DASHBOARD ================= */}
      {currentView === "dashboard" && (
        <main className="max-w-4xl mx-auto px-6 py-12">
          <h1 className="text-2xl font-bold mb-2">👤 Creator Dashboard</h1>
          <p className="text-sm text-slate-400 mb-8">Welcome back, {userProfile.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Settings */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-md font-semibold mb-4">⚙️ Profile Settings</h2>
              <form onSubmit={handleSaveSettings} className="space-y-3">
                <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm" />
                <textarea rows={2} value={tempBio} onChange={(e) => setTempBio(e.target.value)} className="w-full bg-slate-950 border-slate-800 rounded-lg px-3 py-2 text-sm" />
                <button type="submit" className="w-full bg-slate-800 hover:bg-slate-700 py-2 rounded-lg text-sm">Save</button>
              </form>
            </div>

            {/* Publish */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h2 className="text-md font-semibold mb-4">➕ Publish New</h2>
              <form onSubmit={handlePublish} className="space-y-3">
                <input type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Title" className="w-full bg-slate-950 border-slate-800 rounded-lg px-3 py-2 text-sm" />
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm">
                  <option>UI Blocks</option><option>AI Chat</option><option>Typography</option>
                </select>
                <input type="text" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description" className="w-full bg-slate-950 border-slate-800 rounded-lg px-3 py-2 text-sm" />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm">Publish</button>
              </form>
            </div>
          </div>

          {/* My Items */}
          <div className="mt-6 bg-slate-900/60 border border-slate-800 rounded-xl p-6">
            <h2 className="text-md font-semibold mb-4">📦 My Published Items ({myPosts.length})</h2>
            {myPosts.length === 0? <p className="text-sm text-slate-500">No posts yet</p> :
              myPosts.map(p => <div key={p.id} className="bg-slate-950 p-3 rounded-lg mb-2 text-sm">{p.title}</div>)
            }
          </div>
        </main>
      )}
    </div>
  );
}
