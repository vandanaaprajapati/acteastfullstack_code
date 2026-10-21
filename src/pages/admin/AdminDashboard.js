import React, { useEffect, useRef, useState } from "react";
import {
  FiActivity,
  FiArrowUpRight,
  FiBox,
  FiChevronDown,
  FiClipboard,
  FiGrid,
  FiLogOut,
  FiPackage,
  FiPlus,
  FiTag,
  FiUsers,
} from "react-icons/fi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import logo from "../../img/ActEast-Logonew.webp";
import { ADMIN_API_BASE_URL } from "./adminApi";
import AdminCategoryManager from "./AdminCategoryManager";
import AdminCustomerManager from "./AdminCustomerManager";
import AdminOrderManager from "./AdminOrderManager";
import AdminProductManager from "./AdminProductManager";
import "./AdminDashboard.css";

const menuItems = [
  { label: "Overview", icon: FiGrid },
  { label: "Products", icon: FiPackage },
  { label: "Categories", icon: FiTag },
  { label: "Orders", icon: FiClipboard },
  { label: "Customers", icon: FiUsers },
];

const summaryItems = [
  { label: "Products", key: "products", icon: FiPackage, accent: "green" },
  { label: "Categories", key: "categories", icon: FiTag, accent: "orange" },
  { label: "Orders", key: "orders", icon: FiClipboard, accent: "green" },
  { label: "Customers", key: "customers", icon: FiUsers, accent: "orange" },
];

const formatOverviewDate = (date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  return Number.isNaN(parsedDate.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(parsedDate);
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [logoutError, setLogoutError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Overview");
  const [overview, setOverview] = useState(null);
  const [overviewLoading, setOverviewLoading] = useState(false);
  const [overviewError, setOverviewError] = useState("");
  const [overviewRefresh, setOverviewRefresh] = useState(0);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    let active = true;

    fetch(`${ADMIN_API_BASE_URL}/api/admin/auth/me`, {
      credentials: "include",
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error("Not signed in");
        }
        if (active) setAdmin(result.admin);
      })
      .catch(() => {
        if (active) setAdmin(null);
      })
      .finally(() => {
        if (active) setCheckingSession(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!admin) return undefined;

    let active = true;
    setOverviewLoading(true);
    setOverviewError("");

    fetch(`${ADMIN_API_BASE_URL}/api/admin/overview`, { credentials: "include" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Overview could not be loaded");
        }
        if (active) setOverview(result.overview);
      })
      .catch((error) => {
        if (active) {
          setOverviewError(error.message === "Failed to fetch"
            ? "Could not reach the backend. Check that it is running."
            : error.message);
        }
      })
      .finally(() => {
        if (active) setOverviewLoading(false);
      });

    return () => {
      active = false;
    };
  }, [admin, activeSection, overviewRefresh]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setProfileOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    setLogoutError("");
    setProfileOpen(false);
    try {
      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Logout failed. Please try again.");
      navigate("/admin/login", { replace: true });
    } catch (error) {
      setLogoutError(error.message);
    }
  };

  if (checkingSession) {
    return <main className="admin-auth-checking">Checking admin session...</main>;
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
  <main className="admin-shell">
    <aside className="admin-sidebar">
      <Link className="admin-brand" to="/" aria-label="ActEast home">
        <span className="admin-brand-logo"><img src={logo} alt="ActEast" /></span>
        <span className="admin-brand-title">STORE ADMIN</span>
      </Link>

      <div className="admin-workspace-label">WORKSPACE</div>
      <nav className="admin-navigation" aria-label="Admin navigation">
        {menuItems.map(({ label, icon: Icon }) => {
          const canManageCatalog = ["owner", "catalog"].includes(admin.role);
          const canManageOrders = ["owner", "orders"].includes(admin.role);
          const count = label === "Orders" ? overview?.orders : overview?.customers;
          const available = label === "Overview" ||
            (canManageCatalog && ["Products", "Categories"].includes(label)) ||
            (canManageOrders && ["Orders", "Customers"].includes(label));
          const active = activeSection === label;

          return (
            <button
              className={`admin-nav-item${active ? " is-active" : ""}`}
              key={label}
              type="button"
              disabled={!available}
              aria-current={active ? "page" : undefined}
              onClick={() => available && setActiveSection(label)}
            >
              <Icon aria-hidden="true" />
              <span>{label}</span>
              {["Orders", "Customers"].includes(label) && canManageOrders && (
                <span className="admin-nav-count" aria-label={`${count ?? "Loading"} ${label.toLowerCase()}`}>
                  {overviewLoading && !overview ? "…" : count ?? "—"}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <div className="admin-status-dot" />
        <span>Store workspace</span>
      </div>
    </aside>

    <section className="admin-main">
      <header className="admin-topbar">
        <div className="admin-breadcrumb">
          <span>ActEast Store</span>
          <FiArrowUpRight aria-hidden="true" />
          <strong>{activeSection}</strong>
        </div>
        <div className="admin-topbar-actions">
          <span className="admin-preview-tag">{admin.role === "owner" ? "OWNER" : "ADMIN"}</span>
          <div className="admin-profile-menu-wrap" ref={profileMenuRef}>
            <button
              type="button"
              className="admin-profile-trigger"
              aria-label="Open profile menu"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((open) => !open)}
            >
              <span className="admin-avatar" aria-hidden="true">
                {admin.email.charAt(0).toUpperCase()}
              </span>
              <FiChevronDown aria-hidden="true" />
            </button>
            {profileOpen && (
              <div className="admin-profile-menu" role="menu">
                <div className="admin-profile-details">
                  <strong>{admin.email}</strong>
                  <span>{admin.role === "owner" ? "Store owner" : "Administrator"}</span>
                </div>
                <button type="button" className="admin-profile-logout" role="menuitem" onClick={handleLogout}>
                  <FiLogOut aria-hidden="true" />
                  <span>Log out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="admin-content">
        {logoutError && <p className="admin-login-alert" role="alert">{logoutError}</p>}
        {activeSection === "Products" ? (
          <AdminProductManager />
        ) : activeSection === "Categories" ? (
          <AdminCategoryManager />
        ) : activeSection === "Orders" ? (
          <AdminOrderManager />
        ) : activeSection === "Customers" ? (
          <AdminCustomerManager />
        ) : (
          <>
        <div className="admin-heading-row">
          <div>
            <p className="admin-eyebrow">ACTEAST STORE</p>
            <h1>Overview</h1>
            <p className="admin-subtitle">Store activity at a glance</p>
          </div>
          <button className="admin-primary-button" type="button" onClick={() => setActiveSection("Products")}>
            <FiPlus aria-hidden="true" />
            <span>Add product</span>
          </button>
        </div>

        <div className="admin-summary-grid">
          {summaryItems.map(({ label, key, icon: Icon, accent }) => (
            <article className="admin-summary-card" key={label}>
              <div className={`admin-summary-icon ${accent}`}>
                <Icon aria-hidden="true" />
              </div>
              <div>
                <p>{label}</p>
                <strong>{overviewLoading ? "…" : overview?.[key] ?? "—"}</strong>
              </div>
              <span className="admin-summary-note">Total</span>
            </article>
          ))}
        </div>

        <section className="admin-panel admin-activity-panel">
          <div className="admin-panel-heading">
            <div>
              <h2>Recent orders</h2>
              <p>Latest customer purchases</p>
            </div>
            <div className="admin-overview-actions">
              <button type="button" className="admin-period-button" onClick={() => setOverviewRefresh((count) => count + 1)} disabled={overviewLoading}>
                <FiActivity aria-hidden="true" />
                <span>{overviewLoading ? "Refreshing..." : "Refresh"}</span>
              </button>
              {admin.role === "owner" || admin.role === "orders" ? (
                <button type="button" className="admin-period-button" onClick={() => setActiveSection("Orders")}>
                  <span>All orders</span>
                  <FiArrowUpRight aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
          {overviewError ? (
            <p className="admin-overview-error" role="alert">{overviewError}</p>
          ) : overviewLoading && !overview ? (
            <div className="admin-empty-state"><strong>Loading overview...</strong></div>
          ) : !overview?.recentOrders?.length ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon"><FiBox aria-hidden="true" /></div>
              <strong>No orders yet</strong>
              <span>Verified customer orders will appear here.</span>
            </div>
          ) : (
            <div className="admin-recent-orders">
              {overview.recentOrders.map((order) => (
                <button className="admin-recent-order" key={order._id} type="button" onClick={() => setActiveSection("Orders")}>
                  <span className="admin-recent-order-customer">
                    <strong>{order.user?.name || "Customer"}</strong>
                    <small>{order.orderId} · {formatOverviewDate(order.createdAt)}</small>
                  </span>
                  <span className="admin-recent-order-items">
                    {order.items?.length === 1
                      ? `${order.items[0].name} · ${order.items[0].weight || ""}`
                      : `${order.items?.length || 0} products`}
                  </span>
                  <strong className="admin-recent-order-amount">₹{Number(order.amount || 0).toLocaleString("en-IN")}</strong>
                  <span className={`admin-order-status is-${order.paymentStatus || "pending"}`}>{(order.paymentStatus || "unknown").replace(/_/g, " ")}</span>
                </button>
              ))}
            </div>
          )}
        </section>
          </>
        )}

        <footer className="admin-footer">
          <span>ActEast Store</span>
          <span>Store management</span>
        </footer>
      </div>
    </section>
  </main>
  );
};

export default AdminDashboard;
