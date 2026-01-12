import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// CORREÇÃO: Importando do seu arquivo server.js dentro de services
import { enviarDados } from '../services/server'; 

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        const carregarDadosSalvos = async () => {
            try {
                // No Mobile usamos AsyncStorage (assíncrono) em vez de localStorage
                const usuarioSalvo = await AsyncStorage.getItem('@GuarniceFrota:usuario');
                if (usuarioSalvo) {
                    setUsuario(JSON.parse(usuarioSalvo));
                }
            } catch (e) {
                console.error("Erro ao carregar dados:", e);
            } finally {
                setCarregando(false);
            }
        };
        carregarDadosSalvos();
    }, []);

    const realizarLogin = async (email, senha) => {
        try {
            // Usa o endpoint correto que você já tem no Back-end
            const resposta = await enviarDados('/api/autenticacao/login', 'POST', { email, senha });
            
            const { token, nome, perfil, servidorId } = resposta;
            const dadosUsuario = { nome, perfil, servidorId };

            // Salva os dados no celular para não precisar logar toda hora
            await AsyncStorage.setItem('@GuarniceFrota:token', token);
            await AsyncStorage.setItem('@GuarniceFrota:usuario', JSON.stringify(dadosUsuario));
            
            setUsuario(dadosUsuario);
            return { sucesso: true };
        } catch (erro) {
            // Se cair aqui, o erro pode ser "Credenciais Inválidas" vindo do Java
            return { sucesso: false, mensagem: "E-mail ou senha inválidos." };
        }
    };

    const realizarLogout = useCallback(async () => {
        await AsyncStorage.removeItem('@GuarniceFrota:token');
        await AsyncStorage.removeItem('@GuarniceFrota:usuario');
        setUsuario(null);
    }, []);

    return (
        <AuthContext.Provider value={{ 
            logado: !!usuario, 
            usuario, 
            realizarLogin, 
            realizarLogout, 
            carregando 
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);