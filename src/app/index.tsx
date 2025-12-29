import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

export default function LoginGuarnice() {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        {/* Card Branco Central */}
        <View style={styles.card}>
          
          {/* Logo e Texto de Boas-vindas */}
          <View style={styles.header}>
            {/* Substitua o link abaixo pela sua imagem local ou logo real */}
            <Image 
              source={{ uri: 'https://img.icons8.com/color/96/truck.png' }} 
              style={styles.logo}
            />
            <Text style={styles.brandName}>GUARNICÊ</Text>
            <Text style={styles.brandSub}>FROTAS</Text>
            <Text style={styles.welcomeText}>Faça login para continuar</Text>
          </View>

          {/* Campos de Input */}
          <View style={styles.form}>
            <Text style={styles.label}>Email ou Login</Text>
            <TextInput
              style={styles.input}
              placeholder="admin"
              value={login}
              onChangeText={setLogin}
              autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="........"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />

            {/* Botão Entrar */}
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            {/* Rodapé do Card */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Esqueceu sua senha? Entre em contato com o administrador.
              </Text>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Fundo cinza claro da página
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 15,
    padding: 30,
    // Sombra para Android e iOS
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  brandName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A3A34', // Verde escuro da logo
    letterSpacing: 1,
  },
  brandSub: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A3A34',
    marginTop: -5,
  },
  welcomeText: {
    marginTop: 15,
    color: '#6B7280',
    fontSize: 14,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#EBF2FF', // Azul bem claro do input na imagem
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
    color: '#1F2937',
  },
  button: {
    backgroundColor: '#0061F2', // Azul vibrante do botão
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 20,
  },
  footerText: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    lineHeight: 18,
  },
});