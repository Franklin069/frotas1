import {StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from '../components/button';

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Pagina Inicial</Text>
      <StatusBar style="dark" />
      <Button title="Clique aqui" onPress={() => console.log("Botão pressionado")} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})
