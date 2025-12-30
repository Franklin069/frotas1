import { View, Text, StyleSheet, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";

export function CustomDrawer(props: any) {

  // Simulação de usuário logado
  const usuario = {
    nome: "Franklin Araújo",
    email: "franklin@email.com",
  };

  function handleLogout() {
    // Aqui depois você limpa token / AsyncStorage
    router.replace("/login");
  }

  return (
    <DrawerContentScrollView {...props}>

      {/* PERFIL */}
      <View style={styles.profile}>
        <Text style={styles.name}>{usuario.nome}</Text>
        <Text style={styles.email}>{usuario.email}</Text>
      </View>

      {/* ITENS DO MENU */}
      <DrawerItemList {...props} />

      {/* SAIR */}
      <Pressable style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profile: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  logout: {
    marginTop: 20,
    padding: 20,
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
});
