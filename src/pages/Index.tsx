import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
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
  IoGiftOutline,
  IoPersonOutline
} from 'react-icons/io5';
import { CreditCardManager } from "@/components/CreditCardManager";
import { ManualRecommendation } from "@/components/ManualRecommendation";
import { RewardsDashboard } from "@/components/RewardsDashboard";
import { AICardScanner } from "@/components/AICardScanner";
import { CardDropdown } from "@/components/CardDropdown";
import { Settings as SettingsComponent } from "@/components/Settings";
import { TransactionHistory } from "@/components/TransactionHistory";
import { SpendingAnalytics } from "@/components/SpendingAnalytics";
import { BudgetTracking } from "@/components/BudgetTracking";
import { BankRecordUpload } from "@/components/BankRecordUpload";
import { DataExport } from "@/components/DataExport";
import { SignUp } from "@/components/SignUp";

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userCards, setUserCards] = useState([]);
  const [uploadedTransactions, setUploadedTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cardwise_user');
    const savedCards = localStorage.getItem('cardwise_cards');
    const savedTransactions = localStorage.getItem('cardwise_transactions');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedCards) {
      setUserCards(JSON.parse(savedCards));
    }
    if (savedTransactions) {
      setUploadedTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save cards to localStorage whenever userCards changes
  useEffect(() => {
    localStorage.setItem('cardwise_cards', JSON.stringify(userCards));
  }, [userCards]);

  // Save transactions to localStorage whenever uploadedTransactions changes
  useEffect(() => {
    localStorage.setItem('cardwise_transactions', JSON.stringify(uploadedTransactions));
  }, [uploadedTransactions]);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsAnimating(false);
    }, 200);
  };

  const addCard = (card: any) => {
    setUserCards([...userCards, { ...card, id: Date.now() }]);
  };

  const removeCard = (cardId: number) => {
    setUserCards(userCards.filter((card: any) => card.id !== cardId));
  };

  const handleTransactionsImported = (transactions: any[]) => {
    setUploadedTransactions(prev => [...prev, ...transactions]);
  };

  const handlePurchaseConfirmed = (transaction: any) => {
    setUploadedTransactions(prev => [...prev, transaction]);
  };

  const handleSignUpComplete = (userData: any) => {
    setUser(userData);
  };

  // Show sign-up if no user
  if (!user) {
    return <SignUp onSignUpComplete={handleSignUpComplete} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col ios-safe-area">
      {/* Full-screen mobile header */}
      <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 border-b border-slate-200/50 shadow-sm">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center shadow-lg">
              <img 
                src="/lovable-uploads/080528f8-06b5-47d5-9110-a3a1093875ca.png" 
                alt="CardWise" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">CardWise</h1>
              <div className="text-xs text-slate-600 flex items-center">
                <IoTrendingUpOutline className="w-3 h-3 mr-1" />
                Hello, {user.name.split(' ')[0]}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-12 h-12 p-0 rounded-2xl hover:bg-slate-100 transition-all duration-200"
            onClick={() => handleTabChange('settings')}
          >
            <IoSettingsOutline className="w-6 h-6 text-slate-600" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-28">
        <div className={`max-w-sm mx-auto transition-all duration-300 ease-out ${isAnimating ? 'opacity-50 transform translate-y-1' : 'opacity-100 transform translate-y-0'}`}>
          {activeTab === 'home' && (
            <div className="p-6 space-y-8">
              {/* Welcome Section */}
              <div className="text-center py-6">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
                  <IoStatsChartOutline className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Welcome Back! 👋</h2>
                <p className="text-slate-600 text-sm leading-relaxed">Smart spending companion for maximizing rewards</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-slate-800">{userCards.length}</div>
                    <div className="text-xs text-slate-600 mt-1">Cards</div>
                    {userCards.length > 0 && <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mt-2"></div>}
                  </CardContent>
                </Card>
                
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-slate-700">$0</div>
                    <div className="text-xs text-slate-600 mt-1">Rewards</div>
                    <div className="text-xs text-slate-500 mt-1">Get started</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-slate-700">{uploadedTransactions.length}</div>
                    <div className="text-xs text-slate-600 mt-1">History</div>
                    <div className="text-xs text-slate-500 mt-1">{uploadedTransactions.length > 0 ? 'Ready' : 'Upload'}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Primary Actions */}
              <div className="space-y-6">
                {/* AI Scanner - Always visible */}
                <Card className="bg-gradient-to-r from-slate-700 to-slate-800 text-white border-0 rounded-3xl shadow-xl">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-bold mb-1">✨ AI Card Scanner</h3>
                        <p className="text-slate-200 text-sm">Quick setup using camera</p>
                      </div>
                      <Button 
                        onClick={() => handleTabChange('scan')}
                        className="bg-white/20 text-white hover:bg-white/30 rounded-2xl min-w-12 min-h-12 transition-all duration-200"
                      >
                        <IoScanOutline className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {userCards.length === 0 ? (
                  <div className="space-y-4">
                    <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-3xl shadow-lg">
                      <CardContent className="p-6 text-center">
                        <h3 className="font-bold text-slate-800 mb-2">🚀 Ready to Get Started?</h3>
                        <p className="text-slate-600 text-sm mb-4 leading-relaxed">Add your credit cards to unlock personalized recommendations</p>
                        <div className="grid grid-cols-2 gap-3">
                          <Button 
                            onClick={() => handleTabChange('cards')}
                            className="bg-slate-700 hover:bg-slate-800 text-white rounded-2xl h-12 font-medium transition-all duration-200"
                          >
                            📝 Manual Add
                          </Button>
                          <Button 
                            onClick={() => handleTabChange('upload')}
                            variant="outline"
                            className="border-slate-300 text-slate-700 rounded-2xl h-12 font-medium transition-all duration-200"
                          >
                            📤 Upload
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Get Recommendation */}
                    <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 rounded-3xl shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold mb-1">Get Recommendation</h3>
                            <p className="text-emerald-50 text-sm">Find perfect card for purchase</p>
                          </div>
                          <Button 
                            onClick={() => handleTabChange('recommend')}
                            className="bg-white/20 text-white hover:bg-white/30 rounded-2xl min-w-12 min-h-12 transition-all duration-200"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Quick Access Tools */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wider px-2">Quick Access</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-2xl h-16 flex-col space-y-1 transition-all duration-200 hover:shadow-lg"
                      onClick={() => handleTabChange('transactions')}
                    >
                      <IoDocumentTextOutline className="w-5 h-5 text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">History</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-2xl h-16 flex-col space-y-1 transition-all duration-200 hover:shadow-lg"
                      onClick={() => handleTabChange('cards')}
                    >
                      <IoCardOutline className="w-5 h-5 text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Cards</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-2xl h-16 flex-col space-y-1 transition-all duration-200 hover:shadow-lg"
                      onClick={() => handleTabChange('rewards')}
                    >
                      <IoGiftOutline className="w-5 h-5 text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Rewards</span>
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-2xl h-16 flex-col space-y-1 transition-all duration-200 hover:shadow-lg"
                      onClick={() => handleTabChange('analytics')}
                    >
                      <IoPieChartOutline className="w-5 h-5 text-slate-600" />
                      <span className="text-xs font-medium text-slate-700">Analytics</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tab content remains the same but with updated back buttons */}
          {activeTab === 'recommend' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <ManualRecommendation userCards={userCards} onPurchaseConfirmed={handlePurchaseConfirmed} />
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <BankRecordUpload onTransactionsImported={handleTransactionsImported} />
            </div>
          )}

          {activeTab === 'export' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <DataExport />
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <TransactionHistory 
                uploadedTransactions={uploadedTransactions} 
                onNavigateToUpload={() => handleTabChange('upload')} 
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <SpendingAnalytics />
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <BudgetTracking />
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <CardDropdown onAddCard={addCard} userCards={userCards} />
              <div className="mt-6">
                <CreditCardManager 
                  userCards={userCards}
                  onAddCard={addCard}
                  onRemoveCard={removeCard}
                />
              </div>
            </div>
          )}

          {activeTab === 'scan' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <AICardScanner onCardScanned={addCard} />
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <RewardsDashboard userCards={userCards} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                onClick={() => handleTabChange('home')}
                className="flex items-center text-slate-600 hover:text-slate-800 transition-colors duration-200 rounded-2xl"
              >
                ← Back to Home
              </Button>
              <SettingsComponent />
              
              <Card className="bg-white/70 backdrop-blur-sm border-red-200/50 rounded-3xl mt-6">
                <CardContent className="p-6 text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem('cardwise_user');
                      localStorage.removeItem('cardwise_cards');
                      localStorage.removeItem('cardwise_transactions');
                      setUser(null);
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50 rounded-2xl"
                  >
                    <IoPersonOutline className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      {/* Enhanced Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/50 px-4 py-3 shadow-lg">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          <button
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${
              activeTab === 'home' 
                ? 'bg-slate-100 text-slate-800 transform scale-105' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <IoHomeOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => handleTabChange('transactions')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${
              activeTab === 'transactions' 
                ? 'bg-slate-100 text-slate-800 transform scale-105' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <IoDocumentTextOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">History</span>
          </button>

          <button
            onClick={() => handleTabChange('scan')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${
              activeTab === 'scan' 
                ? 'bg-slate-100 text-slate-800 transform scale-105' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <IoScanOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Scan</span>
          </button>

          <button
            onClick={() => handleTabChange('cards')}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 ${
              activeTab === 'cards' 
                ? 'bg-slate-100 text-slate-800 transform scale-105' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
            }`}
          >
            <IoCardOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Cards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
