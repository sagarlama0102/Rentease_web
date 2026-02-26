"use client";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { getAuthToken } from "@/lib/cookie";
import { User, Mail, Camera, ShieldCheck, Settings, Loader2, Pencil, X } from "lucide-react";
import Loading from "./loading";

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

    if (loading) return <Loading />;
        

    if (!user) return <div className="text-center py-20 text-gray-400">Please login to view profile.</div>;

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                <p className="text-gray-500 mt-1">Manage your personal information and account preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Avatar & Quick Info */}
                <div className="lg:col-span-1">
                    <div className="bg-[#142725] rounded-3xl p-8 text-center shadow-xl border border-[#99DAB3]/10">
                        <div className="relative mx-auto w-32 h-32 mb-6">
                            <div 
                                className={`w-32 h-32 rounded-3xl overflow-hidden border-4 border-[#1e3a37] shadow-2xl bg-[#1e3a37] flex items-center justify-center transition-all ${isEditing ? 'ring-4 ring-[#99DAB3]/30 cursor-pointer hover:brightness-110' : ''}`}
                                onClick={() => isEditing && fileInputRef.current?.click()}
                            >
                                {preview || user?.profilePicture ? (
                                    <img 
                                        src={preview || `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.profilePicture}`} 
                                        className="w-full h-full object-cover" 
                                        alt="Profile"
                                    />
                                ) : (
                                    <span className="text-5xl font-bold text-[#99DAB3]">{user?.username?.[0]?.toUpperCase()}</span>
                                )}
                            </div>
                            {isEditing && (
                                <div className="absolute -bottom-2 -right-2 bg-[#99DAB3] text-[#142725] p-2 rounded-xl shadow-lg animate-bounce">
                                    <Camera size={20} strokeWidth={2.5} />
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} accept="image/*" />
                        </div>

                        <h2 className="text-xl font-bold text-white mb-1">{user?.username}</h2>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#99DAB3]/10 border border-[#99DAB3]/20 text-[#99DAB3] text-xs font-bold uppercase tracking-widest mb-6">
                            {user?.role}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-white/10 text-left">
                            <div className="flex items-center gap-3 text-white/70 text-sm">
                                <ShieldCheck size={18} className="text-[#99DAB3]" />
                                <span>Verified Resident</span>
                            </div>
                            <div className="flex items-center gap-3 text-white/70 text-sm">
                                <Settings size={18} className="text-[#99DAB3]" />
                                <span>Account Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Editable Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 h-full">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-xl font-bold text-gray-900">Personal Details</h3>
                            <button 
                                onClick={() => {
                                    setIsEditing(!isEditing);
                                    setPreview(null);
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all text-sm border-2 ${
                                    isEditing 
                                    ? 'border-red-100 text-red-500 hover:bg-red-50' 
                                    : 'border-gray-100 text-gray-600 hover:bg-gray-50'
                                }`}
                            >
                                {isEditing ? <><X size={16}/> Cancel</> : <><Pencil size={16}/> Edit Profile</>}
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <User size={14} className="text-[#142725]" /> Username
                                    </label>
                                    <input 
                                        type="text"
                                        disabled={!isEditing}
                                        value={formData.username}
                                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-900 disabled:bg-gray-100/50 disabled:text-gray-500 focus:border-[#99DAB3] focus:ring-2 focus:ring-[#99DAB3]/20 transition-all outline-none"
                                        placeholder="Your username"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                                        <Mail size={14} className="text-[#142725]" /> Email Address
                                    </label>
                                    <input 
                                        type="email"
                                        disabled={!isEditing}
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-5 py-4 rounded-2xl border border-gray-100 bg-gray-50/50 text-gray-900 disabled:bg-gray-100/50 disabled:text-gray-500 focus:border-[#99DAB3] focus:ring-2 focus:ring-[#99DAB3]/20 transition-all outline-none"
                                        placeholder="Your email"
                                    />
                                </div>
                            </div>

                            {isEditing && (
                                <div className="flex justify-end pt-4">
                                    <button 
                                        type="submit"
                                        disabled={updating}
                                        className="bg-[#142725] text-white px-10 py-4 rounded-2xl font-bold text-sm hover:bg-[#1e3a37] shadow-lg disabled:opacity-50 transition-all flex items-center gap-3"
                                    >
                                        {updating ? (
                                            <><Loader2 size={18} className="animate-spin" /> Updating...</>
                                        ) : (
                                            "Save Changes"
                                        )}
                                    </button>
                                </div>
                            )}
                        </form>

                        {!isEditing && (
                            <div className="mt-12 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm">
                                        <ShieldCheck className="text-[#142725]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900">Privacy & Security</h4>
                                        <p className="text-sm text-gray-500 mt-1">Your account information is protected with end-to-end encryption. Need to update your password?</p>
                                        <button className="mt-3 text-sm font-bold text-[#142725] hover:underline">Request password reset</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}