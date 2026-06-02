import { useState, useEffect } from "react";

const COLORS = {
  emerald: { primary: "#059669", light: "#d1fae5", dark: "#065f46", mid: "#10b981" },
  gold: { primary: "#d97706", light: "#fef3c7", dark: "#78350f", mid: "#f59e0b" },
  white: "#ffffff",
  gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827" }
};

const dummyStats = {
  totalHewan: 24, terdaftar: 5, siapSembelih: 8, disembelih: 6, dipotong: 3, selesai: 2,
  totalMudhohi: 134, totalMustahiq: 312, totalKupon: 312, kuponScan: 187, kuponBelum: 125,
  progresDistribusi: 60, totalPemasukan: 185000000, totalPengeluaran: 142000000
};

const dummyHewan = [
  { id: "H001", kode: "SAP-001", jenis: "Sapi", berat: 320, harga: 18500000, lokasi: "Kandang A", status: "Siap Disembelih", kelompok: "KEL-001" },
  { id: "H002", kode: "SAP-002", jenis: "Sapi", berat: 290, harga: 17000000, lokasi: "Kandang A", status: "Disembelih", kelompok: "KEL-002" },
  { id: "H003", kode: "KBG-001", jenis: "Kambing", berat: 35, harga: 3200000, lokasi: "Kandang B", status: "Dipotong", kelompok: "KEL-003" },
  { id: "H004", kode: "KBG-002", jenis: "Kambing", berat: 42, harga: 3800000, lokasi: "Kandang B", status: "Terdaftar", kelompok: "KEL-004" },
  { id: "H005", kode: "SAP-003", jenis: "Sapi", berat: 310, harga: 18000000, lokasi: "Kandang A", status: "Selesai", kelompok: "KEL-005" },
];

const dummyMudhohi = [
  { id: "M001", nama: "H. Ahmad Fauzi", wa: "08123456789", alamat: "Jl. Mawar No. 12", jenis: "Sapi", namaAtas: "Almh. Siti Aminah", kelompok: "KEL-001", pembayaran: "Lunas" },
  { id: "M002", nama: "Budi Santoso", wa: "08234567890", alamat: "Jl. Melati No. 5", jenis: "Kambing", namaAtas: "Budi Santoso", kelompok: "KEL-003", pembayaran: "Lunas" },
  { id: "M003", nama: "Ibu Sari Dewi", wa: "08345678901", alamat: "Jl. Anggrek No. 8", jenis: "Sapi", namaAtas: "Keluarga Besar Santoso", kelompok: "KEL-001", pembayaran: "DP" },
  { id: "M004", nama: "Pak Hendra", wa: "08456789012", alamat: "Jl. Kenanga No. 3", jenis: "Sapi", namaAtas: "Hendra & Keluarga", kelompok: "KEL-002", pembayaran: "Lunas" },
  { id: "M005", nama: "Ustaz Ridwan", wa: "08567890123", alamat: "Komplek Masjid", jenis: "Kambing", namaAtas: "Ustaz Ridwan", kelompok: "KEL-004", pembayaran: "Lunas" },
];

const dummyMustahiq = [
  { id: "W001", nama: "Ibu Rohani", kategori: "Fakir Miskin", rt: "001", rw: "003", kupon: "KPN-0001", status: "Belum Diambil" },
  { id: "W002", nama: "Pak Joko", kategori: "Warga Sekitar", rt: "002", rw: "003", kupon: "KPN-0002", status: "Sudah Diambil" },
  { id: "W003", nama: "Nenek Mariyam", kategori: "Fakir Miskin", rt: "001", rw: "004", kupon: "KPN-0003", status: "Belum Diambil" },
  { id: "W004", nama: "Bapak Suparman", kategori: "Warga Sekitar", rt: "003", rw: "003", kupon: "KPN-0004", status: "Sudah Diambil" },
  { id: "W005", nama: "Panitia - Agus", kategori: "Panitia", rt: "-", rw: "-", kupon: "KPN-0005", status: "Sudah Diambil" },
];

const dummyKeuangan = [
  { id: "K001", tipe: "Pemasukan", kategori: "Iuran Mudhohi", keterangan: "Pembayaran sapi KEL-001", jumlah: 18500000, tanggal: "15 Mei 2025" },
  { id: "K002", tipe: "Pemasukan", kategori: "Iuran Mudhohi", keterangan: "Pembayaran sapi KEL-002", jumlah: 17000000, tanggal: "16 Mei 2025" },
  { id: "K003", tipe: "Pengeluaran", kategori: "Pembelian Hewan", keterangan: "Beli sapi 3 ekor", jumlah: 53500000, tanggal: "18 Mei 2025" },
  { id: "K004", tipe: "Pengeluaran", kategori: "Perlengkapan", keterangan: "Plastik & tali", jumlah: 1500000, tanggal: "19 Mei 2025" },
  { id: "K005", tipe: "Pemasukan", kategori: "Donasi", keterangan: "Donasi Bpk H. Mahmud", jumlah: 5000000, tanggal: "20 Mei 2025" },
];

const dummySesi = [
  { id: "S001", nama: "Sesi Pagi A", tanggal: "9 Jun 2025", jamMulai: "07:00", jamSelesai: "09:00", lokasi: "Halaman Masjid", kuota: 50, terisi: 45 },
  { id: "S002", nama: "Sesi Pagi B", tanggal: "9 Jun 2025", jamMulai: "09:00", jamSelesai: "11:00", lokasi: "Halaman Masjid", kuota: 50, terisi: 50 },
  { id: "S003", nama: "Sesi Siang", tanggal: "9 Jun 2025", jamMulai: "13:00", jamSelesai: "15:00", lokasi: "Aula Masjid", kuota: 50, terisi: 30 },
];

const statusColors = {
  "Terdaftar": { bg: "#dbeafe", text: "#1e40af" },
  "Siap Disembelih": { bg: "#fef3c7", text: "#92400e" },
  "Disembelih": { bg: "#fee2e2", text: "#991b1b" },
  "Dikuliti": { bg: "#fce7f3", text: "#9d174d" },
  "Dipotong": { bg: "#ede9fe", text: "#4c1d95" },
  "Dikemas": { bg: "#d1fae5", text: "#065f46" },
  "Selesai": { bg: "#d1fae5", text: "#065f46" },
  "Lunas": { bg: "#d1fae5", text: "#065f46" },
  "DP": { bg: "#fef3c7", text: "#92400e" },
  "Belum Diambil": { bg: "#fef3c7", text: "#92400e" },
  "Sudah Diambil": { bg: "#d1fae5", text: "#065f46" },
  "Batal": { bg: "#fee2e2", text: "#991b1b" },
};

function Badge({ status }) {
  const c = statusColors[status] || { bg: "#f3f4f6", text: "#374151" };
  return (
    <span style={{ background: c.bg, color: c.text, padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function formatRupiah(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

function StatCard({ label, value, icon, color, sub }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontSize: 13, color: COLORS.gray[500], fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 22, background: color + "20", padding: "6px 8px", borderRadius: 10 }}>{icon}</span>
      </div>
      <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.gray[800] }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: COLORS.gray[400] }}>{sub}</div>}
    </div>
  );
}

function ProgressBar({ value, max, color }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: COLORS.gray[500] }}>Progres Distribusi</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: color }}>{pct}%</span>
      </div>
      <div style={{ background: COLORS.gray[100], borderRadius: 99, height: 10, overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: `linear-gradient(90deg, ${color}, ${COLORS.emerald.mid})`, borderRadius: 99, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
      onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 520, maxHeight: "80vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.gray[800] }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: COLORS.gray[400], lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "20px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  const bg = type === "success" ? COLORS.emerald.primary : type === "error" ? "#ef4444" : COLORS.gold.primary;
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, background: bg, color: "#fff", padding: "12px 20px", borderRadius: 12, fontSize: 14, fontWeight: 500, zIndex: 99999, boxShadow: "0 4px 20px rgba(0,0,0,0.2)", display: "flex", gap: 10, alignItems: "center" }}>
      {type === "success" ? "✓" : type === "error" ? "✕" : "ℹ"} {msg}
      <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", marginLeft: 4 }}>×</button>
    </div>
  );
}

const MENU_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "🏠" },
  { key: "mudhohi", label: "Mudhohi", icon: "🐄" },
  { key: "hewan", label: "Hewan Qurban", icon: "🐑" },
  { key: "mustahiq", label: "Mustahiq", icon: "🤲" },
  { key: "sesi", label: "Sesi Distribusi", icon: "📅" },
  { key: "scan", label: "Scan Kupon", icon: "📷" },
  { key: "keuangan", label: "Laporan RAB", icon: "💰" },
  { key: "pengaturan", label: "Pengaturan", icon: "⚙️" },
];

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  return (
    <div style={{
      width: collapsed ? 64 : 240, minHeight: "100vh", background: `linear-gradient(160deg, ${COLORS.emerald.dark} 0%, #0a3d2b 100%)`,
      display: "flex", flexDirection: "column", transition: "width 0.3s", flexShrink: 0, position: "relative", zIndex: 100
    }}>
      <div style={{ padding: collapsed ? "20px 12px" : "20px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
        {!collapsed && (
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: -0.5 }}>
              <span style={{ color: COLORS.gold.mid }}>Qurban</span>Pro
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>Manajemen Idul Adha</div>
          </div>
        )}
        {collapsed && <span style={{ fontSize: 20 }}>🌙</span>}
        <button onClick={() => setCollapsed(!collapsed)}
          style={{ marginLeft: "auto", background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, padding: "4px 8px", cursor: "pointer", fontSize: 16 }}>
          {collapsed ? "→" : "←"}
        </button>
      </div>
      <nav style={{ flex: 1, padding: "12px 8px" }}>
        {MENU_ITEMS.map(item => (
          <button key={item.key} onClick={() => setActive(item.key)}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 12, padding: collapsed ? "10px 12px" : "10px 14px",
              background: active === item.key ? "rgba(255,255,255,0.15)" : "transparent",
              border: "none", borderRadius: 10, color: active === item.key ? "#fff" : "rgba(255,255,255,0.65)",
              cursor: "pointer", fontSize: 14, fontWeight: active === item.key ? 600 : 400,
              marginBottom: 2, transition: "all 0.15s", textAlign: "left",
              borderLeft: active === item.key ? `3px solid ${COLORS.gold.mid}` : "3px solid transparent"
            }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
      {!collapsed && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "12px 14px" }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>Login sebagai</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Admin Panitia</div>
            <div style={{ fontSize: 11, color: COLORS.gold.mid, marginTop: 2 }}>Masjid Al-Ikhlas</div>
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard({ toast }) {
  const stats = dummyStats;
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: COLORS.gray[800], margin: 0 }}>Dashboard Qurban 1446 H</h1>
        <p style={{ fontSize: 14, color: COLORS.gray[400], marginTop: 4 }}>Masjid Al-Ikhlas — Idul Adha 2025</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Hewan" value={stats.totalHewan} icon="🐄" color={COLORS.emerald.primary} sub="Sapi & Kambing" />
        <StatCard label="Total Mudhohi" value={stats.totalMudhohi} icon="👥" color={COLORS.gold.primary} sub="Peserta qurban" />
        <StatCard label="Total Mustahiq" value={stats.totalMustahiq} icon="🤲" color="#8b5cf6" sub="Penerima daging" />
        <StatCard label="Kupon Terbit" value={stats.totalKupon} icon="🎫" color="#0ea5e9" sub={`${stats.kuponScan} sudah scan`} />
        <StatCard label="Pemasukan" value={formatRupiah(stats.totalPemasukan)} icon="💚" color={COLORS.emerald.primary} />
        <StatCard label="Pengeluaran" value={formatRupiah(stats.totalPengeluaran)} icon="🔴" color="#ef4444" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "20px 24px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: COLORS.gray[700] }}>Status Hewan Qurban</h3>
          {[
            { label: "Terdaftar", count: 5, color: "#3b82f6" },
            { label: "Siap Disembelih", count: 8, color: "#f59e0b" },
            { label: "Disembelih", count: 6, color: "#ef4444" },
            { label: "Dipotong", count: 3, color: "#8b5cf6" },
            { label: "Selesai", count: 2, color: COLORS.emerald.primary },
          ].map(s => (
            <div key={s.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, color: COLORS.gray[600] }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.count}</span>
              </div>
              <div style={{ height: 6, background: "#f3f4f6", borderRadius: 99 }}>
                <div style={{ width: (s.count / stats.totalHewan * 100) + "%", height: "100%", background: s.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "20px 24px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: COLORS.gray[700] }}>Distribusi Kupon</h3>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "relative", height: 140 }}>
            <svg viewBox="0 0 120 120" style={{ width: 130, height: 130 }}>
              <circle cx="60" cy="60" r="48" fill="none" stroke="#f3f4f6" strokeWidth="12" />
              <circle cx="60" cy="60" r="48" fill="none" stroke={COLORS.emerald.primary} strokeWidth="12"
                strokeDasharray={`${2 * Math.PI * 48 * 0.6} ${2 * Math.PI * 48 * 0.4}`}
                strokeDashoffset={2 * Math.PI * 48 * 0.25} strokeLinecap="round" transform="rotate(-90 60 60)" />
              <text x="60" y="55" textAnchor="middle" fontSize="18" fontWeight="800" fill={COLORS.emerald.dark}>60%</text>
              <text x="60" y="70" textAnchor="middle" fontSize="9" fill={COLORS.gray[400]}>sudah diambil</text>
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: 8 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.emerald.primary }}>{stats.kuponScan}</div>
              <div style={{ fontSize: 11, color: COLORS.gray[400] }}>Sudah Diambil</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.gold.primary }}>{stats.kuponBelum}</div>
              <div style={{ fontSize: 11, color: COLORS.gray[400] }}>Belum Diambil</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, ${COLORS.emerald.dark}, #0a6e50)`, borderRadius: 16, padding: "24px 28px", marginBottom: 24, color: "#fff" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>💰 Ringkasan Keuangan</h3>
            <p style={{ margin: "4px 0 0", opacity: 0.7, fontSize: 13 }}>Per hari ini, 9 Juni 2025</p>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Saldo Akhir</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.gold.mid }}>{formatRupiah(stats.totalPemasukan - stats.totalPengeluaran)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Pemasukan</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{formatRupiah(stats.totalPemasukan)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, opacity: 0.7 }}>Pengeluaran</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{formatRupiah(stats.totalPengeluaran)}</div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <ProgressBar value={stats.kuponScan} max={stats.totalKupon} color={COLORS.gold.mid} />
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: "20px 24px" }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 700, color: COLORS.gray[700] }}>Aktivitas Terbaru</h3>
        {[
          { icon: "🐄", text: "Sapi SAP-002 berhasil disembelih", time: "10 menit lalu", color: "#fee2e2" },
          { icon: "🎫", text: "50 kupon baru diterbitkan untuk RT 003/004", time: "25 menit lalu", color: "#dbeafe" },
          { icon: "💰", text: "Pembayaran qurban dari H. Ahmad Fauzi", time: "1 jam lalu", color: "#d1fae5" },
          { icon: "📱", text: "Notifikasi WA dikirim ke 7 mudhohi sapi KEL-001", time: "2 jam lalu", color: "#fef3c7" },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < 3 ? "1px solid #f3f4f6" : "none" }}>
            <div style={{ width: 36, height: 36, background: a.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: COLORS.gray[700] }}>{a.text}</div>
              <div style={{ fontSize: 12, color: COLORS.gray[400] }}>{a.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HewanPage({ toast }) {
  const [hewan, setHewan] = useState(dummyHewan);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const statuses = ["Terdaftar", "Siap Disembelih", "Disembelih", "Dikuliti", "Dipotong", "Dikemas", "Selesai"];

  const filtered = hewan.filter(h => h.kode.toLowerCase().includes(search.toLowerCase()) || h.jenis.toLowerCase().includes(search.toLowerCase()));

  function updateStatus(id, status) {
    setHewan(hewan.map(h => h.id === id ? { ...h, status } : h));
    toast("Status hewan diperbarui. Notifikasi WA akan dikirim ke mudhohi.", "success");
    setShowModal(false);
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], margin: 0 }}>Hewan Qurban</h1>
          <p style={{ fontSize: 13, color: COLORS.gray[400], margin: "4px 0 0" }}>{hewan.length} hewan terdaftar</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari hewan..." style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, width: 200 }} />
          <button onClick={() => toast("Fitur tambah hewan tersedia di versi lengkap.", "info")}
            style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            + Tambah Hewan
          </button>
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.gray[50] }}>
              {["Kode", "Jenis", "Berat", "Harga", "Lokasi", "Status", "Aksi"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: COLORS.gray[500], textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((h, i) => (
              <tr key={h.id} style={{ borderTop: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 600, color: COLORS.emerald.dark }}>{h.kode}</td>
                <td style={{ padding: "12px 16px", fontSize: 14 }}>{h.jenis === "Sapi" ? "🐄" : "🐑"} {h.jenis}</td>
                <td style={{ padding: "12px 16px", fontSize: 14 }}>{h.berat} kg</td>
                <td style={{ padding: "12px 16px", fontSize: 14 }}>{formatRupiah(h.harga)}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[500] }}>{h.lokasi}</td>
                <td style={{ padding: "12px 16px" }}><Badge status={h.status} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <button onClick={() => { setSelected(h); setNewStatus(h.status); setShowModal(true); }}
                    style={{ background: COLORS.gold.light, color: COLORS.gold.dark, border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selected && (
        <Modal title={`Update Status — ${selected.kode}`} onClose={() => setShowModal(false)}>
          <p style={{ fontSize: 14, color: COLORS.gray[600], margin: "0 0 16px" }}>Pilih status baru untuk hewan ini. Sistem akan mengirim notifikasi ke mudhohi terkait.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {statuses.map(s => (
              <button key={s} onClick={() => setNewStatus(s)}
                style={{ textAlign: "left", padding: "10px 16px", borderRadius: 10, border: `2px solid ${newStatus === s ? COLORS.emerald.primary : "#e5e7eb"}`, background: newStatus === s ? COLORS.emerald.light : "#fff", cursor: "pointer", fontSize: 14, fontWeight: newStatus === s ? 600 : 400, color: newStatus === s ? COLORS.emerald.dark : COLORS.gray[600] }}>
                {s}
              </button>
            ))}
          </div>
          <button onClick={() => updateStatus(selected.id, newStatus)}
            style={{ marginTop: 20, width: "100%", background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>
            💾 Simpan & Kirim Notif WA
          </button>
        </Modal>
      )}
    </div>
  );
}

function MudhohibPage({ toast }) {
  const [search, setSearch] = useState("");
  const filtered = dummyMudhohi.filter(m => m.nama.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], margin: 0 }}>Data Mudhohi</h1>
          <p style={{ fontSize: 13, color: COLORS.gray[400], margin: "4px 0 0" }}>Peserta program qurban</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama..." style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, width: 200 }} />
          <button onClick={() => toast("Data berhasil diexport ke Excel.", "success")}
            style={{ background: "#f3f4f6", color: COLORS.gray[700], border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>
            📤 Export Excel
          </button>
          <button onClick={() => toast("Fitur tambah mudhohi tersedia.", "info")}
            style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            + Tambah
          </button>
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.gray[50] }}>
              {["Nama", "No WA", "Alamat", "Jenis Qurban", "Nama Atas Qurban", "Kelompok", "Pembayaran"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: COLORS.gray[500], textTransform: "uppercase", letterSpacing: 0.5, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id} style={{ borderTop: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: COLORS.gray[800] }}>{m.nama}</div>
                  <div style={{ fontSize: 12, color: COLORS.gray[400] }}>{m.id}</div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13 }}>
                  <a href={`https://wa.me/${m.wa}`} target="_blank" style={{ color: "#22c55e", textDecoration: "none", fontWeight: 600 }}>📱 {m.wa}</a>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[600] }}>{m.alamat}</td>
                <td style={{ padding: "12px 16px" }}><span style={{ fontSize: 13 }}>{m.jenis === "Sapi" ? "🐄" : "🐑"} {m.jenis}</span></td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[600] }}>{m.namaAtas}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: COLORS.emerald.dark }}>{m.kelompok}</td>
                <td style={{ padding: "12px 16px" }}><Badge status={m.pembayaran} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MustahiqPage({ toast }) {
  const [mustahiq, setMustahiq] = useState(dummyMustahiq);
  const [search, setSearch] = useState("");
  const filtered = mustahiq.filter(m => m.nama.toLowerCase().includes(search.toLowerCase()) || m.kupon.toLowerCase().includes(search.toLowerCase()));
  function tandaiDiambil(id) {
    setMustahiq(mustahiq.map(m => m.id === id ? { ...m, status: "Sudah Diambil" } : m));
    toast("Kupon berhasil ditandai sudah diambil.", "success");
  }
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], margin: 0 }}>Data Mustahiq</h1>
          <p style={{ fontSize: 13, color: COLORS.gray[400], margin: "4px 0 0" }}>Penerima daging qurban</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama / kupon..." style={{ padding: "8px 14px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, width: 200 }} />
          <button onClick={() => toast("50 kupon warga RT 003 berhasil digenerate!", "success")}
            style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            🎫 Generate Kupon RT
          </button>
        </div>
      </div>
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.gray[50] }}>
              {["Nama", "Kategori", "RT/RW", "No. Kupon", "Status", "Aksi"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: COLORS.gray[500], textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((m, i) => (
              <tr key={m.id} style={{ borderTop: "1px solid #f3f4f6", background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600, fontSize: 14, color: COLORS.gray[800] }}>{m.nama}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[600] }}>{m.kategori}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[500] }}>RT {m.rt}/RW {m.rw}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: "#0ea5e9" }}>{m.kupon}</td>
                <td style={{ padding: "12px 16px" }}><Badge status={m.status} /></td>
                <td style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                  {m.status === "Belum Diambil" && (
                    <button onClick={() => tandaiDiambil(m.id)}
                      style={{ background: COLORS.emerald.light, color: COLORS.emerald.dark, border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
                      ✓ Tandai Diambil
                    </button>
                  )}
                  <button onClick={() => toast(`Kupon ${m.kupon} siap dicetak.`, "info")}
                    style={{ background: COLORS.gray[100], color: COLORS.gray[600], border: "none", borderRadius: 8, padding: "5px 12px", cursor: "pointer", fontSize: 12 }}>
                    🖨 Cetak
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SesiPage({ toast }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], margin: 0 }}>Sesi Distribusi</h1>
          <p style={{ fontSize: 13, color: COLORS.gray[400], margin: "4px 0 0" }}>Jadwal pembagian daging qurban</p>
        </div>
        <button onClick={() => toast("Sesi baru berhasil ditambahkan.", "success")}
          style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
          + Buat Sesi
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
        {dummySesi.map(s => {
          const pct = Math.round(s.terisi / s.kuota * 100);
          const penuh = s.terisi >= s.kuota;
          return (
            <div key={s.id} style={{ background: "#fff", border: `2px solid ${penuh ? "#fee2e2" : "#e5e7eb"}`, borderRadius: 16, padding: "20px 22px" }}>
              {penuh && <div style={{ background: "#fee2e2", color: "#991b1b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>⚠ SESI PENUH</div>}
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: COLORS.gray[800] }}>{s.nama}</h3>
              <p style={{ margin: "0 0 14px", fontSize: 13, color: COLORS.gray[400] }}>📅 {s.tanggal} · ⏰ {s.jamMulai}–{s.jamSelesai}</p>
              <div style={{ fontSize: 13, color: COLORS.gray[600], marginBottom: 14 }}>📍 {s.lokasi}</div>
              <div style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: COLORS.gray[500] }}>Terisi</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: penuh ? "#ef4444" : COLORS.emerald.primary }}>{s.terisi}/{s.kuota}</span>
                </div>
                <div style={{ height: 8, background: COLORS.gray[100], borderRadius: 99 }}>
                  <div style={{ width: pct + "%", height: "100%", background: penuh ? "#ef4444" : COLORS.emerald.primary, borderRadius: 99 }} />
                </div>
              </div>
              <button onClick={() => toast(`Antrean sesi ${s.nama} ditampilkan.`, "info")}
                style={{ width: "100%", background: COLORS.emerald.light, color: COLORS.emerald.dark, border: "none", borderRadius: 10, padding: "9px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Lihat Antrean →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ScanPage({ toast }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  function scan() {
    setError(null);
    setResult(null);
    const found = dummyMustahiq.find(m => m.kupon === input.trim().toUpperCase());
    if (!found) { setError("Kupon tidak ditemukan!"); return; }
    if (found.status === "Sudah Diambil") { setError(`Kupon ${found.kupon} sudah pernah digunakan!`); return; }
    setResult(found);
  }
  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], marginBottom: 8 }}>Scan Kupon</h1>
      <p style={{ fontSize: 14, color: COLORS.gray[400], marginBottom: 28 }}>Masukkan nomor kupon atau scan QR Code untuk validasi pengambilan.</p>
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "24px" }}>
        <div style={{ background: COLORS.gray[50], border: "2px dashed #d1d5db", borderRadius: 14, height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 48 }}>📷</span>
          <p style={{ fontSize: 13, color: COLORS.gray[400], margin: "8px 0 0" }}>Kamera QR Code (Versi lengkap)</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Contoh: KPN-0001" onKeyDown={e => e.key === "Enter" && scan()}
            style={{ flex: 1, padding: "10px 16px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 15 }} />
          <button onClick={scan}
            style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
            Cek
          </button>
        </div>
      </div>
      {error && (
        <div style={{ marginTop: 16, background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 14, padding: "16px 20px", color: "#991b1b", fontWeight: 600, fontSize: 14 }}>
          ⚠ {error}
        </div>
      )}
      {result && (
        <div style={{ marginTop: 16, background: COLORS.emerald.light, border: `1px solid ${COLORS.emerald.mid}`, borderRadius: 14, padding: "20px 22px" }}>
          <div style={{ fontSize: 13, color: COLORS.emerald.dark, fontWeight: 700, marginBottom: 12 }}>✅ KUPON VALID</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[["Nama", result.nama], ["Kategori", result.kategori], ["No. Kupon", result.kupon], ["Status", result.status]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: COLORS.gray[500] }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray[800] }}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={() => toast(`Kupon ${result.kupon} ditandai sudah diambil!`, "success")}
            style={{ marginTop: 16, width: "100%", background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>
            ✓ Tandai Sudah Diambil
          </button>
        </div>
      )}
    </div>
  );
}

function KeuanganPage({ toast }) {
  const pemasukan = dummyKeuangan.filter(k => k.tipe === "Pemasukan").reduce((s, k) => s + k.jumlah, 0);
  const pengeluaran = dummyKeuangan.filter(k => k.tipe === "Pengeluaran").reduce((s, k) => s + k.jumlah, 0);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], margin: 0 }}>Laporan RAB & Keuangan</h1>
          <p style={{ fontSize: 13, color: COLORS.gray[400], margin: "4px 0 0" }}>Transparansi keuangan qurban</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => toast("Laporan berhasil diexport ke PDF.", "success")}
            style={{ background: "#f3f4f6", color: COLORS.gray[700], border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>
            📄 Export PDF
          </button>
          <button onClick={() => toast("Laporan berhasil diexport ke Excel.", "success")}
            style={{ background: "#f3f4f6", color: COLORS.gray[700], border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 14 }}>
            📊 Export Excel
          </button>
          <button onClick={() => toast("Transaksi baru berhasil ditambahkan.", "success")}
            style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 18px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            + Tambah Transaksi
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 }}>
        <div style={{ background: COLORS.emerald.light, border: `1px solid ${COLORS.emerald.mid}`, borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: COLORS.emerald.dark, fontWeight: 700, marginBottom: 8 }}>TOTAL PEMASUKAN</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.emerald.dark }}>{formatRupiah(pemasukan)}</div>
        </div>
        <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: "#991b1b", fontWeight: 700, marginBottom: 8 }}>TOTAL PENGELUARAN</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#991b1b" }}>{formatRupiah(pengeluaran)}</div>
        </div>
        <div style={{ background: COLORS.gold.light, border: `1px solid ${COLORS.gold.mid}`, borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, color: COLORS.gold.dark, fontWeight: 700, marginBottom: 8 }}>SALDO AKHIR</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.gold.dark }}>{formatRupiah(pemasukan - pengeluaran)}</div>
        </div>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: COLORS.gray[50] }}>
              {["Tipe", "Kategori", "Keterangan", "Tanggal", "Jumlah"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, fontWeight: 700, color: COLORS.gray[500], textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dummyKeuangan.map((k, i) => (
              <tr key={k.id} style={{ borderTop: "1px solid #f3f4f6" }}>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: k.tipe === "Pemasukan" ? COLORS.emerald.light : "#fee2e2", color: k.tipe === "Pemasukan" ? COLORS.emerald.dark : "#991b1b", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    {k.tipe === "Pemasukan" ? "▲" : "▼"} {k.tipe}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[600] }}>{k.kategori}</td>
                <td style={{ padding: "12px 16px", fontSize: 14, color: COLORS.gray[800] }}>{k.keterangan}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: COLORS.gray[400] }}>{k.tanggal}</td>
                <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, color: k.tipe === "Pemasukan" ? COLORS.emerald.dark : "#ef4444" }}>
                  {k.tipe === "Pemasukan" ? "+" : "-"}{formatRupiah(k.jumlah)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PengaturanPage() {
  return (
    <div style={{ maxWidth: 600 }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.gray[800], marginBottom: 6 }}>Pengaturan</h1>
      <p style={{ fontSize: 14, color: COLORS.gray[400], marginBottom: 28 }}>Konfigurasi aplikasi QurbanPro Anda.</p>
      {[
        { label: "Nama Masjid/Komunitas", val: "Masjid Al-Ikhlas" },
        { label: "Ketua Panitia", val: "H. Ahmad Fauzi" },
        { label: "Nomor WhatsApp Panitia", val: "0812-3456-7890" },
        { label: "Tanggal Idul Adha", val: "9 Juni 2025" },
        { label: "Lokasi Penyembelihan", val: "Lapangan Masjid Al-Ikhlas" },
      ].map(f => (
        <div key={f.label} style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray[600], display: "block", marginBottom: 6 }}>{f.label}</label>
          <input defaultValue={f.val} style={{ width: "100%", padding: "10px 16px", borderRadius: 10, border: "1px solid #e5e7eb", fontSize: 14, boxSizing: "border-box" }} />
        </div>
      ))}
      <button style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
        💾 Simpan Pengaturan
      </button>
    </div>
  );
}

function AppLayout() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [toasts, setToasts] = useState([]);

  function addToast(msg, type = "info") {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
  }
  function removeToast(id) { setToasts(t => t.filter(x => x.id !== id)); }

  const pages = {
    dashboard: <Dashboard toast={addToast} />,
    hewan: <HewanPage toast={addToast} />,
    mudhohi: <MudhohibPage toast={addToast} />,
    mustahiq: <MustahiqPage toast={addToast} />,
    sesi: <SesiPage toast={addToast} />,
    scan: <ScanPage toast={addToast} />,
    keuangan: <KeuanganPage toast={addToast} />,
    pengaturan: <PengaturanPage />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.gray[50], fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <Sidebar active={page} setActive={setPage} collapsed={collapsed} setCollapsed={setCollapsed} />
      <main style={{ flex: 1, overflow: "auto", padding: "28px 32px", minWidth: 0 }}>
        {pages[page] || (
          <div style={{ textAlign: "center", padding: "80px 0", color: COLORS.gray[400] }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🚧</div>
            <h2 style={{ fontWeight: 700, color: COLORS.gray[600] }}>Segera Hadir</h2>
            <p>Fitur ini tersedia di versi lengkap QurbanPro.</p>
          </div>
        )}
      </main>
      {toasts.map(t => <Toast key={t.id} msg={t.msg} type={t.type} onClose={() => removeToast(t.id)} />)}
    </div>
  );
}

// ============ LANDING PAGE ============

function LandingPage({ onEnter }) {
  const [hoveredPlan, setHoveredPlan] = useState(1);

  const features = [
    { icon: "🐄", title: "Manajemen Hewan", desc: "Kelola sapi & kambing dengan workflow status lengkap dari terdaftar hingga selesai." },
    { icon: "👥", title: "Data Mudhohi", desc: "Input peserta qurban individu/kelompok, generate sertifikat & bukti pendaftaran otomatis." },
    { icon: "🎫", title: "Kupon Digital QR", desc: "Setiap mustahiq dapat kupon QR unik. Scan untuk validasi, cegah kupon ganda." },
    { icon: "📱", title: "Notifikasi WhatsApp", desc: "Kirim notif otomatis ke mudhohi saat status hewan berubah & jadwal distribusi." },
    { icon: "💰", title: "Laporan Keuangan", desc: "RAB transparan, export Excel/PDF, mudah dipahami jamaah dan pengurus." },
    { icon: "🔒", title: "Role-based Access", desc: "Setiap anggota panitia hanya akses menu sesuai jabatan. Aman dan terstruktur." },
  ];

  const steps = [
    { n: "01", title: "Daftarkan Hewan & Mudhohi", desc: "Input data sapi/kambing dan peserta qurban dengan mudah." },
    { n: "02", title: "Generate Kupon Digital", desc: "Sistem otomatis buat kupon QR untuk setiap mustahiq." },
    { n: "03", title: "Distribusi & Scan", desc: "Panitia scan kupon saat pembagian. Cegah double-claim." },
    { n: "04", title: "Laporan Transparan", desc: "Export laporan keuangan & distribusi untuk jamaah." },
  ];

  const plans = [
    { name: "Masjid", price: "Gratis", period: "", features: ["1 Event Qurban", "Hingga 50 Mustahiq", "Fitur Dasar", "Support Email"], cta: "Mulai Gratis" },
    { name: "Komunitas", price: "299.000", period: "/tahun", features: ["Unlimited Event", "Unlimited Mustahiq", "Semua Fitur", "Export PDF/Excel", "Prioritas Support"], cta: "Pilih Paket Ini", popular: true },
    { name: "Enterprise", price: "Custom", period: "", features: ["Multi Cabang", "Custom Domain", "API Integration", "Dedicated Support", "Training Panitia"], cta: "Hubungi Kami" },
  ];

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#fff", color: COLORS.gray[800] }}>
      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, zIndex: 100 }}>
        <div style={{ fontSize: 22, fontWeight: 800 }}><span style={{ color: COLORS.emerald.primary }}>Qurban</span><span style={{ color: COLORS.gold.primary }}>Pro</span></div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Fitur", "Cara Kerja", "Harga"].map(l => <a key={l} href="#" style={{ fontSize: 14, color: COLORS.gray[600], textDecoration: "none" }}>{l}</a>)}
          <button onClick={onEnter} style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 10, padding: "8px 20px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
            Coba Sekarang
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: `linear-gradient(150deg, #f0fdf4 0%, #fefce8 100%)`, padding: "80px 32px 90px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 400, height: 400, background: `radial-gradient(circle, ${COLORS.emerald.primary}18 0%, transparent 70%)`, borderRadius: "50%" }} />
        <div style={{ position: "absolute", bottom: -80, left: -80, width: 500, height: 500, background: `radial-gradient(circle, ${COLORS.gold.primary}12 0%, transparent 70%)`, borderRadius: "50%" }} />
        <div style={{ display: "inline-block", background: COLORS.emerald.light, color: COLORS.emerald.dark, padding: "6px 18px", borderRadius: 99, fontSize: 13, fontWeight: 700, marginBottom: 24 }}>
          🌙 Platform Manajemen Qurban #1 Indonesia
        </div>
        <h1 style={{ fontSize: "clamp(32px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.15, margin: "0 auto 20px", maxWidth: 800, color: COLORS.gray[900] }}>
          Kelola Qurban Lebih{" "}
          <span style={{ color: COLORS.emerald.primary }}>Rapi</span>,{" "}
          <span style={{ color: COLORS.gold.primary }}>Transparan</span>, dan{" "}
          <span style={{ background: `linear-gradient(135deg, ${COLORS.emerald.primary}, ${COLORS.gold.primary})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Tanpa Chaos</span>
        </h1>
        <p style={{ fontSize: 18, color: COLORS.gray[500], maxWidth: 600, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Satu platform untuk panitia masjid mengelola mudhohi, hewan, kupon digital, distribusi daging, dan laporan keuangan secara profesional.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onEnter}
            style={{ background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 14, padding: "15px 36px", cursor: "pointer", fontSize: 17, fontWeight: 800, boxShadow: `0 8px 24px ${COLORS.emerald.primary}50` }}>
            🚀 Coba Sekarang — Gratis
          </button>
          <button style={{ background: "#fff", color: COLORS.gray[700], border: "1px solid #e5e7eb", borderRadius: 14, padding: "15px 36px", cursor: "pointer", fontSize: 17, fontWeight: 600 }}>
            📹 Lihat Demo
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 36, marginTop: 48, flexWrap: "wrap" }}>
          {[["500+", "Masjid & Komunitas"], ["50.000+", "Mustahiq Terkelola"], ["99.9%", "Uptime Terjamin"]].map(([n, l]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.emerald.dark }}>{n}</div>
              <div style={{ fontSize: 13, color: COLORS.gray[400] }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard mockup banner */}
      <div style={{ background: COLORS.emerald.dark, padding: "60px 32px", textAlign: "center" }}>
        <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20, padding: "32px", maxWidth: 800, margin: "0 auto", cursor: "pointer" }} onClick={onEnter}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
            {[["24", "Hewan Qurban", "🐄"], ["134", "Mudhohi", "👥"], ["312", "Mustahiq", "🤲"], ["60%", "Distribusi", "📊"]].map(([v, l, e]) => (
              <div key={l} style={{ background: "rgba(255,255,255,0.1)", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
                <div style={{ fontSize: 28, marginBottom: 4 }}>{e}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{l}</div>
              </div>
            ))}
          </div>
          <button onClick={onEnter} style={{ background: COLORS.gold.primary, color: "#fff", border: "none", borderRadius: 12, padding: "12px 32px", cursor: "pointer", fontSize: 15, fontWeight: 700 }}>
            ✨ Lihat Dashboard Lengkap →
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "80px 32px", background: COLORS.gray[50] }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, margin: 0 }}>Semua yang Panitia Butuhkan</h2>
          <p style={{ fontSize: 16, color: COLORS.gray[400], marginTop: 12 }}>Dari pendaftaran hingga laporan akhir, semua dalam satu platform.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {features.map(f => (
            <div key={f.title} style={{ background: "#fff", borderRadius: 18, border: "1px solid #e5e7eb", padding: "28px 26px", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 10px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: COLORS.gray[500], margin: 0, lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: "80px 32px", maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, margin: 0 }}>Mudah Digunakan Panitia Masjid</h2>
          <p style={{ fontSize: 16, color: COLORS.gray[400], marginTop: 12 }}>Tidak perlu keahlian IT — panitia siap dalam hitungan menit.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {steps.map(s => (
            <div key={s.n} style={{ textAlign: "center", padding: "24px 16px" }}>
              <div style={{ width: 56, height: 56, background: `linear-gradient(135deg, ${COLORS.emerald.primary}, ${COLORS.gold.primary})`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 18, fontWeight: 800, color: "#fff" }}>{s.n}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 13, color: COLORS.gray[500], margin: 0, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}
      <div style={{ padding: "80px 32px", background: COLORS.gray[50] }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontSize: 38, fontWeight: 900, margin: 0 }}>Paket Harga Terjangkau</h2>
          <p style={{ fontSize: 16, color: COLORS.gray[400], marginTop: 12 }}>Cocok untuk masjid kecil hingga komunitas besar.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, maxWidth: 860, margin: "0 auto" }}>
          {plans.map((p, i) => (
            <div key={p.name}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(1)}
              style={{
                background: "#fff", borderRadius: 20, padding: "28px 24px",
                border: (hoveredPlan === i || p.popular) ? `2px solid ${COLORS.emerald.primary}` : "2px solid #e5e7eb",
                position: "relative", transition: "all 0.2s", transform: p.popular ? "scale(1.04)" : "none",
                boxShadow: p.popular ? "0 12px 40px rgba(5,150,105,0.15)" : "none"
              }}>
              {p.popular && (
                <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: COLORS.emerald.primary, color: "#fff", padding: "4px 18px", borderRadius: 99, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                  ⭐ Paling Populer
                </div>
              )}
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.gray[700], marginBottom: 8 }}>{p.name}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 20 }}>
                {p.price !== "Custom" && <span style={{ fontSize: 12, color: COLORS.gray[400] }}>Rp</span>}
                <span style={{ fontSize: 32, fontWeight: 900, color: COLORS.emerald.dark }}>{p.price}</span>
                <span style={{ fontSize: 13, color: COLORS.gray[400] }}>{p.period}</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: COLORS.gray[600] }}>
                    <span style={{ color: COLORS.emerald.primary, fontWeight: 800 }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <button onClick={onEnter}
                style={{ width: "100%", background: p.popular ? COLORS.emerald.primary : "#f3f4f6", color: p.popular ? "#fff" : COLORS.gray[700], border: "none", borderRadius: 12, padding: "12px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${COLORS.emerald.dark} 0%, #0a4d39 100%)`, padding: "80px 32px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, margin: "0 0 16px" }}>Siap untuk Qurban yang Lebih Teratur?</h2>
        <p style={{ fontSize: 17, opacity: 0.75, marginBottom: 36, maxWidth: 500, margin: "0 auto 36px" }}>
          Bergabung dengan 500+ masjid dan komunitas yang sudah mempercayakan QurbanPro untuk manajemen qurban mereka.
        </p>
        <button onClick={onEnter}
          style={{ background: COLORS.gold.primary, color: "#fff", border: "none", borderRadius: 16, padding: "18px 48px", cursor: "pointer", fontSize: 20, fontWeight: 900, boxShadow: "0 8px 30px rgba(0,0,0,0.25)" }}>
          🚀 Mulai Sekarang — Gratis
        </button>
        <p style={{ marginTop: 16, opacity: 0.5, fontSize: 13 }}>Tidak perlu kartu kredit · Setup dalam 5 menit</p>
      </div>

      <footer style={{ background: COLORS.gray[900], color: "rgba(255,255,255,0.5)", padding: "24px 32px", textAlign: "center", fontSize: 13 }}>
        © 2025 QurbanPro · Dibuat dengan ❤️ untuk kemudahan panitia masjid Indonesia
      </footer>
    </div>
  );
}

// ============ LOGIN ============
function LoginPage({ onLogin }) {
  const [user, setUser] = useState("admin@masjid.com");
  const [pass, setPass] = useState("password");
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, ${COLORS.emerald.dark} 0%, #0a3d2b 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "44px 40px", width: "100%", maxWidth: 420, boxShadow: "0 24px 80px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🌙</div>
          <h1 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}><span style={{ color: COLORS.emerald.primary }}>Qurban</span><span style={{ color: COLORS.gold.primary }}>Pro</span></h1>
          <p style={{ fontSize: 14, color: COLORS.gray[400], marginTop: 6 }}>Masuk ke dashboard panitia Anda</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray[600], display: "block", marginBottom: 6 }}>Email</label>
          <input value={user} onChange={e => setUser(e.target.value)} style={{ width: "100%", padding: "11px 16px", borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 15, boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: COLORS.gray[600], display: "block", marginBottom: 6 }}>Password</label>
          <input type="password" value={pass} onChange={e => setPass(e.target.value)} style={{ width: "100%", padding: "11px 16px", borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 15, boxSizing: "border-box" }} />
        </div>
        <button onClick={onLogin} style={{ width: "100%", background: COLORS.emerald.primary, color: "#fff", border: "none", borderRadius: 14, padding: "14px", cursor: "pointer", fontSize: 16, fontWeight: 800, boxShadow: `0 6px 20px ${COLORS.emerald.primary}40` }}>
          Masuk ke Dashboard →
        </button>
        <div style={{ marginTop: 16, textAlign: "center", padding: "12px 16px", background: COLORS.gray[50], borderRadius: 10 }}>
          <p style={{ fontSize: 12, color: COLORS.gray[400], margin: 0 }}>Demo: gunakan email & password apapun</p>
        </div>
      </div>
    </div>
  );
}

// ============ ROOT ============
export default function App() {
  const [screen, setScreen] = useState("landing"); // landing | login | app
  return (
    <div>
      {screen === "landing" && <LandingPage onEnter={() => setScreen("login")} />}
      {screen === "login" && <LoginPage onLogin={() => setScreen("app")} />}
      {screen === "app" && <AppLayout />}
    </div>
  );
}
