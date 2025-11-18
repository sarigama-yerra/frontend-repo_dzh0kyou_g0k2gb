import React from 'react'
import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/vi0ijCQQJTRFc8LA/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      {/* Gradient overlays for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-slate-950/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-10 w-full">
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 w-full md:max-w-xl shadow-[0_0_40px_rgba(59,130,246,0.25)]">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Neo Crypto Dashboard
            </h1>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-slate-200/80">
              Minimal, futuristic, and fast. Manage your wallet, track transactions, and move funds with confidence.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
