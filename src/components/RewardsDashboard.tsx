
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, CreditCard, Target } from "lucide-react";

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

  const getCardsByType = () => {
    const types: { [key: string]: number } = {};
    userCards.forEach(card => {
      types[card.type] = (types[card.type] || 0) + 1;
    });
    return types;
  };

  const cardTypes = getCardsByType();

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Portfolio Overview</h2>
        <p className="text-sm md:text-base text-gray-600">Your credit card portfolio at a glance</p>
      </div>

      {/* Mobile-optimized Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium">Total Cards</CardTitle>
              <CreditCard className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg md:text-2xl font-bold">{getTotalCards()}</div>
            <p className="text-blue-100 text-xs">
              {getTotalCards() === 0 ? 'Add cards' : 'Active cards'}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium">Avg. Rate</CardTitle>
              <TrendingUp className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg md:text-2xl font-bold">{getAverageRewardRate()}%</div>
            <p className="text-green-100 text-xs">
              Portfolio avg
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium">Annual Fees</CardTitle>
              <DollarSign className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg md:text-2xl font-bold">${getTotalAnnualFees()}</div>
            <p className="text-purple-100 text-xs">
              Total yearly
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardHeader className="pb-2 md:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs md:text-sm font-medium">Efficiency</CardTitle>
              <Target className="h-3 w-3 md:h-4 md:w-4" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg md:text-2xl font-bold">
              {userCards.length > 0 ? '85%' : '0%'}
            </div>
            <p className="text-orange-100 text-xs">
              Optimization
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Card Types Breakdown - Mobile optimized */}
      {userCards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Portfolio Breakdown</CardTitle>
            <CardDescription className="text-sm">Your cards by type and category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Card Types</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(cardTypes).map(([type, count]) => (
                    <Badge key={type} variant="secondary" className="capitalize text-xs">
                      {type.replace('-', ' ')}: {count}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3 text-sm md:text-base">Recent Activity</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded text-sm">
                    <span className="text-gray-600">Portfolio created</span>
                    <Badge variant="outline" className="text-xs">Today</Badge>
                  </div>
                  {userCards.length > 0 && (
                    <div className="flex items-center justify-between py-2 px-3 bg-green-50 rounded text-sm">
                      <span className="text-gray-600">Ready for recommendations</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Smart Recommendations - Mobile optimized */}
      {userCards.length > 0 && (
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-900 text-lg md:text-xl">💡 Smart Recommendations</CardTitle>
            <CardDescription className="text-indigo-700 text-sm">
              Based on your current portfolio, here are some optimization tips:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 p-1 rounded">
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-indigo-900">Maximize Category Spending</p>
                  <p className="text-xs md:text-sm text-indigo-700">Use the recommendation engine for each purchase to optimize rewards.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="bg-indigo-100 p-1 rounded">
                  <Target className="h-4 w-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-indigo-900">Track Your Progress</p>
                  <p className="text-xs md:text-sm text-indigo-700">Monitor your monthly rewards to see the impact of smart card usage.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
