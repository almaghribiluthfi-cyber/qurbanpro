import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// STORAGE HELPERS
// ============================================================
const STORAGE_KEYS = {
  hewan: "qp_hewan",
  mudhohi: "qp_mudhohi",
  mustahiq: "qp_mustahiq",
  sesi: "qp_sesi",
  keuangan: "qp_keuangan",
  settings: "qp_settings",
};

function useLocalStorage(key, initialData) {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialData;
    } catch { return initialData; }
  });
  const set = useCallback((val) => {
    setData(prev => {
      const next = typeof val === "function" ? val(prev) : val;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [data, set];
}

// ============================================================
// INITIAL DUMMY DATA
// ============================================================
const INIT_HEWAN = [
  { id: "H001", kode: "SAP-001", jenis: "Sapi", berat: 320, harga: 18500000, lokasi: "Kandang A", status: "Siap Disembelih", kelompok: "KEL-001", catatan: "" },
  { id: "H002", kode: "SAP-002", jenis: "Sapi", berat: 290, harga: 17000000, lokasi: "Kandang A", status: "Disembelih", kelompok: "KEL-002", catatan: "" },
  { id: "H003", kode: "KBG-001", jenis: "Kambing", berat: 35, harga: 3200000, lokasi: "Kandang B", status: "Dipotong", kelompok: "KEL-003", catatan: "" },
  { id: "H004", kode: "KBG-002", jenis: "Kambing", berat: 42, harga: 3800000, lokasi: "Kandang B", status: "Terdaftar", kelompok: "KEL-004", catatan: "" },
  { id: "H005", kode: "SAP-003", jenis: "Sapi", berat: 310, harga: 18000000, lokasi: "Kandang A", status: "Selesai", kelompok: "KEL-005", catatan: "" },
];
const INIT_MUDHOHI = [
  { id: "M001", nama: "H. Ahmad Fauzi", wa: "08123456789", alamat: "Jl. Mawar No. 12", jenis: "Sapi", namaAtas: "Almh. Siti Aminah", kelompok: "KEL-001", pembayaran: "Lunas", nominal: 2642857 },
  { id: "M002", nama: "Budi Santoso", wa: "08234567890", alamat: "Jl. Melati No. 5", jenis: "Kambing", namaAtas: "Budi Santoso", kelompok: "KEL-003", pembayaran: "Lunas", nominal: 3200000 },
  { id: "M003", nama: "Ibu Sari Dewi", wa: "08345678901", alamat: "Jl. Anggrek No. 8", jenis: "Sapi", namaAtas: "Keluarga Besar Santoso", kelompok: "KEL-001", pembayaran: "DP", nominal: 1000000 },
  { id: "M004", nama: "Pak Hendra", wa: "08456789012", alamat: "Jl. Kenanga No. 3", jenis: "Sapi", namaAtas: "Hendra & Keluarga", kelompok: "KEL-002", pembayaran: "Lunas", nominal: 2428571 },
  { id: "M005", nama: "Ustaz Ridwan", wa: "08567890123", alamat: "Komplek Masjid", jenis: "Kambing", namaAtas: "Ustaz Ridwan", kelompok: "KEL-004", pembayaran: "Lunas", nominal: 3800000 },
];
const INIT_MUSTAHIQ = [
  { id: "W001", nama: "Ibu Rohani", kategori: "Fakir Miskin", rt: "001", rw: "003", kupon: "KPN-0001", status: "Belum Diambil", sesi: "S001" },
  { id: "W002", nama: "Pak Joko", kategori: "Warga Sekitar", rt: "002", rw: "003", kupon: "KPN-0002", status: "Sudah Diambil", sesi: "S001" },
  { id: "W003", nama: "Nenek Mariyam", kategori: "Fakir Miskin", rt: "001", rw: "004", kupon: "KPN-0003", status: "Belum Diambil", sesi: "S002" },
  { id: "W004", nama: "Bapak Suparman", kategori: "Warga Sekitar", rt: "003", rw: "003", kupon: "KPN-0004", status: "Sudah Diambil", sesi: "S002" },
  { id: "W005", nama: "Panitia - Agus", kategori: "Panitia", rt: "-", rw: "-", kupon: "KPN-0005", status: "Sudah Diambil", sesi: "S001" },
];
const INIT_SESI = [
  { id: "S001", nama: "Sesi Pagi A", tanggal: "2025-06-09", jamMulai: "07:00", jamSelesai: "09:00", lokasi: "Halaman Masjid", kuota: 50 },
  { id: "S002", nama: "Sesi Pagi B", tanggal: "2025-06-09", jamMulai: "09:00", jamSelesai: "11:00", lokasi: "Halaman Masjid", kuota: 50 },
  { id: "S003", nama: "Sesi Siang", tanggal: "2025-06-09", jamMulai: "13:00", jamSelesai: "15:00", lokasi: "Aula Masjid", kuota: 50 },
];
const INIT_KEUANGAN = [
  { id: "K001", tipe: "Pemasukan", kategori: "Iuran Mudhohi", keterangan: "Pembayaran sapi KEL-001", jumlah: 18500000, tanggal: "2025-05-15" },
  { id: "K002", tipe: "Pemasukan", kategori: "Iuran Mudhohi", keterangan: "Pembayaran sapi KEL-002", jumlah: 17000000, tanggal: "2025-05-16" },
  { id: "K003", tipe: "Pengeluaran", kategori: "Pembelian Hewan", keterangan: "Beli sapi 3 ekor", jumlah: 53500000, tanggal: "2025-05-18" },
  { id: "K004", tipe: "Pengeluaran", kategori: "Perlengkapan", keterangan: "Plastik & tali", jumlah: 1500000, tanggal: "2025-05-19" },
  { id: "K005", tipe: "Pemasukan", kategori: "Donasi", keterangan: "Donasi Bpk H. Mahmud", jumlah: 5000000, tanggal: "2025-05-20" },
];
const INIT_SETTINGS = { namaLembaga: "Masjid Al-Ikhlas", ketua: "H. Ahmad Fauzi", wa: "0812-3456-7890", tanggal: "2025-06-09", lokasi: "Lapangan Masjid Al-Ikhlas" };

// ============================================================
// DESIGN TOKENS
// ============================================================
const C = {
  em: "#059669", emL: "#d1fae5", emD: "#065f46", emM: "#10b981",
  gold: "#d97706", goldL: "#fef3c7", goldD: "#78350f", goldM: "#f59e0b",
  g50: "#f9fafb", g100: "#f3f4f6", g200: "#e5e7eb", g300: "#d1d5db",
  g400: "#9ca3af", g500: "#6b7280", g600: "#4b5563", g700: "#374151", g800: "#1f2937", g900: "#111827",
  blue: "#3b82f6", blueL: "#dbeafe", purple: "#8b5cf6", purpleL: "#ede9fe",
  red: "#ef4444", redL: "#fee2e2", sky: "#0ea5e9", skyL: "#e0f2fe",
};

// ============================================================
// UTILS
// ============================================================
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function fRp(n) { return "Rp " + Number(n || 0).toLocaleString("id-ID"); }
function fDate(d) { if (!d) return "-"; try { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); } catch { return d; } }

const STATUS_COLORS = {
  "Terdaftar": { bg: C.blueL, tx: "#1e40af" },
  "Siap Disembelih": { bg: C.goldL, tx: C.goldD },
  "Disembelih": { bg: C.redL, tx: "#991b1b" },
  "Dikuliti": { bg: "#fce7f3", tx: "#9d174d" },
  "Dipotong": { bg: C.purpleL, tx: "#4c1d95" },
  "Dikemas": { bg: C.emL, tx: C.emD },
  "Selesai": { bg: C.emL, tx: C.emD },
  "Lunas": { bg: C.emL, tx: C.emD },
  "DP": { bg: C.goldL, tx: C.goldD },
  "Belum Dibayar": { bg: C.redL, tx: "#991b1b" },
  "Belum Diambil": { bg: C.goldL, tx: C.goldD },
  "Sudah Diambil": { bg: C.emL, tx: C.emD },
  "Batal": { bg: C.redL, tx: "#991b1b" },
};

function Badge({ s }) {
  const c = STATUS_COLORS[s] || { bg: C.g100, tx: C.g700 };
  return <span style={{ background: c.bg, color: c.tx, padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap", display: "inline-block" }}>{s}</span>;
}

// ============================================================
// UI PRIMITIVES
// ============================================================
function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const h = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: wide ? 680 : 520, maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }} onClick={e => e.stopPropagation()}>
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${C.g200}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#fff", zIndex: 1 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: C.g800 }}>{title}</h3>
          <button onClick={onClose} style={{ background: C.g100, border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontSize: 18, color: C.g500, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>
        <div style={{ padding: "20px 24px" }}>{children}</div>
      </div>
    </div>
  );
}

function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t); }, [onClose]);
  const bg = type === "success" ? C.em : type === "error" ? C.red : C.gold;
  const icon = type === "success" ? "✓" : type === "error" ? "✕" : "ℹ";
  return (
    <div style={{ background: bg, color: "#fff", padding: "13px 18px", borderRadius: 14, fontSize: 14, fontWeight: 500, boxShadow: "0 6px 24px rgba(0,0,0,0.18)", display: "flex", gap: 10, alignItems: "center", minWidth: 260, animation: "slideUp 0.3s ease" }}>
      <span style={{ fontSize: 16, fontWeight: 800 }}>{icon}</span>
      <span style={{ flex: 1 }}>{msg}</span>
      <button onClick={onClose} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", cursor: "pointer", borderRadius: 6, width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
    </div>
  );
}

function Inp({ label, value, onChange, type = "text", placeholder, required, options, textarea, min, step }) {
  const s = { width: "100%", padding: "10px 14px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 14, boxSizing: "border-box", background: "#fff", color: C.g800, outline: "none", fontFamily: "inherit" };
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: C.g600, display: "block", marginBottom: 5 }}>{label}{required && <span style={{ color: C.red }}> *</span>}</label>}
      {options ? (
        <select value={value} onChange={e => onChange(e.target.value)} style={s}>
          <option value="">-- Pilih --</option>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...s, minHeight: 80, resize: "vertical" }} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={s} min={min} step={step} />
      )}
    </div>
  );
}

function Btn({ children, onClick, color = C.em, outline, small, full, disabled }) {
  const bg = outline ? "transparent" : disabled ? C.g300 : color;
  const tx = outline ? color : "#fff";
  return (
    <button onClick={disabled ? undefined : onClick} style={{
      background: bg, color: tx, border: outline ? `2px solid ${color}` : "none",
      borderRadius: 10, padding: small ? "6px 14px" : "10px 20px", cursor: disabled ? "not-allowed" : "pointer",
      fontSize: small ? 13 : 14, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 6,
      width: full ? "100%" : "auto", justifyContent: full ? "center" : "flex-start", opacity: disabled ? 0.6 : 1,
      transition: "opacity 0.15s, transform 0.1s", fontFamily: "inherit",
      whiteSpace: "nowrap"
    }}
      onMouseDown={e => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}>
      {children}
    </button>
  );
}

function Card({ children, style }) {
  return <div style={{ background: "#fff", borderRadius: 16, border: `1px solid ${C.g200}`, overflow: "hidden", ...style }}>{children}</div>;
}

function EmptyState({ icon, title, desc, action }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: C.g400 }}>
      <div style={{ fontSize: 56, marginBottom: 16 }}>{icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: C.g600, margin: "0 0 8px" }}>{title}</h3>
      <p style={{ fontSize: 14, margin: "0 0 20px" }}>{desc}</p>
      {action}
    </div>
  );
}

function ConfirmModal({ msg, onConfirm, onClose }) {
  return (
    <Modal title="Konfirmasi" onClose={onClose}>
      <p style={{ fontSize: 15, color: C.g600, margin: "0 0 24px" }}>{msg}</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose} outline color={C.g400}>Batal</Btn>
        <Btn onClick={() => { onConfirm(); onClose(); }} color={C.red}>Ya, Hapus</Btn>
      </div>
    </Modal>
  );
}

// ============================================================
// SIDEBAR
// ============================================================
const MENUS = [
  { key: "dashboard", label: "Dashboard", icon: "⊞" },
  { key: "hewan", label: "Hewan Qurban", icon: "🐄" },
  { key: "mudhohi", label: "Mudhohi", icon: "👥" },
  { key: "mustahiq", label: "Mustahiq", icon: "🤲" },
  { key: "sesi", label: "Sesi Distribusi", icon: "📅" },
  { key: "scan", label: "Scan Kupon", icon: "🔍" },
  { key: "cetak", label: "Cetak Kupon", icon: "🖨️" },
  { key: "sertifikat", label: "Sertifikat", icon: "📜" },
  { key: "keuangan", label: "Laporan RAB", icon: "💰" },
  { key: "pengaturan", label: "Pengaturan", icon: "⚙️" },
];

function Sidebar({ active, setActive, mobile, onClose }) {
  const w = mobile ? "100%" : 230;
  return (
    <div style={{ width: w, minHeight: "100vh", background: `linear-gradient(170deg, ${C.emD} 0%, #042b1e 100%)`, display: "flex", flexDirection: "column", flexShrink: 0 }}>
      <div style={{ padding: "22px 20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
          <span style={{ color: C.goldM }}>Qurban</span>Pro
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>Manajemen Idul Adha 1446H</div>
      </div>
      <nav style={{ flex: 1, padding: "10px 8px" }}>
        {MENUS.map(m => (
          <button key={m.key} onClick={() => { setActive(m.key); onClose && onClose(); }}
            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: active === m.key ? "rgba(255,255,255,0.12)" : "transparent", border: "none", borderRadius: 10, color: active === m.key ? "#fff" : "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 14, fontWeight: active === m.key ? 700 : 400, marginBottom: 1, textAlign: "left", borderLeft: active === m.key ? `3px solid ${C.goldM}` : "3px solid transparent", transition: "all 0.15s", fontFamily: "inherit" }}>
            <span style={{ fontSize: 17 }}>{m.icon}</span>
            <span>{m.label}</span>
          </button>
        ))}
      </nav>
      <div style={{ padding: "14px 16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Login sebagai</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginTop: 2 }}>Admin Panitia</div>
      </div>
    </div>
  );
}

// ============================================================
// DASHBOARD
// ============================================================
function Dashboard({ hewan, mudhohi, mustahiq, keuangan, setPage }) {
  const totalPemasukan = keuangan.filter(k => k.tipe === "Pemasukan").reduce((s, k) => s + Number(k.jumlah), 0);
  const totalPengeluaran = keuangan.filter(k => k.tipe === "Pengeluaran").reduce((s, k) => s + Number(k.jumlah), 0);
  const kuponDiambil = mustahiq.filter(m => m.status === "Sudah Diambil").length;
  const pct = mustahiq.length ? Math.round(kuponDiambil / mustahiq.length * 100) : 0;

  const statusList = ["Terdaftar", "Siap Disembelih", "Disembelih", "Dikuliti", "Dipotong", "Dikemas", "Selesai"];
  const statusCount = statusList.map(s => ({ s, n: hewan.filter(h => h.status === s).length })).filter(x => x.n > 0);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: C.g900, margin: 0 }}>Dashboard Qurban 1446 H</h1>
        <p style={{ fontSize: 13, color: C.g400, margin: "4px 0 0" }}>Masjid Al-Ikhlas — Idul Adha 2025</p>
      </div>

      {/* Stat Cards */}
      <div className="stat-grid" style={{ marginBottom: 18 }}>
        {[
          { label: "Total Hewan", val: hewan.length, icon: "🐄", col: C.em, sub: `${hewan.filter(h=>h.jenis==="Sapi").length} sapi · ${hewan.filter(h=>h.jenis==="Kambing").length} kambing` },
          { label: "Total Mudhohi", val: mudhohi.length, icon: "👥", col: C.gold, sub: `${mudhohi.filter(m=>m.pembayaran==="Lunas").length} lunas` },
          { label: "Total Mustahiq", val: mustahiq.length, icon: "🤲", col: C.purple, sub: `${kuponDiambil} sudah diambil` },
          { label: "Pemasukan", val: fRp(totalPemasukan), icon: "💚", col: C.em, sub: "Total dana masuk" },
          { label: "Pengeluaran", val: fRp(totalPengeluaran), icon: "📤", col: C.red, sub: "Total pengeluaran" },
          { label: "Saldo", val: fRp(totalPemasukan - totalPengeluaran), icon: "💰", col: C.gold, sub: "Saldo akhir" },
        ].map(s => (
          <Card key={s.label} style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.g500, fontWeight: 500 }}>{s.label}</span>
              <span style={{ fontSize: 20, background: s.col + "18", padding: "5px 7px", borderRadius: 8 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.g900, lineHeight: 1.2 }}>{s.val}</div>
            <div style={{ fontSize: 11, color: C.g400, marginTop: 4 }}>{s.sub}</div>
          </Card>
        ))}
      </div>

      <div className="dash-grid" style={{ marginBottom: 16 }}>
        {/* Status Hewan */}
        <Card style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 800, color: C.g700 }}>Status Hewan Qurban</h3>
          {hewan.length === 0 ? <EmptyState icon="🐄" title="Belum ada hewan" desc="Tambah data hewan qurban" /> : (
            statusList.map(s => {
              const n = hewan.filter(h => h.status === s).length;
              if (!n && hewan.length > 0) return null;
              const c = STATUS_COLORS[s] || { bg: C.g100, tx: C.g500 };
              return (
                <div key={s} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: C.g600 }}>{s}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.tx }}>{n}</span>
                  </div>
                  <div style={{ height: 6, background: C.g100, borderRadius: 99 }}>
                    <div style={{ width: hewan.length ? (n / hewan.length * 100) + "%" : "0%", height: "100%", background: c.tx, borderRadius: 99, transition: "width 0.8s ease" }} />
                  </div>
                </div>
              );
            })
          )}
        </Card>

        {/* Distribusi Kupon */}
        <Card style={{ padding: "20px" }}>
          <h3 style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 800, color: C.g700 }}>Distribusi Kupon</h3>
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
            <svg viewBox="0 0 120 120" style={{ width: 120, height: 120 }}>
              <circle cx="60" cy="60" r="48" fill="none" stroke={C.g100} strokeWidth="14" />
              <circle cx="60" cy="60" r="48" fill="none" stroke={C.em} strokeWidth="14"
                strokeDasharray={`${2 * Math.PI * 48 * (pct / 100)} ${2 * Math.PI * 48 * (1 - pct / 100)}`}
                strokeDashoffset={2 * Math.PI * 48 * 0.25} strokeLinecap="round" transform="rotate(-90 60 60)" style={{ transition: "stroke-dasharray 1s ease" }} />
              <text x="60" y="56" textAnchor="middle" fontSize="20" fontWeight="900" fill={C.emD}>{pct}%</text>
              <text x="60" y="71" textAnchor="middle" fontSize="9" fill={C.g400}>sudah diambil</text>
            </svg>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.em }}>{kuponDiambil}</div>
              <div style={{ fontSize: 11, color: C.g400 }}>Sudah Diambil</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: C.gold }}>{mustahiq.length - kuponDiambil}</div>
              <div style={{ fontSize: 11, color: C.g400 }}>Belum Diambil</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Keuangan Banner */}
      <Card style={{ padding: "22px 26px", background: `linear-gradient(135deg, ${C.emD}, #0a5c3e)`, border: "none", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 17, fontWeight: 800, color: "#fff" }}>💰 Ringkasan Keuangan</h3>
            <p style={{ margin: "4px 0 0", opacity: 0.6, fontSize: 12 }}>Transparansi dana qurban</p>
          </div>
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {[["Pemasukan", totalPemasukan, C.goldM], ["Pengeluaran", totalPengeluaran, "#fca5a5"], ["Saldo", totalPemasukan - totalPengeluaran, "#fff"]].map(([l, v, col]) => (
              <div key={l}>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{l}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: col }}>{fRp(v)}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card style={{ padding: "20px" }}>
        <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 800, color: C.g700 }}>Aksi Cepat</h3>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { label: "Tambah Hewan", page: "hewan", icon: "🐄" },
            { label: "Tambah Mudhohi", page: "mudhohi", icon: "👥" },
            { label: "Scan Kupon", page: "scan", icon: "🔍" },
            { label: "Catat Transaksi", page: "keuangan", icon: "💰" },
          ].map(a => (
            <button key={a.label} onClick={() => setPage(a.page)}
              style={{ background: C.g50, border: `1px solid ${C.g200}`, borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: C.g700, display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit", transition: "background 0.15s" }}
              onMouseEnter={e => e.currentTarget.style.background = C.emL}
              onMouseLeave={e => e.currentTarget.style.background = C.g50}>
              {a.icon} {a.label}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ============================================================
// TABLE WRAPPER
// ============================================================
function Table({ cols, rows, empty }) {
  if (rows.length === 0) return empty;
  return (
    <div className="tbl-wrap">
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: C.g50 }}>
            {cols.map(c => <th key={c} style={{ padding: "11px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: C.g500, textTransform: "uppercase", letterSpacing: 0.4, whiteSpace: "nowrap" }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

function TR({ children, even }) {
  return <tr style={{ borderTop: `1px solid ${C.g100}`, background: even ? C.g50 : "#fff" }}>{children}</tr>;
}
function TD({ children, bold, small, mono }) {
  return <td style={{ padding: "11px 14px", fontSize: small ? 12 : 14, fontWeight: bold ? 700 : 400, color: bold ? C.g800 : C.g600, whiteSpace: "nowrap", fontFamily: mono ? "monospace" : "inherit" }}>{children}</td>;
}

// ============================================================
// PAGE HEADER
// ============================================================
function PageHeader({ title, sub, children }) {
  return (
    <div className="page-header">
      <div>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: C.g900, margin: 0 }}>{title}</h1>
        {sub && <p style={{ fontSize: 13, color: C.g400, margin: "4px 0 0" }}>{sub}</p>}
      </div>
      <div className="page-header-actions">{children}</div>
    </div>
  );
}

function SearchBar({ value, onChange, placeholder = "Cari..." }) {
  return (
    <div style={{ position: "relative", flex: 1, minWidth: 160, maxWidth: 240 }}>
      <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: C.g400, fontSize: 13, pointerEvents: "none" }}>🔎</span>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ padding: "8px 12px 8px 30px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 14, width: "100%", fontFamily: "inherit", outline: "none" }} />
    </div>
  );
}

// ============================================================
// HEWAN PAGE
// ============================================================
const HEWAN_STATUSES = ["Terdaftar", "Siap Disembelih", "Disembelih", "Dikuliti", "Dipotong", "Dikemas", "Selesai"];

function HewanForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { kode: "", jenis: "Sapi", berat: "", harga: "", lokasi: "", status: "Terdaftar", kelompok: "", catatan: "", foto: "" });
  const f = (k) => (v) => setForm(p => ({ ...p, [k]: v }));
  const fileRef = useRef();

  function handleFoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { alert("Ukuran foto maksimal 2MB!"); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setForm(p => ({ ...p, foto: ev.target.result }));
    reader.readAsDataURL(file);
  }

  function submit() {
    if (!form.kode || !form.jenis || !form.berat || !form.harga) return alert("Lengkapi field wajib!");
    onSave({ ...form, berat: Number(form.berat), harga: Number(form.harga) });
    onClose();
  }

  return (
    <>
      {/* Foto Upload */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: C.g600, display: "block", marginBottom: 8 }}>Foto Hewan</label>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <div onClick={() => fileRef.current?.click()}
            style={{ width: 120, height: 100, borderRadius: 12, border: `2px dashed ${form.foto ? C.em : C.g300}`, overflow: "hidden", cursor: "pointer", flexShrink: 0, background: C.g50, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            {form.foto ? (
              <>
                <img src={form.foto} alt="foto hewan" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0}>
                  <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>Ganti Foto</span>
                </div>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28 }}>📷</div>
                <div style={{ fontSize: 11, color: C.g400, marginTop: 4 }}>Klik upload</div>
              </div>
            )}
          </div>
          <div style={{ flex: 1 }}>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFoto} style={{ display: "none" }} />
            <Btn onClick={() => fileRef.current?.click()} color={C.g500} outline small>📁 Pilih Foto</Btn>
            <p style={{ fontSize: 11, color: C.g400, margin: "8px 0 0", lineHeight: 1.5 }}>
              Format: JPG, PNG, WEBP<br />
              Maks. 2MB · Di HP bisa langsung foto kamera
            </p>
            {form.foto && (
              <button onClick={() => setForm(p => ({ ...p, foto: "" }))}
                style={{ marginTop: 8, background: C.redL, color: "#991b1b", border: "none", borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 12, fontWeight: 600, fontFamily: "inherit" }}>
                🗑 Hapus Foto
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="form-grid">
        <Inp label="Kode Hewan" value={form.kode} onChange={f("kode")} placeholder="SAP-001" required />
        <Inp label="Jenis" value={form.jenis} onChange={f("jenis")} options={["Sapi", "Kambing"]} required />
        <Inp label="Berat (kg)" value={form.berat} onChange={f("berat")} type="number" min="1" required />
        <Inp label="Harga (Rp)" value={form.harga} onChange={f("harga")} type="number" min="0" step="1000" required />
        <Inp label="Lokasi Kandang" value={form.lokasi} onChange={f("lokasi")} placeholder="Kandang A" />
        <Inp label="Kelompok" value={form.kelompok} onChange={f("kelompok")} placeholder="KEL-001" />
        <div style={{ gridColumn: "1/-1" }}>
          <Inp label="Status" value={form.status} onChange={f("status")} options={HEWAN_STATUSES} />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          <Inp label="Catatan" value={form.catatan} onChange={f("catatan")} textarea placeholder="Catatan tambahan..." />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <Btn onClick={onClose} outline color={C.g400}>Batal</Btn>
        <Btn onClick={submit} color={C.em}>💾 Simpan</Btn>
      </div>
    </>
  );
}

function HewanPage({ hewan, setHewan, toast }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const filtered = hewan.filter(h => {
    const q = search.toLowerCase();
    return (filter === "Semua" || h.status === filter) &&
      (h.kode.toLowerCase().includes(q) || h.jenis.toLowerCase().includes(q) || h.kelompok.toLowerCase().includes(q));
  });

  function add(data) { setHewan(p => [...p, { ...data, id: uid() }]); toast("Hewan berhasil ditambahkan!", "success"); }
  function edit(data) { setHewan(p => p.map(h => h.id === modal.id ? { ...h, ...data } : h)); toast("Data hewan diperbarui!", "success"); }
  function del(id) { setHewan(p => p.filter(h => h.id !== id)); toast("Hewan dihapus.", "success"); }

  return (
    <div>
      <PageHeader title="Hewan Qurban" sub={`${hewan.length} hewan terdaftar`}>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari kode / jenis..." />
        <select value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: "inherit" }}>
          <option value="Semua">Semua Status</option>
          {HEWAN_STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah Hewan</Btn>
      </PageHeader>

      <Card>
        <Table cols={["Foto", "Kode", "Jenis", "Berat", "Harga", "Lokasi", "Status", "Aksi"]}
          empty={<EmptyState icon="🐄" title="Belum ada hewan" desc="Tambah data hewan qurban pertama" action={<Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah Hewan</Btn>} />}
          rows={filtered.map((h, i) => (
            <TR key={h.id} even={i % 2 === 0}>
              <TD>
                {h.foto ? (
                  <img src={h.foto} alt={h.kode} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", display: "block", border: `1px solid ${C.g200}` }} />
                ) : (
                  <div style={{ width: 44, height: 44, borderRadius: 8, background: C.g100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{h.jenis === "Sapi" ? "🐄" : "🐑"}</div>
                )}
              </TD>
              <TD bold><span style={{ color: C.emD }}>{h.kode}</span></TD>
              <TD>{h.jenis === "Sapi" ? "🐄" : "🐑"} {h.jenis}</TD>
              <TD>{h.berat} kg</TD>
              <TD>{fRp(h.harga)}</TD>
              <TD small>{h.lokasi || "-"}</TD>
              <TD><Badge s={h.status} /></TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn small color={C.sky} onClick={() => setModal({ mode: "edit", ...h })}>✏ Edit</Btn>
                  <Btn small color={C.red} onClick={() => setConfirm(h.id)}>🗑</Btn>
                </div>
              </TD>
            </TR>
          ))}
        />
      </Card>

      {modal && (
        <Modal title={modal.mode === "add" ? "Tambah Hewan Qurban" : "Edit Hewan Qurban"} onClose={() => setModal(null)} wide>
          <HewanForm initial={modal.mode === "edit" ? modal : null} onSave={modal.mode === "add" ? add : edit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && <ConfirmModal msg="Yakin hapus data hewan ini?" onConfirm={() => del(confirm)} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ============================================================
// MUDHOHI PAGE
// ============================================================
function MudhohiForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { nama: "", wa: "", alamat: "", jenis: "Sapi", namaAtas: "", kelompok: "", pembayaran: "Belum Dibayar", nominal: "" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function submit() {
    if (!form.nama || !form.wa) return alert("Nama dan No WA wajib diisi!");
    onSave({ ...form, nominal: Number(form.nominal) });
    onClose();
  }
  return (
    <>
      <div className="form-grid">
        <Inp label="Nama Lengkap" value={form.nama} onChange={f("nama")} placeholder="H. Ahmad Fauzi" required />
        <Inp label="No WhatsApp" value={form.wa} onChange={f("wa")} placeholder="08123456789" type="tel" required />
        <div style={{ gridColumn: "1/-1" }}>
          <Inp label="Alamat" value={form.alamat} onChange={f("alamat")} placeholder="Jl. Mawar No. 12" />
        </div>
        <Inp label="Jenis Qurban" value={form.jenis} onChange={f("jenis")} options={["Sapi", "Kambing"]} />
        <Inp label="Nama Atas Qurban" value={form.namaAtas} onChange={f("namaAtas")} placeholder="Nama yang atas namakan" />
        <Inp label="Kelompok / ID" value={form.kelompok} onChange={f("kelompok")} placeholder="KEL-001" />
        <Inp label="Status Pembayaran" value={form.pembayaran} onChange={f("pembayaran")} options={["Lunas", "DP", "Belum Dibayar"]} />
        <Inp label="Nominal Dibayar (Rp)" value={form.nominal} onChange={f("nominal")} type="number" min="0" step="1000" />
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <Btn onClick={onClose} outline color={C.g400}>Batal</Btn>
        <Btn onClick={submit} color={C.em}>💾 Simpan</Btn>
      </div>
    </>
  );
}

function MudhohiPage({ mudhohi, setMudhohi, toast }) {
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const filtered = mudhohi.filter(m => {
    const q = search.toLowerCase();
    return m.nama.toLowerCase().includes(q) || m.wa.includes(q) || m.kelompok.toLowerCase().includes(q);
  });

  function add(data) { setMudhohi(p => [...p, { ...data, id: "M" + uid() }]); toast("Mudhohi berhasil ditambahkan!", "success"); }
  function edit(data) { setMudhohi(p => p.map(m => m.id === modal.id ? { ...m, ...data } : m)); toast("Data mudhohi diperbarui!", "success"); }
  function del(id) { setMudhohi(p => p.filter(m => m.id !== id)); toast("Data dihapus.", "success"); }

  function kirimWA(m) {
    const msg = encodeURIComponent(`Assalamu'alaikum Bpk/Ibu *${m.nama}*,\n\nPendaftaran qurban Anda telah *terkonfirmasi* ✅\n\n• Jenis: ${m.jenis}\n• Nama Atas: ${m.namaAtas}\n• Kelompok: ${m.kelompok}\n• Status Bayar: ${m.pembayaran}\n\nBarakallahu fiikum 🌙\n_Panitia Qurban Masjid Al-Ikhlas_`);
    window.open(`https://wa.me/${m.wa.replace(/\D/g, "")}?text=${msg}`, "_blank");
  }

  return (
    <div>
      <PageHeader title="Data Mudhohi" sub={`${mudhohi.length} peserta qurban terdaftar`}>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari nama / WA..." />
        <Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah Mudhohi</Btn>
      </PageHeader>

      <Card>
        <Table cols={["Nama", "No WA", "Jenis Qurban", "Nama Atas", "Kelompok", "Pembayaran", "Nominal", "Aksi"]}
          empty={<EmptyState icon="👥" title="Belum ada mudhohi" desc="Tambah data peserta qurban" action={<Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah Mudhohi</Btn>} />}
          rows={filtered.map((m, i) => (
            <TR key={m.id} even={i % 2 === 0}>
              <TD bold>{m.nama}</TD>
              <TD><a href="#" onClick={e => { e.preventDefault(); kirimWA(m); }} style={{ color: "#16a34a", fontWeight: 600, textDecoration: "none", fontSize: 13 }}>📱 {m.wa}</a></TD>
              <TD>{m.jenis === "Sapi" ? "🐄" : "🐑"} {m.jenis}</TD>
              <TD small>{m.namaAtas || "-"}</TD>
              <TD small mono>{m.kelompok || "-"}</TD>
              <TD><Badge s={m.pembayaran} /></TD>
              <TD small>{m.nominal ? fRp(m.nominal) : "-"}</TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn small color={C.sky} onClick={() => setModal({ mode: "edit", ...m })}>✏ Edit</Btn>
                  <Btn small color={C.red} onClick={() => setConfirm(m.id)}>🗑</Btn>
                </div>
              </TD>
            </TR>
          ))}
        />
      </Card>

      {modal && (
        <Modal title={modal.mode === "add" ? "Tambah Mudhohi" : "Edit Mudhohi"} onClose={() => setModal(null)} wide>
          <MudhohiForm initial={modal.mode === "edit" ? modal : null} onSave={modal.mode === "add" ? add : edit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && <ConfirmModal msg="Yakin hapus data mudhohi ini?" onConfirm={() => del(confirm)} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ============================================================
// MUSTAHIQ PAGE
// ============================================================
const KATEGORI_MUSTAHIQ = ["Fakir Miskin", "Warga Sekitar", "Panitia", "Mudhohi", "Tokoh Masyarakat", "Lainnya"];

function MustahiqForm({ initial, sesi, onSave, onClose }) {
  const nextKupon = "KPN-" + String(Math.floor(Math.random() * 9000) + 1000).padStart(4, "0");
  const [form, setForm] = useState(initial || { nama: "", kategori: "Warga Sekitar", rt: "", rw: "", kupon: nextKupon, status: "Belum Diambil", sesi: "" });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function submit() {
    if (!form.nama || !form.kupon) return alert("Nama dan nomor kupon wajib!");
    onSave(form); onClose();
  }
  return (
    <>
      <div className="form-grid">
        <Inp label="Nama Lengkap" value={form.nama} onChange={f("nama")} required />
        <Inp label="Kategori" value={form.kategori} onChange={f("kategori")} options={KATEGORI_MUSTAHIQ} />
        <Inp label="RT" value={form.rt} onChange={f("rt")} placeholder="001" />
        <Inp label="RW" value={form.rw} onChange={f("rw")} placeholder="003" />
        <Inp label="No. Kupon" value={form.kupon} onChange={f("kupon")} placeholder="KPN-0001" required />
        <Inp label="Status Kupon" value={form.status} onChange={f("status")} options={["Belum Diambil", "Sudah Diambil", "Batal"]} />
        <div style={{ gridColumn: "1/-1" }}>
          <Inp label="Sesi Distribusi" value={form.sesi} onChange={f("sesi")} options={["", ...sesi.map(s => s.id + " - " + s.nama)]} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
        <Btn onClick={onClose} outline color={C.g400}>Batal</Btn>
        <Btn onClick={submit} color={C.em}>💾 Simpan</Btn>
      </div>
    </>
  );
}

function MustahiqPage({ mustahiq, setMustahiq, sesi, toast }) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const filtered = mustahiq.filter(m => {
    const q = search.toLowerCase();
    return (filterStatus === "Semua" || m.status === filterStatus) &&
      (m.nama.toLowerCase().includes(q) || m.kupon.toLowerCase().includes(q) || m.kategori.toLowerCase().includes(q));
  });

  function add(data) { setMustahiq(p => [...p, { ...data, id: "W" + uid() }]); toast("Mustahiq ditambahkan!", "success"); }
  function edit(data) { setMustahiq(p => p.map(m => m.id === modal.id ? { ...m, ...data } : m)); toast("Data diperbarui!", "success"); }
  function del(id) { setMustahiq(p => p.filter(m => m.id !== id)); toast("Data dihapus.", "success"); }
  function tandai(id) { setMustahiq(p => p.map(m => m.id === id ? { ...m, status: "Sudah Diambil" } : m)); toast("Kupon ditandai sudah diambil! ✓", "success"); }

  function genBulk() {
    const news = Array.from({ length: 10 }, (_, i) => ({
      id: "W" + uid(), nama: `Warga RT 005 #${i + 1}`, kategori: "Warga Sekitar",
      rt: "005", rw: "003", kupon: "KPN-" + String(mustahiq.length + i + 1).padStart(4, "0"),
      status: "Belum Diambil", sesi: sesi[0]?.id || ""
    }));
    setMustahiq(p => [...p, ...news]);
    toast("10 kupon warga RT 005 berhasil digenerate!", "success");
  }

  return (
    <div>
      <PageHeader title="Data Mustahiq" sub={`${mustahiq.length} penerima daging`}>
        <SearchBar value={search} onChange={setSearch} placeholder="Cari nama / kupon..." />
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: "inherit" }}>
          {["Semua", "Belum Diambil", "Sudah Diambil", "Batal"].map(s => <option key={s}>{s}</option>)}
        </select>
        <Btn onClick={genBulk} color={C.gold}>🎫 Generate Kupon RT</Btn>
        <Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah</Btn>
      </PageHeader>

      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        {[["Semua", mustahiq.length, C.g500], ["Belum Diambil", mustahiq.filter(m => m.status === "Belum Diambil").length, C.gold], ["Sudah Diambil", mustahiq.filter(m => m.status === "Sudah Diambil").length, C.em], ["Batal", mustahiq.filter(m => m.status === "Batal").length, C.red]].map(([l, n, col]) => (
          <button key={l} onClick={() => setFilterStatus(l)}
            style={{ background: filterStatus === l ? col + "18" : C.g50, border: `1px solid ${filterStatus === l ? col : C.g200}`, borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: filterStatus === l ? 700 : 500, color: filterStatus === l ? col : C.g600, fontFamily: "inherit" }}>
            {l} <span style={{ fontWeight: 800 }}>({n})</span>
          </button>
        ))}
      </div>

      <Card>
        <Table cols={["Nama", "Kategori", "RT/RW", "No. Kupon", "Sesi", "Status", "Aksi"]}
          empty={<EmptyState icon="🤲" title="Belum ada mustahiq" desc="Tambah penerima daging qurban" action={<Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah</Btn>} />}
          rows={filtered.map((m, i) => (
            <TR key={m.id} even={i % 2 === 0}>
              <TD bold>{m.nama}</TD>
              <TD small>{m.kategori}</TD>
              <TD small mono>RT {m.rt}/RW {m.rw}</TD>
              <TD small mono><span style={{ color: C.sky, fontWeight: 700 }}>{m.kupon}</span></TD>
              <TD small>{sesi.find(s => s.id === m.sesi)?.nama || m.sesi || "-"}</TD>
              <TD><Badge s={m.status} /></TD>
              <TD>
                <div style={{ display: "flex", gap: 5 }}>
                  {m.status === "Belum Diambil" && <Btn small color={C.em} onClick={() => tandai(m.id)}>✓ Diambil</Btn>}
                  <Btn small color={C.sky} onClick={() => setModal({ mode: "edit", ...m })}>✏</Btn>
                  <Btn small color={C.red} onClick={() => setConfirm(m.id)}>🗑</Btn>
                </div>
              </TD>
            </TR>
          ))}
        />
      </Card>

      {modal && (
        <Modal title={modal.mode === "add" ? "Tambah Mustahiq" : "Edit Mustahiq"} onClose={() => setModal(null)} wide>
          <MustahiqForm initial={modal.mode === "edit" ? modal : null} sesi={sesi} onSave={modal.mode === "add" ? add : edit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && <ConfirmModal msg="Yakin hapus data mustahiq ini?" onConfirm={() => del(confirm)} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ============================================================
// SESI PAGE
// ============================================================
function SesiForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { nama: "", tanggal: "2025-06-09", jamMulai: "07:00", jamSelesai: "09:00", lokasi: "", kuota: 50 });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function submit() {
    if (!form.nama || !form.tanggal) return alert("Nama dan tanggal wajib!");
    onSave({ ...form, kuota: Number(form.kuota) }); onClose();
  }
  return (
    <>
      <Inp label="Nama Sesi" value={form.nama} onChange={f("nama")} placeholder="Sesi Pagi A" required />
      <div className="form-grid">
        <Inp label="Tanggal" value={form.tanggal} onChange={f("tanggal")} type="date" required />
        <Inp label="Kuota Maksimal" value={form.kuota} onChange={f("kuota")} type="number" min="1" />
        <Inp label="Jam Mulai" value={form.jamMulai} onChange={f("jamMulai")} type="time" />
        <Inp label="Jam Selesai" value={form.jamSelesai} onChange={f("jamSelesai")} type="time" />
      </div>
      <Inp label="Lokasi" value={form.lokasi} onChange={f("lokasi")} placeholder="Halaman Masjid" />
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose} outline color={C.g400}>Batal</Btn>
        <Btn onClick={submit} color={C.em}>💾 Simpan</Btn>
      </div>
    </>
  );
}

function SesiPage({ sesi, setSesi, mustahiq, toast }) {
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  function add(data) { setSesi(p => [...p, { ...data, id: "S" + uid() }]); toast("Sesi ditambahkan!", "success"); }
  function edit(data) { setSesi(p => p.map(s => s.id === modal.id ? { ...s, ...data } : s)); toast("Sesi diperbarui!", "success"); }
  function del(id) { setSesi(p => p.filter(s => s.id !== id)); toast("Sesi dihapus.", "success"); }

  return (
    <div>
      <PageHeader title="Sesi Distribusi" sub="Jadwal pembagian daging qurban">
        <Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Buat Sesi</Btn>
      </PageHeader>

      {sesi.length === 0 ? (
        <EmptyState icon="📅" title="Belum ada sesi" desc="Buat jadwal sesi distribusi daging" action={<Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Buat Sesi</Btn>} />
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {sesi.map(s => {
            const terisi = mustahiq.filter(m => m.sesi === s.id).length;
            const pct = Math.round(terisi / s.kuota * 100);
            const penuh = terisi >= s.kuota;
            return (
              <Card key={s.id} style={{ padding: "20px", border: penuh ? `2px solid ${C.red}` : `1px solid ${C.g200}` }}>
                {penuh && <div style={{ background: C.redL, color: "#991b1b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10 }}>⚠ PENUH</div>}
                <h3 style={{ margin: "0 0 6px", fontSize: 16, fontWeight: 800, color: C.g800 }}>{s.nama}</h3>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: C.g400 }}>📅 {fDate(s.tanggal)}</p>
                <p style={{ margin: "0 0 4px", fontSize: 13, color: C.g400 }}>⏰ {s.jamMulai} – {s.jamSelesai}</p>
                <p style={{ margin: "0 0 14px", fontSize: 13, color: C.g400 }}>📍 {s.lokasi || "-"}</p>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: C.g500 }}>Terisi</span>
                    <span style={{ fontSize: 12, fontWeight: 800, color: penuh ? C.red : C.em }}>{terisi}/{s.kuota}</span>
                  </div>
                  <div style={{ height: 8, background: C.g100, borderRadius: 99 }}>
                    <div style={{ width: Math.min(pct, 100) + "%", height: "100%", background: penuh ? C.red : C.em, borderRadius: 99, transition: "width 0.6s ease" }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Btn small color={C.sky} onClick={() => setModal({ mode: "edit", ...s })}>✏ Edit</Btn>
                  <Btn small color={C.red} onClick={() => setConfirm(s.id)}>🗑 Hapus</Btn>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {modal && (
        <Modal title={modal.mode === "add" ? "Buat Sesi Baru" : "Edit Sesi"} onClose={() => setModal(null)}>
          <SesiForm initial={modal.mode === "edit" ? modal : null} onSave={modal.mode === "add" ? add : edit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && <ConfirmModal msg="Yakin hapus sesi ini?" onConfirm={() => del(confirm)} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ============================================================
// QR SCANNER COMPONENT (pakai kamera native browser)
// ============================================================
function QRScanner({ onScan, onClose }) {
  const videoRef = useRef();
  const streamRef = useRef();
  const [err, setErr] = useState("");
  const [scanning, setScanning] = useState(false);
  const canvasRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setScanning(true);
        scanLoop();
      }
    } catch (e) {
      setErr("Kamera tidak dapat diakses. Pastikan izin kamera sudah diberikan di browser.");
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach(t => t.stop());
    cancelAnimationFrame(rafRef.current);
  }

  function scanLoop() {
    rafRef.current = requestAnimationFrame(() => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || video.readyState !== 4) { scanLoop(); return; }
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      try {
        if (window.BarcodeDetector) {
          new window.BarcodeDetector({ formats: ["qr_code"] })
            .detect(canvas)
            .then(codes => {
              if (codes.length > 0) {
                const val = codes[0].rawValue;
                stopCamera();
                onScan(val);
              } else { scanLoop(); }
            }).catch(() => scanLoop());
        } else { scanLoop(); }
      } catch { scanLoop(); }
    });
  }

  return (
    <div style={{ position: "relative" }}>
      {err ? (
        <div style={{ background: C.redL, border: `1px solid #fca5a5`, borderRadius: 14, padding: "20px", textAlign: "center", color: "#991b1b" }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>📵</div>
          <p style={{ fontWeight: 600, margin: "0 0 12px" }}>{err}</p>
          <Btn onClick={onClose} color={C.g500} outline>Tutup Kamera</Btn>
        </div>
      ) : (
        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "#000" }}>
          <video ref={videoRef} style={{ width: "100%", display: "block", borderRadius: 16 }} playsInline muted />
          <canvas ref={canvasRef} style={{ display: "none" }} />
          {/* Viewfinder overlay */}
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 200, height: 200, position: "relative" }}>
              {[["0 0 auto auto", "0 0"], ["0 auto auto 0", "0 0"], ["auto 0 0 auto", "auto 0"], ["auto auto 0 0", "auto 0"]].map(([inset, br], i) => (
                <div key={i} style={{ position: "absolute", width: 36, height: 36, top: inset.split(" ")[0], right: inset.split(" ")[1], bottom: inset.split(" ")[2], left: inset.split(" ")[3], borderTop: i < 2 ? `3px solid ${C.em}` : "none", borderBottom: i >= 2 ? `3px solid ${C.em}` : "none", borderLeft: i % 2 === 0 ? `3px solid ${C.em}` : "none", borderRight: i % 2 !== 0 ? `3px solid ${C.em}` : "none" }} />
              ))}
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: `${C.em}80`, animation: "scan 2s linear infinite" }} />
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.7))", padding: "20px 16px 12px", textAlign: "center" }}>
            <p style={{ color: "#fff", fontSize: 13, margin: "0 0 10px", opacity: 0.85 }}>Arahkan kamera ke QR Code kupon</p>
            <Btn onClick={() => { stopCamera(); onClose(); }} color="#fff" outline small>✕ Tutup Kamera</Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// SCAN PAGE
// ============================================================
function ScanPage({ mustahiq, setMustahiq, toast }) {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [err, setErr] = useState("");
  const [history, setHistory] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const [mode, setMode] = useState("manual"); // manual | camera
  const inputRef = useRef();

  useEffect(() => { if (mode === "manual") inputRef.current?.focus(); }, [mode]);

  function scan(val) {
    const q = (val || input).trim().toUpperCase();
    setErr(""); setResult(null);
    if (!q) return;
    const found = mustahiq.find(m => m.kupon === q);
    if (!found) { setErr(`Kupon "${q}" tidak ditemukan dalam sistem.`); return; }
    if (found.status === "Batal") { setErr(`Kupon ${q} telah dibatalkan.`); return; }
    setResult(found);
  }

  function onQRScan(val) {
    setShowCamera(false);
    setMode("manual");
    setInput(val.toUpperCase());
    setTimeout(() => scan(val), 100);
    toast(`QR Code terbaca: ${val}`, "info");
  }

  function tandai() {
    if (!result) return;
    if (result.status === "Sudah Diambil") { setErr("Kupon ini sudah pernah digunakan!"); return; }
    setMustahiq(p => p.map(m => m.id === result.id ? { ...m, status: "Sudah Diambil" } : m));
    const updated = { ...result, status: "Sudah Diambil" };
    setHistory(h => [{ ...updated, waktu: new Date().toLocaleTimeString("id-ID") }, ...h.slice(0, 9)]);
    toast(`Kupon ${result.kupon} berhasil divalidasi! ✓`, "success");
    setResult(null); setInput("");
    inputRef.current?.focus();
  }

  const freshResult = result ? mustahiq.find(m => m.id === result.id) : null;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto" }}>
      <style>{`@keyframes scan { 0%{top:10%} 50%{top:85%} 100%{top:10%} }`}</style>
      <PageHeader title="Scan Kupon" sub="Validasi pengambilan daging qurban" />

      {/* Mode Toggle */}
      <div style={{ display: "flex", gap: 0, marginBottom: 16, background: C.g100, borderRadius: 12, padding: 4 }}>
        {[["manual", "⌨️ Input Manual"], ["camera", "📷 Scan Kamera"]].map(([m, l]) => (
          <button key={m} onClick={() => { setMode(m); setErr(""); setResult(null); if (m === "camera") setShowCamera(true); else setShowCamera(false); }}
            style={{ flex: 1, padding: "10px", borderRadius: 10, border: "none", background: mode === m ? "#fff" : "transparent", color: mode === m ? C.emD : C.g500, fontWeight: mode === m ? 700 : 500, cursor: "pointer", fontSize: 14, fontFamily: "inherit", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.1)" : "none", transition: "all 0.2s" }}>
            {l}
          </button>
        ))}
      </div>

      <Card style={{ padding: "20px", marginBottom: 16 }}>
        {showCamera ? (
          <QRScanner onScan={onQRScan} onClose={() => { setShowCamera(false); setMode("manual"); }} />
        ) : mode === "camera" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <button onClick={() => setShowCamera(true)}
              style={{ background: C.em, color: "#fff", border: "none", borderRadius: 14, padding: "16px 32px", cursor: "pointer", fontSize: 16, fontWeight: 700, fontFamily: "inherit" }}>
              📷 Buka Kamera
            </button>
            <p style={{ fontSize: 12, color: C.g400, marginTop: 10 }}>Browser akan meminta izin akses kamera</p>
          </div>
        ) : (
          <>
            <label style={{ fontSize: 13, fontWeight: 700, color: C.g600, display: "block", marginBottom: 8 }}>Nomor Kupon</label>
            <div style={{ display: "flex", gap: 10 }}>
              <input ref={inputRef} value={input}
                onChange={e => { setInput(e.target.value.toUpperCase()); setErr(""); setResult(null); }}
                onKeyDown={e => e.key === "Enter" && scan()}
                placeholder="Contoh: KPN-0001"
                style={{ flex: 1, padding: "12px 16px", borderRadius: 12, border: `2px solid ${C.g200}`, fontSize: 16, fontFamily: "monospace", outline: "none", textTransform: "uppercase" }} />
              <Btn onClick={() => scan()} color={C.em}>🔍 Cek</Btn>
            </div>
            <p style={{ fontSize: 12, color: C.g400, margin: "8px 0 0" }}>Tekan Enter atau klik Cek untuk memvalidasi</p>

            {/* Quick pick dari daftar belum diambil */}
            {mustahiq.filter(m => m.status === "Belum Diambil").length > 0 && (
              <div style={{ marginTop: 14 }}>
                <p style={{ fontSize: 12, color: C.g400, margin: "0 0 8px" }}>Kupon belum diambil:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {mustahiq.filter(m => m.status === "Belum Diambil").slice(0, 8).map(m => (
                    <button key={m.id} onClick={() => { setInput(m.kupon); scan(m.kupon); }}
                      style={{ background: C.skyL, color: C.sky, border: `1px solid ${C.sky}30`, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "monospace" }}>
                      {m.kupon}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {err && (
        <div style={{ background: C.redL, border: `1px solid #fca5a5`, borderRadius: 14, padding: "16px 20px", color: "#991b1b", fontWeight: 600, fontSize: 14, marginBottom: 16, display: "flex", gap: 10, alignItems: "center" }}>
          <span style={{ fontSize: 20 }}>⛔</span> {err}
        </div>
      )}

      {freshResult && (
        <Card style={{ border: `2px solid ${freshResult.status === "Sudah Diambil" ? C.red : C.em}`, padding: "20px" }}>
          {freshResult.status === "Sudah Diambil" ? (
            <div style={{ background: C.redL, borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: "#991b1b", fontWeight: 700, fontSize: 14 }}>
              ⚠ KUPON INI SUDAH PERNAH DIGUNAKAN!
            </div>
          ) : (
            <div style={{ background: C.emL, borderRadius: 10, padding: "12px 16px", marginBottom: 16, color: C.emD, fontWeight: 700, fontSize: 14 }}>
              ✅ KUPON VALID — SIAP DIVALIDASI
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[["Nama", freshResult.nama], ["Kategori", freshResult.kategori], ["No. Kupon", freshResult.kupon], ["RT/RW", `RT ${freshResult.rt}/RW ${freshResult.rw}`]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: `1px solid ${C.g100}` }}>
                <span style={{ fontSize: 13, color: C.g400 }}>{k}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: C.g800 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: C.g400 }}>Status</span>
              <Badge s={freshResult.status} />
            </div>
          </div>
          {freshResult.status !== "Sudah Diambil" && (
            <Btn onClick={tandai} color={C.em} full style={{ marginTop: 16 }}>✓ Tandai Sudah Diambil</Btn>
          )}
        </Card>
      )}

      {history.length > 0 && (
        <Card style={{ padding: "18px", marginTop: 16 }}>
          <h4 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 800, color: C.g600 }}>Riwayat Scan Hari Ini ({history.length})</h4>
          {history.map((h, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < history.length - 1 ? `1px solid ${C.g100}` : "none" }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.g800 }}>{h.nama}</span>
                <span style={{ fontSize: 12, color: C.g400, marginLeft: 8 }}>{h.kupon}</span>
              </div>
              <span style={{ fontSize: 12, color: C.g400 }}>{h.waktu}</span>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ============================================================
// CETAK KUPON PAGE
// ============================================================

// Mini QR generator pakai SVG path (tidak butuh library)
function QRCode({ value, size = 80 }) {
  // Simple visual QR representation - pakai canvas + qrcode generation
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = size;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#000";
    // Generate simple hash-based QR visual
    const hash = value.split("").reduce((a, c) => ((a << 5) - a) + c.charCodeAt(0), 0);
    const cells = 21;
    const cell = s / cells;
    // Finder patterns (3 corners)
    [[0,0],[0,cells-7],[cells-7,0]].forEach(([r, c]) => {
      ctx.fillRect(c*cell, r*cell, 7*cell, 7*cell);
      ctx.fillStyle = "#fff";
      ctx.fillRect((c+1)*cell, (r+1)*cell, 5*cell, 5*cell);
      ctx.fillStyle = "#000";
      ctx.fillRect((c+2)*cell, (r+2)*cell, 3*cell, 3*cell);
    });
    // Data modules (pseudo-random from hash)
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        if ((r < 9 && c < 9) || (r < 9 && c > cells-9) || (r > cells-9 && c < 9)) continue;
        const bit = ((hash ^ (r * 31 + c * 17)) & 1);
        if (bit) ctx.fillRect(c * cell, r * cell, cell, cell);
      }
    }
    // Text below
    ctx.fillStyle = "#000";
    ctx.font = `bold ${Math.max(7, s/12)}px monospace`;
    ctx.textAlign = "center";
    ctx.fillText(value, s/2, s + s/10 + 4);
  }, [value, size]);
  return <canvas ref={canvasRef} width={size} height={size + size/8} style={{ display: "block" }} />;
}

function KuponCard({ m, sesi, settings, showBorder }) {
  const sesiData = sesi.find(s => s.id === m.sesi);
  const sudahDiambil = m.status === "Sudah Diambil";
  return (
    <div style={{
      width: "9cm", minHeight: "6cm", border: showBorder ? "1px dashed #ccc" : "none",
      borderRadius: 8, overflow: "hidden", background: "#fff",
      fontFamily: "Arial, sans-serif", position: "relative",
      pageBreakInside: "avoid", breakInside: "avoid"
    }}>
      {/* Header hijau */}
      <div style={{ background: sudahDiambil ? "#6b7280" : "#059669", color: "#fff", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: 0.5 }}>KUPON DAGING QURBAN 1446H</div>
          <div style={{ fontSize: 9, opacity: 0.85, marginTop: 1 }}>{settings?.namaLembaga || "Masjid Al-Ikhlas"}</div>
        </div>
        <div style={{ fontSize: 18, fontWeight: 900, color: "#fef3c7", letterSpacing: -0.5 }}>QP</div>
      </div>
      {/* Body */}
      <div style={{ display: "flex", padding: "8px 12px", gap: 10, alignItems: "flex-start" }}>
        {/* QR */}
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <QRCode value={m.kupon} size={64} />
        </div>
        {/* Info */}
        <div style={{ flex: 1, fontSize: 11 }}>
          <div style={{ fontWeight: 900, fontSize: 13, color: "#111827", marginBottom: 4, lineHeight: 1.2 }}>{m.nama}</div>
          <div style={{ color: "#6b7280", marginBottom: 2 }}>Kategori: <b style={{ color: "#374151" }}>{m.kategori}</b></div>
          <div style={{ color: "#6b7280", marginBottom: 2 }}>RT/RW: <b style={{ color: "#374151" }}>RT {m.rt}/RW {m.rw}</b></div>
          {sesiData && <>
            <div style={{ color: "#6b7280", marginBottom: 2 }}>Sesi: <b style={{ color: "#374151" }}>{sesiData.nama}</b></div>
            <div style={{ color: "#6b7280", marginBottom: 2 }}>Waktu: <b style={{ color: "#374151" }}>{sesiData.jamMulai}–{sesiData.jamSelesai}</b></div>
            <div style={{ color: "#6b7280" }}>Lokasi: <b style={{ color: "#374151" }}>{sesiData.lokasi}</b></div>
          </>}
        </div>
      </div>
      {/* Footer */}
      <div style={{ background: "#f9fafb", borderTop: "1px solid #e5e7eb", padding: "5px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: 12, fontWeight: 700, color: "#059669", letterSpacing: 1 }}>{m.kupon}</div>
        <div style={{ fontSize: 9, color: "#9ca3af" }}>Tunjukkan ke panitia distribusi</div>
      </div>
      {/* Watermark jika sudah diambil */}
      {sudahDiambil && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.08)", pointerEvents: "none" }}>
          <div style={{ color: "#9ca3af", fontSize: 20, fontWeight: 900, transform: "rotate(-20deg)", border: "3px solid #9ca3af", padding: "4px 12px", borderRadius: 6, opacity: 0.6 }}>DIAMBIL</div>
        </div>
      )}
    </div>
  );
}

function CetakPage({ mustahiq, sesi, settings }) {
  const [filterStatus, setFilterStatus] = useState("Belum Diambil");
  const [filterKategori, setFilterKategori] = useState("Semua");
  const [filterSesi, setFilterSesi] = useState("Semua");
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(8);
  const [showBorder, setShowBorder] = useState(true);

  const filtered = mustahiq.filter(m => {
    const q = search.toLowerCase();
    return (filterStatus === "Semua" || m.status === filterStatus) &&
      (filterKategori === "Semua" || m.kategori === filterKategori) &&
      (filterSesi === "Semua" || m.sesi === filterSesi) &&
      (m.nama.toLowerCase().includes(q) || m.kupon.toLowerCase().includes(q));
  });

  function handlePrint() {
    window.print();
  }

  const kategoriList = ["Semua", ...Array.from(new Set(mustahiq.map(m => m.kategori)))];

  return (
    <div>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-area, #print-area * { visibility: visible !important; }
          #print-area { position: fixed !important; top: 0 !important; left: 0 !important; width: 100% !important; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 1cm; }
        }
      `}</style>

      {/* Kontrol - tidak tercetak */}
      <div className="no-print">
        <PageHeader title="Cetak Kupon" sub={`${filtered.length} kupon siap cetak`}>
          <Btn onClick={handlePrint} color={C.em}>🖨️ Print Sekarang</Btn>
        </PageHeader>

        <Card style={{ padding: "16px 20px", marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Cari nama / kupon..." />
            <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: "inherit" }}>
              {["Semua", "Belum Diambil", "Sudah Diambil", "Batal"].map(s => <option key={s}>{s}</option>)}
            </select>
            <select value={filterKategori} onChange={e => setFilterKategori(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: "inherit" }}>
              {kategoriList.map(k => <option key={k}>{k}</option>)}
            </select>
            <select value={filterSesi} onChange={e => setFilterSesi(e.target.value)}
              style={{ padding: "8px 12px", borderRadius: 10, border: `1px solid ${C.g200}`, fontSize: 13, fontFamily: "inherit" }}>
              <option value="Semua">Semua Sesi</option>
              {sesi.map(s => <option key={s.id} value={s.id}>{s.nama}</option>)}
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: C.g600, cursor: "pointer" }}>
              <input type="checkbox" checked={showBorder} onChange={e => setShowBorder(e.target.checked)} />
              Tampilkan garis potong
            </label>
          </div>

          {/* Info strip */}
          <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
            {[
              ["Total kupon", filtered.length, C.g700],
              ["Belum diambil", filtered.filter(m => m.status === "Belum Diambil").length, C.gold],
              ["Sudah diambil", filtered.filter(m => m.status === "Sudah Diambil").length, C.em],
            ].map(([l, n, col]) => (
              <div key={l} style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: col }} />
                <span style={{ fontSize: 13, color: C.g500 }}>{l}:</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: col }}>{n}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Preview label */}
        <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.g700 }}>Preview Kupon:</span>
          <span style={{ fontSize: 12, color: C.g400 }}>Tampilan di bawah sama persis saat dicetak</span>
        </div>
      </div>

      {/* Area cetak */}
      {filtered.length === 0 ? (
        <EmptyState icon="🎫" title="Tidak ada kupon" desc="Sesuaikan filter di atas untuk menampilkan kupon" />
      ) : (
        <div id="print-area" style={{ background: "#fff", padding: "0.5cm" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, 9cm)", gap: showBorder ? "0.3cm" : "0.2cm", justifyContent: "center" }}>
            {filtered.map(m => (
              <KuponCard key={m.id} m={m} sesi={sesi} settings={settings} showBorder={showBorder} />
            ))}
          </div>
          {/* Footer print only */}
          <div style={{ marginTop: "0.5cm", borderTop: "1px solid #e5e7eb", paddingTop: 8, fontSize: 9, color: "#9ca3af", textAlign: "center" }}>
            Dicetak oleh: {settings?.namaLembaga || "QurbanPro"} · {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })} · Total {filtered.length} kupon
          </div>
        </div>
      )}
    </div>
  );
}


// ============================================================
// SERTIFIKAT PAGE
// ============================================================
function SertifikatCard({ m, hewan, settings, noSertifikat, forPrint }) {
  const tgl = settings?.tanggal
    ? new Date(settings.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })
    : new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" });
  const hewanData = hewan ? `1 ekor ${hewan.jenis} (${hewan.berat} kg)` : m.jenis === "Sapi" ? "1/7 ekor Sapi" : "1 ekor Kambing";

  const cardStyle = forPrint ? {
    width: "100%", height: "100vh",
    background: "#fff",
    fontFamily: "Georgia, 'Times New Roman', serif",
    position: "relative", overflow: "hidden",
    display: "flex", alignItems: "stretch",
    pageBreakAfter: "always", breakAfter: "page",
    pageBreakInside: "avoid", breakInside: "avoid",
  } : {
    width: "100%", maxWidth: "820px", height: "auto", minHeight: "320px",
    background: "#fff",
    fontFamily: "Georgia, 'Times New Roman', serif",
    position: "relative", overflow: "hidden",
    display: "flex", alignItems: "stretch",
    border: "1px solid #e5e7eb", borderRadius: 8,
  };

  return (
    <div style={cardStyle}>
      {/* Background pattern subtle */}
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 80%, #f0fdf420 0%, transparent 50%), radial-gradient(circle at 80% 20%, #fef3c720 0%, transparent 50%)", pointerEvents:"none" }} />

      {/* Ornamen sudut */}
      {[[10,10,"M4 4 L4 28 M4 4 L28 4"],[10,"auto","M4 4 L4 28 M4 4 L28 4"],["auto",10,"M4 28 L4 4 M4 28 L28 28"],["auto","auto","M28 4 L28 28 M28 4 L4 4"]].map(([t,r,d],i)=>(
        <div key={i} style={{ position:"absolute", top:t, right:i===1||i===3?10:"auto", bottom:i===2||i===3?10:"auto", left:i===0||i===2?10:"auto", width:52, height:52, opacity:0.15 }}>
          <svg viewBox="0 0 32 32" style={{ width:"100%", height:"100%" }}>
            <path d={["M4 4 L4 22 M4 4 L22 4","M28 4 L28 22 M28 4 L10 4","M4 28 L4 10 M4 28 L22 28","M28 28 L28 10 M28 28 L10 28"][i]} stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round"/>
          </svg>
        </div>
      ))}

      {/* Border dalam */}
      <div style={{ margin:"16px", border:"2px solid #059669", borderRadius:8, flex:1, display:"flex", flexDirection:"column", padding:"28px 48px", justifyContent:"space-between" }}>

        {/* Header */}
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:28, color:"#d97706", lineHeight:1, marginBottom:6 }}>☽</div>
          <div style={{ fontSize:11, letterSpacing:4, color:"#059669", fontFamily:"Arial,sans-serif", fontWeight:800, textTransform:"uppercase", marginBottom:6 }}>
            {settings?.namaLembaga || "Masjid Al-Ikhlas"}
          </div>
          <h1 style={{ fontSize:38, fontWeight:700, color:"#d97706", margin:"4px 0 6px", letterSpacing:2, lineHeight:1.1 }}>
            Sertifikat Qurban
          </h1>
          <div style={{ fontSize:13, color:"#6b7280", fontFamily:"Arial,sans-serif" }}>
            Idul Adha 1446 H &nbsp;/&nbsp; {tgl}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:10, justifyContent:"center", margin:"12px 0 0" }}>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg,transparent,#05966960)" }}/>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#d97706" }}/>
            <div style={{ flex:1, height:1, background:"linear-gradient(90deg,#05966960,transparent)" }}/>
          </div>
        </div>

        {/* Body */}
        <div style={{ textAlign:"center", padding:"0 40px" }}>
          <div style={{ fontSize:13, color:"#9ca3af", fontFamily:"Arial,sans-serif", marginBottom:10, letterSpacing:1 }}>
            — Dengan ini menyatakan bahwa —
          </div>
          <div style={{ fontSize:32, fontWeight:700, color:"#111827", marginBottom:6, lineHeight:1.2 }}>
            {m.nama}
          </div>
          {m.namaAtas && m.namaAtas !== m.nama && (
            <div style={{ fontSize:14, color:"#6b7280", fontFamily:"Arial,sans-serif", fontStyle:"italic", marginBottom:8 }}>
              atas nama: <b style={{ color:"#374151" }}>{m.namaAtas}</b>
            </div>
          )}
          <div style={{ fontSize:14, color:"#374151", fontFamily:"Arial,sans-serif", lineHeight:1.9, maxWidth:520, margin:"10px auto" }}>
            telah melaksanakan ibadah qurban berupa{" "}
            <b style={{ color:"#059669", fontSize:16 }}>{hewanData}</b>{" "}
            pada {tgl}.<br/>
            Semoga Allah SWT menerima amal ibadah dan menjadikannya sebagai jariyah.
          </div>
        </div>

        {/* Ayat */}
        <div style={{ textAlign:"center", padding:"12px 48px", background:"#f0fdf4", borderRadius:8, border:"1px solid #d1fae5", margin:"0 20px" }}>
          <div style={{ fontSize:13, color:"#065f46", fontFamily:"Georgia,serif", fontStyle:"italic", lineHeight:1.7 }}>
            "Daging-daging unta dan darahnya itu sekali-kali tidak dapat mencapai keridhaan Allah,<br/>
            tetapi ketakwaan dari kamulah yang dapat mencapainya."
          </div>
          <div style={{ fontSize:11, color:"#9ca3af", fontFamily:"Arial,sans-serif", marginTop:4 }}>(QS. Al-Hajj: 37)</div>
        </div>

        {/* Footer TTD */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", padding:"0 40px" }}>
          <div style={{ textAlign:"center", minWidth:140 }}>
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"Arial,sans-serif", marginBottom:44 }}>Ketua Panitia</div>
            <div style={{ borderTop:"1.5px solid #374151", paddingTop:6 }}>
              <div style={{ fontSize:14, fontWeight:700, fontFamily:"Arial,sans-serif", color:"#111827" }}>{settings?.ketua || "Ketua Panitia"}</div>
            </div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:10, color:"#d1d5db", fontFamily:"Arial,sans-serif", fontStyle:"italic", marginBottom:4 }}>No. Sertifikat</div>
            <div style={{ fontSize:13, fontWeight:700, color:"#059669", fontFamily:"monospace", letterSpacing:2, padding:"4px 12px", border:"1px solid #d1fae5", borderRadius:6, background:"#f0fdf4" }}>
              {noSertifikat}
            </div>
          </div>
          <div style={{ textAlign:"center", minWidth:140 }}>
            <div style={{ fontSize:13, color:"#6b7280", fontFamily:"Arial,sans-serif", marginBottom:44 }}>Bendahara</div>
            <div style={{ borderTop:"1.5px solid #374151", paddingTop:6 }}>
              <div style={{ fontSize:14, fontWeight:700, fontFamily:"Arial,sans-serif", color:"#111827" }}>Bendahara</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function SertifikatPage({ mudhohi, hewan, settings }) {
  const [mode, setMode] = useState("individu");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [showBorder, setShowBorder] = useState(true);
  const [preview, setPreview] = useState(null);

  const hewanSelesai = hewan.filter(h => h.status === "Selesai");
  // Eligible: pembayaran Lunas ATAU hewannya Selesai — fallback ke semua kalau kosong
  const eligible = mudhohi.filter(m => m.pembayaran === "Lunas" || hewanSelesai.some(h => h.kelompok === m.kelompok));
  const listMudhohi = eligible.length > 0 ? eligible : mudhohi;
  const filtered = listMudhohi.filter(m => { const q = search.toLowerCase(); return m.nama.toLowerCase().includes(q) || (m.kelompok||"").toLowerCase().includes(q); });
  const kelompokList = [...new Set(listMudhohi.map(m => m.kelompok).filter(Boolean))].filter(k => k.toLowerCase().includes(search.toLowerCase()));

  function toggleId(id) { setSelectedIds(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); }
  function getNomor(idx) { return `SRFT/${new Date().getFullYear()}/${String(idx + 1).padStart(3, "0")}`; }
  const toprint = mode === "individu"
    ? (selectedIds.length > 0 ? filtered.filter(m => selectedIds.includes(m.id)) : filtered)
    : (selectedIds.length > 0 ? kelompokList.filter(k => selectedIds.includes(k)) : kelompokList);

  return (
    <div>
      <style>{`@media print{body *{visibility:hidden!important}#sert-print,#sert-print *{visibility:visible!important}#sert-print{position:fixed!important;top:0!important;left:0!important;width:100vw!important;height:auto!important}.no-print{display:none!important}@page{size:A4 landscape;margin:0}.sert-page{width:100vw;height:100vh;page-break-after:always;break-after:page;display:flex;align-items:stretch}}`}</style>
      <div className="no-print">
        <PageHeader title="Sertifikat Qurban" sub={`${toprint.length} sertifikat siap cetak`}>
          <Btn onClick={() => window.print()} color={C.em} disabled={toprint.length === 0}>🖨️ Cetak ({toprint.length})</Btn>
        </PageHeader>

        <div style={{ display:"flex", gap:0, marginBottom:16, background:C.g100, borderRadius:12, padding:4, maxWidth:360 }}>
          {[["individu","👤 Per Individu"],["kelompok","👥 Per Kelompok"]].map(([v,l]) => (
            <button key={v} onClick={() => { setMode(v); setSelectedIds([]); }}
              style={{ flex:1, padding:"10px", borderRadius:10, border:"none", background:mode===v?"#fff":"transparent", color:mode===v?C.emD:C.g500, fontWeight:mode===v?700:500, cursor:"pointer", fontSize:14, fontFamily:"inherit", boxShadow:mode===v?"0 1px 4px rgba(0,0,0,0.1)":"none" }}>
              {l}
            </button>
          ))}
        </div>

        <Card style={{ padding:"14px 18px", marginBottom:16 }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", marginBottom:10 }}>
            <SearchBar value={search} onChange={setSearch} placeholder="Cari nama / kelompok..." />
            <Btn onClick={() => setSelectedIds(mode==="individu"?filtered.map(m=>m.id):kelompokList)} color={C.sky} small>☑ Semua</Btn>
            <Btn onClick={() => setSelectedIds([])} color={C.g400} outline small>✕ Reset</Btn>
            <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:C.g600, cursor:"pointer" }}>
              <input type="checkbox" checked={showBorder} onChange={e=>setShowBorder(e.target.checked)}/> Garis potong
            </label>
          </div>
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            {[[`${hewanSelesai.length} hewan selesai`,C.em],[`${listMudhohi.length} mudhohi eligible`,C.sky],[`${toprint.length} ditampilkan`,C.gold]].map(([t,c])=>(
              <div key={t} style={{ display:"flex", gap:5, alignItems:"center" }}><div style={{ width:7,height:7,borderRadius:"50%",background:c }}/><span style={{ fontSize:12,color:C.g600 }}>{t}</span></div>
            ))}
          </div>
          {listMudhohi.length === 0 && (
            <div style={{ marginTop:10, background:C.goldL, border:`1px solid ${C.goldM}`, borderRadius:10, padding:"10px 14px", fontSize:13, color:C.goldD }}>
              ⚠ Belum ada data mudhohi. Tambah di menu <b>Mudhohi</b> terlebih dahulu.
            </div>
          )}
        </Card>

        {mode === "individu" && filtered.length > 0 && (
          <Card style={{ marginBottom:16 }}>
            <Table cols={["","Nama","Kelompok","Jenis","Status Bayar","Preview"]}
              empty={<EmptyState icon="📜" title="Belum ada mudhohi" desc="Tambah data mudhohi" />}
              rows={filtered.map((m,i)=>(
                <TR key={m.id} even={i%2===0}>
                  <TD><input type="checkbox" checked={selectedIds.includes(m.id)} onChange={()=>toggleId(m.id)} style={{ width:16,height:16,cursor:"pointer",accentColor:C.em }}/></TD>
                  <TD bold>{m.nama}</TD>
                  <TD small mono>{m.kelompok||"-"}</TD>
                  <TD>{m.jenis==="Sapi"?"🐄":"🐑"} {m.jenis}</TD>
                  <TD><Badge s={m.pembayaran}/></TD>
                  <TD><button onClick={()=>setPreview({m,idx:i})} style={{ background:C.emL,color:C.emD,border:"none",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit" }}>👁 Preview</button></TD>
                </TR>
              ))}
            />
          </Card>
        )}

        {mode === "kelompok" && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(190px,1fr))", gap:12, marginBottom:16 }}>
            {kelompokList.length === 0
              ? <EmptyState icon="👥" title="Belum ada kelompok" desc="Tambah data mudhohi dengan kelompok" />
              : kelompokList.map(k => {
                  const members = mudhohi.filter(m=>m.kelompok===k);
                  const hw = hewanSelesai.find(h=>h.kelompok===k);
                  const sel = selectedIds.includes(k);
                  return (
                    <div key={k} onClick={()=>toggleId(k)}
                      style={{ background:sel?C.emL:"#fff", border:`2px solid ${sel?C.em:C.g200}`, borderRadius:14, padding:"14px", cursor:"pointer", transition:"all 0.15s" }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:14, fontWeight:800, color:C.emD }}>{k}</span>
                        <Badge s={hw?"Selesai":"Terdaftar"}/>
                      </div>
                      <div style={{ fontSize:12, color:C.g500, marginBottom:4 }}>{hw?`${hw.jenis} · ${hw.berat}kg`:members[0]?.jenis||"-"}</div>
                      <div style={{ fontSize:12, color:C.g600, marginBottom:4 }}>{members.length} orang</div>
                      {members.slice(0,3).map(m=><div key={m.id} style={{ fontSize:11,color:C.g400 }}>• {m.nama}</div>)}
                      {members.length>3 && <div style={{ fontSize:11,color:C.g400 }}>+{members.length-3} lainnya</div>}
                    </div>
                  );
                })
            }
          </div>
        )}

        {/* Preview langsung di layar */}
        {toprint.length > 0 && (
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:14, fontWeight:700, color:C.g700, marginBottom:12 }}>
              Preview ({Math.min(toprint.length,3)} dari {toprint.length}):
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {(mode==="individu" ? toprint.slice(0,3) : toprint.slice(0,2).flatMap(k=>mudhohi.filter(m=>m.kelompok===k).slice(0,1))).map((m,i)=>(
                <div key={m.id||i} style={{ border:`1px solid ${C.g200}`, borderRadius:12, overflow:"hidden" }}>
                  <div style={{ transform:"scale(0.72)", transformOrigin:"top left", width:"139%", marginBottom:"-28%" }}>
                    <SertifikatCard m={m} hewan={hewanSelesai.find(h=>h.kelompok===m.kelompok)} settings={settings} noSertifikat={getNomor(i)} showBorder={false}/>
                  </div>
                </div>
              ))}
            </div>
            {toprint.length > 3 && (
              <div style={{ textAlign:"center", padding:"14px", color:C.g400, fontSize:13, marginTop:8 }}>
                + {toprint.length - 3} sertifikat lainnya akan ikut tercetak
              </div>
            )}
          </div>
        )}

        <div style={{ background:C.g50, borderRadius:12, padding:"10px 16px", marginBottom:16, fontSize:13, color:C.g500 }}>
          💡 <b>Tips:</b> Sertifikat otomatis muncul untuk semua mudhohi lunas. Centang untuk pilih spesifik → klik <b>Cetak</b> → pilih <b>A4 Landscape</b>.
        </div>
      </div>

      {preview && (
        <Modal title={`Preview — ${preview.m.nama}`} onClose={()=>setPreview(null)} wide>
          <div style={{ overflowX:"auto" }}>
            <div style={{ transform:"scale(0.55)", transformOrigin:"top left", width:"182%", pointerEvents:"none", marginBottom:"-47%" }}>
              <SertifikatCard m={preview.m} hewan={hewanSelesai.find(h=>h.kelompok===preview.m.kelompok)} settings={settings} noSertifikat={getNomor(preview.idx)} showBorder={false}/>
            </div>
          </div>
        </Modal>
      )}

      <div id="sert-print">
        {mode==="individu"
          ? toprint.map((m,i)=>(
              <div key={m.id} className="sert-page">
                <SertifikatCard m={m} hewan={hewanSelesai.find(h=>h.kelompok===m.kelompok)} settings={settings} noSertifikat={getNomor(i)} forPrint/>
              </div>
            ))
          : toprint.flatMap((k,ki)=>mudhohi.filter(m=>m.kelompok===k).map((m,i)=>(
              <div key={m.id} className="sert-page">
                <SertifikatCard m={m} hewan={hewanSelesai.find(h=>h.kelompok===k)} settings={settings} noSertifikat={`SRFT/${new Date().getFullYear()}/${String(ki*10+i+1).padStart(3,"0")}`} forPrint/>
              </div>
            )))
        }
      </div>
    </div>
  );
}

function KeuanganForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || { tipe: "Pemasukan", kategori: "Iuran Mudhohi", keterangan: "", jumlah: "", tanggal: new Date().toISOString().slice(0, 10) });
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  const katPemasukan = ["Iuran Mudhohi", "Donasi", "Sponsor", "Lainnya"];
  const katPengeluaran = ["Pembelian Hewan", "Konsumsi", "Perlengkapan", "Operasional", "Dokumentasi", "Lainnya"];
  const kats = form.tipe === "Pemasukan" ? katPemasukan : katPengeluaran;
  function submit() {
    if (!form.keterangan || !form.jumlah) return alert("Keterangan dan jumlah wajib diisi!");
    onSave({ ...form, jumlah: Number(form.jumlah) }); onClose();
  }
  return (
    <>
      <div className="form-grid">
        <Inp label="Tipe" value={form.tipe} onChange={v => { f("tipe")(v); f("kategori")(v === "Pemasukan" ? katPemasukan[0] : katPengeluaran[0]); }} options={["Pemasukan", "Pengeluaran"]} />
        <Inp label="Kategori" value={form.kategori} onChange={f("kategori")} options={kats} />
        <div style={{ gridColumn: "1/-1" }}>
          <Inp label="Keterangan" value={form.keterangan} onChange={f("keterangan")} placeholder="Deskripsi transaksi" required />
        </div>
        <Inp label="Jumlah (Rp)" value={form.jumlah} onChange={f("jumlah")} type="number" min="0" step="1000" required />
        <Inp label="Tanggal" value={form.tanggal} onChange={f("tanggal")} type="date" />
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <Btn onClick={onClose} outline color={C.g400}>Batal</Btn>
        <Btn onClick={submit} color={C.em}>💾 Simpan</Btn>
      </div>
    </>
  );
}

function KeuanganPage({ keuangan, setKeuangan, toast }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [modal, setModal] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const totalPemasukan = keuangan.filter(k => k.tipe === "Pemasukan").reduce((s, k) => s + Number(k.jumlah), 0);
  const totalPengeluaran = keuangan.filter(k => k.tipe === "Pengeluaran").reduce((s, k) => s + Number(k.jumlah), 0);

  const filtered = keuangan.filter(k => {
    const q = search.toLowerCase();
    return (filter === "Semua" || k.tipe === filter) &&
      (k.keterangan.toLowerCase().includes(q) || k.kategori.toLowerCase().includes(q));
  }).sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));

  function add(data) { setKeuangan(p => [...p, { ...data, id: "K" + uid() }]); toast("Transaksi dicatat!", "success"); }
  function edit(data) { setKeuangan(p => p.map(k => k.id === modal.id ? { ...k, ...data } : k)); toast("Transaksi diperbarui!", "success"); }
  function del(id) { setKeuangan(p => p.filter(k => k.id !== id)); toast("Transaksi dihapus.", "success"); }

  function exportCSV() {
    const rows = [["Tipe", "Kategori", "Keterangan", "Jumlah", "Tanggal"], ...keuangan.map(k => [k.tipe, k.kategori, k.keterangan, k.jumlah, k.tanggal])];
    const csv = rows.map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "laporan-keuangan-qurban.csv"; a.click();
    toast("Laporan berhasil diexport ke CSV!", "success");
  }

  return (
    <div>
      <PageHeader title="Laporan RAB & Keuangan" sub="Transparansi dana qurban">
        <SearchBar value={search} onChange={setSearch} placeholder="Cari keterangan..." />
        <Btn onClick={exportCSV} color={C.g600} outline>📤 Export CSV</Btn>
        <Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah</Btn>
      </PageHeader>

      <div className="fin-grid" style={{ marginBottom: 20 }}>
        <Card style={{ padding: "18px 20px", background: C.emL, border: `1px solid ${C.emM}` }}>
          <div style={{ fontSize: 11, color: C.emD, fontWeight: 800, marginBottom: 6, textTransform: "uppercase" }}>Total Pemasukan</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: C.emD }}>{fRp(totalPemasukan)}</div>
          <div style={{ fontSize: 12, color: C.emM, marginTop: 4 }}>{keuangan.filter(k => k.tipe === "Pemasukan").length} transaksi</div>
        </Card>
        <Card style={{ padding: "18px 20px", background: C.redL, border: "1px solid #fca5a5" }}>
          <div style={{ fontSize: 11, color: "#991b1b", fontWeight: 800, marginBottom: 6, textTransform: "uppercase" }}>Total Pengeluaran</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#991b1b" }}>{fRp(totalPengeluaran)}</div>
          <div style={{ fontSize: 12, color: "#ef4444", marginTop: 4 }}>{keuangan.filter(k => k.tipe === "Pengeluaran").length} transaksi</div>
        </Card>
        <Card style={{ padding: "18px 20px", background: C.goldL, border: `1px solid ${C.goldM}` }}>
          <div style={{ fontSize: 11, color: C.goldD, fontWeight: 800, marginBottom: 6, textTransform: "uppercase" }}>Saldo Akhir</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: totalPemasukan >= totalPengeluaran ? C.emD : C.red }}>{fRp(totalPemasukan - totalPengeluaran)}</div>
          <div style={{ fontSize: 12, color: C.goldM, marginTop: 4 }}>{totalPemasukan >= totalPengeluaran ? "Surplus ✓" : "Defisit ⚠"}</div>
        </Card>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        {["Semua", "Pemasukan", "Pengeluaran"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ background: filter === f ? (f === "Pemasukan" ? C.emL : f === "Pengeluaran" ? C.redL : C.g200) : C.g50, border: `1px solid ${filter === f ? (f === "Pemasukan" ? C.em : f === "Pengeluaran" ? C.red : C.g300) : C.g200}`, borderRadius: 10, padding: "7px 16px", cursor: "pointer", fontSize: 13, fontWeight: filter === f ? 700 : 500, color: filter === f ? (f === "Pemasukan" ? C.emD : f === "Pengeluaran" ? "#991b1b" : C.g700) : C.g500, fontFamily: "inherit" }}>
            {f}
          </button>
        ))}
      </div>

      <Card>
        <Table cols={["Tanggal", "Tipe", "Kategori", "Keterangan", "Jumlah", "Aksi"]}
          empty={<EmptyState icon="💰" title="Belum ada transaksi" desc="Catat pemasukan dan pengeluaran" action={<Btn onClick={() => setModal({ mode: "add" })} color={C.em}>+ Tambah Transaksi</Btn>} />}
          rows={filtered.map((k, i) => (
            <TR key={k.id} even={i % 2 === 0}>
              <TD small>{fDate(k.tanggal)}</TD>
              <TD>
                <span style={{ background: k.tipe === "Pemasukan" ? C.emL : C.redL, color: k.tipe === "Pemasukan" ? C.emD : "#991b1b", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                  {k.tipe === "Pemasukan" ? "▲" : "▼"} {k.tipe}
                </span>
              </TD>
              <TD small>{k.kategori}</TD>
              <TD>{k.keterangan}</TD>
              <TD bold><span style={{ color: k.tipe === "Pemasukan" ? C.emD : C.red }}>{k.tipe === "Pemasukan" ? "+" : "-"}{fRp(k.jumlah)}</span></TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <Btn small color={C.sky} onClick={() => setModal({ mode: "edit", ...k })}>✏</Btn>
                  <Btn small color={C.red} onClick={() => setConfirm(k.id)}>🗑</Btn>
                </div>
              </TD>
            </TR>
          ))}
        />
      </Card>

      {modal && (
        <Modal title={modal.mode === "add" ? "Tambah Transaksi" : "Edit Transaksi"} onClose={() => setModal(null)}>
          <KeuanganForm initial={modal.mode === "edit" ? modal : null} onSave={modal.mode === "add" ? add : edit} onClose={() => setModal(null)} />
        </Modal>
      )}
      {confirm && <ConfirmModal msg="Yakin hapus transaksi ini?" onConfirm={() => del(confirm)} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ============================================================
// PENGATURAN PAGE
// ============================================================
function PengaturanPage({ settings, setSettings, toast, resetAll }) {
  const [form, setForm] = useState(settings);
  const f = k => v => setForm(p => ({ ...p, [k]: v }));
  function save() { setSettings(form); toast("Pengaturan berhasil disimpan!", "success"); }

  return (
    <div style={{ maxWidth: 600 }}>
      <PageHeader title="Pengaturan" sub="Konfigurasi aplikasi QurbanPro" />
      <Card style={{ padding: "24px" }}>
        <Inp label="Nama Masjid / Komunitas" value={form.namaLembaga} onChange={f("namaLembaga")} />
        <Inp label="Nama Ketua Panitia" value={form.ketua} onChange={f("ketua")} />
        <Inp label="WhatsApp Panitia" value={form.wa} onChange={f("wa")} type="tel" />
        <Inp label="Tanggal Idul Adha" value={form.tanggal} onChange={f("tanggal")} type="date" />
        <Inp label="Lokasi Penyembelihan" value={form.lokasi} onChange={f("lokasi")} />
        <Btn onClick={save} color={C.em}>💾 Simpan Pengaturan</Btn>
      </Card>

      <Card style={{ padding: "24px", marginTop: 16, border: `1px solid #fca5a5` }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800, color: C.red }}>⚠ Zona Bahaya</h3>
        <p style={{ fontSize: 13, color: C.g500, margin: "0 0 16px" }}>Reset semua data ke kondisi awal. Tindakan ini tidak bisa dibatalkan.</p>
        <Btn onClick={resetAll} color={C.red}>🗑 Reset Semua Data</Btn>
      </Card>
    </div>
  );
}

// ============================================================
// APP SHELL
// ============================================================
function AppShell({ onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [hewan, setHewan] = useLocalStorage(STORAGE_KEYS.hewan, INIT_HEWAN);
  const [mudhohi, setMudhohi] = useLocalStorage(STORAGE_KEYS.mudhohi, INIT_MUDHOHI);
  const [mustahiq, setMustahiq] = useLocalStorage(STORAGE_KEYS.mustahiq, INIT_MUSTAHIQ);
  const [sesi, setSesi] = useLocalStorage(STORAGE_KEYS.sesi, INIT_SESI);
  const [keuangan, setKeuangan] = useLocalStorage(STORAGE_KEYS.keuangan, INIT_KEUANGAN);
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.settings, INIT_SETTINGS);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  function toast(msg, type = "info") {
    const id = uid();
    setToasts(t => [...t, { id, msg, type }]);
  }
  function removeToast(id) { setToasts(t => t.filter(x => x.id !== id)); }

  function resetAll() {
    if (!window.confirm("YAKIN reset semua data? Ini tidak bisa dibatalkan!")) return;
    Object.values(STORAGE_KEYS).forEach(k => localStorage.removeItem(k));
    window.location.reload();
  }

  const pages = {
    dashboard: <Dashboard hewan={hewan} mudhohi={mudhohi} mustahiq={mustahiq} keuangan={keuangan} setPage={setPage} />,
    hewan: <HewanPage hewan={hewan} setHewan={setHewan} toast={toast} />,
    mudhohi: <MudhohiPage mudhohi={mudhohi} setMudhohi={setMudhohi} toast={toast} />,
    mustahiq: <MustahiqPage mustahiq={mustahiq} setMustahiq={setMustahiq} sesi={sesi} toast={toast} />,
    sesi: <SesiPage sesi={sesi} setSesi={setSesi} mustahiq={mustahiq} toast={toast} />,
    scan: <ScanPage mustahiq={mustahiq} setMustahiq={setMustahiq} toast={toast} />,
    cetak: <CetakPage mustahiq={mustahiq} sesi={sesi} settings={settings} />,
    sertifikat: <SertifikatPage mudhohi={mudhohi} hewan={hewan} settings={settings} />,
    keuangan: <KeuanganPage keuangan={keuangan} setKeuangan={setKeuangan} toast={toast} />,
    pengaturan: <PengaturanPage settings={settings} setSettings={setSettings} toast={toast} resetAll={resetAll} />,
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: C.g50, fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes slideUp { from { opacity:0;transform:translateY(12px)} to {opacity:1;transform:translateY(0)} }
        @keyframes slideIn { from { transform:translateX(-100%)} to {transform:translateX(0)} }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 99px; }
        input, select, textarea, button { -webkit-appearance: none; }
        input:focus, select:focus, textarea:focus { border-color: #059669 !important; box-shadow: 0 0 0 3px #05966920; outline: none; }

        /* RESPONSIVE TABLE — scroll horizontal di mobile */
        .tbl-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .tbl-wrap table { min-width: 520px; }

        /* RESPONSIVE GRID */
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .fin-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 16px; }

        /* PAGE HEADER stack di mobile */
        .page-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:20px; flex-wrap:wrap; gap:12px; }
        .page-header-actions { display:flex; gap:8px; flex-wrap:wrap; align-items:center; }

        /* BOTTOM NAV di mobile */
        .bottom-nav { display: none; }

        /* FILTER ROW */
        .filter-row { display:flex; gap:8px; flex-wrap:wrap; align-items:center; margin-bottom:14px; }

        @media (max-width: 768px) {
          .stat-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .dash-grid { grid-template-columns: 1fr; }
          .fin-grid { grid-template-columns: 1fr; gap: 10px; }
          .form-grid { grid-template-columns: 1fr; }
          .form-grid > div[style*="grid-column"] { grid-column: auto !important; }
          .page-header { flex-direction: column; align-items: stretch; }
          .page-header-actions { justify-content: flex-start; }
          .bottom-nav { display:flex; position:fixed; bottom:0; left:0; right:0; background:#fff; border-top:1px solid #e5e7eb; z-index:150; padding:6px 0 env(safe-area-inset-bottom,6px); }
          .bottom-nav button { flex:1; display:flex; flex-direction:column; align-items:center; gap:2px; border:none; background:none; cursor:pointer; padding:6px 4px; font-size:9px; font-weight:600; color:#6b7280; font-family:inherit; min-width:0; }
          .bottom-nav button.active { color: #059669; }
          .bottom-nav button span.ico { font-size:20px; line-height:1; }
          .bottom-nav button span.lbl { font-size:9px; max-width:52px; text-align:center; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
          .main-content { padding-bottom: 72px !important; }
          .tbl-wrap table { min-width: 480px; font-size: 13px; }
          .hide-mobile { display: none !important; }
          .filter-row { gap: 6px; }
          .filter-row input { width: 100% !important; }
          .filter-row select { flex: 1; min-width: 0; }
        }

        @media (max-width: 380px) {
          .stat-grid { grid-template-columns: 1fr 1fr; }
          .bottom-nav button span.lbl { display: none; }
        }
      `}</style>

      {/* Sidebar overlay mobile */}
      {isMobile && sidebarOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300 }}
          onClick={() => setSidebarOpen(false)}>
          <div style={{ width: 240, height: "100%", animation: "slideIn 0.25s ease" }}
            onClick={e => e.stopPropagation()}>
            <Sidebar active={page} setActive={p => { setPage(p); setSidebarOpen(false); }} mobile />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      {!isMobile && <Sidebar active={page} setActive={setPage} />}

      {/* Main area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>

        {/* Top bar */}
        <div style={{ background: "#fff", borderBottom: `1px solid ${C.g200}`, padding: "0 16px", height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, position: "sticky", top: 0, zIndex: 100 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)}
                style={{ background: C.g100, border: "none", borderRadius: 9, width: 36, height: 36, cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                ☰
              </button>
            )}
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: C.g800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: isMobile ? 160 : 300 }}>
                {isMobile ? MENUS.find(m => m.key === page)?.label : settings.namaLembaga}
              </div>
              {!isMobile && <div style={{ fontSize: 11, color: C.g400 }}>{settings.namaLembaga}</div>}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 7, height: 7, background: C.em, borderRadius: "50%", boxShadow: `0 0 0 2px ${C.emL}` }} />
            {!isMobile && <span style={{ fontSize: 13, color: C.g500 }}>Admin</span>}
            <button onClick={onLogout}
              style={{ background: C.g100, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 12, color: C.g600, fontFamily: "inherit", whiteSpace: "nowrap" }}>
              {isMobile ? "↩" : "Keluar"}
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="main-content" style={{ flex: 1, overflow: "auto", padding: isMobile ? "14px 14px 80px" : "24px 28px" }}>
          {pages[page]}
        </main>
      </div>

      {/* Bottom Navigation — mobile only */}
      {isMobile && (
        <nav className="bottom-nav">
          {MENUS.slice(0, 5).map(m => (
            <button key={m.key} onClick={() => setPage(m.key)} className={page === m.key ? "active" : ""}>
              <span className="ico">{m.icon}</span>
              <span className="lbl">{m.label}</span>
            </button>
          ))}
          <button onClick={() => setPage(page === "scan" ? "dashboard" : "scan")} className={["scan","cetak","keuangan","pengaturan"].includes(page) ? "active" : ""}>
            <span className="ico">⋯</span>
            <span className="lbl">Lainnya</span>
          </button>
        </nav>
      )}

      {/* Toasts */}
      <div style={{ position: "fixed", bottom: isMobile ? 80 : 20, right: 14, left: isMobile ? 14 : "auto", display: "flex", flexDirection: "column", gap: 8, zIndex: 99999 }}>
        {toasts.map(t => <Toast key={t.id} msg={t.msg} type={t.type} onClose={() => removeToast(t.id)} />)}
      </div>
    </div>
  );
}

// ============================================================
// LOGIN PAGE
// ============================================================
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("admin@masjid.com");
  const [pass, setPass] = useState("password");
  const [loading, setLoading] = useState(false);
  function submit() {
    if (!email || !pass) return alert("Isi email dan password!");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(); }, 800);
  }
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(150deg, ${C.emD} 0%, #021f15 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 24, padding: "44px 40px", width: "100%", maxWidth: 400, boxShadow: "0 32px 100px rgba(0,0,0,0.3)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>🌙</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}><span style={{ color: C.em }}>Qurban</span><span style={{ color: C.gold }}>Pro</span></h1>
          <p style={{ fontSize: 14, color: C.g400, marginTop: 6 }}>Masuk ke dashboard panitia</p>
        </div>
        <Inp label="Email" value={email} onChange={setEmail} type="email" placeholder="admin@masjid.com" />
        <Inp label="Password" value={pass} onChange={setPass} type="password" placeholder="••••••••" />
        <button onClick={submit} disabled={loading}
          style={{ width: "100%", background: loading ? C.g300 : C.em, color: "#fff", border: "none", borderRadius: 14, padding: "14px", cursor: loading ? "not-allowed" : "pointer", fontSize: 16, fontWeight: 800, marginTop: 8, fontFamily: "inherit", transition: "background 0.2s" }}>
          {loading ? "Memuat..." : "Masuk ke Dashboard →"}
        </button>
        <div style={{ marginTop: 16, background: C.g50, borderRadius: 10, padding: "12px 16px", textAlign: "center" }}>
          <p style={{ fontSize: 12, color: C.g400, margin: 0 }}>Demo: gunakan email & password apapun</p>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LANDING PAGE
// ============================================================
function LandingPage({ onEnter }) {
  const feats = [
    { icon: "🐄", t: "Manajemen Hewan", d: "CRUD data sapi & kambing, workflow status lengkap, notif WA otomatis." },
    { icon: "👥", t: "Data Mudhohi", d: "Input peserta qurban, kelola pembayaran, generate sertifikat otomatis." },
    { icon: "🎫", t: "Kupon Digital QR", d: "Setiap mustahiq dapat kupon unik. Scan untuk validasi, cegah double-claim." },
    { icon: "📅", t: "Sesi Distribusi", d: "Buat jadwal pembagian, batasi kuota per sesi, tampilkan antrean." },
    { icon: "💰", t: "Laporan Keuangan", d: "RAB transparan, CRUD transaksi, export CSV, saldo real-time." },
    { icon: "🔒", t: "Role-based Access", d: "Hak akses per jabatan panitia. Admin, bendahara, tim distribusi, dll." },
  ];
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav style={{ position: "sticky", top: 0, background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.g200}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 100 }}>
        <div style={{ fontSize: 20, fontWeight: 900 }}><span style={{ color: C.em }}>Qurban</span><span style={{ color: C.gold }}>Pro</span></div>
        <button onClick={onEnter} style={{ background: C.em, color: "#fff", border: "none", borderRadius: 10, padding: "8px 22px", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>Coba Sekarang</button>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(150deg, #f0fdf4 0%, #fefce8 100%)", padding: "72px 24px 80px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: C.emL, color: C.emD, padding: "5px 16px", borderRadius: 99, fontSize: 12, fontWeight: 700, marginBottom: 22 }}>🌙 Platform Manajemen Qurban #1 Indonesia</div>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 54px)", fontWeight: 900, margin: "0 auto 18px", maxWidth: 700, lineHeight: 1.15, color: C.g900 }}>
          Kelola Qurban Lebih <span style={{ color: C.em }}>Rapi</span>,{" "}
          <span style={{ color: C.gold }}>Transparan</span>, dan Tanpa Chaos
        </h1>
        <p style={{ fontSize: 17, color: C.g500, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Satu platform untuk panitia masjid mengelola mudhohi, hewan, kupon digital, distribusi daging, dan laporan keuangan.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={onEnter} style={{ background: C.em, color: "#fff", border: "none", borderRadius: 14, padding: "14px 36px", cursor: "pointer", fontSize: 16, fontWeight: 800, boxShadow: `0 8px 24px ${C.em}50`, fontFamily: "inherit" }}>🚀 Coba Gratis Sekarang</button>
          <button style={{ background: "#fff", color: C.g700, border: `1px solid ${C.g200}`, borderRadius: 14, padding: "14px 32px", cursor: "pointer", fontSize: 16, fontWeight: 600, fontFamily: "inherit" }}>📹 Lihat Demo</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 48, flexWrap: "wrap" }}>
          {[["500+", "Masjid"], ["50.000+", "Mustahiq"], ["99.9%", "Uptime"]].map(([n, l]) => (
            <div key={n} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: C.emD }}>{n}</div>
              <div style={{ fontSize: 12, color: C.g400 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div style={{ padding: "72px 24px", background: "#fff" }}>
        <h2 style={{ textAlign: "center", fontSize: 34, fontWeight: 900, margin: "0 0 48px", color: C.g900 }}>Semua yang Panitia Butuhkan</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18, maxWidth: 1000, margin: "0 auto" }}>
          {feats.map(f => (
            <div key={f.t} style={{ background: C.g50, borderRadius: 18, border: `1px solid ${C.g200}`, padding: "26px 24px" }}>
              <div style={{ fontSize: 34, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 10px", color: C.g800 }}>{f.t}</h3>
              <p style={{ fontSize: 13, color: C.g500, margin: 0, lineHeight: 1.7 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: `linear-gradient(135deg, ${C.emD}, #0a4d39)`, padding: "72px 24px", textAlign: "center", color: "#fff" }}>
        <h2 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 14px" }}>Siap Kelola Qurban Lebih Profesional?</h2>
        <p style={{ fontSize: 16, opacity: 0.7, marginBottom: 32, maxWidth: 460, margin: "0 auto 32px" }}>Bergabung bersama ratusan masjid yang sudah mempercayakan QurbanPro.</p>
        <button onClick={onEnter} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 14, padding: "16px 44px", cursor: "pointer", fontSize: 18, fontWeight: 900, boxShadow: "0 8px 30px rgba(0,0,0,0.25)", fontFamily: "inherit" }}>
          🚀 Mulai Sekarang — Gratis
        </button>
      </div>

      <footer style={{ background: C.g900, color: "rgba(255,255,255,0.4)", padding: "20px 24px", textAlign: "center", fontSize: 13 }}>
        © 2025 QurbanPro · Dibuat untuk kemudahan panitia masjid Indonesia 🌙
      </footer>
    </div>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function App() {
  const [screen, setScreen] = useState("landing");
  return (
    <>
      {screen === "landing" && <LandingPage onEnter={() => setScreen("login")} />}
      {screen === "login" && <LoginPage onLogin={() => setScreen("app")} />}
      {screen === "app" && <AppShell onLogout={() => setScreen("login")} />}
    </>
  );
}
