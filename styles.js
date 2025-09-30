import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Light grayish-blue background
  },
  checkIncontainer: {
    flex: 1,
    padding:18,
    backgroundColor: '#f8fafc', // Light grayish-blue background
  },
  mainContent: {
    flex: 1,
    padding: 20,
    paddingTop: 24,
  },

  // Header Styles
  header: {
    backgroundColor: '#6366f1', // Modern indigo
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 8,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },

  // Check-In Screen Specific Header
  checkInHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },


  // Scanner Styles
  scannerContainer: {
    width: '100%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Important for the line animation
    marginBottom: 30,
  },
  scannerText: {
    color: '#888',
    fontSize: 16,
    position: 'absolute',
    top: '45%',
  },
  scannerLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#007AFF',
    position: 'absolute',
    top: 10,
  },

  // Form & Input Styles
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flex: 1,
    marginRight: 10,
  },
  quantityContainer: {
    flex: 1,
    marginLeft: 10,
  },

  // General Button Styles
  button: {
    marginTop: 32,
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Check-In Button Styles
  checkInButton: {
    backgroundColor: '#007AFF',
    wh: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  GenerateBarCode:{
     width: '50%',

  },
  checkInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  checkInImage: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  
  // Card Styles (Dashboard)
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  actionCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  cardNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 12,
    opacity: 0.95,
  },
  cardTitle: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },

  // Stats Card Styles (Dashboard)
  quickStatsSection: {
    flex: 1,
  },
  sectionTitle: {
    color: '#1e293b', // Dark slate
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
    letterSpacing: 0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 12,
    width: '31%',
    minHeight: 100,
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#64748b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statsTitle: {
    color: '#64748b', // Cool gray
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    lineHeight: 14,
  },
  statsValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 18,
    fontWeight: '800',
    flex: 1,
    color: '#1e293b',
  },
  trendIcon: {
    marginLeft: 6,
  },
  
  // Table Styles (Inventory List)
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerCell: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  productNameHeader: {
    flex: 2,
  },
  qtyHeader: {
    flex: 1,
    textAlign: 'center',
  },
  priceHeader: {
    flex: 1,
    textAlign: 'center',
  },
  valueHeader: {
    flex: 1,
    textAlign: 'right',
  },
  tableContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  productNameCell: {
    flex: 2,
    justifyContent: 'center',
  },
  qtyCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  cellText: {
    fontSize: 14,
    color: '#333',
  },
  
  // Empty State Styles
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },

  // Footer
  footer: {
    backgroundColor: '#2c2c2c',
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 13,
  },
});

export default styles;
