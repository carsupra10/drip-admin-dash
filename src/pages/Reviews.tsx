import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { reviewsData } from "@/lib/mock-data";
import { Star, Check, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Reviews() {
  const { toast } = useToast();

  const handleApprove = (reviewId: string) => {
    toast({
      title: "Review approved",
      description: "The review is now visible to customers",
    });
  };

  const handleReject = (reviewId: string) => {
    toast({
      title: "Review rejected",
      description: "The review has been rejected",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
          <p className="text-muted-foreground">Moderate customer reviews and ratings</p>
        </div>

        <div className="grid gap-4">
          {reviewsData.map((review) => (
            <Card key={review.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{review.product}</CardTitle>
                    <CardDescription>
                      By {review.user} • {review.date}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={review.status === 'approved' ? 'default' : 'secondary'}>
                      {review.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating
                          ? "fill-warning text-warning"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium">{review.rating} / 5</span>
                </div>
                <p className="text-sm">{review.comment}</p>
                {review.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(review.id)}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(review.id)}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
