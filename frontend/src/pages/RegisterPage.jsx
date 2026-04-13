import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Calendar, CreditCard, Heart, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import loginBackground from "@/assets/loginbackground.jpg";
export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const {
    signup
  } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    preferredCategory: "",
    budget: "",
    referralCode: ""
  });
  const update = (field, value) => setForm(prev => ({
    ...prev,
    [field]: value
  }));
  const handleSubmit = async e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast({
        title: "Passwords don't match",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const {
      error
    } = await signup(form.email, form.password, `${form.firstName} ${form.lastName}`, "user");
    setLoading(false);
    if (error) {
      toast({
        title: "Registration Failed",
        description: error,
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Registration Successful!",
      description: "Welcome to Arumvale. Please check your email to verify."
    });
    navigate("/login");
  };
  return <div className="min-h-screen flex items-center justify-center px-4 py-12 relative" style={{
      backgroundImage: `url(${loginBackground})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full max-w-lg relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <span className="font-display text-2xl font-bold gold-text">Arumvale</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-white">Create Your Account</h1>
          <p className="text-white/80 text-sm mt-1">Join the smart jewellery shopping experience</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map(s => <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</div>
              {s < 3 && <div className={`w-8 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
            </div>)}
        </div>
        <p className="text-center text-xs text-white/80 mb-4">
          {step === 1 ? "Personal Information" : step === 2 ? "Contact & Address" : "Preferences"}
        </p>

        <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
          {step === 1 && <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">First Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Arjun" value={form.firstName} onChange={e => update("firstName", e.target.value)} className="pl-10" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">Last Name *</label>
                  <Input placeholder="Sharma" value={form.lastName} onChange={e => update("lastName", e.target.value)} required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="email" placeholder="arjun@example.com" value={form.email} onChange={e => update("email", e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => update("phone", e.target.value)} className="pl-10" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" value={form.password} onChange={e => update("password", e.target.value)} className="pl-10 pr-10" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">Confirm Password *</label>
                  <Input type="password" placeholder="••••••••" value={form.confirmPassword} onChange={e => update("confirmPassword", e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="date" value={form.dob} onChange={e => update("dob", e.target.value)} className="pl-10" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">Gender</label>
                  <Select value={form.gender} onValueChange={v => update("gender", v)}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>}

          {step === 2 && <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">Full Address *</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea placeholder="House/Flat No., Street, Locality" value={form.address} onChange={e => update("address", e.target.value)} className="pl-10 min-h-[80px]" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">City *</label>
                  <Input placeholder="Mumbai" value={form.city} onChange={e => update("city", e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-800">State *</label>
                  <Select value={form.state} onValueChange={v => update("state", v)}>
                    <SelectTrigger><SelectValue placeholder="Select State" /></SelectTrigger>
                    <SelectContent>
                      {["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "Rajasthan", "West Bengal", "Kerala", "Uttar Pradesh", "Telangana"].map(s => <SelectItem key={s} value={s.toLowerCase()}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-800">PIN Code *</label>
                <Input placeholder="400001" value={form.pincode} onChange={e => update("pincode", e.target.value)} required maxLength={6} />
              </div>
            </div>}

          {step === 3 && <div className="space-y-4">
                 

             

              <label className="flex items-start gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-border mt-0.5" required />
                I agree to the <a href="#" className="text-yellow-600 hover:underline">Terms & Conditions</a> and <a href="#" className="text-yellow-600 hover:underline">Privacy Policy</a>
              </label>
            </div>}

          <div className="flex gap-3 mt-6">
            {step > 1 && <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(step - 1)}>Back</Button>}
            {step < 3 ? <Button type="button" className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => setStep(step + 1)}>
                Continue
              </Button> : <Button type="submit" disabled={loading} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Create Account
              </Button>}
          </div>
        </form>

        <p className="text-center text-sm text-white/80 mt-6">
          Already have an account? <Link to="/login" className="text-yellow-400 hover:underline font-medium">Sign In</Link>
          {" · "}
          <Link to="/register/vendor" className="text-yellow-400 hover:underline font-medium">Register as Shop Owner</Link>
        </p>
      </div>
    </div>;
}
