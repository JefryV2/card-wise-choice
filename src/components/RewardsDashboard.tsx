
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Target, Trophy, TrendingUp, Calendar, PieChart, ArrowUp, ArrowDown } from "lucide-react";

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

  // Mock data for demonstration - in real app this would come from transaction data
  const getMonthlyRecap = () => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return {
      month: currentMonth,
      totalSpent: 3240,
      totalRewards: 247.50,
      transactionCount: 42,
      topCategory: 'Dining',
      topCategorySpend: 890,
      avgTransactionSize: 77
    };
  };

  const getNextMonthPrediction = () => {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    const monthName = nextMonth.toLocaleString('default', { month: 'long' });
    
    return {
      month: monthName,
      predictedSpend: 3450,
      predictedRewards: 265,
      growthRate: 7.2,
      recommendation: 'Consider using your dining card more for bonus categories'
    };
  };

  const recap = getMonthlyRecap();
  const prediction = getNextMonthPrediction();

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

      {/* Monthly Recap */}
      <Card className="border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            {recap.month} Recap
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">${recap.totalSpent}</div>
              <div className="text-sm text-gray-500">Total Spent</div>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+12% vs last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600">${recap.totalRewards}</div>
              <div className="text-sm text-gray-500">Rewards Earned</div>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+8% vs last month</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-bold text-gray-900">{recap.transactionCount}</div>
              <div className="text-xs text-gray-500">Transactions</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-bold text-gray-900">${recap.avgTransactionSize}</div>
              <div className="text-xs text-gray-500">Avg Purchase</div>
            </div>
            <div className="bg-white rounded-lg p-3 text-center shadow-sm">
              <div className="text-lg font-bold text-purple-600">{recap.topCategory}</div>
              <div className="text-xs text-gray-500">Top Category</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Top Spending Category</div>
                <div className="text-sm text-gray-500">{recap.topCategory} - ${recap.topCategorySpend}</div>
              </div>
              <PieChart className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Month Prediction */}
      <Card className="border-0 bg-gradient-to-r from-emerald-50 to-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-emerald-600" />
            {prediction.month} Prediction
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">${prediction.predictedSpend}</div>
              <div className="text-sm text-gray-500">Predicted Spending</div>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-3 h-3 text-emerald-500 mr-1" />
                <span className="text-xs text-emerald-600">+{prediction.growthRate}% growth</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-emerald-600">${prediction.predictedRewards}</div>
              <div className="text-sm text-gray-500">Expected Rewards</div>
              <div className="flex items-center mt-1">
                <Trophy className="w-3 h-3 text-emerald-500 mr-1" />
                <span className="text-xs text-emerald-600">Optimized usage</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900 mb-1">AI Recommendation</div>
                <p className="text-sm text-gray-600">{prediction.recommendation}</p>
              </div>
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
              Top Performers This Month
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
                <div className="text-right">
                  <Badge variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                    ${(Math.random() * 100 + 50).toFixed(0)} earned
                  </Badge>
                </div>
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
            <p className="text-gray-600 text-sm">Add your credit cards to start tracking rewards and getting predictions</p>
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
              <p className="text-gray-700">Track spending patterns for better predictions</p>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2"></div>
              <p className="text-gray-700">Review monthly recap to optimize card usage</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
