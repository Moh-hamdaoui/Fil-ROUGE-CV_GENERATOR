'use client'

import { usePlayerStore } from '@/store/usePlayerStore'
import { StepIndicator } from '@/components/StepIndicator'
import { ProfileStep } from '@/components/steps/ProfileStep'
import { PhysicalStep } from '@/components/steps/PhysicalStep'
import { PositionStep } from '@/components/steps/PositionStep'
import { QualitiesStep } from '@/components/steps/QualitiesStep'
import { CareerStep } from '@/components/steps/CareerStep'
import { FormationStep } from '@/components/steps/FormationStep'
import { LinksStep } from '@/components/steps/LinksStep'
import { CheckCircle, RotateCcw } from 'lucide-react'

export function PlayerWizard() {
  const { currentStep, resetForm } = usePlayerStore()

  // Page de succès
  if (currentStep > 7) {
    return (
      <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5 space-y-6 animate-fade-in">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white">CV Transmis avec succès !</h2>
        
        <p className="text-gray-400 max-w-md mx-auto">
          Votre profil a été enregistré. Notre équipe va examiner vos informations 
          et vous recontactera prochainement.
        </p>

        <div className="pt-6">
          <button
            onClick={resetForm}
            className="inline-flex items-center gap-2 text-[#f59e0b] hover:text-white font-bold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Créer un nouveau profil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Indicateur d'étapes */}
      <StepIndicator />

      {/* Contenu de l'étape actuelle */}
      <div className="bg-[#141414] border border-white/10 rounded-2xl p-6 md:p-8">
        {currentStep === 1 && <ProfileStep />}
        {currentStep === 2 && <PhysicalStep />}
        {currentStep === 3 && <PositionStep />}
        {currentStep === 4 && <QualitiesStep />}
        {currentStep === 5 && <CareerStep />}
        {currentStep === 6 && <FormationStep />}
        {currentStep === 7 && <LinksStep />}
      </div>
    </div>
  )
}