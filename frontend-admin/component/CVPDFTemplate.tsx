import React from 'react'
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000000',
    padding: 0,
  },
  container: {
    flexDirection: 'row',
    height: '100%',
  },
  leftColumn: {
    width: '30%',
    backgroundColor: '#1a1a1a',
    padding: 20,
  },
  rightColumn: {
    width: '70%',
    backgroundColor: '#000000',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  position: {
    fontSize: 14,
    color: '#3b82f6',
    marginBottom: 10,
  },
  flag: {
    fontSize: 30,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginTop: 15,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
    paddingBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  icon: {
    fontSize: 12,
    marginRight: 8,
    color: '#3b82f6',
  },
  infoText: {
    fontSize: 11,
    color: '#e5e7eb',
  },
  qualityItem: {
    marginBottom: 8,
  },
  qualityName: {
    fontSize: 10,
    color: '#e5e7eb',
    marginBottom: 3,
  },
  qualityBar: {
    height: 6,
    backgroundColor: '#374151',
    borderRadius: 3,
    overflow: 'hidden',
  },
  qualityFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  careerItem: {
    marginBottom: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    paddingLeft: 15,
  },
  careerSeason: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 3,
  },
  careerClub: {
    fontSize: 12,
    color: '#3b82f6',
    marginBottom: 2,
  },
  careerCompetition: {
    fontSize: 10,
    color: '#9ca3af',
    marginBottom: 5,
  },
  stats: {
    flexDirection: 'row',
    gap: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fbbf24',
  },
  statLabel: {
    fontSize: 8,
    color: '#9ca3af',
  },
  contactSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0f172a',
    borderRadius: 8,
  },
  contactText: {
    fontSize: 9,
    color: '#e5e7eb',
    marginBottom: 5,
  },
})

interface CVPDFTemplateProps {
  player: any
  careers: any[]
  qualities: any[]
}

export const CVPDFTemplate: React.FC<CVPDFTemplateProps> = ({ player, careers, qualities }) => {
  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  const groupQualitiesByCategory = () => {
    const grouped: any = {}
    qualities.forEach(q => {
      if (!grouped[q.category]) grouped[q.category] = []
      grouped[q.category].push(q)
    })
    return grouped
  }

  const qualitiesByCategory = groupQualitiesByCategory()

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <View style={styles.leftColumn}>
            <View style={styles.header}>
              <Text style={styles.name}>
                {player.firstName.toUpperCase()} {player.lastName.toUpperCase()}
              </Text>
              <Text style={styles.position}>
                {player.primaryPost} / {player.secondaryPost}
              </Text>
              <Text style={styles.flag}>🇫🇷 🇲🇦</Text>
            </View>

            <Text style={styles.sectionTitle}>PROFIL</Text>
            <View style={styles.infoRow}>
              <Text style={styles.icon}>📅</Text>
              <Text style={styles.infoText}>
                Né le {new Date(player.dateOfBirth).toLocaleDateString('fr-FR')}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.icon}>⚖️</Text>
              <Text style={styles.infoText}>Pied fort - {player.strongFoot}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.icon}>📏</Text>
              <Text style={styles.infoText}>Taille - {player.size} cm</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.icon}>⚖️</Text>
              <Text style={styles.infoText}>Poids - {player.weight || 77} kg</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.icon}>⚡</Text>
              <Text style={styles.infoText}>VMA - {player.vma || 20} km/h</Text>
            </View>

            <Text style={styles.sectionTitle}>QUALITÉS</Text>
            {Object.entries(qualitiesByCategory).map(([category, quals]: [string, any]) => (
              <View key={category}>
                <Text style={{ ...styles.infoText, fontWeight: 'bold', marginTop: 10, marginBottom: 5 }}>
                  {category}
                </Text>
                {quals.slice(0, 4).map((q: any, idx: number) => (
                  <View key={idx} style={styles.qualityItem}>
                    <Text style={styles.qualityName}>{q.quality}</Text>
                    <View style={styles.qualityBar}>
                      <View style={{ ...styles.qualityFill, width: `${(q.rating / 10) * 100}%` }} />
                    </View>
                  </View>
                ))}
              </View>
            ))}

            <View style={styles.contactSection}>
              <Text style={styles.sectionTitle}>CONTACT</Text>
              <Text style={styles.contactText}>📧 {player.email}</Text>
              <Text style={styles.contactText}>📱 {player.telephone}</Text>
            </View>
          </View>

          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>CARRIÈRE & STATISTIQUES</Text>
            
            {careers.map((career, idx) => (
              <View key={idx} style={styles.careerItem}>
                <Text style={styles.careerSeason}>{career.season} ▸ {career.club.name.toUpperCase()}</Text>
                <Text style={styles.careerCompetition}>{career.competition}</Text>
                
                {career.stats && career.stats.length > 0 && (
                  <View style={styles.stats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{career.stats[0].goals}</Text>
                      <Text style={styles.statLabel}>buts</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>{career.stats[0].matches}</Text>
                      <Text style={styles.statLabel}>matchs</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>
                        {career.stats[0].matches > 0 
                          ? Math.round((career.stats[0].goals / career.stats[0].matches) * 90) 
                          : 90}
                      </Text>
                      <Text style={styles.statLabel}>Temps de jeu moyen</Text>
                    </View>
                  </View>
                )}

                {career.competition.includes('U19') && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ fontSize: 9, color: '#6b7280' }}>
                      • Saison en cours
                    </Text>
                    <Text style={{ fontSize: 9, color: '#6b7280' }}>
                      • Entraînements avec le groupe Ligue 2
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}