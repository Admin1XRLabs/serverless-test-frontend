"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Featured products for the loading carousel
const featuredProducts = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: "₹1,299",
    originalPrice: "₹1,999",
    image: "/images/cloth1.jpg",
    tag: "New Arrival",
    tagColor: "bg-emerald-500",
  },
  {
    id: 2,
    name: "Casual Comfort Pants",
    price: "₹1,499",
    originalPrice: "₹2,499",
    image: "/images/cloth2.webp",
    tag: "Best Seller",
    tagColor: "bg-orange-500",
  },
  {
    id: 3,
    name: "Female Top",
    price: "₹2,999",
    originalPrice: "₹4,499",
    image: "/images/cloth3.png",
    tag: "Limited Edition",
    tagColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Premium Bomber Jacket",
    price: "₹2,999",
    originalPrice: "₹4,499",
    image: "/images/cloth4.jpeg",
    tag: "Trending",
    tagColor: "bg-blue-500",
  },
];

// Model showcase for inspiration section
const modelShowcase = [
  { image: "/images/model1.png", name: "Urban Casual" },
  { image: "/images/model2.png", name: "Weekend Vibes" },
  { image: "/images/model3.png", name: "Street Style" },
  { image: "/images/model4.png", name: "Smart Casual" },
];

const loadingMessages = [
  "Analyzing your photo...",
  "Mapping body proportions...",
  "Fitting the garment...",
  "Adjusting fabric drape...",
  "Adding realistic shadows...",
  "Perfecting the look...",
  "Almost ready!",
];

// Loading Carousel Component with Product Images
function LoadingCarousel({ elapsedTime }: { elapsedTime: number }) {
  const [currentProduct, setCurrentProduct] = useState(0);
  const [currentModel, setCurrentModel] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const productInterval = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % featuredProducts.length);
    }, 3500);
    return () => clearInterval(productInterval);
  }, []);

  useEffect(() => {
    const modelInterval = setInterval(() => {
      setCurrentModel((prev) => (prev + 1) % modelShowcase.length);
    }, 3500);
    return () => clearInterval(modelInterval);
  }, []);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => Math.min(prev + 1, loadingMessages.length - 1));
    }, 4000);
    return () => clearInterval(msgInterval);
  }, []);

  const progress = Math.min((elapsedTime / 30) * 100, 95);

  return (
    <div className="absolute inset-0 flex flex-col bg-neutral-950">
      {/* Main Showcase Area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Background Gradient Animation */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20 animate-pulse" />

        {/* Featured Product Carousel */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative w-full max-w-sm">
            {/* Product Card */}
            <div className="relative bg-neutral-900/80 backdrop-blur-sm rounded-3xl border border-neutral-800 overflow-hidden shadow-2xl">
              {/* Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className={`${featuredProducts[currentProduct].tagColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                  {featuredProducts[currentProduct].tag}
                </span>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-b from-neutral-800 to-neutral-900 overflow-hidden">
                {featuredProducts.map((product, idx) => (
                  <div
                    key={product.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${idx === currentProduct
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-110"
                      }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-8"
                    />
                  </div>
                ))}

                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              </div>

              {/* Product Info */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-semibold text-white">
                  {featuredProducts[currentProduct].name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-white">
                    {featuredProducts[currentProduct].price}
                  </span>
                  <span className="text-sm text-neutral-500 line-through">
                    {featuredProducts[currentProduct].originalPrice}
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    35% OFF
                  </span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.4a2 2 0 0 0-2-1H5.62a2 2 0 0 0-2 1L2 9h20l-1.62-5.6z" />
                    <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                  </svg>
                  Try This Next
                </button>
              </div>
            </div>

            {/* Product Indicators */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentProduct(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentProduct ? "w-8 bg-indigo-500" : "w-1.5 bg-neutral-700"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Floating Style Inspiration Bubbles */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Trending Looks</p>
          {modelShowcase.map((model, idx) => (
            <div
              key={idx}
              className={`relative w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-500 cursor-pointer hover:scale-110 ${idx === currentModel ? "border-indigo-500 scale-110" : "border-neutral-700"
                }`}
            >
              <Image src={model.image} alt={model.name} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar with Processing Info */}
      <div className="bg-neutral-900/95 backdrop-blur border-t border-neutral-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            {/* Animated DNA-like Spinner */}
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin" />
              <div className="absolute inset-1 rounded-full border-2 border-transparent border-b-pink-500 border-l-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">{loadingMessages[messageIndex]}</p>
              <p className="text-xs text-neutral-500">
                {elapsedTime < 10 ? "Starting up" : elapsedTime < 20 ? "Processing" : "Finishing up"} • {elapsedTime}s
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">{Math.round(progress)}%</p>
            <p className="text-xs text-neutral-500">Estimated</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>

      {/* Add shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export default function Home() {
  const [personImage, setPersonImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "queued" | "processing" | "completed" | "failed">("idle");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [isDraggingPerson, setIsDraggingPerson] = useState(false);
  const [isDraggingCloth, setIsDraggingCloth] = useState(false);
  const [clothType, setClothType] = useState<"top" | "bottom">("top");
  const [elapsedTime, setElapsedTime] = useState(0);

  const personInputRef = useRef<HTMLInputElement>(null);
  const clothInputRef = useRef<HTMLInputElement>(null);

  // Timer for elapsed time
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "uploading" || status === "queued" || status === "processing") {
      setElapsedTime(0);
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedTime(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const handleFile = (file: File, type: "person" | "cloth") => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "person") setPersonImage(reader.result as string);
      else setClothImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "person" | "cloth") => {
    const file = e.target.files?.[0];
    if (file) handleFile(file, type);
  };

  const handleDragOver = (e: React.DragEvent, type: "person" | "cloth") => {
    e.preventDefault();
    if (type === "person") setIsDraggingPerson(true);
    else setIsDraggingCloth(true);
  };

  const handleDragLeave = (e: React.DragEvent, type: "person" | "cloth") => {
    e.preventDefault();
    if (type === "person") setIsDraggingPerson(false);
    else setIsDraggingCloth(false);
  };

  const handleDrop = (e: React.DragEvent, type: "person" | "cloth") => {
    e.preventDefault();
    if (type === "person") setIsDraggingPerson(false);
    else setIsDraggingCloth(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file, type);
    }
  };

  const stripBase64Prefix = (base64: string) => {
    return base64.replace(/^data:image\/[a-z]+;base64,/, "");
  };

  const handleSwap = async () => {
    if (!personImage || !clothImage) return;

    setStatus("uploading");
    setError(null);
    setResultImage(null);

    try {
      const response = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          personImage: stripBase64Prefix(personImage),
          clothImage: stripBase64Prefix(clothImage),
          clothType: clothType,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = typeof data.error === 'string'
          ? data.error
          : data.error?.message || "Failed to start job";
        throw new Error(errorMessage);
      }

      setJobId(data.id);
      setStatus("queued");
      pollStatus(data.id);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setStatus("failed");
    }
  };

  const pollStatus = async (id: string) => {
    let pollCount = 0;
    const maxPollTime = 90000; // 90 second timeout
    const startTime = Date.now();

    const poll = async () => {
      // Check timeout
      if (Date.now() - startTime > maxPollTime) {
        setStatus("failed");
        setError("Request timed out. Please try again.");
        return;
      }

      try {
        const response = await fetch(`/api/status?id=${id}`);
        const data = await response.json();

        if (data.status === "COMPLETED") {
          setStatus("completed");

          if (data.output) {
            if (data.output.images && data.output.images.length > 0) {
              const img = data.output.images[0];
              if (typeof img === 'string') {
                setResultImage(`data:image/png;base64,${img}`);
              } else if (img.base64) {
                setResultImage(`data:image/png;base64,${img.base64}`);
              } else if (img.data) {
                setResultImage(`data:image/png;base64,${img.data}`);
              } else if (img.url) {
                setResultImage(img.url);
              } else {
                setResultImage(JSON.stringify(data.output, null, 2));
              }
            } else if (data.output.message && typeof data.output.message === 'string') {
              setResultImage(data.output.message);
            } else {
              setResultImage(JSON.stringify(data.output, null, 2));
            }
          }
        } else if (data.status === "FAILED") {
          setStatus("failed");
          setError(data.error || "Job failed during processing");
        } else {
          // Job still in progress - schedule next poll with adaptive interval
          pollCount++;
          // Start at 1.5s, gradually increase to 4s max
          const interval = Math.min(1500 + (pollCount * 200), 4000);
          setTimeout(poll, interval);
        }
      } catch (err) {
        console.error("Polling error", err);
        // Retry on error with longer interval
        setTimeout(poll, 3000);
      }
    };

    // Start polling after initial delay
    setTimeout(poll, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 font-sans selection:bg-indigo-500/30 flex flex-col">
      <div className="flex-grow max-w-6xl mx-auto px-6 py-12 w-full">

        {/* Hero Section */}
        <header className="mb-16 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
          <h1 className="relative text-5xl md:text-7xl font-bold bg-gradient-to-b from-white via-white to-neutral-400 bg-clip-text text-transparent mb-6 tracking-tight">
            Virtual Try-On
          </h1>
          <p className="relative text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Experience the future of fashion. Upload your photo and a garment to instantly see how it looks on you using advanced AI.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 relative z-10">
          {/* Input Section */}
          <div className="space-y-8">

            {/* Person Image */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
                  Person Image
                </label>
                {personImage && (
                  <button
                    onClick={() => { setPersonImage(null); if (personInputRef.current) personInputRef.current.value = ''; }}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    Remove
                  </button>
                )}
              </div>
              <div
                onDragOver={(e) => handleDragOver(e, "person")}
                onDragLeave={(e) => handleDragLeave(e, "person")}
                onDrop={(e) => handleDrop(e, "person")}
                className={`
                  relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden group cursor-pointer
                  ${isDraggingPerson ? "border-indigo-500 bg-indigo-500/10 scale-[1.02]" : "border-neutral-800 hover:border-neutral-600 bg-neutral-900/30"}
                  ${personImage ? "border-transparent" : ""}
                `}
                onClick={() => personInputRef.current?.click()}
              >
                {personImage ? (
                  <Image
                    src={personImage}
                    alt="Person"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 pointer-events-none p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </div>
                    <span className="text-sm font-medium text-neutral-300 mb-1">Upload Person</span>
                    <span className="text-xs text-neutral-600">Drag & drop or click to browse</span>
                  </div>
                )}
                <input
                  ref={personInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "person")}
                  className="hidden"
                />
              </div>
            </div>

            {/* Cloth Image */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">2</span>
                  Cloth Image
                </label>
                {clothImage && (
                  <button
                    onClick={() => { setClothImage(null); if (clothInputRef.current) clothInputRef.current.value = ''; }}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    Remove
                  </button>
                )}
              </div>
              <div
                onDragOver={(e) => handleDragOver(e, "cloth")}
                onDragLeave={(e) => handleDragLeave(e, "cloth")}
                onDrop={(e) => handleDrop(e, "cloth")}
                className={`
                  relative aspect-[3/4] rounded-3xl border-2 border-dashed transition-all duration-300 overflow-hidden group cursor-pointer
                  ${isDraggingCloth ? "border-purple-500 bg-purple-500/10 scale-[1.02]" : "border-neutral-800 hover:border-neutral-600 bg-neutral-900/30"}
                  ${clothImage ? "border-transparent" : ""}
                `}
                onClick={() => clothInputRef.current?.click()}
              >
                {clothImage ? (
                  <Image
                    src={clothImage}
                    alt="Cloth"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500 pointer-events-none p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-neutral-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M20.38 3.4a2 2 0 0 0-2-1H5.62a2 2 0 0 0-2 1L2 9h20l-1.62-5.6z" /><path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" /><path d="M10 9v4" /><path d="M14 9v4" /></svg>
                    </div>
                    <span className="text-sm font-medium text-neutral-300 mb-1">Upload Cloth</span>
                    <span className="text-xs text-neutral-600">Drag & drop or click to browse</span>
                  </div>
                )}
                <input
                  ref={clothInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "cloth")}
                  className="hidden"
                />
              </div>
            </div>

            {/* Cloth Type Toggle */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-neutral-300 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">3</span>
                Clothing Type
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setClothType("top")}
                  className={`
                    flex-1 py-4 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${clothType === "top"
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"
                      : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 border border-neutral-800"
                    }
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.38 3.4a2 2 0 0 0-2-1H5.62a2 2 0 0 0-2 1L2 9h20l-1.62-5.6z" />
                    <path d="M4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9" />
                  </svg>
                  Top Wear
                </button>
                <button
                  onClick={() => setClothType("bottom")}
                  className={`
                    flex-1 py-4 px-6 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2
                    ${clothType === "bottom"
                      ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25"
                      : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-neutral-300 border border-neutral-800"
                    }
                  `}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2v20" />
                    <path d="M18 2v20" />
                    <path d="M6 12h12" />
                    <path d="M6 2h12" />
                  </svg>
                  Bottom Wear
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={handleSwap}
                disabled={!personImage || !clothImage || status === "uploading" || status === "queued" || status === "processing"}
                className={`
                  w-full relative py-5 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden
                  ${(!personImage || !clothImage)
                    ? "bg-neutral-900 text-neutral-600 cursor-not-allowed"
                    : "bg-white text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                  }
                `}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {status === "idle" && (
                    <>
                      <span>Generate Try-On</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7" /><path d="M12 19V5" /></svg>
                    </>
                  )}
                  {status === "uploading" && "Uploading..."}
                  {status === "queued" && "Queued..."}
                  {status === "processing" && "Processing..."}
                  {status === "completed" && "Generate Another"}
                  {status === "failed" && "Try Again"}
                </span>
              </button>
            </div>
          </div>

          {/* Result Section */}
          <div className="relative">
            <div className="sticky top-12 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Result</h2>
                {status !== "idle" && (
                  <div className="flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800">
                    <div className={`w-2 h-2 rounded-full ${status === "completed" ? "bg-emerald-500" :
                      status === "failed" ? "bg-red-500" : "bg-indigo-500 animate-pulse"
                      }`} />
                    <span className="capitalize">{status}</span>
                  </div>
                )}
              </div>

              <div className={`
                relative aspect-[3/4] rounded-3xl bg-neutral-900/50 border border-neutral-800 overflow-hidden flex items-center justify-center
                ${status === "completed" ? "shadow-[0_0_100px_-30px_rgba(79,70,229,0.2)]" : ""}
              `}>
                {status === "idle" ? (
                  <div className="text-center p-8 text-neutral-600">
                    <div className="mb-4 opacity-20">
                      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                    </div>
                    <p>Your generated image will appear here</p>
                  </div>
                ) : status === "failed" ? (
                  <div className="text-center p-8 max-w-md">
                    <div className="w-12 h-12 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </div>
                    <h3 className="text-red-400 font-medium mb-2">Generation Failed</h3>
                    <p className="text-neutral-500 text-sm">{error}</p>
                  </div>
                ) : status === "completed" && resultImage ? (
                  resultImage.startsWith("data:image") || resultImage.startsWith("http") ? (
                    <div className="relative w-full h-full group">
                      <Image
                        src={resultImage}
                        alt="Result"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
                        <a
                          href={resultImage}
                          download="try-on-result.png"
                          className="px-6 py-2 bg-white text-black rounded-full font-medium text-sm hover:bg-neutral-200 transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Download Image
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="text-neutral-400 p-6 text-sm overflow-auto max-h-full w-full text-left font-mono bg-black/50">
                      <p className="mb-2 text-emerald-400 font-bold">Job Completed!</p>
                      <pre className="whitespace-pre-wrap break-words">{resultImage}</pre>
                    </div>
                  )
                ) : (
                  <LoadingCarousel elapsedTime={elapsedTime} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-900 bg-black py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} Virtual Try-On AI. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
