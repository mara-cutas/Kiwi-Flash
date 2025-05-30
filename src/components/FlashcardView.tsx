"use client";

import type { Flashcard } from '@/types';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card'; // Using Card for consistent styling of faces
import { Flag, RotateCcw, CheckCircle, ListChecks, Leaf, Footprints, Sprout } from 'lucide-react';
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

  useEffect(() => {
    setIsFlipped(false); // Reset flip state when card changes
    setShowHint(false); // Reset hint state
  }, [card.id]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) { // If flipping to back, hide hint
        setShowHint(false);
    }
  };
  
  const getFactIcon = (index: number) => {
    const icons = [Leaf, Footprints, Sprout, CheckCircle, ListChecks];
    return icons[index % icons.length];
  };

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
            "absolute w-full h-full backface-hidden overflow-hidden flex flex-col justify-center items-center p-6 transition-transform duration-700 ease-in-out",
            { "rotate-y-180": isFlipped }
          )}
          style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        >
          <CardContent className="p-0 w-full h-full flex flex-col justify-center items-center">
            <div className="relative w-full h-3/4 mb-4 rounded-lg overflow-hidden">
              <Image
                src={card.imageSrc}
                alt={card.imageAlt}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={currentIndex === 0} // Prioritize first image
                data-ai-hint={card.dataAiHint}
              />
            </div>
            <div className="text-center">
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
            "absolute w-full h-full backface-hidden overflow-hidden flex flex-col justify-start items-center p-6 transition-transform duration-700 ease-in-out",
            { "rotate-y-0": isFlipped } // This will be visible when isFlipped is true due to parent rotation
          )}
           style={{ transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(-180deg)' }}
        >
          <CardContent className="p-0 w-full h-full flex flex-col text-left overflow-y-auto">
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
