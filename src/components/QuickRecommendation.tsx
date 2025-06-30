
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, CreditCard, ArrowRight, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QUICK_CATEGORIES = [
  { id: 'dining', label: 'Dining', icon: '🍽️', description: 'Restaurants & Food' },
  { id: 'gas', label: 'Gas', icon: '⛽', description: 'Gas Stations' },
  { id: 'groceries', label: 'Groceries', icon: '🛒', description: 'Supermarkets' },
  { id: 'travel', label: 'Travel', icon: '✈️', description: 'Hotels & Flights' },
  { id: 'online', label: 'Online', icon: '🛍️', description: 'Online Shopping' },
  { id: 'general', label: 'General', icon: '💳', description: 'Everything Else' }
];

const AMOUNT_PRESETS = [
  { value: 25, label: '$25' },
  { value: 50, label: '$50' },
  { value: 100, label: '$100' },
  { value: 200, label: '$200+' }
];

export const QuickRecommendation = ({ userCards }: { userCards: any[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [recommendation, setRecommendation] = useState(null);
  const [usePreferences, setUsePreferences] = useState(true);
  const { toast } = useToast();

  const getRecommendation = () => {
    if (!selectedCategory || !selectedAmount) {
      toast({
        title: "Select Category & Amount",
        description: "Please choose what you're buying and how much you're spending.",
        variant: "destructive"
      });
      return;
    }

    if (userCards.length === 0) {
      toast({
        title: "No Cards Available",
        description: "Add your credit cards first to get recommendations.",
        variant: "destructive"
      });
      return;
    }

    // Simple recommendation logic
    const bestCard = findBestCard(selectedAmount, selectedCategory, userCards);
    setRecommendation(bestCard);
  };

  const findBestCard = (amount: number, category: string, cards: any[]) => {
    let bestCard = cards[0];
    let bestReward = 0;

    cards.forEach(card => {
      let rewardRate = parseFloat(card.rewardRate) || 1.0;
      
      // Bonus if category matches
      if (card.bonusCategory === category) {
        rewardRate *= 2.5;
      }

      const potentialReward = amount * (rewardRate / 100);
      
      if (potentialReward > bestReward) {
        bestReward = potentialReward;
        bestCard = card;
      }
    });

    return {
      card: bestCard,
      estimatedReward: bestReward,
      category: QUICK_CATEGORIES.find(cat => cat.id === category),
      amount: selectedAmount
    };
  };

  const resetRecommendation = () => {
    setRecommendation(null);
    setSelectedCategory('');
    setSelectedAmount(0);
  };

  if (recommendation) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Your Best Card</h2>
          <Button variant="ghost" size="sm" onClick={resetRecommendation}>
            New Search
          </Button>
        </div>

        <Card className="bg-gray-900 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold">{recommendation.card.name}</h3>
                <p className="text-gray-300">{recommendation.card.bank}</p>
              </div>
              <Badge className="bg-white text-gray-900">Best Choice</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">You'll earn:</span>
                <span className="text-2xl font-bold">${recommendation.estimatedReward.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Purchase:</span>
                <span className="text-gray-300">
                  {recommendation.category?.icon} {recommendation.category?.label} • ${recommendation.amount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Ready to pay?</div>
                <div className="text-sm text-gray-500">Use your {recommendation.card.name}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Recommendation</h2>
        <p className="text-gray-600 text-sm">Tell us what you're buying for instant card suggestion</p>
      </div>

      {/* Preference Toggle */}
      <Card className="border-0 bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Use my preferences</div>
              <div className="text-xs text-gray-500">Prioritize your reward goals</div>
            </div>
            <Button
              variant={usePreferences ? "default" : "outline"}
              size="sm"
              onClick={() => setUsePreferences(!usePreferences)}
              className={usePreferences ? "bg-gray-900" : ""}
            >
              {usePreferences ? "ON" : "OFF"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">What are you buying?</h3>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`h-16 justify-start ${
                selectedCategory === category.id 
                  ? "bg-gray-900 text-white" 
                  : "bg-white border-gray-200"
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="text-left">
                <div className="flex items-center space-x-2">
                  <span>{category.icon}</span>
                  <span className="font-medium">{category.label}</span>
                </div>
                <div className="text-xs opacity-70">{category.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Amount Selection */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3">How much are you spending?</h3>
        <div className="grid grid-cols-2 gap-3">
          {AMOUNT_PRESETS.map((preset) => (
            <Button
              key={preset.value}
              variant={selectedAmount === preset.value ? "default" : "outline"}
              className={`h-12 ${
                selectedAmount === preset.value 
                  ? "bg-gray-900 text-white" 
                  : "bg-white border-gray-200"
              }`}
              onClick={() => setSelectedAmount(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Get Recommendation Button */}
      <Button 
        onClick={getRecommendation}
        className="w-full bg-gray-900 hover:bg-gray-800 h-12"
        disabled={!selectedCategory || !selectedAmount}
      >
        <Target className="w-4 h-4 mr-2" />
        Get Card Recommendation
      </Button>

      {/* Empty State */}
      {userCards.length === 0 && (
        <Card className="border-0 bg-gray-50">
          <CardContent className="p-6 text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">No Cards Added</h3>
            <p className="text-gray-600 text-sm">Add your credit cards to get recommendations</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
