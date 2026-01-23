import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Rect, Path, Circle, G, Line, Ellipse, Link } from '@react-pdf/renderer'

// ==================== STYLES ====================
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
    padding: 0,
    size: 'A4',
  },
  header: {
    backgroundColor: '#1E3A5F',
    padding: 15,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#DC2626',
  },
  headerFlag: { marginRight: 10 },
  headerNameContainer: { flex: 1 },
  headerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  headerPosition: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginTop: 2,
  },
  headerPositionSecondary: {
    fontSize: 10,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  contentContainer: { flexDirection: 'row', flex: 1 },
  leftColumn: { width: '35%', backgroundColor: '#1E3A5F', padding: 15 },
  rightColumn: { width: '65%', backgroundColor: '#FFFFFF', padding: 15 },
  photoSection: { alignItems: 'center', marginBottom: 12 },
  photoContainer: {
    width: 110,
    height: 130,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    backgroundColor: '#333',
  },
  photoImage: { width: '100%', height: '100%', objectFit: 'cover' },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    letterSpacing: 1,
  },
  sectionTitleIcon: { marginRight: 6 },
  sectionTitleRight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textTransform: 'uppercase',
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 3,
    borderBottomColor: '#DC2626',
    letterSpacing: 1,
  },
  // Badge international amélioré
  internationalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  internationalText: {
    fontSize: 8,
    color: '#FFFFFF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  profileSection: { marginBottom: 12 },
  profileItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
  profileIcon: { width: 18, marginRight: 6 },
  profileLabel: { fontSize: 8, color: '#FFFFFF', fontWeight: 'bold' },
  profileValue: { fontSize: 8, color: '#FFFFFF' },
  // Section liens - AMÉLIORÉE AVEC LIENS CLIQUABLES
  linksSection: { marginBottom: 12 },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  linkItemClickable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: 5,
  },
  linkText: { fontSize: 7, color: '#FFFFFF', marginLeft: 5 },
  linkTextClickable: { fontSize: 7, color: '#1E3A5F', marginLeft: 5, textDecoration: 'underline' },
  // Qualités améliorées
  qualitiesSection: { marginBottom: 12 },
  qualityItem: { fontSize: 8, color: '#FFFFFF', marginBottom: 3, paddingLeft: 8 },
  // Section Formation - NOUVELLE
  formationSection: { marginBottom: 12 },
  formationItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 4,
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 3,
  },
  formationYear: { fontSize: 7, color: '#FFFFFF', fontWeight: 'bold', width: 35 },
  formationText: { fontSize: 7, color: '#FFFFFF', flex: 1 },
  formationDiploma: { 
    fontSize: 6, 
    color: '#FCD34D', 
    backgroundColor: 'rgba(252,211,77,0.2)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  // Contact plus haut
  contactSection: { marginBottom: 12 },
  contactItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  contactIcon: { marginRight: 6 },
  contactText: { fontSize: 7, color: '#FFFFFF' },
  // Career
  careerItem: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  careerItemLast: { marginBottom: 8, borderBottomWidth: 0 },
  careerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  careerInfo: { flex: 1 },
  careerPeriod: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  careerYear: { fontSize: 13, fontWeight: 'bold', color: '#1E3A5F' },
  careerArrow: {
    fontSize: 11,
    color: '#DC2626',
    marginHorizontal: 4,
    fontWeight: 'bold',
  },
  careerArrowContainer: {
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  careerClub: { fontSize: 11, fontWeight: 'bold', color: '#1E3A5F', marginLeft: 4 },
  careerCompetition: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 3,
    marginBottom: 5,
  },
  careerCompetitionText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#DC2626',
    marginRight: 5,
  },
  careerLogo: { width: 40, height: 40, objectFit: 'contain' },
  careerLogoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  // Badges de compétition/ligue - NOUVEAU STYLE
  competitionBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginLeft: 4,
  },
  competitionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 3,
    marginRight: 3,
  },
  competitionBadgeN3: {
    backgroundColor: '#1E3A5F',
  },
  competitionBadgeU19: {
    backgroundColor: '#059669',
  },
  competitionBadgeU17: {
    backgroundColor: '#7C3AED',
  },
  competitionBadgeR1: {
    backgroundColor: '#DC2626',
  },
  competitionBadgeDefault: {
    backgroundColor: '#6B7280',
  },
  competitionBadgeText: {
    fontSize: 6,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  competitionLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  competitionLogo: {
    width: 14,
    height: 14,
    objectFit: 'contain',
  },
  // Badges améliorés style image
  badgeContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginBottom: 5,
    gap: 3,
  },
  // Badge style Gold (Champion, Capitaine)
  badgeGoldStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCD34D',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  badgeGoldText: {
    fontSize: 7,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 3,
  },
  // Badge style Purple (International)
  badgePurpleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#7C3AED',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  badgePurpleText: {
    fontSize: 7,
    color: '#7C3AED',
    fontWeight: 'bold',
    marginLeft: 3,
  },
  // Badge style Orange (Transfert mi-saison)
  badgeOrangeStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#F97316',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  badgeOrangeText: {
    fontSize: 7,
    color: '#F97316',
    fontWeight: 'bold',
    marginLeft: 3,
  },
  // Badge catégorie
  badgeBlue: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#2563EB',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontWeight: 'bold',
  },
  badgeGreen: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#059669',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontWeight: 'bold',
  },
  badgeDark: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#1E3A5F',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 3,
    fontWeight: 'bold',
  },
  careerNotes: { marginTop: 3, marginBottom: 4 },
  careerNote: { fontSize: 7, color: '#374151', marginBottom: 2, paddingLeft: 6 },
  statsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 6, gap: 4 },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statValue: { fontSize: 9, fontWeight: 'bold', color: '#1E3A5F', marginRight: 3 },
  statLabel: { fontSize: 7, color: '#6B7280' },
  // Stat spéciale (Meilleur buteur, etc.)
  statSpecial: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 4,
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  statSpecialIcon: { marginRight: 3 },
  statSpecialText: { fontSize: 7, color: '#92400E', fontWeight: 'bold' },
  footballFieldContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 105,
    height: 70,
  },
  // Transfermarkt logo style
  transfermarktContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    padding: 6,
    marginBottom: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  transfermarktText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#00A550',
  },
  transfermarktTextRed: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#DC2626',
  },
  externalLinkIcon: {
    marginLeft: 4,
  },
})

// ==================== DRAPEAUX ====================

const FrenchFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="10" height="20" fill="#002395" />
    <Rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
    <Rect x="20" y="0" width="10" height="20" fill="#ED2939" />
    <Rect x="0" y="0" width="30" height="20" fill="none" stroke="#CCCCCC" strokeWidth="0.5" />
  </Svg>
)

const MoroccanFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="30" height="20" fill="#C1272D" />
    <Path d="M15 4 L16.5 9 L22 9 L17.5 12.5 L19 18 L15 14.5 L11 18 L12.5 12.5 L8 9 L13.5 9 Z" fill="none" stroke="#006233" strokeWidth="1.5" />
  </Svg>
)

const AlgerianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="15" height="20" fill="#006233" />
    <Rect x="15" y="0" width="15" height="20" fill="#FFFFFF" />
    <Circle cx="16" cy="10" r="5" fill="#D21034" />
    <Circle cx="18" cy="10" r="4" fill="#FFFFFF" />
  </Svg>
)

const ItalianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="10" height="20" fill="#009246" />
    <Rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
    <Rect x="20" y="0" width="10" height="20" fill="#CE2B37" />
  </Svg>
)

const SpanishFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="30" height="5" fill="#AA151B" />
    <Rect x="0" y="5" width="30" height="10" fill="#F1BF00" />
    <Rect x="0" y="15" width="30" height="5" fill="#AA151B" />
  </Svg>
)

const GermanFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="30" height="6.67" fill="#000000" />
    <Rect x="0" y="6.67" width="30" height="6.67" fill="#DD0000" />
    <Rect x="0" y="13.33" width="30" height="6.67" fill="#FFCC00" />
  </Svg>
)

const PortugueseFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="12" height="20" fill="#006600" />
    <Rect x="12" y="0" width="18" height="20" fill="#FF0000" />
    <Circle cx="12" cy="10" r="5" fill="#FFCC00" />
  </Svg>
)

const BelgianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="10" height="20" fill="#000000" />
    <Rect x="10" y="0" width="10" height="20" fill="#FAE042" />
    <Rect x="20" y="0" width="10" height="20" fill="#ED2939" />
  </Svg>
)

const SenegaleseFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="10" height="20" fill="#00853F" />
    <Rect x="10" y="0" width="10" height="20" fill="#FDEF42" />
    <Rect x="20" y="0" width="10" height="20" fill="#E31B23" />
  </Svg>
)

const IvorianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="10" height="20" fill="#F77F00" />
    <Rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
    <Rect x="20" y="0" width="10" height="20" fill="#009E60" />
  </Svg>
)

const CameroonianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="10" height="20" fill="#007A5E" />
    <Rect x="10" y="0" width="10" height="20" fill="#CE1126" />
    <Rect x="20" y="0" width="10" height="20" fill="#FCD116" />
  </Svg>
)

const TunisianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="30" height="20" fill="#E70013" />
    <Circle cx="15" cy="10" r="6" fill="#FFFFFF" />
    <Circle cx="16" cy="10" r="5" fill="#E70013" />
  </Svg>
)

const GenericFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 30 20">
    <Rect x="0" y="0" width="30" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="1" />
  </Svg>
)

// ==================== ICÔNES ====================

const UserIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="4" fill="#FFFFFF" />
    <Path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" fill="#FFFFFF" />
  </Svg>
)

const CalendarIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Rect x="3" y="4" width="18" height="18" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Line x1="3" y1="10" x2="21" y2="10" stroke="#FFFFFF" strokeWidth="2" />
    <Line x1="8" y1="2" x2="8" y2="6" stroke="#FFFFFF" strokeWidth="2" />
    <Line x1="16" y1="2" x2="16" y2="6" stroke="#FFFFFF" strokeWidth="2" />
  </Svg>
)

const FootIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Ellipse cx="10" cy="14" rx="6" ry="8" fill="#FFFFFF" />
    <Circle cx="16" cy="8" r="3" fill="#FFFFFF" />
  </Svg>
)

const RulerIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Rect x="4" y="2" width="6" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Line x1="4" y1="6" x2="7" y2="6" stroke="#FFFFFF" strokeWidth="1" />
    <Line x1="4" y1="10" x2="7" y2="10" stroke="#FFFFFF" strokeWidth="1" />
    <Line x1="4" y1="14" x2="7" y2="14" stroke="#FFFFFF" strokeWidth="1" />
    <Line x1="4" y1="18" x2="7" y2="18" stroke="#FFFFFF" strokeWidth="1" />
  </Svg>
)

const WeightIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Circle cx="12" cy="6" r="3" fill="#FFFFFF" />
    <Path d="M8 22 L10 10 L14 10 L16 22 Z" fill="#FFFFFF" />
  </Svg>
)

const SpeedIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M12 2 A10 10 0 0 1 22 12" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Path d="M12 2 A10 10 0 0 0 2 12" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Line x1="12" y1="12" x2="18" y2="6" stroke="#FFFFFF" strokeWidth="2" />
    <Circle cx="12" cy="12" r="2" fill="#FFFFFF" />
  </Svg>
)

const CheckIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path d="M5 12 L10 17 L20 7" fill="none" stroke="#FFFFFF" strokeWidth="3" />
  </Svg>
)

const EmailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Path d="M2 6 L12 13 L22 6" fill="none" stroke="#FFFFFF" strokeWidth="2" />
  </Svg>
)

const PhoneIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M5 4h4l2 5-2.5 1.5c1 2 2.5 3.5 4.5 4.5L15 13l5 2v4c0 1-1 2-2 2C9 21 3 15 3 6c0-1 1-2 2-2" fill="#FFFFFF" />
  </Svg>
)

const LinkIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" fill="none" stroke="#FFFFFF" strokeWidth="2" />
  </Svg>
)

const VideoIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Rect x="2" y="4" width="15" height="16" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    <Path d="M17 8l5-3v14l-5-3V8z" fill="#FFFFFF" />
  </Svg>
)

// Icône lien externe
const ExternalLinkIcon = ({ color = "#1E3A5F" }: { color?: string }) => (
  <Svg width="8" height="8" viewBox="0 0 24 24">
    <Path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" fill="none" stroke={color} strokeWidth="2" />
    <Path d="M15 3h6v6" fill="none" stroke={color} strokeWidth="2" />
    <Line x1="10" y1="14" x2="21" y2="3" stroke={color} strokeWidth="2" />
  </Svg>
)

// Icône Formation/Graduation
const GraduationIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path d="M12 3L1 9l11 6l9-4.91V17h2V9L12 3z" fill="#FFFFFF" />
    <Path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill="#FFFFFF" />
  </Svg>
)

// Icône Stats
const ChartIcon = ({ color = "#FFFFFF" }: { color?: string }) => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Rect x="3" y="12" width="4" height="9" fill={color} />
    <Rect x="10" y="6" width="4" height="15" fill={color} />
    <Rect x="17" y="2" width="4" height="19" fill={color} />
  </Svg>
)

// Icône Meilleur buteur (trophée doré)
const TopScorerIcon = ({ size = 10 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="8" r="6" fill="#FCD34D" />
    <Path d="M8 14h8l-1 6H9l-1-6z" fill="#FCD34D" />
    <Circle cx="12" cy="8" r="3" fill="#F59E0B" />
  </Svg>
)

// Icônes pour badges
const TrophyIcon = ({ size = 10, color = "#000000" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M5 4v4c0 3 3 5 7 5s7-2 7-5V4H5z" fill={color} />
    <Path d="M3 4v4c0 1 1 2 2 2V8V4H3z" fill={color} />
    <Path d="M21 4v4c0 1-1 2-2 2V8V4h2z" fill={color} />
    <Rect x="10" y="13" width="4" height="4" fill={color} />
    <Rect x="8" y="17" width="8" height="3" fill={color} />
  </Svg>
)

const CrownIcon = ({ size = 10, color = "#000000" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M2 18L4 8l4 4 4-8 4 8 4-4 2 10H2z" fill={color} />
  </Svg>
)

const ArrowUpIcon = ({ size = 10 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M12 4L5 12h4v8h6v-8h4L12 4z" fill="#3B82F6" />
  </Svg>
)

const GlobeIcon = ({ size = 10, color = "#7C3AED" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Circle cx="12" cy="12" r="10" fill="none" stroke={color} strokeWidth="2" />
    <Ellipse cx="12" cy="12" rx="4" ry="10" fill="none" stroke={color} strokeWidth="1" />
    <Line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1" />
  </Svg>
)

// Icône Transfert (flèches qui tournent)
const TransferIcon = ({ size = 10, color = "#F97316" }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M7 16V4M7 4L3 8M7 4L11 8" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M17 8V20M17 20L21 16M17 20L13 16" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
)

// ==================== TERRAIN DE FOOTBALL ====================

interface PositionCoord {
  x: number
  y: number
}

const getFormationPositions = (formation: string): Record<string, PositionCoord> => {
  const base = { GB: { x: 8, y: 50 } }

  if (formation?.includes('4') && (formation?.includes('3') || formation?.includes('4'))) {
    return {
      ...base,
      DG: { x: 25, y: 85 },
      DC: { x: 25, y: 60 },
      DC2: { x: 25, y: 40 },
      DD: { x: 25, y: 15 },
      MDC: { x: 45, y: 50 },
      MC: { x: 50, y: 35 },
      MC2: { x: 50, y: 65 },
      MG: { x: 50, y: 85 },
      MD: { x: 50, y: 15 },
      MOC: { x: 65, y: 50 },
      AG: { x: 75, y: 85 },
      BU: { x: 85, y: 50 },
      AD: { x: 75, y: 15 },
      ATT: { x: 85, y: 50 },
    }
  } else if (formation?.includes('3') || formation?.includes('5')) {
    return {
      ...base,
      DC: { x: 22, y: 50 },
      DC_G: { x: 22, y: 70 },
      DC_D: { x: 22, y: 30 },
      DG: { x: 38, y: 90 },
      DD: { x: 38, y: 10 },
      'Piston G': { x: 40, y: 90 },
      'Piston D': { x: 40, y: 10 },
      MDC: { x: 45, y: 50 },
      MC: { x: 55, y: 35 },
      MC2: { x: 55, y: 65 },
      MOC: { x: 65, y: 50 },
      BU: { x: 82, y: 35 },
      BU2: { x: 82, y: 65 },
      ATT: { x: 82, y: 50 },
      AG: { x: 70, y: 85 },
      AD: { x: 70, y: 15 },
    }
  }

  return {
    ...base,
    DG: { x: 25, y: 85 },
    DC: { x: 25, y: 60 },
    DC2: { x: 25, y: 40 },
    DD: { x: 25, y: 15 },
    MG: { x: 50, y: 85 },
    MC: { x: 50, y: 35 },
    MC2: { x: 50, y: 65 },
    MD: { x: 50, y: 15 },
    MDC: { x: 42, y: 50 },
    MOC: { x: 60, y: 50 },
    BU: { x: 80, y: 35 },
    BU2: { x: 80, y: 65 },
    ATT: { x: 80, y: 50 },
    AG: { x: 70, y: 85 },
    AD: { x: 70, y: 15 },
  }
}

const FootballField = ({
  primaryPost,
  secondaryPost,
  formation = '4-3-3',
}: {
  primaryPost?: string
  secondaryPost?: string
  formation?: string
}) => {
  const positions = getFormationPositions(formation)

  return (
    <Svg width="105" height="70" viewBox="0 0 110 75">
      <Rect x="0" y="0" width="110" height="75" fill="#22C55E" rx="5" />
      <Rect x="4" y="4" width="102" height="67" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      <Line x1="55" y1="4" x2="55" y2="71" stroke="#FFFFFF" strokeWidth="1" />
      <Circle cx="55" cy="37.5" r="10" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      <Circle cx="55" cy="37.5" r="2" fill="#FFFFFF" />
      <Rect x="4" y="20" width="15" height="35" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      <Rect x="4" y="28" width="6" height="19" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      <Rect x="91" y="20" width="15" height="35" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      <Rect x="100" y="28" width="6" height="19" fill="none" stroke="#FFFFFF" strokeWidth="1" />

      {Object.entries(positions).map(([poste, coord]) => {
        const isPrimary = primaryPost && poste.toUpperCase() === primaryPost.toUpperCase()
        const isSecondary = secondaryPost && poste.toUpperCase() === secondaryPost.toUpperCase()
        const px = (coord.x / 100) * 110
        const py = (coord.y / 100) * 75

        if (isPrimary) {
          return (
            <G key={poste}>
              <Circle cx={px} cy={py} r="6" fill="#1E3A5F" />
              <Circle cx={px} cy={py} r="6" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            </G>
          )
        } else if (isSecondary) {
          return (
            <G key={poste}>
              <Circle cx={px} cy={py} r="5" fill="#DC2626" />
              <Circle cx={px} cy={py} r="5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
            </G>
          )
        } else {
          return <Circle key={poste} cx={px} cy={py} r="3" fill="#FFFFFF" opacity="0.7" />
        }
      })}
    </Svg>
  )
}

// ==================== HELPER FUNCTIONS ====================

// Fonction pour obtenir le style du badge de compétition
const getCompetitionBadgeStyle = (competition: string) => {
  const lower = competition?.toLowerCase() || ''
  if (lower.includes('n3') || lower.includes('national 3')) return styles.competitionBadgeN3
  if (lower.includes('u19') || lower.includes('u-19')) return styles.competitionBadgeU19
  if (lower.includes('u17') || lower.includes('u-17')) return styles.competitionBadgeU17
  if (lower.includes('u16') || lower.includes('u-16')) return styles.competitionBadgeU17
  if (lower.includes('u15') || lower.includes('u-15')) return styles.competitionBadgeU17
  if (lower.includes('r1') || lower.includes('regional 1') || lower.includes('régional 1')) return styles.competitionBadgeR1
  if (lower.includes('r2') || lower.includes('regional 2')) return styles.competitionBadgeR1
  return styles.competitionBadgeDefault
}

// Fonction pour extraire les badges de compétition d'une chaîne
const extractCompetitionBadges = (competition: string): string[] => {
  const badges: string[] = []
  const lower = competition?.toLowerCase() || ''
  
  // Extraire N3, N2, N1, etc.
  const nationalMatch = lower.match(/n[1-3]/g)
  if (nationalMatch) badges.push(...nationalMatch.map(m => m.toUpperCase()))
  
  // Extraire U19, U17, U16, U15
  const ageMatch = lower.match(/u\d{2}/gi)
  if (ageMatch) badges.push(...ageMatch.map(m => m.toUpperCase()))
  
  // Extraire R1, R2
  const regionalMatch = lower.match(/r[1-3]/gi)
  if (regionalMatch) badges.push(...regionalMatch.map(m => m.toUpperCase()))
  
  return [...new Set(badges)] // Retirer les doublons
}

// ==================== COMPOSANT PRINCIPAL ====================

interface Formation {
  year: string
  title: string
  institution?: string
  diploma?: string
}

interface CVPDFTemplateProps {
  player: any
  careers: any[]
  qualities: any[]
  formations?: Formation[]
}

const getNationalityFlag = (nationality: string, width = 32, height = 22) => {
  const lower = nationality?.toLowerCase() || ''
  if (lower.includes('france') || lower.includes('francais') || lower.includes('française')) return <FrenchFlag width={width} height={height} />
  if (lower.includes('maroc') || lower.includes('marocain')) return <MoroccanFlag width={width} height={height} />
  if (lower.includes('algerie') || lower.includes('algerien') || lower.includes('algérie') || lower.includes('algerienne')) return <AlgerianFlag width={width} height={height} />
  if (lower.includes('italie') || lower.includes('italien')) return <ItalianFlag width={width} height={height} />
  if (lower.includes('espagne') || lower.includes('espagnol')) return <SpanishFlag width={width} height={height} />
  if (lower.includes('allemagne') || lower.includes('allemand')) return <GermanFlag width={width} height={height} />
  if (lower.includes('portugal') || lower.includes('portugais')) return <PortugueseFlag width={width} height={height} />
  if (lower.includes('belgique') || lower.includes('belge')) return <BelgianFlag width={width} height={height} />
  if (lower.includes('senegal') || lower.includes('sénégal') || lower.includes('senegalais')) return <SenegaleseFlag width={width} height={height} />
  if (lower.includes('cote') || lower.includes('ivoire') || lower.includes('ivoirien')) return <IvorianFlag width={width} height={height} />
  if (lower.includes('cameroun') || lower.includes('camerounais')) return <CameroonianFlag width={width} height={height} />
  if (lower.includes('tunisie') || lower.includes('tunisien')) return <TunisianFlag width={width} height={height} />
  return <GenericFlag width={width} height={height} />
}

export const CVPDFTemplate: React.FC<CVPDFTemplateProps> = ({ player, careers, qualities, formations }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const getPosteLabel = (poste: string) => {
    const posteLabels: Record<string, string> = {
      GB: 'GARDIEN',
      DG: 'DEFENSEUR GAUCHE',
      DC: 'DEFENSEUR CENTRAL',
      DD: 'DEFENSEUR DROIT',
      MDC: 'MILIEU DEFENSIF',
      MC: 'MILIEU CENTRAL',
      MOC: 'MILIEU OFFENSIF',
      MG: 'MILIEU GAUCHE',
      MD: 'MILIEU DROIT',
      AG: 'AILIER GAUCHE',
      AD: 'AILIER DROIT',
      BU: 'BUTEUR',
      ATT: 'ATTAQUANT',
      'Piston G': 'PISTON GAUCHE',
      'Piston D': 'PISTON DROIT',
    }
    return posteLabels[poste] || poste?.toUpperCase() || ''
  }

  const formatCareerYears = (career: any) => {
    if (career.season) {
      const years = career.season.match(/\d{4}/g)
      if (years && years.length >= 2) {
        return { start: years[0], end: years[1] }
      }
      return { start: career.season, end: '' }
    }
    if (!career.startDate) return { start: '', end: '' }
    const start = new Date(career.startDate).getFullYear()
    const end = career.endDate ? new Date(career.endDate).getFullYear() : 'present'
    return { start: start.toString(), end: end.toString() }
  }

  // Récupérer les qualités du joueur (depuis player.qualities ou depuis le prop qualities)
  const playerQualities = player.qualities || qualities || []
  const allQualities = playerQualities.map((q: any) => {
    if (typeof q === 'string') return q
    return q.quality || q.libelle || ''
  }).filter((q: string) => q && q.length > 0)

  // Vérifier si le joueur est international en regardant ses carrières
  const internationalCareer = careers?.find((c) => c.isInternationalPlayer)
  const hasInternationalCareer = !!internationalCareer
  // Récupérer le pays de l'équipe nationale (peut être différent de la nationalité)
  const internationalTeamCountry = internationalCareer?.internationalTeamName || player.nationality

  // Formations du joueur
  const playerFormations = formations || player.formations || []

  // Fonction pour déterminer si une carrière est la saison en cours
  const isCurrentSeason = (career: any): boolean => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1 // 1-12
    
    // Déterminer la saison sportive actuelle
    // Si on est entre janvier et juin, la saison est (année-1)-(année)
    // Si on est entre juillet et décembre, la saison est (année)-(année+1)
    let currentSeasonStart: number
    let currentSeasonEnd: number
    
    if (currentMonth >= 7) {
      // Juillet à Décembre : saison année/année+1
      currentSeasonStart = currentYear
      currentSeasonEnd = currentYear + 1
    } else {
      // Janvier à Juin : saison année-1/année
      currentSeasonStart = currentYear - 1
      currentSeasonEnd = currentYear
    }
    
    // Vérifier via la saison (ex: "2024-2025" ou "2025-2026")
    if (career.season) {
      const years = career.season.match(/\d{4}/g)
      if (years && years.length >= 2) {
        const seasonStart = parseInt(years[0])
        const seasonEnd = parseInt(years[1])
        // La saison correspond à la saison actuelle
        if (seasonStart === currentSeasonStart && seasonEnd === currentSeasonEnd) {
          return true
        }
      }
    }
    
    // Vérifier via les dates si pas de saison
    if (!career.season && career.startDate) {
      // Si pas de date de fin, c'est potentiellement en cours
      if (!career.endDate) return true
      // Si la date de fin est dans le futur
      if (new Date(career.endDate) >= now) return true
    }
    
    return false
  }

  // Trier les carrières par année décroissante (plus récent en premier)
  const sortedCareers = [...(careers || [])].sort((a, b) => {
    // Extraire l'année de début pour le tri
    const getStartYear = (career: any): number => {
      if (career.season) {
        const years = career.season.match(/\d{4}/g)
        if (years && years.length > 0) return parseInt(years[0])
      }
      if (career.startDate) {
        return new Date(career.startDate).getFullYear()
      }
      return 0
    }
    
    return getStartYear(b) - getStartYear(a) // Ordre décroissant
  })

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerFlag}>{getNationalityFlag(player.nationality, 36, 26)}</View>
          <View style={styles.headerNameContainer}>
            <Text style={styles.headerName}>
              {player.firstName?.toUpperCase()} {player.lastName?.toUpperCase()}
            </Text>
            <Text style={styles.headerPosition}>{player.primaryPost?.toUpperCase() || ''}</Text>
            <Text style={styles.headerPositionSecondary}>{getPosteLabel(player.primaryPost)}</Text>
          </View>
          <View style={styles.footballFieldContainer}>
            <FootballField
              primaryPost={player.primaryPost}
              secondaryPost={player.secondaryPost}
              formation={player.favoriteTactic || '4-3-3'}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Left Column - Dark Blue */}
          <View style={styles.leftColumn}>
            {/* Photo */}
            <View style={styles.photoSection}>
              <View style={styles.photoContainer}>
                {player?.photo && player.photo.length > 50 ? (
                  <Image src={player.photo} style={styles.photoImage} />
                ) : (
                  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#666', fontSize: 8 }}>Photo</Text>
                  </View>
                )}
              </View>
            </View>

            {/* Profil Section */}
            <View style={styles.profileSection}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleIcon}>
                  <UserIcon />
                </View>
                <Text>PROFIL</Text>
              </View>

              {/* Badge International - basé sur les carrières */}
              {hasInternationalCareer && (
                <View style={styles.internationalBadge}>
                  {getNationalityFlag(internationalTeamCountry, 16, 11)}
                  <Text style={styles.internationalText}>International {internationalTeamCountry}</Text>
                </View>
              )}

              <View style={styles.profileItem}>
                <View style={styles.profileIcon}>
                  <CalendarIcon />
                </View>
                <Text style={styles.profileLabel}>Ne le </Text>
                <Text style={styles.profileValue}>{formatDate(player.dateOfBirth)}</Text>
              </View>
              <View style={styles.profileItem}>
                <View style={styles.profileIcon}>
                  <FootIcon />
                </View>
                <Text style={styles.profileLabel}>Pied fort - </Text>
                <Text style={styles.profileValue}>{player.strongFoot || 'N/A'}</Text>
              </View>
              <View style={styles.profileItem}>
                <View style={styles.profileIcon}>
                  <RulerIcon />
                </View>
                <Text style={styles.profileLabel}>Taille - </Text>
                <Text style={styles.profileValue}>{player.size || '--'} cm</Text>
              </View>
              <View style={styles.profileItem}>
                <View style={styles.profileIcon}>
                  <WeightIcon />
                </View>
                <Text style={styles.profileLabel}>Poids - </Text>
                <Text style={styles.profileValue}>{player.weight || '--'} kg</Text>
              </View>
              {player.vma && (
                <View style={styles.profileItem}>
                  <View style={styles.profileIcon}>
                    <SpeedIcon />
                  </View>
                  <Text style={styles.profileLabel}>VMA - </Text>
                  <Text style={styles.profileValue}>{player.vma} km/h</Text>
                </View>
              )}
            </View>

            {/* Section Liens CLIQUABLES (stats et vidéo) */}
            {(player.linkStats || player.linkVideo) && (
              <View style={styles.linksSection}>
                {/* Transfermarkt style link for stats */}
                {player.linkStats && (
                  <Link src={player.linkStats} style={{ textDecoration: 'none' }}>
                    <View style={styles.transfermarktContainer}>
                      <Text style={styles.transfermarktText}>transfer</Text>
                      <Text style={styles.transfermarktTextRed}>markt</Text>
                      <View style={styles.externalLinkIcon}>
                        <ExternalLinkIcon color="#1E3A5F" />
                      </View>
                    </View>
                  </Link>
                )}
                {player.linkVideo && (
                  <Link src={player.linkVideo} style={{ textDecoration: 'none' }}>
                    <View style={styles.linkItemClickable}>
                      <VideoIcon />
                      <Text style={[styles.linkText, { color: '#1E3A5F' }]}>Video highlights</Text>
                      <View style={{ marginLeft: 'auto' }}>
                        <ExternalLinkIcon color="#1E3A5F" />
                      </View>
                    </View>
                  </Link>
                )}
              </View>
            )}

            {/* Qualités */}
            {allQualities.length > 0 && (
              <View style={styles.qualitiesSection}>
                <View style={styles.sectionTitle}>
                  <View style={styles.sectionTitleIcon}>
                    <CheckIcon />
                  </View>
                  <Text>QUALITES</Text>
                </View>
                {allQualities.slice(0, 10).map((quality: string, idx: number) => (
                  <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 3 }}>
                    <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#FFFFFF', marginRight: 6 }} />
                    <Text style={{ fontSize: 8, color: '#FFFFFF' }}>{quality}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Section FORMATION - NOUVELLE */}
            {playerFormations && playerFormations.length > 0 && (
              <View style={styles.formationSection}>
                <View style={styles.sectionTitle}>
                  <View style={styles.sectionTitleIcon}>
                    <GraduationIcon />
                  </View>
                  <Text>FORMATION</Text>
                </View>
                {playerFormations.map((formation: Formation, idx: number) => (
                  <View key={idx} style={styles.formationItem}>
                    <Text style={styles.formationYear}>{formation.year}</Text>
                    <Text style={styles.formationText}>
                      {formation.title}
                      {formation.institution ? ` - ${formation.institution}` : ''}
                    </Text>
                    {formation.diploma && (
                      <Text style={styles.formationDiploma}>{formation.diploma}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Contact */}
            <View style={styles.contactSection}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleIcon}>
                  <EmailIcon />
                </View>
                <Text>CONTACT</Text>
              </View>
              {player.email && (
                <Link src={`mailto:${player.email}`} style={{ textDecoration: 'none' }}>
                  <View style={styles.contactItem}>
                    <View style={styles.contactIcon}>
                      <EmailIcon />
                    </View>
                    <Text style={styles.contactText}>{player.email}</Text>
                  </View>
                </Link>
              )}
              {player.telephone && (
                <Link src={`tel:${player.telephone}`} style={{ textDecoration: 'none' }}>
                  <View style={styles.contactItem}>
                    <View style={styles.contactIcon}>
                      <PhoneIcon />
                    </View>
                    <Text style={styles.contactText}>{player.telephone}</Text>
                  </View>
                </Link>
              )}
            </View>
          </View>

          {/* Right Column - White */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitleRight}>CARRIERE & STATISTIQUES</Text>

            {sortedCareers && sortedCareers.length > 0 ? (
              sortedCareers.map((career, index) => {
                const years = formatCareerYears(career)
                const isLast = index === sortedCareers.length - 1
                const competitionBadges = extractCompetitionBadges(career.competition || '')
                const isCurrent = isCurrentSeason(career)

                return (
                  <View key={index} style={isLast ? styles.careerItemLast : styles.careerItem}>
                    <View style={styles.careerHeader}>
                      <View style={styles.careerInfo}>
                        {/* Period and Club */}
                        <View style={styles.careerPeriod}>
                          <Text style={styles.careerYear}>{years.start}</Text>
                          {years.end && (
                            <>
                              <View style={styles.careerArrowContainer}>
                              <Svg width="8" height="8" viewBox="0 0 24 24">
                                <Path d="M8 5v14l11-7z" fill="#DC2626" />
                              </Svg>
                            </View>
                              <Text style={styles.careerYear}>{years.end}</Text>
                            </>
                          )}
                          <Text style={styles.careerClub}>- {career.club?.name || career.clubName || 'Club'}</Text>
                        </View>

                        {/* Competition with badges and league logo */}
                        <View style={styles.careerCompetition}>
                          <Text style={styles.careerCompetitionText}>{career.competition || ''}</Text>
                          
                          {/* Badges de compétition (N3, U19, R1, etc.) */}
                          <View style={styles.competitionBadgeContainer}>
                            {competitionBadges.map((badge, badgeIdx) => (
                              <View key={badgeIdx} style={[styles.competitionBadge, getCompetitionBadgeStyle(badge)]}>
                                <Text style={styles.competitionBadgeText}>{badge}</Text>
                              </View>
                            ))}
                          </View>
                          
                          {/* Logo de la ligue/compétition si disponible */}
                          {career.competitionLogo && (
                            <View style={styles.competitionLogoContainer}>
                              <Image src={career.competitionLogo} style={styles.competitionLogo} />
                            </View>
                          )}
                          
                          {career.category && <Text style={styles.badgeBlue}>{career.category}</Text>}
                        </View>

                        {/* Badges style amélioré comme l'image */}
                        <View style={styles.badgeContainer}>
                          {/* Badge Saison en cours - affiché en premier si c'est la saison actuelle */}
                          {isCurrent && (
                            <Text style={styles.badgeGreen}>Saison en cours</Text>
                          )}

                          {/* Champion - Style Gold arrondi */}
                          {career.isChampionWinner && (
                            <View style={styles.badgeGoldStyle}>
                              <TrophyIcon size={9} color="#000000" />
                              <Text style={styles.badgeGoldText}>
                                Champion {career.nameOfChampionship ? career.nameOfChampionship : ''}
                              </Text>
                            </View>
                          )}

                          {/* Capitaine - Style Gold arrondi */}
                          {career.isCaptain && (
                            <View style={styles.badgeGoldStyle}>
                              <CrownIcon size={9} color="#000000" />
                              <Text style={styles.badgeGoldText}>Capitaine</Text>
                            </View>
                          )}

                          {/* International - Style bordure violette */}
                          {career.isInternationalPlayer && (
                            <View style={styles.badgePurpleStyle}>
                              <GlobeIcon size={9} color="#7C3AED" />
                              <Text style={styles.badgePurpleText}>
                                International {career.internationalTeamName || ''}
                              </Text>
                            </View>
                          )}

                          {/* Surclassé */}
                          {career.isUpgraded && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1E3A5F', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 15 }}>
                              <ArrowUpIcon size={9} />
                              <Text style={{ fontSize: 7, color: '#FFFFFF', fontWeight: 'bold', marginLeft: 3 }}>Surclasse</Text>
                            </View>
                          )}

                          {/* Transfert mi-saison */}
                          {career.isChangedClub && (
                            <View style={styles.badgeOrangeStyle}>
                              <TransferIcon size={9} color="#F97316" />
                              <Text style={styles.badgeOrangeText}>
                                {career.aboutClubChanging || 'Transfert mi-saison'}
                              </Text>
                            </View>
                          )}
                        </View>

                        {/* Notes International et Transfert */}
                        <View style={styles.careerNotes}>
                          {career.isInternationalPlayer && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                              <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#374151', marginRight: 4 }} />
                              <Text style={styles.careerNote}>
                                Selections en Equipe de {career.internationalTeamName}{' '}
                                {career.internationalCategory ? `(${career.internationalCategory})` : ''}
                              </Text>
                              <View style={{ marginLeft: 3 }}>
                                {getNationalityFlag(career.internationalTeamName || player.nationality, 12, 8)}
                              </View>
                            </View>
                          )}
                          {career.aboutInternationalSelection && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                              <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#374151', marginRight: 4 }} />
                              <Text style={styles.careerNote}>{career.aboutInternationalSelection}</Text>
                            </View>
                          )}
                          {/* Note sur le transfert mi-saison */}
                          {career.isChangedClub && career.aboutClubChanging && (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                              <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: '#374151', marginRight: 4 }} />
                              <Text style={styles.careerNote}>{career.aboutClubChanging}</Text>
                            </View>
                          )}
                        </View>

                        {/* Stats - Ne pas afficher pour la saison en cours */}
                        {!isCurrent && career.stats && (
                          <View style={styles.statsContainer}>
                            {career.stats.goals > 0 && (
                              <View style={styles.statBox}>
                                <Text style={styles.statValue}>{career.stats.goals}</Text>
                                <Text style={styles.statLabel}>buts</Text>
                              </View>
                            )}
                            {career.stats.assists > 0 && (
                              <View style={styles.statBox}>
                                <Text style={styles.statValue}>{career.stats.assists}</Text>
                                <Text style={styles.statLabel}>passes dec.</Text>
                              </View>
                            )}
                            {career.stats.matches > 0 && (
                              <View style={styles.statBox}>
                                <Text style={styles.statValue}>{career.stats.matches}</Text>
                                <Text style={styles.statLabel}>matchs</Text>
                              </View>
                            )}
                            {career.stats.averagePlayingTime > 0 && (
                              <View style={styles.statBox}>
                                <Text style={styles.statValue}>{career.stats.averagePlayingTime}'</Text>
                                <Text style={styles.statLabel}>Temps moyen</Text>
                              </View>
                            )}
                            {(career.stats.cleanSheet > 0 || career.stats.cleanSheets > 0) && (
                              <View style={styles.statBox}>
                                <Text style={styles.statValue}>{career.stats.cleanSheet || career.stats.cleanSheets}</Text>
                                <Text style={styles.statLabel}>clean sheets</Text>
                              </View>
                            )}
                            {/* Badge Meilleur buteur */}
                            {career.isTopScorer && (
                              <View style={styles.statSpecial}>
                                <View style={styles.statSpecialIcon}>
                                  <TopScorerIcon size={10} />
                                </View>
                                <Text style={styles.statSpecialText}>Meilleur buteur</Text>
                              </View>
                            )}
                          </View>
                        )}
                      </View>

                      {/* Club Logo */}
                      {career.clubLogo ? (
                        <Image src={career.clubLogo} style={styles.careerLogo} />
                      ) : (
                        <View style={styles.careerLogoPlaceholder} />
                      )}
                    </View>
                  </View>
                )
              })
            ) : (
              <Text style={{ fontSize: 10, color: '#666' }}>Aucune carriere enregistree</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default CVPDFTemplate