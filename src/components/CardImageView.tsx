
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardImageViewProps {
  src: string;
  alt: string;
}

export function CardImageView({ src, alt }: CardImageViewProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden bg-muted/20">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      )}
      <Image
        key={src}
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-contain transition-opacity duration-500 rounded-lg",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
