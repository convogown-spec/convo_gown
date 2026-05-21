import React, { useState } from 'react';
import './AdminDashboard.css';

const stats = [
  { label: 'Total Bookings', value: '1,247', delta: '+12%', icon: '📋', color: '#1E3A8A', bg: 'rgba(30,58,138,0.06)' },
  { label: 'Revenue This Month', value: '₹8.4L', delta: '+18%', icon: '💰', color: '#059669', bg: 'rgba(5,150,105,0.06)' },
  { label: 'Gowns in Inventory', value: '12,540', delta: '-3%', icon: '🎓', color: '#7C3AED', bg: 'rgba(124,58,237,0.06)' },
  { label: 'Pending Requests', value: '43', delta: '+5', icon: '⏳', color: '#D97706', bg: 'rgba(217,119,6,0.06)' },
];

const recentBookings = [
  { id: '#BK1089', college: 'Cochin University', qty: 800, date: '2026-06-15', status: 'Confirmed', amount: '₹1,35,200' },
  { id: '#BK1088', college: 'SRM Institute', qty: 1200, date: '2026-06-20', status: 'Pending', amount: '₹2,02,800' },
  { id: '#BK1087', college: 'Amrita School', qty: 450, date: '2026-05-28', status: 'Delivered', amount: '₹76,050' },
  { id: '#BK1086', college: 'Mahatma Gandhi Univ.', qty: 600, date: '2026-05-30', status: 'Confirmed', amount: '₹1,01,400' },
  { id: '#BK1085', college: 'Calicut University', qty: 950, date: '2026-06-10', status: 'Processing', amount: '₹1,60,550' },
];

const monthlyData = [45, 60, 80, 70, 95, 110, 130, 120, 145, 160, 140, 175];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const statusColors = {
  Confirmed: { bg: 'rgba(5,150,105,0.1)', color: '#059669' },
  Pending: { bg: 'rgba(217,119,6,0.1)', color: '#D97706' },
  Delivered: { bg: 'rgba(30,58,138,0.1)', color: '#1E3A8A' },
  Processing: { bg: 'rgba(124,58,237,0.1)', color: '#7C3AED' },
};

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');

  const maxVal = Math.max(...monthlyData);

  const filteredBookings = activeTab === 'all'
    ? recentBookings
    : recentBookings.filter(b => b.status.toLowerCase() === activeTab);

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar__logo">
          <svg viewBox="0 0 40 40" fill="none" width="30" height="30">
            <rect width="40" height="40" rx="10" fill="#1E3A8A"/>
            <path d="M20 8L32 14V18C32 25.5 27 32.2 20 34C13 32.2 8 25.5 8 18V14L20 8Z" fill="#FBBF24"/>
            <path d="M16 20L19 23L25 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Gownify Admin</span>
        </div>

        <nav className="admin-sidebar__nav">
          {[
            { icon: '⊞', label: 'Dashboard', active: true },
            { icon: '📋', label: 'Bookings' },
            { icon: '🎓', label: 'Inventory' },
            { icon: '🏫', label: 'Universities' },
            { icon: '📊', label: 'Analytics' },
            { icon: '⚙️', label: 'Settings' },
          ].map((item, i) => (
            <div key={i} className={`admin-sidebar__item ${item.active ? 'active' : ''}`}>
              <span className="admin-sidebar__item-icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="admin-sidebar__footer">
          <div className="admin-sidebar__user">
            <div className="admin-sidebar__avatar">A</div>
            <div>
              <strong>Admin User</strong>
              <span>admin@gownify.in</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <div className="admin-topbar">
          <div>
            <h1>Dashboard Overview</h1>
            <p>Welcome back! Here's what's happening with Gownify today.</p>
          </div>
          <div className="admin-topbar__actions">
            <div className="admin-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
              <input type="text" placeholder="Search bookings..." />
            </div>
            <button className="btn btn-primary admin-topbar__btn">
              + New Booking
            </button>
          </div>
        </div>

        <div className="admin-content">
          {/* Stats */}
          <div className="admin-stats">
            {stats.map((s, i) => (
              <div key={i} className="admin-stat-card" style={{ '--stat-color': s.color, '--stat-bg': s.bg }}>
                <div className="admin-stat-card__icon">{s.icon}</div>
                <div className="admin-stat-card__body">
                  <span className="admin-stat-card__label">{s.label}</span>
                  <strong className="admin-stat-card__value">{s.value}</strong>
                  <span className={`admin-stat-card__delta ${s.delta.startsWith('-') ? 'negative' : 'positive'}`}>
                    {s.delta.startsWith('+') ? '↑' : '↓'} {s.delta} this month
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="admin-charts-row">
            {/* Bar Chart */}
            <div className="admin-chart-card">
              <div className="admin-chart-card__header">
                <h3>Monthly Bookings</h3>
                <select className="admin-select">
                  <option>2026</option>
                  <option>2025</option>
                </select>
              </div>
              <div className="admin-bar-chart">
                {monthlyData.map((val, i) => (
                  <div key={i} className="admin-bar-chart__bar-wrapper" title={`${months[i]}: ${val}`}>
                    <div
                      className="admin-bar-chart__bar"
                      style={{ height: `${(val / maxVal) * 100}%` }}
                    >
                      <div className="admin-bar-chart__bar-fill"></div>
                    </div>
                    <span className="admin-bar-chart__label">{months[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Donut */}
            <div className="admin-chart-card admin-chart-card--sm">
              <div className="admin-chart-card__header">
                <h3>Booking Status</h3>
              </div>
              <div className="admin-donut-wrapper">
                <svg viewBox="0 0 120 120" className="admin-donut">
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#EFF6FF" strokeWidth="16"/>
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#1E3A8A" strokeWidth="16" strokeDasharray="119 170" strokeDashoffset="0" strokeLinecap="round"/>
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#FBBF24" strokeWidth="16" strokeDasharray="57 232" strokeDashoffset="-119" strokeLinecap="round"/>
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#7C3AED" strokeWidth="16" strokeDasharray="45 244" strokeDashoffset="-176" strokeLinecap="round"/>
                  <circle cx="60" cy="60" r="46" fill="none" stroke="#059669" strokeWidth="16" strokeDasharray="68 221" strokeDashoffset="-221" strokeLinecap="round"/>
                  <text x="60" y="55" textAnchor="middle" fill="#111827" fontSize="14" fontWeight="900" fontFamily="Poppins">1,247</text>
                  <text x="60" y="70" textAnchor="middle" fill="#9CA3AF" fontSize="7" fontFamily="Poppins">Total</text>
                </svg>
              </div>
              <div className="admin-donut-legend">
                {[
                  { label: 'Confirmed', pct: '41%', color: '#1E3A8A' },
                  { label: 'Pending', pct: '20%', color: '#FBBF24' },
                  { label: 'Processing', pct: '16%', color: '#7C3AED' },
                  { label: 'Delivered', pct: '23%', color: '#059669' },
                ].map((item, i) => (
                  <div key={i} className="admin-donut-legend__item">
                    <span className="admin-donut-legend__dot" style={{ background: item.color }}></span>
                    <span className="admin-donut-legend__label">{item.label}</span>
                    <strong className="admin-donut-legend__pct">{item.pct}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bookings Table */}
          <div className="admin-table-card">
            <div className="admin-table-card__header">
              <h3>Recent Booking Requests</h3>
              <div className="admin-tabs">
                {['all', 'confirmed', 'pending', 'delivered'].map(tab => (
                  <button
                    key={tab}
                    className={`admin-tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Institution</th>
                    <th>Qty</th>
                    <th>Event Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.length > 0 ? filteredBookings.map((booking, i) => (
                    <tr key={i}>
                      <td><span className="admin-table__id">{booking.id}</span></td>
                      <td><strong>{booking.college}</strong></td>
                      <td>{booking.qty.toLocaleString()}</td>
                      <td>{booking.date}</td>
                      <td><strong>{booking.amount}</strong></td>
                      <td>
                        <span
                          className="admin-status-badge"
                          style={statusColors[booking.status]}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <div className="admin-table__actions">
                          <button className="admin-action-btn">View</button>
                          <button className="admin-action-btn admin-action-btn--primary">Edit</button>
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="7" className="admin-table__empty">No bookings found for this filter.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
