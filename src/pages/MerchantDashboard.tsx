import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Users,
  TrendingUp,
  ArrowLeft,
  Phone,
  MapPin,
  Clock,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Demo data
const merchantProducts = [
  { id: 1, name: "బంగాళాదుంప", nameEn: "Potato", price: 25, unit: "kg", category: "వెజిటబుల్స్", stock: 100 },
  { id: 2, name: "ఉల్లిపాయ", nameEn: "Onion", price: 30, unit: "kg", category: "వెజిటబుల్స్", stock: 50 },
  { id: 3, name: "వేప ఆయిల్", nameEn: "Cooking Oil", price: 150, unit: "ltr", category: "ఆయిల్", stock: 25 }
];

const orders = [
  {
    id: 1,
    vendorName: "రాజు టిఫిన్ సెంటర్",
    vendorPhone: "+91 9876543210",
    address: "Gandhi Road, Vijayawada",
    items: [
      { name: "బంగాళాదుంప", quantity: 10, price: 25 },
      { name: "ఉల్లిపాయ", quantity: 5, price: 30 }
    ],
    total: 400,
    status: "pending",
    time: "2 hours ago"
  },
  {
    id: 2,
    vendorName: "సుధా ఫుడ్ కార్ట్",
    vendorPhone: "+91 9876543211",
    address: "MG Road, Guntur",
    items: [
      { name: "వేప ఆయిల్", quantity: 2, price: 150 }
    ],
    total: 300,
    status: "confirmed",
    time: "4 hours ago"
  }
];

const MerchantDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    nameEn: "",
    price: "",
    unit: "kg",
    category: "",
    stock: ""
  });

  const handleAddProduct = () => {
    // Here you would typically add to database
    console.log("Adding product:", newProduct);
    setShowAddProduct(false);
    setNewProduct({ name: "", nameEn: "", price: "", unit: "kg", category: "", stock: "" });
  };

  const updateOrderStatus = (orderId: number, status: string) => {
    // Here you would typically update in database
    console.log("Updating order", orderId, "to", status);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-accent shadow-elegant">
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
              <h1 className="text-xl font-bold text-white">Merchant Dashboard</h1>
            </div>
            <div className="text-white text-right">
              <h2 className="font-semibold">వెంకట్ స్టోర్స్</h2>
              <p className="text-sm text-white/80">Venkat Stores</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold text-primary">
                    {orders.filter(o => o.status === 'pending').length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Products</p>
                  <p className="text-2xl font-bold text-primary">{merchantProducts.length}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Revenue</p>
                  <p className="text-2xl font-bold text-primary">₹700</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "orders" ? "default" : "outline"}
            onClick={() => setActiveTab("orders")}
          >
            <Package className="w-4 h-4 mr-2" />
            Orders ({orders.filter(o => o.status === 'pending').length})
          </Button>
          <Button
            variant={activeTab === "products" ? "default" : "outline"}
            onClick={() => setActiveTab("products")}
          >
            <Package className="w-4 h-4 mr-2" />
            My Products
          </Button>
          <Button
            variant={activeTab === "profile" ? "default" : "outline"}
            onClick={() => setActiveTab("profile")}
          >
            <Users className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Incoming Orders</h2>
              <Badge variant="secondary">
                {orders.filter(o => o.status === 'pending').length} pending
              </Badge>
            </div>

            {orders.map(order => (
              <Card key={order.id} className="border-l-4 border-l-primary">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.vendorName}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {order.vendorPhone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {order.time}
                        </span>
                      </div>
                    </div>
                    <Badge 
                      variant={order.status === 'pending' ? 'destructive' : 'default'}
                    >
                      {order.status}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3 h-3" />
                      Delivery Address:
                    </div>
                    <p className="text-sm">{order.address}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Order Items:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} x {item.quantity}</span>
                          <span>₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span>Total:</span>
                        <span>₹{order.total}</span>
                      </div>
                    </div>
                  </div>

                  {order.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                        className="bg-success"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm Order
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateOrderStatus(order.id, 'rejected')}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Products</h2>
              <Button onClick={() => setShowAddProduct(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </div>

            {showAddProduct && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add New Product</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Product Name (Telugu)</label>
                      <Input
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        placeholder="తెలుగు పేరు"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Product Name (English)</label>
                      <Input
                        value={newProduct.nameEn}
                        onChange={(e) => setNewProduct({...newProduct, nameEn: e.target.value})}
                        placeholder="English name"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Price</label>
                      <Input
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        placeholder="₹"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Unit</label>
                      <select 
                        className="w-full p-2 border rounded-md"
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                      >
                        <option value="kg">kg</option>
                        <option value="ltr">ltr</option>
                        <option value="pcs">pcs</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Stock</label>
                      <Input
                        type="number"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                        placeholder="Available quantity"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Input
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                      placeholder="వెజిటబుల్స్, ఆయిల్, etc."
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleAddProduct}>Add Product</Button>
                    <Button variant="outline" onClick={() => setShowAddProduct(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {merchantProducts.map(product => (
                <Card key={product.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-primary">₹{product.price}/{product.unit}</p>
                      <Badge variant="secondary">{product.category}</Badge>
                      <p className="text-sm text-muted-foreground">Stock: {product.stock} {product.unit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <Card>
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Business Name (Telugu)</label>
                  <Input defaultValue="వెంకట్ స్టోర్స్" />
                </div>
                <div>
                  <label className="text-sm font-medium">Business Name (English)</label>
                  <Input defaultValue="Venkat Stores" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Address</label>
                <Textarea defaultValue="Gandhi Road, Vijayawada, Andhra Pradesh" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <Input defaultValue="+91 9876543210" />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input defaultValue="venkat@stores.com" />
                </div>
              </div>

              <Button>Update Profile</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MerchantDashboard;