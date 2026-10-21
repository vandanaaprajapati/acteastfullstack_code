import React, { useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import { ADMIN_API_BASE_URL } from "./adminApi";
import "./AdminOrderManager.css";
import "./AdminCustomerManager.css";

const formatPrice = (amount) => new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 2,
}).format(Number(amount) || 0);

const formatDate = (date) => {
  if (!date) return "—";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? "—"
    : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(parsedDate);
};

const AdminCustomerManager = () => {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(page), limit: "25" });
      if (search.trim()) params.set("search", search.trim());

      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/customers?${params}`, {
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Customers could not be loaded");
      }
      setCustomers(result.customers || []);
      setPagination(result.pagination || { page: 1, pages: 1, total: 0 });
    } catch (loadError) {
      setError(loadError.message === "Failed to fetch"
        ? "Could not reach the backend. Check that it is running."
        : loadError.message);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadCustomers(1);
  }, [loadCustomers]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSearch(searchInput.trim());
  };

  return (
    <section className="admin-orders-page admin-customers-page">
      <div className="admin-orders-heading">
        <div>
          <p className="admin-eyebrow">STORE MANAGEMENT</p>
          <h1>Customers</h1>
          <p className="admin-subtitle">Customers with successfully paid orders.</p>
        </div>
        <button className="admin-secondary-button" type="button" onClick={() => loadCustomers(pagination.page || 1)} disabled={loading}>
          <FiRefreshCw aria-hidden="true" />
          <span>{loading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {error && <p className="admin-products-error" role="alert">{error}</p>}

      <form className="admin-order-search admin-customers-search" onSubmit={submitSearch}>
        <FiSearch aria-hidden="true" />
        <input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Name, phone, email or city" aria-label="Search customers" />
        <button type="submit">Search</button>
      </form>

      <section className="admin-orders-panel">
        <div className="admin-orders-panel-heading">
          <h2>Customer list</h2>
          <span>{pagination.total} customers</span>
        </div>
        {loading ? (
          <p className="admin-products-empty">Loading customers...</p>
        ) : customers.length === 0 ? (
          <div className="admin-customers-empty">
            <strong>No paid customers yet</strong>
            <span>Customers will appear here after their payment is verified.</span>
          </div>
        ) : (
          <div className="admin-products-table-wrap">
            <table className="admin-products-table admin-customers-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Delivery address</th>
                  <th>Orders</th>
                  <th>Total spent</th>
                  <th>Last order</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id}>
                    <td><strong>{customer.name || "Customer"}</strong></td>
                    <td>
                      <strong>{customer.phone || "—"}</strong>
                      {customer.email && <span className="admin-customer-email">{customer.email}</span>}
                    </td>
                    <td>
                      {[customer.address, customer.city, customer.state, customer.pincode].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td>{customer.orderCount}</td>
                    <td><strong>₹{formatPrice(customer.totalSpent)}</strong></td>
                    <td>
                      <strong>{formatDate(customer.lastOrderAt)}</strong>
                      <span className="admin-order-date">{customer.latestOrderId}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {pagination.pages > 1 && (
          <div className="admin-customers-pagination">
            <button type="button" onClick={() => loadCustomers(pagination.page - 1)} disabled={loading || pagination.page <= 1}>Previous</button>
            <span>Page {pagination.page} of {pagination.pages}</span>
            <button type="button" onClick={() => loadCustomers(pagination.page + 1)} disabled={loading || pagination.page >= pagination.pages}>Next</button>
          </div>
        )}
      </section>
    </section>
  );
};

export default AdminCustomerManager;