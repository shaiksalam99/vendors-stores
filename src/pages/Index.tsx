import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Store, ShoppingCart, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Language Toggle */}
      <div className="absolute top-4 right-4">
        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
          <Globe className="w-4 h-4 mr-2" />
          తెలుగు | EN
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            VendorLink
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-2">
            వ్యాపారం సులువు చేస్తున్న మార్కెట్‌ప్లేస్
          </p>
          <p className="text-md text-white/80">
            Connecting Street-Food Vendors with Wholesale Merchants in Andhra Pradesh
          </p>
        </div>

        {/* User Type Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Choose Your Role | మీ పాత్ర ఎంచుకోండి
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Vendor Card */}
            <Card 
              className="cursor-pointer transform hover:scale-105 transition-all duration-300 bg-white/95 border-0 shadow-card-hover"
              onClick={() => navigate('/vendor/dashboard')}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <ShoppingCart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  I'm a Vendor
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  నేను వెండర్‌ని
                </p>
                <p className="text-muted-foreground mb-4">
                  Find wholesale merchants and order supplies for your street-food business
                </p>
                <Button className="w-full bg-gradient-primary border-0 text-white hover:opacity-90">
                  Start Shopping
                </Button>
              </CardContent>
            </Card>

            {/* Merchant Card */}
            <Card 
              className="cursor-pointer transform hover:scale-105 transition-all duration-300 bg-white/95 border-0 shadow-card-hover"
              onClick={() => navigate('/merchant/dashboard')}
            >
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-accent rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <Store className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  I'm a Merchant
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  నేను మర్చంట్‌ని
                </p>
                <p className="text-muted-foreground mb-4">
                  Sell your products to street-food vendors and manage your business
                </p>
                <Button className="w-full bg-gradient-accent border-0 text-white hover:opacity-90">
                  Start Selling
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Admin Access */}
          <div className="text-center">
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/admin')}
            >
              <Users className="w-4 h-4 mr-2" />
              Admin Access
            </Button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-white mb-6">
            Why Choose VendorLink?
          </h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-white/90">
              <div className="bg-white/10 rounded-lg p-4 mb-3">
                <ShoppingCart className="w-8 h-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Easy Ordering</h4>
              <p className="text-sm">Simple COD orders with cart management</p>
            </div>
            <div className="text-white/90">
              <div className="bg-white/10 rounded-lg p-4 mb-3">
                <Store className="w-8 h-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Real-time Updates</h4>
              <p className="text-sm">Live order tracking and notifications</p>
            </div>
            <div className="text-white/90">
              <div className="bg-white/10 rounded-lg p-4 mb-3">
                <Users className="w-8 h-8 mx-auto" />
              </div>
              <h4 className="font-semibold mb-2">Local Network</h4>
              <p className="text-sm">Connect with verified local merchants</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;