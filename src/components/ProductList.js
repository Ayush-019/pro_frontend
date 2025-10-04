import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/products';
import ProductForm from './ProductForm';

const categories = ['', 'Electronics', 'Grocery', 'Clothing', 'Furniture'];

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('asc');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [page, limit, sortBy, sortOrder, category, search, refresh]);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await getProducts({ page, limit, sortBy, sortOrder, category, search });
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(product) {
    setEditing(product);
    setShowForm(true);
  }

  function handleAdd() {
    setEditing(null);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      setRefresh(r => !r);
    }
  }

  function handleFormClose(updated) {
    setShowForm(false);
    setEditing(null);
    if (updated) setRefresh(r => !r);
  }

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          padding: '30px',
          marginBottom: '30px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#1a1a1a',
                margin: '0 0 8px 0'
              }}>
                Product Inventory
              </h2>
              <p style={{ color: '#666', margin: 0 }}>
                Manage your product catalog
              </p>
            </div>
            <button 
              onClick={handleAdd}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={e => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
              }}
              onMouseOut={e => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Product
            </button>
          </div>

          {/* Filters */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '0'
          }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#999" 
                strokeWidth="2"
                style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
              >
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input 
                type="text" 
                value={search} 
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search products..."
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 40px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '10px',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'all 0.3s'
                }}
                onFocus={e => e.target.style.borderColor = '#667eea'}
                onBlur={e => e.target.style.borderColor = '#e1e8ed'}
              />
            </div>

            {/* Category */}
            <select 
              value={category} 
              onChange={e => { setCategory(e.target.value); setPage(1); }}
              style={{
                padding: '10px 12px',
                border: '2px solid #e1e8ed',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              {categories.map(cat => (
                <option value={cat} key={cat}>{cat || 'All Categories'}</option>
              ))}
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #e1e8ed',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="createdAt">Sort: Created Date</option>
              <option value="name">Sort: Name</option>
              <option value="price">Sort: Price</option>
              <option value="quantity">Sort: Quantity</option>
            </select>

            {/* Sort Order */}
            <select
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              style={{
                padding: '10px 12px',
                border: '2px solid #e1e8ed',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>

            {/* Items per page */}
            <select
              value={limit}
              onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
              style={{
                padding: '10px 12px',
                border: '2px solid #e1e8ed',
                borderRadius: '10px',
                fontSize: '14px',
                outline: 'none',
                cursor: 'pointer',
                background: 'white'
              }}
            >
              {[5,10,15,20,50].map(n => (
                <option key={n} value={n}>{n} per page</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Card */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden'
        }}>
          {loading ? (
            <div style={{ 
              padding: '60px', 
              textAlign: 'center',
              color: '#666'
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                border: '4px solid #e1e8ed',
                borderTop: '4px solid #667eea',
                borderRadius: '50%',
                margin: '0 auto 20px',
                animation: 'spin 1s linear infinite'
              }}/>
              <p style={{ margin: 0, fontSize: '16px' }}>Loading products...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : products.length === 0 ? (
            <div style={{ 
              padding: '60px', 
              textAlign: 'center',
              color: '#666'
            }}>
              <svg 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="#ccc" 
                strokeWidth="1.5"
                style={{ margin: '0 auto 20px', display: 'block' }}
              >
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <p style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#333' }}>
                No products found
              </p>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>
                Try adjusting your filters or add a new product
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ 
                width: '100%',
                borderCollapse: 'collapse'
              }}>
                <thead>
                  <tr style={{ 
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Name</th>
                    <th style={{ padding: '16px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Category</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>Active</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>Quantity</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>Reorder Level</th>
                    <th style={{ padding: '16px', textAlign: 'right', fontWeight: '600', fontSize: '14px' }}>Price</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>Needs Reorder</th>
                    <th style={{ padding: '16px', textAlign: 'center', fontWeight: '600', fontSize: '14px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((prod, idx) => (
                    <tr 
                      key={prod._id}
                      style={{ 
                        borderBottom: '1px solid #e1e8ed',
                        background: idx % 2 === 0 ? 'white' : '#f8f9fa',
                        transition: 'background 0.2s'
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#f0f4ff'}
                      onMouseOut={e => e.currentTarget.style.background = idx % 2 === 0 ? 'white' : '#f8f9fa'}
                    >
                      <td style={{ padding: '16px', fontWeight: '500', color: '#333' }}>{prod.name}</td>
                      <td style={{ padding: '16px', color: '#666' }}>
                        <span style={{
                          background: '#e8eef7',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#667eea'
                        }}>
                          {prod.category}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <span style={{
                          background: prod.is_active ? '#d4edda' : '#f8d7da',
                          color: prod.is_active ? '#155724' : '#721c24',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {prod.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center', fontWeight: '600', color: '#333' }}>{prod.quantity}</td>
                      <td style={{ padding: '16px', textAlign: 'center', color: '#666' }}>{prod.reorder_level}</td>
                      <td style={{ padding: '16px', textAlign: 'right', fontWeight: '600', color: '#667eea', fontSize: '15px' }}>
                        ${prod.price.toFixed(2)}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        {prod.needs_reorder ? (
                          <span style={{
                            background: '#fff3cd',
                            color: '#856404',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            ⚠️ Reorder
                          </span>
                        ) : (
                          <span style={{ color: '#999', fontSize: '14px' }}>—</span>
                        )}
                      </td>
                      <td style={{ padding: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => handleEdit(prod)}
                            style={{
                              padding: '6px 14px',
                              background: '#ffc107',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={e => e.target.style.background = '#e0a800'}
                            onMouseOut={e => e.target.style.background = '#ffc107'}
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(prod._id)}
                            style={{
                              padding: '6px 14px',
                              background: '#dc3545',
                              color: 'white',
                              border: 'none',
                              borderRadius: '6px',
                              fontSize: '13px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                            onMouseOver={e => e.target.style.background = '#c82333'}
                            onMouseOut={e => e.target.style.background = '#dc3545'}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && products.length > 0 && (
            <div style={{ 
              padding: '20px 30px',
              borderTop: '1px solid #e1e8ed',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px'
            }}>
              <button 
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                style={{
                  padding: '8px 16px',
                  background: page <= 1 ? '#e1e8ed' : 'white',
                  color: page <= 1 ? '#999' : '#667eea',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: page <= 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  if (page > 1) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = '#f0f4ff';
                  }
                }}
                onMouseOut={e => {
                  if (page > 1) {
                    e.target.style.borderColor = '#e1e8ed';
                    e.target.style.background = 'white';
                  }
                }}
              >
                ← Previous
              </button>
              
              <span style={{ 
                padding: '8px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                Page {page} of {totalPages}
              </span>
              
              <button 
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                style={{
                  padding: '8px 16px',
                  background: page >= totalPages ? '#e1e8ed' : 'white',
                  color: page >= totalPages ? '#999' : '#667eea',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: page >= totalPages ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={e => {
                  if (page < totalPages) {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.background = '#f0f4ff';
                  }
                }}
                onMouseOut={e => {
                  if (page < totalPages) {
                    e.target.style.borderColor = '#e1e8ed';
                    e.target.style.background = 'white';
                  }
                }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <ProductForm product={editing} onClose={handleFormClose} />
      )}
    </div>
  );
}