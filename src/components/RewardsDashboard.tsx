
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Trophy, CreditCard, Plus, Gift } from "lucide-react";

interface RewardsDashboardProps {
  userCards: any[];
}

export const RewardsDashboard = ({ userCards }: RewardsDashboardProps) => {
  const hasCards = userCards && userCards.length > 0;
  
  // Calculate rewards from localStorage transactions
  const calculateRewards = () => {
    const transactions = JSON.parse(localStorage.getItem('cardwise_transactions') || '[]');
    let totalRewards = 0;
    let rewardTransactions = 0;
    
    transactions.forEach((transaction: any) => {
      if (transaction.cardUsed && transaction.amount) {
        const card = userCards.find(c => c.name === transaction.cardUsed);
        if (card) {
          const reward = (transaction.amount * card.rewardRate) / 100;
          totalRewards += reward;
          rewardTransactions += 1;
        }
      }
    });
    
    const averageRate = hasCards ? userCards.reduce((sum, card) => sum + card.rewardRate, 0) / userCards.length : 0;
    
    return {
      totalRewards: totalRewards.toFixed(2),
      rewardTransactions,
      averageRate: averageRate.toFixed(1)
    };
  };

  const rewards = calculateRewards();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Rewards Dashboard</h1>
        <p className="text-slate-600">Track your earnings and maximize your rewards</p>
      </div>

      {!hasCards ? (
        <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Start Earning Rewards</h3>
            <p className="text-slate-600 mb-6">Add your credit cards to start tracking rewards and see how much you're earning on every purchase.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 rounded-2xl">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Card
              </Button>
              <Button variant="outline" className="hover:bg-white hover:shadow-md transform hover:scale-105 transition-all duration-200 rounded-2xl">
                Learn About Rewards
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 rounded-3xl shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">${rewards.totalRewards}</div>
                <div className="text-sm text-slate-600">Total Rewards Earned</div>
                <div className="text-xs text-emerald-500 mt-1">All Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-3xl shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{rewards.rewardTransactions}</div>
                <div className="text-sm text-slate-600">Reward Transactions</div>
                <div className="text-xs text-blue-500 mt-1">All Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 rounded-3xl shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">{rewards.averageRate}%</div>
                <div className="text-sm text-slate-600">Average Reward Rate</div>
                <div className="text-xs text-purple-500 mt-1">Across All Cards</div>
              </CardContent>
            </Card>
          </div>

          {/* Cards Overview */}
          <Card className="rounded-3xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Your Reward Cards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userCards.map((card, index) => {
                  const cardTransactions = JSON.parse(localStorage.getItem('cardwise_transactions') || '[]')
                    .filter((t: any) => t.cardUsed === card.name);
                  const cardRewards = cardTransactions.reduce((sum: number, t: any) => 
                    sum + ((t.amount * card.rewardRate) / 100), 0);
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-md">
                          <CreditCard className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{card.name}</div>
                          <div className="text-sm text-slate-500">{card.bank}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900">{card.rewardRate}% back</div>
                        <div className="text-sm text-slate-500">${cardRewards.toFixed(2)} earned</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* No Transactions Message */}
          {rewards.rewardTransactions === 0 && (
            <Card className="border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">Start Using Your Cards</h3>
                    <p className="text-sm text-slate-600 mb-2">Once you start making purchases or upload transaction history, you'll see your reward earnings here.</p>
                    <p className="text-xs text-slate-500">Upload bank records to see historical reward data instantly.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};
