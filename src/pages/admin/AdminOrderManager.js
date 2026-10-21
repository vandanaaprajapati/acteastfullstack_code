import React, { useCallback, useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { ADMIN_API_BASE_URL } from "./adminApi";
import "./AdminOrderManager.css";

const formatPrice = (amount) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
}).format(Number(amount) || 0);

const formatDate = (date) => {
  if (!date) return "—";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short" }).format(parsedDate);
};

const allowedNextStatuses = (order) => {
  const transitions = {
    placed: ["processing"],
    processing: ["shipped"],
    shipped: ["delivered"],
    needs_review: ["processing"],
  };
  return order.paymentStatus === "paid" ? transitions[order.orderStatus] || [] : [];
};

const formatStatus = (status) => (status || "legacy")
  .replace(/_/g, " ")
  .replace(/\b\w/g, (letter) => letter.toUpperCase());

const AdminOrderManager = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
  const [expandedId, setExpandedId] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadOrders = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "25" });
      if (search.trim()) params.set("search", search.trim());
      if (paymentStatus) params.set("paymentStatus", paymentStatus);
      if (orderStatus) params.set("orderStatus", orderStatus);

      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/orders?${params}`, {
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Orders could not be loaded");
      }
      setOrders(result.orders || []);
      setPagination(result.pagination || { page: 1, pages: 1, total: 0 });
    } catch (loadError) {
      setError(loadError.message === "Failed to fetch"
        ? "Could not reach the backend. Check that it is running."
        : loadError.message);
    } finally {
      setLoading(false);
    }
  }, [orderStatus, paymentStatus, search]);

  useEffect(() => {
    loadOrders(1);
  }, [loadOrders]);

  const updateStatus = async (order, status) => {
    if (!allowedNextStatuses(order).includes(status)) return;
    if (order.orderStatus === "needs_review" && !window.confirm("Confirm stock is available before processing this paid order?")) {
      return;
    }

    setUpdatingId(order._id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/orders/${order._id}/status`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Order status could not be updated");
      }
      setNotice(`Order moved to ${status.replace(/_/g, " ")}.`);
      await loadOrders(pagination.page || 1);
    } catch (updateError) {
      setError(updateError.message);
    } finally {
      setUpdatingId("");
    }
  };

  const submitSearch = (event) => {
    event.preventDefault();
    setSearch(searchInput.trim());
  };

  return (
    <section className="admin-orders-page">
      <div className="admin-orders-heading">
        <div>
          <p className="admin-eyebrow">STORE MANAGEMENT</p>
          <h1>Orders</h1>
          <p className="admin-subtitle">Review payments, customer delivery details and fulfillment status.</p>
        </div>
        <button className="admin-secondary-button" type="button" onClick={() => loadOrders(pagination.page || 1)} disabled={loading}>
          <FiRefreshCw aria-hidden="true" />
          <span>{loading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {notice && <p className="admin-products-notice" role="status">{notice}</p>}
      {error && <p className="admin-products-error" role="alert">{error}</p>}

      <div className="admin-order-toolbar">
        <form className="admin-order-search" onSubmit={submitSearch}>
          <FiSearch aria-hidden="true" />
          <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Order ID, customer, phone or email" aria-label="Search orders" />
          <button type="submit">Search</button>
        </form>
        <label>
          Payment
          <select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)}>
            <option value="">All payments</option>
            <option value="pending">Pending</option>
            <option value="authorized">Authorized</option>
            <option value="paid">Paid</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </label>
        <label>
          Fulfillment
          <select value={orderStatus} onChange={(event) => setOrderStatus(event.target.value)}>
            <option value="">All statuses</option>
            <option value="payment_pending">Payment pending</option>
            <option value="payment_failed">Payment failed</option>
            <option value="placed">Placed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="needs_review">Needs review</option>
          </select>
        </label>
      </div>

      <section className="admin-orders-panel">
        <div className="admin-orders-panel-heading">
          <h2>Order list</h2>
          <span>{pagination.total || 0} orders</span>
        </div>
        {loading ? (
          <p className="admin-products-empty">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="admin-products-empty">No matching orders.</p>
        ) : (
          <div className="admin-products-table-wrap">
            <table className="admin-products-table admin-orders-table">
              <thead>
                <tr>
                  <th>Order / date</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Fulfillment</th>
                  <th><span className="admin-sr-only">Details</span></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const expanded = expandedId === order._id;
                  const paymentLabel = order.paymentStatus || (order.paymentId ? "paid" : "unknown");
                  const orderLabel = order.orderStatus || "legacy";
                  const nextStatuses = allowedNextStatuses(order);
                  return (
                    <React.Fragment key={order._id}>
                      <tr>
                        <td>
                          <strong className="admin-order-id">{order.orderId}</strong>
                          <span className="admin-order-date">{formatDate(order.createdAt)}</span>
                        </td>
                        <td>
                          <strong>{order.user?.name || "—"}</strong>
                          <span className="admin-order-date">{order.user?.phone || order.user?.email || "—"}</span>
                        </td>
                        <td>{order.items?.reduce((count, item) => count + (Number(item.quantity) || 0), 0) || 0}</td>
                        <td><strong>₹{formatPrice(order.amount)}</strong></td>
                        <td><span className={`admin-order-status is-${paymentLabel}`}>{paymentLabel.replace(/_/g, " ")}</span></td>
                        <td>
                          <span className={`admin-order-status is-${orderLabel}`}>{formatStatus(orderLabel)}</span>
                          <select
                            className="admin-order-status-select"
                            value={orderLabel}
                            onChange={(event) => updateStatus(order, event.target.value)}
                            disabled={updatingId === order._id || nextStatuses.length === 0}
                            aria-label={`Fulfillment status for order ${order.orderId}`}
                          >
                            <option value={orderLabel}>{updatingId === order._id ? "Updating..." : formatStatus(orderLabel)}</option>
                            {nextStatuses.map((status) => <option value={status} key={status}>{formatStatus(status)}</option>)}
                          </select>
                        </td>
                        <td>
                          <button className="admin-order-details-toggle" type="button" onClick={() => setExpandedId(expanded ? "" : order._id)} aria-expanded={expanded}>
                            <span>{expanded ? "Hide" : "Details"}</span>
                            {expanded ? <FiChevronUp aria-hidden="true" /> : <FiChevronDown aria-hidden="true" />}
                          </button>
                        </td>
                      </tr>
                      {expanded && (
                        <tr className="admin-order-expanded-row">
                          <td colSpan="7">
                            <div className="admin-order-details-grid">
                              <section>
                                <h3>Customer &amp; delivery</h3>
                                <p>{order.user?.name || "—"}</p>
                                <p>{order.user?.phone || "—"}</p>
                                {order.user?.email && <p>{order.user.email}</p>}
                                <p>{order.user?.address || "—"}</p>
                                <p>{[order.user?.city || order.user?.place, order.user?.state, order.user?.pincode].filter(Boolean).join(", ") || "—"}</p>
                              </section>
                              <section>
                                <h3>Payment</h3>
                                <p>Payment ID: {order.paymentId || "Not available"}</p>
                                <p>Amount: ₹{formatPrice(order.amount)} {order.currency || "INR"}</p>
                                <p>Receipt/order: {order.orderId}</p>
                              </section>
                              <section className="admin-order-items-detail">
                                <h3>Products</h3>
                                {order.items?.map((item, index) => (
                                  <div key={`${item.id || item.productId || item.name}-${index}`}>
                                    <span>{item.name} · {item.weight || "Pack size not recorded"} × {item.quantity}</span>
                                    <strong>₹{formatPrice(Number(item.price) * Number(item.quantity))}</strong>
                                  </div>
                                ))}
                              </section>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {pagination.pages > 1 && (
        <div className="admin-orders-pagination">
          <button type="button" onClick={() => loadOrders(pagination.page - 1)} disabled={loading || pagination.page <= 1}>Previous</button>
          <span>Page {pagination.page} of {pagination.pages}</span>
          <button type="button" onClick={() => loadOrders(pagination.page + 1)} disabled={loading || pagination.page >= pagination.pages}>Next</button>
        </div>
      )}
    </section>
  );
};

export default AdminOrderManager;
