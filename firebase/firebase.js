import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import firebaseConfig from './config';

class Firebase {
    constructor() {
        const app = initializeApp(firebaseConfig)
        this.auth = getAuth(app);
        this.db = getFirestore(app);
    }

    // Registra un usuario
    async registrar(nombre, email, password) {
        try {
            const nuevoUsuario = await createUserWithEmailAndPassword(
                this.auth,
                email,
                password
            );
            return await nuevoUsuario.user.updateProfile.displayName({
                displayName: name,
            })

        } catch (error) {
            console.error(error);
        }



        return await nuevoUsuario.user.updateProfile({
            displayName: nombre
        })
    }

    // Inicia sesión del usuario
    async login(email, password) {
        return signInWithEmailAndPassword(
                this.auth,
                email,
                password
                )
    }

    // Cierra la sesión del usuario
    async cerrarSesion() {
        await signOut(this.auth);
    }
}

const firebase = new Firebase();
export default firebase;