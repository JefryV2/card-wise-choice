
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Target, Trophy, TrendingUp } from "lucide-react";

export const RewardsDashboard = ({ userCards }: { userCards: any[] }) => {
  const getTotalCards = () => userCards.length;
  
  const getAverageRewardRate = () => {
    if (userCards.length === 0) return 0;
    const totalRate = userCards.reduce((sum, card) => sum + (parseFloat(card.rewardRate) || 0), 0);
    return (totalRate / userCards.length).toFixed(1);
  };

  const getTotalAnnualFees = () => {
    return userCards.reduce((sum, card) => sum + (parseFloat(card.annualFee) || 0), 0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Rewards Overview</h1>
        <p className="text-gray-600 text-sm">Track your credit card performance</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-0 bg-gray-900 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 opacity-80" />
              <span className="text-xs opacity-80">CARDS</span>
            </div>
            <div className="text-2xl font-bold">{getTotalCards()}</div>
            <div className="text-xs opacity-80">In portfolio</div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <span className="text-xs text-gray-500">AVG RATE</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{getAverageRewardRate()}%</div>
            <div className="text-xs text-gray-500">Reward rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card className="border-0 bg-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-gray-600" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium text-gray-900">Total Rewards</div>
              <div className="text-sm text-gray-500">From all cards</div>
            </div>
            <div className="text-2xl font-bold text-gray-900">$247.50</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900">${getTotalAnnualFees()}</div>
              <div className="text-xs text-gray-500">Annual fees</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg text-center">
              <div className="text-lg font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-500">Transactions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Cards */}
      {userCards.length > 0 && (
        <Card className="border-0 bg-white">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 mr-2 text-gray-600" />
              Top Cards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {userCards.slice(0, 3).map((card, index) => (
              <div key={card.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0 ? 'bg-gray-900' : 
                  index === 1 ? 'bg-gray-600' : 'bg-gray-400'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{card.name}</div>
                  <div className="text-sm text-gray-500">{card.rewardRate}% rewards</div>
                </div>
                <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                  ${(Math.random() * 100).toFixed(0)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {userCards.length === 0 && (
        <Card className="border-0 bg-gray-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Cards Yet</h3>
            <p className="text-gray-600 text-sm">Add your credit cards to start tracking rewards</p>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="border-0 bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-bold text-gray-900 mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Optimization Tips
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Use category cards for bonus rewards</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Check quarterly rotating categories</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Track spending to optimize rewards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
