
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Home, Target, Scan, User, Settings } from "lucide-react";
import { CreditCardManager } from "@/components/CreditCardManager";
import { QuickRecommendation } from "@/components/QuickRecommendation";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { AICardScanner } from "@/components/AICardScanner";
import { CardDropdown } from "@/components/CardDropdown";

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
      {/* Native Mobile Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">CardWise</h1>
        </div>
        
        <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
          <Settings className="w-4 h-4 text-gray-600" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-6">
            {/* Quick Action Card */}
            <Card className="bg-gray-900 text-white border-0">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-2">Ready to spend?</h2>
                <p className="text-gray-300 mb-4 text-sm">Get instant card recommendation</p>
                <Button 
                  onClick={() => setActiveTab('recommend')}
                  className="bg-white text-gray-900 hover:bg-gray-100 w-full font-medium"
                >
                  Get Card Recommendation
                </Button>
              </CardContent>
            </Card>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">{userCards.length}</div>
                  <div className="text-xs text-gray-500">Cards</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">$247</div>
                  <div className="text-xs text-gray-500">This Month</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">2.1%</div>
                  <div className="text-xs text-gray-500">Avg Rate</div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 bg-white border-gray-200"
                  onClick={() => setActiveTab('scan')}
                >
                  <Scan className="w-5 h-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Add Card with AI</div>
                    <div className="text-xs text-gray-500">Scan card details automatically</div>
                  </div>
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 bg-white border-gray-200"
                  onClick={() => setActiveTab('cards')}
                >
                  <Plus className="w-5 h-5 mr-3 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium text-gray-900">Browse Popular Cards</div>
                    <div className="text-xs text-gray-500">Choose from pre-selected options</div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            {userCards.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Recent Recommendations</h3>
                <Card className="border-0 bg-white">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">Grocery Shopping</div>
                        <div className="text-sm text-gray-500">Recommended: Chase Freedom</div>
                      </div>
                      <div className="text-sm text-gray-600">+$12.50</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Get Started */}
            {userCards.length === 0 && (
              <Card className="border-0 bg-gray-100">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-gray-500" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Start Building Your Portfolio</h3>
                  <p className="text-gray-600 text-sm mb-4">Add your first card to get personalized recommendations</p>
                  <Button 
                    onClick={() => setActiveTab('cards')}
                    className="bg-gray-900 hover:bg-gray-800 text-white"
                  >
                    Browse Cards
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'recommend' && (
          <div className="p-4">
            <QuickRecommendation userCards={userCards} />
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="p-4 space-y-6">
            <CardDropdown onAddCard={addCard} userCards={userCards} />
            <CreditCardManager 
              userCards={userCards}
              onAddCard={addCard}
              onRemoveCard={removeCard}
            />
          </div>
        )}

        {activeTab === 'scan' && (
          <div className="p-4 space-y-4">
            <AICardScanner onCardScanned={addCard} />
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-4">
            <RewardsDashboard userCards={userCards} />
          </div>
        )}
      </main>

      {/* Native Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 safe-area-pb">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('recommend')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'recommend' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500'
            }`}
          >
            <Target className="w-5 h-5" />
            <span className="text-xs">Recommend</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'cards' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">Cards</span>
          </button>

          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-lg transition-colors ${
              activeTab === 'rewards' 
                ? 'bg-gray-100 text-gray-900' 
                : 'text-gray-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Rewards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
