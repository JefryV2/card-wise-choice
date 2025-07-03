
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Calendar, PieChart as PieChartIcon } from "lucide-react";

const generateAnalyticsData = () => {
  // Monthly spending data for the last 6 months
  const monthlyData = [
    { month: 'Jul', spending: 2850, rewards: 85.5, transactions: 45 },
    { month: 'Aug', spending: 3200, rewards: 96.0, transactions: 52 },
    { month: 'Sep', spending: 2950, rewards: 88.5, transactions: 48 },
    { month: 'Oct', spending: 3450, rewards: 103.5, transactions: 58 },
    { month: 'Nov', spending: 3100, rewards: 93.0, transactions: 51 },
    { month: 'Dec', spending: 3650, rewards: 109.5, transactions: 62 }
  ];

  // Category breakdown
  const categoryData = [
    { name: 'Dining', value: 890, percentage: 25.8, color: '#FF8C00' },
    { name: 'Groceries', value: 654, percentage: 19.0, color: '#32CD32' },
    { name: 'Gas', value: 432, percentage: 12.5, color: '#4169E1' },
    { name: 'Shopping', value: 567, percentage: 16.4, color: '#9932CC' },
    { name: 'Entertainment', value: 298, percentage: 8.6, color: '#FF1493' },
    { name: 'Travel', value: 445, percentage: 12.9, color: '#00CED1' },
    { name: 'Utilities', value: 234, percentage: 6.8, color: '#FFD700' }
  ];

  // Weekly spending pattern
  const weeklyPattern = [
    { day: 'Mon', amount: 45 },
    { day: 'Tue', amount: 62 },
    { day: 'Wed', amount: 38 },
    { day: 'Thu', amount: 71 },
    { day: 'Fri', amount: 89 },
    { day: 'Sat', amount: 134 },
    { day: 'Sun', amount: 98 }
  ];

  return { monthlyData, categoryData, weeklyPattern };
};

const chartConfig = {
  spending: {
    label: "Spending",
    color: "#2563eb",
  },
  rewards: {
    label: "Rewards",
    color: "#10b981",
  },
};

export const SpendingAnalytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const { monthlyData, categoryData, weeklyPattern } = generateAnalyticsData();

  const currentMonth = monthlyData[monthlyData.length - 1];
  const previousMonth = monthlyData[monthlyData.length - 2];
  const spendingChange = ((currentMonth.spending - previousMonth.spending) / previousMonth.spending * 100);
  const rewardsChange = ((currentMonth.rewards - previousMonth.rewards) / previousMonth.rewards * 100);

  const totalSpending = monthlyData.reduce((sum, month) => sum + month.spending, 0);
  const totalRewards = monthlyData.reduce((sum, month) => sum + month.rewards, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Spending Analytics</h1>
          <p className="text-gray-600">Insights into your spending patterns</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="w-4 h-4 text-gray-500" />
              <span className="text-xs text-gray-500">TOTAL SPENDING</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${totalSpending.toLocaleString()}</div>
            <div className={`text-xs flex items-center mt-1 ${spendingChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {spendingChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(spendingChange).toFixed(1)}% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-gray-500">TOTAL REWARDS</span>
            </div>
            <div className="text-2xl font-bold text-emerald-600">${totalRewards.toFixed(2)}</div>
            <div className={`text-xs flex items-center mt-1 ${rewardsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {rewardsChange >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(rewardsChange).toFixed(1)}% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="text-xs text-gray-500">AVG MONTHLY</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">${(totalSpending / monthlyData.length).toFixed(0)}</div>
            <div className="text-xs text-gray-500 mt-1">Per month</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 mb-2">
              <CreditCard className="w-4 h-4 text-purple-500" />
              <span className="text-xs text-gray-500">REWARD RATE</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{((totalRewards / totalSpending) * 100).toFixed(1)}%</div>
            <div className="text-xs text-gray-500 mt-1">Overall rate</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="trends">Spending Trends</TabsTrigger>
          <TabsTrigger value="categories">By Category</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Monthly Spending & Rewards
              </CardTitle>
              <CardDescription>Track your spending and rewards over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="spending" fill="var(--color-spending)" name="Spending" />
                    <Bar dataKey="rewards" fill="var(--color-rewards)" name="Rewards" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChartIcon className="w-5 h-5 mr-2" />
                  Spending by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${category.value}</div>
                        <div className="text-sm text-gray-500">{category.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Spending Pattern</CardTitle>
              <CardDescription>Average spending by day of the week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyPattern}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">Weekend</div>
                  <div className="text-sm text-gray-500 mb-4">Highest spending days</div>
                  <div className="text-2xl font-bold text-gray-900">${(weeklyPattern[5].amount + weeklyPattern[6].amount).toFixed(0)}</div>
                  <div className="text-sm text-gray-500">Avg per weekend</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">Weekday</div>
                  <div className="text-sm text-gray-500 mb-4">Most consistent spending</div>
                  <div className="text-2xl font-bold text-gray-900">${(weeklyPattern.slice(0, 5).reduce((sum, day) => sum + day.amount, 0) / 5).toFixed(0)}</div>
                  <div className="text-sm text-gray-500">Avg per weekday</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
