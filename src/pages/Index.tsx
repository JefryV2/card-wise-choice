
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Search, Bell, User, Home, Zap, Target } from "lucide-react";
import { CreditCardManager } from "@/components/CreditCardManager";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { AICardScanner } from "@/components/AICardScanner";

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile App Header */}
      <header className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">CardWise</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0 rounded-full">
            <User className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <div className="space-y-6 p-4">
            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Smart Spending</h2>
              <p className="text-blue-100 mb-4">Get the best rewards on every purchase</p>
              <Button 
                onClick={() => setActiveTab('scan')}
                className="bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-xl px-6"
              >
                <Search className="w-4 h-4 mr-2" />
                Find Best Card
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="rounded-2xl border-0 shadow-sm bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-600 text-sm font-medium">This Month</span>
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-900">$247</div>
                  <div className="text-green-600 text-xs">Rewards Earned</div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border-0 shadow-sm bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 text-sm font-medium">Portfolio</span>
                    <CreditCard className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{userCards.length}</div>
                  <div className="text-blue-600 text-xs">Active Cards</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <Card className="rounded-xl border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Grocery Purchase</div>
                        <div className="text-sm text-gray-500">Chase Freedom earned 5% back</div>
                      </div>
                      <div className="text-green-600 font-bold">+$12.50</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Gas Station</div>
                        <div className="text-sm text-gray-500">Discover it earned 2% back</div>
                      </div>
                      <div className="text-blue-600 font-bold">+$3.20</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Get Started */}
            {userCards.length === 0 && (
              <Card className="rounded-2xl border-0 shadow-sm bg-gradient-to-br from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Add Your First Card</h3>
                  <p className="text-gray-600 mb-4 text-sm">Start maximizing your rewards by adding your credit cards</p>
                  <Button 
                    onClick={() => setActiveTab('cards')}
                    className="bg-purple-600 hover:bg-purple-700 rounded-xl px-6"
                  >
                    Add Card
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="p-4">
            <CreditCardManager 
              userCards={userCards}
              onAddCard={addCard}
              onRemoveCard={removeCard}
            />
          </div>
        )}

        {activeTab === 'scan' && (
          <div className="p-4">
            <RecommendationEngine userCards={userCards} />
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-4">
            <RewardsDashboard userCards={userCards} />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-colors ${
              activeTab === 'home' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-colors ${
              activeTab === 'cards' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-medium">Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('scan')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-colors ${
              activeTab === 'scan' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-xs font-medium">Find</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-colors ${
              activeTab === 'rewards' 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-500'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs font-medium">Rewards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
