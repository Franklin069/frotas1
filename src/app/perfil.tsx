import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, Stack } from "expo-router"; 
import { Ionicons } from "@expo/vector-icons"; 

export default function Perfil() {
  return (
    <View style={styles.container}>
      {/* CONFIGURAÇÃO DO HEADER PARA VOLTAR ESPECIFICAMENTE PARA HOME */}
      <Stack.Screen 
        options={{
          headerTitle: "Meu Perfil",
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          headerLeft: () => (
            <Pressable 
              onPress={() => router.push("/home")} // Força a ida para a home
              style={({ pressed }) => ({
                marginLeft: 0,
                marginRight: 15,
                opacity: pressed ? 0.5 : 1 
              })}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }} 
      />

      {/* CABEÇALHO AMARELO CENTRALIZADO */}
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>FA</Text>
        </View>
        
        <Text style={styles.userName}>Franklin Araujo</Text>
        <Text style={styles.userEmail}>dellano.08@hotmail.com</Text>
      </View>

      {/* LISTA DE OPÇÕES */}
      <View style={styles.menuContainer}>
        <Pressable style={styles.item}>
          <View style={styles.itemLeft}>
            <Ionicons name="person-outline" size={22} color="#333" />
            <Text style={styles.text}>Meus dados</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </Pressable>

        <Pressable 
          style={styles.item} 
          onPress={() => router.replace("/login")}
        >
          <View style={styles.itemLeft}>
            <Ionicons name="log-out-outline" size={22} color="#dc3545" />
            <Text style={[styles.text, {color: '#dc3545'}]}>Sair</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#CCC" />
        </Pressable>
      </View>

      {/*<Text style={styles.footerText}>
        Você pode <Text style={styles.linkText}>cancelar sua conta</Text> quando quiser.
      </Text>*/}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    backgroundColor: "#FFDB00",
    paddingTop: 30,
    paddingBottom: 30,
    alignItems: "center",
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  userEmail: {
    fontSize: 14,
    color: "#444",
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EEE",
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  footerText: {
    textAlign: "center",
    padding: 20,
    color: "#999",
    fontSize: 13,
  },
  linkText: {
    color: "#3483fa",
  }
});