"use client";

import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();
  const { user: authUser } = useAuth();

  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/shop?search=${search}`);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    if (val === "") {
      router.push("/shop");
    }
  };

  const loadCartCount = async () => {
    try {
      const res = await axios.get("http://localhost:3200/api/cart", {
        withCredentials: true,
      });
      let total = 0;
      res.data.forEach((item) => { total += item.quantity; });
      setCartCount(total);
    } catch (error) {
      console.log(error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    setMounted(true);
    setUser(authUser);
    if (authUser) {
      loadCartCount();
    } else {
      setCartCount(0);
    }
  }, [authUser]);

  useEffect(() => {
    const refreshCart = () => loadCartCount();
    window.addEventListener("cartUpdated", refreshCart);
    return () => window.removeEventListener("cartUpdated", refreshCart);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3200/api/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("user");
      setUser(null);
      setCartCount(0);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="relative bg-white">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4">

          {/* Logo */}
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <span className="text-green-600">Next</span>Cart
          </Link>

          {/* Desktop Menu */}
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop</Link>
            <Link href="/orders">My Orders</Link>

            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={handleSearchChange}
              />
            </form>

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
              <ShoppingCart size={18} />
              Cart
              {mounted && cartCount > 0 && (
                <span className="absolute -top-2 -right-3 text-[9px] font-bold text-white bg-red-500 min-w-[18px] h-[18px] flex items-center justify-center rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </Link>

            {!mounted ? (
              <div className="w-24 h-9" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-700">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link href="/login">
                  <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-6 py-2 border border-indigo-500 text-indigo-500 hover:bg-indigo-50 rounded-full">
                    Signup
                  </button>
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  );
};

export default Navbar;