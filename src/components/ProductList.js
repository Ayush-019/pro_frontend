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
    <div className="container mt-4">
      <h2>Product List</h2>
      <div className="d-flex align-items-center mb-3 gap-2 flex-wrap">
        <button className="btn btn-primary" onClick={handleAdd}>Add Product</button>
        <input 
          type="text" 
          className="form-control" 
          style={{ maxWidth: '250px' }}
          value={search} 
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by name"
        />
        <select 
          className="form-select" 
          style={{ maxWidth: '200px' }}
          value={category} 
          onChange={e => { setCategory(e.target.value); setPage(1); }}
        >
          {categories.map(cat => (
            <option value={cat} key={cat}>{cat || 'All Categories'}</option>
          ))}
        </select>
        <select
          className="form-select"
          style={{ maxWidth: '150px' }}
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="createdAt">Created Date</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>
        <select
          className="form-select"
          style={{ maxWidth: '110px' }}
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
        >
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>
        <select
          className="form-select"
          style={{ maxWidth: '100px' }}
          value={limit}
          onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
        >
          {[5,10,15,20,50].map(n => (
            <option key={n} value={n}>{n}/page</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Active</th>
              <th>Quantity</th>
              <th>Reorder Level</th>
              <th>Price</th>
              <th>Needs Reorder</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.is_active ? 'Yes' : 'No'}</td>
                <td>{prod.quantity}</td>
                <td>{prod.reorder_level}</td>
                <td>{prod.price}</td>
                <td>{prod.needs_reorder ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(prod)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(prod._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page <= 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page - 1)} aria-disabled={page <= 1}>Previous</button>
          </li>
          <li className="page-item disabled"><span className="page-link">{page} / {totalPages}</span></li>
          <li className={`page-item ${page >= totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => setPage(page + 1)} aria-disabled={page >= totalPages}>Next</button>
          </li>
        </ul>
      </nav>

      {showForm && (
        <ProductForm product={editing} onClose={handleFormClose} />
      )}
    </div>
  );
}
