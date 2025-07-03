
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xl shadow-sm">
              {categoryInfo.icon}
            </div>
            <div>
              <div className="font-medium text-gray-900">{transaction.merchant}</div>
              <div className="text-sm text-gray-500 flex items-center space-x-2">
                <span>{transaction.date}</span>
                <Badge className={`text-xs ${categoryInfo.color}`}>
                  {transaction.category}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-gray-900">${transaction.amount.toFixed(2)}</div>
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
