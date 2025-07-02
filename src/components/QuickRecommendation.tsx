
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Star, TrendingUp, DollarSign, Sparkles, MapPin, Clock, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { detectCategory, getCategoryConfidence, getSuggestedAmount } from "@/utils/categoryDetection";

const SPENDING_CATEGORIES = [
  { value: 'dining', label: 'Dining & Restaurants', icon: '🍽️' },
  { value: 'gas', label: 'Gas Stations', icon: '⛽' },
  { value: 'groceries', label: 'Groceries', icon: '🛒' },
  { value: 'travel', label: 'Travel & Hotels', icon: '✈️' },
  { value: 'online', label: 'Online Shopping', icon: '🛍️' },
  { value: 'streaming', label: 'Streaming Services', icon: '📺' },
  { value: 'general', label: 'General Purchases', icon: '💳' }
];

export const QuickRecommendation = ({ userCards }) => {
  const [spendingAmount, setSpendingAmount] = useState('');
  const [spendingCategory, setSpendingCategory] = useState('');
  const [merchantInput, setMerchantInput] = useState('');
  const [detectedCategory, setDetectedCategory] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [suggestions, setSuggestions] = useState([]);
  const [recommendation, setRecommendation] = useState(null);
  const [comparisonResults, setComparisonResults] = useState([]);
  const { toast } = useToast();

  // Smart category detection when merchant input changes
  useEffect(() => {
    if (merchantInput.trim()) {
      const detected = detectCategory(merchantInput);
      if (detected) {
        setDetectedCategory(detected);
        const conf = getCategoryConfidence(merchantInput, detected);
        setConfidence(conf);
        
        // Auto-select category if confidence is high
        if (conf > 50) {
          setSpendingCategory(detected);
          const amounts = getSuggestedAmount(detected);
          setSuggestions(amounts);
        }
      } else {
        setDetectedCategory('');
        setConfidence(0);
      }
    }
  }, [merchantInput]);

  // Update suggestions when category changes
  useEffect(() => {
    if (spendingCategory) {
      const amounts = getSuggestedAmount(spendingCategory);
      setSuggestions(amounts);
    }
  }, [spendingCategory]);

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

    // Enhanced recommendation with comparison
    const results = compareAllCards(parseFloat(spendingAmount), spendingCategory, userCards);
    setComparisonResults(results);
    
    const bestCard = results[0];
    setRecommendation({
      card: bestCard.card,
      estimatedReward: bestCard.reward,
      rewardType: bestCard.card.type === 'cashback' ? 'cashback' : 'points',
      reasoning: generateReasoning(bestCard.card, spendingCategory, bestCard.reward, merchantInput),
      confidence: confidence
    });

    // Success toast with personality
    toast({
      title: "🎯 Perfect Match Found!",
      description: `Your ${bestCard.card.name} will earn you $${bestCard.reward.toFixed(2)}!`,
    });
  };

  const compareAllCards = (amount, category, cards) => {
    return cards.map(card => {
      let rewardRate = parseFloat(card.rewardRate) || 1.0;
      
      // Enhanced bonus logic
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

  const generateReasoning = (card, category, reward, merchant) => {
    const selectedCategory = SPENDING_CATEGORIES.find(cat => cat.value === category);
    const merchantText = merchant ? ` at ${merchant}` : '';
    
    if (card.bonusCategory === category) {
      return `${card.name} offers bonus rewards for ${selectedCategory?.label.toLowerCase()}${merchantText}, making it your top earning choice! 🚀`;
    } else {
      return `${card.name} has the highest base reward rate among your cards${merchantText}, maximizing your earnings for this purchase. 💰`;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Zap className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Smart Card Finder</h2>
        <p className="text-gray-600">Tell us where you're shopping, and we'll find your best card instantly!</p>
      </div>

      <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
            Smart Purchase Detection
          </CardTitle>
          <CardDescription>
            Just tell us where you're shopping - we'll handle the rest! ✨
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Smart Merchant Input */}
          <div>
            <Label htmlFor="merchant" className="flex items-center mb-2">
              <MapPin className="h-4 w-4 mr-1 text-purple-500" />
              Where are you shopping?
            </Label>
            <Input
              id="merchant"
              value={merchantInput}
              onChange={(e) => setMerchantInput(e.target.value)}
              placeholder="e.g., Starbucks, Shell Gas Station, Target..."
              className="transition-all duration-200 focus:ring-2 focus:ring-purple-500"
            />
            
            {/* Detection Results */}
            {detectedCategory && (
              <div className="mt-2 p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-green-600 font-medium">
                      🤖 Detected: {SPENDING_CATEGORIES.find(c => c.value === detectedCategory)?.label}
                    </span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {confidence.toFixed(0)}% confident
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Amount Input with Smart Suggestions */}
            <div>
              <Label htmlFor="amount" className="flex items-center mb-2">
                <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                Spending Amount
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={spendingAmount}
                onChange={(e) => setSpendingAmount(e.target.value)}
                placeholder="100.00"
                className="transition-all duration-200 focus:ring-2 focus:ring-green-500"
              />
              
              {/* Smart Amount Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs text-gray-500 mb-1">💡 Popular amounts:</div>
                  <div className="flex flex-wrap gap-1">
                    {suggestions.map((amount) => (
                      <Button
                        key={amount}
                        variant="outline"
                        size="sm"
                        className="h-6 px-2 text-xs hover:bg-green-50 hover:border-green-300 transition-all duration-200"
                        onClick={() => setSpendingAmount(amount.toString())}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Category Selection */}
            <div>
              <Label htmlFor="category" className="flex items-center mb-2">
                <Star className="h-4 w-4 mr-1 text-blue-500" />
                Category
              </Label>
              <Select value={spendingCategory} onValueChange={setSpendingCategory}>
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {SPENDING_CATEGORIES.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <span className="flex items-center">
                        <span className="mr-2">{category.icon}</span>
                        {category.label}
                        {category.value === detectedCategory && (
                          <Badge className="ml-2 bg-green-100 text-green-700 text-xs">
                            AI Pick
                          </Badge>
                        )}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button 
            onClick={getRecommendation}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
            size="lg"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            🚀 Find My Best Card
          </Button>
        </CardContent>
      </Card>

      {/* Results Section */}
      {recommendation && (
        <div className="space-y-4">
          {/* Winner Card */}
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01]">
            <CardHeader>
              <CardTitle className="flex items-center text-green-800">
                <CreditCard className="h-5 w-5 mr-2" />
                🏆 Your Best Choice
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{recommendation.card.name}</h3>
                    <p className="text-gray-600">{recommendation.card.bank}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-800 mb-1">Winner</Badge>
                    <div className="text-2xl font-bold text-green-600">
                      ${recommendation.estimatedReward.toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">earned</div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-3">
                  <h4 className="font-medium text-green-900 mb-1 flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    Why this card rocks:
                  </h4>
                  <p className="text-sm text-green-800">{recommendation.reasoning}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          {comparisonResults.length > 1 && (
            <Card className="border border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Clock className="h-5 w-5 mr-2" />
                  📊 All Your Cards Compared
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {comparisonResults.map((result, index) => (
                    <div key={result.card.id} className="bg-white rounded-lg p-3 flex justify-between items-center shadow-sm">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3 ${
                          index === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          #{index + 1}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{result.card.name}</div>
                          <div className="text-sm text-gray-500">
                            {result.rewardRate.toFixed(1)}% rate
                            {result.isBonus && <span className="text-green-600 ml-1">🎯 Bonus!</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">${result.reward.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">reward</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Empty State */}
      {userCards.length === 0 && (
        <Card className="text-center py-12 border-2 border-dashed border-gray-300">
          <CardContent>
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              🚀 Ready to Get Started?
            </h3>
            <p className="text-gray-600 mb-6">
              Add your credit cards first to unlock smart recommendations!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
