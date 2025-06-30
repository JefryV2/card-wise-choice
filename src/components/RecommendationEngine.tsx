
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Star, TrendingUp, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SPENDING_CATEGORIES = [
  { value: 'dining', label: 'Dining & Restaurants', icon: '🍽️' },
  { value: 'gas', label: 'Gas Stations', icon: '⛽' },
  { value: 'groceries', label: 'Groceries', icon: '🛒' },
  { value: 'travel', label: 'Travel & Hotels', icon: '✈️' },
  { value: 'online', label: 'Online Shopping', icon: '🛍️' },
  { value: 'streaming', label: 'Streaming Services', icon: '📺' },
  { value: 'general', label: 'General Purchases', icon: '💳' }
];

export const RecommendationEngine = ({ userCards }) => {
  const [spendingAmount, setSpendingAmount] = useState('');
  const [spendingCategory, setSpendingCategory] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const { toast } = useToast();

  const getRecommendation = () => {
    if (!spendingAmount || !spendingCategory) {
      toast({
        title: "Missing Information",
        description: "Please enter spending amount and select a category.",
        variant: "destructive"
      });
      return;
    }

    if (userCards.length === 0) {
      toast({
        title: "No Cards Available",
        description: "Please add your credit cards first to get recommendations.",
        variant: "destructive"
      });
      return;
    }

    // Simple recommendation logic - find best card for category
    const bestCard = findBestCard(parseFloat(spendingAmount), spendingCategory, userCards);
    setRecommendation(bestCard);
  };

  const findBestCard = (amount, category, cards) => {
    const categoryToRewards = {
      dining: 'dining',
      gas: 'gas',
      groceries: 'groceries',
      travel: 'travel',
      online: 'online',
      streaming: 'streaming',
      general: 'general'
    };

    let bestCard = cards[0];
    let bestReward = 0;

    cards.forEach(card => {
      let rewardRate = parseFloat(card.rewardRate) || 1.0;
      
      // Bonus multiplier if category matches
      if (card.bonusCategory === categoryToRewards[category]) {
        rewardRate *= 2.5; // Assume bonus categories give 2.5x more
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
      rewardType: bestCard.type === 'cashback' ? 'cashback' : 'points',
      reasoning: generateReasoning(bestCard, category, bestReward)
    };
  };

  const generateReasoning = (card, category, reward) => {
    const categoryMatch = card.bonusCategory === category;
    const selectedCategory = SPENDING_CATEGORIES.find(cat => cat.value === category);
    
    if (categoryMatch) {
      return `${card.name} offers bonus rewards for ${selectedCategory?.label.toLowerCase()}, making it the best choice for this purchase.`;
    } else {
      return `${card.name} has the highest base reward rate among your cards, earning you the most rewards for this purchase.`;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Get Card Recommendation</h2>
        <p className="text-gray-600">Tell us about your purchase to get the best card recommendation</p>
      </div>

      <Card className="border-2 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Star className="h-5 w-5 mr-2 text-yellow-500" />
            Purchase Details
          </CardTitle>
          <CardDescription>
            Enter your spending details to get a personalized recommendation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Spending Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={spendingAmount}
                onChange={(e) => setSpendingAmount(e.target.value)}
                placeholder="100.00"
              />
            </div>
            <div>
              <Label htmlFor="category">Spending Category</Label>
              <Select onValueChange={setSpendingCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SPENDING_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <span className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={getRecommendation}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Get Recommendation
          </Button>
        </CardContent>
      </Card>

      {recommendation && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CreditCard className="h-5 w-5 mr-2" />
              Recommended Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{recommendation.card.name}</h3>
                  <p className="text-gray-600">{recommendation.card.bank}</p>
                </div>
                <Badge className="bg-green-100 text-green-800">Best Choice</Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-gray-600">Estimated Reward:</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ${recommendation.estimatedReward.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-500">
                    in {recommendation.rewardType}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Why this card?</h4>
                  <p className="text-sm text-gray-600">{recommendation.reasoning}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-sm text-blue-800">
                Consider setting up this card for auto-pay in this category to maximize your rewards automatically!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {userCards.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Credit Cards Available
            </h3>
            <p className="text-gray-600 mb-6">
              Add your credit cards first to start getting personalized recommendations.
            </p>
            <Button 
              onClick={() => window.location.reload()} // Simple navigation
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Add Credit Cards
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
