
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TransactionSummaryProps {
  transactionCount: number;
  totalSpent: number;
  totalRewards: number;
}

export const TransactionSummary = ({ transactionCount, totalSpent, totalRewards }: TransactionSummaryProps) => {
  return (
    <div className="ios-grid-3">
      <Card className="ios-card hover:shadow-md transition-all duration-200 active:scale-95">
        <CardContent className="p-4 text-center">
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">{transactionCount}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Transactions</div>
        </CardContent>
      </Card>
      <Card className="ios-card hover:shadow-md transition-all duration-200 active:scale-95">
        <CardContent className="p-4 text-center">
          <div className="text-xl font-bold text-slate-900 dark:text-slate-100">${totalSpent.toFixed(0)}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Total Spent</div>
        </CardContent>
      </Card>
      <Card className="ios-card hover:shadow-md transition-all duration-200 active:scale-95">
        <CardContent className="p-4 text-center">
          <div className="text-xl font-bold text-emerald-600">${totalRewards.toFixed(2)}</div>
          <div className="text-xs text-slate-500 dark:text-slate-400">Rewards Earned</div>
        </CardContent>
      </Card>
    </div>
  );
};
