import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { detectAuthMethod, loginUser, setCurrentUser, generateTOTPSecret } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [authMethod, setAuthMethod] = useState<'superadmin' | 'oauth' | null>(null);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
    if (value) {
      setAuthMethod(detectAuthMethod(value));
    } else {
      setAuthMethod(null);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const user = loginUser(identifier, totpCode);
      if (user) {
        setCurrentUser(user);
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid credentials or TOTP code",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during login",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleOAuth = () => {
    toast({
      title: "OAuth Not Implemented",
      description: "Google OAuth will be implemented with backend integration",
    });
  };

  const handleGenerateQR = async () => {
    if (!newUsername) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a username",
      });
      return;
    }

    try {
      const { qrCode: qr } = await generateTOTPSecret(newUsername);
      setQrCode(qr);
      toast({
        title: "QR Code Generated",
        description: "Scan this with Google Authenticator",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate QR code",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">DripXplore Admin</CardTitle>
          <CardDescription>Super Admin Panel Login</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register Super Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Username or Email</Label>
                <Input
                  id="identifier"
                  placeholder="admin"
                  value={identifier}
                  onChange={(e) => handleIdentifierChange(e.target.value)}
                />
              </div>

              {authMethod === 'superadmin' && (
                <div className="space-y-2">
                  <Label htmlFor="totp">TOTP Code</Label>
                  <Input
                    id="totp"
                    placeholder="123456"
                    maxLength={6}
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the 6-digit code from Google Authenticator (or use 123456 for demo)
                  </p>
                </div>
              )}

              {authMethod === 'oauth' && (
                <div className="space-y-2">
                  <Button
                    onClick={handleGoogleOAuth}
                    variant="outline"
                    className="w-full"
                  >
                    Continue with Google
                  </Button>
                </div>
              )}

              {authMethod === 'superadmin' && (
                <Button
                  onClick={handleLogin}
                  disabled={!identifier || !totpCode || loading}
                  className="w-full"
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              )}
            </TabsContent>

            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newUsername">Username</Label>
                <Input
                  id="newUsername"
                  placeholder="newadmin"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>

              <Button onClick={handleGenerateQR} className="w-full">
                Generate TOTP QR Code
              </Button>

              {qrCode && (
                <div className="space-y-2">
                  <Label>Scan with Google Authenticator</Label>
                  <div className="flex justify-center">
                    <img src={qrCode} alt="TOTP QR Code" className="w-48 h-48" />
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    After scanning, enter a code from your app to verify
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo credentials:</p>
            <p className="font-mono">Username: admin</p>
            <p className="font-mono">TOTP: 123456</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
