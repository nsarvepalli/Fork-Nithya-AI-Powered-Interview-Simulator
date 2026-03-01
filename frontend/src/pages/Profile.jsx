import { useState, useEffect } from "react";
import { getProfile, updateUsername, updatePassword, deleteAccount } from "../api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(null);

  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const showMsg = (type, text) => {
    setMsg({ type, text });
    setTimeout(() => setMsg({ type: "", text: "" }), 4000);
  };

  const handleUpdateUsername = async () => {
    if (!newUsername.trim()) return showMsg("error", "Username cannot be empty");
    setSaving(true);
    try {
      const res = await updateUsername(newUsername);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      setProfile((prev) => ({ ...prev, username: res.data.username }));
      setNewUsername("");
      setActiveSection(null);
      showMsg("success", "Username updated successfully!");
    } catch (err) {
      showMsg("error", err.response?.data?.detail || "Failed to update username");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword || !newPassword || !confirmNewPassword) return showMsg("error", "Please fill in all fields");
    if (newPassword.length < 6) return showMsg("error", "New password must be at least 6 characters");
    if (newPassword !== confirmNewPassword) return showMsg("error", "New passwords do not match");
    setSaving(true);
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword(""); setNewPassword(""); setConfirmNewPassword("");
      setActiveSection(null);
      showMsg("success", "Password updated successfully!");
    } catch (err) {
      showMsg("error", err.response?.data?.detail || "Failed to update password");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    setSaving(true);
    try {
      await deleteAccount();
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.href = "/login";
    } catch (err) {
      showMsg("error", err.response?.data?.detail || "Failed to delete account");
      setSaving(false);
    }
  };

  const inputClass = "w-full bg-white text-slate-900 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 placeholder-slate-300 transition-all text-sm font-medium";

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-4 shrink-0">
        <h1 className="text-base font-semibold text-slate-900">👤 My Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage your account settings and preferences</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 flex justify-center">
        <div className="w-full max-w-2xl space-y-4 animate-slide-up">

          {/* Feedback Message */}
          {msg.text && (
            <div className={`px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fade-in ${
              msg.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                : "bg-red-50 border border-red-200 text-red-600"
            }`}>
              <span>{msg.type === "success" ? "✅" : "⚠️"}</span>
              {msg.text}
            </div>
          )}

          {/* Account Info */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5 border-b border-slate-100 pb-3">Account Overview</h2>
            {loading ? (
              <div className="flex items-center gap-1.5 pb-4">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Username</span>
                    <span className="text-base font-bold text-slate-900">{profile?.username}</span>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {profile?.username ? profile.username[0].toUpperCase() : "U"}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">User ID</span>
                  <span className="text-base font-bold text-slate-700 font-mono">#{profile?.user_id}</span>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 md:col-span-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">Member Since</span>
                  <span className="text-sm font-semibold text-slate-800">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
                      : "—"}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Change Username */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveSection(activeSection === "username" ? null : "username")}
              className="w-full flex justify-between items-center px-6 py-5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base border border-indigo-100">✏️</div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 text-left">Change Username</div>
                  <div className="text-xs text-slate-400 mt-0.5">Update your public display name</div>
                </div>
              </div>
              <span className="text-slate-400 font-black text-lg">{activeSection === "username" ? "−" : "+"}</span>
            </button>
            {activeSection === "username" && (
              <div className="px-6 pb-6 pt-2 animate-fade-in border-t border-slate-100">
                <div className="space-y-3 mt-2">
                  <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="Enter new username" className={inputClass} />
                  <button onClick={handleUpdateUsername} disabled={saving} className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all text-sm">
                    {saving ? "Saving…" : "Update Username"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Change Password */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => setActiveSection(activeSection === "password" ? null : "password")}
              className="w-full flex justify-between items-center px-6 py-5 hover:bg-slate-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-base border border-purple-100">🔐</div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 text-left">Change Password</div>
                  <div className="text-xs text-slate-400 mt-0.5">Secure your account with a new login password</div>
                </div>
              </div>
              <span className="text-slate-400 font-black text-lg">{activeSection === "password" ? "−" : "+"}</span>
            </button>
            {activeSection === "password" && (
              <div className="px-6 pb-6 pt-2 animate-fade-in border-t border-slate-100">
                <div className="space-y-3 mt-2">
                  <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current password" className={inputClass} />
                  <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New password (min 6 chars)" className={inputClass} />
                  <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder="Confirm new password" className={inputClass} />
                  <button onClick={handleUpdatePassword} disabled={saving} className="w-full bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all mt-1 text-sm">
                    {saving ? "Saving…" : "Update Password"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Delete Account */}
          <div className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm mt-2">
            <button
              onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
              className="w-full flex justify-between items-center px-6 py-5 hover:bg-red-50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 text-red-500 flex items-center justify-center text-base border border-red-100">⚠️</div>
                <div>
                  <div className="text-sm font-semibold text-red-600 text-left">Danger Zone: Delete Account</div>
                  <div className="text-xs text-slate-400 mt-0.5">Permanently delete your account and all data</div>
                </div>
              </div>
              <span className="text-red-400 font-black text-lg">{showDeleteConfirm ? "−" : "+"}</span>
            </button>
            {showDeleteConfirm && (
              <div className="px-6 pb-6 pt-2 animate-fade-in border-t border-red-100">
                <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 text-center mt-3">
                  This action is irreversible. All your interview history, stats, and profile data will be permanently wiped.
                </p>
                <div className="flex gap-3 mt-4">
                  <button onClick={handleDeleteAccount} disabled={saving} className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all text-sm">
                    {saving ? "Deleting…" : "Yes, Delete Everything"}
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 rounded-xl transition-all text-sm">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
