import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Card className="bg-white border-0 shadow-lg rounded-3xl">
          <CardHeader className="text-center pb-6 pt-8">
            {/* Back Button */}
            <div className="flex justify-start mb-4">
              <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 rounded-full">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Button>
            </div>
            
            <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Let's get started!</CardTitle>
            <CardDescription className="text-gray-500 text-base">Create your new account</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6 px-8 pb-8">
            {/* Form Fields */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Name"
                  className="h-14 border-gray-200 rounded-2xl text-base placeholder:text-gray-400 focus:border-gray-300 focus:ring-0"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Email Address"
                  className="h-14 border-gray-200 rounded-2xl text-base placeholder:text-gray-400 focus:border-gray-300 focus:ring-0"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Password"
                    className="h-14 border-gray-200 rounded-2xl text-base placeholder:text-gray-400 focus:border-gray-300 focus:ring-0 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm Password"
                    className="h-14 border-gray-200 rounded-2xl text-base placeholder:text-gray-400 focus:border-gray-300 focus:ring-0 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms Text */}
            <div className="text-center px-4">
              <p className="text-sm text-gray-500 leading-relaxed">
                By creating an account or Continue with Google, you agree to our{' '}
                <span className="text-gray-700 underline">Terms and Conditions</span> and{' '}
                <span className="text-gray-700 underline">Privacy Policy</span>.
              </p>
            </div>

            {/* Create Account Button */}
            <Button 
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full h-14 bg-gray-800 hover:bg-gray-900 text-white font-semibold rounded-2xl transition-all duration-200 text-base"
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating account...</span>
                </div>
              ) : (
                "Create account"
              )}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-4 text-gray-500">or</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <Button 
              onClick={() => handleSocialSignUp('Google')}
              disabled={isLoading}
              variant="outline"
              className="w-full h-14 border-gray-200 hover:bg-gray-50 rounded-2xl transition-colors text-base font-medium"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            {/* Sign In Link */}
            <div className="text-center pt-6">
              <p className="text-base text-gray-600">
                Already have an account?{' '}
                <button className="text-gray-900 font-medium hover:underline transition-colors">
                  Sign in
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
