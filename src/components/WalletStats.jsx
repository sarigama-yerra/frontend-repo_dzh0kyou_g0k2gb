import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function WalletStats() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [wallet, setWallet] = useState({ balance: 0, currency: 'USD' })

  const fetchWallet = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/wallet`)
      const data = await res.json()
      setWallet(data)
    } catch (e) {
      setError('Failed to load wallet')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWallet()
  }, [])

  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-300/80 text-sm">Current Balance</p>
          <div className="mt-1 text-3xl md:text-5xl font-semibold text-white tracking-tight">
            {loading ? '— — —' : `$${Number(wallet.balance || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-300/80 text-sm">Currency</p>
          <p className="text-white text-xl">{wallet.currency}</p>
        </div>
      </div>
      {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
    </div>
  )
}
