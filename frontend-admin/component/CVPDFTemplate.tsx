import React from 'react'
import { Document, Page, Text, View, Image, StyleSheet, Svg, Rect, Path, Circle, G, Line, Polygon } from '@react-pdf/renderer'

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
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    flex: 1,
  },
  flagContainer: {
    marginRight: 6,
    marginTop: 2,
  },
  headerText: {
    flex: 1,
  },
  playerName: {
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1.5,
  },
  playerPosition: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#FFFFFF',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  playerPositionSecondary: {
    fontSize: 11,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  headerPhoto: {
    width: 85,
    height: 100,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  headerPhotoImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  headerPhotoPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footballFieldContainer: {
    width: 100,
    height: 70,
    marginLeft: 10,
  },
  contentContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  leftColumn: {
    width: '32%',
    backgroundColor: '#1E3A5F',
    padding: 12,
    paddingTop: 8,
    color: '#FFFFFF',
  },
  rightColumn: {
    width: '68%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    paddingTop: 8,
    color: '#000000',
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    color: '#FFFFFF',
    letterSpacing: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitleIcon: {
    marginRight: 6,
  },
  sectionTitleRight: {
    fontSize: 13,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    color: '#1E3A5F',
    letterSpacing: 1,
    borderBottomWidth: 3,
    borderBottomColor: '#DC2626',
    paddingBottom: 4,
    textDecorationLine: 'underline',
    textDecorationStyle: 'wavy',
  },
  profileItem: {
    marginBottom: 5,
    fontSize: 9,
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileLabel: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileValue: {
    color: '#FFFFFF',
  },
  profileIcon: {
    width: 12,
    marginRight: 5,
  },
  internationalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 6,
    marginBottom: 8,
  },
  internationalText: {
    fontSize: 9,
    color: '#FFFFFF',
    marginLeft: 5,
  },
  qualitiesList: {
    marginTop: 4,
  },
  qualityItem: {
    fontSize: 8,
    marginBottom: 4,
    color: '#FFFFFF',
    paddingLeft: 8,
  },
  qualityBullet: {
    color: '#FFFFFF',
    marginRight: 4,
  },
  contactItem: {
    marginBottom: 6,
    fontSize: 8,
    color: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    marginRight: 5,
  },
  videoSection: {
    marginTop: 8,
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoIcon: {
    marginRight: 6,
  },
  videoText: {
    fontSize: 8,
    color: '#FFFFFF',
  },
  linkSection: {
    marginTop: 6,
    padding: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  linkText: {
    fontSize: 7,
    color: '#FFFFFF',
    marginLeft: 4,
  },
  careerSection: {
    marginBottom: 8,
  },
  careerItem: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  careerItemLast: {
    marginBottom: 10,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },
  careerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  careerPeriodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  careerPeriodYear: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },
  careerPeriodArrow: {
    fontSize: 10,
    color: '#DC2626',
    marginHorizontal: 4,
  },
  careerClub: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1E3A5F',
    textTransform: 'uppercase',
  },
  careerCompetitionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 2,
    marginBottom: 4,
  },
  careerCompetitionText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#DC2626',
    marginRight: 6,
  },
  careerLogo: {
    width: 40,
    height: 40,
    objectFit: 'contain',
  },
  careerLogoPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  careerInfo: {
    flex: 1,
  },
  careerNotes: {
    marginTop: 4,
    marginBottom: 4,
  },
  careerNote: {
    fontSize: 8,
    color: '#374151',
    marginBottom: 2,
    paddingLeft: 8,
  },
  careerNoteBullet: {
    color: '#1E3A5F',
  },
  // Badges
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
    marginBottom: 4,
  },
  badge: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#DC2626',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgeBlue: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#2563EB',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgeGreen: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#059669',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgeGold: {
    fontSize: 7,
    color: '#000000',
    backgroundColor: '#FCD34D',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgePurple: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#7C3AED',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgeOrange: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#EA580C',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgeGray: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#6B7280',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  badgeTeal: {
    fontSize: 7,
    color: '#FFFFFF',
    backgroundColor: '#0D9488',
    padding: 2,
    paddingHorizontal: 5,
    borderRadius: 2,
    fontWeight: 'bold',
    marginRight: 3,
    marginBottom: 2,
  },
  // Badges avec icônes
  badgeWithIcon: {
    marginRight: 4,
    marginBottom: 3,
  },
  badgeGoldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCD34D',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgePurpleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeGreenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#059669',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  badgeTextBlack: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#000000',
  },
  badgeTextWhite: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  // Stats section
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    gap: 4,
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    padding: 4,
    paddingHorizontal: 8,
    marginRight: 4,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginRight: 3,
  },
  statLabel: {
    fontSize: 8,
    color: '#6B7280',
  },
  // International flag with career
  internationalFlagSmall: {
    marginLeft: 4,
  },
  // Current season indicator
  currentSeasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Loan indicator
  loanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  loanIcon: {
    marginRight: 3,
  },
  loanText: {
    fontSize: 8,
    color: '#6B7280',
    fontStyle: 'italic',
  },
})

// ==================== SVG FLAGS ====================

const FrenchFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#002395" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#FFFFFF" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#ED2939" />
  </Svg>
)

const FrenchFlagSmall = () => (
  <Svg width="14" height="10" viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#002395" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#FFFFFF" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#ED2939" />
  </Svg>
)

const MoroccanFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="28" height="20" fill="#C1272D" />
    <Path d="M14 5 L15.3 9.5 L20 10 L16.2 13 L17.3 17.5 L14 15 L10.7 17.5 L11.8 13 L8 10 L12.7 9.5 Z" fill="none" stroke="#006233" strokeWidth="1.2" />
  </Svg>
)

const AlgerianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="14" height="20" fill="#006233" />
    <Rect x="14" y="0" width="14" height="20" fill="#FFFFFF" />
    <Circle cx="15" cy="10" r="4" fill="#D21034" />
    <Path d="M16 7 L17 10 L20 10 L17.5 12 L18.5 15 L16 13 L13.5 15 L14.5 12 L12 10 L15 10 Z" fill="#D21034" />
  </Svg>
)

const TunisianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="28" height="20" fill="#E70013" />
    <Circle cx="14" cy="10" r="5" fill="#FFFFFF" />
    <Circle cx="15" cy="10" r="4" fill="#E70013" />
    <Path d="M13 7 L14 10 L17 10 L14.5 12 L15.5 14 L13 12 L10.5 14 L11.5 12 L9 10 L12 10 Z" fill="#E70013" />
  </Svg>
)

const SenegaleseFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#00853F" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#FDEF42" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#E31B23" />
    <Path d="M14 7 L14.8 9.5 L17.5 9.5 L15.3 11 L16.1 13.5 L14 12 L11.9 13.5 L12.7 11 L10.5 9.5 L13.2 9.5 Z" fill="#00853F" />
  </Svg>
)

const IvorianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#F77F00" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#FFFFFF" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#009E60" />
  </Svg>
)

const CameroonianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#007A5E" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#CE1126" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#FCD116" />
    <Path d="M14 7 L14.8 9.5 L17.5 9.5 L15.3 11 L16.1 13.5 L14 12 L11.9 13.5 L12.7 11 L10.5 9.5 L13.2 9.5 Z" fill="#FCD116" />
  </Svg>
)

const BelgianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#000000" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#FAE042" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#ED2939" />
  </Svg>
)

const SpanishFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="28" height="5" fill="#AA151B" />
    <Rect x="0" y="5" width="28" height="10" fill="#F1BF00" />
    <Rect x="0" y="15" width="28" height="5" fill="#AA151B" />
  </Svg>
)

const PortugueseFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="11" height="20" fill="#006600" />
    <Rect x="11" y="0" width="17" height="20" fill="#FF0000" />
    <Circle cx="11" cy="10" r="4" fill="#FFCC00" />
  </Svg>
)

const ItalianFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="9.33" height="20" fill="#009246" />
    <Rect x="9.33" y="0" width="9.33" height="20" fill="#FFFFFF" />
    <Rect x="18.66" y="0" width="9.34" height="20" fill="#CE2B37" />
  </Svg>
)

const GermanFlag = ({ width = 28, height = 20 }: { width?: number; height?: number }) => (
  <Svg width={width} height={height} viewBox="0 0 28 20">
    <Rect x="0" y="0" width="28" height="6.67" fill="#000000" />
    <Rect x="0" y="6.67" width="28" height="6.67" fill="#DD0000" />
    <Rect x="0" y="13.34" width="28" height="6.66" fill="#FFCC00" />
  </Svg>
)

const DefaultFlag = () => (
  <Svg width="28" height="20" viewBox="0 0 28 20">
    <Rect x="0" y="0" width="28" height="20" fill="#CCCCCC" stroke="#999999" strokeWidth="1" />
  </Svg>
)

// ==================== SVG ICONS ====================

const CalendarIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" fill="#FFFFFF" />
  </Svg>
)

const FootIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#FFFFFF" />
  </Svg>
)

const HeightIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#FFFFFF" />
  </Svg>
)

const WeightIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-3 7v10h2v-5h2v5h2V10c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2z" fill="#FFFFFF" />
  </Svg>
)

const SpeedIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M20.38 8.57l-1.23 1.85a8 8 0 0 1-.22 7.58H5.07A8 8 0 0 1 15.58 6.85l1.85-1.23A10 10 0 0 0 3.35 19a2 2 0 0 0 1.72 1h13.85a2 2 0 0 0 1.74-1 10 10 0 0 0-.27-10.44zm-9.79 6.84a2 2 0 0 0 2.83 0l5.66-8.49-8.49 5.66a2 2 0 0 0 0 2.83z" fill="#FFFFFF" />
  </Svg>
)

const EmailIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="#FFFFFF" />
  </Svg>
)

const PhoneIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#FFFFFF" />
  </Svg>
)

const LinkIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" fill="#FFFFFF" />
  </Svg>
)

const VideoIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF0000" />
  </Svg>
)

const TrophyIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="#FFD700" />
  </Svg>
)

const StarIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#FFD700" />
  </Svg>
)

const CheckIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="#FFFFFF" />
  </Svg>
)

const GlobeIcon = () => (
  <Svg width="10" height="10" viewBox="0 0 24 24">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#FFFFFF" />
  </Svg>
)

// Icônes pour les badges (petite taille)
const TrophyIconSmall = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: 3 }}>
    <Path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="#000000" />
  </Svg>
)

const CrownIconSmall = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: 3 }}>
    <Path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" fill="#000000" />
  </Svg>
)

const StarIconSmall = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: 3 }}>
    <Path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#000000" />
  </Svg>
)

const GlobeIconSmall = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24" style={{ marginRight: 3 }}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#FFFFFF" />
  </Svg>
)

const UserIcon = () => (
  <Svg width="12" height="12" viewBox="0 0 24 24">
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#FFFFFF" />
  </Svg>
)

// ==================== FOOTBALL FIELD ====================

// Positions sur le terrain (coordonnées x, y pour chaque poste)
const getPositionCoordinates = (poste: string): { x: number; y: number } => {
  const positions: Record<string, { x: number; y: number }> = {
    // Gardien
    'GB': { x: 10, y: 32.5 },
    
    // Défenseurs
    'DG': { x: 22, y: 52 },
    'DC': { x: 22, y: 32.5 },
    'DD': { x: 22, y: 13 },
    
    // Milieux défensifs
    'MDC': { x: 38, y: 32.5 },
    
    // Milieux
    'MC': { x: 45, y: 32.5 },
    'MG': { x: 45, y: 52 },
    'MD': { x: 45, y: 13 },
    
    // Milieu offensif
    'MOC': { x: 55, y: 32.5 },
    
    // Ailiers
    'AG': { x: 65, y: 52 },
    'AD': { x: 65, y: 13 },
    
    // Attaquants
    'BU': { x: 75, y: 32.5 },
    'ATT': { x: 75, y: 32.5 },
    
    // Pistons (pour 3-5-2)
    'Piston G': { x: 38, y: 55 },
    'Piston D': { x: 38, y: 10 },
  }
  
  return positions[poste] || { x: 45, y: 32.5 }
}

const FootballField = ({ primaryPost, secondaryPost }: { primaryPost?: string; secondaryPost?: string }) => {
  const primaryPos = getPositionCoordinates(primaryPost || 'MC')
  const secondaryPos = secondaryPost ? getPositionCoordinates(secondaryPost) : null
  
  return (
    <Svg width="90" height="65" viewBox="0 0 90 65">
      {/* Background */}
      <Rect x="0" y="0" width="90" height="65" fill="#22C55E" rx="3" />
      {/* Field border */}
      <Rect x="3" y="3" width="84" height="59" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
      {/* Center line */}
      <Line x1="45" y1="3" x2="45" y2="62" stroke="#FFFFFF" strokeWidth="1" />
      {/* Center circle */}
      <Circle cx="45" cy="32.5" r="8" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      {/* Center dot */}
      <Circle cx="45" cy="32.5" r="1.5" fill="#FFFFFF" />
      {/* Left penalty area */}
      <Rect x="3" y="18" width="12" height="29" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      {/* Left goal area */}
      <Rect x="3" y="25" width="5" height="15" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      {/* Right penalty area */}
      <Rect x="75" y="18" width="12" height="29" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      {/* Right goal area */}
      <Rect x="82" y="25" width="5" height="15" fill="none" stroke="#FFFFFF" strokeWidth="1" />
      
      {/* Secondary position marker (if exists) - slightly transparent */}
      {secondaryPos && (
        <Circle 
          cx={secondaryPos.x} 
          cy={secondaryPos.y} 
          r="4" 
          fill="#DC2626" 
          stroke="#FFFFFF" 
          strokeWidth="1" 
          opacity="0.7"
        />
      )}
      
      {/* Primary position marker */}
      <Circle 
        cx={primaryPos.x} 
        cy={primaryPos.y} 
        r="4" 
        fill="#1E3A5F" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
      />
    </Svg>
  )
}

// ==================== COMPONENT ====================

interface CVPDFTemplateProps {
  player: any
  careers: any[]
  qualities: any[]
}

export const CVPDFTemplate: React.FC<CVPDFTemplateProps> = ({ player, careers, qualities }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  }

  const getNationalityFlag = (nationality: string, width = 28, height = 20) => {
    const lower = nationality?.toLowerCase() || ''
    if (lower.includes('france') || lower.includes('francais') || lower.includes('french') || lower.includes('française')) return <FrenchFlag width={width} height={height} />
    if (lower.includes('maroc') || lower.includes('morocc') || lower.includes('marocain')) return <MoroccanFlag width={width} height={height} />
    if (lower.includes('algerie') || lower.includes('algeria') || lower.includes('algerien')) return <AlgerianFlag width={width} height={height} />
    if (lower.includes('tunisie') || lower.includes('tunisia') || lower.includes('tunisien')) return <TunisianFlag width={width} height={height} />
    if (lower.includes('senegal')) return <SenegaleseFlag width={width} height={height} />
    if (lower.includes('ivoire') || lower.includes('ivory') || lower.includes('ivoirien')) return <IvorianFlag width={width} height={height} />
    if (lower.includes('cameroun') || lower.includes('cameroon')) return <CameroonianFlag width={width} height={height} />
    if (lower.includes('belgique') || lower.includes('belgium') || lower.includes('belge')) return <BelgianFlag width={width} height={height} />
    if (lower.includes('espagne') || lower.includes('spain') || lower.includes('espagnol')) return <SpanishFlag width={width} height={height} />
    if (lower.includes('portugal') || lower.includes('portugais')) return <PortugueseFlag width={width} height={height} />
    if (lower.includes('italie') || lower.includes('italy') || lower.includes('italien')) return <ItalianFlag width={width} height={height} />
    if (lower.includes('allemagne') || lower.includes('germany') || lower.includes('allemand')) return <GermanFlag width={width} height={height} />
    return <FrenchFlag width={width} height={height} />
  }

  const getPosteLabel = (poste: string) => {
    const posteLabels: Record<string, string> = {
      'GB': 'GARDIEN',
      'DG': 'DÉFENSEUR GAUCHE',
      'DC': 'DÉFENSEUR CENTRAL',
      'DD': 'DÉFENSEUR DROIT',
      'MDC': 'MILIEU DÉFENSIF',
      'MC': 'MILIEU CENTRAL',
      'MOC': 'MILIEU OFFENSIF',
      'AG': 'AILIER GAUCHE',
      'AD': 'AILIER DROIT',
      'BU': 'BUTEUR',
      'ATT': 'ATTAQUANT',
      'Piston G': 'PISTON GAUCHE',
      'Piston D': 'PISTON DROIT',
    }
    return posteLabels[poste] || poste?.toUpperCase() || ''
  }

  const formatCareerYears = (career: any) => {
    if (career.periode) {
      let period = career.periode
      period = period.replace(/[^\d\s-]/g, ' - ')
      period = period.replace(/\s*-\s*/g, ' - ')
      const years = period.match(/\d{4}/g)
      if (years && years.length >= 2) {
        return { start: years[0], end: years[1] }
      }
      return { start: period, end: '' }
    }
    
    if (career.season) {
      const years = career.season.match(/\d{4}/g)
      if (years && years.length >= 2) {
        return { start: years[0], end: years[1] }
      }
      return { start: career.season, end: '' }
    }
    
    if (!career.startDate) return { start: '', end: '' }
    const start = new Date(career.startDate).getFullYear()
    const end = career.endDate ? new Date(career.endDate).getFullYear() : 'présent'
    return { start: start.toString(), end: end.toString() }
  }

  const groupQualitiesByCategory = () => {
    const grouped: Record<string, any[]> = {}
    if (!qualities) return grouped
    
    qualities.forEach((q: any) => {
      const category = q.category || 'Autres'
      if (!grouped[category]) grouped[category] = []
      grouped[category].push(q)
    })
    return grouped
  }

  const getCompetitionBadgeStyle = (competition: string, category: string) => {
    const comp = competition?.toLowerCase() || ''
    const cat = category?.toLowerCase() || ''
    
    // Catégories de jeunes
    if (cat.includes('u15') || comp.includes('u15')) return styles.badgeOrange
    if (cat.includes('u16') || comp.includes('u16')) return styles.badgeOrange
    if (cat.includes('u17') || comp.includes('u17')) return styles.badgeBlue
    if (cat.includes('u18') || comp.includes('u18')) return styles.badgeBlue
    if (cat.includes('u19') || comp.includes('u19')) return styles.badgeBlue
    if (cat.includes('u21') || comp.includes('u21')) return styles.badgePurple
    if (cat.includes('u23') || comp.includes('u23')) return styles.badgePurple
    
    // Compétitions professionnelles
    if (comp.includes('ligue 1') || comp.includes('l1')) return styles.badge
    if (comp.includes('ligue 2') || comp.includes('l2')) return styles.badge
    if (comp.includes('serie a')) return styles.badgeBlue
    if (comp.includes('d1') || comp.includes('division 1')) return styles.badgeBlue
    if (comp.includes('national')) return styles.badgeGray
    if (comp.includes('regional') || comp.includes('r1') || comp.includes('r2') || comp.includes('r3')) return styles.badgeTeal
    
    return styles.badgeGray
  }

  const isCurrentSeason = (career: any) => {
    if (career.isCurrent) return true
    if (!career.endDate) return true
    const endDate = new Date(career.endDate)
    const now = new Date()
    return endDate >= now
  }

  const qualitiesByCategory = groupQualitiesByCategory()

  // Extraire les qualités uniques pour l'affichage
  const allQualities = qualities?.map((q: any) => q.quality || q.libelle || q) || []

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête avec nom, position, photo et terrain */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.flagContainer}>
              {getNationalityFlag(player.nationality)}
            </View>
            <View style={styles.headerText}>
              <Text style={styles.playerName}>
                {player.firstName?.toUpperCase()} {player.lastName?.toUpperCase()}
              </Text>
              <Text style={styles.playerPosition}>
                {player.primaryPost ? player.primaryPost.toUpperCase() : ''}
              </Text>
              <Text style={styles.playerPositionSecondary}>
                {getPosteLabel(player.primaryPost)}
                {player.secondaryPost ? ` / ${getPosteLabel(player.secondaryPost)}` : ''}
              </Text>
            </View>
          </View>
          <View style={styles.headerPhoto}>
            {player?.photo && player.photo.length > 50 ? (
              <Image src={player.photo} style={styles.headerPhotoImage} />
            ) : (
              <View style={styles.headerPhotoPlaceholder}>
                <Text style={{ color: '#666666', fontSize: 8 }}>Photo</Text>
              </View>
            )}
          </View>
          <View style={styles.footballFieldContainer}>
            <FootballField primaryPost={player.primaryPost} secondaryPost={player.secondaryPost} />
          </View>
        </View>

        {/* Contenu en deux colonnes */}
        <View style={styles.contentContainer}>
          {/* Colonne de gauche - Fond bleu marine */}
          <View style={styles.leftColumn}>
            {/* Section PROFIL */}
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleIcon}><UserIcon /></View>
                <Text>PROFIL</Text>
              </View>
              
              {/* Badge International */}
              {player.nationality && (
                <View style={styles.internationalBadge}>
                  {getNationalityFlag(player.nationality, 14, 10)}
                  <Text style={styles.internationalText}>
                    Internationale {player.nationality}
                  </Text>
                </View>
              )}

              <View>
                <View style={styles.profileItem}>
                  <View style={styles.profileIcon}><CalendarIcon /></View>
                  <Text style={styles.profileLabel}>Née le </Text>
                  <Text style={styles.profileValue}>{formatDate(player.dateOfBirth)}</Text>
                </View>
                <View style={styles.profileItem}>
                  <View style={styles.profileIcon}><FootIcon /></View>
                  <Text style={styles.profileLabel}>Pied fort </Text>
                  <Text style={styles.profileValue}>{player.strongFoot || 'N/A'}</Text>
                </View>
                <View style={styles.profileItem}>
                  <View style={styles.profileIcon}><HeightIcon /></View>
                  <Text style={styles.profileLabel}>Taille </Text>
                  <Text style={styles.profileValue}>{player.size || '--'} cm</Text>
                </View>
                <View style={styles.profileItem}>
                  <View style={styles.profileIcon}><WeightIcon /></View>
                  <Text style={styles.profileLabel}>Poids </Text>
                  <Text style={styles.profileValue}>{player.weight || '--'} kg</Text>
                </View>
                {player.vma && (
                  <View style={styles.profileItem}>
                    <View style={styles.profileIcon}><SpeedIcon /></View>
                    <Text style={styles.profileLabel}>VMA </Text>
                    <Text style={styles.profileValue}>{player.vma} km/h</Text>
                  </View>
                )}
              </View>

              {/* Section vidéo/liens */}
              {(player.linkVideo || player.linkStats) && (
                <View style={styles.linkSection}>
                  {player.linkVideo && (
                    <View style={styles.linkItem}>
                      <VideoIcon />
                      <Text style={styles.linkText}>Vidéo disponible</Text>
                    </View>
                  )}
                  {player.linkStats && (
                    <View style={styles.linkItem}>
                      <LinkIcon />
                      <Text style={styles.linkText}>Statistiques</Text>
                    </View>
                  )}
                </View>
              )}
            </View>

            {/* Section QUALITÉS */}
            {allQualities.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionTitle}>
                  <View style={styles.sectionTitleIcon}><CheckIcon /></View>
                  <Text>QUALITÉS</Text>
                </View>
                <View style={styles.qualitiesList}>
                  {allQualities.slice(0, 8).map((quality: string, idx: number) => (
                    <Text key={idx} style={styles.qualityItem}>
                      • {quality}
                    </Text>
                  ))}
                </View>
              </View>
            )}

            {/* Section CONTACT */}
            <View style={styles.section}>
              <View style={styles.sectionTitle}>
                <View style={styles.sectionTitleIcon}><EmailIcon /></View>
                <Text>CONTACT</Text>
              </View>
              <View>
                {player.email && (
                  <View style={styles.contactItem}>
                    <View style={styles.contactIcon}><EmailIcon /></View>
                    <Text>{player.email}</Text>
                  </View>
                )}
                {player.telephone && (
                  <View style={styles.contactItem}>
                    <View style={styles.contactIcon}><PhoneIcon /></View>
                    <Text>{player.telephone}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Colonne de droite - Fond blanc */}
          <View style={styles.rightColumn}>
            {/* Section CARRIÈRE & STATISTIQUES */}
            <View style={styles.careerSection}>
              <Text style={styles.sectionTitleRight}>CARRIÈRE & STATISTIQUES</Text>
              
              {careers && careers.length > 0 ? (
                careers.map((career, index) => {
                  const years = formatCareerYears(career)
                  const isCurrent = isCurrentSeason(career)
                  const isLast = index === careers.length - 1
                  
                  return (
                    <View key={index} style={isLast ? styles.careerItemLast : styles.careerItem}>
                      {/* Période et Club */}
                      <View style={styles.careerHeader}>
                        <View style={styles.careerInfo}>
                          {/* Années */}
                          <View style={styles.careerPeriodContainer}>
                            <Text style={styles.careerPeriodYear}>{years.start}</Text>
                            {years.end && (
                              <>
                                <Text style={styles.careerPeriodArrow}>-</Text>
                                <Text style={styles.careerPeriodYear}>{years.end}</Text>
                              </>
                            )}
                            <Text style={styles.careerClub}> - {career.club?.name || career.clubName || career.club || 'Club'}</Text>
                          </View>
                          
                          {/* Compétition et badges */}
                          <View style={styles.careerCompetitionRow}>
                            <Text style={styles.careerCompetitionText}>
                              {career.competition || ''}
                            </Text>
                            
                            {/* Badge de catégorie */}
                            {career.category && (
                              <Text style={getCompetitionBadgeStyle(career.competition, career.category)}>
                                {career.category}
                              </Text>
                            )}
                            
                            {/* Badge compétition type */}
                            {career.competition?.toLowerCase().includes('d1') && (
                              <Text style={styles.badgeBlue}>D1</Text>
                            )}
                            {career.competition?.toLowerCase().includes('regional') && (
                              <Text style={styles.badgeTeal}>R1</Text>
                            )}
                          </View>
                          
                          {/* Badges spéciaux */}
                          <View style={styles.badgeContainer}>
                            {/* Saison en cours */}
                            {isCurrent && (
                              <View style={styles.badgeWithIcon}>
                                <View style={styles.badgeGreenContainer}>
                                  <Text style={styles.badgeTextWhite}>Saison en cours</Text>
                                </View>
                              </View>
                            )}
                            
                            {/* Champion */}
                            {career.isChampionWinner && (
                              <View style={styles.badgeWithIcon}>
                                <View style={styles.badgeGoldContainer}>
                                  <TrophyIconSmall />
                                  <Text style={styles.badgeTextBlack}>
                                    Champion{career.nameOfChampionship ? ` ${career.nameOfChampionship}` : ''}
                                  </Text>
                                </View>
                              </View>
                            )}
                            
                            {/* Capitaine */}
                            {career.isCaptain && (
                              <View style={styles.badgeWithIcon}>
                                <View style={styles.badgeGoldContainer}>
                                  <CrownIconSmall />
                                  <Text style={styles.badgeTextBlack}>Capitaine</Text>
                                </View>
                              </View>
                            )}
                            
                            {/* Meilleur buteur */}
                            {career.stats?.isBestScorer && (
                              <View style={styles.badgeWithIcon}>
                                <View style={styles.badgeGoldContainer}>
                                  <StarIconSmall />
                                  <Text style={styles.badgeTextBlack}>Meilleur buteur</Text>
                                </View>
                              </View>
                            )}
                            
                            {/* International */}
                            {career.isInternationalPlayer && (
                              <View style={styles.badgeWithIcon}>
                                <View style={styles.badgePurpleContainer}>
                                  <GlobeIconSmall />
                                  <Text style={styles.badgeTextWhite}>
                                    International {career.internationalTeamName || ''}
                                  </Text>
                                </View>
                              </View>
                            )}
                          </View>
                          
                          {/* Notes de carrière */}
                          <View style={styles.careerNotes}>
                            {/* Prêt */}
                            {career.isLoan && career.loanFrom && (
                              <Text style={styles.careerNote}>
                                • Prêtée par le {career.loanFrom}
                              </Text>
                            )}
                            
                            {/* Sélections internationales */}
                            {career.isInternationalPlayer && (
                              <Text style={styles.careerNote}>
                                • Sélections en Équipe de {career.internationalTeamName || 'France'}
                              </Text>
                            )}
                            
                            {/* Description personnalisée */}
                            {career.aboutInternationalSelection && (
                              <Text style={styles.careerNote}>
                                • {career.aboutInternationalSelection}
                              </Text>
                            )}
                            
                            {/* Notes additionnelles */}
                            {career.notes && career.notes.split('\n').map((note: string, noteIdx: number) => (
                              <Text key={noteIdx} style={styles.careerNote}>
                                • {note}
                              </Text>
                            ))}
                          </View>
                        </View>
                        
                        {/* Logo du club */}
                        {career.clubLogo ? (
                          <Image src={career.clubLogo} style={styles.careerLogo} />
                        ) : (
                          <View style={styles.careerLogoPlaceholder} />
                        )}
                      </View>

                      {/* Stats */}
                      {career.stats && (
                        <View style={styles.statsContainer}>
                          {(career.stats.goals !== null && career.stats.goals !== undefined && career.stats.goals > 0) && (
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>{career.stats.goals}</Text>
                              <Text style={styles.statLabel}>buts</Text>
                            </View>
                          )}
                          {(career.stats.assists !== null && career.stats.assists !== undefined && career.stats.assists > 0) && (
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>{career.stats.assists}</Text>
                              <Text style={styles.statLabel}>passes décisives</Text>
                            </View>
                          )}
                          {(career.stats.matches !== null && career.stats.matches !== undefined && career.stats.matches > 0) && (
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>{career.stats.matches}</Text>
                              <Text style={styles.statLabel}>matchs</Text>
                            </View>
                          )}
                          {(career.stats.averagePlayingTime !== null && career.stats.averagePlayingTime !== undefined && career.stats.averagePlayingTime > 0) && (
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>{career.stats.averagePlayingTime}'</Text>
                              <Text style={styles.statLabel}>Temps de jeu moyen</Text>
                            </View>
                          )}
                          {(career.stats.cleanSheets !== null && career.stats.cleanSheets !== undefined && career.stats.cleanSheets > 0) && (
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>{career.stats.cleanSheets}</Text>
                              <Text style={styles.statLabel}>clean sheets</Text>
                            </View>
                          )}
                          {(career.stats.cleanSheet !== null && career.stats.cleanSheet !== undefined && career.stats.cleanSheet > 0) && (
                            <View style={styles.statBox}>
                              <Text style={styles.statValue}>{career.stats.cleanSheet}</Text>
                              <Text style={styles.statLabel}>clean sheets</Text>
                            </View>
                          )}
                        </View>
                      )}
                    </View>
                  )
                })
              ) : (
                <Text style={{ fontSize: 10, color: '#666666' }}>Aucune carrière enregistrée</Text>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default CVPDFTemplate