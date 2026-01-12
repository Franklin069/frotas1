import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { router } from "expo-router";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function ProfileMenu({ visible, onClose }: Props) {
  const usuario = {
    nome: "Franklin Araújo",
  };

  function handleLogout() {
    onClose();
    router.replace("/login");
  }

  return (
    <Modal transparent visible={visible} animationType="fade">
      {/* Fundo escuro clicável */}
      <Pressable style={styles.overlay} onPress={onClose} />

      {/* Menu */}
      <View style={styles.menu}>
        <Text style={styles.name}>{usuario.nome}</Text>

        <Pressable style={styles.item}>
          <Text style={styles.itemText}>Meus dados</Text>
        </Pressable>

        <Pressable style={styles.item} onPress={handleLogout}>
          <Text style={[styles.itemText, styles.logout]}>Sair</Text>
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 16,
    width: 200,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 6,
    paddingVertical: 8,
  },
  name: {
    fontWeight: "bold",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  item: {
    padding: 12,
  },
  itemText: {
    fontSize: 16,
  },
  logout: {
    color: "red",
  },
});
