import React, { useState, useEffect, useMemo } from 'react';
import { 
    StyleSheet, View, Text, TextInput, TouchableOpacity, 
    ScrollView, Modal, Alert, ActivityIndicator 
} from 'react-native';
import { enviarDados } from '../services/server';
import { useAuth } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons'; 

// 1. Definição da Interface para os dados da Solicitação
interface Solicitacao {
    id?: number;
    origem: string;
    destino: string;
    status: string;
    dataInicio: string;
    dataFim: string;
    horarioSaida: string;
    horarioChegada: string;
    quantPessoas: string | number;
    bagagemLitros: string | number;
    justificativa: string;
    servidor?: { id: number };
}

// 2. Definição das Props que o Modal recebe
interface ModalProps {
    visible: boolean;
    onClose: () => void;
    onSolicitacaoSaved: (message: string, type: 'success' | 'error') => void;
    solicitacaoToEdit?: Solicitacao | null;
    mode: 'view' | 'edit' | 'new';
}

const SolicitacaoModal: React.FC<ModalProps> = ({ visible, onClose, onSolicitacaoSaved, solicitacaoToEdit, mode }) => {
    // CORREÇÃO: Tipagem forçada para evitar o erro 'undefined' no TypeScript
    const { usuario } = useAuth() as { 
        usuario: { servidorId: number, nome: string } | null 
    };

    const isViewMode = mode === 'view';
    const isEditMode = mode === 'edit';
    const isNewMode = mode === 'new';
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [erroForm, setErroForm] = useState('');

    const initialFormData: Solicitacao = useMemo(() => ({
        origem: '',
        destino: '',
        status: 'CRIADA',
        dataInicio: '',
        dataFim: '',
        horarioSaida: '',
        horarioChegada: '',
        quantPessoas: '0',
        bagagemLitros: '0',
        justificativa: '',
        servidor: undefined
    }), []);

    const [formData, setFormData] = useState<Solicitacao>(initialFormData);

    useEffect(() => {
        if (solicitacaoToEdit && (isEditMode || isViewMode)) {
            setFormData({
                ...solicitacaoToEdit,
                quantPessoas: String(solicitacaoToEdit.quantPessoas || 0),
                bagagemLitros: String(solicitacaoToEdit.bagagemLitros || 0),
            });
        } else if (isNewMode) {
            setFormData(initialFormData);
        }
    }, [solicitacaoToEdit, mode, visible, initialFormData]);

    const handleChange = (id: keyof Solicitacao, value: string) => {
        if (isViewMode) return; 
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        // CORREÇÃO: Verificação de segurança para evitar erro de 'undefined'
        if (!usuario) {
            Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
            return;
        }

        if (!usuario.servidorId) {
            Alert.alert("Erro", "ID do servidor não encontrado nos dados do usuário.");
            return;
        }

        setIsSubmitting(true);
        setErroForm('');
        
        const dataToSend = { 
            ...formData,
            quantPessoas: Number(formData.quantPessoas),
            bagagemLitros: Number(formData.bagagemLitros),
            // CORREÇÃO: Garantindo o uso de servidorId (com I maiúsculo)
            servidor: isNewMode ? { id: usuario.servidorId } : formData.servidor
        };
        
        const method = isEditMode ? 'PUT' : 'POST';
        const url = isEditMode ? `/api/solicitacoes/${solicitacaoToEdit?.id}` : '/api/solicitacoes';

        try {
            await enviarDados(url, method, dataToSend);
            onSolicitacaoSaved(isEditMode ? "Atualizada!" : "Criada!", 'success');
            onClose();
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar solicitação. Verifique os dados.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent={true} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {isViewMode ? 'Detalhes' : isEditMode ? 'Editar' : 'Nova Solicitação'}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                           <MaterialIcons name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
                        <Text style={styles.label}>Origem</Text>
                        <TextInput 
                            style={[styles.input, isViewMode && styles.disabledInput]} 
                            value={formData.origem} 
                            onChangeText={(t) => handleChange('origem', t)}
                            editable={!isViewMode}
                            placeholder="Local de saída"
                        />

                        <Text style={styles.label}>Destino</Text>
                        <TextInput 
                            style={[styles.input, isViewMode && styles.disabledInput]} 
                            value={formData.destino} 
                            onChangeText={(t) => handleChange('destino', t)}
                            editable={!isViewMode}
                            placeholder="Local de destino"
                        />

                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Data Início</Text>
                                <TextInput 
                                    style={styles.input} 
                                    value={formData.dataInicio} 
                                    onChangeText={(t) => handleChange('dataInicio', t)}
                                    placeholder="AAAA-MM-DD"
                                    editable={!isViewMode}
                                />
                            </View>
                            <View style={{width: 10}} />
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Data Fim</Text>
                                <TextInput 
                                    style={styles.input} 
                                    value={formData.dataFim} 
                                    onChangeText={(t) => handleChange('dataFim', t)}
                                    placeholder="AAAA-MM-DD"
                                    editable={!isViewMode}
                                />
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Pessoas</Text>
                                <TextInput 
                                    style={styles.input} 
                                    value={formData.quantPessoas.toString()} 
                                    onChangeText={(t) => handleChange('quantPessoas', t)}
                                    keyboardType="numeric"
                                    editable={!isViewMode}
                                />
                            </View>
                            <View style={{width: 10}} />
                            <View style={styles.flex1}>
                                <Text style={styles.label}>Bagagem (L)</Text>
                                <TextInput 
                                    style={styles.input} 
                                    value={formData.bagagemLitros.toString()} 
                                    onChangeText={(t) => handleChange('bagagemLitros', t)}
                                    keyboardType="numeric"
                                    editable={!isViewMode}
                                />
                            </View>
                        </View>

                        <Text style={styles.label}>Justificativa</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea, isViewMode && styles.disabledInput]} 
                            value={formData.justificativa} 
                            onChangeText={(t) => handleChange('justificativa', t)}
                            multiline
                            numberOfLines={4}
                            editable={!isViewMode}
                        />
                        
                        <View style={{height: 20}} />
                    </ScrollView>

                    <View style={styles.footer}>
                         {!isViewMode && (
                            <TouchableOpacity 
                                style={[styles.btnSave, isSubmitting && { opacity: 0.7 }]} 
                                onPress={handleSubmit}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.btnTextSave}>SALVAR</Text>
                                )}
                            </TouchableOpacity>
                         )}
                         <TouchableOpacity style={styles.btnCancel} onPress={onClose}>
                            <Text>{isViewMode ? 'FECHAR' : 'CANCELAR'}</Text>
                         </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 },
    modalContent: { backgroundColor: '#fff', borderRadius: 12, maxHeight: '90%', overflow: 'hidden' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    title: { fontSize: 18, fontWeight: 'bold' },
    form: { padding: 15 },
    label: { fontWeight: 'bold', marginTop: 10, color: '#444' },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginTop: 5, fontSize: 16 },
    disabledInput: { backgroundColor: '#f5f5f5', color: '#888' },
    textArea: { height: 100, textAlignVertical: 'top' },
    row: { flexDirection: 'row' },
    flex1: { flex: 1 },
    footer: { padding: 15, borderTopWidth: 1, borderTopColor: '#eee' },
    btnSave: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    btnTextSave: { color: '#fff', fontWeight: 'bold' },
    btnCancel: { padding: 10, alignItems: 'center' }
});

export default SolicitacaoModal;