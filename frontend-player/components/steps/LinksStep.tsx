'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { linksSchema, LinksData } from '@/lib/schemas'
import { usePlayerStore } from '@/store/usePlayerStore'
import { InputGroup } from '@/components/InputGroup'
import { ArrowLeft, Link2, Video, BarChart3, Send, Loader2 } from 'lucide-react'
import { useState } from 'react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

export function LinksStep() {
  const { data, updateData, setStep, resetForm } = usePlayerStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const form = useForm<LinksData>({
    resolver: zodResolver(linksSchema),
    defaultValues: {
      linkVideo: data.linkVideo || '',
      linkStats: data.linkStats || '',
    },
    mode: 'onBlur'
  })

  const submitToAPI = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // 1. Créer le joueur
      const playerPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        nationality: data.nationality,
        secondaryNationality: data.secondaryNationality || null,
        dateOfBirth: data.dateOfBirth,
        email: data.email,
        telephone: data.telephone,
        strongFoot: data.strongFoot,
        size: data.size,
        weight: data.weight,
        vma: data.vma || null,
        primaryPost: data.primaryPost,
        secondaryPost: data.secondaryPost || null,
        photo: data.photo || null,
        linkVideo: data.linkVideo || null,
        linkStats: data.linkStats || null,
        favoriteTactic: data.favoriteTactic,
      }

      const playerRes = await fetch(`${API_URL}/api/players`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(playerPayload),
      })

      if (!playerRes.ok) {
        const error = await playerRes.json()
        throw new Error(error.error || 'Erreur lors de la création du joueur')
      }

      const player = await playerRes.json()
      const playerId = player.id

      // 2. Créer la demande (request)
      await fetch(`${API_URL}/api/requests`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId }),
      })

      // 3. Ajouter les qualités
      if (data.qualities && data.qualities.length > 0) {
        await fetch(`${API_URL}/api/qualities/player/${playerId}/bulk`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qualities: data.qualities }),
        })
      }

      // 4. Ajouter les carrières
      if (data.careers && data.careers.length > 0) {
        for (const career of data.careers) {
          if (!career.clubName || !career.season) continue

          // Créer ou récupérer le club
          let clubId: number
          const clubRes = await fetch(`${API_URL}/api/clubs/find-or-create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: career.clubName }),
          })
          const club = await clubRes.json()
          clubId = club.id

          // Créer la carrière
          const careerPayload = {
            playerId,
            clubId,
            season: career.season,
            competition: career.competition,
            category: career.category || null,
            startDate: career.startDate || new Date().toISOString(),
            endDate: career.endDate || null,
            isCaptain: career.isCaptain,
            isChampionWinner: career.isChampionWinner,
            nameOfChampionship: career.nameOfChampionship || null,
            isInternationalPlayer: career.isInternationalPlayer,
            internationalTeamName: career.internationalTeamName || null,
            aboutInternationalSelection: career.aboutInternationalSelection || null,
            stats: career.stats,
          }

          await fetch(`${API_URL}/api/careers`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(careerPayload),
          })
        }
      }

      // 5. Ajouter les formations
      if (data.formations && data.formations.length > 0) {
        for (const formation of data.formations) {
          if (!formation.institution || !formation.diploma) continue

          await fetch(`${API_URL}/api/formations`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              playerId,
              institution: formation.institution,
              diploma: formation.diploma,
              startYear: formation.startYear,
              endYear: formation.endYear,
            }),
          })
        }
      }

      // Succès !
      setStep(8)

    } catch (error) {
      console.error('Erreur soumission:', error)
      setSubmitError(error instanceof Error ? error.message : 'Une erreur est survenue')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (formData: LinksData) => {
    updateData(formData)
    await submitToAPI()
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Link2 className="w-6 h-6 text-[#f59e0b]" />
          Liens & Médias
        </h2>
        <p className="text-sm text-gray-400">Partagez vos highlights et statistiques (optionnel).</p>
      </div>

      {/* Lien vidéo */}
      <InputGroup 
        label={
          <span className="flex items-center gap-2">
            <Video className="w-4 h-4 text-red-500" />
            Lien Vidéo (Highlights)
          </span>
        }
        error={form.formState.errors.linkVideo?.message}
      >
        <input
          type="url"
          {...form.register('linkVideo')}
          className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          placeholder="https://youtube.com/watch?v=..."
        />
        <p className="text-xs text-gray-500 mt-1">
          YouTube, Vimeo, ou autre plateforme vidéo
        </p>
      </InputGroup>

      {/* Lien stats */}
      <InputGroup 
        label={
          <span className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            Lien Statistiques
          </span>
        }
        error={form.formState.errors.linkStats?.message}
      >
        <input
          type="url"
          {...form.register('linkStats')}
          className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
          placeholder="https://www.transfermarkt.com/..."
        />
        <p className="text-xs text-gray-500 mt-1">
          Transfermarkt, FBRef, ou autre site de stats
        </p>
      </InputGroup>

      {/* Récapitulatif */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-xl space-y-4">
        <h3 className="text-lg font-bold text-white">Récapitulatif</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Nom complet:</span>
            <p className="text-white font-medium">{data.firstName} {data.lastName}</p>
          </div>
          <div>
            <span className="text-gray-400">Poste:</span>
            <p className="text-white font-medium">{data.primaryPost}</p>
          </div>
          <div>
            <span className="text-gray-400">Nationalité:</span>
            <p className="text-white font-medium">{data.nationality}</p>
          </div>
          <div>
            <span className="text-gray-400">Taille:</span>
            <p className="text-white font-medium">{data.size} cm</p>
          </div>
          <div>
            <span className="text-gray-400">Qualités:</span>
            <p className="text-white font-medium">{data.qualities?.length || 0} sélectionnées</p>
          </div>
          <div>
            <span className="text-gray-400">Saisons:</span>
            <p className="text-white font-medium">{data.careers?.length || 0} ajoutées</p>
          </div>
        </div>
      </div>

      {/* Erreur */}
      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-400">
          ⚠️ {submitError}
        </div>
      )}

      {/* Navigation */}
      <div className="pt-6 flex justify-between items-center border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(6)}
          disabled={isSubmitting}
          className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] hover:from-[#d97706] hover:to-[#b45309] text-black font-bold py-3 px-8 rounded-xl flex items-center gap-2 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 shadow-lg shadow-orange-900/30"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Soumettre mon CV
            </>
          )}
        </button>
      </div>
    </form>
  )
}