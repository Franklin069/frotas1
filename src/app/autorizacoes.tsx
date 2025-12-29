import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';

export default function ManutencoesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Ajusta a barra de status para combinar com o fundo claro */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Cabeçalho da Página (Equivalente ao <h1>) */}
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Manutenções</Text>
          <Text style={styles.subtitle}>Aqui serão listadas as manutenções do sistema.</Text>
        </View>

        {/* Card Informativo (Estilo Bootstrap Card) */}
        <View style={styles.card}>
          <Text style={styles.cardContent}>
            Nenhuma manutenção registrada no momento.
          </Text>
        </View>

        {/* Exemplo de Card de Manutenção Individual */}
        <View style={styles.maintenanceItem}>
          <View style={styles.maintenanceInfo}>
            <Text style={styles.vehicleName}>Caminhão Volvo FH 540</Text>
            <Text style={styles.dateText}>Data: 28/12/2025</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Preventiva</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Cor bg-light do Bootstrap
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginBottom: 20,
  },
  cardContent: {
    fontSize: 16,
    color: '#495057',
    textAlign: 'center',
  },
  maintenanceItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  maintenanceInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateText: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#0061F2', // Azul padrão Guarnicê
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});