import {initializeApp} from "firebase/app";
import {getAuth, onAuthStateChanged, signInWithRedirect, GoogleAuthProvider} from "firebase/auth";
import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import {
    getFirestore,
    collection,
    CollectionReference,
    onSnapshot,
    // query,
    // where,
    // Query,
    setDoc,
    doc,
    // addDoc,
    getDoc,
    Timestamp
} from "firebase/firestore"
import {getAnalytics} from "firebase/analytics";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button" onclick="location.href='../pages/template/'">Login</button>
    </div>
    <p class="read-the-docs">
      Firebase Data in Browser console page
    </p>
  </div>
`

const firebaseConfig = {
    apiKey: "AIzaSyCVj-HTDHOy1UrFDP18kaXMPeCmAUxmZBI",
    authDomain: "librarybar-56ac7.firebaseapp.com",
    databaseURL: "https://librarybar-56ac7-default-rtdb.firebaseio.com",
    projectId: "librarybar-56ac7",
    storageBucket: "librarybar-56ac7.appspot.com",
    messagingSenderId: "1036473997162",
    appId: "1:1036473997162:web:d03140734d4a305571f713",
    measurementId: "G-SV66Q7SK19"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Variable
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
// const ul = document.querySelector('ul');
// const bookshelfDiv = document.getElementById('bookshelf');
// const feedDiv = document.getElementById('feed');
// const settingsDiv = document.getElementById('settings');

console.log(analytics);

const button = document.querySelector('button');
button?.addEventListener('click', () => {
    signInWithRedirect(auth, new GoogleAuthProvider()).then(r => console.log("Google Auth Success!", r));
});


onAuthStateChanged(auth, async user => {
    if (user == null) {
        return;
    }

    // console.log(user);
    console.log("User UID: ", user);

    // Get Collection
    // TODO: when user not exist => register
    const {uid} = user;
    // const exist = doc(db, `users/${uid}`);


    // bookshelf collection
    const bookshelfCol = collection(db, `users/${uid}/Bookshelf`);
    // @ts-ignore
    createEachStream(bookshelfCol);

    // feed collection
    const feedCol = collection(db, `users/${uid}/Feed`);
    // @ts-ignore
    createEachStream(feedCol);

    // settings collection
    const settingsCol = collection(db, `users/${uid}/Settings`);
    // @ts-ignore
    createEachStream(settingsCol);

    // Query in Firestore
    // const userQuery = query(
    //     userCol,
    //     where('readBooks', '>', 5)
    // );
    // createQueryStream(userQuery);

    // Update Firestore Doc
    const profileDoc = doc(db, `users/${uid}`);
    const docSnap = await getDoc(profileDoc);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No user document!");
        // const dbRef = collection(db, "users");

        // Account Info setup
        await setDoc(doc(db, "users", uid), {
            name: user.displayName,
            totalReadbooks: 0,
            totalReadtime: 0,
            joinDate: Timestamp.now(),
            birth: Timestamp.now(),
            achievement: [],
            preference: {
                book: [],
                magazine: []
            }
        }).then(e => {
            console.log("successful add user data!", e);
        }).catch(e => {
            console.log(e);
        });

        // Settings Collection setup
        await setDoc(doc(db, "users", uid, "Settings", "readingSet"), {
            background: "ffffff",
            font: "000000",
            fontfamily: "serif",
            speed: 1
        }).then(e => {
            console.log("successful add readingSet data!", e);
        }).catch(e => {
            console.log(e);
        });

        const empty = {};
        const emptyBook = {
            page: 0,
            rate: 0.0,
            review: "",
            reviewDate: Timestamp.now()
        }

        const firstFeed = {
            content: "歡迎 " + user.displayName + " 加入 Library Bar",
            like: 0,
            readtime: 0,
            time: Timestamp.now(),
            comment: []
        }

        await setDoc(doc(db, "users", uid, "Settings", "storeConnect"), empty, {merge: true});
        await setDoc(doc(db, "users", uid, "Bookshelf", "bookID"), emptyBook, {merge: true});
        await setDoc(doc(db, "users", uid, "Feed", Timestamp.now().seconds.toString()), firstFeed, {merge: true});

        // console.log("Document written with ID: ", docRef.id);
    }

    // 更新資料 (用 updateDoc 也可以拉 ^^)
    // setDoc(profileDoc, {
    //     name: 'HHHAOOO',
    //     readBooks: 123
    // }, {merge: true});

    // 增加資料
    // addDoc(userCol, {
    //     test: '123456'
    // });

});

function createEachStream(ref: CollectionReference) {
    return onSnapshot(ref, snapshot => {
        const data = snapshot.docs.map(d => d.data());

        data.forEach(d => {
            console.log(d);
        });
    });
}


// function createStream(ref: CollectionReference) {
//     return onSnapshot(ref, snapshot => {
//         const profile = snapshot.docs.map(d => d.data());
//
//         // sync with web ui
//         profile.forEach(data => {
//             const li = document.createElement("li");
//             li.textContent = `${data.name} - ${data.mail} - 看了 ${data.readBooks} 本書`;
//             ul?.appendChild(li);
//             console.log(li);
//         });
//     });
// }

// function createQueryStream(ref: Query) {
//     return onSnapshot(ref, snapshot => {
//         const profile = snapshot.docs.map(d => d.data());
//
//         // sync with web ui
//         profile.forEach(data => {
//             const li = document.createElement("li");
//             li.textContent = `${data.name} - ${data.mail}`;
//             ul?.appendChild(li);
//             console.log(li);
//         });
//     });
// }