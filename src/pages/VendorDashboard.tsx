import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, 
  ShoppingCart, 
  Store, 
  Star, 
  MapPin, 
  Phone,
  Package,
  Clock,
  ArrowLeft,
  Filter,
  Plus,
  Minus,
  Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Demo data
const merchants = [
  { id: 1, name: "వెంకట్ స్టోర్స్", nameEn: "Venkat Stores", address: "Vijayawada", rating: 4.5, categories: ["వెజిటబుల్స్", "స్పైసెస్"] },
  { id: 2, name: "రవి వేల్‌సేల్", nameEn: "Ravi Wholesale", address: "Guntur", rating: 4.2, categories: ["ఆయిల్", "గ్రెయిన్స్"] },
  { id: 3, name: "సుధా ట్రేడర్స్", nameEn: "Sudha Traders", address: "Kakinada", rating: 4.7, categories: ["వెజిటబుల్స్", "ఫ్రూట్స్"] }
];

const products = [
  { id: 1, name: "బంగాళాదుంప", nameEn: "Potato", price: 25, unit: "kg", merchantId: 1, category: "వెజిటబుల్స్", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop" },
  { id: 2, name: "ఉల్లిపాయ", nameEn: "Onion", price: 30, unit: "kg", merchantId: 1, category: "వెజిటబుల్స్", image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=300&h=200&fit=crop" },
  { id: 3, name: "వేప ఆయిల్", nameEn: "Cooking Oil", price: 150, unit: "ltr", merchantId: 2, category: "ఆయిల్", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=200&fit=crop" },
  { id: 4, name: "అరిసి", nameEn: "Rice", price: 45, unit: "kg", merchantId: 2, category: "గ్రెయిన్స్", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop" }
];

const VendorDashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [orders, setOrders] = useState<Array<{id: number, items: {[key: number]: number}, total: number, date: string}>>([]);
  const [activeTab, setActiveTab] = useState("browse");
  const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null);

  const categories = ["వెజిటబుల్స్", "ఆయిల్", "గ్రెయిన్స్", "స్పైసెస్", "ఫ్రూట్స్"];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId] -= 1;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const placeOrder = () => {
    if (Object.keys(cart).length === 0) return;
    
    const total = Object.entries(cart).reduce((sum, [productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return sum + (product ? product.price * quantity : 0);
    }, 0);

    const newOrder = {
      id: Date.now(),
      items: { ...cart },
      total,
      date: new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart({});
    setActiveTab("orders");
  };

  const cartItemsCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

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
              <h1 className="text-xl font-bold text-white">Vendor Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                className="text-white hover:bg-white/20 relative"
                onClick={() => setActiveTab("cart")}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-accent text-white">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === "browse" ? "default" : "outline"}
            onClick={() => setActiveTab("browse")}
          >
            <Store className="w-4 h-4 mr-2" />
            Browse Products
          </Button>
          <Button
            variant={activeTab === "merchants" ? "default" : "outline"}
            onClick={() => setActiveTab("merchants")}
          >
            <Store className="w-4 h-4 mr-2" />
            Merchants
          </Button>
          <Button
            variant={activeTab === "orders" ? "default" : "outline"}
            onClick={() => setActiveTab("orders")}
          >
            <Package className="w-4 h-4 mr-2" />
            Orders
          </Button>
          <Button
            variant={activeTab === "cart" ? "default" : "outline"}
            onClick={() => setActiveTab("cart")}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart ({cartItemsCount})
          </Button>
        </div>

        {/* Browse Products Tab */}
        {activeTab === "browse" && (
          <div>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products... / ప్రొడక్ట్స్ వెతకండి..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <Button
                variant={selectedCategory === "" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("")}
              >
                All
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => {
                const merchant = merchants.find(m => m.id === product.merchantId);
                return (
                  <Card key={product.id} className="hover:shadow-card-hover transition-shadow">
                    <CardContent className="p-4">
                      <div className="mb-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      </div>
                      
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.nameEn}</p>
                        </div>
                        <Badge variant="secondary">{product.category}</Badge>
                      </div>
                      
                      <div className="mb-3">
                        <p className="text-lg font-bold text-primary">₹{product.price}/{product.unit}</p>
                        <p className="text-sm text-muted-foreground">by {merchant?.name}</p>
                      </div>

                      <Button 
                        className="w-full"
                        onClick={() => addToCart(product.id)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Merchants Tab */}
        {activeTab === "merchants" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {merchants.map(merchant => (
              <Card key={merchant.id} className="hover:shadow-card-hover transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <div className="bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <Store className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{merchant.name}</h3>
                    <p className="text-sm text-muted-foreground">{merchant.nameEn}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {merchant.address}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      {merchant.rating} rating
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Categories:</p>
                    <div className="flex flex-wrap gap-1">
                      {merchant.categories.map(cat => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" variant="outline">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Merchant Details</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-center">
                          <div className="bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3">
                            <Store className="w-10 h-10 text-white" />
                          </div>
                          <h3 className="text-xl font-bold">{merchant.name}</h3>
                          <p className="text-muted-foreground">{merchant.nameEn}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">Location</p>
                              <p className="text-sm text-muted-foreground">{merchant.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <div>
                              <p className="font-medium">Rating</p>
                              <p className="text-sm text-muted-foreground">{merchant.rating} out of 5</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <Package className="w-5 h-5 text-primary mt-0.5" />
                            <div>
                              <p className="font-medium">Categories</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {merchant.categories.map(cat => (
                                  <Badge key={cat} variant="secondary" className="text-xs">
                                    {cat}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-3">Available Products</h4>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {products
                              .filter(product => product.merchantId === merchant.id)
                              .map(product => (
                                <div key={product.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-sm">{product.name}</p>
                                    <p className="text-xs text-muted-foreground">₹{product.price}/{product.unit}</p>
                                  </div>
                                  <Button
                                    size="sm"
                                    onClick={() => addToCart(product.id)}
                                  >
                                    Add
                                  </Button>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Cart Tab */}
        {activeTab === "cart" && (
          <Card>
            <CardHeader>
              <CardTitle>Shopping Cart</CardTitle>
            </CardHeader>
            <CardContent>
              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                <div>
                  {Object.entries(cart).map(([productId, quantity]) => {
                    const product = products.find(p => p.id === parseInt(productId));
                    if (!product) return null;
                    
                    return (
                      <div key={productId} className="flex items-center gap-4 py-3 border-b">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <p className="text-sm text-muted-foreground">₹{product.price}/{product.unit}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(product.id)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="font-medium w-8 text-center">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addToCart(product.id)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₹{product.price * quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="mt-6 pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-lg font-bold text-primary">
                        ₹{Object.entries(cart).reduce((total, [productId, quantity]) => {
                          const product = products.find(p => p.id === parseInt(productId));
                          return total + (product ? product.price * quantity : 0);
                        }, 0)}
                      </span>
                    </div>
                    <Button 
                      className="w-full bg-gradient-primary"
                      onClick={placeOrder}
                    >
                      Place COD Order
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent>
              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No orders yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your order history will appear here
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">Order #{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.date}</p>
                        </div>
                        <Badge variant="outline">COD</Badge>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        {Object.entries(order.items).map(([productId, quantity]) => {
                          const product = products.find(p => p.id === parseInt(productId));
                          if (!product) return null;
                          
                          return (
                            <div key={productId} className="flex items-center gap-3 text-sm">
                              <img 
                                src={product.image} 
                                alt={product.name}
                                className="w-8 h-8 object-cover rounded"
                              />
                              <span>{product.name}</span>
                              <span className="text-muted-foreground">x{quantity}</span>
                              <span className="ml-auto">₹{product.price * quantity}</span>
                            </div>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="font-medium">Total: ₹{order.total}</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Reorder functionality
                            setCart(order.items);
                            setActiveTab("cart");
                          }}
                        >
                          Reorder
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorDashboard;