import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { buscarDados, enviarDados } from '../../services/server';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Autorizacao = () => {
    const [pendentes, setPendentes] = useState([]);
    // CORREÇÃO: Justificativas agora são um objeto onde a chave é o ID da tramitação
    const [justificativas, setJustificativas] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPendentes();
    }, []);

    const carregarPendentes = async () => {
        try {
            setLoading(true);
            const data = await buscarDados('/api/tramitacao/pendentes');
            setPendentes(data || []);
        } catch (error) {
            console.error("Erro ao carregar autorizações", error);
            // Se cair aqui e te jogar para o login, verifique o status 401 no console.log
            Alert.alert("Erro", "Não foi possível carregar as autorizações.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateJustificativa = (id, text) => {
        setJustificativas(prev => ({ ...prev, [id]: text }));
    };

    const handleDecisao = async (idTramitacao, parecer) => {
        const justificativaAtual = justificativas[idTramitacao] || '';

        if (parecer === 'REJEITADO' && !justificativaAtual.trim()) {
            Alert.alert("Aviso", "A justificativa é obrigatória para rejeição.");
            return;
        }

        try {
            await enviarDados(`/api/tramitacao/${idTramitacao}/decisao`, 'PUT', {
                parecer,
                justificativa: justificativaAtual
            });
            
            // Limpa a justificativa específica
            const novasJustificativas = { ...justificativas };
            delete novasJustificativas[idTramitacao];
            setJustificativas(novasJustificativas);

            Alert.alert("Sucesso", `Solicitação processada com sucesso.`);
            carregarPendentes();
        } catch (error) {
            Alert.alert("Erro", "Erro ao processar decisão.");
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#38a169" />
                <Text style={{marginTop: 10}}>Carregando autorizações...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
                <View style={styles.pageHeader}>
                    <Text style={styles.title}>✅ Autorizações Pendentes</Text>
                    <Text style={styles.subtitle}>Analise e aprove as solicitações pendentes</Text>
                </View>

                {pendentes.length === 0 ? (
                    <View style={styles.emptyStateCard}>
                        <View style={styles.emptyIconWrapper}>
                            <MaterialCommunityIcons name="check-bold" size={40} color="white" />
                        </View>
                        <Text style={styles.emptyTitle}>Nenhuma solicitação pendente</Text>
                        <Text style={styles.emptySubtitle}>Todas as solicitações foram processadas</Text>
                    </View>
                ) : (
                    pendentes.map(tram => (
                        <View key={tram.id} style={styles.autorizacaoCard}>
                            <View style={styles.cardInfoGrid}>
                                <Text style={styles.infoText}>
                                    <Text style={styles.bold}>Solicitante:</Text> {tram.solicitacao?.servidor?.pessoa?.nome || 'N/A'}
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.bold}>Rota:</Text> {tram.solicitacao?.origem} → {tram.solicitacao?.destino}
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.bold}>Data:</Text> {tram.solicitacao?.dataInicio} a {tram.solicitacao?.dataFim}
                                </Text>
                                <Text style={styles.infoText}>
                                    <Text style={styles.bold}>Motivo:</Text> {tram.solicitacao?.justificativa}
                                </Text>
                            </View>

                            <View style={styles.justificativaSection}>
                                <Text style={styles.label}>Justificativa (obrigatória para rejeição)</Text>
                                <TextInput
                                    style={styles.textArea}
                                    placeholder="Motivo da decisão..."
                                    value={justificativas[tram.id] || ''}
                                    onChangeText={(text) => handleUpdateJustificativa(tram.id, text)}
                                    multiline
                                    numberOfLines={3}
                                />
                            </View>

                            <View style={styles.cardActions}>
                                <TouchableOpacity 
                                    style={[styles.btn, styles.btnAprovar]} 
                                    onPress={() => handleDecisao(tram.id, 'AUTORIZADO')}
                                >
                                    <MaterialCommunityIcons name="check" size={20} color="white" />
                                    <Text style={styles.btnText}>Aprovar</Text>
                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={[styles.btn, styles.btnRejeitar]} 
                                    onPress={() => handleDecisao(tram.id, 'REJEITADO')}
                                >
                                    <MaterialCommunityIcons name="close" size={20} color="white" />
                                    <Text style={styles.btnText}>Rejeitar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

// ... Mantenha seus estilos (StyleSheet) originais abaixo

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageHeader: {
        marginBottom: 25,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    autorizacaoCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    cardInfoGrid: {
        marginBottom: 15,
    },
    infoText: {
        fontSize: 14,
        color: '#2d3748',
        marginBottom: 6,
        lineHeight: 20,
    },
    bold: {
        fontWeight: 'bold',
    },
    justificativaSection: {
        marginTop: 10,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#4a5568',
        marginBottom: 5,
    },
    textArea: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cbd5e0',
        borderRadius: 8,
        padding: 10,
        height: 70,
        textAlignVertical: 'top', // Necessário para Android em multiline
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 10,
    },
    btn: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnAprovar: {
        backgroundColor: '#38a169',
    },
    btnRejeitar: {
        backgroundColor: '#e53e3e',
    },
    emptyStateCard: {
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 50,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#eef2f6',
        elevation: 2,
    },
    emptyIconWrapper: {
        backgroundColor: '#81c784',
        width: 70,
        height: 70,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 5,
    },
    emptySubtitle: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

export default Autorizacao;