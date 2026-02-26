import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDaj4r9yjkYHAyivqkcI2eNiAHazipFkPg",
  authDomain: "voxledger-ca720.firebaseapp.com",
  projectId: "voxledger-ca720",
  storageBucket: "voxledger-ca720.firebasestorage.app",
  messagingSenderId: "412232880698",
  appId: "1:412232880698:web:d3a8682916001b3e389b03",
  measurementId: "G-LCW88MQ8RR"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)