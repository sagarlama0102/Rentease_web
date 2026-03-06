import { Building2, ShieldCheck, Zap, Home } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="h-screen w-full bg-white flex overflow-hidden">
            <div className="h-full w-full grid md:grid-cols-2">

                {/* Left Side: Real Estate Brand Experience */}
                <div className="relative hidden md:flex h-full bg-[#142725] flex-col items-center justify-center p-12 overflow-hidden">
                    
                    {/* Abstract Background Accents */}
                    <div className="absolute top-[-10%] left-[-10%] w-80 h-80 rounded-full bg-[#99DAB3]/10 blur-[100px] pointer-events-none" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 rounded-full bg-[#99DAB3]/10 blur-[100px] pointer-events-none" />

                    <div className="relative z-10 w-full max-w-sm">
                        {/* Main Brand Icon */}
                        <div className="mb-10 inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-[#99DAB3] text-[#142725] shadow-lg shadow-[#99DAB3]/20">
                            <Home size={32} strokeWidth={2.5} />
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-6 tracking-tight leading-tight">
                            Find your next <br /> 
                            <span className="text-[#99DAB3]">perfect stay</span> with us.
                        </h2>

                        {/* Feature List (The "Real Estate" Icons) */}
                        <div className="space-y-6 mt-12">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#99DAB3]/10 group-hover:border-[#99DAB3]/20 transition-all">
                                    <Building2 className="text-[#99DAB3]" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">Premium Listings</h4>
                                    <p className="text-white/40 text-xs">Curated homes in top locations.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#99DAB3]/10 group-hover:border-[#99DAB3]/20 transition-all">
                                    <ShieldCheck className="text-[#99DAB3]" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">Secure Booking</h4>
                                    <p className="text-white/40 text-xs">Verified properties and safe payments.</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#99DAB3]/10 group-hover:border-[#99DAB3]/20 transition-all">
                                    <Zap className="text-[#99DAB3]" size={24} />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold text-sm">Instant Move-in</h4>
                                    <p className="text-white/40 text-xs">Simplified digital rental agreements.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Subtle Bottom Branding */}
                    <div className="absolute bottom-10 left-12">
                        <p className="text-[#99DAB3]/30 text-xs font-bold tracking-[0.2em] uppercase">RentEase Platform v2.0</p>
                    </div>
                </div>

                {/* Right Side: Form Side (Remains Clean) */}
                <div className="flex h-full items-center justify-center bg-gray-50/50 px-6 lg:px-12">
                    <div className="w-full max-w-md">
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}