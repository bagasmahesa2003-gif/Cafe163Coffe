import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFKDr4N3_Tupr4OSvTspbf5kYlQSjp3Ik",
  authDomain: "jajal1-5f6ec.firebaseapp.com",
  projectId: "jajal1-5f6ec",
  storageBucket: "jajal1-5f6ec.firebasestorage.app",
  messagingSenderId: "599691700436",
  appId: "1:599691700436:web:55abaa7cb28b78908cf341",
  measurementId: "G-3LQX5JQHFP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export async function kirimPesananKeAdmin(namaPelanggan: string, namaMenu: string, jumlahPesanan: number, nomorMeja: string) {
  try {
    await addDoc(collection(db, "orders"), {
      nama: namaPelanggan,
      meja: nomorMeja,
      menu: namaMenu,
      jumlah: Number(jumlahPesanan),
      waktu: new Date(),
      status: "pending"
    });
    console.log(`Pesanan ${namaMenu} berhasil masuk ke Admin!`);
  } catch (e) {
    console.error("Gagal mengirim pesanan: ", e);
    throw e;
  }
}
