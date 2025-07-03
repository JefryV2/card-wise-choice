
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Home, Target, Scan, User, Settings as SettingsIcon, ArrowRight, Sparkles, BarChart3, Receipt, DollarSign } from "lucide-react";
import { CreditCardManager } from "@/components/CreditCardManager";
import { QuickRecommendation } from "@/components/QuickRecommendation";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { AICardScanner } from "@/components/AICardScanner";
import { CardDropdown } from "@/components/CardDropdown";
import { Settings } from "@/components/Settings";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SpendingAnalytics } from "@/components/SpendingAnalytics";
import { BudgetTracking } from "@/components/BudgetTracking";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userCards, setUserCards] = useState([]);

  const addCard = (card: any) => {
    setUserCards([...userCards, { ...card, id: Date.now() }]);
  };

  const removeCard = (cardId: number) => {
    setUserCards(userCards.filter((card: any) => card.id !== cardId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">CardWise</h1>
            <div className="text-xs text-gray-500 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Smart spending companion
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-10 h-10 p-0 hover:bg-gray-100 rounded-full transition-all duration-200"
          onClick={() => setActiveTab('settings')}
        >
          <SettingsIcon className="w-4 h-4 text-gray-600" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-6 animate-fade-in">
            {/* Welcome Section */}
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h2>
              <p className="text-gray-600">Ready to maximize your rewards today?</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{userCards.length}</div>
                  <div className="text-xs text-gray-500">Cards</div>
                  {userCards.length > 0 && <div className="w-2 h-2 bg-green-400 rounded-full mx-auto mt-1"></div>}
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-600">$247</div>
                  <div className="text-xs text-gray-500">This Month</div>
                  <div className="text-xs text-emerald-500 font-medium">+12% ↗</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">2.1%</div>
                  <div className="text-xs text-gray-500">Avg Rate</div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>
                </CardContent>
              </Card>
            </div>

            {/* Primary Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                What would you like to do? 
                <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />
              </h3>
              
              {/* Get Recommendation - Primary CTA */}
              <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1 flex items-center">
                        🎯 Get Card Recommendation
                      </h3>
                      <p className="text-gray-300 text-sm">Find the perfect card for your purchase</p>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('recommend')}
                      className="bg-white text-gray-900 hover:bg-gray-100 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Secondary Actions */}
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('transactions')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                      <Receipt className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">📝 Transaction History</div>
                      <div className="text-xs text-gray-500">View your spending activity</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('analytics')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">📊 Spending Analytics</div>
                      <div className="text-xs text-gray-500">Analyze your spending patterns</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('budget')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">💰 Budget Tracking</div>
                      <div className="text-xs text-gray-500">Monitor spending goals</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('scan')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                      <Scan className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">✨ Add Card with AI</div>
                      <div className="text-xs text-gray-500">Scan card details automatically</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('cards')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <Plus className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">💳 Manage My Cards</div>
                      <div className="text-xs text-gray-500">Add, view, or remove cards</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('rewards')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">🏆 View Rewards</div>
                      <div className="text-xs text-gray-500">Track your earnings</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Empty State / Getting Started */}
            {userCards.length === 0 && (
              <Card className="border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">🚀 Let's Get Started!</h3>
                  <p className="text-gray-600 text-sm mb-4">Add your first card to unlock personalized magic</p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setActiveTab('scan')}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      ✨ AI Scan
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('cards')}
                      variant="outline"
                      className="flex-1 hover:bg-white hover:shadow-md transform hover:scale-105 transition-all duration-200"
                    >
                      📝 Manual Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'recommend' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <QuickRecommendation userCards={userCards} />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <TransactionHistory />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <SpendingAnalytics />
          </div>
        )}

        {activeTab === 'budget' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <BudgetTracking />
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="p-4 space-y-6 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <CardDropdown onAddCard={addCard} userCards={userCards} />
            <CreditCardManager 
              userCards={userCards}
              onAddCard={addCard}
              onRemoveCard={removeCard}
            />
          </div>
        )}

        {activeTab === 'scan' && (
          <div className="p-4 space-y-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <AICardScanner onCardScanned={addCard} />
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <RewardsDashboard userCards={userCards} />
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-gray-100 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <Settings />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'home' 
                ? 'bg-gray-100 text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'transactions' 
                ? 'bg-gray-100 text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Receipt className="w-5 h-5" />
            <span className="text-xs font-medium">History</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'analytics' 
                ? 'bg-gray-100 text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs font-medium">Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'budget' 
                ? 'bg-gray-100 text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <DollarSign className="w-5 h-5" />
            <span className="text-xs font-medium">Budget</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'cards' 
                ? 'bg-gray-100 text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-medium">Cards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
