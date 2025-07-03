
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, BarChart3, TrendingUp, Plus, Upload } from "lucide-react";

export const SpendingAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Spending Analytics</h1>
        <p className="text-gray-600">Analyze your spending patterns and trends</p>
      </div>

      {/* Empty State */}
      <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Data to Analyze Yet</h3>
          <p className="text-gray-600 mb-6">Upload your transaction history or start using your registered cards to see detailed spending analytics, category breakdowns, and trends.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              <Upload className="w-4 h-4 mr-2" />
              Upload Bank Records
            </Button>
            <Button variant="outline" className="hover:bg-white hover:shadow-md transform hover:scale-105 transition-all duration-200">
              <Plus className="w-4 h-4 mr-2" />
              Add Cards
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview Cards - What will be available */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <PieChart className="w-4 h-4 mr-2" />
              Category Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-gray-400">Available after first transactions</div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Monthly Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-gray-400">Available after first transactions</div>
          </CardContent>
        </Card>

        <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <BarChart3 className="w-4 h-4 mr-2" />
              Card Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xs text-gray-400">Available after first transactions</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
