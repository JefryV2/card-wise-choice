
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Loader2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AICardScannerProps {
  onCardScanned: (cardData: any) => void;
}

export const AICardScanner: React.FC<AICardScannerProps> = ({ onCardScanned }) => {
  const [cardName, setCardName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const { toast } = useToast();

  const handleApiKeySave = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved locally.",
    });
  };

  const scanCard = async () => {
    if (!cardName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a credit card name to scan.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to use AI scanning.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Please provide detailed information about the credit card "${cardName}". Return the information in this exact JSON format:
{
  "name": "exact card name",
  "bank": "issuing bank",
  "type": "cashback|travel|points|balance-transfer|business",
  "annualFee": "number only (0 if no fee)",
  "rewardRate": "base reward rate as percentage (e.g., 1.5)",
  "bonusCategory": "dining|gas|groceries|travel|online|streaming|general",
  "signupBonus": "signup bonus description",
  "notes": "key benefits and features"
}

Only return the JSON object, no other text.`
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          }
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const jsonText = data.candidates[0].content.parts[0].text.trim();
        try {
          const cardData = JSON.parse(jsonText);
          setScannedData(cardData);
          toast({
            title: "Card Scanned Successfully",
            description: `Found details for ${cardData.name}`,
          });
        } catch (parseError) {
          throw new Error('Failed to parse AI response');
        }
      } else {
        throw new Error('No data received from AI');
      }
    } catch (error) {
      console.error('Error scanning card:', error);
      toast({
        title: "Scanning Failed",
        description: "Could not retrieve card information. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  const addScannedCard = () => {
    if (scannedData) {
      onCardScanned(scannedData);
      setScannedData(null);
      setCardName('');
      toast({
        title: "Card Added",
        description: "The AI-scanned card has been added to your portfolio.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="flex items-center text-purple-800">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Card Scanner
          </CardTitle>
          <CardDescription className="text-purple-700">
            Let AI automatically extract your credit card details and benefits
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!localStorage.getItem('gemini_api_key') && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm">
                  <p className="text-amber-800 font-medium">API Key Required</p>
                  <p className="text-amber-700">Enter your Gemini API key to use AI scanning. Get one at <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>.</p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                <Input
                  type="password"
                  placeholder="Enter your Gemini API key"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="text-xs"
                />
                <Button size="sm" onClick={handleApiKeySave} className="w-full">
                  Save API Key
                </Button>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="cardName" className="text-sm font-medium">Credit Card Name</Label>
              <Input
                id="cardName"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="e.g., Chase Sapphire Preferred, Capital One Venture X"
                className="mt-1"
              />
            </div>
            
            <Button 
              onClick={scanCard}
              disabled={isScanning || !apiKey}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              {isScanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning with AI...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Scan Card with AI
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {scannedData && (
        <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <CardTitle className="text-green-800">✨ AI Scan Results</CardTitle>
            <CardDescription className="text-green-700">
              Review and add the scanned card information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{scannedData.name}</h3>
                  <p className="text-gray-600">{scannedData.bank}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{scannedData.type}</Badge>
                  {scannedData.bonusCategory && (
                    <Badge variant="outline">{scannedData.bonusCategory}</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Base Rate:</span>
                    <p className="font-medium">{scannedData.rewardRate}%</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Annual Fee:</span>
                    <p className="font-medium">${scannedData.annualFee}</p>
                  </div>
                </div>
                
                {scannedData.signupBonus && (
                  <div>
                    <span className="text-gray-600 text-sm">Sign-up Bonus:</span>
                    <p className="text-sm font-medium text-green-600">{scannedData.signupBonus}</p>
                  </div>
                )}
                
                {scannedData.notes && (
                  <div>
                    <span className="text-gray-600 text-sm">Key Benefits:</span>
                    <p className="text-sm text-gray-700">{scannedData.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={addScannedCard}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Add This Card
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setScannedData(null)}
                className="flex-1"
              >
                Scan Again
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
