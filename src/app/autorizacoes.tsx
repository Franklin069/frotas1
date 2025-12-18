import { View, Text, StyleSheet } from "react-native";

export default function Autorizacoes() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Página de Autorizações</Text>
      {/* O conteúdo da página de autorizações virá aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
