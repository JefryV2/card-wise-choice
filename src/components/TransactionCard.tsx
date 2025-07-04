
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

interface Transaction {
  id: number;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  rewards: number;
  card: string;
  status: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  categoryInfo: { icon: string; color: string };
}

export const TransactionCard = ({ transaction, categoryInfo }: TransactionCardProps) => {
  return (
    <Card className="ios-list-item p-0">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 flex items-center justify-center text-xl shadow-sm">
              {categoryInfo.icon}
            </div>
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">{transaction.merchant}</div>
              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center space-x-2">
                <span>{transaction.date}</span>
                <Badge className={`text-xs ${categoryInfo.color}`}>
                  {transaction.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-slate-900 dark:text-slate-100">${transaction.amount.toFixed(2)}</div>
            <div className="text-sm text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +${transaction.rewards} rewards
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
