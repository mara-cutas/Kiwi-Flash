
"use client";

import type { Flashcard } from '@/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Flag, RotateCcw, CheckCircle, ListChecks, Leaf, Footprints, Sprout, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FlashcardViewProps {
  card: Flashcard;
  onFlagToggle: (id: string) => void;
  totalCards: number;
  currentIndex: number;
}

export function FlashcardView({ card, onFlagToggle, totalCards, currentIndex }: FlashcardViewProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setIsFlipped(false); // Reset flip state when card changes
    setShowHint(false); // Reset hint state
    setCurrentImageIndex(0); // Reset image slideshow
  }, [card.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) { // If flipping to back, hide hint
        setShowHint(false);
    }
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % card.imageSrc.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card from flipping
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + card.imageSrc.length) % card.imageSrc.length);
  };
  
  const getFactIcon = (index: number) => {
    const icons = [Leaf, Footprints, Sprout, CheckCircle, ListChecks];
    return icons[index % icons.length];
  };

  const hasMultipleImages = card.imageSrc.length > 1;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div 
        className={cn(
          "relative rounded-xl shadow-2xl transition-transform duration-700 ease-in-out cursor-pointer",
          "min-h-[400px] md:min-h-[500px]" // Ensure consistent height
        )}
        style={{ transformStyle: 'preserve-3d' }}
        onClick={handleFlip}
      >
        {/* Front of the card */}
        <Card 
          className={cn(
            "absolute w-full h-full backface-hidden transition-transform duration-700 ease-in-out"
          )}
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <CardContent className="p-4 md:p-6 w-full h-full flex flex-col">
            <div className="relative flex-1 w-full h-full rounded-lg overflow-hidden group">
              <Image
                src={card.imageSrc[currentImageIndex] || `/images/placeholder.png`}
                alt={card.imageAlt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentIndex === 0} 
                data-ai-hint={card.dataAiHint}
              />
               {hasMultipleImages && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handlePrevImage}
                    className="absolute left-1 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleNextImage}
                    className="absolute right-1 top-1/2 -translate-y-1/2 z-10 h-10 w-10 bg-black/30 text-white hover:bg-black/50 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
                    {card.imageSrc.map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          'h-2 w-2 rounded-full bg-white/50 transition-colors',
                          index === currentImageIndex && 'bg-white'
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="text-center flex-shrink-0 mt-4">
              <p className="text-sm text-muted-foreground">Tap card to reveal</p>
              {!showHint && (
                 <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setShowHint(true);}} className="mt-2 text-xs text-accent hover:text-accent-foreground">
                    Need a hint? ({card.name.substring(0,1)}...)
                </Button>
              )}
              {showHint && (
                <p className="mt-2 text-lg font-semibold text-primary">{card.name.substring(0, Math.ceil(card.name.length / 2))}...</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back of the card */}
        <Card
          className={cn(
            "absolute w-full h-full backface-hidden flex flex-col justify-start items-center transition-transform duration-700 ease-in-out"
          )}
           style={{ transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)' }}
        >
          <CardContent className="p-4 md:p-6 w-full h-full flex flex-col text-left overflow-y-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3 md:mb-4 text-center">{card.name}</h2>
            <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-card-foreground">
              {card.facts.map((fact, index) => {
                const IconComponent = getFactIcon(index);
                return (
                  <li key={index} className="flex items-start">
                    <IconComponent className="w-5 h-5 mr-2 mt-1 shrink-0 text-accent" />
                    <span>{fact}</span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Flag Button - Positioned outside the flipping mechanism for consistent access */}
      <div className="mt-6 flex justify-center items-center">
        <Button
            variant={card.isFlagged ? "default" : "outline"}
            size="lg"
            onClick={(e) => {
            e.stopPropagation(); // Prevent card flip if button is on the card face area
            onFlagToggle(card.id);
            }}
            className="group"
        >
            <Flag className={cn(
                "mr-2 h-5 w-5",
                card.isFlagged ? "fill-current text-primary-foreground" : "text-primary group-hover:fill-current group-hover:text-primary-foreground"
            )} />
            {card.isFlagged ? 'Flagged for Review' : 'Flag for Review'}
        </Button>
      </div>
      <style jsx global>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
            transform: rotateY(0deg);
        }
      `}</style>
    </div>
  );
}
