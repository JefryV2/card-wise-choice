
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
    
    // Apply theme immediately
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (preferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto theme
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
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

  // Apply theme on component mount
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">Settings</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">Customize your CardWise experience</p>
      </div>

      {/* Reward Preferences */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
            <Target className="h-5 w-5 mr-2" />
            Reward Preferences
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Choose your primary reward goal to get better recommendations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rewardPriority" className="text-slate-700 dark:text-slate-300 font-medium">Primary Reward Goal</Label>
            <Select value={preferences.rewardPriority} onValueChange={(value) => updatePreference('rewardPriority', value)}>
              <SelectTrigger className="mt-2 h-12 rounded-2xl border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50">
                <SelectValue placeholder="Select reward priority" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-xl z-50">
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
      <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Enable Notifications</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Receive alerts and reminders</div>
            </div>
            <Switch
              checked={preferences.notifications}
              onCheckedChange={(checked) => updatePreference('notifications', checked)}
              className="data-[state=checked]:bg-slate-600 dark:data-[state=checked]:bg-slate-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Category Bonus Alerts</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Get notified about quarterly bonuses</div>
            </div>
            <Switch
              checked={preferences.categoryAlerts}
              onCheckedChange={(checked) => updatePreference('categoryAlerts', checked)}
              className="data-[state=checked]:bg-slate-600 dark:data-[state=checked]:bg-slate-500"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-slate-900 dark:text-slate-100">Fee Reminders</div>
              <div className="text-sm text-slate-500 dark:text-slate-400">Annual fee and payment reminders</div>
            </div>
            <Switch
              checked={preferences.feeReminders}
              onCheckedChange={(checked) => updatePreference('feeReminders', checked)}
              className="data-[state=checked]:bg-slate-600 dark:data-[state=checked]:bg-slate-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
            <Key className="h-5 w-5 mr-2" />
            AI Integration
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Manage your Gemini API key for AI card scanning
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="apiKey" className="text-slate-700 dark:text-slate-300 font-medium">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Gemini API key"
              value={preferences.apiKey}
              onChange={(e) => updatePreference('apiKey', e.target.value)}
              className="mt-2 h-12 rounded-2xl border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50"
            />
            <div className="flex items-center mt-2">
              {preferences.apiKey ? (
                <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 rounded-xl">
                  ✓ API Key Configured
                </Badge>
              ) : (
                <Badge variant="outline" className="text-slate-500 border-slate-300 dark:border-slate-600 rounded-xl">
                  No API Key
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Theme */}
      <Card className="border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-slate-900 dark:text-slate-100">
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription className="text-slate-600 dark:text-slate-400">
            Customize the app appearance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme" className="text-slate-700 dark:text-slate-300 font-medium">Theme</Label>
            <Select value={preferences.theme} onValueChange={(value) => updatePreference('theme', value)}>
              <SelectTrigger className="mt-2 h-12 rounded-2xl border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent className="rounded-2xl border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 shadow-xl z-50">
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
        className="w-full bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 h-14 rounded-3xl font-semibold shadow-lg transition-all duration-300 transform active:scale-95"
      >
        <Save className="w-4 h-4 mr-2" />
        Save Settings
      </Button>
    </div>
  );
};
