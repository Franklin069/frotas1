import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function SolicitacoesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Título (Equivalente ao <h1>) */}
        <Text style={styles.title}>Lista de Solicitações</Text>
        
        {/* Card de Conteúdo (Estilo Bootstrap Card) */}
        <View style={styles.card}>
          <Text style={styles.paragraph}>
            Conteúdo para a lista de solicitações virá aqui.
          </Text>
        </View>

        {/* Exemplo de como você pode listar itens futuramente */}
        <View style={styles.placeholderItem}>
          <Text style={styles.itemText}>Exemplo de Solicitação #001</Text>
          <Text style={styles.itemStatus}>Pendente</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Cor de fundo bg-light do Bootstrap
  },
  content: {
    padding: 20, // Equivalente ao container mt-4
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#6c757d',
    lineHeight: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Sombra no Android
    marginBottom: 20,
  },
  placeholderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#0061F2', // Azul da Guarnicê
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '600',
  },
  itemStatus: {
    fontSize: 14,
    color: '#0061F2',
    fontWeight: 'bold',
  }
});