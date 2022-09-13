import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyBxIrfcQoJpPwR6rfeMKotWWEYfYFCuHxw",
    authDomain: "saviya-clothing-db.firebaseapp.com",
    projectId: "saviya-clothing-db",
    storageBucket: "saviya-clothing-db.appspot.com",
    messagingSenderId: "445012002679",
    appId: "1:445012002679:web:18952087d9253b27a58372"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})



export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()


/**
 * addCollectionsAndDocuments should run only ONCE just to add data to DB
 */

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {

    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object)
    });

    await batch.commit()
    console.log('DONE')
}


export const getCollectionsAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
        const {title, items} =docSnapshot.data();
        acc[title.toLowerCase()]= items;
        return acc;
    },{})

    return categoryMap;

}


export const createUserDocumentFromAuth = async (userAuth, additionalInfo) => {
    const userDocRef = doc(db, 'user', userAuth.uid)
    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        } catch (error) {
            console.log("Error creating user", error)
        }
    }
}


export const createUserAuthWithEmaiAndPassword = async (email, password) => {
    if (!email || !password) return

    return createUserWithEmailAndPassword(auth, email, password)
}


export const signInAuthWithEmaiAndPassword = async (email, password) => {
    if (!email || !password) return

    return signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => {
    await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth, callback)
}

