import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const auditLogsData = [
  {
    id: "log_001",
    adminEmail: "admin@dripxplore.com",
    action: "PARTNER_CREATED",
    details: "Created new partner: New Store",
    timestamp: "2024-11-09 10:30:00"
  },
  {
    id: "log_002",
    adminEmail: "admin@dripxplore.com",
    action: "PRODUCT_APPROVED",
    details: "Approved product: Wireless Headphones (ptr_002)",
    timestamp: "2024-11-09 09:15:00"
  },
  {
    id: "log_003",
    adminEmail: "admin@dripxplore.com",
    action: "USER_ROLE_CHANGED",
    details: "Changed role for user sarah@urbanfashion.com to partner_owner",
    timestamp: "2024-11-09 08:45:00"
  },
  {
    id: "log_004",
    adminEmail: "admin@dripxplore.com",
    action: "OFFER_CREATED",
    details: "Created new offer: Black Friday Sale (25% off)",
    timestamp: "2024-11-08 16:20:00"
  },
  {
    id: "log_005",
    adminEmail: "admin@dripxplore.com",
    action: "PARTNER_STATUS_CHANGED",
    details: "Changed status for partner ptr_003 from pending to active",
    timestamp: "2024-11-08 14:10:00"
  }
];

const getActionColor = (action: string) => {
  if (action.includes('CREATED')) return 'default';
  if (action.includes('APPROVED')) return 'default';
  if (action.includes('CHANGED')) return 'secondary';
  if (action.includes('DELETED')) return 'destructive';
  return 'outline';
};

export default function AuditLogs() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground">Track all administrative actions</p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Complete history of admin actions</CardDescription>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search logs..." className="pl-8 w-[300px]" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditLogsData.map((log) => (
                <div key={log.id} className="flex items-start gap-4 border-b border-border pb-4 last:border-0 last:pb-0">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={getActionColor(log.action) as any}>
                        {log.action}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>
                    <p className="text-sm">{log.details}</p>
                    <p className="text-xs text-muted-foreground">by {log.adminEmail}</p>
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
