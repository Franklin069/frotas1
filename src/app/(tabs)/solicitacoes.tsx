import React, { useState, useEffect } from 'react';
import SolicitacaoModal from '../../components/SolicitacaoModal'; 
import { 
  StyleSheet, View, Text, FlatList, TouchableOpacity, 
  ActivityIndicator, Alert, TextInput 
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { buscarDados, enviarDados } from '../../services/server';

export default function SolicitacoesScreen() {
  const API_ENDPOINT = '/api/solicitacoes';

  const [solicitacoes, setSolicitacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ESTADOS PARA O MODAL
  const [modalVisivel, setModalVisivel] = useState(false); 
  const [modoModal, setModoModal] = useState<'new' | 'edit' | 'view'>('new');
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<any>(null);
  
  const [filtroSolicitante, setFiltroSolicitante] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');

  const getSolicitacoes = async () => {
    try {
      setLoading(true);
      const data = await buscarDados(API_ENDPOINT);
      setSolicitacoes(data || []);
    } catch (err: any) {
      Alert.alert('Erro', 'Não foi possível carregar as solicitações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSolicitacoes();
  }, []);

  // FUNÇÕES PARA ABRIR MODAL
  const abrirNovo = () => {
    setModoModal('new');
    setSolicitacaoSelecionada(null);
    setModalVisivel(true);
  };

  const abrirEditar = (item: any) => {
    setModoModal('edit');
    setSolicitacaoSelecionada(item);
    setModalVisivel(true);
  };

  const abrirVisualizar = (item: any) => {
    setModoModal('view');
    setSolicitacaoSelecionada(item);
    setModalVisivel(true);
  };

  const handleEnviarParaAutorizacao = (sol: any) => {
    Alert.alert(
      "Confirmar Envio",
      `Confirma o envio da solicitação do servidor ${sol.servidor?.pessoa?.nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Confirmar", 
          onPress: async () => {
            try {
              await enviarDados(`${API_ENDPOINT}/${sol.id}/enviar-transporte`, 'POST');
              Alert.alert("Sucesso", "Solicitação enviada!");
              getSolicitacoes();
            } catch (error) {
              Alert.alert("Erro", "Falha ao enviar.");
            }
          } 
        }
      ]
    );
  };

  const renderStatus = (status: string) => {
    const colors: any = {
      'CRIADA': { bg: '#d1ecf1', text: '#0c5460' },
      'PENDENTE': { bg: '#fff3cd', text: '#856404' },
      'APROVADA': { bg: '#d4edda', text: '#155724' },
      'NEGADA': { bg: '#f8d7da', text: '#721c24' },
    };
    const style = colors[status] || { bg: '#eee', text: '#333' };
    return (
      <View style={[styles.statusPill, { backgroundColor: style.bg }]}>
        <Text style={[styles.statusText, { color: style.text }]}>{status}</Text>
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.solicitanteNome}>{item.servidor?.pessoa?.nome}</Text>
        {renderStatus(item.status)}
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.infoText}><Text style={styles.bold}>Origem:</Text> {item.origem}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Destino:</Text> {item.destino}</Text>
        <Text style={styles.infoText}><Text style={styles.bold}>Data:</Text> {item.dataInicio}</Text>
      </View>

      <View style={styles.acoesContainer}>
        <TouchableOpacity style={styles.btnAcao} onPress={() => abrirVisualizar(item)}>
          <FontAwesome5 name="eye" size={18} color="#007bff" />
        </TouchableOpacity>

        {item.status === 'CRIADA' && (
          <>
            <TouchableOpacity style={styles.btnAcao} onPress={() => abrirEditar(item)}>
              <FontAwesome5 name="edit" size={18} color="#ffc107" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnAcao} onPress={() => handleEnviarParaAutorizacao(item)}>
              <FontAwesome5 name="paper-plane" size={18} color="#28a745" />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Solicitações</Text>
        <TouchableOpacity style={styles.btnNovo} onPress={abrirNovo}>
          <FontAwesome5 name="plus" size={16} color="#FFF" />
          <Text style={styles.btnNovoText}> Nova</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchArea}>
        <TextInput 
          style={styles.input}
          placeholder="Pesquisar solicitante..."
          value={filtroSolicitante}
          onChangeText={setFiltroSolicitante}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#10b981" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={solicitacoes.filter(sol => sol.servidor?.pessoa?.nome?.toLowerCase().includes(filtroSolicitante.toLowerCase()))}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma solicitação encontrada.</Text>}
        />
      )}

      {/* CORREÇÃO DOS ERROS DE PROPS DO TYPESCRIPT */}
      <SolicitacaoModal 
        visible={modalVisivel}
        mode={modoModal}
        solicitacaoToEdit={solicitacaoSelecionada}
        onClose={() => setModalVisivel(false)} 
        onSolicitacaoSaved={(msg) => {
          setModalVisivel(false);
          getSolicitacoes();
        }} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb', padding: 15 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  btnNovo: { backgroundColor: '#10b981', flexDirection: 'row', padding: 10, borderRadius: 8, alignItems: 'center' },
  btnNovoText: { color: '#FFF', fontWeight: 'bold' },
  searchArea: { backgroundColor: '#FFF', padding: 10, borderRadius: 10, marginBottom: 15 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 6, paddingHorizontal: 10 },
  card: { backgroundColor: '#FFF', borderRadius: 12, padding: 15, marginBottom: 12, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  solicitanteNome: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardBody: { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  infoText: { fontSize: 14, color: '#666', marginBottom: 4 },
  bold: { fontWeight: 'bold', color: '#444' },
  statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  statusText: { fontSize: 11, fontWeight: 'bold' },
  acoesContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  btnAcao: { marginLeft: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999' }
});