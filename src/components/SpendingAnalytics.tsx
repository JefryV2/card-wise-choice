
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart3, TrendingUp, Plus, Upload } from "lucide-react";

export const SpendingAnalytics = () => {
  // Get transaction data from localStorage
  const transactions = JSON.parse(localStorage.getItem('cardwise_transactions') || '[]');
  const hasTransactions = transactions.length > 0;

  // Calculate category breakdown
  const categoryBreakdown = transactions.reduce((acc: any, transaction: any) => {
    const category = transaction.category || 'Other';
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += transaction.amount || 0;
    return acc;
  }, {});

  // Calculate total spending
  const totalSpending = transactions.reduce((sum: number, t: any) => sum + (t.amount || 0), 0);

  // Get top categories
  const topCategories = Object.entries(categoryBreakdown)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Spending Analytics</h1>
        <p className="text-slate-600 dark:text-slate-400">Analyze your spending patterns and trends</p>
      </div>

      {!hasTransactions ? (
        <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl shadow-lg">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No Data to Analyze Yet</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">Upload your transaction history or start using your registered cards to see detailed spending analytics, category breakdowns, and trends.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 rounded-2xl">
                <Upload className="w-4 h-4 mr-2" />
                Upload Bank Records
              </Button>
              <Button variant="outline" className="hover:bg-white hover:shadow-md transform hover:scale-105 transition-all duration-200 rounded-2xl border-slate-300 dark:border-slate-600">
                <Plus className="w-4 h-4 mr-2" />
                Add Cards
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-700 rounded-3xl shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">${totalSpending.toFixed(2)}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Spending</div>
                <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">All Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-700 rounded-3xl shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">{transactions.length}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Transactions</div>
                <div className="text-xs text-green-500 dark:text-green-400 mt-1">All Time</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-700 rounded-3xl shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">{Object.keys(categoryBreakdown).length}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Categories</div>
                <div className="text-xs text-purple-500 dark:text-purple-400 mt-1">Tracked</div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <Card className="rounded-3xl shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                <PieChart className="w-5 h-5 mr-2" />
                Category Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCategories.map(([category, amount]: any, index: number) => {
                  const percentage = ((amount / totalSpending) * 100).toFixed(1);
                  return (
                    <div key={category} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full" style={{
                          backgroundColor: ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'][index % 5]
                        }}></div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">{category}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">${amount.toFixed(2)}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Trends */}
          <Card className="rounded-3xl shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
                <TrendingUp className="w-5 h-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.slice(-5).reverse().map((transaction: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-2xl">
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{transaction.merchant || 'Purchase'}</div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">{transaction.category || 'Other'}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900 dark:text-slate-100">${transaction.amount?.toFixed(2)}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{transaction.cardUsed || 'Unknown'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
