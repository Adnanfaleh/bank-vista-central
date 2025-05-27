
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, CreditCard, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TransactionManagement = () => {
  const [transactions, setTransactions] = useState([
    {
      id: "T001",
      customerId: "ACC001234567",
      customerName: "John Smith",
      type: "Deposit",
      amount: 5000,
      date: "2024-01-15T10:30:00",
      description: "Salary deposit",
      status: "Completed"
    },
    {
      id: "T002",
      customerId: "ACC001234568",
      customerName: "Sarah Johnson",
      type: "Withdrawal",
      amount: 1200,
      date: "2024-01-15T14:20:00",
      description: "ATM withdrawal",
      status: "Completed"
    },
    {
      id: "T003",
      customerId: "ACC001234569",
      customerName: "Mike Wilson",
      type: "Transfer",
      amount: 3500,
      date: "2024-01-15T16:45:00",
      description: "Business transfer",
      status: "Pending"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    customerId: "",
    type: "",
    amount: "",
    description: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const customers = [
    { id: "ACC001234567", name: "John Smith" },
    { id: "ACC001234568", name: "Sarah Johnson" },
    { id: "ACC001234569", name: "Mike Wilson" }
  ];

  const filteredTransactions = transactions.filter(transaction =>
    transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateTransactionId = () => {
    return "T" + Math.random().toString().substr(2, 6).padStart(3, '0');
  };

  const handleAddTransaction = () => {
    if (!newTransaction.customerId || !newTransaction.type || !newTransaction.amount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const customer = customers.find(c => c.id === newTransaction.customerId);
    const transaction = {
      id: generateTransactionId(),
      customerId: newTransaction.customerId,
      customerName: customer?.name || "Unknown",
      type: newTransaction.type,
      amount: parseFloat(newTransaction.amount),
      date: new Date().toISOString(),
      description: newTransaction.description || `${newTransaction.type} transaction`,
      status: "Completed"
    };

    setTransactions([transaction, ...transactions]);
    setNewTransaction({
      customerId: "",
      type: "",
      amount: "",
      description: ""
    });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Transaction processed successfully"
    });
  };

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'Deposit': return 'bg-green-100 text-green-800';
      case 'Withdrawal': return 'bg-red-100 text-red-800';
      case 'Transfer': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transaction Management</h2>
          <p className="text-gray-600">Process and monitor customer transactions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Transaction</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Process New Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer Account *</Label>
                <Select
                  value={newTransaction.customerId}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, customerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer account" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name} - {customer.id}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Transaction Type *</Label>
                <Select
                  value={newTransaction.type}
                  onValueChange={(value) => setNewTransaction({ ...newTransaction, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transaction type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Deposit">Deposit</SelectItem>
                    <SelectItem value="Withdrawal">Withdrawal</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newTransaction.description}
                  onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
                  placeholder="Transaction description"
                />
              </div>
              
              <Button onClick={handleAddTransaction} className="w-full">
                Process Transaction
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
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    {transaction.type === 'Transfer' ? (
                      <ArrowUpDown className="w-5 h-5 text-blue-600" />
                    ) : (
                      <CreditCard className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{transaction.customerName}</h3>
                    <p className="text-sm text-gray-600">{transaction.customerId}</p>
                    <p className="text-sm text-gray-600">{transaction.description}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-mono text-sm text-gray-600">{transaction.id}</p>
                  <Badge className={getTransactionTypeColor(transaction.type)}>
                    {transaction.type}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'Deposit' ? 'text-green-600' : 
                    transaction.type === 'Withdrawal' ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {transaction.type === 'Withdrawal' ? '-' : '+'}${transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(transaction.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionManagement;
