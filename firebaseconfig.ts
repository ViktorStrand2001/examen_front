import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB1HUaLvuTONOzjNub3VqvFv8ey_OkvziQ",
  authDomain: "examensarbete-ad14a.firebaseapp.com",
  projectId: "examensarbete-ad14a",
  storageBucket: "examensarbete-ad14a.appspot.com",
  messagingSenderId: "537129523995",
  appId: "1:537129523995:web:58b9ff15200c486636d1be",
  measurementId: "G-WDVSRT9GJ8",
}

const app = initializeApp(firebaseConfig)
const imgStorage = getStorage()
const textStorage = getFirestore()

let analytics = null
if (typeof window !== "undefined") {
  import("firebase/analytics")
    .then(({ getAnalytics }) => {
      analytics = getAnalytics(app)
    })
    .catch((error) => {
      console.error("Error initializing Firebase Analytics:", error)
    })
}

export { imgStorage, textStorage, analytics }