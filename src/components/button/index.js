import { Pressable, Text, StyleSheet } from "react-native";
import { styles } from "./styles";

export function Button({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressionado,
      ]}
    >
      <Text style={styles.texto}>{title}</Text>
    </Pressable>
  );
}


