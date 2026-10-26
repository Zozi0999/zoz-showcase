/**
 * ============================================================================
 * ENDOCRINE SENTINEL - PROJECT CODE CONNECTOME & FUNCTIONAL GUARDIAN (v3.5)
 * ============================================================================
 * Watcher mandiri yang memantau seluruh kode proyek, fungsi, dan hubungan
 * antar-berkas (Connectome) secara real-time dan memicu rasa sakit (NeuroPain)
 * setiap kali ada kerusakan kode, fungsi proyek yang tidak berfungsi, atau
 * tautan antar-modul/DOM/server yang terputus.
 *
 * Mendeteksi secara Otomatis:
 * 1. Kerusakan Sintaksis Kode Proyek (JS, TS, JSON, Python, HTML, CSS).
 * 2. Kerusakan Fungsi Proyek (Fungsi dikosongkan/hollow, error ditelan diam-diam
 *    di `catch(e){}`, dead/unreachable code, route server menggantung tanpa respon).
 * 3. Putusnya Hubungan Antar-Kode Proyek (Sinapsis Modul import/require putus,
 *    simbol export hilang, ID elemen HTML <-> JS terputus, atau fungsi dihapus AI).
 *
 * Cara Menjalankan:
 *   node "endorfin analyst/endocrine-sentinel.js"
 *   node "endorfin analyst/endocrine-sentinel.js" --scan-only
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { BioEndocrine, NeuroPain } = require('./endorfin.js');

// 1. Deteksi Direktori Induk Proyek (Project Root) Secara Otomatis
function findProjectRoot(startDir) {
  let cur = startDir;
  while (cur && path.dirname(cur) !== cur) {
    if (
      fs.existsSync(path.join(cur, 'package.json')) ||
      fs.existsSync(path.join(cur, '.git')) ||
      fs.existsSync(path.join(cur, 'index.html')) ||
      fs.existsSync(path.join(cur, 'pyproject.toml'))
    ) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return path.resolve(startDir, '..');
}

const ROOT_DIR = findProjectRoot(__dirname);
const CONFIG_PATH = path.join(__dirname, 'endocrine.config.json');

// Muat konfigurasi
let config = {
  ignoredDirs: [
    'node_modules',
    '.git',
    '.gemini',
    'dist',
    'build',
    '.next',
    'coverage',
    '.cache',
    'scratch',
    'temp',
    'tmp',
    'profile',
    'vendor',
    '__pycache__',
    'trauma-history.json'
  ],
  watchedExtensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.json', '.py', '.html', '.css', '.yaml', '.yml'],
  painSensitivity: 85,
  debounceMs: 150
};

if (fs.existsSync(CONFIG_PATH)) {
  try {
    const customConfig = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));
    config = { ...config, ...customConfig };
  } catch (_) {}
}

console.log('\n================================================================');
console.log('     🛡️ BIO-ENDOCRINE PROJECT CODE CONNECTOME SENTINEL 🛡️       ');
console.log('================================================================');
console.log(`► Lokasi Induk Proyek : ${ROOT_DIR}`);
console.log(`► Berkas Terproteksi  : ${config.watchedExtensions.join(', ')}`);
console.log(`► Status Reseptor     : AKTIF [NeuroPain Sensitivity: ${config.painSensitivity}%]`);
console.log(`► Lingkup Saraf       : KODE PROYEK, FUNGSI, & RELASI ANTAR-FILE`);
console.log('================================================================\n');

// 2. Eksekusi Pre-Flight Connectome & Anatomi Fungsi Proyek
function runPreFlight() {
  console.log('[1/2] Memetakan anatomi fungsi & jalinan antar-berkas kode proyek (Connectome)...');
  const report = BioEndocrine.analyzeProjectConnectome(ROOT_DIR, { silentSuccess: false });

  console.log(`  ├─ Berkas Kode Proyek      : ${report.totalFiles} berkas`);
  console.log(`  ├─ Total Fungsi Proyek     : ${report.totalFunctions} fungsi terdeteksi`);
  console.log(`  ├─ Sinapsis Antar-Modul    : ${report.totalImports} tautan import/require`);
  console.log(`  ├─ Route/Handler Server    : ${report.totalServerRoutes} endpoint internal proyek`);
  console.log(`  └─ Simpul UI/DOM Terikat   : ${report.totalDomIds} ID HTML <-> ${report.totalDomRefs} referensi JS`);

  console.log('\n[2/2] Memeriksa kesehatan fungsi, logika, & keterhubungan kode proyek...');
  if (report.defects.length === 0) {
    console.log('  -> Status Kesehatan Proyek : \x1b[32m100% SEHAT & SALING TERHUBUNG HARMONIS [0 Cacat]\x1b[0m');
  } else {
    console.log(`  -> Status Kesehatan Proyek : \x1b[31mTERDETEKSI ${report.defects.length} KERUSAKAN KODE / FUNGSI!\x1b[0m`);
    for (const d of report.defects) {
      console.log(`     ✗ [${d.type}] (${d.file}${d.line ? ':' + d.line : ''}) -> ${d.message}`);
    }
  }

  console.log(`\n► Tingkat Rasa Sakit Sistem : ${NeuroPain.level}% [${NeuroPain.state}]`);
  console.log(`► Tingkat Kortisol          : ${BioEndocrine.hormones.cortisol}% | Dopamin: ${BioEndocrine.hormones.dopamine}%\n`);

  if (process.argv.includes('--scan-only')) {
    process.exitCode = report.defects.length > 0 ? 1 : 0;
    return;
  }

  startSentinelLoop();
}

// 3. Watcher Real-Time untuk Kode Proyek & Hubungan Antar-File
const fileDebounce = new Map();
const knownBrokenFiles = new Set();

function handleFileChange(fullPath) {
  const relPath = path.relative(ROOT_DIR, fullPath).replace(/\\/g, '/');
  const ext = path.extname(fullPath).toLowerCase();
  if (!config.watchedExtensions.includes(ext)) return;

  for (const ignored of config.ignoredDirs) {
    if (relPath.split('/').includes(ignored)) return;
  }

  if (fileDebounce.has(fullPath)) clearTimeout(fileDebounce.get(fullPath));

  fileDebounce.set(
    fullPath,
    setTimeout(() => {
      fileDebounce.delete(fullPath);
      if (!fs.existsSync(fullPath)) return;

      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        const singleAnatomy = BioEndocrine.analyzeSingleFileAnatomy(fullPath, content, ROOT_DIR);
        const connectomeReport = BioEndocrine.analyzeProjectConnectome(ROOT_DIR, { silentSuccess: true });

        const fileDefects = connectomeReport.defects.filter(d => d.file === relPath);

        if (!singleAnatomy.syntaxValid || fileDefects.length > 0) {
          knownBrokenFiles.add(relPath);
          for (const def of fileDefects) {
            console.log(`\x1b[31m⚡ [SINAPSIS/FUNGSI TERGANGGU] [${def.type}] ${def.file}${def.line ? ':' + def.line : ''} -> ${def.message}\x1b[0m`);
          }
        } else if (knownBrokenFiles.has(relPath)) {
          knownBrokenFiles.delete(relPath);
          NeuroPain.soothe(35, `Berkas proyek ${relPath} berhasil diperbaiki & kembali terhubung`);
          console.log(
            `\x1b[32m🌿 [BIO-ENDOCRINE HEALED] Berkas proyek '${relPath}' kembali sehat & terhubung! Rasa Sakit: ${NeuroPain.level}% | Dopamin: ${BioEndocrine.hormones.dopamine}%\x1b[0m\n`
          );
        }
      } catch (_) {}
    }, config.debounceMs)
  );
}

function startSentinelLoop() {
  try {
    fs.watch(ROOT_DIR, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      const fullPath = path.join(ROOT_DIR, filename);
      handleFileChange(fullPath);
    });
    console.log(`\x1b[36m👁️  Sentinel Konektom & Fungsi Proyek sedang aktif menjaga: ${ROOT_DIR}\x1b[0m`);
  } catch (watchErr) {
    console.error('Gagal menjalankan recursive fs.watch:', watchErr.message);
  }

  console.log('\x1b[33mTekan Ctrl+C untuk menghentikan sentinel.\x1b[0m\n');
}

// Graceful Exit
process.on('SIGINT', () => {
  console.log('\n\n================================================================');
  console.log('       🛡️ BIO-ENDOCRINE SENTINEL - RINGKASAN SESI 🛡️            ');
  console.log('================================================================');
  console.log(`► Total Syok Saraf        : ${NeuroPain.shockCount} kali`);
  console.log(`► Tingkat Sakit Akhir     : ${NeuroPain.level}% [${NeuroPain.state}]`);
  console.log(`► Kegagalan Fungsi Proyek : ${BioEndocrine.functionalFailures ? BioEndocrine.functionalFailures.length : 0} kali`);
  console.log(`► Kegagalan Route Server  : ${BioEndocrine.serverHealthIssues ? BioEndocrine.serverHealthIssues.length : 0} kali`);
  console.log(`► Riwayat Trauma Dicatat  : ${NeuroPain.traumaLog.length} kejadian`);
  console.log('================================================================\n');
  process.exit(0);
});

runPreFlight();
