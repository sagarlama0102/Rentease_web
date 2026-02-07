"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { getAuthToken } from "@/lib/cookie";

export default function ProfilePage() {
    const { user, setUser, loading } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    
    const [formData, setFormData] = useState({ username: "", email: "" });
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                email: user.email || "",
            });
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        
        try {
            const token = await getAuthToken();
            const data = new FormData();
            data.append("username", formData.username);
            data.append("email", formData.email);
            if (file) data.append("profilePicture", file);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/update-profile`, {
                method: "PUT",
                headers: { 
                    "Authorization": `Bearer ${token}` 
                },
                body: data,
            });

            const result = await response.json();
            if (result.success) {
                toast.success("Profile updated successfully!");
                setUser(result.data);
                setIsEditing(false);
                setFile(null);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-[#99DAB3]"></div>
            </div>
        );
    }

    if (!user) return <div className="text-center py-20 text-gray-400">Please login to view profile.</div>;

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            {/* Main Card */}
            <div className="bg-[#142725] rounded-3xl shadow-2xl overflow-hidden border border-[#99DAB3]/10">
                
                {/* Top Banner Accent */}
                <div className="h-32 bg-gradient-to-r from-[#142725] to-[#1e3a37] border-b border-[#99DAB3]/10" />

                <div className="px-8 pb-10 -mt-16">
                    <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
                        {/* Profile Picture with Mint Glow */}
                        <div className="relative">
                            <div 
                                className={`w-32 h-32 rounded-2xl overflow-hidden border-4 border-[#142725] shadow-2xl bg-[#1e3a37] flex items-center justify-center ${isEditing ? 'cursor-pointer hover:brightness-110' : ''}`}
                                onClick={() => isEditing && fileInputRef.current?.click()}
                            >
                                {preview || user?.profilePicture ? (
                                    <img 
                                        src={preview || `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`} 
                                        className="w-full h-full object-cover" 
                                        alt="Profile"
                                    />
                                ) : (
                                    <span className="text-4xl font-bold text-[#99DAB3]">{user?.username?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                            {isEditing && (
                                <div className="absolute -bottom-2 -right-2 bg-[#99DAB3] text-[#142725] p-2 rounded-lg shadow-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} accept="image/*" />
                        </div>

                        {/* Name & Badge */}
                        <div className="flex-1 mb-2">
                            <h1 className="text-3xl font-bold text-white tracking-tight">{user?.username}</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <p className="text-[#99DAB3]/70 font-medium">{user?.email}</p>
                                <span className="px-2 py-0.5 bg-[#99DAB3]/10 text-[#99DAB3] text-[10px] font-black rounded border border-[#99DAB3]/20 uppercase">
                                    {user?.role}
                                </span>
                            </div>
                        </div>

                        {/* Toggle Button */}
                        <button 
                            onClick={() => {
                                setIsEditing(!isEditing);
                                setPreview(null);
                            }}
                            className={`px-6 py-2.5 rounded-xl font-bold transition-all text-sm border-2 ${
                                isEditing 
                                ? 'border-red-400/50 text-red-400 hover:bg-red-400/10' 
                                : 'border-[#99DAB3]/30 text-[#99DAB3] hover:bg-[#99DAB3]/10'
                            }`}
                        >
                            {isEditing ? "Cancel" : "Edit Profile"}
                        </button>
                    </div>

                    <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#99DAB3] uppercase tracking-widest ml-1">Username</label>
                            <input 
                                type="text"
                                disabled={!isEditing}
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full px-5 py-4 rounded-2xl border border-[#99DAB3]/10 bg-[#1e3a37]/50 text-white disabled:opacity-50 focus:border-[#99DAB3] focus:ring-1 focus:ring-[#99DAB3] transition-all outline-none"
                                placeholder="Enter username"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#99DAB3] uppercase tracking-widest ml-1">Email Address</label>
                            <input 
                                type="email"
                                disabled={!isEditing}
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-5 py-4 rounded-2xl border border-[#99DAB3]/10 bg-[#1e3a37]/50 text-white disabled:opacity-50 focus:border-[#99DAB3] focus:ring-1 focus:ring-[#99DAB3] transition-all outline-none"
                                placeholder="Enter email"
                            />
                        </div>

                        {isEditing && (
                            <div className="md:col-span-2 flex justify-end mt-4">
                                <button 
                                    type="submit"
                                    disabled={updating}
                                    className="bg-[#99DAB3] text-[#142725] px-12 py-4 rounded-2xl font-black text-sm hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#99DAB3]/10 disabled:opacity-50 transition-all uppercase tracking-wider"
                                >
                                    {updating ? "Processing..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}