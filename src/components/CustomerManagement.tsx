
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      phone: "+1 234 567 8900",
      address: "123 Main St, New York, NY",
      accountNumber: "ACC001234567",
      accountType: "Savings",
      balance: 15000
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 234 567 8901",
      address: "456 Oak Ave, Los Angeles, CA",
      accountNumber: "ACC001234568",
      accountType: "Checking",
      balance: 8500
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.w@email.com",
      phone: "+1 234 567 8902",
      address: "789 Pine St, Chicago, IL",
      accountNumber: "ACC001234569",
      accountType: "Business",
      balance: 45000
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    accountType: "Savings",
    initialDeposit: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.accountNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateAccountNumber = () => {
    return "ACC" + Math.random().toString().substr(2, 9);
  };

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const customer = {
      id: customers.length + 1,
      ...newCustomer,
      accountNumber: generateAccountNumber(),
      balance: parseFloat(newCustomer.initialDeposit) || 0
    };

    setCustomers([...customers, customer]);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      address: "",
      accountType: "Savings",
      initialDeposit: ""
    });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Customer added successfully"
    });
  };

  const getAccountTypeColor = (type) => {
    switch (type) {
      case 'Savings': return 'bg-green-100 text-green-800';
      case 'Checking': return 'bg-blue-100 text-blue-800';
      case 'Business': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Customer Management</h2>
          <p className="text-gray-600">Manage customer accounts and information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Customer</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone *</Label>
                <Input
                  id="phone"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newCustomer.address}
                  onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                  placeholder="Enter address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                  value={newCustomer.accountType}
                  onValueChange={(value) => setNewCustomer({ ...newCustomer, accountType: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Savings">Savings</SelectItem>
                    <SelectItem value="Checking">Checking</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="initialDeposit">Initial Deposit</Label>
                <Input
                  id="initialDeposit"
                  type="number"
                  value={newCustomer.initialDeposit}
                  onChange={(e) => setNewCustomer({ ...newCustomer, initialDeposit: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <Button onClick={handleAddCustomer} className="w-full">
                Add Customer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCustomers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                    <p className="text-sm text-gray-600">{customer.phone}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-mono text-sm text-gray-600">{customer.accountNumber}</p>
                  <Badge className={getAccountTypeColor(customer.accountType)}>
                    {customer.accountType}
                  </Badge>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${customer.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Balance</p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No customers found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerManagement;
