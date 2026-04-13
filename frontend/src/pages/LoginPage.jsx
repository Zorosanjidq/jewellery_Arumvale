import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, User, Store, Shield, Mail, Lock, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import loginBackground from "@/assets/loginbackground.jpg";
const roles = [{
  key: "user",
  label: "Customer",
  icon: User,
  desc: "Browse & compare jewellery"
}, {
  key: "vendor",
  label: "Shop Owner",
  icon: Store,
  desc: "Manage your jewellery shop"
}, {
  key: "admin",
  label: "Admin",
  icon: Shield,
  desc: "Platform administration"
}];
export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    login
  } = useAuth();
  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await login(email, password);
    if (error) {
      toast({
        title: "Login Failed",
        description: error,
        variant: "destructive"
      });
      setLoading(false);
      return;
    }
    toast({
      title: "Login Successful",
      description: `Welcome back!`
    });
    if (selectedRole === "admin") navigate("/admin");else if (selectedRole === "vendor") navigate("/vendor");else navigate("/");
    setLoading(false);
  };
  return <div className="min-h-screen flex items-center justify-center px-4 py-12 relative" style={{
      backgroundImage: `url(${loginBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full max-w-sm relative z-10">
        {/* Glass Container */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block mb-6">
              <span className="font-display text-2xl font-bold gold-text">Arumvale</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-white/80 text-sm mt-1">Sign in to your account</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {roles.map(role => <button key={role.key} onClick={() => setSelectedRole(role.key)} className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all text-center ${selectedRole === role.key ? "border-yellow-400 bg-yellow-400/20 text-yellow-400" : "border-white/20 bg-white/10 text-white/70 hover:border-white/30 hover:bg-white/20"}`}>
                <role.icon className="h-5 w-5" />
                <span className="text-xs font-medium">{role.label}</span>
              </button>)}
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-4 space-y-3 shadow-lg">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-800">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-800">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-border" />
              Remember me
            </label>
            <a href="#" className="text-yellow-600 hover:underline text-xs">Forgot password?</a>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Sign In as {roles.find(r => r.key === selectedRole)?.label}
          </Button>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-yellow-400 hover:underline font-medium">Create Account</Link>
          {" · "}
          <Link to="/register/vendor" className="text-yellow-400 hover:underline font-medium">Register as Shop Owner</Link>
        </p>
        </div>
      </div>
    </div>;
}
