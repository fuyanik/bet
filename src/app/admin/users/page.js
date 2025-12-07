'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { subscribeToUsers, updateUserData } from '@/lib/adminFirebase'

const AdminUsersPage = () => {
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingUser, setEditingUser] = useState(null)
  const [viewingUser, setViewingUser] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editForm, setEditForm] = useState({
    bakiyeniz: '',
    bonusBakiyeniz: '',
    toplamBakiyeniz: ''
  })
  const [saveStatus, setSaveStatus] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  // Auth check
  useEffect(() => {
    const adminAuth = localStorage.getItem('adminAuth')
    if (adminAuth !== 'authenticated') {
      router.push('/admin')
    }
  }, [router])

  // Subscribe to users
  useEffect(() => {
    const unsubscribe = subscribeToUsers((usersData) => {
      setUsers(usersData)
    })
    return () => unsubscribe()
  }, [])

  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleEdit = (user) => {
    setEditingUser(user)
    setEditForm({
      bakiyeniz: user.bakiyeniz?.replace(/[^0-9,.-]+/g, '') || '0',
      bonusBakiyeniz: user.bonusBakiyeniz?.replace(/[^0-9,.-]+/g, '') || '0',
      toplamBakiyeniz: user.toplamBakiyeniz?.replace(/[^0-9,.-]+/g, '') || '0'
    })
  }

  const handleView = (user) => {
    setViewingUser(user)
    setActiveTab('overview')
  }

  const handleSave = async () => {
    if (!editingUser) return

    setSaveStatus('saving')
    
    const success = await updateUserData(editingUser.username || editingUser.id, {
      bakiyeniz: editForm.bakiyeniz,
      bonusBakiyeniz: editForm.bonusBakiyeniz,
      toplamBakiyeniz: editForm.toplamBakiyeniz
    })

    if (success) {
      setSaveStatus('saved')
      setTimeout(() => {
        setEditingUser(null)
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

          <Link href="/admin/users" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 bg-slate-700/50 text-white rounded-lg">
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
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all w-full">
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
        <h1 className="text-white font-bold">Kullanıcılar</h1>
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
              <h1 className="text-2xl lg:text-3xl font-bold text-white">Kullanıcı Yönetimi</h1>
              <p className="text-slate-400 mt-1 text-sm lg:text-base">Kayıtlı kullanıcıları görüntüleyin ve bakiyelerini düzenleyin</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-64 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 absolute right-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="lg:hidden space-y-3">
          {filteredUsers.map((user, index) => (
            <div 
              key={index} 
              className="bg-slate-800 rounded-xl border border-slate-700 p-4"
              onClick={() => handleView(user)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {(user.username || user.id)?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="text-white font-medium">{user.username || user.id || 'Bilinmiyor'}</p>
                    <p className="text-slate-400 text-xs">{user.login ? '🟢 Aktif' : '🔴 Pasif'}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleEdit(user); }}
                  className="px-3 py-1.5 bg-purple-500/20 text-purple-400 rounded-lg text-sm"
                >
                  Düzenle
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <p className="text-green-400 font-semibold text-sm">{user.bakiyeniz || '0'}</p>
                  <p className="text-slate-400 text-xs">Bakiye</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <p className="text-yellow-400 font-semibold text-sm">{user.bonusBakiyeniz || '0'}</p>
                  <p className="text-slate-400 text-xs">Bonus</p>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <p className="text-cyan-400 font-semibold text-sm">{user.toplamBakiyeniz || '0'}</p>
                  <p className="text-slate-400 text-xs">Toplam</p>
                </div>
              </div>
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz kullanıcı bulunmuyor'}
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Kullanıcı</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Bakiye</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Bonus Bakiye</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Toplam Bakiye</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-300 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-slate-300 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {filteredUsers.map((user, index) => (
                  <tr key={index} className="hover:bg-slate-700/30 transition-colors cursor-pointer" onClick={() => handleView(user)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                          {(user.username || user.id)?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.username || user.id || 'Bilinmiyor'}</p>
                          <p className="text-slate-400 text-sm">{user.login ? '🟢 Giriş yapıldı' : '🔴 Giriş yapılmadı'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-green-400 font-semibold">{user.bakiyeniz || '0'} {user.currency || '₺'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-yellow-400 font-semibold">{user.bonusBakiyeniz || '0'} {user.currency || '₺'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-cyan-400 font-semibold">{user.toplamBakiyeniz || user.totalBakiyeBilgisi || '0'} {user.currency || '₺'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {user.aktifBonuslar?.length > 0 ? (
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
                          {user.aktifBonuslar.length} Aktif Bonus
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-slate-600/50 text-slate-400 rounded-full text-xs">
                          Bonus Yok
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                      >
                        Düzenle
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                      {searchTerm ? 'Arama sonucu bulunamadı' : 'Henüz kullanıcı bulunmuyor'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total Count */}
        <div className="mt-4 text-slate-400 text-sm">
          Toplam {filteredUsers.length} kullanıcı gösteriliyor
        </div>
      </main>

      {/* View User Detail Modal */}
      {viewingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 lg:p-4">
          <div className="bg-slate-800 rounded-xl w-full max-w-4xl border border-slate-700 shadow-2xl max-h-[95vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 lg:p-6 border-b border-slate-700 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl">
                  {(viewingUser.username || viewingUser.id)?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <h2 className="text-base lg:text-xl font-bold text-white">{viewingUser.username || viewingUser.id}</h2>
                  <p className="text-slate-400 text-xs lg:text-sm">{viewingUser.login ? '🟢 Aktif Oturum' : '🔴 Oturum Kapalı'}</p>
                </div>
              </div>
              <button onClick={() => setViewingUser(null)} className="text-slate-400 hover:text-white p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Balance Cards */}
            <div className="p-4 lg:p-6 grid grid-cols-3 gap-2 lg:gap-4 border-b border-slate-700 flex-shrink-0">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-2 lg:p-4 text-center">
                <p className="text-green-400 text-xs lg:text-sm mb-1">Bakiye</p>
                <p className="text-lg lg:text-2xl font-bold text-white">{viewingUser.bakiyeniz || '0'}</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-2 lg:p-4 text-center">
                <p className="text-yellow-400 text-xs lg:text-sm mb-1">Bonus</p>
                <p className="text-lg lg:text-2xl font-bold text-white">{viewingUser.bonusBakiyeniz || '0'}</p>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-2 lg:p-4 text-center">
                <p className="text-cyan-400 text-xs lg:text-sm mb-1">Toplam</p>
                <p className="text-lg lg:text-2xl font-bold text-white">{viewingUser.toplamBakiyeniz || '0'}</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-700 flex-shrink-0 overflow-x-auto">
              {['overview', 'games', 'bonuses', 'payments'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 lg:px-6 py-3 text-xs lg:text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-purple-400 border-b-2 border-purple-400 bg-slate-700/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab === 'overview' && 'Genel'}
                  {tab === 'games' && `Oyunlar (${viewingUser.oyunGeçmişi?.length || 0})`}
                  {tab === 'bonuses' && `Bonus (${viewingUser.aktifBonuslar?.length || 0})`}
                  {tab === 'payments' && `Ödeme (${viewingUser.hesapOzetim?.length || 0})`}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-4 lg:p-6 overflow-y-auto flex-grow">
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-slate-700/30 rounded-lg p-3 lg:p-4">
                    <p className="text-slate-400 text-xs mb-1">Kullanıcı Adı</p>
                    <p className="text-white font-medium text-sm lg:text-base">{viewingUser.username || '-'}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 lg:p-4">
                    <p className="text-slate-400 text-xs mb-1">Şifre</p>
                    <p className="text-white font-medium font-mono text-sm lg:text-base">{viewingUser.password || '-'}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 lg:p-4">
                    <p className="text-slate-400 text-xs mb-1">Para Birimi</p>
                    <p className="text-white font-medium text-sm lg:text-base">{viewingUser.currency || '₺'}</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-3 lg:p-4">
                    <p className="text-slate-400 text-xs mb-1">Giriş Durumu</p>
                    <p className="text-white font-medium text-sm lg:text-base">{viewingUser.login ? '✅ Başarılı' : '❌ Başarısız'}</p>
                  </div>
                  {viewingUser.error_message && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 lg:p-4 col-span-1 lg:col-span-2">
                      <p className="text-red-400 text-xs mb-1">Hata Mesajı</p>
                      <p className="text-red-300 font-medium text-sm">{viewingUser.error_message}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'games' && (
                <div className="space-y-2">
                  {viewingUser.oyunGeçmişi?.length > 0 ? (
                    viewingUser.oyunGeçmişi.map((game, idx) => (
                      <div key={idx} className="bg-slate-700/30 rounded-lg p-3 lg:p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-4">
                          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm lg:text-base">{game.oyun}</p>
                            <p className="text-slate-400 text-xs">{game.tarih} - {game.saat}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold text-sm lg:text-base ${game.miktar?.includes('+') ? 'text-green-400' : game.miktar?.includes('-') ? 'text-red-400' : 'text-slate-400'}`}>
                            {game.miktar}
                          </p>
                          <p className="text-slate-400 text-xs">Bakiye: {game.bakiye}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">Oyun geçmişi bulunmuyor</div>
                  )}
                </div>
              )}

              {activeTab === 'bonuses' && (
                <div className="space-y-4">
                  <h3 className="text-white font-semibold text-sm lg:text-base mb-2">Aktif Bonuslar</h3>
                  {viewingUser.aktifBonuslar?.length > 0 ? (
                    viewingUser.aktifBonuslar.map((bonus, idx) => (
                      <div key={idx} className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 lg:p-4">
                        <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <p className="text-yellow-400 font-medium text-sm lg:text-base">{bonus.bonusAdi}</p>
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">{bonus.bonusTipi}</span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4 text-xs lg:text-sm">
                          <div>
                            <p className="text-slate-400">Kalan Bonus</p>
                            <p className="text-white font-medium">{bonus.kalanBonusMiktari}</p>
                          </div>
                          <div>
                            <p className="text-slate-400">Kalan Çevrim</p>
                            <p className="text-white font-medium">{bonus.kalanCevrimSarti}</p>
                          </div>
                          <div className="col-span-2 lg:col-span-1">
                            <p className="text-slate-400">Son Kullanma</p>
                            <p className="text-white font-medium">{bonus.sonKullanmaTarihi}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-slate-400 text-sm">Aktif bonus bulunmuyor</div>
                  )}
                </div>
              )}

              {activeTab === 'payments' && (
                <div className="space-y-2">
                  {viewingUser.hesapOzetim?.length > 0 ? (
                    viewingUser.hesapOzetim.map((payment, idx) => (
                      <div key={idx} className="bg-slate-700/30 rounded-lg p-3 lg:p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 lg:gap-4">
                          <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center ${payment.durum === 'Başarılı' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {payment.durum === 'Başarılı' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 lg:h-5 lg:w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm lg:text-base">{payment.durum}</p>
                            <p className="text-slate-400 text-xs">{payment.tarih} - {payment.saat}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-green-400 font-bold text-sm lg:text-base">{payment.miktar}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-400 text-sm">Ödeme geçmişi bulunmuyor</div>
                  )}
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 lg:p-6 border-t border-slate-700 flex justify-end gap-3 flex-shrink-0">
              <button
                onClick={() => setViewingUser(null)}
                className="px-4 lg:px-6 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors text-sm lg:text-base"
              >
                Kapat
              </button>
              <button
                onClick={() => { setViewingUser(null); handleEdit(viewingUser); }}
                className="px-4 lg:px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm lg:text-base"
              >
                Bakiye Düzenle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-4 lg:p-6 w-full max-w-md border border-slate-700 shadow-2xl">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <h2 className="text-lg lg:text-xl font-bold text-white">Bakiye Düzenle</h2>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4 lg:mb-6">
              <div className="flex items-center gap-3 p-3 lg:p-4 bg-slate-700/50 rounded-lg">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {(editingUser.username || editingUser.id)?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm lg:text-base">{editingUser.username || editingUser.id}</p>
                  <p className="text-slate-400 text-xs lg:text-sm">Mevcut: {editingUser.toplamBakiyeniz || '0'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 lg:space-y-4">
              <div>
                <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Bakiye</label>
                <input
                  type="text"
                  value={editForm.bakiyeniz}
                  onChange={(e) => setEditForm({...editForm, bakiyeniz: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 text-sm lg:text-base"
                  placeholder="Örn: 17,24"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Bonus Bakiye</label>
                <input
                  type="text"
                  value={editForm.bonusBakiyeniz}
                  onChange={(e) => setEditForm({...editForm, bonusBakiyeniz: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm lg:text-base"
                  placeholder="Örn: 204,00"
                />
              </div>

              <div>
                <label className="block text-xs lg:text-sm font-medium text-slate-300 mb-2">Toplam Bakiye</label>
                <input
                  type="text"
                  value={editForm.toplamBakiyeniz}
                  onChange={(e) => setEditForm({...editForm, toplamBakiyeniz: e.target.value})}
                  className="w-full px-4 py-2.5 lg:py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm lg:text-base"
                  placeholder="Örn: 221,24"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-4 lg:mt-6">
              <button
                onClick={() => setEditingUser(null)}
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

export default AdminUsersPage
