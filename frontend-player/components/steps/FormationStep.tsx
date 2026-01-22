'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { usePlayerStore, FormationData } from '@/store/usePlayerStore'
import { ArrowRight, ArrowLeft, GraduationCap, Plus, Trash2 } from 'lucide-react'

interface FormationFormData {
  formations: FormationData[]
}

export function FormationStep() {
  const { data, updateData, setStep } = usePlayerStore()

  const form = useForm<FormationFormData>({
    defaultValues: {
      formations: data.formations && data.formations.length > 0 
        ? data.formations 
        : [{
            institution: '',
            diploma: '',
            startYear: null,
            endYear: null,
          }]
    },
    mode: 'onBlur'
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'formations'
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 15 }, (_, i) => currentYear - 10 + i)

  const onSubmit = (formData: FormationFormData) => {
    // Filtrer les formations vides
    const validFormations = formData.formations.filter(f => f.institution && f.diploma)
    updateData({ formations: validFormations })
    setStep(7)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-[#f59e0b]" />
            Formation
          </h2>
          <p className="text-sm text-gray-400">Votre parcours scolaire et diplômes (optionnel).</p>
        </div>
        
        {fields.length < 3 && (
          <button
            type="button"
            onClick={() => append({
              institution: '',
              diploma: '',
              startYear: null,
              endYear: null,
            })}
            className="flex items-center gap-2 px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-full hover:bg-[#f59e0b]/20 transition-all text-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        )}
      </div>

      {/* Liste des formations */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div 
            key={field.id} 
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f59e0b]/30 transition-all"
          >
            <div className="space-y-4">
              {/* Établissement */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                  Établissement
                </label>
                <input
                  {...form.register(`formations.${index}.institution`)}
                  placeholder="Nom de l'établissement"
                  className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                />
              </div>

              {/* Diplôme */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                  Diplôme / Formation
                </label>
                <input
                  {...form.register(`formations.${index}.diploma`)}
                  placeholder="Ex: Bac Pro, BTS, Licence STAPS..."
                  className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                />
              </div>

              {/* Années */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                    Année début
                  </label>
                  <select
                    {...form.register(`formations.${index}.startYear`, { valueAsNumber: true })}
                    className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                  >
                    <option value="">Choisir...</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                    Année fin
                  </label>
                  <select
                    {...form.register(`formations.${index}.endYear`, { valueAsNumber: true })}
                    className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                  >
                    <option value="">Choisir...</option>
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              </div>

              {/* Bouton supprimer */}
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="w-full flex items-center justify-center gap-2 text-red-500/50 hover:text-red-500 text-sm py-2 hover:bg-red-500/10 rounded-lg transition-colors mt-4"
                >
                  <Trash2 className="w-4 h-4" /> Supprimer
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
        <p className="text-sm text-blue-300">
          💡 Cette section est optionnelle. Vous pouvez passer directement à l'étape suivante.
        </p>
      </div>

      {/* Navigation */}
      <div className="pt-6 flex justify-between items-center border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(5)}
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