import React, { useState } from 'react';
import { 
  Modal, View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { enviarDados } from '../services/server'; // Sua API server.js
import { useAuth } from '../context/AuthContext'; // Para pegar o servidor logado

export default function SolicitacaoModal({ onClose, onSuccess }: any) {
  const { usuario } = useAuth() as any; // Pega dados do usuário logado
  
  // Estado do formulário baseado na Model Solicitacao.java
  const [form, setForm] = useState({
    origem: '',
    destino: '',
    dataInicio: '', // YYYY-MM-DD
    dataFim: '',    // YYYY-MM-DD
    horarioSaida: '',   // HH:mm:ss
    horarioChegada: '', // HH:mm:ss
    justificativa: '',
    quantPessoas: '1',
    bagagemLitros: '0'
  });

  const handleSalvar = async () => {
    // Validação básica
    if (!form.origem || !form.destino || !form.dataInicio) {
      Alert.alert("Aviso", "Por favor, preencha os campos obrigatórios.");
      return;
    }

    try {
      // Monta o objeto JSON exatamente como o Spring Boot espera
      const dadosSolicitacao = {
        ...form,
        quantPessoas: parseInt(form.quantPessoas),
        bagagemLitros: parseInt(form.bagagemLitros),
        status: 'CRIADA', // Status inicial
        // Vincula o ID do servidor logado ao campo fk_idservidor
        servidor: { id: usuario.servidorId } 
      };

      // Envia para o endpoint da sua Controller
      await enviarDados('/api/solicitacoes', 'POST', dadosSolicitacao);
      
      Alert.alert("Sucesso", "Solicitação cadastrada com sucesso!");
      onSuccess(); // Fecha modal e atualiza a lista
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao salvar solicitação no servidor.");
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Nova Solicitação</Text>
          
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Origem *</Text>
            <TextInput style={styles.input} value={form.origem} onChangeText={(v) => setForm({...form, origem: v})} placeholder="Ex: Seduc Sede" />

            <Text style={styles.label}>Destino *</Text>
            <TextInput style={styles.input} value={form.destino} onChangeText={(v) => setForm({...form, destino: v})} placeholder="Ex: Regional Imperatriz" />

            <View style={styles.row}>
              <View style={{flex: 1, marginRight: 5}}>
                <Text style={styles.label}>Data Início</Text>
                <TextInput style={styles.input} value={form.dataInicio} onChangeText={(v) => setForm({...form, dataInicio: v})} placeholder="AAAA-MM-DD" />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <Text style={styles.label}>Horário Saída</Text>
                <TextInput style={styles.input} value={form.horarioSaida} onChangeText={(v) => setForm({...form, horarioSaida: v})} placeholder="08:00:00" />
              </View>
            </View>

            <Text style={styles.label}>Justificativa</Text>
            <TextInput 
              style={[styles.input, {height: 80, textAlignVertical: 'top'}]} 
              multiline value={form.justificativa} 
              onChangeText={(v) => setForm({...form, justificativa: v})} 
              placeholder="Descreva o motivo da viagem..."
            />

            <View style={styles.row}>
              <View style={{flex: 1, marginRight: 5}}>
                <Text style={styles.label}>Qtd. Pessoas</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={form.quantPessoas} onChangeText={(v) => setForm({...form, quantPessoas: v})} />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <Text style={styles.label}>Bagagem (L)</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={form.bagagemLitros} onChangeText={(v) => setForm({...form, bagagemLitros: v})} />
              </View>
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.btnCancelar} onPress={onClose}>
              <Text style={styles.btnText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar}>
              <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalView: { 
    margin: 20, 
    backgroundColor: 'white', 
    borderRadius: 15, 
    padding: 20, 
    maxHeight: '80%',
    elevation: 5 
  },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#4b5563', marginBottom: 5 },
  input: { 
    borderWidth: 1, 
    borderColor: '#d1d5db', 
    borderRadius: 8, 
    padding: 10, 
    marginBottom: 15, 
    fontSize: 16,
    backgroundColor: '#f9fafb'
  },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  buttonContainer: { flexDirection: 'row', marginTop: 20, borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
  btnSalvar: { backgroundColor: '#10b981', padding: 15, borderRadius: 10, flex: 1, marginLeft: 5, alignItems: 'center' },
  btnCancelar: { backgroundColor: '#ef4444', padding: 15, borderRadius: 10, flex: 1, marginRight: 5, alignItems: 'center' },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});