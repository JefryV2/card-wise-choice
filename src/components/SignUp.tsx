
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SignUp = ({ onSignUpComplete }: { onSignUpComplete: (userData: any) => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignUp = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('cardwise_user', JSON.stringify(userData));
      
      toast({
        title: "Welcome to CardWise!",
        description: "Your account has been created successfully.",
      });

      onSignUpComplete(userData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6 ios-safe-area">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Welcome */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-xl flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/080528f8-06b5-47d5-9110-a3a1093875ca.png" 
              alt="CardWise Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome to CardWise</h1>
          <p className="text-slate-600">Your smart spending companion</p>
        </div>

        {/* Sign Up Form */}
        <Card className="bg-white/80 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl font-bold text-slate-800">Create Your Account</CardTitle>
            <CardDescription className="text-slate-600">Join thousands maximizing their rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8 pb-8">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-slate-700 font-medium">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2 h-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 pl-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-slate-700 font-medium">Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a secure password"
                    className="h-12 pl-12 pr-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-slate-700 font-medium">Confirm Password</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                    className="h-12 pl-12 pr-12 rounded-2xl border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300 transform active:scale-95"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center text-sm text-slate-600 pt-4">
              Already have an account?{' '}
              <button className="text-slate-800 font-semibold underline">
                Sign In
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Features Preview */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl mx-auto mb-2 flex items-center justify-center">
              💳
            </div>
            <p className="text-xs text-slate-600">Smart Cards</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl mx-auto mb-2 flex items-center justify-center">
              📊
            </div>
            <p className="text-xs text-slate-600">Analytics</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl mx-auto mb-2 flex items-center justify-center">
              🎯
            </div>
            <p className="text-xs text-slate-600">Rewards</p>
          </div>
        </div>
      </div>
    </div>
  );
};
