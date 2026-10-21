import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiPower, FiRefreshCw, FiSave, FiX } from "react-icons/fi";
import { ADMIN_API_BASE_URL } from "./adminApi";

const emptyForm = { name: "", sortOrder: "0" };

const AdminCategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/categories`, {
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not load categories");
      }
      setCategories(result.categories);
    } catch (loadError) {
      setError(loadError.message === "Failed to fetch"
        ? "Could not reach the backend. Check that it is running."
        : loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateForm = () => {
    setEditingId("");
    setForm(emptyForm);
    setError("");
    setNotice("");
    setFormOpen(true);
  };

  const openEditForm = (category) => {
    setEditingId(category._id);
    setForm({ name: category.name, sortOrder: String(category.sortOrder) });
    setError("");
    setNotice("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId("");
    setForm(emptyForm);
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    const name = form.name.trim();
    const sortOrder = Number(form.sortOrder);
    if (name.length < 2 || name.length > 60) {
      setError("Category name must be between 2 and 60 characters.");
      return;
    }
    if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 10000) {
      setError("Display order must be a whole number from 0 to 10000.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(
        `${ADMIN_API_BASE_URL}/api/admin/categories${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, sortOrder }),
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Category could not be saved");
      }
      setNotice(editingId ? "Category updated." : "Category added.");
      closeForm();
      await loadCategories();
    } catch (saveError) {
      setError(saveError.message === "Failed to fetch"
        ? "Could not reach the backend. Check that it is running."
        : saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const updateCategoryStatus = async (category, action) => {
    const deactivating = action === "archive";
    if (deactivating && !window.confirm(`Deactivate ${category.name}? Move or deactivate its active products first.`)) {
      return;
    }

    setError("");
    setNotice("");
    try {
      const response = await fetch(
        `${ADMIN_API_BASE_URL}/api/admin/categories/${category._id}/${action}`,
        { method: "PATCH", credentials: "include" }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || `Category could not be ${deactivating ? "deactivated" : "activated"}`);
      }
      setNotice(`Category ${deactivating ? "deactivated" : "activated"}.`);
      await loadCategories();
    } catch (statusError) {
      setError(statusError.message);
    }
  };

  return (
    <section className="admin-products-page">
      <div className="admin-products-heading">
        <div>
          <p className="admin-eyebrow">CATALOG MANAGEMENT</p>
          <h1>Categories</h1>
          <p className="admin-subtitle">Organize the products shown in your store.</p>
        </div>
        <button className="admin-primary-button" type="button" onClick={openCreateForm}>
          <FiPlus aria-hidden="true" />
          <span>Add category</span>
        </button>
      </div>

      {notice && <p className="admin-products-notice" role="status">{notice}</p>}
      {error && <p className="admin-products-error" role="alert">{error}</p>}

      {formOpen && (
        <form className="admin-product-form" onSubmit={saveCategory}>
          <div className="admin-product-form-heading">
            <div>
              <h2>{editingId ? "Edit category" : "New category"}</h2>
              <p>{editingId ? "The category key stays fixed so products remain linked." : "A category key is created automatically from its name."}</p>
            </div>
            <button className="admin-product-icon-button" type="button" onClick={closeForm} aria-label="Close form">
              <FiX aria-hidden="true" />
            </button>
          </div>
          <div className="admin-product-fields">
            <label>
              Category name
              <input value={form.name} maxLength={60} required onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Display order
              <input type="number" min="0" max="10000" step="1" value={form.sortOrder} required onChange={(event) => setForm({ ...form, sortOrder: event.target.value })} />
            </label>
          </div>
          <div className="admin-product-form-actions">
            <button className="admin-secondary-button" type="button" onClick={closeForm}>Cancel</button>
            <button className="admin-primary-button" type="submit" disabled={saving}>
              <FiSave aria-hidden="true" />
              <span>{saving ? "Saving..." : editingId ? "Save changes" : "Save category"}</span>
            </button>
          </div>
        </form>
      )}

      <section className="admin-products-panel">
        <div className="admin-products-list-heading">
          <div>
            <h2>Categories</h2>
            <p>{categories.length} categories, including inactive</p>
          </div>
          <button className="admin-secondary-button" type="button" onClick={loadCategories} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>
        {loading ? (
          <p className="admin-products-empty">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="admin-products-empty">No categories yet. Add your first category.</p>
        ) : (
          <div className="admin-products-table-wrap">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Key</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th><span className="admin-sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category._id} className={!category.isActive ? "is-inactive" : ""}>
                    <td><strong>{category.name}</strong></td>
                    <td>{category.slug}</td>
                    <td>{category.sortOrder}</td>
                    <td><span className={`admin-product-status ${category.isActive ? "is-active" : "is-inactive"}`}>{category.isActive ? "Active" : "Inactive"}</span></td>
                    <td>
                      <div className="admin-product-actions">
                        <button className="admin-product-icon-button" type="button" onClick={() => openEditForm(category)} aria-label={`Edit ${category.name}`} title="Edit category">
                          <FiEdit2 aria-hidden="true" />
                        </button>
                        {category.isActive ? (
                          <button className="admin-product-status-action is-deactivate" type="button" onClick={() => updateCategoryStatus(category, "archive")} aria-label={`Deactivate ${category.name}`}>
                            <FiPower aria-hidden="true" />
                            <span>Deactivate</span>
                          </button>
                        ) : (
                          <button className="admin-product-status-action is-activate" type="button" onClick={() => updateCategoryStatus(category, "reactivate")} aria-label={`Activate ${category.name}`}>
                            <FiRefreshCw aria-hidden="true" />
                            <span>Activate</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  );
};

export default AdminCategoryManager;
