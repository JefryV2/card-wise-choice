
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, CreditCard, Target, Trophy, Star } from "lucide-react";

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
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Rewards</h1>
        <p className="text-gray-600">Track your credit card portfolio performance</p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="rounded-2xl border-0 shadow-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-5 h-5 opacity-80" />
              <span className="text-xs opacity-80">CARDS</span>
            </div>
            <div className="text-2xl font-bold">{getTotalCards()}</div>
            <div className="text-xs opacity-80">Active in wallet</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-0 shadow-sm bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-5 h-5 opacity-80" />
              <span className="text-xs opacity-80">AVG RATE</span>
            </div>
            <div className="text-2xl font-bold">{getAverageRewardRate()}%</div>
            <div className="text-xs opacity-80">Reward rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Summary */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
            <div>
              <div className="font-medium text-green-900">Total Rewards</div>
              <div className="text-sm text-green-600">From all cards</div>
            </div>
            <div className="text-2xl font-bold text-green-600">$247.50</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-lg font-bold text-gray-900">${getTotalAnnualFees()}</div>
              <div className="text-xs text-gray-600">Annual fees</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-center">
              <div className="text-lg font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-600">Transactions</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Cards */}
      {userCards.length > 0 && (
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Star className="w-5 h-5 mr-2 text-purple-500" />
              Top Cards
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {userCards.slice(0, 3).map((card, index) => (
              <div key={card.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{card.name}</div>
                  <div className="text-sm text-gray-500">{card.rewardRate}% rewards</div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  ${(Math.random() * 100).toFixed(0)}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {userCards.length === 0 && (
        <Card className="rounded-2xl border-0 shadow-sm bg-gradient-to-br from-gray-50 to-gray-100">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Cards Yet</h3>
            <p className="text-gray-600 text-sm">Add your credit cards to start tracking rewards</p>
          </CardContent>
        </Card>
      )}

      {/* Quick Tips */}
      <Card className="rounded-2xl border-0 shadow-sm bg-gradient-to-br from-purple-50 to-indigo-50">
        <CardContent className="p-4">
          <h4 className="font-bold text-purple-900 mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Pro Tips
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-purple-800">Use category cards for bonus rewards</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-purple-800">Check quarterly rotating categories</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2"></div>
              <p className="text-purple-800">Track your spending to optimize rewards</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
