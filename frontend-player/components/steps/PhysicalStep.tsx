'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { physicalSchema, PhysicalData } from '@/lib/schemas'
import { usePlayerStore } from '@/store/usePlayerStore'
import { InputGroup } from '@/components/InputGroup'
import { ArrowRight, ArrowLeft, Ruler, Weight, Zap } from 'lucide-react'

export function PhysicalStep() {
  const { data, updateData, setStep } = usePlayerStore()

  const form = useForm<PhysicalData>({
    resolver: zodResolver(physicalSchema),
    defaultValues: {
      size: data.size || undefined,
      weight: data.weight || undefined,
      strongFoot: (data.strongFoot as any) || undefined,
      vma: data.vma || undefined,
    },
    mode: 'onBlur'
  })

  const onSubmit = (formData: PhysicalData) => {
    updateData(formData)
    setStep(3)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Ruler className="w-6 h-6 text-[#f59e0b]" />
          Caractéristiques physiques
        </h2>
        <p className="text-sm text-gray-400">Vos aptitudes physiques.</p>
      </div>

      {/* Taille et Poids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup 
          label={<>Taille (cm) <span className="text-red-500">*</span></>}
          error={form.formState.errors.size?.message}
        >
          <div className="relative">
            <input
              type="number"
              {...form.register('size', { valueAsNumber: true })}
              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none pl-10"
              placeholder="182"
              min={100}
              max={250}
            />
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
        </InputGroup>

        <InputGroup 
          label={<>Poids (kg) <span className="text-red-500">*</span></>}
          error={form.formState.errors.weight?.message}
        >
          <div className="relative">
            <input
              type="number"
              {...form.register('weight', { valueAsNumber: true })}
              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none pl-10"
              placeholder="75"
              min={30}
              max={150}
            />
            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
        </InputGroup>
      </div>

      {/* Pied fort */}
      <InputGroup 
        label={<>Pied fort <span className="text-red-500">*</span></>}
        error={form.formState.errors.strongFoot?.message}
      >
        <div className="grid grid-cols-3 gap-3">
          {['Droit', 'Gauche', 'Ambidextre'].map((foot) => (
            <label
              key={foot}
              className={`
                cursor-pointer flex items-center justify-center py-4 px-4 rounded-xl border-2 transition-all
                ${form.watch('strongFoot') === foot 
                  ? 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]' 
                  : 'bg-white/5 border-white/10 text-white/70 hover:border-white/30'
                }
              `}
            >
              <input
                type="radio"
                value={foot}
                {...form.register('strongFoot')}
                className="hidden"
              />
              <span className="font-medium">{foot}</span>
            </label>
          ))}
        </div>
      </InputGroup>

      {/* VMA */}
      <InputGroup 
        label="VMA (km/h) - Optionnel"
        error={form.formState.errors.vma?.message}
      >
        <div className="relative">
          <input
            type="number"
            step="0.1"
            {...form.register('vma', { valueAsNumber: true })}
            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none pl-10"
            placeholder="18.5"
          />
          <Zap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Vitesse Maximale Aérobie - si vous la connaissez
        </p>
      </InputGroup>

      {/* Navigation */}
      <div className="pt-6 flex justify-between items-center border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(1)}
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