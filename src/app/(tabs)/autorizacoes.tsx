import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  Alert 
} from 'react-native';
// Importando as funções do seu arquivo 'serve.js'
import { buscarDados, enviarDados } from '../../services/server'; 

export default function AutorizacoesScreen() {
  // O segredo está aqui: o nome é setSolicitacoes
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const carregarSolicitacoes = async () => {
    try {
      setLoading(true);
      const dados = await buscarDados('/api/solicitacoes');
      
      // Filtramos apenas as solicitações com status PENDENTE
      const pendentes = dados.filter((s: any) => s.status === 'PENDENTE');
      
      // CORREÇÃO AQUI: Agora o nome bate com o useState acima
      setSolicitacoes(pendentes); 
    } catch (error) {
      console.error("Erro ao buscar solicitações:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarSolicitacoes();
  }, []);

  const processarAutorizacao = async (id: number, novoStatus: 'APROVADA' | 'NEGADA') => {
    try {
      // Chama o endpoint PATCH do seu Java
      await enviarDados(`/api/solicitacoes/${id}/status`, 'PATCH', { status: novoStatus });
      
      Alert.alert('Sucesso', `Solicitação ${novoStatus.toLowerCase()} com sucesso!`);
      carregarSolicitacoes(); // Recarrega a lista para remover o item processado
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível processar a autorização.');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0061F2" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Autorizações</Text>
          <Text style={styles.subtitle}>Gerencie os pedidos de veículos pendentes.</Text>
        </View>

        {solicitacoes.length === 0 ? (
          <View style={styles.card}>
            <Text style={styles.cardContent}>Nenhuma solicitação aguardando autorização.</Text>
          </View>
        ) : (
          solicitacoes.map((item: any) => (
            <View key={item.id} style={styles.maintenanceItem}>
              <View style={styles.maintenanceInfo}>
                <Text style={styles.vehicleName}>{item.destino}</Text>
                <Text style={styles.dateText}>Solicitante: {item.servidor?.pessoa?.nome}</Text>
                <Text style={styles.dateText}>Data: {item.dataInicio}</Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity 
                  style={[styles.btnAction, { backgroundColor: '#28a745' }]} 
                  onPress={() => processarAutorizacao(item.id, 'APROVADA')}
                >
                  <Text style={styles.btnText}>✓</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.btnAction, { backgroundColor: '#dc3545', marginLeft: 10 }]} 
                  onPress={() => processarAutorizacao(item.id, 'NEGADA')}
                >
                  <Text style={styles.btnText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
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
  actions: {
    flexDirection: 'row',
  },
  btnAction: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  }
});