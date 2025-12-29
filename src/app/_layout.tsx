import { useEffect } from "react"; // Adicionado
import { Drawer } from "expo-router/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from 'expo-splash-screen'; // Adicionado

// Impede que a Splash Screen suma automaticamente antes do app carregar
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  useEffect(() => {
    // Função para controlar quanto tempo a Splash Screen fica na tela
    const hideSplash = async () => {
      // Espera 2 segundos (ou o tempo que você achar melhor)
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Esconde a Splash Screen
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <Drawer>
        {/* Tela de Login oculta do menu */}
        <Drawer.Screen
          name="login"
          options={{
            headerShown: false,
            swipeEnabled: false,
            drawerItemStyle: { display: "none" },
          }}
        />

        {/* Telas que aparecem no Menu de Gaveta */}
        <Drawer.Screen
          name="index"
          options={{ title: "Início" }}
        />

        <Drawer.Screen
          name="dashboard"
          options={{ title: "Dashboard" }}
        />

        <Drawer.Screen
          name="solicitacoes"
          options={{ title: "Solicitações" }}
        />

        <Drawer.Screen
          name="autorizacoes"
          options={{ title: "Autorizações" }}
        />

        <Drawer.Screen
          name="viagens"
          options={{ title: "Viagens" }}
        />
      </Drawer>
    </SafeAreaProvider>
  );
}