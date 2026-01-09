import { useEffect } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Drawer } from "expo-router/drawer";
import { router } from "expo-router";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

SplashScreen.preventAutoHideAsync();



function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>FROTAS</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function LayoutWithBottomBar() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <View style={styles.app}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            headerStyle: { backgroundColor: "#28a745" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
            headerShadowVisible: false,
            drawerActiveTintColor: "#28a745", 
            drawerInactiveTintColor: "#333",
            headerRight: () => (
              <Pressable
                onPress={() => router.push("/perfil")}
                style={{ marginRight: 16 }}
              >
                <Ionicons name="person-circle-outline" size={30} color="#fff" />
              </Pressable>
            ),
          }}
        >
          {/* 1. HOME NO TOPO */}
          <Drawer.Screen 
            name="home" 
            options={{ 
              title: "Home",
              drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />
            }} 
          />

          {/* 2. DASHBOARD ABAIXO DA HOME */}
          <Drawer.Screen 
            name="dashboard" 
            options={{ 
              title: "Dashboard",
              drawerIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} />
            }} 
          />

          {/* TELAS OCULTAS DO MENU (CONFIGURAÇÃO TÉCNICA) */}
          <Drawer.Screen
            name="login"
            options={{
              headerShown: false,
              swipeEnabled: false,
              drawerItemStyle: { display: "none" },
            }}
          />

          {/* OCULTANDO O 'INDEX' PARA EVITAR O ERRO DE VOLTAR AO LOGIN */}
          <Drawer.Screen 
            name="index" 
            options={{ 
              drawerItemStyle: { display: "none" },
            }} 
          />

          {/* TELAS DE OPERAÇÃO VISÍVEIS */}
          <Drawer.Screen 
            name="solicitacoes" 
            options={{ 
              title: "Solicitações",
              drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />
            }} 
          />
          <Drawer.Screen 
            name="autorizacoes" 
            options={{ 
              title: "Autorizações",
              drawerIcon: ({ color, size }) => <Ionicons name="checkmark-circle-outline" size={size} color={color} />
            }} 
          />
          <Drawer.Screen 
            name="viagens" 
            options={{ 
              title: "Viagens",
              drawerIcon: ({ color, size }) => <Ionicons name="car-outline" size={size} color={color} />
            }} 
          />

          <Drawer.Screen
            name="perfil"
            options={{
              title: "Meu Perfil",
              drawerItemStyle: { display: "none" },
            }}
          />
        </Drawer>
      </View>

      <View style={[styles.bottomBar, { height: insets.bottom + 12 }]} />
    </View>
  );
}

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
      
      // FORÇA IR PARA O LOGIN AO ABRIR O APP
      router.replace("/login"); 
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
  root: { flex: 1, backgroundColor: "#000" },
  app: { flex: 1, backgroundColor: "#f8f9fa" },
  bottomBar: { backgroundColor: "#000" },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 10,
    marginTop: 10,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#28a745", 
  },
});