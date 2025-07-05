
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

  const handleSocialSignUp = (provider: string) => {
    setIsLoading(true);
    
    // Simulate social sign up
    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: `${provider} User`,
        email: `user@${provider.toLowerCase()}.com`,
        createdAt: new Date().toISOString(),
        provider: provider
      };

      localStorage.setItem('cardwise_user', JSON.stringify(userData));
      
      toast({
        title: "Welcome to CardWise!",
        description: `Successfully signed up with ${provider}.`,
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
            {/* Social Sign Up Options */}
            <div className="space-y-3">
              <Button 
                onClick={() => handleSocialSignUp('Google')}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 rounded-2xl border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </Button>

              <Button 
                onClick={() => handleSocialSignUp('Apple')}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 rounded-2xl border-slate-200 bg-black hover:bg-slate-800 text-white font-medium transition-all duration-200"
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                </svg>
                Continue with Apple
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-500">Or continue with email</span>
                </div>
              </div>
            </div>

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
