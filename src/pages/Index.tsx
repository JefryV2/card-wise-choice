
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, Home, Target, Scan, User, Settings, ArrowRight } from "lucide-react";
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
      {/* Header */}
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
            {/* Welcome Section */}
            <div className="text-center py-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Choose your next action</p>
            </div>

            {/* Quick Stats */}
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

            {/* Primary Actions */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-900">What would you like to do?</h3>
              
              {/* Get Recommendation - Primary CTA */}
              <Card className="bg-gray-900 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Get Card Recommendation</h3>
                      <p className="text-gray-300 text-sm">Find the best card for your purchase</p>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('recommend')}
                      className="bg-white text-gray-900 hover:bg-gray-100"
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
                  className="h-16 justify-between bg-white border-gray-200"
                  onClick={() => setActiveTab('scan')}
                >
                  <div className="flex items-center">
                    <Scan className="w-5 h-5 mr-3 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Add Card with AI</div>
                      <div className="text-xs text-gray-500">Scan card details automatically</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
                
                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white border-gray-200"
                  onClick={() => setActiveTab('cards')}
                >
                  <div className="flex items-center">
                    <Plus className="w-5 h-5 mr-3 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Manage My Cards</div>
                      <div className="text-xs text-gray-500">Add, view, or remove cards</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white border-gray-200"
                  onClick={() => setActiveTab('rewards')}
                >
                  <div className="flex items-center">
                    <Target className="w-5 h-5 mr-3 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">View Rewards</div>
                      <div className="text-xs text-gray-500">Track your earnings</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Empty State / Getting Started */}
            {userCards.length === 0 && (
              <Card className="border border-gray-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CreditCard className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">Get Started</h3>
                  <p className="text-gray-600 text-sm mb-4">Add your first card to unlock personalized recommendations</p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setActiveTab('scan')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      AI Scan
                    </Button>
                    <Button 
                      onClick={() => setActiveTab('cards')}
                      variant="outline"
                      className="flex-1"
                    >
                      Manual Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'recommend' && (
          <div className="p-4">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2"
              >
                ← Back to Home
              </Button>
            </div>
            <QuickRecommendation userCards={userCards} />
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="p-4 space-y-6">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2"
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
          <div className="p-4 space-y-4">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2"
              >
                ← Back to Home
              </Button>
            </div>
            <AICardScanner onCardScanned={addCard} />
          </div>
        )}

        {activeTab === 'rewards' && (
          <div className="p-4">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2"
              >
                ← Back to Home
              </Button>
            </div>
            <RewardsDashboard userCards={userCards} />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
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
