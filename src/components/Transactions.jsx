import React, { useEffect, useState } from 'react'

const API = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Transactions() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTx = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API}/api/transactions`)
      const data = await res.json()
      setRows(Array.isArray(data) ? data : [])
    } catch (e) {
      setError('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTx()
  }, [])

  return (
    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-medium">Transaction History</h3>
        <button onClick={fetchTx} className="text-xs text-blue-300 hover:text-blue-200">Refresh</button>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="text-slate-300/80">
            <tr>
              <th className="py-2 pr-4">Type</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Balance After</th>
              <th className="py-2 pr-4">When</th>
              <th className="py-2 pr-4">Note</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="py-3 text-slate-300" colSpan={5}>Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td className="py-3 text-slate-300" colSpan={5}>No transactions yet</td></tr>
            ) : (
              rows.map((r) => (
                <tr key={r._id} className="border-t border-white/10">
                  <td className={`py-3 pr-4 font-medium ${r.type === 'deposit' ? 'text-emerald-300' : 'text-fuchsia-300'}`}>{r.type}</td>
                  <td className="py-3 pr-4 text-white">${Number(r.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td className="py-3 pr-4 text-white">${Number(r.balance_after || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                  <td className="py-3 pr-4 text-slate-300">{r.created_at ? new Date(r.created_at).toLocaleString() : '-'}</td>
                  <td className="py-3 pr-4 text-slate-300">{r.note || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
