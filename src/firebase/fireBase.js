import * as fireBase from 'firebase'

const config = {
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: "coding101-firestore.firebaseapp.com",
    databaseURL: "https://coding101-firestore.firebaseio.com",
    projectId: "coding101-firestore",
    storageBucket: "coding101-firestore.appspot.com",
    messagingSenderId: "387970813985",
    appId: "1:387970813985:web:e4faf3b98608b3a00ed360",
    measurementId: "G-RHZFJR420V"
}

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'http://localhost:3000/home',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

fireBase.initializeApp(config)

const dataBase = fireBase.firestore()
const googleAuthProvider = new fireBase.auth.GoogleAuthProvider()

export { fireBase, googleAuthProvider, actionCodeSettings, dataBase as default }