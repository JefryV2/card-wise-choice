
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Target, CreditCard, ArrowRight, Check, MapPin, Clock, TrendingUp, Sparkles, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QUICK_CATEGORIES = [
  { id: 'dining', label: 'Dining', icon: '🍽️', description: 'Restaurants & Food', commonAmounts: [25, 50, 75] },
  { id: 'gas', label: 'Gas', icon: '⛽', description: 'Gas Stations', commonAmounts: [40, 60, 80] },
  { id: 'groceries', label: 'Groceries', icon: '🛒', description: 'Supermarkets', commonAmounts: [50, 100, 150] },
  { id: 'travel', label: 'Travel', icon: '✈️', description: 'Hotels & Flights', commonAmounts: [200, 500, 1000] },
  { id: 'online', label: 'Online', icon: '🛍️', description: 'Online Shopping', commonAmounts: [30, 75, 150] },
  { id: 'general', label: 'General', icon: '💳', description: 'Everything Else', commonAmounts: [25, 50, 100] }
];

const LOCATION_SUGGESTIONS = {
  dining: ['Nearby restaurants', 'Fast food chains', 'Coffee shops'],
  gas: ['Shell nearby', 'BP station', 'Costco gas'],
  groceries: ['Whole Foods', 'Target', 'Local supermarket'],
  travel: ['Airport purchases', 'Hotel bookings', 'Uber/Lyft'],
  online: ['Amazon', 'Popular retailers', 'Subscription services']
};

export const QuickRecommendation = ({ userCards }: { userCards: any[] }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [usePreferences, setUsePreferences] = useState(true);
  const { toast } = useToast();

  // Load purchase history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('purchaseHistory');
    if (history) {
      setPurchaseHistory(JSON.parse(history));
    }
  }, []);

  const getSmartAmountSuggestions = (category: string) => {
    const categoryData = QUICK_CATEGORIES.find(cat => cat.id === category);
    const recentPurchases = purchaseHistory
      .filter((p: any) => p.category === category)
      .slice(0, 3)
      .map((p: any) => p.amount);
    
    return [...new Set([...categoryData?.commonAmounts || [], ...recentPurchases])].sort((a, b) => a - b);
  };

  const getMultipleRecommendations = () => {
    if (!selectedCategory || (!selectedAmount && !customAmount)) {
      toast({
        title: "Missing Details 🤔",
        description: "Please select a category and amount to get smart recommendations.",
        variant: "destructive"
      });
      return;
    }

    if (userCards.length === 0) {
      toast({
        title: "No Cards Yet 💳",
        description: "Add your credit cards first to unlock personalized magic!",
        variant: "destructive"
      });
      return;
    }

    const amount = customAmount ? parseFloat(customAmount) : selectedAmount;
    const allRecommendations = getAllCardRecommendations(amount, selectedCategory, userCards);
    setRecommendations(allRecommendations);
    setShowComparison(true);

    // Save to purchase history
    const newPurchase = {
      category: selectedCategory,
      amount,
      timestamp: Date.now(),
      recommendedCard: allRecommendations[0]?.card.name
    };
    const updatedHistory = [newPurchase, ...purchaseHistory.slice(0, 9)];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem('purchaseHistory', JSON.stringify(updatedHistory));
  };

  const getAllCardRecommendations = (amount: number, category: string, cards: any[]) => {
    const recommendations = cards.map(card => {
      let rewardRate = parseFloat(card.rewardRate) || 1.0;
      let bonusMultiplier = 1;
      
      // Enhanced bonus logic
      if (card.bonusCategory === category) {
        bonusMultiplier = 2.5;
        rewardRate *= bonusMultiplier;
      }

      const estimatedReward = amount * (rewardRate / 100);
      
      return {
        card,
        estimatedReward,
        rewardRate: rewardRate,
        bonusMultiplier,
        category: QUICK_CATEGORIES.find(cat => cat.id === category),
        amount
      };
    });

    return recommendations.sort((a, b) => b.estimatedReward - a.estimatedReward);
  };

  const resetRecommendation = () => {
    setRecommendations([]);
    setSelectedCategory('');
    setSelectedAmount(0);
    setCustomAmount('');
    setShowComparison(false);
  };

  const getRecentCategoryInsight = (category: string) => {
    const recentPurchases = purchaseHistory.filter((p: any) => p.category === category);
    if (recentPurchases.length === 0) return null;
    
    const avgAmount = recentPurchases.reduce((sum: number, p: any) => sum + p.amount, 0) / recentPurchases.length;
    return `💡 You usually spend ~$${Math.round(avgAmount)} on ${QUICK_CATEGORIES.find(c => c.id === category)?.label.toLowerCase()}`;
  };

  if (showComparison && recommendations.length > 0) {
    const topCard = recommendations[0];
    
    return (
      <div className="space-y-4 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              Your Smart Recommendations 
              <Sparkles className="w-5 h-5 ml-2 text-yellow-500" />
            </h2>
            <p className="text-sm text-gray-600">Ranked by potential rewards</p>
          </div>
          <Button variant="ghost" size="sm" onClick={resetRecommendation} className="hover:bg-gray-100">
            ✨ New Search
          </Button>
        </div>

        {/* Top Recommendation - Hero Card */}
        <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold flex items-center">
                  🏆 {topCard.card.name}
                </h3>
                <p className="text-gray-300">{topCard.card.bank}</p>
              </div>
              <Badge className="bg-yellow-500 text-yellow-900 font-bold">
                Best Choice
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-3xl font-bold text-green-400">
                  ${topCard.estimatedReward.toFixed(2)}
                </div>
                <div className="text-gray-300 text-sm">You'll earn</div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-blue-400">
                  {topCard.rewardRate.toFixed(1)}% rate
                </div>
                <div className="text-gray-300 text-sm">
                  {topCard.bonusMultiplier > 1 ? '🔥 Bonus category!' : 'Base rate'}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Purchase:</span>
                <span className="text-gray-300">
                  {topCard.category?.icon} {topCard.category?.label} • ${topCard.amount}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location-Based Tips */}
        {LOCATION_SUGGESTIONS[selectedCategory as keyof typeof LOCATION_SUGGESTIONS] && (
          <Card className="border-0 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium text-blue-900">📍 Popular nearby options</div>
                  <div className="text-sm text-blue-700 mt-1">
                    {LOCATION_SUGGESTIONS[selectedCategory as keyof typeof LOCATION_SUGGESTIONS]?.join(' • ')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alternative Recommendations */}
        {recommendations.length > 1 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-900">Alternative options</h3>
            {recommendations.slice(1, 3).map((rec, index) => (
              <Card key={index} className="border-0 bg-white shadow-sm hover:shadow-md transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-900">{rec.card.name}</div>
                      <div className="text-sm text-gray-500">{rec.card.bank}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">${rec.estimatedReward.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{rec.rewardRate.toFixed(1)}% rate</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Ready to Pay CTA */}
        <Card className="border-0 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-green-900">🎯 Ready to maximize rewards?</div>
                <div className="text-sm text-green-700">Use your {topCard.card.name} for this purchase</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const smartAmounts = selectedCategory ? getSmartAmountSuggestions(selectedCategory) : [];
  const categoryInsight = selectedCategory ? getRecentCategoryInsight(selectedCategory) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
          Smart Recommendation ✨
        </h2>
        <p className="text-gray-600 text-sm">AI-powered suggestions based on your spending patterns</p>
      </div>

      {/* Preference Toggle */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900 flex items-center">
                🎯 Smart preferences
                <Sparkles className="w-4 h-4 ml-1 text-purple-500" />
              </div>
              <div className="text-xs text-gray-500">Uses your history & goals for better suggestions</div>
            </div>
            <Button
              variant={usePreferences ? "default" : "outline"}
              size="sm"
              onClick={() => setUsePreferences(!usePreferences)}
              className={usePreferences ? "bg-purple-600 hover:bg-purple-700" : ""}
            >
              {usePreferences ? "ON" : "OFF"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Selection */}
      <div>
        <h3 className="font-medium text-gray-900 mb-3 flex items-center">
          🛍️ What are you buying?
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {QUICK_CATEGORIES.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`h-16 justify-start transition-all duration-200 ${
                selectedCategory === category.id 
                  ? "bg-gray-900 text-white shadow-lg scale-105" 
                  : "bg-white border-gray-200 hover:bg-gray-50 hover:scale-102"
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
        
        {categoryInsight && (
          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-800">{categoryInsight}</div>
          </div>
        )}
      </div>

      {/* Smart Amount Selection */}
      {selectedCategory && (
        <div>
          <h3 className="font-medium text-gray-900 mb-3 flex items-center">
            💰 How much are you spending?
          </h3>
          
          {/* Smart Amount Suggestions */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {smartAmounts.slice(0, 6).map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? "default" : "outline"}
                className={`h-12 transition-all duration-200 ${
                  selectedAmount === amount 
                    ? "bg-gray-900 text-white shadow-md scale-105" 
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
              >
                ${amount}
              </Button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600">Or enter custom amount:</div>
            <Input
              type="number"
              placeholder="Enter amount..."
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(0);
              }}
              className="bg-white border-gray-200"
            />
          </div>
        </div>
      )}

      {/* Get Recommendation Button */}
      <Button 
        onClick={getMultipleRecommendations}
        className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 h-12 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        disabled={!selectedCategory || (!selectedAmount && !customAmount)}
      >
        <Target className="w-4 h-4 mr-2" />
        ✨ Get Smart Recommendations
      </Button>

      {/* Recent Purchase History */}
      {purchaseHistory.length > 0 && (
        <Card className="border-0 bg-gray-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Clock className="w-4 h-4 text-gray-600" />
              <div className="font-medium text-gray-900">Recent purchases</div>
            </div>
            <div className="space-y-2">
              {purchaseHistory.slice(0, 3).map((purchase: any, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <div className="flex items-center space-x-2">
                    <span>{QUICK_CATEGORIES.find(c => c.id === purchase.category)?.icon}</span>
                    <span className="text-gray-700">
                      {QUICK_CATEGORIES.find(c => c.id === purchase.category)?.label}
                    </span>
                  </div>
                  <div className="text-gray-600">${purchase.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {userCards.length === 0 && (
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-purple-50">
          <CardContent className="p-6 text-center">
            <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">🚀 Ready to get started?</h3>
            <p className="text-gray-600 text-sm">Add your credit cards to unlock AI-powered recommendations</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
