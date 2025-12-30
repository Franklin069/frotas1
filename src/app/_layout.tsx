import { useEffect } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";

// Impede que a Splash Screen suma automaticamente
SplashScreen.preventAutoHideAsync();

function LayoutWithBottomBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      {/* APP */}
      <View style={styles.app}>
        <Drawer
          screenOptions={{
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/perfil")}
                style={{ marginRight: 16 }}
              >
                <Ionicons
                  name="person-circle-outline"
                  size={30}
                  color="#000"
                />
              </Pressable>
            ),
          }}
        >
          {/* Tela de Login (oculta) */}
          <Drawer.Screen
            name="login"
            options={{
              headerShown: false,
              swipeEnabled: false,
              drawerItemStyle: { display: "none" },
            }}
          />

          {/* Telas do menu */}
          <Drawer.Screen name="index" options={{ title: "Início" }} />
          <Drawer.Screen name="dashboard" options={{ title: "Dashboard" }} />
          <Drawer.Screen name="solicitacoes" options={{ title: "Solicitações" }} />
          <Drawer.Screen name="autorizacoes" options={{ title: "Autorizações" }} />
          <Drawer.Screen name="viagens" options={{ title: "Viagens" }} />

          {/* Tela Perfil (não aparece no Drawer) */}
          <Drawer.Screen
            name="perfil"
            options={{
              title: "Meu Perfil",
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </View>

      {/* BARRA PRETA INFERIOR (barra do sistema Android) */}
      <View
        style={[
          styles.bottomBar,
          { height: insets.bottom + 12 },
        ]}
      />
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <SafeAreaProvider>
      <LayoutWithBottomBar />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  app: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  bottomBar: {
    backgroundColor: "#000",
  },
});
