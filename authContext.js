import { createContext, useContext, useEffect, useState } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
import {doc, getDoc, setDoc} from 'firebase/firestore'

export const AuthContext = createContext(); // cria contexto para autenticação global

export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null); // armazena informações do usuário logado
    const [isAuthenticated, setIsAuthenticated] = useState(undefined); // estado de autenticação

    useEffect(()=>{
        // observer para mudanças de autenticação do Firebase
        const unsub = onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid); // atualiza os dados adicionais do usuário no firestore
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub; // boa prática: retorna função para limpar o observer
    },[]);

    const updateUserData = async (userId)=>{
        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            let data = docSnap.data();
            // atenção: está usando 'user' antigo no setUser — pode causar bugs se for async
            // melhoria: evitar sobrescrever com spread em estado que depende de async
            setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId})
        }
    }

    const login = async (email, password)=>{
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        }catch(e){
            // mensagens de erro personalizadas
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/invalid-credential)')) msg='E-mail ou Senha errada'
            return {success: false, msg};
        }
    }

    const logout = async ()=>{
        try{
            await signOut(auth);
            return {success: true}
        }catch(e){
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async (email, password, username, profileUrl)=>{
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);

            // boa prática: dados extras do usuário são armazenados no Firestore
            await setDoc(doc(db, "users", response?.user?.uid),{
                username, 
                profileUrl,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        }catch(e){
            let msg = e.message;
            if(msg.includes('(auth/invalid-email)')) msg='E-mail inválido'
            if(msg.includes('(auth/email-already-in-use)')) msg='Esse e-mail já está em uso'
            return {success: false, msg};
        }
    }

    return (
        // dá acesso ao contexto para toda a aplicação
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
    const value = useContext(AuthContext); // hook para acessar contexto

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }
    return value;
}

// melhoria: separar lógica de autenticação e Firestore em serviços reutilizáveis
// sugestão: usar useCallback para funções que não precisam ser recriadas