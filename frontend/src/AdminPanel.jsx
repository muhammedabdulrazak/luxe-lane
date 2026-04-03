import { useState, useEffect, useCallback } from "react";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";
const ADMIN_USER = process.env.REACT_APP_ADMIN_USER || "admin";
const ADMIN_PASS = process.env.REACT_APP_ADMIN_PASS || "luxelane2025";

const gold = "#c8a84b";
const goldGrad = "linear-gradient(135deg,#c8a84b 0%,#f5e07a 40%,#c8a84b 70%,#a67c2a 100%)";

const authHeader = () => ({
  Authorization: "Basic " + btoa(`${ADMIN_USER}:${ADMIN_PASS}`),
  "Content-Type": "application/json",
});

const EMPTY_FORM = {
  name: "", category: "women", description: "",
  order: 0, is_active: true,
};

// ── small reusable components ─────────────────────────────────────
const Badge = ({ text }) => (
  <span style={{
    background: "rgba(200,168,75,0.12)", border: `1px solid rgba(200,168,75,0.3)`,
    borderRadius: 20, padding: "2px 10px", fontSize: 10,
    color: gold, letterSpacing: 1, textTransform: "uppercase",
    fontFamily: "sans-serif",
  }}>{text}</span>
);

const Tag = ({ active }) => (
  <span style={{
    background: active ? "rgba(37,211,102,0.12)" : "rgba(255,80,80,0.1)",
    border: `1px solid ${active ? "rgba(37,211,102,0.3)" : "rgba(255,80,80,0.3)"}`,
    borderRadius: 20, padding: "2px 10px", fontSize: 10,
    color: active ? "#25d366" : "#ff6b6b",
    fontFamily: "sans-serif", letterSpacing: 0.5,
  }}>{active ? "Active" : "Hidden"}</span>
);

// ── Main Admin Panel ──────────────────────────────────────────────
export default function AdminPanel() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [filterCat, setFilterCat] = useState("");
  const [toast, setToast] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ u: "", p: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Login ────────────────────────────────────────────────────
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.u === ADMIN_USER && loginForm.p === ADMIN_PASS) {
      setLoggedIn(true);
    } else {
      notify("Invalid credentials", "error");
    }
  };

  // ── Fetch ────────────────────────────────────────────────────
  const fetchCollections = useCallback(async () => {
    setLoading(true);
    try {
      const url = filterCat
        ? `${API_URL}/admin/collections?category=${filterCat}`
        : `${API_URL}/admin/collections`;
      const res = await fetch(url, { headers: authHeader() });
      const data = await res.json();
      setCollections(Array.isArray(data) ? data : []);
    } catch { notify("Failed to load collections", "error"); }
    setLoading(false);
  }, [filterCat]);

  useEffect(() => {
    if (!loggedIn) return;
    fetchCollections();
  }, [loggedIn, fetchCollections]);

  // ── Collection CRUD ──────────────────────────────────────────
  const openCreate = () => { setEditItem(null); setForm(EMPTY_FORM); setSelectedFile(null); setShowForm(true); };
  const openEdit = (item) => { setEditItem(item); setForm({ ...item }); setSelectedFile(null); setShowForm(true); };

  const handleSave = async () => {
    try {
      // Validation
      if (!form.name || !form.description) {
        notify("Please fill in all required fields", "error");
        return;
      }
      
      if (!editItem && !selectedFile) {
        notify("Please select an image file", "error");
        return;
      }

      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('description', form.description);
      formData.append('order', String(form.order));
      formData.append('is_active', String(form.is_active));
      if (selectedFile) {
        formData.append('image', selectedFile);
      }

      const method = editItem ? "PATCH" : "POST";
      const url = editItem
        ? `${API_URL}/admin/collections/${editItem.id}`
        : `${API_URL}/admin/collections`;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: authHeader().Authorization,
        },
        body: formData,
      });
      
      const responseData = await res.text();
      
      if (!res.ok) {
        console.error(`Error ${res.status}:`, responseData);
        notify(`Save failed: ${res.statusText}`, "error");
        return;
      }
      
      notify(editItem ? "Collection updated!" : "Collection added!");
      setShowForm(false);
      setSelectedFile(null);
      fetchCollections();
    } catch (err) { 
      console.error("Save error:", err);
      notify("Save failed: " + err.message, "error"); 
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this collection?")) return;
    try {
      await fetch(`${API_URL}/admin/collections/${id}`, {
        method: "DELETE", headers: authHeader(),
      });
      notify("Deleted!");
      fetchCollections();
    } catch { notify("Delete failed", "error"); }
  };

  const toggleActive = async (item) => {
    try {
      await fetch(`${API_URL}/admin/collections/${item.id}`, {
        method: "PATCH",
        headers: authHeader(),
        body: JSON.stringify({ is_active: !item.is_active }),
      });
      fetchCollections();
    } catch { notify("Toggle failed", "error"); }
  };

  // ── Styles ───────────────────────────────────────────────────
  const S = {
    page: {
      minHeight: "100vh", background: "#080808", color: "#fff",
      fontFamily: "'Segoe UI', sans-serif",
    },
    topbar: {
      background: "rgba(8,8,8,0.95)", borderBottom: "1px solid rgba(200,168,75,0.15)",
      padding: "14px 28px", display: "flex", alignItems: "center",
      justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100,
    },
    logo: {
      fontFamily: "Georgia, serif", fontSize: 20,
      background: goldGrad, WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent", backgroundClip: "text",
      fontWeight: 700,
    },
    tab: (active) => ({
      padding: "8px 20px", borderRadius: 20, border: "none", cursor: "pointer",
      fontFamily: "sans-serif", fontSize: 12, letterSpacing: 1,
      textTransform: "uppercase", transition: "all 0.3s",
      background: active ? goldGrad : "transparent",
      color: active ? "#000" : "#666",
    }),
    card: {
      background: "linear-gradient(145deg,#0e0c00,#0a0a0a)",
      border: "1px solid #2a2200", borderRadius: 16,
      padding: 20, marginBottom: 14,
    },
    input: {
      width: "100%", background: "#0d0c00", border: "1px solid #2a2200",
      borderRadius: 8, padding: "10px 14px", color: "#fff",
      fontSize: 14, outline: "none", boxSizing: "border-box",
      fontFamily: "sans-serif",
    },
    label: { fontSize: 11, color: "#888", letterSpacing: 1, textTransform: "uppercase", marginBottom: 6, display: "block" },
    btn: (variant = "gold") => ({
      padding: "9px 20px", borderRadius: 20, border: "none", cursor: "pointer",
      fontFamily: "sans-serif", fontSize: 11, fontWeight: 700,
      letterSpacing: 1, textTransform: "uppercase",
      background: variant === "gold" ? goldGrad
        : variant === "red" ? "rgba(255,80,80,0.15)"
        : variant === "green" ? "rgba(37,211,102,0.15)"
        : "rgba(200,168,75,0.1)",
      color: variant === "gold" ? "#000"
        : variant === "red" ? "#ff6b6b"
        : variant === "green" ? "#25d366"
        : gold,
      border: variant !== "gold" ? `1px solid ${
        variant === "red" ? "rgba(255,80,80,0.3)"
        : variant === "green" ? "rgba(37,211,102,0.3)"
        : "rgba(200,168,75,0.2)"
      }` : "none",
    }),
    statCard: {
      background: "linear-gradient(145deg,#0e0c00,#0a0a0a)",
      border: "1px solid #2a2200", borderRadius: 16,
      padding: "24px 20px", textAlign: "center",
    },
  };

  // ── Login screen ─────────────────────────────────────────────
  if (!loggedIn) return (
    <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...S.card, width: 340, padding: 36 }}>
        <h2 style={{ ...S.logo, marginBottom: 28, textAlign: "center", display: "block" }}>
          Luxe Lane Admin
        </h2>
        <label style={S.label}>Username</label>
        <input style={{ ...S.input, marginBottom: 16 }} type="text"
          value={loginForm.u} onChange={e => setLoginForm({ ...loginForm, u: e.target.value })} />
        <label style={S.label}>Password</label>
        <input style={{ ...S.input, marginBottom: 24 }} type="password"
          value={loginForm.p} onChange={e => setLoginForm({ ...loginForm, p: e.target.value })}
          onKeyDown={e => e.key === "Enter" && handleLogin(e)} />
        <button style={{ ...S.btn("gold"), width: "100%", padding: "12px" }} onClick={handleLogin}>
          Login
        </button>
        {toast && <p style={{ color: "#ff6b6b", fontSize: 13, marginTop: 14, textAlign: "center" }}>{toast.msg}</p>}
      </div>
    </div>
  );

  return (
    <div style={S.page}>

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: toast.type === "error" ? "#2a0000" : "#002a10",
          border: `1px solid ${toast.type === "error" ? "#ff6b6b" : "#25d366"}`,
          color: toast.type === "error" ? "#ff6b6b" : "#25d366",
          padding: "12px 20px", borderRadius: 10, fontSize: 13,
          fontFamily: "sans-serif",
        }}>{toast.msg}</div>
      )}

      {/* Topbar */}
      <div style={S.topbar}>
        <span style={S.logo}>✦ Luxe Lane Admin</span>
        <button style={S.btn("outline")} onClick={() => setLoggedIn(false)}>Logout</button>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* ── COLLECTIONS ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 22, margin: 0, color: gold }}>Collections</h1>
            <p style={{ color: "#555", fontSize: 13, margin: "4px 0 0", fontFamily: "sans-serif" }}>
              Add, edit, reorder and toggle collections shown on the website
            </p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
                {/* Category filter */}
                <select
                  value={filterCat}
                  onChange={e => setFilterCat(e.target.value)}
                  style={{ ...S.input, width: 130 }}
                >
                  <option value="">All</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                </select>
                <button style={S.btn("gold")} onClick={openCreate}>+ Add Collection</button>
              </div>
            </div>

            {loading ? (
              <p style={{ color: "#555", textAlign: "center", padding: 40 }}>Loading…</p>
            ) : collections.length === 0 ? (
              <div style={{ ...S.card, textAlign: "center", padding: 48 }}>
                <p style={{ color: "#444", fontSize: 15 }}>No collections yet. Click <strong style={{ color: gold }}>+ Add Collection</strong> to start.</p>
              </div>
            ) : (
              collections.map((item) => (
                <div key={item.id} style={{
                  ...S.card,
                  display: "flex", alignItems: "center", gap: 16,
                  opacity: item.is_active ? 1 : 0.5,
                }}>
                  {/* Image preview */}
                  <img src={`${API_URL.replace('/api', '')}${item.image_url}`} alt={item.name}
                    style={{ width: 72, height: 72, borderRadius: 10, objectFit: "cover", background: "#111", flexShrink: 0 }}
                    onError={e => { e.target.style.display = "none"; }}
                  />
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{item.name}</span>
                      <Badge text={item.category} />
                      <Tag active={item.is_active} />
                      <span style={{ fontSize: 11, color: "#444", marginLeft: 4 }}>Order: {item.order}</span>
                    </div>
                    <p style={{ color: "#666", fontSize: 12, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {item.description}
                    </p>
                  </div>
                  {/* Actions */}
                  <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                    <button style={S.btn(item.is_active ? "outline" : "green")} onClick={() => toggleActive(item)}>
                      {item.is_active ? "Hide" : "Show"}
                    </button>
                    <button style={S.btn("outline")} onClick={() => openEdit(item)}>Edit</button>
                    <button style={S.btn("red")} onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          
        

      </div>

      {/* ── ADD / EDIT FORM MODAL ── */}
      {showForm && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 500,
          background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 24,
        }}>
          <div style={{
            background: "#0a0a0a", border: "1px solid rgba(200,168,75,0.3)",
            borderRadius: 20, padding: 32, width: "100%", maxWidth: 520,
            maxHeight: "90vh", overflowY: "auto",
          }}>
            <h2 style={{ color: gold, margin: "0 0 24px", fontSize: 18 }}>
              {editItem ? "Edit Collection" : "Add Collection"}
            </h2>

            {/* Name */}
            <label style={S.label}>Product Name *</label>
            <input style={{ ...S.input, marginBottom: 16 }}
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Cotton Set" />

            {/* Category */}
            <label style={S.label}>Category *</label>
            <select style={{ ...S.input, marginBottom: 16 }}
              value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="women">👗 Women</option>
              <option value="kids">🧒 Kids</option>
            </select>

            {/* Description */}
            <label style={S.label}>Description *</label>
            <textarea style={{ ...S.input, marginBottom: 16, resize: "vertical", minHeight: 80 }}
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="Short description of this collection..." />

            {/* Image Upload */}
            <label style={S.label}>Product Image *</label>
            <input type="file" accept="image/*" style={{ ...S.input, marginBottom: 8 }}
              onChange={e => setSelectedFile(e.target.files[0])} />
            {selectedFile && (
              <img src={URL.createObjectURL(selectedFile)} alt="preview"
                style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8, marginBottom: 16, background: "#111" }} />
            )}

            {/* Order */}
            <label style={S.label}>Display Order</label>
            <input style={{ ...S.input, marginBottom: 16 }} type="number" min="0"
              value={form.order} onChange={e => setForm({ ...form, order: Number(e.target.value) })} />

            {/* Active toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <input type="checkbox" id="active" checked={form.is_active}
                onChange={e => setForm({ ...form, is_active: e.target.checked })}
                style={{ width: 16, height: 16, accentColor: gold }} />
              <label htmlFor="active" style={{ ...S.label, margin: 0, cursor: "pointer" }}>
                Show on website
              </label>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{ ...S.btn("gold"), flex: 1, padding: "12px" }} onClick={handleSave}>
                {editItem ? "Save Changes" : "Add Collection"}
              </button>
              <button style={{ ...S.btn("outline"), flex: 1, padding: "12px" }} onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
