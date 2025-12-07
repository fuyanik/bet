'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { subscribeToUsers, subscribeToPaymentSettings, initializePaymentSettings } from '@/lib/adminFirebase'

const AdminDashboard = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [paymentSettings, setPaymentSettings] = useState({})
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBalance: 0,
    activePaymentMethods: 0,
    totalPaymentMethods: 0
  })

  // Auth check
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth !== 'authenticated') {
      router.push('/admin')
    }
  }, [router])

  // Initialize and subscribe to data
  useEffect(() => {
    initializePaymentSettings()

    const unsubscribeUsers = subscribeToUsers((usersData) => {
      setUsers(usersData)
    })

    const unsubscribePayments = subscribeToPaymentSettings((settings) => {
      setPaymentSettings(settings)
    })

    return () => {
      unsubscribeUsers()
      unsubscribePayments()
    }
  }, [])

  // Calculate stats
  useEffect(() => {
    const totalUsers = users.length
    const totalBalance = users.reduce((sum, user) => {
      const balanceStr = user.toplamBakiyeniz || user.totalBakiyeBilgisi || '0'
      const balance = parseFloat(balanceStr.replace(/\./g, '').replace(',', '.')) || 0
      return sum + balance
    }, 0)

    const paymentMethods = Object.values(paymentSettings)
    const totalPaymentMethods = paymentMethods.length
    const activePaymentMethods = paymentMethods.filter(m => m.enabled).length

    setStats({
      totalUsers,
      totalBalance,
      activePaymentMethods,
      totalPaymentMethods
    })
  }, [users, paymentSettings])

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const formatBalance = (num) => {
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  // Sidebar Component
  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? 'w-full' : 'w-64'} h-full bg-slate-800 flex flex-col`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-white font-bold">Admin Panel</h1>
              <p className="text-slate-400 text-xs">Yönetim Merkezi</p>
            </div>
          </div>
          {mobile && (
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <nav className="space-y-2">
          <Link href="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 text-white rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Dashboard</span>
          </Link>

          <Link href="/admin/users" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>Kullanıcılar</span>
          </Link>

          <Link href="/admin/payments" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Ödeme Yöntemleri</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all w-full"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-800 border-b border-slate-700 z-30 flex items-center justify-between px-4">
        <button onClick={() => setSidebarOpen(true)} className="text-white p-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-white font-bold">Dashboard</h1>
        <div className="w-10"></div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
          <div className="absolute left-0 top-0 h-full w-72 animate-slide-in">
            <Sidebar mobile={true} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 border-r border-slate-700 z-40">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8 pt-20 lg:pt-8">
        {/* Header */}
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm lg:text-base">Hoş geldiniz! Site istatistiklerinizi buradan takip edebilirsiniz.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Users */}
          <div className="bg-slate-800 rounded-xl p-4 lg:p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-xs lg:text-sm">Toplam Kullanıcı</p>
            <p className="text-xl lg:text-3xl font-bold text-white mt-1">{stats.totalUsers}</p>
          </div>

          {/* Total Balance */}
          <div className="bg-slate-800 rounded-xl p-4 lg:p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-xs lg:text-sm">Toplam Bakiye</p>
            <p className="text-lg lg:text-3xl font-bold text-white mt-1">₺{formatBalance(stats.totalBalance)}</p>
          </div>

          {/* Active Payment Methods */}
          <div className="bg-slate-800 rounded-xl p-4 lg:p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-xs lg:text-sm">Aktif Ödeme</p>
            <p className="text-xl lg:text-3xl font-bold text-white mt-1">{stats.activePaymentMethods}</p>
          </div>

          {/* Total Payment Methods */}
          <div className="bg-slate-800 rounded-xl p-4 lg:p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-3 lg:mb-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-400 text-xs lg:text-sm">Toplam Ödeme</p>
            <p className="text-xl lg:text-3xl font-bold text-white mt-1">{stats.totalPaymentMethods}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Recent Users */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 lg:p-6 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-semibold text-white">Son Kullanıcılar</h2>
              <Link href="/admin/users" className="text-purple-400 hover:text-purple-300 text-sm">
                Tümü →
              </Link>
            </div>
            <div className="divide-y divide-slate-700">
              {users.slice(0, 5).map((user, index) => (
                <div key={index} className="p-3 lg:p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-sm lg:text-base">
                      {(user.username || user.id)?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base truncate max-w-[120px] lg:max-w-none">{user.username || user.id || 'Bilinmiyor'}</p>
                      <p className="text-slate-400 text-xs">{user.login ? '🟢 Aktif' : '🔴 Pasif'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-medium text-sm lg:text-base">{user.toplamBakiyeniz || '0'}</p>
                    <p className="text-slate-400 text-xs hidden lg:block">Toplam Bakiye</p>
                  </div>
                </div>
              ))}
              {users.length === 0 && (
                <div className="p-6 lg:p-8 text-center text-slate-400 text-sm">
                  Henüz kullanıcı bulunmuyor
                </div>
              )}
            </div>
          </div>

          {/* Payment Methods Status */}
          <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
            <div className="p-4 lg:p-6 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-base lg:text-lg font-semibold text-white">Ödeme Yöntemleri</h2>
              <Link href="/admin/payments" className="text-purple-400 hover:text-purple-300 text-sm">
                Yönet →
              </Link>
            </div>
            <div className="divide-y divide-slate-700">
              {Object.values(paymentSettings).slice(0, 6).map((method, index) => (
                <div key={index} className="p-3 lg:p-4 flex items-center justify-between hover:bg-slate-700/30 transition-colors">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${method.type === 'crypto' ? 'bg-yellow-500/20' : method.type === 'bank' ? 'bg-blue-500/20' : 'bg-purple-500/20'}`}>
                      {method.type === 'crypto' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm lg:text-base">{method.name}</p>
                      <p className="text-slate-400 text-xs capitalize">{method.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${method.enabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {method.enabled ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
