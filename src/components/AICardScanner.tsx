
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Loader2, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AICardScannerProps {
  onCardScanned: (cardData: any) => void;
}

export const AICardScanner: React.FC<AICardScannerProps> = ({ onCardScanned }) => {
  const [cardName, setCardName] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!localStorage.getItem('gemini_api_key'));
  const { toast } = useToast();

  const handleApiKeySave = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Empty API Key",
        description: "Please enter a valid Gemini API key.",
        variant: "destructive"
      });
      return;
    }
    
    localStorage.setItem('gemini_api_key', apiKey);
    setShowApiKeyInput(false);
    toast({
      title: "API Key Saved",
      description: "Your Gemini API key has been saved securely.",
    });
  };

  const scanCard = async () => {
    if (!cardName.trim()) {
      toast({
        title: "Card Name Required",
        description: "Please enter a credit card name to scan.",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey) {
      setShowApiKeyInput(true);
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first.",
        variant: "destructive"
      });
      return;
    }

    setIsScanning(true);
    
    try {
      console.log('Starting AI scan for card:', cardName);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Provide detailed information about the credit card "${cardName}". Return ONLY a valid JSON object with this exact structure:

{
  "name": "exact card name",
  "bank": "issuing bank name",
  "type": "cashback",
  "annualFee": 0,
  "rewardRate": "1.5",
  "bonusCategory": "dining",
  "signupBonus": "sign-up bonus description",
  "notes": "key benefits and features"
}

Requirements:
- type must be one of: cashback, travel, points, balance-transfer, business
- annualFee must be a number (0 for no fee)
- rewardRate must be a string representing the base rate percentage
- bonusCategory must be one of: dining, gas, groceries, travel, online, streaming, general
- Return ONLY the JSON object, no other text or formatting`
            }]
          }],
          generationConfig: {
            temperature: 0.1,
            topK: 1,
            topP: 1,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const jsonText = data.candidates[0].content.parts[0].text.trim();
        console.log('Raw AI response:', jsonText);
        
        try {
          // Clean the response to extract JSON
          const cleanedJson = jsonText.replace(/```json|```/g, '').trim();
          const cardData = JSON.parse(cleanedJson);
          
          console.log('Parsed card data:', cardData);
          
          // Validate the parsed data
          if (!cardData.name || !cardData.bank) {
            throw new Error('Invalid card data structure');
          }
          
          setScannedData(cardData);
          toast({
            title: "Card Scanned Successfully!",
            description: `Found details for ${cardData.name}`,
          });
        } catch (parseError) {
          console.error('JSON parsing error:', parseError);
          throw new Error('Failed to parse card information from AI response');
        }
      } else {
        console.error('Unexpected API response structure:', data);
        throw new Error('No valid response from AI service');
      }
    } catch (error) {
      console.error('Card scanning error:', error);
      toast({
        title: "Scan Failed",
        description: error.message || "Could not retrieve card information. Please check your API key and try again.",
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
        title: "Card Added Successfully!",
        description: "The AI-scanned card has been added to your portfolio.",
      });
    }
  };

  if (showApiKeyInput) {
    return (
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            Gemini API Key Required
          </CardTitle>
          <CardDescription>
            Enter your Gemini API key to use AI card scanning. Get one free at{' '}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 underline"
            >
              Google AI Studio
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="flex space-x-3">
            <Button onClick={handleApiKeySave} className="flex-1 bg-gray-900 hover:bg-gray-700">
              Save & Continue
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowApiKeyInput(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Card Scanner
          </CardTitle>
          <CardDescription>
            Let AI find your credit card details automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cardName">Credit Card Name</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="e.g., Chase Sapphire Preferred"
              className="mt-1"
            />
          </div>
          
          <Button 
            onClick={scanCard}
            disabled={isScanning || !cardName.trim()}
            className="w-full bg-gray-900 hover:bg-gray-700"
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

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKeyInput(true)}
            className="w-full text-gray-600"
          >
            Change API Key
          </Button>
        </CardContent>
      </Card>

      {scannedData && (
        <Card className="border border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              Card Found!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white rounded-lg p-4">
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
                    <span className="text-gray-600 text-sm">Benefits:</span>
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
