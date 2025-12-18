<h1 style="display: flex; align-items: center; gap: 16px;">
  <img width="80" height="80" alt="logo"
       src="https://github.com/user-attachments/assets/6b515a9e-f5ba-4b07-a62b-915a3dccf5ab" />
  <span>WEB Music Player Berbasis React</span>
</h1>


##  Deskripsi Umum
Proyek ini merupakan **Tugas Besar Mata Kuliah Struktur Data** yang mengimplementasikan sebuah **WEB music player berbasis React**. WEB ini memungkinkan pengguna untuk memutar lagu, membuat playlist, serta mengelola lagu berdasarkan genre. Fokus utama proyek ini adalah **penerapan konsep struktur data** dalam kasus nyata, bukan sekadar teori.

---

##  Tujuan Proyek
- Menerapkan konsep struktur data dalam aplikasi nyata
- Memahami penggunaan **Array** dan **Queue (FIFO)** pada sistem pemutaran lagu
- Melatih kemampuan analisis desain sistem frontend
- Mengimplementasikan logika pemutaran lagu berdasarkan genre

---

## Fitur Web
### User
- Login sebagai user
- Melihat daftar lagu
- Memutar lagu
- Navigasi **Next / Previous**
- Membuat playlist pribadi
- Menambahkan lagu ke playlist

### Admin
- Login sebagai admin
- Mengelola data lagu (tambah & edit)
- Melihat seluruh playlist (keterbatasan sistem)

>  Catatan: Pada versi ini, playlist user masih dapat terlihat di halaman admin karena belum ada pemisahan data berdasarkan role.

---

## Struktur Folder
```
src/
 ├── App.jsx                # State utama & logika pemutaran
 ├── main.jsx               # Entry point React
 ├── data/
 │   └── songs.js           # Data lagu
 └── components/
     ├── Home.jsx
     ├── Library.jsx
     ├── PlaylistDetail.jsx
     ├── Playerbar.jsx
     ├── Sidebar.jsx
     ├── Login.jsx
     ├── AdminModal.jsx
     └── EditSongPage.jsx
```

---

### Array (Struktur Utama) 
Digunakan untuk:
- Menyimpan daftar lagu
- Menyimpan playlist
- Menyusun antrian pemutaran (queue)

Contoh:
```js
const songs = [];
const playlists = [];
```

---

### Queue (FIFO) 
Konsep queue digunakan pada **pemutaran lagu**.

#### Mekanisme:
1. User memilih sebuah lagu
2. Sistem menyusun ulang queue:
   - Lagu dengan genre sama ditempatkan di depan
   - Lagu genre lain ditempatkan di belakang
3. Tombol **Next / Previous** hanya berpindah indeks dalam queue

Contoh konsep:
```
[Pop1, Pop2, Pop3, Rock1, Jazz1]
```

 Dengan pendekatan ini, lagu berikutnya akan tetap berada dalam genre yang sama hingga habis.

---
## Keterbatasan Sistem
- Tidak ada backend atau database
- Data disimpan di state (memory)
- Tidak ada autentikasi sesungguhnya
- Playlist belum dipisahkan berdasarkan role
- Tidak tersedia fitur hapus playlist

---

## Kesimpulan
WEB ini berhasil menerapkan konsep **Array**, **Queue (FIFO)**, **circular doubly linked list**, **Multi Linked List** dalam sistem pemutaran lagu berbasis genre. Meskipun belum mengimplementasikan struktur data kompleks seperti Linked List, Stack, Tree, dan Graph, proyek ini sudah memenuhi tujuan pembelajaran dengan studi kasus yang relevan dan mudah dipahami.

---

## Pengembangan Lanjutan (rencana kami)
- Menambahkan fitur hapus playlist
- Memisahkan playlist berdasarkan role (admin / user)
- Menggunakan backend & database
- Mengimplementasikan Queue dan Linked List manual
---
