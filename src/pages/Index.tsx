
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowUp, ArrowDown, Menu } from "lucide-react";
import { CreditCardManager } from "@/components/CreditCardManager";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { AICardScanner } from "@/components/AICardScanner";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userCards, setUserCards] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const addCard = (card: any) => {
    setUserCards([...userCards, { ...card, id: Date.now() }]);
  };

  const removeCard = (cardId: number) => {
    setUserCards(userCards.filter((card: any) => card.id !== cardId));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', shortLabel: 'Home' },
    { id: 'cards', label: 'My Cards', shortLabel: 'Cards' },
    { id: 'recommendations', label: 'Recommendations', shortLabel: 'Recs' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Mobile-Optimized Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-2xl font-bold text-gray-900">CardWise</h1>
                <p className="text-xs md:text-sm text-gray-600 hidden sm:block">Smart Credit Card Optimizer</p>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-2">
            <div className="flex flex-col space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowMobileMenu(false);
                  }}
                  className={`py-2 px-3 text-left rounded font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation */}
      <nav className="bg-white border-b hidden md:block">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg md:hidden z-10">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-1 text-center transition-colors ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500'
              }`}
            >
              <div className="text-xs font-medium">{tab.shortLabel}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Mobile optimized spacing */}
      <main className="container mx-auto px-4 py-4 pb-20 md:pb-8 md:px-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Maximize Your Credit Card Rewards
              </h2>
              <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized recommendations on which credit card to use for every purchase, 
                based on your spending patterns and reward preferences.
              </p>
            </div>

            <RewardsDashboard userCards={userCards} />

            {userCards.length === 0 && (
              <Card className="text-center py-8 md:py-12">
                <CardContent>
                  <CreditCard className="h-12 w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    Add Your First Credit Card
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-6">
                    Start optimizing your rewards by adding your credit cards to your portfolio.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('cards')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full md:w-auto"
                  >
                    Add Credit Card
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'cards' && (
          <div className="space-y-6">
            <AICardScanner onCardScanned={addCard} />
            <CreditCardManager 
              userCards={userCards}
              onAddCard={addCard}
              onRemoveCard={removeCard}
            />
          </div>
        )}

        {activeTab === 'recommendations' && (
          <RecommendationEngine userCards={userCards} />
        )}
      </main>
    </div>
  );
};

export default Index;
