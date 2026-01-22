'use client'

import { PlayerWizard } from '@/components/PlayerWizard'

export default function PlayerFormPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#141414] border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#f59e0b] rounded-xl flex items-center justify-center">
              <span className="text-black font-black text-xl">S</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Scoutify</h1>
              <p className="text-sm text-gray-400">Créez votre CV Football</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PlayerWizard />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          © 2025 Scoutify - Tous droits réservés
        </div>
      </footer>
    </div>
  )
}