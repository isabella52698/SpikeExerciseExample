import Firebase from 'firebase';
const config = {
    apiKey: "AIzaSyAVjuqKRJ1iv85ayYQ5UsbC4WuICq2BAWE",
    authDomain: "spikeexercise-dc78e.firebaseapp.com",
    databaseURL: "https://spikeexercise-dc78e.firebaseio.com",
    projectId: "spikeexercise-dc78e",
    storageBucket: "spikeexercise-dc78e.appspot.com",
    messagingSenderId: "672384743425",
    appId: "1:672384743425:web:20fbfe9cb53bdc34a22800",
    measurementId: "G-10ZMZ3ZGTS"
};
let app = Firebase.initializeApp(config);
export const db = app.database();