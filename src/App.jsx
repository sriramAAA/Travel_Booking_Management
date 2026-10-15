import { Suspense, lazy, useEffect, useState } from 'react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { Bell, CalendarDays, ChevronDown, Compass, Heart, Home, Moon, Plane, Search, Shield, Sun, Wallet, X } from 'lucide-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useTravelStore } from './store/useTravelStore'
const HomePage = lazy(() => import('./features/home/HomePage'))
const DestinationsPage = lazy(() => import('./features/destinations/DestinationsPage'))
const HotelsPage = lazy(() => import('./features/hotels/HotelsPage'))
const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'))
const TripsPage = lazy(() => import('./features/trips/TripsPage'))
const BudgetPage = lazy(() => import('./features/budget/BudgetPage'))
const TransportPage = lazy(() => import('./features/transport/TransportPage'))
const AdminPage = lazy(() => import('./features/admin/AdminPage'))
const WishlistPage = lazy(() => import('./features/wishlist/WishlistPage'))
const GroupTripsPage = lazy(() => import('./features/group-trips/GroupTripsPage'))
const ReviewsPage = lazy(() => import('./features/reviews/ReviewsPage'))

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } })

const mainNav = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/destinations', label: 'Explore', icon: Compass },
  { to: '/hotels', label: 'Stays', icon: Search },
  { to: '/trips', label: 'My trips', icon: CalendarDays },
]

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function AppLayout() {
  const theme = useTravelStore((state) => state.theme)
  const toggleTheme = useTravelStore((state) => state.toggleTheme)
  const role = useTravelStore((state) => state.role)
  const notifications = useTravelStore((state) => state.notifications)
  const dismissNotifications = useTravelStore((state) => state.dismissNotifications)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  return <div className="app-shell">
    <header className="site-header">
      <Link className="brand" to="/" aria-label="Tripora home"><span className="brand-mark"><Plane size={17} /></span><span>tripora<span className="brand-period">.</span><small>GO A LITTLE FURTHER</small></span></Link>
      <nav className="main-nav" aria-label="Main navigation">{mainNav.map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}><Icon size={15} /><span>{label}</span></NavLink>)}</nav>
      <div className="header-actions">
        <NavLink className={({ isActive }) => `header-icon ${isActive ? 'active' : ''}`} to="/wishlist" aria-label="Wishlist"><Heart size={18} /></NavLink>
        <button className="header-icon" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}</button>
        <div className="notification-wrap"><button className="header-icon notification-button" aria-label="Notifications" aria-expanded={noticeOpen} onClick={() => setNoticeOpen(!noticeOpen)}><Bell size={18} />{notifications > 0 && <i />}</button>{noticeOpen && <div className="notification-popover"><div className="popover-title"><strong>A little update</strong><button onClick={() => setNoticeOpen(false)} aria-label="Close notifications"><X size={15} /></button></div><p><span className="notification-dot" />Your Kyoto getaway is coming up in 3 days.</p><p><span className="notification-dot muted" />There are 2 new places on your wishlist.</p><button className="popover-dismiss" onClick={() => { dismissNotifications(); setNoticeOpen(false) }}>Mark everything as read</button></div>}</div>
        <div className="profile-wrap"><button className="profile-button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span className="profile-avatar">A</span><span className="profile-name">Alex Morgan</span><ChevronDown size={14} /></button>{menuOpen && <div className="profile-menu"><Link to="/dashboard" onClick={() => setMenuOpen(false)}>Travel dashboard</Link><Link to="/budget" onClick={() => setMenuOpen(false)}>Trip budget</Link><Link to="/groups" onClick={() => setMenuOpen(false)}>Group trips</Link><Link to="/reviews" onClick={() => setMenuOpen(false)}>Traveler notes</Link><Link to="/transport" onClick={() => setMenuOpen(false)}>Getting there</Link><span className="menu-separator" /><Link to="/admin" onClick={() => setMenuOpen(false)}><Shield size={14} /> {role === 'admin' ? 'Admin workspace' : 'Demo admin'}</Link></div>}</div>
      </div>
    </header>
    <main className="route-area"><Suspense fallback={<div className="loading-state">Making a little room for your plans…</div>}><Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/destinations" element={<DestinationsPage />} />
      <Route path="/hotels" element={<HotelsPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/trips" element={<TripsPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/transport" element={<TransportPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      <Route path="/groups" element={<GroupTripsPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<div className="not-found"><Compass size={28} /><h1>A little off the map.</h1><p>Let’s find our way back to somewhere lovely.</p><Link to="/" className="button button-dark">Back to Tripora</Link></div>} />
    </Routes></Suspense></main>
    <footer className="site-footer"><Link className="brand footer-brand" to="/"><span className="brand-mark"><Plane size={15} /></span><span>tripora<span className="brand-period">.</span></span></Link><span>Go a little further. Come back a little different.</span><div><Link to="/destinations">Explore</Link><Link to="/transport">Transport</Link><Link to="/admin">Demo workspace</Link></div><small>© 2026 Tripora · A standalone travel planning demo</small></footer>
    <nav className="mobile-nav" aria-label="Mobile navigation">{[{ to: '/', label: 'Home', icon: Home, end: true }, { to: '/destinations', label: 'Explore', icon: Compass }, { to: '/trips', label: 'My trips', icon: CalendarDays }, { to: '/budget', label: 'Budget', icon: Wallet }].map(({ to, label, icon: Icon, end }) => <NavLink key={to} to={to} end={end} className={({ isActive }) => isActive ? 'active' : ''}><Icon size={19} /><span>{label}</span></NavLink>)}</nav>
  </div>
}

export default function App() {
  return <QueryClientProvider client={queryClient}><BrowserRouter><ScrollToTop /><AppLayout /></BrowserRouter></QueryClientProvider>
}
