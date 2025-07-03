
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, CreditCard, Filter, Search, TrendingDown, TrendingUp, ArrowUpDown } from "lucide-react";

// Realistic transaction data
const generateTransactions = () => {
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

  const merchants = {
    'Dining': ['Starbucks', 'McDonald\'s', 'Olive Garden', 'Chipotle', 'Local Bistro', 'Pizza Hut'],
    'Groceries': ['Whole Foods', 'Safeway', 'Target', 'Costco', 'Trader Joe\'s'],
    'Gas': ['Shell', 'Chevron', 'BP', 'Exxon', '76 Station'],
    'Shopping': ['Amazon', 'Target', 'Best Buy', 'Macy\'s', 'Nike Store'],
    'Entertainment': ['Netflix', 'Spotify', 'AMC Theaters', 'Steam', 'Disney+'],
    'Travel': ['United Airlines', 'Hilton Hotels', 'Uber', 'Lyft', 'Airbnb'],
    'Utilities': ['PG&E', 'Comcast', 'AT&T', 'Verizon', 'Water District'],
    'Healthcare': ['CVS Pharmacy', 'Walgreens', 'Kaiser', 'Dr. Smith\'s Office']
  };

  const transactions = [];
  const today = new Date();

  for (let i = 0; i < 50; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);
    
    const category = categories[Math.floor(Math.random() * categories.length)];
    const merchantList = merchants[category.name];
    const merchant = merchantList[Math.floor(Math.random() * merchantList.length)];
    
    const amount = Math.floor(Math.random() * 200) + 5;
    const rewardRate = Math.random() > 0.5 ? 2.0 : 1.0;
    const rewards = (amount * rewardRate / 100);

    transactions.push({
      id: i + 1,
      date: date.toISOString().split('T')[0],
      merchant,
      category: category.name,
      amount,
      rewards: parseFloat(rewards.toFixed(2)),
      card: 'Chase Sapphire Preferred',
      status: 'posted'
    });
  }

  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const TransactionHistory = () => {
  const [transactions] = useState(generateTransactions());
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
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

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{filteredTransactions.length}</div>
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.icon} {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-32">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="rewards">Rewards</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => {
          const categoryInfo = getCategoryInfo(transaction.category);
          return (
            <Card key={transaction.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
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
        })}
      </div>

      {filteredTransactions.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Transactions Found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
