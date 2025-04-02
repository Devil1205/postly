"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  profilePicture?: string;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user from localStorage or session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove JWT token
    setUser(null);
    router.push("/login");
  };

  // User profile image or initials
  const userInitial: string = user?.name?.[0]?.toUpperCase() || "?";
  const userImage: string | undefined = user?.profilePicture;

  return (
    <nav className="sticky top-0 left-0 w-full bg-zinc-950/80 backdrop-blur-sm shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white">
            Postly
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {["Home", "Blog", "About", "Contact"].map((item) => (
              <Link key={item} href={`/${item.toLowerCase()}`} className="text-white hover:text-gray-300">
                {item}
              </Link>
            ))}
          </div>

          {/* Profile Dropdown */}
          <div className="relative flex items-center space-x-4">
            {user ? (
              <button className="relative" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {userImage ? (
                  <img src={userImage} alt="Profile" className="w-10 h-10 rounded-full border border-white" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-500 text-white text-lg">
                    {userInitial}
                  </div>
                )}
              </button>
            ) : (
              <Link href="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            )}

            {/* Dropdown Menu */}
            {dropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
                <Link href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/30 backdrop-blur-lg absolute w-full p-4 flex flex-col space-y-4 items-center text-white">
          {["Home", "Blog", "About", "Contact"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase()}`} className="hover:text-gray-300" onClick={() => setIsOpen(false)}>
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
