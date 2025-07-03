
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionSummary } from "./TransactionSummary";
import { TransactionFilters } from "./TransactionFilters";
import { TransactionCard } from "./TransactionCard";

export const TransactionHistory = () => {
  const [transactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const categories = [
    { name: 'Dining', icon: '🍽️', color: 'bg-orange-100 text-orange-700' },
    { name: 'Groceries', icon: '🛒', color: 'bg-green-100 text-green-700' },
    { name: 'Gas', icon: '⛽', color: 'bg-blue-100 text-blue-700' },
    { name: 'Shopping', icon: '🛍️', color: 'bg-purple-100 text-purple-700' },
    { name: 'Entertainment', icon: '🎬', color: 'bg-pink-100 text-pink-700' },
    { name: 'Travel', icon: '✈️', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'Utilities', icon: '⚡', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Healthcare', icon: '🏥', color: 'bg-red-100 text-red-700' }
  ];

  React.useEffect(() => {
    let filtered = transactions;

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (sortBy === 'amount') {
      filtered = filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'rewards') {
      filtered = filtered.sort((a, b) => b.rewards - a.rewards);
    } else {
      filtered = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    setFilteredTransactions(filtered);
  }, [searchTerm, selectedCategory, sortBy, transactions]);

  const totalSpent = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const totalRewards = filteredTransactions.reduce((sum, t) => sum + t.rewards, 0);

  const getCategoryInfo = (categoryName: string) => {
    return categories.find(c => c.name === categoryName) || { icon: '💳', color: 'bg-gray-100 text-gray-700' };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Transaction History</h1>
        <p className="text-gray-600">Track your spending and rewards</p>
      </div>

      <TransactionSummary 
        transactionCount={filteredTransactions.length}
        totalSpent={totalSpent}
        totalRewards={totalRewards}
      />

      {transactions.length > 0 && (
        <TransactionFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={categories}
        />
      )}

      {transactions.length === 0 ? (
        <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Receipt className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Transactions Yet</h3>
            <p className="text-gray-600 mb-6">Start by uploading your bank records or making your first purchase with a registered card to see your transaction history here.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Upload Bank Records
              </Button>
              <Button variant="outline" className="hover:bg-white hover:shadow-md transform hover:scale-105 transition-all duration-200">
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              categoryInfo={getCategoryInfo(transaction.category)}
            />
          ))}
        </div>
      )}

      {transactions.length > 0 && filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Receipt className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
