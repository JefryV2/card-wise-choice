import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { 
  IoWalletOutline, 
  IoTrendingUpOutline, 
  IoHomeOutline,
  IoDocumentTextOutline,
  IoCloudUploadOutline,
  IoDownloadOutline,
  IoCardOutline,
  IoPieChartOutline,
  IoFlagOutline,
  IoScanOutline,
  IoSettingsOutline,
  IoStatsChartOutline,
  IoAddOutline,
  IoGiftOutline
} from 'react-icons/io5';
import { CreditCardManager } from "@/components/CreditCardManager";
import { QuickRecommendation } from "@/components/QuickRecommendation";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { AICardScanner } from "@/components/AICardScanner";
import { CardDropdown } from "@/components/CardDropdown";
import { Settings as SettingsComponent } from "@/components/Settings";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SpendingAnalytics } from "@/components/SpendingAnalytics";
import { BudgetTracking } from "@/components/BudgetTracking";
import { BankRecordUpload } from "@/components/BankRecordUpload";
import { DataExport } from "@/components/DataExport";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userCards, setUserCards] = useState([]);
  const [uploadedTransactions, setUploadedTransactions] = useState([]);

  const addCard = (card: any) => {
    setUserCards([...userCards, { ...card, id: Date.now() }]);
  };

  const removeCard = (cardId: number) => {
    setUserCards(userCards.filter((card: any) => card.id !== cardId));
  };

  const handleTransactionsImported = (transactions: any[]) => {
    setUploadedTransactions(transactions);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Header */}
      <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
            <IoWalletOutline className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">CardWise</h1>
            <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center">
              <IoTrendingUpOutline className="w-3 h-3 mr-1" />
              Smart spending companion
            </div>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-10 h-10 p-0 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all duration-200"
          onClick={() => setActiveTab('settings')}
        >
          <IoSettingsOutline className="w-4 h-4 text-slate-600 dark:text-slate-400" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' && (
          <div className="p-4 space-y-6 animate-fade-in">
            {/* Welcome Section */}
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <IoStatsChartOutline className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Welcome to CardWise! 👋</h2>
              <p className="text-slate-600 dark:text-slate-400">Your smart companion for maximizing credit card rewards</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">{userCards.length}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Cards</div>
                  {userCards.length > 0 && <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mt-1"></div>}
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">$0</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Rewards</div>
                  <div className="text-xs text-slate-400">Get started</div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-indigo-600">{uploadedTransactions.length}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Transactions</div>
                  <div className="text-xs text-slate-400">{uploadedTransactions.length > 0 ? 'Ready to view' : 'Upload bank records'}</div>
                </CardContent>
              </Card>
            </div>

            {/* Primary Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
                Let's get you started! 
                <Sparkles className="w-4 h-4 ml-2 text-blue-500" />
              </h3>
              
              {/* Get Started Flow */}
              {userCards.length === 0 ? (
                <>
                  <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1 flex items-center">
                            🚀 Add Your First Card
                          </h3>
                          <p className="text-blue-100 text-sm">Start by adding your credit cards to unlock all features</p>
                        </div>
                        <Button 
                          onClick={() => setActiveTab('cards')}
                          className="bg-white text-blue-700 hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                        >
                          <IoAddOutline className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 gap-3">
                    <Button
                      variant="outline"
                      className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                      onClick={() => setActiveTab('scan')}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
                          <IoScanOutline className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">✨ Scan Card with AI</div>
                          <div className="text-xs text-gray-500">Quick setup using camera</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </Button>

                    <Button
                      variant="outline"
                      className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                      onClick={() => setActiveTab('upload')}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                          <IoCloudUploadOutline className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">📤 Upload Bank Records</div>
                          <div className="text-xs text-gray-500">Import your transaction history</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Get Recommendation - Primary CTA */}
                  <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold mb-1 flex items-center">
                            🎯 Get Card Recommendation
                          </h3>
                          <p className="text-blue-100 text-sm">Find the perfect card for your next purchase</p>
                        </div>
                        <Button 
                          onClick={() => setActiveTab('recommend')}
                          className="bg-white text-blue-700 hover:bg-blue-50 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                          <IoDocumentTextOutline className="w-5 h-5 text-white" />
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
                      onClick={() => setActiveTab('rewards')}
                    >
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-3">
                          <IoGiftOutline className="w-5 h-5 text-white" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium text-gray-900">🏆 View Rewards</div>
                          <div className="text-xs text-gray-500">Track your earnings</div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </>
              )}

              {/* Always Available Actions */}
              <div className="grid grid-cols-1 gap-3">
                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('analytics')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                      <IoPieChartOutline className="w-5 h-5 text-white" />
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
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center mr-3">
                      <IoFlagOutline className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">💰 Budget Tracking</div>
                      <div className="text-xs text-gray-500">Set and monitor spending goals</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>

                <Button
                  variant="outline"
                  className="h-16 justify-between bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white hover:shadow-md transform hover:scale-[1.01] transition-all duration-200"
                  onClick={() => setActiveTab('export')}
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center mr-3">
                      <IoDownloadOutline className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">📊 Export Data</div>
                      <div className="text-xs text-gray-500">Download your financial reports</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Button>
              </div>
            </div>

            {/* Getting Started Card for Empty State */}
            {userCards.length === 0 && (
              <Card className="border border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IoWalletOutline className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">🚀 Ready to Get Started?</h3>
                  <p className="text-gray-600 text-sm mb-4">Add your credit cards to unlock personalized recommendations and reward tracking</p>
                  <div className="flex space-x-2">
                    <Button 
                      onClick={() => setActiveTab('scan')}
                      className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
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
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <QuickRecommendation userCards={userCards} />
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <BankRecordUpload onTransactionsImported={handleTransactionsImported} />
          </div>
        )}

        {activeTab === 'export' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <DataExport />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <TransactionHistory uploadedTransactions={uploadedTransactions} onNavigateToUpload={() => setActiveTab('upload')} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-4 animate-fade-in">
            <div className="mb-4">
              <Button
                variant="ghost"
                onClick={() => setActiveTab('home')}
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
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
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
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
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
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
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
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
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
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
                className="mb-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                ← Back to Home
              </Button>
            </div>
            <SettingsComponent />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'home' 
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <IoHomeOutline className="w-5 h-5" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'transactions' 
                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <IoDocumentTextOutline className="w-5 h-5" />
            <span className="text-xs font-medium">History</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'upload' 
                ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <IoCloudUploadOutline className="w-5 h-5" />
            <span className="text-xs font-medium">Upload</span>
          </button>

          <button
            onClick={() => setActiveTab('export')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'export' 
                ? 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <IoDownloadOutline className="w-5 h-5" />
            <span className="text-xs font-medium">Export</span>
          </button>

          <button
            onClick={() => setActiveTab('cards')}
            className={`flex flex-col items-center space-y-1 py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 ${
              activeTab === 'cards' 
                ? 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 shadow-sm' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <IoCardOutline className="w-5 h-5" />
            <span className="text-xs font-medium">Cards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
