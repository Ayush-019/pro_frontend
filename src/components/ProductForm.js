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
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      if (isEdit) {
        await updateProduct(product._id, form);
      } else {
        await createProduct(form);
      }
      onClose(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Request failed');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
        backdropFilter: 'blur(4px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(false);
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 25px 80px rgba(0,0,0,0.4)',
          maxWidth: '550px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'hidden',
          animation: 'modalSlideIn 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '24px 30px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <h2 style={{ 
                fontSize: '24px', 
                fontWeight: '700', 
                color: 'white',
                margin: 0
              }}>
                {isEdit ? 'Edit Product' : 'Add New Product'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onClose(false)}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s'
              }}
              onMouseOver={e => e.target.style.background = 'rgba(255,255,255,0.3)'}
              onMouseOut={e => e.target.style.background = 'rgba(255,255,255,0.2)'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div style={{ 
            padding: '30px',
            maxHeight: 'calc(90vh - 180px)',
            overflowY: 'auto'
          }}>
            {/* Error Alert */}
            {error && (
              <div style={{
                background: '#fee',
                border: '1px solid #fcc',
                borderRadius: '10px',
                padding: '12px 16px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c33" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span style={{ color: '#c33', fontSize: '14px' }}>{error}</span>
              </div>
            )}

            {/* Form Fields */}
            <div style={{ display: 'grid', gap: '20px' }}>
              {/* Name */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Product Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'all 0.3s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#667eea'}
                  onBlur={e => e.target.style.borderColor = '#e1e8ed'}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '10px',
                    fontSize: '15px',
                    outline: 'none',
                    cursor: 'pointer',
                    background: 'white'
                  }}
                  required
                >
                  <option>Electronics</option>
                  <option>Grocery</option>
                  <option>Clothing</option>
                  <option>Furniture</option>
                </select>
              </div>

              {/* Active Toggle */}
              <div style={{
                background: '#f8f9fa',
                padding: '16px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <label style={{ 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#333',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Product Status
                  </label>
                  <span style={{ fontSize: '13px', color: '#666' }}>
                    {form.is_active ? 'Product is active and visible' : 'Product is inactive'}
                  </span>
                </div>
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '52px',
                  height: '28px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="is_active"
                    checked={form.is_active}
                    onChange={handleChange}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: form.is_active ? '#667eea' : '#ccc',
                    borderRadius: '14px',
                    transition: '0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      height: '22px',
                      width: '22px',
                      left: form.is_active ? '27px' : '3px',
                      bottom: '3px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.3s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}/>
                  </span>
                </label>
              </div>

              {/* Grid for numeric inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Quantity */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Quantity
                  </label>
                  <input
                    name="quantity"
                    type="number"
                    value={form.quantity}
                    onChange={handleChange}
                    placeholder="0"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#667eea'}
                    onBlur={e => e.target.style.borderColor = '#e1e8ed'}
                    required
                    min={0}
                  />
                </div>

                {/* Reorder Level */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#333',
                    marginBottom: '8px'
                  }}>
                    Reorder Level
                  </label>
                  <input
                    name="reorder_level"
                    type="number"
                    value={form.reorder_level}
                    onChange={handleChange}
                    placeholder="10"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#667eea'}
                    onBlur={e => e.target.style.borderColor = '#e1e8ed'}
                    required
                    min={0}
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label style={{ 
                  display: 'block', 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#333',
                  marginBottom: '8px'
                }}>
                  Price (USD)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#666',
                    fontSize: '15px',
                    fontWeight: '600'
                  }}>
                    $
                  </span>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    style={{
                      width: '100%',
                      padding: '12px 16px 12px 32px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '10px',
                      fontSize: '15px',
                      outline: 'none',
                      transition: 'all 0.3s'
                    }}
                    onFocus={e => e.target.style.borderColor = '#667eea'}
                    onBlur={e => e.target.style.borderColor = '#e1e8ed'}
                    required
                    step="0.01"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: '20px 30px',
            borderTop: '1px solid #e1e8ed',
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={() => onClose(false)}
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                background: 'white',
                color: '#666',
                border: '2px solid #e1e8ed',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.5 : 1
              }}
              onMouseOver={e => !isLoading && (e.target.style.borderColor = '#ccc', e.target.style.background = '#f8f9fa')}
              onMouseOut={e => !isLoading && (e.target.style.borderColor = '#e1e8ed', e.target.style.background = 'white')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                transition: 'all 0.2s',
                opacity: isLoading ? 0.7 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={e => !isLoading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)')}
              onMouseOut={e => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)')}
            >
              {isLoading ? (
                <>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid white',
                    borderTop: '2px solid transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}/>
                  {isEdit ? 'Updating...' : 'Adding...'}
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {isEdit ? 'Update Product' : 'Add Product'}
                </>
              )}
            </button>
          </div>
        </form>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
}