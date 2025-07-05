
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
      
      // Fixed API request format for better Android compatibility
      const requestBody = {
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
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };

      console.log('Request body:', JSON.stringify(requestBody));

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        
        let errorMessage = `API request failed (${response.status})`;
        
        if (response.status === 400) {
          errorMessage = "Invalid request format. Please check your API key and try again.";
        } else if (response.status === 403) {
          errorMessage = "Access denied. Please verify your API key permissions.";
        } else if (response.status === 429) {
          errorMessage = "Rate limit exceeded. Please wait a moment and try again.";
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('API Response data:', data);
      
      if (data.error) {
        console.error('API returned error:', data.error);
        throw new Error(`API Error: ${data.error.message || 'Unknown error occurred'}`);
      }
      
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
            title: "Card Found!",
            description: `Successfully scanned ${cardData.name}`,
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
        description: error.message || "Could not retrieve card information. Please try again.",
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
        title: "Card Added!",
        description: "The AI-scanned card has been added to your collection.",
      });
    }
  };

  if (showApiKeyInput) {
    return (
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
            Gemini API Key Required
          </CardTitle>
          <CardDescription>
            Enter your Gemini API key to use AI card scanning. Get one free at{' '}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-700 font-semibold underline"
            >
              Google AI Studio
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey" className="text-slate-700 font-medium">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
            />
          </div>
          <div className="flex space-x-3">
            <Button 
              onClick={handleApiKeySave} 
              className="flex-1 bg-slate-700 hover:bg-slate-800 rounded-2xl h-12 font-medium transition-all duration-200"
            >
              Save & Continue
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowApiKeyInput(false)}
              className="flex-1 border-slate-300 rounded-2xl h-12 font-medium transition-all duration-200"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/70 backdrop-blur-sm border-slate-200/50 rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-800">
            <Sparkles className="h-5 w-5 mr-2" />
            AI Card Scanner
          </CardTitle>
          <CardDescription>
            Let AI find your credit card details automatically
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cardName" className="text-slate-700 font-medium">Credit Card Name</Label>
            <Input
              id="cardName"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="e.g., Chase Sapphire Preferred"
              className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
            />
          </div>
          
          <Button 
            onClick={scanCard}
            disabled={isScanning || !cardName.trim()}
            className="w-full bg-slate-700 hover:bg-slate-800 rounded-2xl h-12 font-medium transition-all duration-200"
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
            className="w-full text-slate-600 rounded-2xl"
          >
            Change API Key
          </Button>
        </CardContent>
      </Card>

      {scannedData && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-green-800">
              <CheckCircle className="h-5 w-5 mr-2" />
              Card Found!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/80 rounded-2xl p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{scannedData.name}</h3>
                  <p className="text-slate-600">{scannedData.bank}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="rounded-xl">{scannedData.type}</Badge>
                  {scannedData.bonusCategory && (
                    <Badge variant="outline" className="rounded-xl">{scannedData.bonusCategory}</Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Base Rate:</span>
                    <p className="font-medium">{scannedData.rewardRate}%</p>
                  </div>
                  <div>
                    <span className="text-slate-600">Annual Fee:</span>
                    <p className="font-medium">${scannedData.annualFee}</p>
                  </div>
                </div>
                
                {scannedData.signupBonus && (
                  <div>
                    <span className="text-slate-600 text-sm">Sign-up Bonus:</span>
                    <p className="text-sm font-medium text-green-700">{scannedData.signupBonus}</p>
                  </div>
                )}
                
                {scannedData.notes && (
                  <div>
                    <span className="text-slate-600 text-sm">Benefits:</span>
                    <p className="text-sm text-slate-700">{scannedData.notes}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                onClick={addScannedCard}
                className="flex-1 bg-green-600 hover:bg-green-700 rounded-2xl h-12 font-medium transition-all duration-200"
              >
                Add This Card
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setScannedData(null)}
                className="flex-1 border-slate-300 rounded-2xl h-12 font-medium transition-all duration-200"
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
