import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const obterUrlApi = (endpoint) => {
    // Seu IP atualizado com a porta do Spring Boot
    const urlApi = 'http://10.64.76.243:8080';
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${urlApi}${cleanEndpoint}`;
};

// Função auxiliar para injetar o token (Ajustada para Mobile)
const obterCabecalhos = async () => {
    // No celular usamos AsyncStorage com await
    const token = await AsyncStorage.getItem('@GuarniceFrota:token');
    const cabecalhos = {
        'Content-Type': 'application/json',
    };

    if (token) {
        cabecalhos['Authorization'] = `Bearer ${token}`;
    }

    return cabecalhos;
};

// Função para buscar dados (GET)
export const buscarDados = async (endpoint) => {
    try {
        const headers = await obterCabecalhos(); // Aguarda os headers
        const resposta = await fetch(obterUrlApi(endpoint), {
            method: 'GET',
            headers: headers
        });

        if (resposta.status === 401 || resposta.status === 403) {
            // No Mobile usamos o router do Expo para redirecionar
            router.replace('/login');
            return;
        }

        if (!resposta.ok) {
            throw new Error(`Erro HTTP! status: ${resposta.status}`);
        }
        return await resposta.json();
    } catch (erro) {
        console.error(`Não foi possível buscar dados de ${endpoint}:`, erro);
        throw erro;
    }
};

// Envio de dados (POST, PUT, DELETE)
export const enviarDados = async (endpoint, metodo = 'POST', dados) => {
    try {
        const url = obterUrlApi(endpoint);
        const headers = await obterCabecalhos(); // Aguarda os headers
        const resposta = await fetch(url, {
            method: metodo,
            headers: headers,
            body: dados ? JSON.stringify(dados) : null,
        });

        if (resposta.status === 401 || resposta.status === 403) {
            router.replace('/login');
            return;
        }

        if (!resposta.ok) {
            const corpoErro = await resposta.text();
            throw new Error(`Erro HTTP! status: ${resposta.status}. Detalhes: ${corpoErro}`);
        }
        
        const tipoConteudo = resposta.headers.get("content-type");
        if (tipoConteudo && tipoConteudo.includes("application/json")) {
            return await resposta.json();
        } else {
            return resposta; 
        }

    } catch (erro) {
        console.error(`Não foi possível enviar dados para ${endpoint}:`, erro);
        throw erro;
    }
};