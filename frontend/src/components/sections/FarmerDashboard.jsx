import {useState, useEffect} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

const FarmerDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d");
  const [refreshing, setRefreshing] = useState(false);

  // Mock API data - in real app this would come from your backend
  const mockDashboardData = {
    farmerProfile: {
      name: "Rajesh Kumar",
      farmName: "Green Valley Organic Farm",
      location: "Maharashtra, India",
      joinDate: "January 2023",
      verified: true,
      rating: 4.8,
      totalProducts: 24,
    },
    metrics: {
      totalRevenue: 245000,
      totalOrders: 156,
      activeListings: 12,
      pendingOrders: 3,
      averageRating: 4.8,
      totalCustomers: 89,
    },
    revenueData: [
      {month: "Jan", revenue: 35000, orders: 20},
      {month: "Feb", revenue: 42000, orders: 25},
      {month: "Mar", revenue: 38000, orders: 22},
      {month: "Apr", revenue: 51000, orders: 31},
      {month: "May", revenue: 48000, orders: 28},
      {month: "Jun", revenue: 31000, orders: 30},
    ],
    topProducts: [
      {
        id: 1,
        name: "Organic Tomatoes",
        sales: 45,
        revenue: 67500,
        trend: "up",
        growth: 12.5,
      },
      {
        id: 2,
        name: "Fresh Spinach",
        sales: 38,
        revenue: 28500,
        trend: "up",
        growth: 8.3,
      },
      {
        id: 3,
        name: "Bell Peppers",
        sales: 32,
        revenue: 48000,
        trend: "down",
        growth: -3.2,
      },
      {
        id: 4,
        name: "Cucumber",
        sales: 29,
        revenue: 21750,
        trend: "up",
        growth: 15.1,
      },
    ],
    recentOrders: [
      {
        id: "ORD-001",
        customer: "Mumbai Fresh Mart",
        product: "Organic Tomatoes",
        quantity: "50 kg",
        amount: 2250,
        status: "delivered",
        date: "2024-09-28",
      },
      {
        id: "ORD-002",
        customer: "Green Grocery Store",
        product: "Fresh Spinach",
        quantity: "25 kg",
        amount: 1875,
        status: "pending",
        date: "2024-09-27",
      },
      {
        id: "ORD-003",
        customer: "Organic Market Co.",
        product: "Bell Peppers",
        quantity: "30 kg",
        amount: 4500,
        status: "processing",
        date: "2024-09-26",
      },
    ],
    notifications: [
      {
        id: 1,
        type: "order",
        message: "New order received for Organic Tomatoes",
        time: "2 hours ago",
        urgent: false,
      },
      {
        id: 2,
        type: "payment",
        message: "Payment of ₹2,250 received",
        time: "5 hours ago",
        urgent: false,
      },
      {
        id: 3,
        type: "alert",
        message: "Low stock alert for Fresh Spinach",
        time: "1 day ago",
        urgent: true,
      },
    ],
  };

  // Simulate API call with error handling
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate occasional API error (10% chance)
      if (Math.random() < 0.1) {
        throw new Error("Failed to fetch dashboard data");
      }

      setDashboardData(mockDashboardData);
    } catch (err) {
      setError(err.message);
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Refresh data function
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardData();
    setRefreshing(false);
  };

  // Initialize dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, [selectedTimeRange]);

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-950/30 dark:text-green-300 dark:border-green-700";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-950/30 dark:text-yellow-300 dark:border-yellow-700";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-950/30 dark:text-gray-300 dark:border-gray-700";
    }
  };

  // Get trend color and icon
  const getTrendDisplay = (trend, growth) => {
    const isPositive = trend === "up";
    return {
      color: isPositive
        ? "text-green-600 dark:text-green-400"
        : "text-red-600 dark:text-red-400",
      icon: isPositive ? "📈" : "📉",
      text: `${isPositive ? "+" : ""}${growth}%`,
    };
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Simple Bar Chart Component
  const SimpleBarChart = ({data}) => {
    const maxRevenue = Math.max(...data.map((d) => d.revenue));

    return (
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-8 text-xs text-muted-foreground font-medium">
              {item.month}
            </div>
            <div className="flex-1 bg-muted/50 dark:bg-zinc-700/50 rounded-full h-6 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-emerald-500 to-green-500 h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
                style={{width: `${(item.revenue / maxRevenue) * 100}%`}}
              >
                <span className="text-white text-xs font-medium">
                  {formatCurrency(item.revenue)}
                </span>
              </div>
            </div>
            <div className="w-12 text-xs text-muted-foreground text-right">
              {item.orders}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Loading Component
  const LoadingCard = ({className = ""}) => (
    <Card
      className={`animate-pulse backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 ${className}`}
    >
      <CardHeader>
        <div className="h-4 bg-muted/60 dark:bg-zinc-600/60 rounded w-1/3"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-8 bg-muted/60 dark:bg-zinc-600/60 rounded w-1/2"></div>
          <div className="h-4 bg-muted/60 dark:bg-zinc-600/60 rounded w-3/4"></div>
        </div>
      </CardContent>
    </Card>
  );

  // Error Component
  const ErrorCard = () => (
    <Card className="border-red-200 bg-red-50/80 dark:bg-red-950/30 dark:border-red-700 backdrop-blur-lg">
      <CardContent className="p-6 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
          Failed to load dashboard
        </h3>
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <Button
          onClick={handleRefresh}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <LoadingCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LoadingCard className="h-96" />
          <LoadingCard className="h-96" />
        </div>
      </div>
    );
  }

  if (error) {
    return <ErrorCard />;
  }

  return (
    <div className="space-y-8">
      {/* Dashboard Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome back, {dashboardData.farmerProfile.name}
          </h2>
          <p className="text-muted-foreground">
            {dashboardData.farmerProfile.farmName} •{" "}
            {dashboardData.farmerProfile.location}
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {/* Time Range Selector */}
          <div className="flex rounded-lg border border-border/60 dark:border-zinc-700/60 overflow-hidden backdrop-blur-sm bg-white/30 dark:bg-zinc-800/30">
            {["7d", "30d", "90d"].map((range) => (
              <Button
                key={range}
                variant={selectedTimeRange === range ? "default" : "ghost"}
                size="sm"
                className={`rounded-none border-none ${
                  selectedTimeRange === range
                    ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                    : "hover:bg-white/50 dark:hover:bg-zinc-700/50 text-foreground"
                }`}
                onClick={() => setSelectedTimeRange(range)}
              >
                {range === "7d"
                  ? "7 Days"
                  : range === "30d"
                  ? "30 Days"
                  : "90 Days"}
              </Button>
            ))}
          </div>
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
            size="sm"
            className="border-emerald-600/60 text-emerald-600 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/30 backdrop-blur-sm bg-white/30 dark:bg-zinc-800/30 dark:text-emerald-400 dark:border-emerald-500/60"
          >
            {refreshing ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-600 dark:border-emerald-400 border-t-transparent"></div>
                Refreshing...
              </span>
            ) : (
              <span className="flex items-center gap-2">🔄 Refresh</span>
            )}
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-emerald-200 dark:hover:border-emerald-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
              {formatCurrency(dashboardData.metrics.totalRevenue)}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-600 dark:text-green-400 mr-1">
                ↗️
              </span>
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-blue-200 dark:hover:border-blue-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
              {dashboardData.metrics.totalOrders}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-green-600 dark:text-green-400 mr-1">
                📈
              </span>
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-purple-200 dark:hover:border-purple-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
              {dashboardData.metrics.activeListings}
            </div>
            <p className="text-xs text-muted-foreground flex items-center">
              <span className="text-yellow-600 dark:text-yellow-400 mr-1">
                📦
              </span>
              {dashboardData.metrics.pendingOrders} pending orders
            </p>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 hover:border-orange-200 dark:hover:border-orange-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Customer Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1 flex items-center">
              {dashboardData.metrics.averageRating}
              <span className="text-lg ml-1">⭐</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {dashboardData.metrics.totalCustomers} total customers
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Chart */}
        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span>📊</span>
              Revenue Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SimpleBarChart data={dashboardData.revenueData} />
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span>🏆</span>
              Top Performing Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.topProducts.map((product) => {
                const trendDisplay = getTrendDisplay(
                  product.trend,
                  product.growth
                );
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-4 bg-white/50 dark:bg-zinc-700/50 rounded-xl border border-border/40 dark:border-zinc-600/40 hover:bg-white/70 dark:hover:bg-zinc-700/70 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">
                        {product.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {product.sales} sales •{" "}
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                    <div
                      className={`text-sm font-medium ${trendDisplay.color} flex items-center gap-1`}
                    >
                      <span>{trendDisplay.icon}</span>
                      {trendDisplay.text}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders and Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span>📋</span>
              Recent Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 bg-white/50 dark:bg-zinc-700/50 border border-border/40 dark:border-zinc-600/40 rounded-xl hover:shadow-md transition-all duration-200 backdrop-blur-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">
                        {order.customer}
                      </h4>
                      <Badge
                        className={`${getStatusColor(order.status)} text-xs`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {order.product} • {order.quantity}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Order #{order.id} • {order.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                      {formatCurrency(order.amount)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="backdrop-blur-lg bg-white/70 dark:bg-zinc-800/70 border-border/60 dark:border-zinc-700/60 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <span>🔔</span>
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dashboardData.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg border transition-all duration-200 hover:shadow-sm backdrop-blur-sm ${
                    notification.urgent
                      ? "bg-red-50/80 dark:bg-red-950/30 border-red-200 dark:border-red-700"
                      : "bg-white/40 dark:bg-zinc-700/40 border-border/50 dark:border-zinc-600/50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">
                      {notification.type === "order"
                        ? "📦"
                        : notification.type === "payment"
                        ? "💰"
                        : "⚠️"}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${
                          notification.urgent
                            ? "text-red-800 dark:text-red-300"
                            : "text-foreground"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FarmerDashboard;
