import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  ShoppingCart, 
  TrendingUp,
  Search,
  ArrowLeft,
  Store,
  Clock,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Demo admin data
const stats = {
  totalUsers: 25,
  totalVendors: 18,
  totalMerchants: 7,
  totalProducts: 45,
  totalOrders: 12,
  pendingOrders: 5
};

const allUsers = [
  { id: 1, name: "రాజు టిఫిన్ సెంటర్", type: "vendor", location: "Vijayawada", joined: "2024-01-15" },
  { id: 2, name: "వెంకట్ స్టోర్స్", type: "merchant", location: "Vijayawada", joined: "2024-01-10" },
  { id: 3, name: "సుధా ఫుడ్ కార్ట్", type: "vendor", location: "Guntur", joined: "2024-01-20" },
  { id: 4, name: "రవి వేల్‌సేల్", type: "merchant", location: "Guntur", joined: "2024-01-12" }
];

const allProducts = [
  { id: 1, name: "బంగాళాదుంప", merchant: "వెంకట్ స్టోర్స్", price: 25, category: "వెజిటబుల్స్" },
  { id: 2, name: "ఉల్లిపాయ", merchant: "వెంకట్ స్టోర్స్", price: 30, category: "వెజిటబుల్స్" },
  { id: 3, name: "వేప ఆయిల్", merchant: "రవి వేల్‌సేల్", price: 150, category: "ఆయిల్" }
];

const allOrders = [
  { 
    id: 1, 
    vendor: "రాజు టిఫిన్ సెంటర్", 
    merchant: "వెంకట్ స్టోర్స్", 
    total: 400, 
    status: "pending", 
    date: "2024-01-25" 
  },
  { 
    id: 2, 
    vendor: "సుధా ఫుడ్ కార్ట్", 
    merchant: "రవి వేల్‌సేల్", 
    total: 300, 
    status: "confirmed", 
    date: "2024-01-24" 
  }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const filterData = (data: any[], searchField: string) => {
    return data.filter(item => 
      item[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/')}
                className="text-white hover:bg-white/20"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <Badge className="bg-white/20 text-white border-white/30">
              VendorLink Admin
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalUsers}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.totalVendors} vendors, {stats.totalMerchants} merchants
                  </p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">
                    {stats.pendingOrders} pending
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Platform Health</p>
                  <p className="text-2xl font-bold text-success">Good</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "overview" ? "default" : "outline"}
            onClick={() => setActiveTab("overview")}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Overview
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
          >
            <Users className="w-4 h-4 mr-2" />
            All Users
          </Button>
          <Button
            variant={activeTab === "products" ? "default" : "outline"}
            onClick={() => setActiveTab("products")}
          >
            <Package className="w-4 h-4 mr-2" />
            All Products
          </Button>
          <Button
            variant={activeTab === "orders" ? "default" : "outline"}
            onClick={() => setActiveTab("orders")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            All Orders
          </Button>
        </div>

        {/* Search Bar */}
        {activeTab !== "overview" && (
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Vendors</span>
                    <Badge variant="secondary">{stats.totalVendors}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Merchants</span>
                    <Badge variant="secondary">{stats.totalMerchants}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending Orders</span>
                    <Badge variant="destructive">{stats.pendingOrders}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Revenue (Today)</span>
                    <Badge className="bg-success">₹1,200</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">New vendor "రాజు టిఫిన్ సెంటర్" registered</span>
                    <Badge variant="outline" className="text-xs">2h ago</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span className="text-sm">Order #1 confirmed by వెంకట్ స్టోర్స్</span>
                    <Badge variant="outline" className="text-xs">4h ago</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-primary" />
                    <span className="text-sm">New product added: వేప ఆయిల్</span>
                    <Badge variant="outline" className="text-xs">6h ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <Card>
            <CardHeader>
              <CardTitle>All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Location</th>
                      <th className="text-left p-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(allUsers, 'name').map(user => (
                      <tr key={user.id} className="border-b">
                        <td className="p-2">{user.name}</td>
                        <td className="p-2">
                          <Badge variant={user.type === 'vendor' ? 'default' : 'secondary'}>
                            {user.type}
                          </Badge>
                        </td>
                        <td className="p-2">{user.location}</td>
                        <td className="p-2 text-sm text-muted-foreground">{user.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <Card>
            <CardHeader>
              <CardTitle>All Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Product</th>
                      <th className="text-left p-2">Merchant</th>
                      <th className="text-left p-2">Price</th>
                      <th className="text-left p-2">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(allProducts, 'name').map(product => (
                      <tr key={product.id} className="border-b">
                        <td className="p-2 font-medium">{product.name}</td>
                        <td className="p-2">{product.merchant}</td>
                        <td className="p-2">₹{product.price}</td>
                        <td className="p-2">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Order ID</th>
                      <th className="text-left p-2">Vendor</th>
                      <th className="text-left p-2">Merchant</th>
                      <th className="text-left p-2">Total</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allOrders.map(order => (
                      <tr key={order.id} className="border-b">
                        <td className="p-2 font-medium">#{order.id}</td>
                        <td className="p-2">{order.vendor}</td>
                        <td className="p-2">{order.merchant}</td>
                        <td className="p-2">₹{order.total}</td>
                        <td className="p-2">
                          <Badge variant={order.status === 'pending' ? 'destructive' : 'default'}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-2 text-sm text-muted-foreground">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;