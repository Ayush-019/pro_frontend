import React, { useState } from 'react';
import { createProduct, updateProduct } from '../api/products';

const initialState = {
  name: '',
  category: 'Electronics',
  is_active: true,
  quantity: 0,
  reorder_level: 10,
  price: 0,
};

export default function ProductForm({ product, onClose }) {
  const [form, setForm] = useState(product ? { ...product } : initialState);
  const [error, setError] = useState('');
  const isEdit = Boolean(product);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      if (isEdit) {
        await updateProduct(product._id, form);
      } else {
        await createProduct(form);
      }
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    }
  }

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{isEdit ? 'Edit' : 'Add'} Product</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => onClose(false)}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="mb-3">
                <label className="form-label">Name:</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category:</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option>Electronics</option>
                  <option>Grocery</option>
                  <option>Clothing</option>
                  <option>Furniture</option>
                </select>
              </div>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="is_active">
                  Active
                </label>
              </div>
              <div className="mb-3">
                <label className="form-label">Quantity:</label>
                <input
                  name="quantity"
                  type="number"
                  value={form.quantity}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min={0}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Reorder Level:</label>
                <input
                  name="reorder_level"
                  type="number"
                  value={form.reorder_level}
                  onChange={handleChange}
                  className="form-control"
                  required
                  min={0}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price:</label>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  className="form-control"
                  required
                  step="0.01"
                  min={0}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                {isEdit ? 'Update' : 'Add'} Product
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => onClose(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
