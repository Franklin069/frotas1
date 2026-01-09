import React, { useState } from 'react';
import { router } from "expo-router";
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert
} from 'react-native';

export default function LoginScreen({ navigation }: any) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  const handleEntrar = () => {
    // Esta linha abaixo define a regra de "quem pode entrar"
    if (login === 'admin' && senha === '1234') { 
        router.replace("/home");
    } else {
        Alert.alert('Erro', 'Usuário ou senha incorretos');
    }
 };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Cabeçalho Guarnicê */}
        <View style={styles.header}>
          <Image 
            source={require('../../assets/images/Logo.oficial.png')} // Verifique se o caminho está correto
            style={styles.logo}
            resizeMode="contain" // Isso garante que a logo não seja cortada
          />
          <Text style={styles.brandName}>GUARNICÊ</Text>
          <Text style={styles.brandSub}>FROTAS</Text>
          <Text style={styles.welcomeText}>Faça login para continuar</Text>
        </View>

        {/* Formulário - Ocupa a largura total com margens laterais */}
        <View style={styles.form}>
          <Text style={styles.label}>Email ou Login</Text>
          <TextInput
            style={styles.input}
            placeholder="admin"
            value={login}
            onChangeText={setLogin}
            autoCapitalize="none"
            placeholderTextColor="#9CA3AF"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="........"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#9CA3AF"
          />

          {/* Botão Entrar com a Navegação */}
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleEntrar}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Esqueceu sua senha? Entre em contato com o administrador.
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A3A34',
    letterSpacing: 2,
  },
  brandSub: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A3A34',
    marginTop: -5,
  },
  welcomeText: {
    marginTop: 20,
    color: '#6B7280',
    fontSize: 16,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#EBF2FF',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#D1E3FF',
  },
  button: {
    backgroundColor: '#0061F2',
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
    elevation: 4,
    shadowColor: '#0061F2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
  },
}); 