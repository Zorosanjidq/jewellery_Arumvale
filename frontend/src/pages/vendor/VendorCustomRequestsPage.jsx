import { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Inbox, AlertCircle } from "lucide-react";
import VendorCustomRequestCard from "@/components/VendorCustomRequestCard";
import EstimateSubmissionModal from "@/components/EstimateSubmissionModal";
import VendorRequestDetailsModal from "@/components/VendorRequestDetailsModal";
import styles from "./VendorCustomRequestsPage.module.css";

export default function VendorCustomRequestsPage() {
  const { toast } = useToast();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsRequest, setDetailsRequest] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Fetch incoming custom requests
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(
        "http://localhost:5000/api/custom-requests/vendor?status=pending,under_review,estimated",
        { withCredentials: true }
      );
      
      setRequests(response.data || []);
    } catch (error) {
      console.error("Error fetching custom requests:", error);
      setError(error.response?.data?.message || "Failed to load custom requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle estimate submission
  const handleSubmitEstimate = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  // Handle view details
  const handleViewDetails = (request) => {
    setDetailsRequest(request);
    setIsDetailsModalOpen(true);
  };

  // Handle successful estimate submission
  const handleEstimateSuccess = () => {
    // Refetch requests to update status
    fetchRequests();
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  // Handle details modal close
  const handleDetailsModalClose = () => {
    setIsDetailsModalOpen(false);
    setDetailsRequest(null);
  };

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader2 className="animate-spin" />
          <p>Loading custom requests...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <AlertCircle className="h-8 w-8 text-destructive mb-2" />
          <h3 className="text-lg font-semibold mb-2">Error Loading Requests</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button onClick={fetchRequests} className={styles.retryButton}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (requests.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyContainer}>
          <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Incoming Requests</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any custom requests waiting for your attention.
          </p>
          <p className="text-sm text-muted-foreground">
            New custom requests will appear here when customers submit them.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.pageTitle}>Incoming Custom Requests</h1>
          <p className={styles.pageSubtitle}>
            {requests.length} {requests.length === 1 ? 'request' : 'requests'} need your attention
          </p>
        </div>
      </div>

      {/* Requests Grid */}
      <div className={styles.requestsGrid}>
        {requests.map((request) => (
          <VendorCustomRequestCard
            key={request._id}
            request={request}
            onSubmitEstimate={handleSubmitEstimate}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Estimate Submission Modal */}
      <EstimateSubmissionModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleEstimateSuccess}
      />

      {/* Request Details Modal */}
      <VendorRequestDetailsModal
        request={detailsRequest}
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
        onSubmitEstimate={handleSubmitEstimate}
      />
    </div>
  );
}
