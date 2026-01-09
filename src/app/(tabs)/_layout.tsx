import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // O cabeçalho verde com a logo já é fornecido pelo layout pai (Stack)
        headerShown: false,
        tabBarActiveTintColor: "#28a745",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: "#FFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      {/* 1. HOME: Configurada para existir no grupo, mas invisível no menu inferior */}
      <Tabs.Screen
        name="home"
        options={{
          href: null, // Remove o ícone da barra inferior
          title: "Início",
        }}
      />

      {/* 2. DASHBOARD */}
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Painel",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "stats-chart" : "stats-chart-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 3. SOLICITAÇÕES */}
      <Tabs.Screen
        name="solicitacoes"
        options={{
          title: "Solicitações",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "document-text" : "document-text-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 4. AUTORIZAÇÕES */}
      <Tabs.Screen
        name="autorizacoes"
        options={{
          title: "Autorizações",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "checkmark-circle" : "checkmark-circle-outline"} size={24} color={color} />
          ),
        }}
      />

      {/* 5. VIAGENS */}
      <Tabs.Screen
        name="viagens"
        options={{
          title: "Viagens",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "car" : "car-outline"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}