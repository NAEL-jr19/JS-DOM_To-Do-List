// 1. MENGAMBIL ELEMEN DOM
const inputTugas = document.getElementById("input-tugas");
const btnTambah = document.getElementById("btn-tambah");
const daftarTugas = document.getElementById("daftar-tugas");
const jumlahTugas = document.getElementById("jumlah-tugas");
const pesanKosong = document.getElementById("pesan-kosong");

// Elemen angka statistik
const totalTugas = document.getElementById("total-tugas");
const tugasSelesai = document.getElementById("tugas-selesai");
const tugasBelum = document.getElementById("tugas-belum");

// 2. MEMPERBARUI STATISTIK & PESAN KOSONG
function perbaruiStatistik() {
  // Hitung semua tugas didalam daftar
  const jumlahTotal = daftarTugas.querySelectorAll(".item-tugas").length;

  // Hitung tugas yg punya class "selesai"
  const jumlahSelesai = daftarTugas.querySelectorAll(
    ".item-tugas.selesai",
  ).length;

  // Belum selesai = total dikurangi selesai
  const jumlahBelum = jumlahTotal - jumlahSelesai;

  console.log("Statistik:", {
    total: jumlahTotal,
    belumSelesai: jumlahBelum,
    selesai: jumlahSelesai,
  });

  // Tampilkan angka ke halaman
  totalTugas.innerText = jumlahTotal;
  tugasSelesai.innerText = jumlahSelesai;
  tugasBelum.innerText = jumlahBelum;
  jumlahTugas.innerText = jumlahTotal;

  if (jumlahTotal === 0) {
    // Jika 0: hapus class "sembunyi" supaya pesan "Mana Tugasnya!" muncul
    pesanKosong.classList.remove("sembunyi");
  } else {
    // Jika > 0: Tambahkan class "sembunyi" supaya pesan "Mana Tugasnya!" hilang
    pesanKosong.classList.add("sembunyi");
  }
}

// 3. MENAMBAHKAN TUGAS
function tambahTugas() {
  // Ambil isi input, trim() membuang spasi di awal dan akhir
  const teks = inputTugas.value.trim();
  console.log("Tugas yang Dimasukkan:", teks);

  // Validasi: jika kosong atau hanya spasi, tampilkan alert lalu berhenti
  if (teks === "") {
    alert("harus di isi dulu ya bro!");
    return;
  }

  // Buat <li> sebagai wadah satu tugas
  const itemTugas = document.createElement("li");
  itemTugas.classList.add("item-tugas");

  // Buat checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  // Buat teks tugas
  const teksTugas = document.createElement("p");
  teksTugas.classList.add("teks-tugas");
  teksTugas.innerText = teks;

  // Buat tombol hapus
  const btnHapus = document.createElement("button");
  btnHapus.classList.add("btn-hapus");
  btnHapus.innerText = "🗑️";

  // Checkbox diubah: tambah/hapus class "selesai"
  checkbox.addEventListener("click", function () {
    if (checkbox.checked) {
      itemTugas.classList.add("selesai");
    } else {
      itemTugas.classList.remove("selesai");
    }
    perbaruiStatistik();
  });

  // Tombol Hapus diklik: hapus <li> dari halaman
  btnHapus.addEventListener("click", function () {
    itemTugas.remove();

    console.log("Tugas dihapus:", teks);

    perbaruiStatistik();
  });

  // Susun elemen ke dalam <li>, lalu masukkan <li> ke daftar
  itemTugas.appendChild(checkbox);
  itemTugas.appendChild(teksTugas);
  itemTugas.appendChild(btnHapus);
  daftarTugas.appendChild(itemTugas);
  console.log("Tugas berhasil ditambahkan");

  // Kosongkan input untuk tugas berikutnya
  inputTugas.value = "";
  inputTugas.focus();

  perbaruiStatistik();
}

// 4. EVENT LISTENER
// Klik tombol Tambah
btnTambah.addEventListener("click", function () {
  tambahTugas();
});

// Tekan Enter di input
inputTugas.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    tambahTugas();
  }
});
