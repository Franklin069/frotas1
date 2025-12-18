import { StyleSheet } from "react-native";
import { colors } from "../../styles/colors";


export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.inputBackground,
    padding: 12,
    margin: 4,
    borderRadius: 8,
    alignItems: "center",
  },
  pressionado: {
    opacity: 0.7,
  },
  texto: {
    color: colors.text,
    fontSize: 16,
  },
});