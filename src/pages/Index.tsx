
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ArrowUp, ArrowDown } from "lucide-react";
import { CreditCardManager } from "@/components/CreditCardManager";
import { RecommendationEngine } from "@/components/RecommendationEngine";
import { RewardsDashboard } from "@/components/RewardsDashboard";

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userCards, setUserCards] = useState([]);

  const addCard = (card) => {
    setUserCards([...userCards, { ...card, id: Date.now() }]);
  };

  const removeCard = (cardId) => {
    setUserCards(userCards.filter(card => card.id !== cardId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CardWise</h1>
                <p className="text-sm text-gray-600">Smart Credit Card Optimizer</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'cards', label: 'My Cards' },
              { id: 'recommendations', label: 'Get Recommendation' }
            ].map((tab) => (
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

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Maximize Your Credit Card Rewards
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Get personalized recommendations on which credit card to use for every purchase, 
                based on your spending patterns and reward preferences.
              </p>
            </div>

            <RewardsDashboard userCards={userCards} />

            {userCards.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Add Your First Credit Card
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start optimizing your rewards by adding your credit cards to your portfolio.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('cards')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Add Credit Card
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'cards' && (
          <CreditCardManager 
            userCards={userCards}
            onAddCard={addCard}
            onRemoveCard={removeCard}
          />
        )}

        {activeTab === 'recommendations' && (
          <RecommendationEngine userCards={userCards} />
        )}
      </main>
    </div>
  );
};

export default Index;
