'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { positionSchema, PositionData } from '@/lib/schemas'
import { usePlayerStore } from '@/store/usePlayerStore'
import { POSITIONS_433, POSITIONS_352, POSITION_LABELS } from '@/lib/constants'
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react'
import { useEffect } from 'react'

export function PositionStep() {
  const { data, updateData, setStep } = usePlayerStore()

  const form = useForm<PositionData>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      favoriteTactic: (data.favoriteTactic as any) || undefined,
      primaryPost: data.primaryPost || '',
      secondaryPost: data.secondaryPost || '',
    },
    mode: 'onBlur'
  })

  const selectedFormation = form.watch('favoriteTactic')
  const primaryPost = form.watch('primaryPost')
  const secondaryPost = form.watch('secondaryPost')
  
  const POSITIONS = selectedFormation === '3-5-2' ? POSITIONS_352 : POSITIONS_433

  // Reset les postes quand la formation change
  useEffect(() => {
    if (selectedFormation && data.favoriteTactic !== selectedFormation) {
      form.setValue('primaryPost', '')
      form.setValue('secondaryPost', '')
    }
  }, [selectedFormation])

  const handlePositionClick = (posKey: string) => {
    const currentPrimary = form.getValues('primaryPost')
    
    if (!currentPrimary) {
      // Pas de poste principal -> on le définit
      form.setValue('primaryPost', posKey)
    } else if (currentPrimary === posKey) {
      // Clic sur le poste principal -> on le retire
      form.setValue('primaryPost', '')
    } else {
      // Un poste principal existe déjà
      const currentSecondary = form.getValues('secondaryPost')
      if (currentSecondary === posKey) {
        // Clic sur le secondaire -> on le retire
        form.setValue('secondaryPost', '')
      } else {
        // Définir comme secondaire
        form.setValue('secondaryPost', posKey)
      }
    }
  }

  const onSubmit = (formData: PositionData) => {
    updateData(formData)
    setStep(4)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <MapPin className="w-6 h-6 text-[#f59e0b]" />
          Poste & Position
        </h2>
        <p className="text-sm text-gray-400">
          Indiquez vos postes et cliquez sur le terrain pour les visualiser.
        </p>
      </div>

      {/* Sélection de formation */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">
          Formation préférée <span className="text-red-500">*</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {['4-3-3', '3-5-2'].map((formation) => (
            <button
              key={formation}
              type="button"
              onClick={() => form.setValue('favoriteTactic', formation as any)}
              className={`
                p-6 rounded-xl border-2 transition-all text-center font-bold text-xl
                ${selectedFormation === formation
                  ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b] shadow-lg shadow-orange-900/20'
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                }
              `}
            >
              {formation}
            </button>
          ))}
        </div>
        {form.formState.errors.favoriteTactic && (
          <p className="text-red-400 text-sm">{form.formState.errors.favoriteTactic.message}</p>
        )}
      </div>

      {/* Terrain et contrôles */}
      {selectedFormation && (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Terrain */}
          <div className="relative w-full lg:w-[400px] aspect-[2/3] bg-green-900/30 border-2 border-white/20 rounded-xl overflow-hidden mx-auto">
            {/* Lignes du terrain */}
            <div className="absolute inset-4 border-2 border-white/30 rounded-sm" />
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/20 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 w-20 h-20 border-2 border-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-14 border-b-2 border-x-2 border-white/30 rounded-b-lg" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-14 border-t-2 border-x-2 border-white/30 rounded-t-lg" />
            
            {/* Surface de réparation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-20 border-b-2 border-x-2 border-white/20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-20 border-t-2 border-x-2 border-white/20" />

            {/* Label formation */}
            <div className="absolute top-2 right-2 bg-[#f59e0b] text-black px-3 py-1 rounded-lg text-xs font-bold">
              {selectedFormation}
            </div>

            {/* Positions */}
            {Object.entries(POSITIONS).map(([key, pos]) => {
              const isPrimary = primaryPost === key
              const isSecondary = secondaryPost === key

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handlePositionClick(key)}
                  className={`
                    absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center 
                    font-bold text-xs transition-all shadow-lg border-2 hover:scale-110
                    ${isPrimary 
                      ? 'bg-[#f59e0b] text-black border-white scale-110 z-20' 
                      : isSecondary 
                        ? 'bg-white text-black border-[#f59e0b] scale-105 z-10' 
                        : 'bg-black/60 text-white/70 border-white/30 hover:bg-white/20 hover:border-white'
                    }
                  `}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  {key.replace('2', '')}
                </button>
              )
            })}
          </div>

          {/* Contrôles */}
          <div className="flex-1 space-y-6 w-full">
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#f59e0b] border-2 border-white" />
                <span className="text-sm font-medium text-white">
                  Poste Principal <span className="text-red-500">*</span>
                </span>
                <span className="ml-auto text-[#f59e0b] font-bold">
                  {primaryPost ? POSITION_LABELS[primaryPost] || primaryPost : '-'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white border-2 border-[#f59e0b]" />
                <span className="text-sm font-medium text-white">Poste Secondaire</span>
                <span className="ml-auto text-white font-bold">
                  {secondaryPost ? POSITION_LABELS[secondaryPost] || secondaryPost : '-'}
                </span>
              </div>
            </div>

            {form.formState.errors.primaryPost && (
              <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                ⚠️ Sélectionnez au moins un poste principal
              </div>
            )}

            <div className="text-xs text-gray-500 leading-relaxed">
              <p>Cliquez sur les points du terrain pour sélectionner votre poste.</p>
              <p className="mt-1">
                <span className="text-[#f59e0b]">Premier clic</span> : Poste principal
              </p>
              <p>
                <span className="text-white">Second clic</span> (autre poste) : Poste secondaire
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="pt-6 flex justify-between items-center border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <button
          type="submit"
          className="bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all hover:scale-105"
        >
          Suivant
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </form>
  )
}