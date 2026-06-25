'use client'

import { useEffect, useState, useMemo, useRef, Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import {
    MoveLeftIcon, Tag, Store, ArrowUpDown,
    X, Check, ChevronDown, SlidersHorizontal
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "@/lib/actions/fetchProducts";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { fetchBrands } from "@/lib/actions/fetchBrands";
import { useAuth } from "@/context/AuthContext";

// ─── Dropdown ────────────────────────────────────────────────────────────────
function FilterDropdown({ icon: Icon, placeholder, value, options, onChange, disabled }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const ref = useRef(null);
    const active = !!value;
    const label = options.find(o => o._id === value)?.name ?? placeholder;

    const filtered = useMemo(() =>
        search.trim()
            ? options.filter(o => o.name.toLowerCase().includes(search.toLowerCase()))
            : options,
        [options, search]
    );

    useEffect(() => {
        const fn = e => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setSearch(""); } };
        document.addEventListener("mousedown", fn);
        return () => document.removeEventListener("mousedown", fn);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                disabled={disabled}
                onClick={() => setOpen(v => !v)}
                className={[
                    "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-xs font-medium",
                    "border transition-all duration-150 select-none whitespace-nowrap outline-none",
                    disabled ? "opacity-40 cursor-not-allowed bg-white border-slate-200 text-slate-400" :
                        active
                            ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm shadow-indigo-100"
                            : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50"
                ].join(" ")}
            >
                <Icon size={13} strokeWidth={1.8} />
                <span>{label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                <ChevronDown size={11} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute top-[calc(100%+5px)] left-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 min-w-[180px] max-h-96 flex flex-col overflow-hidden">
                    <div className="p-2 border-b border-slate-100">
                        <input
                            autoFocus
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder={`Search ${placeholder.toLowerCase()}...`}
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 outline-none focus:border-indigo-300"
                        />
                    </div>
                    <div className="overflow-y-auto">
                        <button
                            onClick={() => { onChange(""); setOpen(false); setSearch(""); }}
                            className={[
                                "w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors",
                                !value ? "text-indigo-700 bg-indigo-50" : "text-slate-500 hover:bg-slate-50"
                            ].join(" ")}
                        >
                            <Check size={12} strokeWidth={2.5} className={!value ? "text-indigo-500" : "opacity-0"} />
                            All {placeholder.toLowerCase()}s
                        </button>
                        {filtered.length > 0 && <div className="my-1 mx-3 border-t border-slate-100" />}
                        {filtered.map(opt => (
                            <button
                                key={opt._id}
                                onClick={() => { onChange(opt._id); setOpen(false); setSearch(""); }}
                                className={[
                                    "w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors",
                                    value === opt._id
                                        ? "text-indigo-700 bg-indigo-50 font-medium"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                ].join(" ")}
                            >
                                <Check size={12} strokeWidth={2.5} className={value === opt._id ? "text-indigo-500 shrink-0" : "opacity-0 shrink-0"} />
                                {opt.name}
                            </button>
                        ))}
                        {filtered.length === 0 && (
                            <p className="text-xs text-slate-400 text-center py-4">No results</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

// ─── Sort dropdown ────────────────────────────────────────────────────────────
const SORT_OPTIONS = [
    { value: "latest", label: "Latest first" },
    { value: "price-asc", label: "Price: low → high" },
    { value: "price-desc", label: "Price: high → low" },
];

function SortDropdown({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const active = !!value;
    const label = SORT_OPTIONS.find(o => o.value === value)?.label ?? "Sort";

    useEffect(() => {
        const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
        document.addEventListener("mousedown", fn);
        return () => document.removeEventListener("mousedown", fn);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={() => setOpen(v => !v)}
                className={[
                    "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl text-xs font-medium",
                    "border transition-all duration-150 select-none whitespace-nowrap outline-none",
                    active
                        ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-sm shadow-indigo-100"
                        : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800 hover:bg-slate-50"
                ].join(" ")}
            >
                <ArrowUpDown size={13} strokeWidth={1.8} />
                <span>{label}</span>
                {active && <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                <ChevronDown size={11} className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
                <div className="absolute top-[calc(100%+5px)] left-0 z-50 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 py-2 min-w-[180px]">
                    <button
                        onClick={() => { onChange(""); setOpen(false); }}
                        className={[
                            "w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors",
                            !value ? "text-indigo-700 bg-indigo-50" : "text-slate-500 hover:bg-slate-50"
                        ].join(" ")}
                    >
                        <Check size={12} strokeWidth={2.5} className={!value ? "text-indigo-500" : "opacity-0"} />
                        Default order
                    </button>
                    <div className="my-1.5 mx-3 border-t border-slate-100" />
                    {SORT_OPTIONS.map(opt => (
                        <button
                            key={opt.value}
                            onClick={() => { onChange(opt.value); setOpen(false); }}
                            className={[
                                "w-full flex items-center gap-2.5 px-3.5 py-2 text-xs transition-colors",
                                value === opt.value
                                    ? "text-indigo-700 bg-indigo-50 font-medium"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            ].join(" ")}
                        >
                            <Check size={12} strokeWidth={2.5} className={value === opt.value ? "text-indigo-500 shrink-0" : "opacity-0 shrink-0"} />
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─── Filter chip ──────────────────────────────────────────────────────────────
function Chip({ icon: Icon, label, onRemove }) {
    return (
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-[11px] font-medium pl-2.5 pr-1.5 py-1 rounded-lg">
            <Icon size={11} strokeWidth={2} className="text-indigo-400 shrink-0" />
            {label}
            <button
                onClick={onRemove}
                className="ml-0.5 w-4 h-4 rounded flex items-center justify-center hover:bg-indigo-200 transition-colors shrink-0"
                aria-label={`Remove ${label} filter`}
            >
                <X size={9} strokeWidth={2.5} />
            </button>
        </span>
    );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
            <div className="aspect-square bg-slate-100" />
            <div className="p-3.5 space-y-2.5">
                <div className="h-2 bg-slate-100 rounded-full w-2/5" />
                <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                <div className="flex items-center justify-between pt-0.5">
                    <div className="h-4 bg-slate-100 rounded-full w-1/3" />
                    <div className="w-7 h-7 bg-slate-100 rounded-lg" />
                </div>
            </div>
        </div>
    );
}

// ─── ShopContent ──────────────────────────────────────────────────────────────
function ShopContent() {
    const dispatch = useDispatch();
    const router = useRouter();
    const searchParams = useSearchParams();

    // ✅ FIXED: read "categoryId" not "category"
    const categoryIdFromUrl = searchParams.get("categoryId");
    const search = searchParams.get("search") || "";
    const { user, loading: authLoading } = useAuth();

    const products = useSelector(s => s.product?.list || []);
    const loading = useSelector(s => s.product?.loading);
    const categories = useSelector(s => s.category?.list || []);
    const brands = useSelector(s => s.brand?.list || []);
    const pagination = useSelector(s => s.product?.pagination);

    const totalPages = pagination?.totalPages || 1;
    const totalProducts = pagination?.totalProducts || 0;

    const [selectedCategory, setSelectedCategory] = useState(categoryIdFromUrl || "");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // ── Fetch categories & brands once ───────────────────────────────────────
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    // ✅ FIXED: Sync selectedCategory when URL param changes (marquee click)
    useEffect(() => {
        setSelectedCategory(categoryIdFromUrl || "");
        setCurrentPage(1);
    }, [categoryIdFromUrl]);

    // Reset to page 1 whenever filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [search, selectedCategory, selectedBrand, sortBy]);

    // Fetch products whenever filters/page change
    useEffect(() => {
        const pageToFetch = search ? 1 : currentPage;
        dispatch(fetchProducts(pageToFetch, 20, selectedCategory, selectedBrand, sortBy, search));
    }, [dispatch, currentPage, selectedCategory, selectedBrand, sortBy, search]);

    // ── Auth check ────────────────────────────────────────────────────────────
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
        }
    }, [authLoading, user, router]);

    // ── Derived lists ─────────────────────────────────────────────────────────
    const derivedCategories = useMemo(
        () => categories.map(cat => ({ _id: cat._id, name: cat.name })),
        [categories]
    );

    const derivedBrands = useMemo(
        () => brands.map(brand => ({ _id: brand._id, name: brand.name, category: brand.category })),
        [brands]
    );

    const brandsForCategory = useMemo(() => {
        if (!selectedCategory) return derivedBrands;
        return derivedBrands.filter(
            brand => String(brand.category?._id || brand.category) === String(selectedCategory)
        );
    }, [selectedCategory, derivedBrands]);

    useEffect(() => {
        if (selectedBrand && !brandsForCategory.find(b => b._id === selectedBrand)) {
            setSelectedBrand("");
        }
    }, [brandsForCategory, selectedBrand]);

    const displayedProducts = products;

    // ── Pagination helpers ────────────────────────────────────────────────────
    const getVisiblePages = () => {
        const pages = [];
        let start = Math.max(1, currentPage - 2);
        let end = Math.min(totalPages, currentPage + 2);

        if (currentPage <= 3) end = Math.min(5, totalPages);
        if (currentPage >= totalPages - 2) start = Math.max(1, totalPages - 4);

        for (let i = start; i <= end; i++) pages.push(i);
        return pages;
    };

    const goToPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ── Active filter helpers ─────────────────────────────────────────────────
    const hasActiveFilter = selectedCategory || selectedBrand || sortBy;
    const activeFilterCount = [selectedCategory, selectedBrand, sortBy].filter(Boolean).length;

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedBrand("");
        setSortBy("");
        setCurrentPage(1);
        router.push("/shop"); // ✅ also clear URL
    };

    const activeCatName = derivedCategories.find(c => c._id === selectedCategory)?.name;
    const activeBrandName = derivedBrands.find(b => b._id === selectedBrand)?.name;
    const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label;

    return (
        <div className="min-h-screen bg-slate-50/70">

            {/* ── Top bar ──────────────────────────────────────────────────── */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">

                    <div className="flex flex-col py-3 gap-3 sm:flex-row sm:items-center sm:gap-3">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                            {search && (
                                <button
                                    onClick={() => router.push("/shop")}
                                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all shrink-0"
                                    aria-label="Back to shop"
                                >
                                    <MoveLeftIcon size={13} />
                                </button>
                            )}
                            <h1 className="text-sm font-semibold text-slate-800 truncate">
                                {search
                                    ? <><span className="text-slate-400 font-normal">Results for </span>"{search}"</>
                                    : activeCatName
                                    ? activeCatName  // ✅ Show category name in heading
                                    : "All Products"
                                }
                            </h1>
                            {!loading && (
                                <span className="shrink-0 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                                    {totalProducts} item{totalProducts !== 1 ? "s" : ""}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                            {hasActiveFilter && (
                                <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full shrink-0">
                                    {activeFilterCount} active
                                </span>
                            )}

                            <FilterDropdown
                                icon={Tag}
                                placeholder="Category"
                                value={selectedCategory}
                                options={derivedCategories}
                                onChange={(val) => {
                                    setSelectedCategory(val);
                                    setSelectedBrand("");
                                    setCurrentPage(1);
                                    // ✅ FIXED: use categoryId in URL
                                    if (val) {
                                        router.push(`/shop?categoryId=${val}`);
                                    } else {
                                        router.push("/shop");
                                    }
                                }}
                            />
                            <FilterDropdown
                                icon={Store}
                                placeholder="Brand"
                                value={selectedBrand}
                                options={brandsForCategory}
                                onChange={val => {
                                    setSelectedBrand(val);
                                    setCurrentPage(1);
                                }}
                                disabled={brandsForCategory.length === 0}
                            />
                            <SortDropdown
                                value={sortBy}
                                onChange={val => {
                                    setSortBy(val);
                                    setCurrentPage(1);
                                }}
                            />

                            {hasActiveFilter && (
                                <button
                                    onClick={clearFilters}
                                    className="w-9 h-9 rounded-xl border border-red-200 bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 transition-all flex items-center justify-center shrink-0"
                                    aria-label="Clear all filters"
                                >
                                    <X size={13} strokeWidth={2} />
                                </button>
                            )}
                        </div>
                    </div>

                    {hasActiveFilter && (
                        <div className="pb-2.5 flex gap-1.5 flex-wrap">
                            {activeCatName && (
                                <Chip icon={Tag} label={activeCatName}
                                    onRemove={() => {
                                        setSelectedCategory("");
                                        setSelectedBrand("");
                                        setCurrentPage(1);
                                        router.push("/shop"); // ✅ clear URL too
                                    }}
                                />
                            )}
                            {activeBrandName && (
                                <Chip icon={Store} label={activeBrandName}
                                    onRemove={() => { setSelectedBrand(""); setCurrentPage(1); }} />
                            )}
                            {activeSortLabel && (
                                <Chip icon={ArrowUpDown} label={activeSortLabel}
                                    onRemove={() => { setSortBy(""); setCurrentPage(1); }} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* ── Grid ─────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 pb-20">
                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>

                ) : displayedProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
                            <SlidersHorizontal size={22} className="text-slate-300" />
                        </div>
                        <p className="text-sm font-semibold text-slate-700 mb-1">No products found</p>
                        <p className="text-xs text-slate-400 mb-5">
                            {hasActiveFilter ? "Try adjusting or clearing your filters." : "Check back soon."}
                        </p>
                        {hasActiveFilter && (
                            <button
                                onClick={clearFilters}
                                className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>

                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {displayedProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>

                        {totalPages > 1 && !search && (
                            <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                                <button
                                    onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-slate-50 transition-colors"
                                >
                                    Prev
                                </button>

                                {currentPage > 3 && (
                                    <>
                                        <button onClick={() => goToPage(1)} className="w-10 h-10 border rounded-lg text-sm hover:bg-slate-50 transition-colors">1</button>
                                        <span className="text-slate-400 text-sm">...</span>
                                    </>
                                )}

                                {getVisiblePages().map(page => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${currentPage === page ? "bg-indigo-600 text-white shadow-sm" : "border hover:bg-slate-50"}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {currentPage < totalPages - 2 && (
                                    <>
                                        <span className="text-slate-400 text-sm">...</span>
                                        <button onClick={() => goToPage(totalPages)} className="w-10 h-10 border rounded-lg text-sm hover:bg-slate-50 transition-colors">{totalPages}</button>
                                    </>
                                )}

                                <button
                                    onClick={() => goToPage(Math.min(currentPage + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50 hover:bg-slate-50 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

// ─── Page export ──────────────────────────────────────────────────────────────
export default function Shop() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50/70">
                <div className="bg-white border-b border-slate-100 h-14" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-pulse">
                                <div className="aspect-square bg-slate-100" />
                                <div className="p-3.5 space-y-2.5">
                                    <div className="h-2 bg-slate-100 rounded-full w-2/5" />
                                    <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}