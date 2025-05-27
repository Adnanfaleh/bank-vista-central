
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Shield, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin: (userData: any) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Demo users for testing
  const demoUsers = [
    { username: "admin", password: "admin123", name: "John Admin", role: "admin" },
    { username: "employee", password: "emp123", name: "Sarah Employee", role: "employee" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const user = demoUsers.find(
        u => u.username === credentials.username && u.password === credentials.password
      );

      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`,
        });
        onLogin(user);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = (userType) => {
    const user = demoUsers.find(u => u.role === userType);
    setCredentials({ username: user.username, password: user.password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Building className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">SecureBank</h1>
          <p className="text-gray-600 mt-2">Bank Management System</p>
          <p className="text-sm text-gray-500 mt-1">Employee Portal</p>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Employee Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <p className="text-sm text-gray-600 text-center">Demo Accounts:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('admin')}
                  className="flex items-center space-x-2"
                >
                  <Shield className="w-4 h-4" />
                  <span>Admin</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin('employee')}
                  className="flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Employee</span>
                </Button>
              </div>
              <div className="text-xs text-gray-500 text-center">
                <p>Admin: admin/admin123</p>
                <p>Employee: employee/emp123</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-gray-600">
          <p>Developed by Adnan Faleh & Zuheir Asvad</p>
          <p>Istanbul Aydin University - Software Engineering</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
