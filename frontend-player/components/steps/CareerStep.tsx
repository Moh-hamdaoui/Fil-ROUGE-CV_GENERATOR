'use client'

import { useForm, useFieldArray } from 'react-hook-form'
import { usePlayerStore, CareerData } from '@/store/usePlayerStore'
import { DIVISIONS, CATEGORIES, SEASONS, NATIONAL_TEAMS, INTERNATIONAL_CATEGORIES } from '@/lib/constants'
import { ArrowRight, ArrowLeft, Briefcase, Plus, Trash2, Trophy, Star, Crown, Medal, Globe, ArrowUp } from 'lucide-react'

interface CareerFormData {
  careers: (CareerData & { customCompetition?: string })[]
}

const BADGES = [
  { key: 'isCaptain', label: 'Capitaine', icon: Crown },
  { key: 'isChampionWinner', label: 'Champion', icon: Trophy },
  { key: 'isUpgraded', label: 'Surclassé', icon: ArrowUp }, 
] as const

export function CareerStep() {
  const { data, updateData, setStep } = usePlayerStore()
  const isGoalkeeper = data.primaryPost === 'GB'

  const form = useForm<CareerFormData>({
    defaultValues: {
      careers: data.careers && data.careers.length > 0
        ? data.careers.map(career => ({
            ...career,
            // Si la compétition n'est pas dans DIVISIONS, c'est une compétition personnalisée
            customCompetition: career.competition && !DIVISIONS.includes(career.competition) 
              ? career.competition 
              : ''
          }))
        : [{
            clubId: '',
            clubName: '',
            season: '',
            competition: '',
            customCompetition: '',
            category: '',
            startDate: '',
            endDate: '',
            isCaptain: false,
            isChampionWinner: false,
            nameOfChampionship: '',
            isUpgraded: false, 
            isInternationalPlayer: false,
            internationalCategory: '',
            internationalTeamName: '',
            aboutInternationalSelection: '',
            isChangedClub: false,
            aboutClubChanging: '',
            stats: {
              matches: null,
              goals: null,
              assists: null,
              cleanSheet: null,
              averagePlayingTime: null,
            }
          }]
    },
    mode: 'onBlur'
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'careers'
  })

  const onSubmit = (formData: CareerFormData) => {
    // Traiter les compétitions personnalisées
    const processedCareers = formData.careers.map(career => {
      const { customCompetition, ...rest } = career
      return {
        ...rest,
        // Si "Autre" est sélectionné, utiliser la valeur personnalisée
        competition: career.competition === 'Autre' ? customCompetition || 'Autre' : career.competition
      }
    })

    const validCareers = processedCareers.filter(c => c.clubName && c.season)
    if (validCareers.length === 0) {
      alert('Veuillez ajouter au moins une saison')
      return
    }
    updateData({ careers: processedCareers })
    setStep(6)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 animate-fade-in pb-10">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-[#f59e0b]" />
            Votre Parcours
          </h2>
          <p className="text-sm text-gray-400">Ajoutez vos dernières saisons (max 5).</p>
        </div>
        
        {fields.length < 5 && (
          <button
            type="button"
            onClick={() => append({
              clubId: '',
              clubName: '',
              season: '',
              competition: '',
              customCompetition: '',
              category: '',
              startDate: '',
              endDate: '',
              isCaptain: false,
              isChampionWinner: false,
              nameOfChampionship: '',
              isUpgraded: false,
              isInternationalPlayer: false,
              internationalTeamName: '',
              internationalCategory: '',
              aboutInternationalSelection: '',
              isChangedClub: false,
              aboutClubChanging: '',
              stats: {
                matches: null,
                goals: null,
                assists: null,
                cleanSheet: null,
                averagePlayingTime: null,
              }
            })}
            className="flex items-center gap-2 px-4 py-2 bg-[#f59e0b]/10 border border-[#f59e0b]/30 text-[#f59e0b] rounded-full hover:bg-[#f59e0b]/20 transition-all text-sm font-bold"
          >
            <Plus className="w-4 h-4" />
            Ajouter
          </button>
        )}
      </div>

      {/* Liste des saisons */}
      <div className="space-y-6">
        {fields.map((field, index) => {
          // Watch la valeur de competition pour ce career
          const selectedCompetition = form.watch(`careers.${index}.competition`)
          const isOtherSelected = selectedCompetition === 'Autre'

          return (
            <div 
              key={field.id} 
              className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#f59e0b]/30 transition-all"
            >
              {/* Numéro de saison */}
              <div className="absolute top-4 right-4 text-[#f59e0b]/20 font-black text-5xl select-none">
                {index + 1}
              </div>

              <div className="relative z-10 space-y-6">
                {/* Saison & Club */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                      Saison <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...form.register(`careers.${index}.season`)}
                      className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    >
                      <option value="">Choisir...</option>
                      {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                      Club <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...form.register(`careers.${index}.clubName`)}
                      placeholder="Nom du club"
                      className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Catégorie & Division */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                      Catégorie
                    </label>
                    <select {...form.register(`careers.${index}.category`)} className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none">
                      <option value="">Choisir...</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                      Compétition <span className="text-red-500">*</span>
                    </label>
                    <select 
                      {...form.register(`careers.${index}.competition`)} 
                      className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    >
                      <option value="">Choisir...</option>
                      {DIVISIONS.map(d => <option key={d} value={d}>{d}</option>)}
                      <option value="Autre">Autre (préciser)</option>
                    </select>
                  </div>
                </div>

                {/* Champ personnalisé pour "Autre" compétition */}
                {isOtherSelected && (
                  <div className="space-y-1 animate-fade-in">
                    <label className="text-xs font-bold text-[#f59e0b] uppercase tracking-wider">
                      Précisez la compétition <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...form.register(`careers.${index}.customCompetition`)}
                      placeholder="Ex: Liga Portugal U19, Eredivisie U21, Premier League 2..."
                      className="w-full bg-[#0a0a0a] border border-[#f59e0b]/50 rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Indiquez le nom exact de la compétition dans laquelle vous évoluez
                    </p>
                  </div>
                )}

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                      Date début
                    </label>
                    <input
                      type="date"
                      {...form.register(`careers.${index}.startDate`)}
                      className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                      Date fin
                    </label>
                    <input
                      type="date"
                      {...form.register(`careers.${index}.endDate`)}
                      className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Badges / Distinctions */}
                <div className="space-y-3">
                  <label className="text-xs font-bold text-white/50 uppercase tracking-wider">
                    Distinctions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BADGES.map(badge => {
                      const Icon = badge.icon
                      const fieldName = `careers.${index}.${badge.key}` as const
                      const isChecked = form.watch(fieldName as any)
                      
                      // Couleur spéciale pour "Surclassé"
                      const isUpgradedBadge = badge.key === 'isUpgraded'
                      const activeColor = isUpgradedBadge 
                        ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6]'
                        : 'bg-[#f59e0b]/20 border-[#f59e0b] text-[#f59e0b]'
                      
                      return (
                        <label
                          key={badge.key}
                          className={`
                            cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border transition-all select-none
                            ${isChecked
                              ? activeColor
                              : 'bg-white/5 border-white/10 text-white/50 hover:border-white/20'
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            {...form.register(fieldName as any)}
                            className="hidden"
                          />
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-bold">{badge.label}</span>
                        </label>
                      )
                    })}
                  </div>

                  {/* Nom du championnat si champion */}
                  {form.watch(`careers.${index}.isChampionWinner`) && (
                    <input
                      {...form.register(`careers.${index}.nameOfChampionship`)}
                      placeholder="Nom du championnat remporté"
                      className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none mt-2"
                    />
                  )}
                </div>

                {/* Transfert en cours de saison */}
                <div className="space-y-3 p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register(`careers.${index}.isChangedClub`)}
                      className="w-5 h-5 rounded"
                    />
                    <ArrowRight className="w-5 h-5 text-orange-400" />
                    <span className="text-sm font-medium text-white">Transfert en cours de saison</span>
                    <span className="text-xs text-gray-500">(mercato hivernal, prêt...)</span>
                  </label>

                  {form.watch(`careers.${index}.isChangedClub`) && (
                    <div className="space-y-1 mt-4">
                      <label className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                        Précisions sur le transfert
                      </label>
                      <input
                        {...form.register(`careers.${index}.aboutClubChanging`)}
                        placeholder="Ex: Prêt de 6 mois depuis le PSG, Transfert mercato hivernal..."
                        className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-orange-500 focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Joueur international */}
                <div className="space-y-3 p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...form.register(`careers.${index}.isInternationalPlayer`)}
                      className="w-5 h-5 rounded"
                    />
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span className="text-sm font-medium text-white">Joueur international</span>
                  </label>

                  {form.watch(`careers.${index}.isInternationalPlayer`) && (
                    <div className="space-y-4 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Sélection du pays */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                            Équipe nationale
                          </label>
                          <select
                            {...form.register(`careers.${index}.internationalTeamName`)}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                          >
                            <option value="">Sélectionner un pays...</option>
                            {Object.entries(NATIONAL_TEAMS).map(([confederation, teams]) => (
                              <optgroup key={confederation} label={confederation}>
                                {teams.map(team => (
                                  <option key={team} value={team}>{team}</option>
                                ))}
                              </optgroup>
                            ))}
                          </select>
                        </div>

                        {/* Catégorie (U17, U19, A, etc.) */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                            Catégorie
                          </label>
                          <select
                            {...form.register(`careers.${index}.internationalCategory`)}
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                          >
                            <option value="">Sélectionner...</option>
                            {INTERNATIONAL_CATEGORIES.map(cat => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Détails supplémentaires */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                          Détails (optionnel)
                        </label>
                        <input
                          {...form.register(`careers.${index}.aboutInternationalSelection`)}
                          placeholder="Ex: 5 sélections, participation Euro U19..."
                          className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-purple-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Statistiques */}
                <div className="bg-black/30 rounded-xl p-4 border border-white/5 space-y-4">
                  <p className="text-xs font-bold text-white/40 uppercase">
                    Statistiques {isGoalkeeper ? '— Gardien' : '— Joueur de champ'}
                  </p>

                  <div className={`grid gap-3 ${isGoalkeeper ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-4'}`}>
                    <div>
                      <input
                        type="number"
                        {...form.register(`careers.${index}.stats.matches`, { valueAsNumber: true })}
                        placeholder="Matchs"
                        className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none text-center"
                      />
                      <span className="text-[10px] text-white/30 block text-center mt-1">Matchs</span>
                    </div>

                    {isGoalkeeper ? (
                      <div>
                        <input
                          type="number"
                          {...form.register(`careers.${index}.stats.cleanSheet`, { valueAsNumber: true })}
                          placeholder="CS"
                          className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none text-center"
                        />
                        <span className="text-[10px] text-white/30 block text-center mt-1">Clean sheets</span>
                      </div>
                    ) : (
                      <>
                        <div>
                          <input
                            type="number"
                            {...form.register(`careers.${index}.stats.goals`, { valueAsNumber: true })}
                            placeholder="Buts"
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none text-center"
                          />
                          <span className="text-[10px] text-white/30 block text-center mt-1">Buts</span>
                        </div>
                        <div>
                          <input
                            type="number"
                            {...form.register(`careers.${index}.stats.assists`, { valueAsNumber: true })}
                            placeholder="PD"
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none text-center"
                          />
                          <span className="text-[10px] text-white/30 block text-center mt-1">Passes D.</span>
                        </div>
                        <div>
                          <input
                            type="number"
                            {...form.register(`careers.${index}.stats.averagePlayingTime`, { valueAsNumber: true })}
                            placeholder="Min/M"
                            className="w-full bg-[#0a0a0a] border border-[#404040] rounded-lg px-4 py-3 text-white focus:border-[#f59e0b] focus:outline-none text-center"
                          />
                          <span className="text-[10px] text-white/30 block text-center mt-1">Temps moy.</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Bouton supprimer */}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="w-full flex items-center justify-center gap-2 text-red-500/50 hover:text-red-500 text-sm py-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Supprimer cette saison
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Navigation */}
      <div className="pt-6 flex justify-between items-center border-t border-white/10">
        <button
          type="button"
          onClick={() => setStep(4)}
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