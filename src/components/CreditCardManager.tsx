import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
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

export const CreditCardManager = ({ userCards, onAddCard, onRemoveCard }: any) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">Your Credit Cards</h2>
          <p className="text-sm md:text-base text-gray-600">Manage your credit card portfolio</p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full md:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Credit Card
        </Button>
      </div>

      {showAddForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <CreditCard className="h-5 w-5 mr-2" />
              Add New Credit Card
            </CardTitle>
            <CardDescription className="text-sm">
              Enter your credit card details to start getting personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="name" className="text-sm">Card Name *</Label>
                  <Input
                    id="name"
                    value={newCard.name}
                    onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                    placeholder="e.g., Chase Sapphire Preferred"
                    required
                    className="mt-1"
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

              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 flex-1">
                  Add Card
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowAddForm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Mobile-optimized card display */}
      <div className="space-y-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:space-y-0">
        {userCards.map((card: any) => (
          <Card key={card.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base md:text-lg truncate">{card.name}</CardTitle>
                  <CardDescription className="text-sm">{card.bank}</CardDescription>
                </div>
                <div className="flex items-center space-x-1 ml-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedCard(expandedCard === card.id ? null : card.id)}
                    className="md:hidden p-1"
                  >
                    {expandedCard === card.id ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveCard(card.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className={`space-y-3 ${expandedCard === card.id ? 'block' : 'hidden md:block'}`}>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="text-xs">
                  {CARD_TYPES.find((t: any) => t.value === card.type)?.label}
                </Badge>
                {card.bonusCategory && (
                  <Badge variant="outline" className="text-xs">
                    {REWARD_CATEGORIES.find((c: any) => c.value === card.bonusCategory)?.label}
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
                  <p className="text-green-600 font-medium text-xs">{card.signupBonus}</p>
                )}
              </div>
              
              {card.notes && (
                <p className="text-xs text-gray-500 italic">{card.notes}</p>
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
