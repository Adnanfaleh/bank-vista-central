
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import CustomerManagement from "@/components/CustomerManagement";
import TransactionManagement from "@/components/TransactionManagement";
import LoanManagement from "@/components/LoanManagement";
import AdminPanel from "@/components/AdminPanel";
import LoginForm from "@/components/LoginForm";
import { User, Users, CreditCard, Building, TrendingUp, Shield } from "lucide-react";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const dashboardStats = [
    {
      title: "Total Customers",
      value: "2,847",
      icon: Users,
      change: "+12%",
      color: "bg-blue-500"
    },
    {
      title: "Active Accounts",
      value: "3,142",
      icon: CreditCard,
      change: "+8%",
      color: "bg-green-500"
    },
    {
      title: "Pending Loans",
      value: "47",
      icon: Building,
      change: "-3%",
      color: "bg-orange-500"
    },
    {
      title: "Total Balance",
      value: "$12.5M",
      icon: TrendingUp,
      change: "+15%",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={currentUser} onLogout={handleLogout} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bank Management System
          </h1>
          <p className="text-gray-600">
            Welcome back, {currentUser?.name}. Manage your banking operations efficiently.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="transactions" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="loans" className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              Loans
            </TabsTrigger>
            {currentUser?.role === 'admin' && (
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg ${stat.color}`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <Badge 
                      variant={stat.change.startsWith('+') ? 'default' : 'destructive'}
                      className="mt-1"
                    >
                      {stat.change} from last month
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 'T001', customer: 'John Smith', type: 'Deposit', amount: '$5,000', time: '2 hours ago' },
                      { id: 'T002', customer: 'Sarah Johnson', type: 'Withdrawal', amount: '$1,200', time: '4 hours ago' },
                      { id: 'T003', customer: 'Mike Wilson', type: 'Transfer', amount: '$3,500', time: '6 hours ago' }
                    ].map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{transaction.customer}</p>
                          <p className="text-sm text-gray-600">{transaction.type} - {transaction.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{transaction.amount}</p>
                          <Badge variant="outline">{transaction.id}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Loan Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 'L001', customer: 'Emma Davis', type: 'Personal Loan', amount: '$25,000', status: 'Pending' },
                      { id: 'L002', customer: 'Robert Brown', type: 'Home Loan', amount: '$350,000', status: 'Under Review' },
                      { id: 'L003', customer: 'Lisa Garcia', type: 'Auto Loan', amount: '$45,000', status: 'Approved' }
                    ].map((loan) => (
                      <div key={loan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{loan.customer}</p>
                          <p className="text-sm text-gray-600">{loan.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{loan.amount}</p>
                          <Badge 
                            variant={
                              loan.status === 'Approved' ? 'default' : 
                              loan.status === 'Pending' ? 'secondary' : 'outline'
                            }
                          >
                            {loan.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionManagement />
          </TabsContent>

          <TabsContent value="loans">
            <LoanManagement userRole={currentUser?.role} />
          </TabsContent>

          {currentUser?.role === 'admin' && (
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
