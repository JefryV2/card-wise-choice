
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings as SettingsIcon, Key, Bell, Target, Palette, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const Settings = () => {
  const [preferences, setPreferences] = useState({
    rewardPriority: localStorage.getItem('reward_priority') || 'cashback',
    notifications: JSON.parse(localStorage.getItem('notifications') || 'true'),
    categoryAlerts: JSON.parse(localStorage.getItem('category_alerts') || 'true'),
    feeReminders: JSON.parse(localStorage.getItem('fee_reminders') || 'true'),
    theme: localStorage.getItem('theme') || 'light',
    apiKey: localStorage.getItem('gemini_api_key') || ''
  });
  
  const { toast } = useToast();

  const saveSettings = () => {
    localStorage.setItem('reward_priority', preferences.rewardPriority);
    localStorage.setItem('notifications', JSON.stringify(preferences.notifications));
    localStorage.setItem('category_alerts', JSON.stringify(preferences.categoryAlerts));
    localStorage.setItem('fee_reminders', JSON.stringify(preferences.feeReminders));
    localStorage.setItem('theme', preferences.theme);
    if (preferences.apiKey) {
      localStorage.setItem('gemini_api_key', preferences.apiKey);
    }
    
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const updatePreference = (key: string, value: any) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600 text-sm">Customize your CardWise experience</p>
      </div>

      {/* Reward Preferences */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Target className="h-5 w-5 mr-2" />
            Reward Preferences
          </CardTitle>
          <CardDescription>
            Choose your primary reward goal to get better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rewardPriority">Primary Reward Goal</Label>
            <Select value={preferences.rewardPriority} onValueChange={(value) => updatePreference('rewardPriority', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select reward priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cashback">💰 Cashback</SelectItem>
                <SelectItem value="travel">✈️ Travel Points</SelectItem>
                <SelectItem value="points">🎯 General Points</SelectItem>
                <SelectItem value="balance-transfer">💳 Balance Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Enable Notifications</div>
              <div className="text-sm text-gray-500">Receive alerts and reminders</div>
            </div>
            <Switch
              checked={preferences.notifications}
              onCheckedChange={(checked) => updatePreference('notifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Category Bonus Alerts</div>
              <div className="text-sm text-gray-500">Get notified about quarterly bonuses</div>
            </div>
            <Switch
              checked={preferences.categoryAlerts}
              onCheckedChange={(checked) => updatePreference('categoryAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">Fee Reminders</div>
              <div className="text-sm text-gray-500">Annual fee and payment reminders</div>
            </div>
            <Switch
              checked={preferences.feeReminders}
              onCheckedChange={(checked) => updatePreference('feeReminders', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Key className="h-5 w-5 mr-2" />
            AI Integration
          </CardTitle>
          <CardDescription>
            Manage your Gemini API key for AI card scanning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key"
              value={preferences.apiKey}
              onChange={(e) => updatePreference('apiKey', e.target.value)}
              className="mt-1"
            />
            <div className="flex items-center mt-2">
              {preferences.apiKey ? (
                <Badge variant="secondary" className="text-green-600">
                  ✓ API Key Configured
                </Badge>
              ) : (
                <Badge variant="outline" className="text-gray-500">
                  No API Key
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the app appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme">Theme</Label>
            <Select value={preferences.theme} onValueChange={(value) => updatePreference('theme', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">☀️ Light</SelectItem>
                <SelectItem value="dark">🌙 Dark</SelectItem>
                <SelectItem value="auto">🔄 Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <Button 
        onClick={saveSettings}
        className="w-full bg-gray-900 hover:bg-gray-800 h-12"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Settings
      </Button>
    </div>
  );
};
