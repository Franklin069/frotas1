import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons'; // Ícones nativos do Expo
import { enviarDados } from '../services/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'entrar' | 'solicitar'>('entrar');
  const [carregando, setCarregando] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    matricula: ''
  });

  const handleLogin = async () => {
    if (!formData.email || !formData.senha) {
      Alert.alert('Erro', 'Preencha e-mail e senha.');
      return;
    }

    try {
      setCarregando(true);
      const resposta = await enviarDados('/api/autenticacao/login', 'POST', {
        email: formData.email,
        senha: formData.senha
      });

      if (resposta && resposta.token) {
        await AsyncStorage.setItem('@GuarniceFrota:token', resposta.token);
        router.replace('/(tabs)/dashboard');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha na conexão com o servidor.');
    } finally {
      setCarregando(false);
    }
  };

  const handleSolicitar = () => {
    Alert.alert("Sucesso", "Solicitação enviada! Aguarde aprovação.");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={require('../assets/images/Logo.oficial.png')} style={styles.logo} />
        <Text style={styles.title}>Guarnicê Frotas</Text>
        
        {/* TAB CONTAINER */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'entrar' && styles.activeTab]}
            onPress={() => setActiveTab('entrar')}
          >
            <Text style={[styles.tabText, activeTab === 'entrar' && styles.activeTabText]}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabBtn, activeTab === 'solicitar' && styles.activeTab]}
            onPress={() => setActiveTab('solicitar')}
          >
            <Text style={[styles.tabText, activeTab === 'solicitar' && styles.activeTabText]}>Solicitar</Text>
          </TouchableOpacity>
        </View>

        {/* FORMULÁRIO */}
        <View style={styles.form}>
          {activeTab === 'solicitar' && (
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              onChangeText={(txt) => setFormData({...formData, nome: txt})}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(txt) => setFormData({...formData, email: txt})}
          />

          {activeTab === 'solicitar' && (
            <TextInput
              style={styles.input}
              placeholder="Matrícula"
              onChangeText={(txt) => setFormData({...formData, matricula: txt})}
            />
          )}

          {activeTab === 'entrar' && (
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={(txt) => setFormData({...formData, senha: txt})}
            />
          )}

          <TouchableOpacity 
            style={styles.button} 
            onPress={activeTab === 'entrar' ? handleLogin : handleSolicitar}
            disabled={carregando}
          >
            {carregando ? <ActivityIndicator color="#FFF" /> : (
              <Text style={styles.buttonText}>
                {activeTab === 'entrar' ? 'Acessar Sistema' : 'Enviar Solicitação'}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#f0f2f5', justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#FFF', borderRadius: 15, padding: 20, elevation: 5 },
  logo: { width: 100, height: 100, alignSelf: 'center', marginBottom: 10, resizeMode: 'contain' },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#333', marginBottom: 20 },
  tabContainer: { flexDirection: 'row', marginBottom: 20, backgroundColor: '#eee', borderRadius: 10, padding: 5 },
  tabBtn: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  activeTab: { backgroundColor: '#0061F2' },
  tabText: { color: '#666', fontWeight: 'bold' },
  activeTabText: { color: '#FFF' },
  form: { marginTop: 10 },
  input: { height: 50, backgroundColor: '#f9f9f9', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  button: { height: 50, backgroundColor: '#0061F2', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});