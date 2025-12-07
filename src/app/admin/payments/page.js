'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { subscribeToPaymentSettings, updatePaymentSettings, initializePaymentSettings } from '@/lib/adminFirebase'

const AdminPaymentsPage = () => {
  const router = useRouter()
  const [paymentSettings, setPaymentSettings] = useState({})
  const [editingMethod, setEditingMethod] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [saveStatus, setSaveStatus] = useState('')
  const [filter, setFilter] = useState('all')
  const [togglingId, setTogglingId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Auth check
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth !== 'authenticated') {
      router.push('/admin')
    }
  }, [router])

  // Initialize and subscribe
  useEffect(() => {
    initializePaymentSettings()
    const unsubscribe = subscribeToPaymentSettings((settings) => {
      setPaymentSettings(settings)
    })
    return () => unsubscribe()
  }, [])

  // Filter methods by type
  const filterByType = (methods) => {
    if (filter === 'all') return methods
    return methods.filter(m => m.type === filter)
  }

  // Separate active and inactive methods
  const allMethods = Object.values(paymentSettings)
  const activeMethods = filterByType(allMethods.filter(m => m.enabled))
  const inactiveMethods = filterByType(allMethods.filter(m => !m.enabled))

  const handleToggle = async (methodId, currentStatus) => {
    setTogglingId(methodId)
    const method = paymentSettings[methodId]
    await updatePaymentSettings(methodId, {
      ...method,
      enabled: !currentStatus
    })
    setTimeout(() => setTogglingId(null), 300)
  }

  const handleEdit = (method) => {
    setEditingMethod(method)
    setEditForm({ ...method })
  }

  const handleSave = async () => {
    if (!editingMethod) return

    setSaveStatus('saving')
    const success = await updatePaymentSettings(editForm.id, editForm)

    if (success) {
      setSaveStatus('saved')
      setTimeout(() => {
        setEditingMethod(null)
        setSaveStatus('')
      }, 1000)
    } else {
      setSaveStatus('error')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    router.push('/admin')
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
            <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <nav className="space-y-2">
          <Link href="/admin/dashboard" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-700/50 hover:text-white rounded-lg transition-all">
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

          <Link href="/admin/payments" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 text-white rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            <span>Ödeme Yöntemleri</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-700">
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  )

  // Payment Card Component
  const PaymentCard = ({ method, isToggling }) => (
    <div 
      className={`bg-slate-800 rounded-xl border overflow-hidden transition-all duration-500 hover:shadow-lg transform ${
        isToggling ? 'scale-95 opacity-50' : 'scale-100 opacity-100'
      } ${method.enabled ? 'border-green-500/50' : 'border-slate-700'}`}
    >
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-3 lg:mb-4">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${
              method.type === 'crypto' ? 'bg-yellow-500/20' : method.type === 'bank' ? 'bg-blue-500/20' : 'bg-purple-500/20'
            }`}>
              {method.type === 'crypto' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : method.type === 'bank' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm lg:text-base">{method.name}</h3>
              <p className="text-slate-400 text-xs capitalize">
                {method.type === 'crypto' ? 'Kripto' : method.type === 'bank' ? 'Havale' : 'Kart'}
              </p>
            </div>
          </div>
          
          {/* Checkbox Toggle */}
          <button
            onClick={() => handleToggle(method.id, method.enabled)}
            disabled={isToggling}
            className={`w-7 h-7 rounded-lg border-2 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${
              method.enabled 
                ? 'bg-green-500 border-green-500 focus:ring-green-500' 
                : 'bg-transparent border-slate-500 hover:border-slate-400 focus:ring-slate-500'
            }`}
          >
            <svg 
              className={`w-4 h-4 text-white transition-all duration-300 ${method.enabled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>

        {/* Method Details */}
        <div className="space-y-2 text-sm">
          {method.type === 'crypto' && (
            <div className="bg-slate-700/50 rounded-lg p-2 lg:p-3">
              <p className="text-slate-400 text-xs mb-1">Cüzdan Adresi</p>
              <p className="text-white font-mono text-xs truncate">{method.walletAddress}</p>
            </div>
          )}
          {method.type === 'bank' && (
            <>
              <div className="bg-slate-700/50 rounded-lg p-2 lg:p-3">
                <p className="text-slate-400 text-xs mb-1">Banka</p>
                <p className="text-white text-xs lg:text-sm">{method.bankName}</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2 lg:p-3">
                <p className="text-slate-400 text-xs mb-1">IBAN</p>
                <p className="text-white font-mono text-xs truncate">{method.iban}</p>
              </div>
            </>
          )}
          <div className="flex justify-between text-xs text-slate-400 pt-2">
            <span>Min: ₺{method.minAmount?.toLocaleString()}</span>
            <span>Max: ₺{method.maxAmount?.toLocaleString()}</span>
          </div>
        </div>

        {/* Edit Button */}
        <button
          onClick={() => handleEdit(method)}
          className="w-full mt-3 lg:mt-4 px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Düzenle
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
        <h1 className="text-white font-bold">Ödeme Yöntemleri</h1>
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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Ödeme Yöntemleri</h1>
              <p className="text-slate-400 mt-1 text-sm lg:text-base">Ödeme yöntemlerini aktif/pasif yapın ve bilgilerini düzenleyin</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 lg:px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${filter === 'all' ? 'bg-purple-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                Tümü ({allMethods.length})
              </button>
              <button
                onClick={() => setFilter('crypto')}
                className={`px-3 lg:px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${filter === 'crypto' ? 'bg-yellow-500 text-black' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                Kripto ({allMethods.filter(m => m.type === 'crypto').length})
              </button>
              <button
                onClick={() => setFilter('bank')}
                className={`px-3 lg:px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${filter === 'bank' ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}
              >
                Havale ({allMethods.filter(m => m.type === 'bank').length})
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-500/30 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-green-400 text-xs lg:text-sm">Aktif</p>
              <p className="text-xl lg:text-2xl font-bold text-white">{activeMethods.length}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/30 rounded-xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-500/30 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-red-400 text-xs lg:text-sm">Pasif</p>
              <p className="text-xl lg:text-2xl font-bold text-white">{inactiveMethods.length}</p>
            </div>
          </div>
        </div>

        {/* Active Payment Methods Section */}
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-lg lg:text-xl font-semibold text-white">Aktif Ödeme Yöntemleri</h2>
            <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">{activeMethods.length}</span>
          </div>
          
          {activeMethods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
              {activeMethods.map((method) => (
                <PaymentCard 
                  key={method.id} 
                  method={method} 
                  isToggling={togglingId === method.id}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-xl p-6 lg:p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 lg:h-12 lg:w-12 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-slate-400 text-sm">Aktif ödeme yöntemi bulunmuyor</p>
            </div>
          )}
        </div>

        {/* Inactive Payment Methods Section */}
        <div>
          <div className="flex items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 bg-red-500 rounded-full"></div>
            <h2 className="text-lg lg:text-xl font-semibold text-white">Pasif Ödeme Yöntemleri</h2>
            <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">{inactiveMethods.length}</span>
          </div>
          
          {inactiveMethods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 opacity-75">
              {inactiveMethods.map((method) => (
                <PaymentCard 
                  key={method.id} 
                  method={method} 
                  isToggling={togglingId === method.id}
                />
              ))}
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-xl p-6 lg:p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 lg:h-12 lg:w-12 text-slate-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-slate-400 text-sm">Tüm yöntemler aktif!</p>
            </div>
          )}
        </div>
      </main>

      {/* Edit Modal */}
      {editingMethod && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 lg:p-4">
          <div className="bg-slate-800 rounded-xl p-4 lg:p-6 w-full max-w-lg border border-slate-700 shadow-2xl max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-white">Ödeme Yöntemi Düzenle</h2>
              <button onClick={() => setEditingMethod(null)} className="text-slate-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 lg:space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Yöntem Adı</label>
                <input
                  type="text"
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                />
              </div>

              {/* Crypto Wallet Address */}
              {editForm.type === 'crypto' && (
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Cüzdan Adresi</label>
                  <input
                    type="text"
                    value={editForm.walletAddress || ''}
                    onChange={(e) => setEditForm({...editForm, walletAddress: e.target.value})}
                    className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono text-xs lg:text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              )}

              {/* Bank Details */}
              {editForm.type === 'bank' && (
                <>
                  <div>
                    <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Banka Adı</label>
                    <input
                      type="text"
                      value={editForm.bankName || ''}
                      onChange={(e) => setEditForm({...editForm, bankName: e.target.value})}
                      className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Hesap Sahibi</label>
                    <input
                      type="text"
                      value={editForm.accountHolder || ''}
                      onChange={(e) => setEditForm({...editForm, accountHolder: e.target.value})}
                      className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">IBAN</label>
                    <input
                      type="text"
                      value={editForm.iban || ''}
                      onChange={(e) => setEditForm({...editForm, iban: e.target.value})}
                      className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white font-mono focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Şube</label>
                    <input
                      type="text"
                      value={editForm.branch || ''}
                      onChange={(e) => setEditForm({...editForm, branch: e.target.value})}
                      className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                    />
                  </div>
                </>
              )}

              {/* Min/Max Amount */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Min. Tutar (₺)</label>
                  <input
                    type="number"
                    value={editForm.minAmount || ''}
                    onChange={(e) => setEditForm({...editForm, minAmount: parseInt(e.target.value)})}
                    className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                  />
                </div>
                <div>
                  <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Max. Tutar (₺)</label>
                  <input
                    type="number"
                    value={editForm.maxAmount || ''}
                    onChange={(e) => setEditForm({...editForm, maxAmount: parseInt(e.target.value)})}
                    className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm lg:text-base"
                  />
                </div>
              </div>

              {/* Enabled Toggle in Modal */}
              <div className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3 lg:p-4">
                <div>
                  <span className="text-slate-300 font-medium text-sm lg:text-base">Durum</span>
                  <p className="text-slate-400 text-xs mt-1">{editForm.enabled ? 'Kullanıcılar görebilir' : 'Gizli'}</p>
                </div>
                <button
                  onClick={() => setEditForm({...editForm, enabled: !editForm.enabled})}
                  className={`w-7 h-7 rounded-lg border-2 transition-all duration-300 ease-in-out flex items-center justify-center focus:outline-none ${
                    editForm.enabled 
                      ? 'bg-green-500 border-green-500' 
                      : 'bg-transparent border-slate-500 hover:border-slate-400'
                  }`}
                >
                  <svg 
                    className={`w-4 h-4 text-white transition-all duration-300 ${editForm.enabled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-6">
              <button
                onClick={() => setEditingMethod(null)}
                className="flex-1 px-4 py-2.5 lg:py-3 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm lg:text-base"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex-1 px-4 py-2.5 lg:py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 text-sm lg:text-base"
              >
                {saveStatus === 'saving' ? (
                  <>
                    <svg className="animate-spin h-4 w-4 lg:h-5 lg:w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Kaydediliyor...
                  </>
                ) : saveStatus === 'saved' ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Kaydedildi!
                  </>
                ) : (
                  'Kaydet'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

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

export default AdminPaymentsPage
