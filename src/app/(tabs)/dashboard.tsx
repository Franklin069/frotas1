import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Alert, Dimensions } from 'react-native';
// Ajustado para o caminho correto baseado na sua estrutura de pastas
import { buscarDados } from '../../services/server'; 

const Dashboard = () => {
  const [estatisticas, setEstatisticas] = useState({
    veiculos: 0,
    solicitacoes: 0,
    manutencoes: 0
  });
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDadosDoDashboard() {
      try {
        setCarregando(true);
        // Busca em paralelo para não travar a tela
        const [listaVeiculos, listaSolicitacoes, listaManutencoes] = await Promise.all([
          buscarDados('/api/veiculos'),
          buscarDados('/api/solicitacoes'),
          buscarDados('/api/manutencoes')
        ]);

        setEstatisticas({
          veiculos: listaVeiculos?.length || 0,
          solicitacoes: listaSolicitacoes?.filter((s: any) => s.status === 'PENDENTE').length || 0,
          manutencoes: listaManutencoes?.length || 0
        });
      } catch (error) {
        console.error("Erro no Dashboard:", error);
        // Removi o Alert daqui para não interromper o fluxo se o servidor estiver subindo
      } finally {
        setCarregando(false);
      }
    }

    carregarDadosDoDashboard();
  }, []);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4e73df" />
        <Text style={styles.loadingText}>Conectando à Guarnicê Frota...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard - Visão Geral</Text>

      <View style={styles.row}>
        {/* Card 1 - Veículos */}
        <View style={[styles.card, { borderLeftColor: '#007bff' }]}>
          <Text style={styles.cardTitle}>Veículos Disponíveis</Text>
          <Text style={styles.cardValue}>{estatisticas.veiculos}</Text>
        </View>

        {/* Card 2 - Solicitações */}
        <View style={[styles.card, { borderLeftColor: '#ffc107' }]}>
          <Text style={[styles.cardTitle, { color: '#f6c23e' }]}>Solicitações Pendentes</Text>
          <Text style={styles.cardValue}>{estatisticas.solicitacoes}</Text>
        </View>

        {/* Card 3 - Manutenções */}
        <View style={[styles.card, { borderLeftColor: '#dc3545' }]}>
          <Text style={[styles.cardTitle, { color: '#e74a3b' }]}>Manutenções Agendadas</Text>
          <Text style={styles.cardValue}>{estatisticas.manutencoes}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

// DEFINIÇÃO DOS ESTILOS (O que estava faltando ou inacessível)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fc',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fc',
  },
  loadingText: {
    marginTop: 10,
    color: '#5a5c69',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5a5c69',
    marginBottom: 20,
    marginTop: 40,
  },
  row: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    elevation: 3,
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