import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("123456");
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });
      setToken(res.data.token);
      setPage("token");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGetPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(res.data);
      setPage("posts");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setToken("");
    setEmail("test@test.com");
    setPassword("123456");
    setPosts([]);
    setError("");
    setPage("login");
  };

  return (
    <div className="app">
      {/* Login Page */}
      {page === "login" && (
        <div className="page">
          <h1>API Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="hint-text">Demo: test@test.com / 123456</p>
        </div>
      )}

      {/* Token Page */}
      {page === "token" && (
        <div className="page">
          <h1>Login Successful</h1>
          <div className="token-box">
            <p>Your JWT Token:</p>
            <textarea readOnly value={token}></textarea>
            <button
              onClick={() => {
                navigator.clipboard.writeText(token);
                alert("Copied!");
              }}
            >
              Copy Token
            </button>
          </div>
          <button onClick={handleGetPosts} disabled={loading}>
            {loading ? "Loading..." : "View Posts"}
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      )}

      {/* Posts Page */}
      {page === "posts" && (
        <div className="page">
          <div className="posts-header">
            <h1>Posts</h1>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
          {error && <div className="error">{error}</div>}
          {posts.length === 0 ? (
            <p className="no-data">No posts found</p>
          ) : (
            <div className="posts-list">
              {posts.map((p) => (
                <div key={p._id} className="post-item">
                  <h3>{p.title}</h3>
                  <p>{p.content}</p>
                  <small>By: {p.user?.name}</small>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;