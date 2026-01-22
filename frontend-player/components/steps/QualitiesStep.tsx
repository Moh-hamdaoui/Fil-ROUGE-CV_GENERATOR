'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { qualitiesSchema, QualitiesData } from '@/lib/schemas'
import { usePlayerStore } from '@/store/usePlayerStore'
import { QUALITIES_BY_CATEGORY } from '@/lib/constants'
import { ArrowRight, ArrowLeft, Star, X, Check } from 'lucide-react'
import { useState } from 'react'

export function QualitiesStep() {
  const { data, updateData, setStep } = usePlayerStore()
  const isGoalkeeper = data.primaryPost === 'GB'

  // Filtrer les catégories selon le poste
  const availableCategories = isGoalkeeper 
    ? ['Gardien', 'Mental', 'Physique']
    : ['Technique', 'Physique', 'Mental', 'Défensif']

  const [selectedQualities, setSelectedQualities] = useState<{ category: string; quality: string }[]>(
    data.qualities || []
  )

  const form = useForm<QualitiesData>({
    resolver: zodResolver(qualitiesSchema),
    defaultValues: {
      qualities: data.qualities || [],
    },
    mode: 'onBlur'
  })

  const toggleQuality = (category: string, quality: string) => {
    const exists = selectedQualities.find(q => q.category === category && q.quality === quality)
    
    if (exists) {
      // Retirer
      const updated = selectedQualities.filter(q => !(q.category === category && q.quality === quality))
      setSelectedQualities(updated)
      form.setValue('qualities', updated)
    } else {
      // Ajouter (max 10)
      if (selectedQualities.length >= 10) {
        alert('Maximum 10 qualités')
        return
      }
      const updated = [...selectedQualities, { category, quality }]
      setSelectedQualities(updated)
      form.setValue('qualities', updated)
    }
  }

  const isSelected = (category: string, quality: string) => {
    return selectedQualities.some(q => q.category === category && q.quality === quality)
  }

  const onSubmit = (formData: QualitiesData) => {
    updateData({ qualities: selectedQualities })
    setStep(5)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Star className="w-6 h-6 text-[#f59e0b]" />
          Vos Qualités
        </h2>
        <p className="text-sm text-gray-400">
          Sélectionnez vos principales qualités (maximum 10).
        </p>
      </div>

      {/* Compteur */}
      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
        <span className="text-white font-medium">Qualités sélectionnées</span>
        <span className={`text-2xl font-bold ${selectedQualities.length >= 10 ? 'text-red-400' : 'text-[#f59e0b]'}`}>
          {selectedQualities.length}/10
        </span>
      </div>

      {/* Qualités sélectionnées */}
      {selectedQualities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedQualities.map((q, idx) => (
            <span
              key={idx}
              className="bg-[#f59e0b]/20 text-[#f59e0b] px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 border border-[#f59e0b]/40"
            >
              {q.quality}
              <button
                type="button"
                onClick={() => toggleQuality(q.category, q.quality)}
                className="hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Catégories de qualités */}
      <div className="space-y-6">
        {availableCategories.map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {QUALITIES_BY_CATEGORY[category]?.map((quality) => {
                const selected = isSelected(category, quality)
                return (
                  <button
                    key={quality}
                    type="button"
                    onClick={() => toggleQuality(category, quality)}
                    className={`
                      px-4 py-2 rounded-lg border transition-all text-sm font-medium
                      ${selected
                        ? 'bg-[#f59e0b] text-black border-[#f59e0b]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30 hover:text-white'
                      }
                    `}
                  >
                    {selected && <Check className="w-4 h-4 inline mr-1" />}
                    {quality}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Erreur */}
      {form.formState.errors.qualities && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
          ⚠️ {form.formState.errors.qualities.message}
        </div>
      )}

      {/* Navigation */}
      <div className="pt-6 flex justify-between items-center border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(3)}
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