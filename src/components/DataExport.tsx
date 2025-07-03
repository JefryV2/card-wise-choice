
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Download, FileSpreadsheet, Calendar, CreditCard, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const DataExport = () => {
  const [exportType, setExportType] = useState<'all' | 'category' | 'card'>('all');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState('last30');
  const [fileFormat, setFileFormat] = useState('csv');
  const { toast } = useToast();

  const categories = [
    'Dining', 'Groceries', 'Gas', 'Shopping', 'Entertainment', 
    'Travel', 'Utilities', 'Healthcare'
  ];

  const cards = [
    'Chase Sapphire Preferred',
    'American Express Gold',
    'Citi Double Cash',
    'Discover it Cash Back'
  ];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    }
  };

  const handleCardChange = (card: string, checked: boolean) => {
    if (checked) {
      setSelectedCards([...selectedCards, card]);
    } else {
      setSelectedCards(selectedCards.filter(c => c !== card));
    }
  };

  const handleExport = () => {
    let exportDescription = '';
    
    if (exportType === 'all') {
      exportDescription = 'Complete transaction history';
    } else if (exportType === 'category') {
      exportDescription = `Transactions for ${selectedCategories.length} categories`;
    } else if (exportType === 'card') {
      exportDescription = `Transactions for ${selectedCards.length} cards`;
    }

    // Simulate file download
    const fileName = `cardwise-export-${Date.now()}.${fileFormat}`;
    
    toast({
      title: "Export Started! 📊",
      description: `${exportDescription} is being prepared for download as ${fileName}`,
    });

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Download Ready! ⬇️",
        description: "Your export file has been generated and downloaded",
      });
    }, 2000);
  };

  const getExportCount = () => {
    // Mock calculation based on filters
    let baseCount = 150;
    
    if (exportType === 'category' && selectedCategories.length > 0) {
      baseCount = Math.floor(baseCount * (selectedCategories.length / categories.length));
    }
    
    if (exportType === 'card' && selectedCards.length > 0) {
      baseCount = Math.floor(baseCount * (selectedCards.length / cards.length));
    }
    
    return baseCount;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Export Data</h1>
        <p className="text-gray-600">Download your transaction history and spending data</p>
      </div>

      {/* Export Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Download className="w-5 h-5 mr-2" />
            Export Configuration
          </CardTitle>
          <CardDescription>
            Choose what data to export and in which format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Export Type */}
          <div className="space-y-3">
            <Label className="text-base font-medium">What to Export</Label>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="export-all"
                  name="exportType"
                  value="all"
                  checked={exportType === 'all'}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="w-4 h-4"
                />
                <Label htmlFor="export-all" className="cursor-pointer">
                  All Transactions
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="export-category"
                  name="exportType"
                  value="category"
                  checked={exportType === 'category'}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="w-4 h-4"
                />
                <Label htmlFor="export-category" className="cursor-pointer">
                  By Category
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="export-card"
                  name="exportType"
                  value="card"
                  checked={exportType === 'card'}
                  onChange={(e) => setExportType(e.target.value as any)}
                  className="w-4 h-4"
                />
                <Label htmlFor="export-card" className="cursor-pointer">
                  By Card
                </Label>
              </div>
            </div>
          </div>

          {/* Category Selection */}
          {exportType === 'category' && (
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center">
                <Tag className="w-4 h-4 mr-2" />
                Select Categories
              </Label>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cat-${category}`}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={`cat-${category}`} className="cursor-pointer text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Card Selection */}
          {exportType === 'card' && (
            <div className="space-y-3">
              <Label className="text-base font-medium flex items-center">
                <CreditCard className="w-4 h-4 mr-2" />
                Select Cards
              </Label>
              <div className="space-y-3">
                {cards.map((card) => (
                  <div key={card} className="flex items-center space-x-2">
                    <Checkbox
                      id={`card-${card}`}
                      checked={selectedCards.includes(card)}
                      onCheckedChange={(checked) => handleCardChange(card, checked as boolean)}
                    />
                    <Label htmlFor={`card-${card}`} className="cursor-pointer text-sm">
                      {card}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Date Range */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Date Range
            </Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last90">Last 3 Months</SelectItem>
                <SelectItem value="last180">Last 6 Months</SelectItem>
                <SelectItem value="lastyear">Last Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* File Format */}
          <div className="space-y-3">
            <Label className="text-base font-medium flex items-center">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              File Format
            </Label>
            <Select value={fileFormat} onValueChange={setFileFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Excel Compatible)</SelectItem>
                <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                <SelectItem value="pdf">PDF Report</SelectItem>
                <SelectItem value="json">JSON Data</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Export Preview</CardTitle>
          <CardDescription>
            Your export will include approximately {getExportCount()} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{getExportCount()}</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  ${(getExportCount() * 45.67).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  ${(getExportCount() * 0.89).toFixed(0)}
                </div>
                <div className="text-sm text-gray-600">Rewards Earned</div>
              </div>
            </div>

            <Button 
              onClick={handleExport} 
              className="w-full"
              disabled={
                (exportType === 'category' && selectedCategories.length === 0) ||
                (exportType === 'card' && selectedCards.length === 0)
              }
            >
              <Download className="w-4 h-4 mr-2" />
              Export Data ({fileFormat.toUpperCase()})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Exports</CardTitle>
          <CardDescription>Your download history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: '2024-01-15', type: 'All Transactions', format: 'CSV', size: '2.3 MB' },
              { date: '2024-01-10', type: 'Dining Category', format: 'Excel', size: '456 KB' },
              { date: '2024-01-05', type: 'Chase Card Only', format: 'PDF', size: '1.1 MB' }
            ].map((export_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{export_.type}</div>
                  <div className="text-sm text-gray-500">{export_.date} • {export_.format} • {export_.size}</div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
