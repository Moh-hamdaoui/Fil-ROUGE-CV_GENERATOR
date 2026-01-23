'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileSchema, ProfileData } from '@/lib/schemas'
import { usePlayerStore } from '@/store/usePlayerStore'
import { InputGroup } from '@/components/InputGroup'
import { NATIONALITIES } from '@/lib/constants'
import { ArrowRight, Calendar, Upload, User } from 'lucide-react'
import { useState } from 'react'

export function ProfileStep() {
  const { data, updateData, setStep } = usePlayerStore()
  const [photoPreview, setPhotoPreview] = useState<string>(data.photo || '')

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      gender: (data.gender as any) || undefined,
      dateOfBirth: data.dateOfBirth || '',
      nationality: data.nationality || '',
      secondaryNationality: data.secondaryNationality || '',
      email: data.email || '',
      telephone: data.telephone || '',
      photo: data.photo || '',
    },
    mode: 'onBlur'
  })

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Fichier trop volumineux (max 5MB)')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        setPhotoPreview(base64)
        form.setValue('photo', base64)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = (formData: ProfileData) => {
    updateData(formData)
    setStep(2)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <User className="w-6 h-6 text-[#f59e0b]" />
          Profil
        </h2>
        <p className="text-sm text-gray-400">Vos informations personnelles.</p>
      </div>

      {/* Photo de profil */}
      <div className="flex justify-center">
        <label className="cursor-pointer group">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center overflow-hidden bg-white/5 hover:border-[#f59e0b] transition-all group-hover:bg-white/10">
            {photoPreview ? (
              <img src={photoPreview} alt="Photo" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-white/40 mx-auto mb-2" />
                <span className="text-xs text-white/40">Ajouter photo</span>
              </div>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Prénom et Nom */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup 
          label={<>Prénom <span className="text-red-500">*</span></>} 
          error={form.formState.errors.firstName?.message}
        >
          <input
            {...form.register('firstName')}
            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
            placeholder="Votre prénom"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, '')
            }}
          />
        </InputGroup>

        <InputGroup 
          label={<>Nom <span className="text-red-500">*</span></>} 
          error={form.formState.errors.lastName?.message}
        >
          <input
            {...form.register('lastName')}
            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
            placeholder="Votre nom"
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value.replace(/[0-9]/g, '')
            }}
          />
        </InputGroup>
      </div>

      {/* Date de naissance et Genre */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup 
          label={<>Date de naissance <span className="text-red-500">*</span></>}
          error={form.formState.errors.dateOfBirth?.message}
        >
          <div className="relative">
            <input
              type="date"
              {...form.register('dateOfBirth')}
            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none pl-10"
            />
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          </div>
        </InputGroup>

        <InputGroup 
          label={<>Genre <span className="text-red-500">*</span></>}
          error={form.formState.errors.gender?.message}
        >
          <select {...form.register('gender')} className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none">
            <option value="">Sélectionnez</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </InputGroup>
      </div>

      {/* Nationalités */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup 
          label={<>Nationalité <span className="text-red-500">*</span></>}
          error={form.formState.errors.nationality?.message}
        >
          <select {...form.register('nationality')} className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none">
            <option value="">Sélectionnez</option>
            {NATIONALITIES.map(nat => (
              <option key={nat} value={nat}>{nat}</option>
            ))}
          </select>
        </InputGroup>

        <InputGroup 
          label="Seconde nationalité"
          error={form.formState.errors.secondaryNationality?.message}
        >
          <select {...form.register('secondaryNationality')} className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none">
            <option value="">Optionnel</option>
            {NATIONALITIES.map(nat => (
              <option key={nat} value={nat}>{nat}</option>
            ))}
          </select>
        </InputGroup>
      </div>

      {/* Contact */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputGroup 
            label={<>Email <span className="text-red-500">*</span></>}
            error={form.formState.errors.email?.message}
          >
            <input
              type="email"
              {...form.register('email')}
              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
              placeholder="votre@email.com"
            />
          </InputGroup>

          <InputGroup 
            label={<>Téléphone <span className="text-red-500">*</span></>}
            error={form.formState.errors.telephone?.message}
          >
            <input
              type="tel"
              {...form.register('telephone')}
              className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
              placeholder="+33 6 12 34 56 78"
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value.replace(/[^0-9+\s-]/g, '')
              }}
            />
          </InputGroup>
        </div>
      </div>

      {/* Navigation */}
      <div className="pt-6 flex justify-end">
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