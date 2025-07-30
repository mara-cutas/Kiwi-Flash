"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Flashcard } from '@/types';
import { mockFlashcards } from '@/data/mockFlashcards';
import { FlashcardView } from '@/components/FlashcardView';
import { Button } from '@/components/ui/button';
import { shuffleArray } from '@/lib/utils';
import { Bird, Shuffle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [deck, setDeck] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const initializeDeck = useCallback(() => {
    setDeck(shuffleArray([...mockFlashcards]));
    setCurrentCardIndex(0);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    initializeDeck();
  }, [initializeDeck]);

  const handleNextCard = () => {
    if (currentCardIndex < deck.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      // Optionally, loop back or show a "deck finished" message
      toast({
        title: "Deck Complete!",
        description: "You've seen all the cards. Shuffle to start again?",
      });
      setCurrentCardIndex(0); // Loop back to start
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(deck.length - 1); // Loop to end
    }
  };

  const handleShuffleDeck = () => {
    setDeck(shuffleArray([...deck]));
    setCurrentCardIndex(0);
    toast({
        title: "Deck Shuffled!",
        description: "The cards have been randomized.",
    });
  };

  const handleResetDeck = () => {
    initializeDeck();
    toast({
        title: "Deck Reset",
        description: "The deck has been reset to its original state and shuffled.",
    });
  };

  if (isLoading || deck.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background text-foreground">
        <Bird className="w-16 h-16 mb-4 text-primary animate-pulse" />
        <p className="text-xl">Loading Kiwi Flash Cards...</p>
      </div>
    );
  }

  const currentCard = deck[currentCardIndex];
  const progressValue = ((currentCardIndex + 1) / deck.length) * 100;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="p-4 md:p-6 shadow-md bg-card">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Bird className="w-8 h-8 md:w-10 md:h-10 text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold text-primary">Kiwi Flash</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleShuffleDeck} aria-label="Shuffle Deck">
              <Shuffle className="w-5 h-5" />
            </Button>
             <Button variant="outline" size="icon" onClick={handleResetDeck} aria-label="Reset Deck">
              <RotateCcw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center justify-center">
        <div className="w-full mb-6">
            <FlashcardView 
                card={currentCard} 
                totalCards={deck.length}
                currentIndex={currentCardIndex}
            />
        </div>
      </main>
      
      <footer className="p-4 md:p-6 bg-card shadow-up">
        <div className="container mx-auto">
            <div className="w-full max-w-xl mx-auto mb-4">
                <Progress value={progressValue} className="w-full h-3 [&>div]:bg-accent" />
                <p className="text-sm text-muted-foreground text-center mt-2">
                    Card {currentCardIndex + 1} of {deck.length}
                </p>
            </div>
            <div className="flex justify-center items-center space-x-4">
            <Button onClick={handlePreviousCard} variant="outline" size="lg" className="w-1/3 max-w-xs" disabled={deck.length <= 1}>
                <ArrowLeft className="mr-2 h-5 w-5" /> Previous
            </Button>
            <Button onClick={handleNextCard} variant="default" size="lg" className="w-1/3 max-w-xs bg-primary hover:bg-primary/90" disabled={deck.length <= 1}>
                Next <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            </div>
        </div>
      </footer>
    </div>
  );
}
