
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, User, Shield, Activity, BarChart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "admin",
      name: "John Admin",
      role: "admin",
      status: "Active",
      lastLogin: "2024-01-15T09:30:00",
      email: "admin@securebank.com"
    },
    {
      id: 2,
      username: "employee",
      name: "Sarah Employee",
      role: "employee",
      status: "Active",
      lastLogin: "2024-01-15T08:15:00",
      email: "sarah@securebank.com"
    },
    {
      id: 3,
      username: "teller01",
      name: "Mike Teller",
      role: "employee",
      status: "Inactive",
      lastLogin: "2024-01-10T16:45:00",
      email: "mike@securebank.com"
    }
  ]);

  const [activities, setActivities] = useState([
    {
      id: 1,
      user: "John Admin",
      action: "Approved loan application L003",
      timestamp: "2024-01-15T10:30:00",
      type: "Approval"
    },
    {
      id: 2,
      user: "Sarah Employee",
      action: "Created new customer account",
      timestamp: "2024-01-15T09:15:00",
      type: "Customer Management"
    },
    {
      id: 3,
      user: "Sarah Employee",
      action: "Processed deposit transaction T001",
      timestamp: "2024-01-15T08:45:00",
      type: "Transaction"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    name: "",
    email: "",
    role: "employee",
    password: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.username || !newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      status: "Active",
      lastLogin: null
    };

    setUsers([...users, user]);
    setNewUser({
      username: "",
      name: "",
      email: "",
      role: "employee",
      password: ""
    });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "User created successfully"
    });
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));

    toast({
      title: "Success",
      description: "User role updated successfully"
    });
  };

  const handleStatusToggle = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' }
        : user
    ));

    toast({
      title: "Success",
      description: "User status updated successfully"
    });
  };

  const getRoleColor = (role) => {
    return role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'Approval': return 'bg-purple-100 text-purple-800';
      case 'Customer Management': return 'bg-blue-100 text-blue-800';
      case 'Transaction': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const systemStats = [
    { title: "Total Users", value: users.length, icon: User },
    { title: "Active Sessions", value: users.filter(u => u.status === 'Active').length, icon: Activity },
    { title: "Admin Users", value: users.filter(u => u.role === 'admin').length, icon: Shield },
    { title: "Recent Activities", value: activities.length, icon: BarChart }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-gray-600">System administration and user management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="activity">Activity Monitor</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add User</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                      placeholder="Enter username"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                      placeholder="Enter password"
                    />
                  </div>
                  
                  <Button onClick={handleAddUser} className="w-full">
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="space-y-4 p-6">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{user.name}</h3>
                        <p className="text-sm text-gray-600">@{user.username}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                      <p className="text-xs text-gray-600 mt-1">
                        {user.lastLogin 
                          ? `Last: ${new Date(user.lastLogin).toLocaleDateString()}`
                          : 'Never logged in'
                        }
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <Badge className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Select
                        value={user.role}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee">Employee</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        size="sm"
                        variant={user.status === 'Active' ? 'destructive' : 'default'}
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <Activity className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">by {activity.user}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={getActivityTypeColor(activity.type)}>
                        {activity.type}
                      </Badge>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
