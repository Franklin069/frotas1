import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Configura a barra de status do celular */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <View style={styles.content}>
        {/* Título Principal (Equivalente ao <h1>) */}
        <Text style={styles.title}>Guarnicê-Frotas</Text>
        
        {/* Subtítulo (Equivalente ao <p>) */}
        <Text style={styles.subtitle}>Esta é a página inicial.</Text>

        {/* Card de Boas-vindas estilo Bootstrap */}
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Bem-vindo ao sistema de gerenciamento de frotas. 
            Utilize o menu lateral para navegar entre veículos, 
            manutenções e solicitações.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Cor bg-light do Bootstrap
  },
  content: {
    flex: 1,
    padding: 20, // Equivalente ao class="container mt-4"
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    alignItems: 'center',     // Centraliza o conteúdo horizontalmente
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#212529', // Cor padrão de texto escuro do Bootstrap
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#6c757d', // Cor text-secondary do Bootstrap
    marginBottom: 30,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    // Sombra suave para parecer um componente moderno
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
    textAlign: 'center',
  },
});