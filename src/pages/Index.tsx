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

  useEffect(() => {
    // Check if user is logged in
    const savedUser = localStorage.getItem('cardwise_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setIsAnimating(false);
    }, 150);
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col ios-safe-area">
      {/* iPhone-optimized Header */}
      <header className="ios-header sticky top-0 z-50 px-4 py-3 transition-all duration-300">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-200 active:scale-95">
              <IoWalletOutline className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">CardWise</h1>
              <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center">
                <IoTrendingUpOutline className="w-3 h-3 mr-1" />
                Hello, {user.name.split(' ')[0]}
              </div>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-11 h-11 p-0 rounded-full ios-button transition-all duration-200"
            onClick={() => handleTabChange('settings')}
          >
            <IoSettingsOutline className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>
      </header>

      {/* iPhone-optimized Main Content */}
      <main className="flex-1 overflow-y-auto scroll-container pb-24">
        <div className={`max-w-sm mx-auto transition-all duration-300 ${isAnimating ? 'opacity-50 transform translate-y-2' : 'opacity-100 transform translate-y-0'}`}>
          {activeTab === 'home' && (
            <div className="ios-section">
              {/* Welcome Section */}
              <div className="text-center py-8 px-4">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <IoStatsChartOutline className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">Welcome Back! 👋</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Smart spending companion for maximizing rewards</p>
              </div>

              {/* Quick Stats */}
              <div className="ios-grid-3 mb-6">
                <Card className="ios-card hover:shadow-md transition-all duration-300 active:scale-95">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-slate-800 dark:text-slate-100">{userCards.length}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Cards</div>
                    {userCards.length > 0 && <div className="w-2 h-2 bg-slate-600 rounded-full mx-auto mt-1"></div>}
                  </CardContent>
                </Card>
                
                <Card className="ios-card hover:shadow-md transition-all duration-300 active:scale-95">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-slate-700">$0</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">Rewards</div>
                    <div className="text-xs text-slate-500">Get started</div>
                  </CardContent>
                </Card>
                
                <Card className="ios-card hover:shadow-md transition-all duration-300 active:scale-95">
                  <CardContent className="p-4 text-center">
                    <div className="text-xl font-bold text-slate-700">{uploadedTransactions.length}</div>
                    <div className="text-xs text-slate-600 dark:text-slate-400">History</div>
                    <div className="text-xs text-slate-500">{uploadedTransactions.length > 0 ? 'Ready' : 'Upload'}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Primary Actions */}
              <div className="space-y-4">
                {userCards.length === 0 ? (
                  <div className="space-y-3">
                    <Card className="ios-card-elevated bg-gradient-to-r from-slate-700 to-slate-800 text-white border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold mb-1">Add Your First Card</h3>
                            <p className="text-slate-200 text-sm">Start unlocking all features</p>
                          </div>
                          <Button 
                            onClick={() => handleTabChange('cards')}
                            className="ios-button bg-white text-slate-700 hover:bg-slate-100 shadow-md min-w-11 min-h-11 transition-all duration-200"
                          >
                            <IoAddOutline className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        className="ios-list-item w-full justify-between"
                        onClick={() => handleTabChange('scan')}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mr-4">
                            <IoScanOutline className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-slate-800 dark:text-slate-100">✨ AI Card Scanner</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Quick setup using camera</div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </Button>

                      <Button
                        variant="outline"
                        className="ios-list-item w-full justify-between"
                        onClick={() => handleTabChange('upload')}
                      >
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                            <IoCloudUploadOutline className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-slate-800 dark:text-slate-100">📤 Upload Records</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Import transaction history</div>
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Card className="ios-card-elevated bg-gradient-to-r from-slate-700 to-slate-800 text-white border-0">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold mb-1">Get Recommendation</h3>
                            <p className="text-slate-200 text-sm">Find perfect card for purchase</p>
                          </div>
                          <Button 
                            onClick={() => handleTabChange('recommend')}
                            className="ios-button bg-white text-slate-700 hover:bg-slate-100 shadow-md min-w-11 min-h-11 transition-all duration-200"
                          >
                            <ArrowRight className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="ios-list-item w-full justify-between"
                        onClick={() => handleTabChange('transactions')}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-3">
                            <IoDocumentTextOutline className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-slate-800 dark:text-slate-100 text-sm">Transaction History</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">View spending activity</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Button>

                      <Button
                        variant="outline"
                        className="ios-list-item w-full justify-between"
                        onClick={() => handleTabChange('rewards')}
                      >
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mr-3">
                            <IoGiftOutline className="w-5 h-5 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-medium text-slate-800 dark:text-slate-100 text-sm">View Rewards</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400">Track your earnings</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 mt-6">
                  <div className="ios-section-header">Tools</div>
                  <Button
                    variant="outline"
                    className="ios-list-item w-full justify-between"
                    onClick={() => handleTabChange('analytics')}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mr-3">
                        <IoPieChartOutline className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-slate-800 dark:text-slate-100 text-sm">Spending Analytics</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Analyze patterns</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>

                  <Button
                    variant="outline"
                    className="ios-list-item w-full justify-between"
                    onClick={() => handleTabChange('budget')}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center mr-3">
                        <IoFlagOutline className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-slate-800 dark:text-slate-100 text-sm">Budget Tracking</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Monitor spending goals</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>

                  <Button
                    variant="outline"
                    className="ios-list-item w-full justify-between"
                    onClick={() => handleTabChange('export')}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mr-3">
                        <IoDownloadOutline className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="font-medium text-slate-800 dark:text-slate-100 text-sm">Export Data</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Download reports</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </Button>
                </div>

                {userCards.length === 0 && (
                  <Card className="ios-card border border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 mt-6">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <IoWalletOutline className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2">🚀 Ready to Get Started?</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed">Add your credit cards to unlock personalized recommendations</p>
                      <div className="ios-grid-2 gap-3">
                        <Button 
                          onClick={() => handleTabChange('scan')}
                          className="ios-button-primary text-sm"
                        >
                          ✨ AI Scan
                        </Button>
                        <Button 
                          onClick={() => handleTabChange('cards')}
                          variant="outline"
                          className="ios-button-secondary text-sm"
                        >
                          📝 Manual Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Other tab content */}
          {activeTab === 'recommend' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <ManualRecommendation userCards={userCards} onPurchaseConfirmed={handlePurchaseConfirmed} />
            </div>
          )}

          {activeTab === 'upload' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <BankRecordUpload onTransactionsImported={handleTransactionsImported} />
            </div>
          )}

          {activeTab === 'export' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <DataExport />
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <TransactionHistory 
                uploadedTransactions={uploadedTransactions} 
                onNavigateToUpload={() => handleTabChange('upload')} 
              />
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <SpendingAnalytics />
            </div>
          )}

          {activeTab === 'budget' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <BudgetTracking />
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
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
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <AICardScanner onCardScanned={addCard} />
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <RewardsDashboard userCards={userCards} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="ios-section">
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => handleTabChange('home')}
                  className="ios-button mb-2 transition-all duration-200"
                >
                  ← Back to Home
                </Button>
              </div>
              <SettingsComponent />
              
              <Card className="ios-card mt-6 border border-red-200">
                <CardContent className="p-4 text-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem('cardwise_user');
                      setUser(null);
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
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

      {/* iPhone-optimized Bottom Navigation */}
      <div className="ios-bottom-sheet border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center justify-around py-2 max-w-sm mx-auto">
          <button
            onClick={() => handleTabChange('home')}
            className={`ios-nav-item transition-all duration-200 ${activeTab === 'home' ? 'active' : ''}`}
          >
            <IoHomeOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </button>

          <button
            onClick={() => handleTabChange('transactions')}
            className={`ios-nav-item transition-all duration-200 ${activeTab === 'transactions' ? 'active' : ''}`}
          >
            <IoDocumentTextOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">History</span>
          </button>

          <button
            onClick={() => handleTabChange('upload')}
            className={`ios-nav-item transition-all duration-200 ${activeTab === 'upload' ? 'active' : ''}`}
          >
            <IoCloudUploadOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Upload</span>
          </button>

          <button
            onClick={() => handleTabChange('export')}
            className={`ios-nav-item transition-all duration-200 ${activeTab === 'export' ? 'active' : ''}`}
          >
            <IoDownloadOutline className="w-6 h-6 mb-1" />
            <span className="text-xs font-medium">Export</span>
          </button>

          <button
            onClick={() => handleTabChange('cards')}
            className={`ios-nav-item transition-all duration-200 ${activeTab === 'cards' ? 'active' : ''}`}
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
