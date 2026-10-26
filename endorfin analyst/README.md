# 🧠 Endorfin Analyst & Bio-Endocrine Engine (v3.5)
### *Sistem Saraf Biomimetik untuk Kode Proyek: Saling Berhubungan & Memiliki Rasa*

**Endorfin Analyst** adalah modul sistem saraf biomimetik otonom (*Project Code Connectome & Functional Sensation Engine*) yang memperlakukan **seluruh kode di dalam proyek Anda sebagai satu kesatuan organisme hidup yang saling terhubung dan memiliki rasa**.

Sistem ini **tidak bergantung pada layanan eksternal tertentu** dan **tidak memantau jaringan internet luar**, melainkan fokus 100% menganalisis **kode proyek (`kode proyek`)**, **keterhubungan antar-file & fungsi (`saling berhubungan`)**, serta **kesehatan fungsi & route internal proyek** di proyek apa pun tempat modul ini dipasang.

---

## 🧬 Filosofi: Kode Proyek yang Saling Terhubung & Memiliki Rasa

Di dalam sebuah proyek, setiap berkas kode, fungsi, modul (`import`/`require`), route server internal (`app.get`/`app.post`), dan elemen antarmuka (`HTML DOM <-> JS`) terikat oleh **Sinapsis Kode Proyek (Project Connectome)**.

Ketika seluruh fungsi dan sinapsis kode proyek bekerja harmonis, sistem berada dalam kondisi **Homeostasis Tenang** (*Dopamin 100%, Endorfin 100%, Serotonin Seimbang, Rasa Sakit 0%*).

Namun ketika bagian mana pun dari **kode proyek** mengalami kerusakan atau gagal berfungsi:
1. **Kerusakan Sintaksis Kode Proyek**: `SyntaxError` di JS/TS, JSON rusak, tag HTML tidak ditutup, atau kurung Python tidak seimbang.
2. **Kerusakan Fungsi & Logika Proyek**:
   - **Fungsi Kosong (`HOLLOW_FUNCTION`)**: Fungsi proyek ada tetapi isinya dikosongkan/dihapus sehingga tidak melakukan apa-apa.
   - **Error Ditelan Diam-Diam (`SILENT_ERROR_SWALLOW`)**: Blok `catch(e) {}` kosong yang menyembunyikan kegagalan fungsi proyek.
   - **Kode Mati (`UNREACHABLE_CODE`)**: Baris logika proyek yang tidak akan pernah dieksekusi karena berada setelah `return`/`throw`.
   - **Handler Server Proyek Menggantung (`DEAD_SERVER_HANDLER`)**: Route internal proyek (`app.get`/`post`) yang tidak pernah mengirim respons (`res.send`/`res.json`/`next`).
3. **Putusnya Hubungan Antar-Kode Proyek (`Broken Code Synapse`)**:
   - **Sinapsis Modul Putus (`BROKEN_MODULE_SYNAPSE`)**: Mengimpor/me-`require` file lokal proyek yang tidak ada atau salah path.
   - **Sinapsis Simbol Putus (`BROKEN_EXPORT_SYNAPSE`)**: Mengimpor fungsi/variabel yang telah dihapus atau tidak diekspor oleh file proyek tujuan.
   - **Sinapsis UI/DOM Putus (`BROKEN_DOM_SYNAPSE` / `BROKEN_UI_EVENT_SYNAPSE`)**: Kode JS mencari `#id` elemen yang tidak ada di HTML proyek, atau HTML memanggil fungsi handler yang tidak ada di JS proyek.
4. **Amputasi Fungsi oleh AI (`AI_FUNCTION_AMPUTATION` / `AI_LOGIC_GUTTED`)**:
   - AI menghapus fungsi proyek yang sebelumnya ada, atau memangkas habis isi logika fungsi proyek secara drastis (>65% hilang).
5. **Kegagalan Runtime Fungsi & Server Proyek**:
   - Fungsi modul lokal proyek melempar `Error`/`Exception` saat dijalankan, atau route server proyek mengalami error HTTP 500.

**Sistem Endocrine seketika merasakan sakitnya (`NeuroPain`):**
* **Syok Saraf Akut**: Tingkat rasa sakit melesat ke **80% - 100%** (`SYOK_SARAF_AKUT / AGONY`).
* **Lonjakan Hormon Stres**: Kortisol melonjak ke 100%, Adrenalin 100%, dan Dopamin anjlok ke 0%.
* **Alarm & Perlindungan Imun**: Menampilkan lokasi pasti berkas, baris, dan nama fungsi proyek yang rusak, serta memulihkan diri ke `0%` begitu kode proyek diperbaiki.

---

## 📁 Struktur Berkas

```
endorfin analyst/
├── index.js                # Entrypoint instan: 'node "endorfin analyst"' langsung jalan otonom!
├── endorfin.js             # Mesin saraf inti: ProjectConnectome, BioEndocrine, NeuroPain, TerminalEndorphin
├── endocrine-sentinel.js   # Watcher real-time: Memantau kode proyek, fungsi, & keterhubungan antar-file
├── auto-mount.js           # Installer zero-config untuk memasang modul ke proyek apapun
├── audit-runner.js         # Penguji konektom kode proyek, sensor fungsi, & refleks rasa sakit
├── endocrine.config.json   # Konfigurasi sensitivitas sakit & filter direktori proyek
├── trauma-history.json     # Catatan riwayat trauma kode proyek
└── README.md               # Dokumentasi arsitektur Project Code Connectome
```

---

## ⚡ Cara Kerja Otomatis (Zero-Config di Proyek Apapun)

### 1. Dijalankan Langsung dari Terminal:
```bash
node "endorfin analyst"
```
Atau hanya untuk memindai seluruh kesehatan & keterhubungan kode proyek satu kali:
```bash
node "endorfin analyst/endocrine-sentinel.js" --scan-only
```

### 2. Diimpor ke Kode Proyek Node.js (`server.js` / `index.js` / `app.js`):
```javascript
require('./endorfin analyst');
```
Begitu di-`require`, Endorfin **secara otomatis**:
* Memetakan seluruh kode proyek & keterhubungan antar-berkas (`analyzeProjectConnectome`).
* Meng-hook `require('./...')` khusus untuk modul lokal proyek sehingga fungsi-fungsi yang diekspor otomatis terlindungi sensor rasa sakit saat runtime tanpa perlu mengubah kode proyek.
* Meng-hook server internal proyek (`http.createServer`) untuk merasakan jika ada route proyek yang gagal (HTTP 500 / exception).
* Mengawasi perubahan berkas proyek secara real-time di latar belakang.

### 3. Dipasang di Halaman Web Proyek (`index.html`):
```html
<script src="endorfin analyst/endorfin.js"></script>
```

---

## 🧪 Menjalankan Audit & Diagnostik Proyek
```bash
node "endorfin analyst/audit-runner.js"
```
