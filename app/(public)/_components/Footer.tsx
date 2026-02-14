"use client";

export default function Footer() {
  return (
    <footer className="bg-[#142725] text-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold tracking-tight">
              RENTEASE
            </h3>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Discover modern rental properties with a seamless and minimal experience.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#99DAB3] mb-5">
              Features
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Properties</a></li>
              <li><a href="#" className="hover:text-white transition">Agents</a></li>
              <li><a href="#" className="hover:text-white transition">Localities</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#99DAB3] mb-5">
              Legal
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Sitemap</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#99DAB3] mb-5">
              Contact
            </h4>

            <div className="space-y-3 text-sm text-gray-400">
              <p>info@rentease.com</p>
              <p>+977 1234567890</p>
              <p>Kathmandu, Nepal</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-md bg-white/5 hover:bg-[#99DAB3] hover:text-[#142725] transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.93 4.93 0 0 0 2.165-2.724 9.864 9.864 0 0 1-3.127 1.195 4.916 4.916 0 0 0-8.38 4.482A13.944 13.944 0 0 1 1.671 3.149 4.916 4.916 0 0 0 3.195 9.72a4.897 4.897 0 0 1-2.229-.616v.062a4.917 4.917 0 0 0 3.946 4.814 4.935 4.935 0 0 1-2.224.084 4.919 4.919 0 0 0 4.588 3.417A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.01-7.514 14.01-14.01 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/>
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-md bg-white/5 hover:bg-[#99DAB3] hover:text-[#142725] transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M7.75 2C4.678 2 2 4.678 2 7.75v8.5C2 19.322 4.678 22 7.75 22h8.5C19.322 22 22 19.322 22 16.25v-8.5C22 4.678 19.322 2 16.25 2h-8.5zm0 2h8.5C18.216 4 20 5.784 20 7.75v8.5c0 1.966-1.784 3.75-3.75 3.75h-8.5C5.784 20 4 18.216 4 16.25v-8.5C4 5.784 5.784 4 7.75 4zm4.25 2.5a5.75 5.75 0 1 0 0 11.5 5.75 5.75 0 0 0 0-11.5zm0 2a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5zm4.75-.75a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5z"/>
                </svg>
              </a>

              <a
                href="#"
                className="w-9 h-9 flex items-center justify-center rounded-md bg-white/5 hover:bg-[#99DAB3] hover:text-[#142725] transition"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 9H16V6h-2.5c-2.21 0-3.5 1.29-3.5 3.5V12H8v3h2v7h3v-7h2.5l.5-3H13v-2.25c0-.69.31-1.25 1-1.25z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 text-sm text-gray-500 text-center">
          © 2024 RENTEASE. All rights reserved.
        </div>
      </div>
    </footer>
  );
}