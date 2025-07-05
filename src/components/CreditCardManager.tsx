import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreditCardManagerProps {
  userCards: any[];
  onAddCard: (card: any) => void;
  onRemoveCard: (cardId: number) => void;
}

export const CreditCardManager = ({ userCards, onAddCard, onRemoveCard }: CreditCardManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    bank: '',
    rewardRate: '',
    category: '',
    annualFee: ''
  });
  const { toast } = useToast();

  const handleAddCard = () => {
    if (!newCard.name || !newCard.bank || !newCard.rewardRate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const card = {
      ...newCard,
      rewardRate: parseFloat(newCard.rewardRate),
      annualFee: newCard.annualFee ? parseFloat(newCard.annualFee) : 0,
      id: Date.now()
    };

    onAddCard(card);
    setNewCard({ name: '', bank: '', rewardRate: '', category: '', annualFee: '' });
    setShowAddForm(false);
    
    toast({
      title: "Card Added",
      description: `${card.name} has been added to your wallet.`,
    });
  };

  const handleRemoveCard = (cardId: number, cardName: string) => {
    onRemoveCard(cardId);
    toast({
      title: "Card Removed",
      description: `${cardName} has been removed from your wallet.`,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-1">My Credit Cards</h2>
        <p className="text-slate-600">Manage your credit card portfolio</p>
      </div>

      {/* Add Card Button */}
      {!showAddForm && (
        <Button 
          onClick={() => setShowAddForm(true)}
          className="w-full h-14 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-3xl font-semibold shadow-lg transition-all duration-300 transform active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Card
        </Button>
      )}

      {/* Add Card Form */}
      {showAddForm && (
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-xl rounded-3xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-slate-800">Add New Card</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pb-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="cardName" className="text-slate-700 font-medium">Card Name</Label>
                <Input
                  id="cardName"
                  value={newCard.name}
                  onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                  placeholder="e.g., Chase Sapphire Preferred"
                  className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <Label htmlFor="bank" className="text-slate-700 font-medium">Bank/Issuer</Label>
                <Input
                  id="bank"
                  value={newCard.bank}
                  onChange={(e) => setNewCard({ ...newCard, bank: e.target.value })}
                  placeholder="e.g., Chase"
                  className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rewardRate" className="text-slate-700 font-medium">Reward Rate (%)</Label>
                  <Input
                    id="rewardRate"
                    type="number"
                    step="0.1"
                    value={newCard.rewardRate}
                    onChange={(e) => setNewCard({ ...newCard, rewardRate: e.target.value })}
                    placeholder="2.0"
                    className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <Label htmlFor="annualFee" className="text-slate-700 font-medium">Annual Fee ($)</Label>
                  <Input
                    id="annualFee"
                    type="number"
                    value={newCard.annualFee}
                    onChange={(e) => setNewCard({ ...newCard, annualFee: e.target.value })}
                    placeholder="95"
                    className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="text-slate-700 font-medium">Best Category</Label>
                <Select value={newCard.category} onValueChange={(value) => setNewCard({ ...newCard, category: value })}>
                  <SelectTrigger className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50">
                    <SelectValue placeholder="Select primary reward category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-slate-200 bg-white shadow-xl">
                    <SelectItem value="dining">🍽️ Dining</SelectItem>
                    <SelectItem value="groceries">🛒 Groceries</SelectItem>
                    <SelectItem value="gas">⛽ Gas</SelectItem>
                    <SelectItem value="travel">✈️ Travel</SelectItem>
                    <SelectItem value="cashback">💰 General Cashback</SelectItem>
                    <SelectItem value="online">🛍️ Online Shopping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                onClick={handleAddCard}
                className="flex-1 h-12 bg-slate-700 hover:bg-slate-800 text-white rounded-2xl font-medium transition-all duration-200"
              >
                Add Card
              </Button>
              <Button 
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="flex-1 h-12 border-slate-200 text-slate-700 rounded-2xl font-medium transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing Cards */}
      {userCards.length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Your Cards ({userCards.length})</h3>
          {userCards.map((card) => (
            <Card key={card.id} className="bg-white/80 backdrop-blur-lg border-0 shadow-lg rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-xl flex items-center justify-center shadow-md">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{card.name}</h4>
                      <p className="text-sm text-slate-600">{card.bank}</p>
                      {card.category && (
                        <div className="flex items-center mt-1">
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700 rounded-xl">
                            Best for: {card.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center text-slate-900 font-bold">
                      <Star className="w-4 h-4 text-amber-500 mr-1" />
                      {card.rewardRate}%
                    </div>
                    <p className="text-xs text-slate-500">
                      {card.annualFee > 0 ? `$${card.annualFee}/year` : 'No annual fee'}
                    </p>
                    <Button
                      onClick={() => handleRemoveCard(card.id, card.name)}
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-50/50 border-slate-200 rounded-3xl">
          <CardContent className="p-8 text-center">
            <CreditCard className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2">No Cards Added Yet</h3>
            <p className="text-slate-600 mb-4">Add your first credit card to start getting personalized recommendations.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
