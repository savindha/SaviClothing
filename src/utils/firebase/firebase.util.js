import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBxIrfcQoJpPwR6rfeMKotWWEYfYFCuHxw",
    authDomain: "saviya-clothing-db.firebaseapp.com",
    projectId: "saviya-clothing-db",
    storageBucket: "saviya-clothing-db.appspot.com",
    messagingSenderId: "445012002679",
    appId: "1:445012002679:web:18952087d9253b27a58372"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'user', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName, 
                email, 
                createdAt
            })
        } catch (error) {
            console.log("Error creating user", error)
        }
    }
}