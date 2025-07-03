
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Plus, AlertTriangle, CheckCircle, TrendingUp, Calendar, DollarSign, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const generateBudgetData = () => {
  return [
    {
      id: 1,
      category: 'Dining',
      icon: '🍽️',
      budget: 800,
      spent: 645,
      color: 'bg-orange-500',
      period: 'monthly'
    },
    {
      id: 2,
      category: 'Groceries',
      icon: '🛒',
      budget: 600,
      spent: 534,
      color: 'bg-green-500',
      period: 'monthly'
    },
    {
      id: 3,
      category: 'Gas',
      icon: '⛽',
      budget: 300,
      spent: 278,
      color: 'bg-blue-500',
      period: 'monthly'
    },
    {
      id: 4,
      category: 'Entertainment',
      icon: '🎬',
      budget: 200,
      spent: 245,
      color: 'bg-pink-500',
      period: 'monthly'
    },
    {
      id: 5,
      category: 'Shopping',
      icon: '🛍️',
      budget: 400,
      spent: 312,
      color: 'bg-purple-500',
      period: 'monthly'
    },
    {
      id: 6,
      category: 'Travel',
      icon: '✈️',
      budget: 500,
      spent: 189,
      color: 'bg-cyan-500',
      period: 'monthly'
    }
  ];
};

export const BudgetTracking = () => {
  const [budgets, setBudgets] = useState(generateBudgetData());
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: '',
    budget: '',
    period: 'monthly'
  });
  const { toast } = useToast();

  const categories = [
    { value: 'dining', label: 'Dining', icon: '🍽️' },
    { value: 'groceries', label: 'Groceries', icon: '🛒' },
    { value: 'gas', label: 'Gas', icon: '⛽' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'utilities', label: 'Utilities', icon: '⚡' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' }
  ];

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budget, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overBudgetCount = budgets.filter(budget => budget.spent > budget.budget).length;
  const onTrackCount = budgets.filter(budget => budget.spent <= budget.budget * 0.8).length;

  const getProgressColor = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusBadge = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 100) {
      return <Badge className="bg-red-100 text-red-700">Over Budget</Badge>;
    }
    if (percentage >= 80) {
      return <Badge className="bg-yellow-100 text-yellow-700">Warning</Badge>;
    }
    return <Badge className="bg-green-100 text-green-700">On Track</Badge>;
  };

  const handleAddBudget = () => {
    if (!newBudget.category || !newBudget.budget) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const categoryInfo = categories.find(c => c.value === newBudget.category);
    const newBudgetItem = {
      id: Date.now(),
      category: categoryInfo?.label || newBudget.category,
      icon: categoryInfo?.icon || '💰',
      budget: parseFloat(newBudget.budget),
      spent: 0,
      color: 'bg-gray-500',
      period: newBudget.period
    };

    setBudgets([...budgets, newBudgetItem]);
    setNewBudget({ category: '', budget: '', period: 'monthly' });
    setShowAddDialog(false);
    
    toast({
      title: "Budget Added",
      description: `Budget for ${categoryInfo?.label} has been created.`
    });
  };

  const remainingBudget = totalBudgeted - totalSpent;
  const overallProgress = (totalSpent / totalBudgeted) * 100;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Budget Tracking</h1>
          <p className="text-gray-600">Monitor your spending against your goals</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>Set a spending limit for a category</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newBudget.category} onValueChange={(value) => setNewBudget({...newBudget, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">Budget Amount ($)</Label>
                <Input
                  id="budget"
                  type="number"
                  value={newBudget.budget}
                  onChange={(e) => setNewBudget({...newBudget, budget: e.target.value})}
                  placeholder="500"
                />
              </div>
              <div>
                <Label htmlFor="period">Period</Label>
                <Select value={newBudget.period} onValueChange={(value) => setNewBudget({...newBudget, period: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddBudget} className="flex-1">Create Budget</Button>
                <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">Cancel</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-500">TOTAL BUDGET</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${totalBudgeted.toLocaleString()}</div>
            <div className="text-xs text-gray-500">This month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">SPENT</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${totalSpent.toLocaleString()}</div>
            <div className={`text-xs ${remainingBudget >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ${Math.abs(remainingBudget)} {remainingBudget >= 0 ? 'remaining' : 'over budget'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-xs text-gray-500">ON TRACK</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{onTrackCount}</div>
            <div className="text-xs text-gray-500">Categories</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500">OVER BUDGET</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{overBudgetCount}</div>
            <div className="text-xs text-gray-500">Categories</div>
          </CardContent>
        </Card>
      </div>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Overall Progress
            </span>
            <span className="text-sm font-normal text-gray-500">
              {overallProgress.toFixed(1)}% of total budget
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Progress value={overallProgress} className="h-3" />
            <div className="flex justify-between text-sm text-gray-500">
              <span>${totalSpent.toLocaleString()} spent</span>
              <span>${totalBudgeted.toLocaleString()} budgeted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Budget Categories */}
      <div className="grid gap-4 md:grid-cols-2">
        {budgets.map((budget) => {
          const percentage = (budget.spent / budget.budget) * 100;
          const remaining = budget.budget - budget.spent;
          
          return (
            <Card key={budget.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{budget.icon}</div>
                    <div>
                      <h3 className="font-bold text-gray-900">{budget.category}</h3>
                      <p className="text-sm text-gray-500 capitalize">{budget.period} budget</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(budget.spent, budget.budget)}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{percentage.toFixed(1)}%</span>
                  </div>
                  
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                  />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900 font-medium">${budget.spent.toLocaleString()} spent</span>
                    <span className="text-gray-500">${budget.budget.toLocaleString()} budget</span>
                  </div>

                  <div className={`text-sm font-medium ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {remaining >= 0 
                      ? `$${remaining.toLocaleString()} remaining` 
                      : `$${Math.abs(remaining).toLocaleString()} over budget`
                    }
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {budgets.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No Budgets Set</h3>
            <p className="text-gray-600 mb-4">Create your first budget to start tracking your spending goals</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Budget
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
