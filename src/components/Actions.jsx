import React, { useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Actions({ onChange }) {
  const [amount, setAmount] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const doAction = async (type) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setMessage('Enter a valid amount')
      return
    }
    setBusy(true)
    setMessage('')
    try {
      const res = await fetch(`${API}/api/${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Action failed')
      setAmount('')
      setMessage(`${type === 'deposit' ? 'Deposited' : 'Withdrew'} successfully`)
      onChange?.()
    } catch (e) {
      setMessage(e.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full md:w-1/3 bg-slate-900/60 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        />
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => doAction('deposit')}
            disabled={busy}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-medium hover:from-emerald-400 hover:to-emerald-600 transition">
            Deposit
          </button>
          <button
            onClick={() => doAction('withdraw')}
            disabled={busy}
            className="flex-1 md:flex-none px-5 py-3 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 text-white font-medium hover:from-pink-400 hover:to-fuchsia-600 transition">
            Withdraw
          </button>
        </div>
      </div>
      {message && <p className="mt-3 text-slate-200 text-sm">{message}</p>}
    </div>
  )
}
