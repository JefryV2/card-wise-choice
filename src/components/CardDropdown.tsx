import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Star, TrendingUp, Plus } from "lucide-react";

const PRE_PROGRAMMED_CARDS = [
  {
    id: 'chase-sapphire-preferred',
    name: 'Chase Sapphire Preferred',
    bank: 'Chase',
    type: 'travel',
    rewardRate: '2.0',
    annualFee: '95',
    bonusCategory: 'travel',
    perks: ['2x points on travel and dining', 'Transfer partners', '25% more value through Chase'],
    creditScore: 'Good to Excellent (670+)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
    cardColor: 'from-blue-600 to-blue-800'
  },
  {
    id: 'chase-freedom-unlimited',
    name: 'Chase Freedom Unlimited',
    bank: 'Chase',
    type: 'cashback',
    rewardRate: '1.5',
    annualFee: '0',
    bonusCategory: 'general',
    perks: ['1.5% on all purchases', 'No annual fee', '5% on travel through Chase'],
    creditScore: 'Good (650+)',
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=250&fit=crop&crop=center',
    cardColor: 'from-slate-600 to-slate-800'
  },
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash',
    bank: 'Citi',
    type: 'cashback',
    rewardRate: '2.0',
    annualFee: '0',
    bonusCategory: 'general',
    perks: ['2% on all purchases (1% when you buy, 1% when you pay)', 'No annual fee'],
    creditScore: 'Good (650+)',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop&crop=center',
    cardColor: 'from-red-600 to-red-800'
  },
  {
    id: 'amex-gold',
    name: 'American Express Gold Card',
    bank: 'American Express',
    type: 'points',
    rewardRate: '4.0',
    annualFee: '250',
    bonusCategory: 'dining',
    perks: ['4x points on dining & groceries', '$120 dining credit', 'Transfer partners'],
    creditScore: 'Good to Excellent (670+)',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=250&fit=crop&crop=center',
    cardColor: 'from-yellow-500 to-yellow-700'
  },
  {
    id: 'discover-it',
    name: 'Discover it Cash Back',
    bank: 'Discover',
    type: 'cashback',
    rewardRate: '5.0',
    annualFee: '0',
    bonusCategory: 'rotating',
    perks: ['5% rotating categories', '1% on all other purchases', 'Cashback match first year'],
    creditScore: 'Fair to Good (580+)',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center',
    cardColor: 'from-orange-500 to-orange-700'
  },
  {
    id: 'capital-one-venture',
    name: 'Capital One Venture',
    bank: 'Capital One',
    type: 'travel',
    rewardRate: '2.0',
    annualFee: '95',
    bonusCategory: 'travel',
    perks: ['2x miles on all purchases', 'Transfer partners', 'Global Entry credit'],
    creditScore: 'Good to Excellent (670+)',
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=400&h=250&fit=crop&crop=center',
    cardColor: 'from-purple-600 to-purple-800'
  }
];

const NEXT_CARD_RECOMMENDATIONS = [
  {
    id: 'amex-platinum',
    name: 'American Express Platinum',
    bank: 'American Express',
    reason: 'Premium travel benefits and luxury perks',
    annualFee: '695',
    keyBenefit: '$200 airline fee credit + airport lounge access',
    creditScore: 'Excellent (720+)'
  },
  {
    id: 'chase-sapphire-reserve',
    name: 'Chase Sapphire Reserve',
    bank: 'Chase',
    reason: 'Ultimate travel rewards and premium dining',
    annualFee: '550',
    keyBenefit: '$300 travel credit + Priority Pass lounge access',
    creditScore: 'Excellent (720+)'
  },
  {
    id: 'amex-business-platinum',
    name: 'American Express Business Platinum',
    bank: 'American Express',
    reason: 'Business expenses and travel optimization',
    annualFee: '695',
    keyBenefit: '5x points on flights + business perks',
    creditScore: 'Excellent (720+)'
  }
];

export const CardDropdown = ({ onAddCard, userCards }: { onAddCard: (card: any) => void, userCards: any[] }) => {
  const [selectedCardId, setSelectedCardId] = useState('');

  const handleAddPreProgrammedCard = () => {
    const selectedCard = PRE_PROGRAMMED_CARDS.find(card => card.id === selectedCardId);
    if (selectedCard) {
      onAddCard(selectedCard);
      setSelectedCardId('');
    }
  };

  const getNextCardRecommendation = () => {
    // Simple logic based on user's current cards
    if (userCards.length === 0) {
      return NEXT_CARD_RECOMMENDATIONS[1]; // Sapphire Reserve for beginners
    }
    
    const hasChaseCard = userCards.some((card: any) => card.bank === 'Chase');
    const hasAmexCard = userCards.some((card: any) => card.bank === 'American Express');
    
    if (hasChaseCard && !hasAmexCard) {
      return NEXT_CARD_RECOMMENDATIONS[0]; // Amex Platinum
    }
    
    if (hasAmexCard && !hasChaseCard) {
      return NEXT_CARD_RECOMMENDATIONS[1]; // Chase Sapphire Reserve
    }
    
    return NEXT_CARD_RECOMMENDATIONS[2]; // Business card
  };

  const recommendedCard = getNextCardRecommendation();

  return (
    <div className="space-y-6">
      {/* Pre-programmed Cards Dropdown */}
      <Card className="border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
            Add Popular Card
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select onValueChange={setSelectedCardId}>
            <SelectTrigger>
              <SelectValue placeholder="Choose from popular cards" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              {PRE_PROGRAMMED_CARDS.map((card) => (
                <SelectItem key={card.id} value={card.id}>
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`w-12 h-8 rounded-md bg-gradient-to-r ${card.cardColor} flex items-center justify-center shadow-sm`}>
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{card.name}</div>
                      <div className="text-sm text-gray-500">{card.rewardRate}% rewards • ${card.annualFee} annual fee</div>
                    </div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCardId && (
            <div className="bg-gray-50 rounded-lg p-4">
              {(() => {
                const card = PRE_PROGRAMMED_CARDS.find(c => c.id === selectedCardId);
                return card ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-24 h-16 rounded-lg bg-gradient-to-r ${card.cardColor} flex items-center justify-center shadow-lg`}>
                        <CreditCard className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{card.name}</h4>
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 mt-1">
                          {card.bank}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Reward Rate:</span>
                        <div className="font-medium">{card.rewardRate}%</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Annual Fee:</span>
                        <div className="font-medium">${card.annualFee}</div>
                      </div>
                    </div>

                    <div>
                      <span className="text-gray-500 text-sm">Key Perks:</span>
                      <div className="mt-1 space-y-1">
                        {card.perks.map((perk, index) => (
                          <div key={index} className="text-sm text-gray-700 flex items-start">
                            <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {perk}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-gray-500 text-sm">Credit Score Required:</span>
                      <div className="text-sm font-medium text-gray-700">{card.creditScore}</div>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          <Button 
            onClick={handleAddPreProgrammedCard}
            disabled={!selectedCardId}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Card to Portfolio
          </Button>
        </CardContent>
      </Card>

      {/* Next Card Recommendation */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-gray-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Star className="w-5 h-5 mr-2 text-blue-600" />
            Recommended Next Card
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-900">{recommendedCard.name}</h4>
                <p className="text-sm text-gray-600">{recommendedCard.bank}</p>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-gray-500 text-sm">Why this card?</span>
                <p className="text-sm text-gray-700 mt-1">{recommendedCard.reason}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-500">Annual Fee:</span>
                  <div className="font-medium">${recommendedCard.annualFee}</div>
                </div>
                <div>
                  <span className="text-gray-500">Credit Score:</span>
                  <div className="font-medium text-xs">{recommendedCard.creditScore}</div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium text-blue-900">Key Benefit</span>
                </div>
                <p className="text-sm text-blue-800 mt-1">{recommendedCard.keyBenefit}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-600 text-center">
              💡 This recommendation is based on your current card portfolio and spending patterns
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
