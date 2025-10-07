import axios, {AxiosResponse} from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Interfaces para el tipado de los datos
interface DatosRegistroUsuario {
    name: string;
    lastN: string;
    email: string;
    pass: string;
}

interface CredenciaslesSesion {
    email: string;
    pass: string;
}

interface RespuestaSesion {
    token: string;
    name: string;
    email: string;
}

const API_URL = 'http://localhost:3000/api';

const apiCliente = axios.create({
    baseURL : API_URL,
    headers: {
        'Content-Type':'application/json'
    }
});

// ++++++++++++++++++++++++++++++++++++++++++++++

// Registro 
export const registroUsuario = (datosUsuario: DatosRegistroUsuario) => {
    return apiCliente.post('/auth/register', datosUsuario);
};

// Inicio de Sesion
export const usuarioSesion = async (credenciales : CredenciaslesSesion) : Promise<AxiosResponse<RespuestaSesion>> => {
    try {
        const respuesta = await apiCliente.post<RespuestaSesion>('/auth/login', credenciales);

        if(respuesta.data.token){
            const token = respuesta.data.token
            await AsyncStorage.setItem('tokenUsuario', token);
        }
    } catch (error) {
        throw error;
    }
}