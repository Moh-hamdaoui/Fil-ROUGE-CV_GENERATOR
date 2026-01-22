'use client'

import { usePlayerStore } from '@/store/usePlayerStore'
import { Check } from 'lucide-react'

const STEPS = [
  { number: 1, label: 'Profil' },
  { number: 2, label: 'Physique' },
  { number: 3, label: 'Poste' },
  { number: 4, label: 'Qualités' },
  { number: 5, label: 'Carrière' },
  { number: 6, label: 'Formation' },
  { number: 7, label: 'Liens' },
]

export function StepIndicator() {
  const { currentStep } = usePlayerStore()

  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      {STEPS.map((step, index) => {
        const isCompleted = currentStep > step.number
        const isCurrent = currentStep === step.number
        const isLast = index === STEPS.length - 1

        return (
          <div key={step.number} className="flex items-center">
            {/* Cercle de l'étape */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                  transition-all duration-300
                  ${isCompleted 
                    ? 'bg-[#f59e0b] text-black' 
                    : isCurrent 
                      ? 'bg-[#f59e0b]/20 border-2 border-[#f59e0b] text-[#f59e0b]' 
                      : 'bg-white/5 border border-white/20 text-white/40'
                  }
                `}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : step.number}
              </div>
              <span 
                className={`
                  text-xs mt-2 font-medium
                  ${isCurrent ? 'text-[#f59e0b]' : isCompleted ? 'text-white' : 'text-white/40'}
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Ligne de connexion */}
            {!isLast && (
              <div 
                className={`
                  w-8 h-0.5 mx-2 mt-[-20px]
                  ${isCompleted ? 'bg-[#f59e0b]' : 'bg-white/10'}
                `}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}