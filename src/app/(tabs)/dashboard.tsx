import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard - Visão Geral</Text>

      <View style={styles.row}>
        {/* Card 1 - Veículos */}
        <View style={[styles.card, { borderLeftColor: '#007bff' }]}>
          <Text style={styles.cardTitle}>Veículos Disponíveis</Text>
          <Text style={styles.cardValue}>15</Text>
        </View>

        {/* Card 2 - Solicitações */}
        <View style={[styles.card, { borderLeftColor: '#ffc107' }]}>
          <Text style={styles.cardTitle}>Solicitações Pendentes</Text>
          <Text style={styles.cardValue}>5</Text>
        </View>

        {/* Card 3 - Manutenções */}
        <View style={[styles.card, { borderLeftColor: '#dc3545' }]}>
          <Text style={styles.cardTitle}>Manutenções Agendadas</Text>
          <Text style={styles.cardValue}>2</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5a5c69',
    marginBottom: 20,
    marginTop: 40,
  },
  row: {
    flexDirection: 'column', // No mobile, cards empilhados funcionam melhor
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5, // Simula o "border" do Bootstrap lateralmente
    // Sombra para Android
    elevation: 3,
    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4e73df',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a5c69',
  },
});

export default Dashboard;