
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface TransactionSummaryProps {
  transactionCount: number;
  totalSpent: number;
  totalRewards: number;
}

export const TransactionSummary = ({ transactionCount, totalSpent, totalRewards }: TransactionSummaryProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{transactionCount}</div>
          <div className="text-sm text-gray-500">Transactions</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(0)}</div>
          <div className="text-sm text-gray-500">Total Spent</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-emerald-600">${totalRewards.toFixed(2)}</div>
          <div className="text-sm text-gray-500">Rewards Earned</div>
        </CardContent>
      </Card>
    </div>
  );
};
