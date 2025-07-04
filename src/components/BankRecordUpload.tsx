
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface BankRecordUploadProps {
  onTransactionsImported?: (transactions: any[]) => void;
}

export const BankRecordUpload = ({ onTransactionsImported }: BankRecordUploadProps) => {
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
        { 
          id: 1,
          date: '2024-01-15', 
          merchant: 'Starbucks Coffee', 
          amount: 5.47, 
          category: 'Dining',
          rewards: 0.11,
          card: 'Chase Sapphire',
          status: 'completed'
        },
        { 
          id: 2,
          date: '2024-01-14', 
          merchant: 'Shell Gas Station', 
          amount: 45.32, 
          category: 'Gas',
          rewards: 1.36,
          card: 'Citi Double Cash',
          status: 'completed'
        },
        { 
          id: 3,
          date: '2024-01-13', 
          merchant: 'Whole Foods Market', 
          amount: 127.89, 
          category: 'Groceries',
          rewards: 2.56,
          card: 'Chase Sapphire',
          status: 'completed'
        },
        { 
          id: 4,
          date: '2024-01-12', 
          merchant: 'Amazon.com', 
          amount: 89.99, 
          category: 'Shopping',
          rewards: 1.80,
          card: 'Chase Freedom',
          status: 'completed'
        }
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
    if (onTransactionsImported) {
      onTransactionsImported(parsedTransactions);
    }
    
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
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">Bank Record Upload</h1>
        <p className="text-slate-600 dark:text-slate-400">Import your transaction history from bank statements</p>
      </div>

      {/* Upload Section */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
            <Upload className="w-5 h-5 mr-2" />
            Upload Bank Records
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Supported formats: CSV, Excel (.xlsx), OFX, QIF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-6 text-center hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <Upload className="w-8 h-8 text-slate-400 mx-auto mb-4" />
            <Label htmlFor="file-upload" className="cursor-pointer">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Click to upload or drag and drop
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
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
            <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-950/50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{uploadedFile.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{(uploadedFile.size / 1024).toFixed(1)} KB</p>
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
        <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <CardHeader>
            <CardTitle className="text-slate-900 dark:text-slate-100">Transaction Preview</CardTitle>
            <CardDescription className="text-slate-600 dark:text-slate-400">
              Review {parsedTransactions.length} transactions before importing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {parsedTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900 dark:text-slate-100">{transaction.merchant}</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{transaction.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-slate-100">${transaction.amount}</div>
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
              <Button onClick={importTransactions} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Import {parsedTransactions.length} Transactions
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Supported Formats */}
      <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Supported Bank Formats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Major Banks</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Chase Bank</li>
                <li>• Bank of America</li>
                <li>• Wells Fargo</li>
                <li>• Citi Bank</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">File Types</h4>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
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
