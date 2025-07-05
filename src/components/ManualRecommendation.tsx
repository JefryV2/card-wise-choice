import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, TrendingUp, DollarSign, CheckCircle } from "lucide-react";
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

interface ManualRecommendationProps {
  userCards: any[];
  onPurchaseConfirmed: (transaction: any) => void;
}

export const ManualRecommendation = ({ userCards, onPurchaseConfirmed }: ManualRecommendationProps) => {
  const [spendingAmount, setSpendingAmount] = useState('');
  const [spendingCategory, setSpendingCategory] = useState('');
  const [merchantName, setMerchantName] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { toast } = useToast();

  const getRecommendation = () => {
    if (!spendingAmount || !spendingCategory) {
      toast({
        title: "Missing Information",
        description: "Please enter amount and select category.",
        variant: "destructive"
      });
      return;
    }

    if (userCards.length === 0) {
      toast({
        title: "No Cards Available",
        description: "Please add your credit cards first.",
        variant: "destructive"
      });
      return;
    }

    const results = compareAllCards(parseFloat(spendingAmount), spendingCategory, userCards);
    const bestCard = results[0];
    
    setRecommendation({
      card: bestCard.card,
      estimatedReward: bestCard.reward,
      rewardType: bestCard.card.type === 'cashback' ? 'cashback' : 'points',
      reasoning: generateReasoning(bestCard.card, spendingCategory, bestCard.reward),
      amount: parseFloat(spendingAmount),
      category: spendingCategory,
      merchant: merchantName || 'Unknown Merchant'
    });
  };

  const compareAllCards = (amount, category, cards) => {
    return cards.map(card => {
      let rewardRate = parseFloat(card.rewardRate) || 1.0;
      
      if (card.bonusCategory === category) {
        rewardRate *= 2.5;
      }

      const reward = amount * (rewardRate / 100);
      
      return {
        card,
        reward,
        rewardRate,
        isBonus: card.bonusCategory === category
      };
    }).sort((a, b) => b.reward - a.reward);
  };

  const generateReasoning = (card, category, reward) => {
    const selectedCategory = SPENDING_CATEGORIES.find(cat => cat.value === category);
    
    if (card.bonusCategory === category) {
      return `${card.name} offers bonus rewards for ${selectedCategory?.label.toLowerCase()}, making it your best choice.`;
    } else {
      return `${card.name} has the highest base reward rate among your cards.`;
    }
  };

  const handlePurchaseConfirmation = (confirmed) => {
    if (confirmed && recommendation) {
      const transaction = {
        id: Date.now(),
        date: new Date().toLocaleDateString(),
        merchant: recommendation.merchant,
        category: recommendation.category,
        amount: recommendation.amount,
        rewards: recommendation.estimatedReward,
        card: recommendation.card.name,
        status: 'completed'
      };
      
      onPurchaseConfirmed(transaction);
      
      toast({
        title: "Purchase Added",
        description: `Transaction added to your history.`,
      });
      
      // Reset form
      setSpendingAmount('');
      setSpendingCategory('');
      setMerchantName('');
      setRecommendation(null);
      setShowConfirmation(false);
    } else {
      setShowConfirmation(false);
    }
  };

  if (showConfirmation && recommendation) {
    return (
      <Card className="ios-card border-2 border-blue-200 rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <CheckCircle className="h-5 w-5 mr-2 text-blue-600" />
            Confirm Purchase
          </CardTitle>
          <CardDescription>
            Are you making this purchase?
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Merchant:</span>
                <span className="font-medium">{recommendation.merchant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Amount:</span>
                <span className="font-medium">${recommendation.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Card:</span>
                <span className="font-medium">{recommendation.card.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Rewards:</span>
                <span className="font-medium text-green-600">+${recommendation.estimatedReward.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              onClick={() => handlePurchaseConfirmation(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-2xl h-12"
            >
              Yes, I Made This Purchase
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handlePurchaseConfirmation(false)}
              className="flex-1 rounded-2xl h-12"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Find Best Card</h2>
        <p className="text-slate-600">Enter your purchase details to get a recommendation</p>
      </div>

      <Card className="ios-card border-0 bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
            Purchase Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="merchant">Merchant Name (Optional)</Label>
            <Input
              id="merchant"
              value={merchantName}
              onChange={(e) => setMerchantName(e.target.value)}
              placeholder="e.g., Starbucks, Target..."
              className="mt-1 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={spendingAmount}
                onChange={(e) => setSpendingAmount(e.target.value)}
                placeholder="100.00"
                className="mt-1 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
              />
            </div>
            
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={spendingCategory} onValueChange={setSpendingCategory}>
                <SelectTrigger className="mt-1 h-12 rounded-2xl border-slate-200 bg-slate-50/50">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-slate-200 bg-white shadow-xl">
                  {SPENDING_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value} className="rounded-xl">
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
            className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-2xl"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Get Recommendation
          </Button>
        </CardContent>
      </Card>

      {recommendation && (
        <Card className="ios-card border-2 border-green-200 bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-lg shadow-xl rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CreditCard className="h-5 w-5 mr-2" />
              Recommended Card
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/90 rounded-2xl p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{recommendation.card.name}</h3>
                  <p className="text-slate-600">{recommendation.card.bank}</p>
                </div>
                <Badge className="bg-green-100 text-green-800 rounded-xl">Best Choice</Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Estimated Reward:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${recommendation.estimatedReward.toFixed(2)}
                  </span>
                </div>
                
                <div className="bg-blue-50 rounded-2xl p-3">
                  <p className="text-sm text-blue-800">{recommendation.reasoning}</p>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => setShowConfirmation(true)}
              className="w-full bg-green-600 hover:bg-green-700 h-12 rounded-2xl"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Continue to Purchase Confirmation
            </Button>
          </CardContent>
        </Card>
      )}

      {userCards.length === 0 && (
        <Card className="ios-card text-center py-12 border-2 border-dashed border-slate-300 rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl">
          <CardContent>
            <CreditCard className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No Credit Cards Available
            </h3>
            <p className="text-slate-600 mb-6">
              Add your credit cards first to get recommendations.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
