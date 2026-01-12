import { useEffect } from "react";
import { View, StyleSheet, Pressable, Image } from "react-native";
import { Stack, router } from "expo-router";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";

SplashScreen.preventAutoHideAsync();

function LayoutWithBars() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={styles.app}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: "#28a745" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerTitle: () => (
              <Image 
                source={require("../assets/images/Logo.oficial.png")} 
                style={{ width: 120, height: 40 }} 
                resizeMode="contain" 
              />
            ),
            headerRight: () => (
              <Pressable onPress={() => router.push("/perfil")} style={{ marginRight: 16 }}>
                <Ionicons name="person-circle-outline" size={30} color="#fff" />
              </Pressable>
            ),
          }}
        >
          {/* CONFIGURAÇÃO DO GRUPO TABS - Impedindo a seta de aparecer */}
          <Stack.Screen 
            name="(tabs)" 
            options={{ 
              headerShown: true,
              headerLeft: () => null, // Remove o conteúdo do lado esquerdo
              headerBackVisible: false, // Desabilita a seta automática do Stack
              gestureEnabled: false, // Opcional: impede de voltar arrastando o dedo (iOS)
            }} 
          />
          
          <Stack.Screen name="login" options={{ headerShown: false }} />
          
          {/* TELA DE PERFIL - Seta branca customizada no componente Perfil */}
          <Stack.Screen 
            name="perfil" 
            options={{ 
              title: "Meu Perfil",
              // Deixamos a configuração da seta para o Stack.Screen que está dentro do perfil.tsx
            }} 
          />
          
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </View>

      {/* BARRA PRETA DO SISTEMA */}
      <View style={[styles.bottomBar, { height: insets.bottom + 12 }]} />
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
      router.replace("/login"); 
    };
    hideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <LayoutWithBars />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#000" },
  app: { flex: 1, backgroundColor: "#f8f9fa" },
  bottomBar: { backgroundColor: "#000" },
});