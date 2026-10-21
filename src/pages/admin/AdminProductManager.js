import React, { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiPower, FiRefreshCw, FiSave, FiX } from "react-icons/fi";
import { ADMIN_API_BASE_URL } from "./adminApi";
import "./AdminProductManager.css";

const createEmptyForm = (category = "") => ({
  name: "",
  category,
  image: "",
  galleryImageUrls: "",
  description: "",
  variants: [{ label: "", image: "", price: "", stock: "" }],
});

const AdminProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [form, setForm] = useState(createEmptyForm());
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch(`${ADMIN_API_BASE_URL}/api/admin/products`, { credentials: "include" }),
        fetch(`${ADMIN_API_BASE_URL}/api/categories`),
      ]);
      const [productsResult, categoriesResult] = await Promise.all([
        productsResponse.json(),
        categoriesResponse.json(),
      ]);

      if (!productsResponse.ok || !productsResult.success) {
        throw new Error(productsResult.message || "Could not load products");
      }
      if (!categoriesResponse.ok || !categoriesResult.success) {
        throw new Error(categoriesResult.message || "Could not load categories");
      }

      setProducts(productsResult.products);
      setCategories(categoriesResult.categories);
      setForm((current) => ({
        ...current,
        category: current.category || categoriesResult.categories[0]?.slug || "",
      }));
    } catch (loadError) {
      setError(loadError.message === "Failed to fetch"
        ? "Could not reach the backend. Check that it is running."
        : loadError.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateVariant = (index, field, value) => {
    setForm((current) => ({
      ...current,
      variants: current.variants.map((variant, variantIndex) => (
        variantIndex === index ? { ...variant, [field]: value } : variant
      )),
    }));
  };

  const startCreate = () => {
    setEditingId("");
    setForm(createEmptyForm(categories[0]?.slug || ""));
    setError("");
    setNotice("");
    setFormOpen(true);
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      category: product.category,
      image: product.image,
      galleryImageUrls: (product.galleryImages || []).join("\n"),
      description: product.description || "",
      variants: product.variants.map((variant) => ({
        label: variant.label,
        image: variant.image || "",
        price: String(variant.price),
        stock: String(variant.stock),
      })),
    });
    setError("");
    setNotice("");
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId("");
    setForm(createEmptyForm(categories[0]?.slug || ""));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");

    if (!form.name.trim() || !form.category || !form.image.trim()) {
      setError("Product name, category and image URL are required.");
      return;
    }
    if (form.variants.some((variant) => (
      !variant.label.trim() || variant.price === "" || variant.stock === ""
    ))) {
      setError("Complete the pack size, price and stock for each variant.");
      return;
    }
    if (form.variants.some((variant) => variant.image.trim() && !/^https?:\/\//i.test(variant.image.trim()))) {
      setError("Each pack image must use a valid https:// or http:// URL.");
      return;
    }

    const galleryImages = form.galleryImageUrls
      .split(/\r?\n/)
      .map((url) => url.trim())
      .filter(Boolean);
    if (galleryImages.length > 8) {
      setError("Add no more than 8 additional gallery image URLs.");
      return;
    }
    if (galleryImages.some((url) => {
      try {
        return !["http:", "https:"].includes(new URL(url).protocol);
      } catch {
        return true;
      }
    })) {
      setError("Enter a valid http:// or https:// URL for each gallery image.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      category: form.category,
      image: form.image.trim(),
      galleryImages,
      description: form.description.trim(),
      variants: form.variants.map((variant) => ({
        label: variant.label.trim(),
        image: variant.image.trim(),
        price: Number(variant.price),
        stock: Number(variant.stock),
      })),
    };

    setSaving(true);
    try {
      const response = await fetch(
        `${ADMIN_API_BASE_URL}/api/admin/products${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Product could not be saved");
      }

      setNotice(editingId ? "Product updated." : "Product added.");
      closeForm();
      await loadData();
    } catch (saveError) {
      setError(saveError.message === "Failed to fetch"
        ? "Could not reach the backend. Check that it is running."
        : saveError.message);
    } finally {
      setSaving(false);
    }
  };

  const deactivateProduct = async (product) => {
    if (!window.confirm(`Deactivate ${product.name}? It will be hidden from the store, but can be activated again.`)) {
      return;
    }

    setError("");
    setNotice("");
    try {
      const response = await fetch(`${ADMIN_API_BASE_URL}/api/admin/products/${product._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Product could not be deactivated");
      }
      setNotice("Product deactivated. Its record has been kept.");
      await loadData();
    } catch (deactivateError) {
      setError(deactivateError.message);
    }
  };

  const reactivateProduct = async (product) => {
    setError("");
    setNotice("");
    try {
      const response = await fetch(
        `${ADMIN_API_BASE_URL}/api/admin/products/${product._id}/reactivate`,
        { method: "PATCH", credentials: "include" }
      );
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.message || "Product could not be activated");
      }
      setNotice("Product activated and visible in the store again.");
      await loadData();
    } catch (reactivateError) {
      setError(reactivateError.message);
    }
  };

  return (
    <section className="admin-products-page">
      <div className="admin-products-heading">
        <div>
          <p className="admin-eyebrow">CATALOG MANAGEMENT</p>
          <h1>Products</h1>
          <p className="admin-subtitle">Add products, pack sizes, prices and stock.</p>
        </div>
        <button className="admin-primary-button" type="button" onClick={startCreate}>
          <FiPlus aria-hidden="true" />
          <span>Add product</span>
        </button>
      </div>

      {notice && <p className="admin-products-notice" role="status">{notice}</p>}
      {error && <p className="admin-products-error" role="alert">{error}</p>}

      {formOpen && (
        <form className="admin-product-form" onSubmit={handleSubmit}>
          <div className="admin-product-form-heading">
            <div>
              <h2>{editingId ? "Edit product" : "New product"}</h2>
              <p>Prices are entered in Indian rupees.</p>
            </div>
            <button className="admin-product-icon-button" type="button" onClick={closeForm} aria-label="Close form">
              <FiX aria-hidden="true" />
            </button>
          </div>

          <div className="admin-product-fields">
            <label>
              Product name
              <input value={form.name} maxLength={120} required onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label>
              Category
              <select value={form.category} required onChange={(event) => setForm({ ...form, category: event.target.value })}>
                <option value="" disabled>Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </label>
            <label className="admin-product-field-wide">
              Image URL
              <input type="url" value={form.image} required onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="https://..." />
            </label>
            <label className="admin-product-field-wide">
              Additional gallery images (optional, one URL per line)
              <textarea value={form.galleryImageUrls} maxLength={4000} rows={3} onChange={(event) => setForm({ ...form, galleryImageUrls: event.target.value })} placeholder="https://.../image-2.webp&#10;https://.../image-3.webp" />
            </label>
            <label className="admin-product-field-wide">
              Description
              <textarea value={form.description} maxLength={2000} rows={3} onChange={(event) => setForm({ ...form, description: event.target.value })} />
            </label>
          </div>

          <div className="admin-variant-list">
            <div className="admin-variant-heading">
              <div>
                <h3>Pack sizes</h3>
                <p>Add a separate price and stock count for each size.</p>
              </div>
              <button
                className="admin-secondary-button"
                type="button"
                onClick={() => setForm((current) => ({
                  ...current,
                  variants: [...current.variants, { label: "", image: "", price: "", stock: "" }],
                }))}
                disabled={form.variants.length >= 20}
              >
                <FiPlus aria-hidden="true" /> Add size
              </button>
            </div>
            {form.variants.map((variant, index) => (
              <div className="admin-variant-row" key={index}>
                <label>
                  Pack size
                  <input value={variant.label} maxLength={60} required placeholder="100 gms" onChange={(event) => updateVariant(index, "label", event.target.value)} />
                </label>
                <label>
                  Price (₹)
                  <input type="number" min="0" step="0.01" value={variant.price} required onChange={(event) => updateVariant(index, "price", event.target.value)} />
                </label>
                <label>
                  Stock
                  <input type="number" min="0" step="1" value={variant.stock} required onChange={(event) => updateVariant(index, "stock", event.target.value)} />
                </label>
                <label className="admin-variant-image-field">
                  Image URL for this size (optional)
                  <input type="url" value={variant.image} placeholder="Blank uses the main product image" onChange={(event) => updateVariant(index, "image", event.target.value)} />
                </label>
                <button
                  className="admin-product-icon-button admin-variant-remove"
                  type="button"
                  onClick={() => setForm((current) => ({
                    ...current,
                    variants: current.variants.filter((_, variantIndex) => variantIndex !== index),
                  }))}
                  disabled={form.variants.length === 1}
                  aria-label={`Remove pack size ${index + 1}`}
                >
                  <FiX aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>

          <div className="admin-product-form-actions">
            <button className="admin-secondary-button" type="button" onClick={closeForm}>Cancel</button>
            <button className="admin-primary-button" type="submit" disabled={saving || categories.length === 0}>
              <FiSave aria-hidden="true" />
              <span>{saving ? "Saving..." : editingId ? "Save changes" : "Save product"}</span>
            </button>
          </div>
          {categories.length === 0 && <p className="admin-products-error">Create an active category before adding products.</p>}
        </form>
      )}

      <section className="admin-products-panel">
        <div className="admin-products-list-heading">
          <div>
            <h2>Catalog</h2>
            <p>{products.length} products, including inactive</p>
          </div>
          <button className="admin-secondary-button" type="button" onClick={loadData} disabled={loading}>
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <p className="admin-products-empty">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="admin-products-empty">No products yet. Add your first product.</p>
        ) : (
          <div className="admin-products-table-wrap">
            <table className="admin-products-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price / pack size</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th><span className="admin-sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className={!product.isActive ? "is-inactive" : ""}>
                    <td>
                      <div className="admin-product-name-cell">
                        <img src={product.image} alt="" loading="lazy" />
                        <strong>{product.name}</strong>
                      </div>
                    </td>
                    <td>{categories.find((category) => category.slug === product.category)?.name || product.category}</td>
                    <td>{product.variants.map((variant) => (
                      <span className="admin-product-variant-summary" key={variant._id || variant.label}>
                        {variant.label}: ₹{variant.price}
                      </span>
                    ))}</td>
                    <td>{product.variants.reduce((total, variant) => total + variant.stock, 0)}</td>
                    <td><span className={`admin-product-status ${product.isActive ? "is-active" : "is-inactive"}`}>{product.isActive ? "Active" : "Inactive"}</span></td>
                    <td>
                      <div className="admin-product-actions">
                        <button className="admin-product-icon-button" type="button" onClick={() => startEdit(product)} aria-label={`Edit ${product.name}`} title="Edit product">
                          <FiEdit2 aria-hidden="true" />
                        </button>
                        {product.isActive && (
                          <button className="admin-product-status-action is-deactivate" type="button" onClick={() => deactivateProduct(product)} aria-label={`Deactivate ${product.name}`}>
                            <FiPower aria-hidden="true" />
                            <span>Deactivate</span>
                          </button>
                        )}
                        {!product.isActive && (
                          <button className="admin-product-status-action is-activate" type="button" onClick={() => reactivateProduct(product)} aria-label={`Activate ${product.name}`}>
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

export default AdminProductManager;
