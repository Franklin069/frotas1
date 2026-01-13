import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Keyboard, // Importado para monitorar o teclado
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { enviarDados } from '../services/server';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [tecladoVisivel, setTecladoVisivel] = useState(false); // Estado para o teclado
  
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  // Monitora se o teclado está aberto ou fechado
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setTecladoVisivel(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setTecladoVisivel(false));

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <Image 
              source={require('../assets/images/Logo.oficial.png')} 
              style={styles.logo} 
            />
            
            <Text style={styles.title}>Guarnicê Frotas</Text>
            <Text style={styles.subtitle}>Acesso ao Painel Administrativo</Text>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#94a3b8"
                  onChangeText={(txt) => setFormData({...formData, email: txt})}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  secureTextEntry
                  placeholderTextColor="#94a3b8"
                  onChangeText={(txt) => setFormData({...formData, senha: txt})}
                />
              </View>

              <TouchableOpacity 
                style={styles.button} 
                onPress={handleLogin}
                disabled={carregando}
              >
                {carregando ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Acessar Sistema</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* O RODAPÉ SÓ APARECE SE O TECLADO ESTIVER FECHADO */}
        {!tecladoVisivel && (
          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2026 Guarnicê Frotas - SEDUC</Text>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  innerContainer: { paddingHorizontal: 30, paddingBottom: 20 },
  logo: { width: 140, height: 140, alignSelf: 'center', marginBottom: 20, resizeMode: 'contain' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#0f172a' },
  subtitle: { fontSize: 16, textAlign: 'center', color: '#64748b', marginBottom: 40 },
  form: { width: '100%' },
  inputContainer: { 
    backgroundColor: '#FFF', 
    borderRadius: 12, 
    marginBottom: 15, 
    borderWidth: 1, 
    borderColor: '#e2e8f0',
    elevation: 2 
  },
  input: { height: 55, paddingHorizontal: 20, fontSize: 16, color: '#1e293b' },
  button: { 
    height: 55, 
    backgroundColor: '#0061F2', 
    borderRadius: 12, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  footer: { 
    paddingVertical: 20, 
    alignItems: 'center', 
    backgroundColor: '#f8fafc' 
  },
  footerText: { fontSize: 12, color: '#94a3b8' }
});