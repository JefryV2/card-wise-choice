
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, AlertCircle, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const BankRecordUpload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [parsedTransactions, setParsedTransactions] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  const processFile = async (file: File) => {
    setUploadStatus('processing');
    
    // Simulate file processing
    setTimeout(() => {
      const mockTransactions = [
        { date: '2024-01-15', merchant: 'Starbucks Coffee', amount: 5.47, category: 'Dining' },
        { date: '2024-01-14', merchant: 'Shell Gas Station', amount: 45.32, category: 'Gas' },
        { date: '2024-01-13', merchant: 'Whole Foods Market', amount: 127.89, category: 'Groceries' },
        { date: '2024-01-12', merchant: 'Amazon.com', amount: 89.99, category: 'Shopping' }
      ];
      
      setParsedTransactions(mockTransactions);
      setUploadStatus('success');
      
      toast({
        title: "Upload Successful! 🎉",
        description: `Processed ${mockTransactions.length} transactions from ${file.name}`,
      });
    }, 2000);
  };

  const importTransactions = () => {
    toast({
      title: "Transactions Imported! ✅",
      description: `${parsedTransactions.length} transactions have been added to your history`,
    });
    
    // Reset state
    setUploadedFile(null);
    setUploadStatus('idle');
    setParsedTransactions([]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Bank Record Upload</h1>
        <p className="text-gray-600">Import your transaction history from bank statements</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="w-5 h-5 mr-2" />
            Upload Bank Records
          </CardTitle>
          <CardDescription>
            Supported formats: CSV, Excel (.xlsx), OFX, QIF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-gray-300 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-4" />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm font-medium text-gray-900">
                Click to upload or drag and drop
              </span>
              <p className="text-xs text-gray-500 mt-1">
                CSV, XLSX, OFX, QIF up to 10MB
              </p>
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx,.ofx,.qif"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {uploadedFile && (
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-xs text-gray-500">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
              </div>
              {uploadStatus === 'processing' && (
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              )}
              {uploadStatus === 'success' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {uploadStatus === 'error' && (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Section */}
      {parsedTransactions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Transaction Preview</CardTitle>
            <CardDescription>
              Review {parsedTransactions.length} transactions before importing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {parsedTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{transaction.merchant}</div>
                    <div className="text-sm text-gray-500">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">${transaction.amount}</div>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t mt-4">
              <Button onClick={importTransactions} className="w-full">
                Import {parsedTransactions.length} Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supported Formats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Supported Bank Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Major Banks</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chase Bank</li>
                <li>• Bank of America</li>
                <li>• Wells Fargo</li>
                <li>• Citi Bank</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">File Types</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• CSV (Comma Separated)</li>
                <li>• Excel (.xlsx)</li>
                <li>• OFX (Open Financial Exchange)</li>
                <li>• QIF (Quicken Interchange)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
