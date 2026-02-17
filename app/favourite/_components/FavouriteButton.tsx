"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Heart } from "lucide-react";
import { handleToggleFavorite, handleCheckFavoriteStatus } from "@/lib/actions/favourite-action";
import { toast } from "react-toastify"; 

interface FavoriteButtonProps {
  propertyId: string;
  initialIsFavorited?: boolean;
  className?: string;
}

export default function FavoriteButton({
  propertyId,
  initialIsFavorited = false,
  className = "",
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // If we don't know the status, check it on mount
    const checkStatus = async () => {
      const res = await handleCheckFavoriteStatus(propertyId);
      if (res.success) setIsFavorited(res.isFavorited);
    };
    checkStatus();
  }, [propertyId]);

  const onToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const previousState = isFavorited;
    setIsFavorited(!previousState);

    startTransition(async () => {
      const result = await handleToggleFavorite(propertyId);

      if (result.success) {
        toast.success(result.message);
      } else {
        setIsFavorited(previousState);
        toast.error(result.message || "Something went wrong");
      }
    });
  };

  // Logic for conditional classes without the 'cn' utility
  const heartClasses = isFavorited 
    ? "fill-red-500 stroke-red-500" 
    : "fill-transparent stroke-gray-600 group-hover:stroke-red-400";

  return (
    <button
      onClick={onToggle}
      disabled={isPending}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-all hover:scale-110 active:scale-90 disabled:opacity-70 shadow-sm ${className}`}
      aria-label="Toggle Favorite"
    >
      <Heart className={`h-6 w-6 transition-colors duration-300 ${heartClasses}`} />
      
      {isPending && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
        </div>
      )}
    </button>
  );
}