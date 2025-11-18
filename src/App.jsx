import React, { useRef } from 'react'
import Hero from './components/Hero'
import WalletStats from './components/WalletStats'
import Actions from './components/Actions'
import Transactions from './components/Transactions'

function App() {
  const refreshRef = useRef(null)

  const refresh = async () => {
    // trigger WalletStats refresh by remounting via key or letting it refetch
    // For simplicity, just reload the page section by calling location hash
    try {
      // No-op: child components expose refresh via their own controls. We will refresh WalletStats by forcing state updates via key change pattern if needed.
    } catch {}
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />

      <main className="relative z-10 -mt-24 md:-mt-32">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          {/* Stats & Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <WalletStats key={Date.now()} ref={refreshRef} />
            </div>
            <div>
              <Actions onChange={() => window.location.reload()} />
            </div>
          </div>

          {/* Transactions */}
          <div className="mt-6 md:mt-8">
            <Transactions />
          </div>

          {/* Footer */}
          <div className="py-10 text-center text-slate-400 text-sm">
            Built for the future • Minimal and neon-lit
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
