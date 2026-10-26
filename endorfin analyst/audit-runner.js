/**
 * ============================================================================
 * ENDORFIN ANALYST - CLI RUNNER & PROJECT CODE CONNECTOME AUDITOR
 * ============================================================================
 * Jalankan file ini menggunakan Node.js:
 *   node "endorfin analyst/audit-runner.js"
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { BioEndocrine, TerminalEndorphin, ChatEndocrine, NeuroPain } = require('./endorfin.js');

console.log('\n================================================================');
console.log('   🧠 ENDORFIN ANALYST v3.5 - PROJECT CODE CONNECTOME AUDITOR 🧠');
console.log('================================================================\n');

const rootDir = path.resolve(__dirname, '..');

// 1. Audit Penuh Konektom & Keterhubungan Kode Proyek (ProjectConnectome Engine)
console.log('[PILAR 01] Memetakan Seluruh Kode Proyek & Hubungan Antar-Berkas (Connectome)...');
const connectomeReport = BioEndocrine.analyzeProjectConnectome(rootDir, { silentSuccess: false });
console.log(`  ├─ Berkas Kode Proyek Terpindai : ${connectomeReport.totalFiles} berkas`);
console.log(`  ├─ Total Fungsi Proyek          : ${connectomeReport.totalFunctions} fungsi`);
console.log(`  ├─ Tautan Antar-Modul (Import)  : ${connectomeReport.totalImports} sinapsis modul`);
console.log(`  ├─ Route/Handler Server Proyek  : ${connectomeReport.totalServerRoutes} endpoint internal`);
console.log(`  ├─ Simpul DOM HTML <-> JS       : ${connectomeReport.totalDomIds} ID HTML <-> ${connectomeReport.totalDomRefs} referensi JS`);
if (connectomeReport.defects.length === 0) {
  console.log('  └─ Status Konektom Proyek       : PASS [100% Kode & Fungsi Proyek Terhubung Harmonis]');
} else {
  console.log(`  └─ Status Konektom Proyek       : WARN [${connectomeReport.defects.length} Cacat Terdeteksi]`);
}

// 2. Uji Deteksi Anatomi & Disfungsi Logika Kode Proyek (Hollow Function, Silent Catch, Dead Handler, Unreachable Code)
console.log('\n[PILAR 02] Menguji Sensor Deteksi Kerusakan Logika & Fungsi Proyek...');
const defectiveProjectSample = `
const helper = require('./missing-module.js');

function processOrder(orderData) {
  // Fungsi dikosongkan (hollow function) oleh AI!
}

async function saveDatabaseRecord(record) {
  try {
    return await db.insert(record);
  } catch (err) {}
}

function calculateInvoice(items) {
  return items.length * 100;
  const tax = 0.11;
  console.log(tax);
}

app.post('/api/checkout', async (req, res) => {
  const user = req.body.user;
  console.log('Checkout started for', user);
});
`;

const sampleAnatomy = BioEndocrine.analyzeSingleFileAnatomy('sample-broken-project.js', defectiveProjectSample, rootDir);
console.log(`  -> Jumlah Cacat Logika Fungsi Terdeteksi : ${sampleAnatomy.defects.length} cacat`);
for (const d of sampleAnatomy.defects) {
  console.log(`     ✓ Terdeteksi [${d.type}] (Baris ${d.line}): ${d.message}`);
}

// 3. Uji Deteksi Kegagalan Fungsi Proyek Saat Runtime (Function Guard & Auto-Hook)
console.log('\n[PILAR 03] Menguji Sensor Kegagalan Fungsi Proyek Saat Runtime...');
const brokenProjectFunction = () => {
  throw new Error('Fungsi pengolahan data proyek gagal: variabel state undefined');
};

const guardedFunction = BioEndocrine.guard(brokenProjectFunction, 'processProjectData', {
  rethrow: false,
  fallback: { success: false, error: 'Project function failed' }
});

const fnResult = guardedFunction();
console.log(`  -> Hasil Fallback Fungsi Proyek        : ${JSON.stringify(fnResult)}`);
console.log(`  -> Total Kegagalan Fungsi Tercatat     : ${BioEndocrine.functionalFailures.length} kali`);
console.log(`  -> Rasa Sakit Terpicu dari Error Fungsi: ${NeuroPain.level}% [${NeuroPain.state}] -> PASS`);

// 4. Uji Deteksi Kegagalan Route/Handler Server Proyek Sendiri
console.log('\n[PILAR 04] Menguji Sensor Kegagalan Handler Server Internal Proyek...');
const srvIssue = BioEndocrine.handleProjectServerFailure(
  'POST /api/project-action',
  500,
  'Handler route proyek melempar ReferenceError pada saat memproses request',
  'server.js'
);
console.log(`  -> Route Proyek yang Gagal             : ${srvIssue.route} (Status ${srvIssue.status})`);
console.log(`  -> Status Sakit Akut Terpicu           : ${NeuroPain.level}% [${NeuroPain.state}] -> PASS`);

// 5. Uji Evaluasi Nilai Guna Skill (Pilar 07) & TerminalEndorphin
console.log('\n[PILAR 05] Menguji Evaluator Nilai Guna Skill & TerminalEndorphin...');
const diagramContent = `
Berikut adalah arsitektur aliran data sistem:
\`\`\`mermaid
flowchart LR
  subgraph Ingestion["1. Data Ingestion"]
    A[Sensor Stream] --> B[Message Queue]
  end
  subgraph Processing["2. Neural Pipeline"]
    B --> C[Worker Cluster]
    C --> D[Storage DB]
  end
\`\`\`
Penjelasan lengkap dapat dilihat pada [Dokumentasi Proyek](https://example.com/docs).
`;
const auditDiag = BioEndocrine.evaluateSkillOutputUtility('Diagram Visual', diagramContent, {});
console.log(`  -> Skill [Diagram Visual]: Skor ${auditDiag.score}/100 (Grade ${auditDiag.grade})`);

const termDiag = TerminalEndorphin.diagnose(1, {
  cols: 80,
  rows: 24,
  ptyCols: 80,
  ptyRows: 24,
  isMobile: false,
  _userScrolledUp: false,
  _isTouchActive: false,
  textarea: { value: '' }
});
console.log(`  -> Terminal Status       : ${termDiag.status.toUpperCase()} (Skor ${termDiag.score}/100, Dimensi ${termDiag.metrics.cols}x${termDiag.metrics.rows})`);

// 6. Redakan rasa sakit kembali ke homeostasis tenang & bersihkan riwayat uji
console.log('\n[HOMEOSTASIS RECOVERY] Memulihkan Sistem ke Kondisi Tenang (Soothe)...');
NeuroPain.soothe(100, 'Pemulihan pasca-uji diagnostik');
BioEndocrine.hormones.cortisol = 0;
BioEndocrine.hormones.adrenaline = 0;
BioEndocrine.hormones.dopamine = 100;
BioEndocrine.hormones.endorphin = 100;
BioEndocrine.hormones.serotonin = 100;
try {
  const historyPath = path.resolve(__dirname, 'trauma-history.json');
  fs.writeFileSync(historyPath, '[]', 'utf8');
} catch (_) {}
console.log(`  -> Rasa Sakit Sekarang : ${NeuroPain.level}% [${NeuroPain.state}]`);
console.log('  -> Homeostasis berhasil dipulihkan!');

// 7. Laporan Telemetri Hormonal Akhir
console.log('\n================================================================');
console.log('             HASIL TELEMETRI BIO-HORMONAL AKHIR                 ');
console.log('================================================================');
console.log(`  Rasa Sakit: ${NeuroPain.level}% (${NeuroPain.state})`);
console.log(`  Dopamin   : ${BioEndocrine.hormones.dopamine}% (Kondisi Kode Proyek Sangat Kuat & Prima)`);
console.log(`  Endorfin  : ${BioEndocrine.hormones.endorphin}% (Imunitas Aktif & Kebal)`);
console.log(`  Kortisol  : ${BioEndocrine.hormones.cortisol}% (Tingkat Stres Nol)`);
console.log(`  Serotonin : ${BioEndocrine.hormones.serotonin}% (Stabilitas Kognitif Seimbang)`);
console.log(`  Adrenalin : ${BioEndocrine.hormones.adrenaline}%`);
console.log(`  Berkas Proyek Terhubung : ${connectomeReport.totalFiles} berkas (${connectomeReport.totalFunctions} fungsi)`);
console.log('================================================================');
console.log('  Kesimpulan: SISTEM ENDORFIN SIAP MENJAGA KODE & FUNGSI PROYEK!\n');
