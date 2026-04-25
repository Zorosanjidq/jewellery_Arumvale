import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, CheckCircle, Clock, XCircle, ExternalLink, Eye, Ban, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import styles from "./ManageVendorsPage.module.css";

const getStatusConfig = (status) => {
  switch(status) {
    case "Verified":
      return {
        style: styles.statusVerified,
        icon: CheckCircle
      };
    case "Pending":
      return {
        style: styles.statusPending,
        icon: Clock
      };
    case "Suspended":
      return {
        style: styles.statusSuspended,
        icon: XCircle
      };
    default:
      return {
        style: styles.statusPending,
        icon: Clock
      };
  }
};

export default function ManageVendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/vendors", {
        withCredentials: true
      });
      setVendors(response.data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch vendors",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVendor = async (vendorId) => {
    try {
      await axios.put(`http://localhost:5000/api/vendors/${vendorId}/approve`, {
        approved: true
      }, {
        withCredentials: true
      });
      
      toast({
        title: "Success",
        description: "Vendor approved successfully"
      });
      
      fetchVendors();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve vendor",
        variant: "destructive"
      });
    }
  };

  const handleRejectVendor = async (vendorId) => {
    try {
      await axios.put(`http://localhost:5000/api/vendors/${vendorId}/approve`, {
        approved: false,
        rejectionReason: "Application rejected by admin"
      }, {
        withCredentials: true
      });
      
      toast({
        title: "Success",
        description: "Vendor rejected successfully"
      });
      
      fetchVendors();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject vendor",
        variant: "destructive"
      });
    }
  };

  const handleToggleVendorStatus = async (vendorId, isActive) => {
    try {
      await axios.put(`http://localhost:5000/api/vendors/${vendorId}/toggle-status`, {
        isActive,
        suspensionReason: isActive ? null : "Suspended by admin"
      }, {
        withCredentials: true
      });
      
      toast({
        title: "Success",
        description: isActive ? "Vendor activated successfully" : "Vendor suspended successfully"
      });
      
      fetchVendors();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update vendor status",
        variant: "destructive"
      });
    }
  };

  const getStatusConfig = (vendor) => {
    if (!vendor.user?.isApproved) {
      return {
        style: styles.statusPending,
        icon: Clock,
        status: "Pending"
      };
    }
    
    if (!vendor.isActive) {
      return {
        style: styles.statusSuspended,
        icon: XCircle,
        status: "Suspended"
      };
    }
    
    if (vendor.isVerified) {
      return {
        style: styles.statusVerified,
        icon: CheckCircle,
        status: "Verified"
      };
    }
    
    return {
      style: styles.statusPending,
      icon: Clock,
      status: "Pending"
    };
  };

  const filtered = vendors.filter(v => 
    v.shopName?.toLowerCase().includes(search.toLowerCase()) ||
    v.user?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
    v.user?.email?.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: vendors.length,
    verified: vendors.filter(v => v.isVerified && v.isActive).length,
    pending: vendors.filter(v => !v.user?.isApproved).length,
    suspended: vendors.filter(v => !v.isActive).length
  };

  if (loading) {
    return <div className={styles.container}>
      <div className="text-center py-8">Loading vendors...</div>
    </div>;
  }

  return <div className={styles.container}>
      <div className={styles.summaryGrid}>
        {[{
        label: "Total Vendors",
        value: stats.total.toString()
      }, {
        label: "Verified",
        value: stats.verified.toString()
      }, {
        label: "Pending Review",
        value: stats.pending.toString()
      }, {
        label: "Suspended",
        value: stats.suspended.toString()
      }].map(s => <Card key={s.label} className={styles.summaryCard}>
            <CardContent className={styles.summaryCardContent}>
              <p className={styles.summaryLabel}>{s.label}</p>
              <p className={styles.summaryValue}>{s.value}</p>
            </CardContent>
          </Card>)}
      </div>

      <Card className={styles.tableCard}>
        <CardHeader className={styles.tableHeader}>
          <div className={styles.tableHeaderContentRow}>
            <CardTitle className={styles.tableTitle}>All Vendors</CardTitle>
            <div className={styles.tableActions}>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <Input placeholder="Search vendors..." value={search} onChange={e => setSearch(e.target.value)} className={styles.searchInput} />
              </div>
              <Button variant="outline" size="sm" className={styles.filterButton}><Filter className="h-3.5 w-3.5" /> Filter</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className={styles.tableContent}>
          <div className={styles.tableContainer}>
            <table className={styles.vendorsTable}>
              <thead>
                <tr className={styles.tableHead}>
                  <th className={styles.tableCell}>Vendor</th>
                  <th className={`${styles.tableCell} ${styles.hiddenMd}`}>Products</th>
                  <th className={`${styles.tableCell} ${styles.hiddenSm}`}>Revenue</th>
                  <th className={`${styles.tableCell} ${styles.hiddenLg}`}>Fulfillment</th>
                  <th className={styles.tableCell}>Status</th>
                  <th className={styles.tableCell}></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(v => {
                const sc = getStatusConfig(v);
                const StatusIcon = sc.icon;
                return <tr key={v._id} className="tableBody tr">
                      <td className={styles.tableCell}>
                        <div className={styles.vendorInfo}>
                          <p className={styles.vendorName}>{v.shopName}</p>
                          <p className={styles.vendorOwner}>{v.user?.firstName} {v.user?.lastName}</p>
                        </div>
                      </td>
                      <td className={`${styles.tableCell} text-foreground font-medium ${styles.hiddenMd}`}>{v.totalProducts || 0}</td>
                      <td className={`${styles.tableCell} text-foreground font-medium ${styles.hiddenSm}`}>${(v.totalSales || 0).toLocaleString()}</td>
                      <td className={`${styles.tableCell} ${styles.hiddenLg}`}>
                        <div className={styles.fulfillmentContainer}>
                          <Progress value={85} className={styles.fulfillmentProgress} />
                          <span className={styles.fulfillmentText}>85%</span>
                        </div>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${sc.style}`}>
                          <StatusIcon className={styles.statusIcon} /> {sc.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.actionCell}>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <button className={styles.actionButton}>
                                <MoreHorizontal className="h-4 w-4" />
                              </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleApproveVendor(v._id)} disabled={v.user?.isApproved}>
                                <Check className="h-4 w-4 mr-2" /> Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleRejectVendor(v._id)} disabled={v.user?.isApproved}>
                                <XCircle className="h-4 w-4 mr-2" /> Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleToggleVendorStatus(v._id, !v.isActive)}>
                                {v.isActive ? <Ban className="h-4 w-4 mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                                {v.isActive ? "Suspend" : "Activate"}
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" /> View Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>;
              })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>;
}
