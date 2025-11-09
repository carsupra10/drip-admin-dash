import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { kpiData, revenueData, ordersData } from "@/lib/mock-data";
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, Activity } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const kpiCards = [
    { title: "Total Revenue", value: kpiData.totalRevenue, change: kpiData.monthlyGrowth, icon: DollarSign, color: "text-success" },
    { title: "Total Orders", value: kpiData.totalOrders.toLocaleString(), change: "+8.2%", icon: ShoppingCart, color: "text-primary" },
    { title: "Active Users", value: kpiData.activeUsers.toLocaleString(), change: "+15.3%", icon: Users, color: "text-secondary" },
    { title: "Total Products", value: kpiData.totalProducts.toLocaleString(), change: "+5.7%", icon: Package, color: "text-accent" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "success";
      case "shipped": return "default";
      case "processing": return "warning";
      default: return "secondary";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to DripXplore Super Admin Panel</p>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiCards.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">{kpi.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue over the past 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Platform health overview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-success" />
                  <span className="text-sm font-medium">System Health</span>
                </div>
                <Badge variant="outline" className="text-success">Good</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Partners</span>
                </div>
                <span className="text-2xl font-bold">{kpiData.totalPartners}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-warning" />
                  <span className="text-sm font-medium">Pending Reviews</span>
                </div>
                <span className="text-2xl font-bold">{kpiData.pendingReviews}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ordersData.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{order.total}</p>
                    <Badge variant={getStatusColor(order.status) as any}>{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
