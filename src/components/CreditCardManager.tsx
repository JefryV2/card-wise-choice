
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CARD_TYPES = [
  { value: 'cashback', label: 'Cashback' },
  { value: 'travel', label: 'Travel Rewards' },
  { value: 'points', label: 'Points/Miles' },
  { value: 'balance-transfer', label: 'Balance Transfer' },
  { value: 'business', label: 'Business' }
];

const REWARD_CATEGORIES = [
  { value: 'dining', label: 'Dining' },
  { value: 'gas', label: 'Gas Stations' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'travel', label: 'Travel' },
  { value: 'online', label: 'Online Shopping' },
  { value: 'streaming', label: 'Streaming Services' },
  { value: 'general', label: 'General Purchases' }
];

export const CreditCardManager = ({ userCards, onAddCard, onRemoveCard }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    name: '',
    bank: '',
    type: '',
    annualFee: '',
    rewardRate: '',
    bonusCategory: '',
    signupBonus: '',
    notes: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCard.name || !newCard.bank || !newCard.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in the required fields (name, bank, and type).",
        variant: "destructive"
      });
      return;
    }

    onAddCard(newCard);
    setNewCard({
      name: '',
      bank: '',
      type: '',
      annualFee: '',
      rewardRate: '',
      bonusCategory: '',
      signupBonus: '',
      notes: ''
    });
    setShowAddForm(false);
    
    toast({
      title: "Card Added Successfully",
      description: `${newCard.name} has been added to your portfolio.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Your Credit Cards</h2>
          <p className="text-gray-600">Manage your credit card portfolio</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Credit Card
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Add New Credit Card
            </CardTitle>
            <CardDescription>
              Enter your credit card details to start getting personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Card Name *</Label>
                  <Input
                    id="name"
                    value={newCard.name}
                    onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                    placeholder="e.g., Chase Sapphire Preferred"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bank">Bank/Issuer *</Label>
                  <Input
                    id="bank"
                    value={newCard.bank}
                    onChange={(e) => setNewCard({...newCard, bank: e.target.value})}
                    placeholder="e.g., Chase, Capital One"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="type">Card Type *</Label>
                  <Select onValueChange={(value) => setNewCard({...newCard, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      {CARD_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="annualFee">Annual Fee ($)</Label>
                  <Input
                    id="annualFee"
                    type="number"
                    value={newCard.annualFee}
                    onChange={(e) => setNewCard({...newCard, annualFee: e.target.value})}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="rewardRate">Base Reward Rate (%)</Label>
                  <Input
                    id="rewardRate"
                    type="number"
                    step="0.1"
                    value={newCard.rewardRate}
                    onChange={(e) => setNewCard({...newCard, rewardRate: e.target.value})}
                    placeholder="1.0"
                  />
                </div>
                <div>
                  <Label htmlFor="bonusCategory">Bonus Category</Label>
                  <Select onValueChange={(value) => setNewCard({...newCard, bonusCategory: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select bonus category" />
                    </SelectTrigger>
                    <SelectContent>
                      {REWARD_CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="signupBonus">Sign-up Bonus</Label>
                <Input
                  id="signupBonus"
                  value={newCard.signupBonus}
                  onChange={(e) => setNewCard({...newCard, signupBonus: e.target.value})}
                  placeholder="e.g., 60,000 points after $4,000 spend"
                />
              </div>
              
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Input
                  id="notes"
                  value={newCard.notes}
                  onChange={(e) => setNewCard({...newCard, notes: e.target.value})}
                  placeholder="Any additional benefits or notes"
                />
              </div>

              <div className="flex space-x-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Add Card
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Display existing cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userCards.map((card) => (
          <Card key={card.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{card.name}</CardTitle>
                  <CardDescription>{card.bank}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveCard(card.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{CARD_TYPES.find(t => t.value === card.type)?.label}</Badge>
                {card.bonusCategory && (
                  <Badge variant="outline">
                    {REWARD_CATEGORIES.find(c => c.value === card.bonusCategory)?.label}
                  </Badge>
                )}
              </div>
              
              <div className="space-y-1 text-sm">
                {card.rewardRate && (
                  <p className="text-gray-600">Base Rate: {card.rewardRate}%</p>
                )}
                {card.annualFee && (
                  <p className="text-gray-600">Annual Fee: ${card.annualFee}</p>
                )}
                {card.signupBonus && (
                  <p className="text-green-600 font-medium">Bonus: {card.signupBonus}</p>
                )}
              </div>
              
              {card.notes && (
                <p className="text-sm text-gray-500 italic">{card.notes}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {userCards.length === 0 && !showAddForm && (
        <Card className="text-center py-12">
          <CardContent>
            <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Credit Cards Added Yet
            </h3>
            <p className="text-gray-600 mb-6">
              Add your credit cards to start getting personalized recommendations and track your rewards.
            </p>
            <Button 
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Card
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
