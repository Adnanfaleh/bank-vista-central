
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Building, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LoanManagementProps {
  userRole: string;
}

const LoanManagement = ({ userRole }: LoanManagementProps) => {
  const [loans, setLoans] = useState([
    {
      id: "L001",
      customerId: "ACC001234567",
      customerName: "John Smith",
      loanType: "Personal Loan",
      amount: 25000,
      term: 36,
      interestRate: 8.5,
      status: "Pending",
      applicationDate: "2024-01-10",
      approvedBy: null,
      approvalDate: null
    },
    {
      id: "L002",
      customerId: "ACC001234568",
      customerName: "Sarah Johnson",
      loanType: "Home Loan",
      amount: 350000,
      term: 360,
      interestRate: 4.2,
      status: "Under Review",
      applicationDate: "2024-01-08",
      approvedBy: null,
      approvalDate: null
    },
    {
      id: "L003",
      customerId: "ACC001234569",
      customerName: "Mike Wilson",
      loanType: "Auto Loan",
      amount: 45000,
      term: 60,
      interestRate: 6.8,
      status: "Approved",
      applicationDate: "2024-01-05",
      approvedBy: "John Admin",
      approvalDate: "2024-01-12"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newLoan, setNewLoan] = useState({
    customerId: "",
    loanType: "",
    amount: "",
    term: "",
    interestRate: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const customers = [
    { id: "ACC001234567", name: "John Smith" },
    { id: "ACC001234568", name: "Sarah Johnson" },
    { id: "ACC001234569", name: "Mike Wilson" }
  ];

  const filteredLoans = loans.filter(loan =>
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.loanType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateLoanId = () => {
    return "L" + Math.random().toString().substr(2, 6).padStart(3, '0');
  };

  const handleAddLoan = () => {
    if (!newLoan.customerId || !newLoan.loanType || !newLoan.amount || !newLoan.term) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const customer = customers.find(c => c.id === newLoan.customerId);
    const loan = {
      id: generateLoanId(),
      customerId: newLoan.customerId,
      customerName: customer?.name || "Unknown",
      loanType: newLoan.loanType,
      amount: parseFloat(newLoan.amount),
      term: parseInt(newLoan.term),
      interestRate: parseFloat(newLoan.interestRate) || 5.0,
      status: "Pending",
      applicationDate: new Date().toISOString().split('T')[0],
      approvedBy: null,
      approvalDate: null
    };

    setLoans([loan, ...loans]);
    setNewLoan({
      customerId: "",
      loanType: "",
      amount: "",
      term: "",
      interestRate: ""
    });
    setIsDialogOpen(false);

    toast({
      title: "Success",
      description: "Loan application submitted successfully"
    });
  };

  const handleApprovalAction = (loanId, action) => {
    setLoans(loans.map(loan => {
      if (loan.id === loanId) {
        return {
          ...loan,
          status: action === 'approve' ? 'Approved' : 'Rejected',
          approvedBy: "Current User",
          approvalDate: new Date().toISOString().split('T')[0]
        };
      }
      return loan;
    }));

    toast({
      title: "Success",
      description: `Loan ${action === 'approve' ? 'approved' : 'rejected'} successfully`
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLoanTypeColor = (type) => {
    switch (type) {
      case 'Personal Loan': return 'bg-purple-100 text-purple-800';
      case 'Home Loan': return 'bg-green-100 text-green-800';
      case 'Auto Loan': return 'bg-blue-100 text-blue-800';
      case 'Business Loan': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Loan Management</h2>
          <p className="text-gray-600">Manage loan applications and approvals</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>New Loan Application</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Loan Application</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="customer">Customer *</Label>
                <Select
                  value={newLoan.customerId}
                  onValueChange={(value) => setNewLoan({ ...newLoan, customerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
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
                <Label htmlFor="loanType">Loan Type *</Label>
                <Select
                  value={newLoan.loanType}
                  onValueChange={(value) => setNewLoan({ ...newLoan, loanType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select loan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                    <SelectItem value="Home Loan">Home Loan</SelectItem>
                    <SelectItem value="Auto Loan">Auto Loan</SelectItem>
                    <SelectItem value="Business Loan">Business Loan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Loan Amount *</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newLoan.amount}
                  onChange={(e) => setNewLoan({ ...newLoan, amount: e.target.value })}
                  placeholder="0.00"
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="term">Term (months) *</Label>
                <Input
                  id="term"
                  type="number"
                  value={newLoan.term}
                  onChange={(e) => setNewLoan({ ...newLoan, term: e.target.value })}
                  placeholder="12"
                  min="1"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={newLoan.interestRate}
                  onChange={(e) => setNewLoan({ ...newLoan, interestRate: e.target.value })}
                  placeholder="5.0"
                  min="0"
                  step="0.1"
                />
              </div>
              
              <Button onClick={handleAddLoan} className="w-full">
                Submit Application
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
                placeholder="Search loans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLoans.map((loan) => (
              <div key={loan.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{loan.customerName}</h3>
                    <p className="text-sm text-gray-600">{loan.customerId}</p>
                    <p className="text-sm text-gray-600">Applied: {loan.applicationDate}</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="font-mono text-sm text-gray-600">{loan.id}</p>
                  <Badge className={getLoanTypeColor(loan.loanType)}>
                    {loan.loanType}
                  </Badge>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">
                    ${loan.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    {loan.term} months @ {loan.interestRate}%
                  </p>
                </div>
                
                <div className="text-center">
                  <Badge className={getStatusColor(loan.status)}>
                    {loan.status}
                  </Badge>
                  {loan.approvedBy && (
                    <p className="text-xs text-gray-600 mt-1">
                      By: {loan.approvedBy}
                    </p>
                  )}
                </div>
                
                {userRole === 'admin' && (loan.status === 'Pending' || loan.status === 'Under Review') && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprovalAction(loan.id, 'approve')}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleApprovalAction(loan.id, 'reject')}
                    >
                      <XCircle className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {filteredLoans.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No loans found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LoanManagement;
