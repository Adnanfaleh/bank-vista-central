
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, LogOut, User } from "lucide-react";

interface NavigationProps {
  user: any;
  onLogout: () => void;
}

const Navigation = ({ user, onLogout }: NavigationProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SecureBank</h1>
                <p className="text-xs text-gray-600">Management System</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-900">{user?.name}</span>
              <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                {user?.role || 'Employee'}
              </Badge>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onLogout}
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
