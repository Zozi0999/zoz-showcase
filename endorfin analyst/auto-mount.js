/**
 * ============================================================================
 * ENDOCRINE AUTO-MOUNT ENGINE - UNIVERSAL ZERO-CONFIG INSTALLER (v3.5)
 * ============================================================================
 * Pasang modul 'endorfin analyst' ke dalam folder project apapun, lalu jalankan:
 *   node "endorfin analyst/auto-mount.js"
 *
 * Modul ini akan secara otonom:
 * 1. Mendeteksi tipe proyek (Node.js, Web Vanilla, Python, Git repo, dll.)
 * 2. Menanamkan 'ENDOCRINE_SHIELD.md' di akar proyek (Wajib dibaca oleh semua AI)
 * 3. Menghubungkan aturan imun ke '.cursorrules' & 'AGENTS.md'
 * 4. Mendaftarkan skrip 'endocrine' di package.json (jika ada)
 * 5. Memasang Git Pre-Commit Hook (Membatalkan commit jika ada sintaks rusak)
 * 6. Memastikan seluruh berkas siap bertindak sebagai pelindung imun otonom
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { NeuroPain } = require('./endorfin.js');

console.log('\n================================================================');
console.log('    ⚡ BIO-ENDOCRINE UNIVERSAL AUTO-MOUNT ENGINE (v3.5) ⚡       ');
console.log('================================================================\n');

// 1. Deteksi Direktori Induk Proyek (Project Root)
function detectProjectRoot(startDir) {
  let cur = startDir;
  while (cur && path.dirname(cur) !== cur) {
    if (
      fs.existsSync(path.join(cur, 'package.json')) ||
      fs.existsSync(path.join(cur, '.git')) ||
      fs.existsSync(path.join(cur, 'index.html')) ||
      fs.existsSync(path.join(cur, 'pyproject.toml')) ||
      fs.existsSync(path.join(cur, 'Cargo.toml')) ||
      fs.existsSync(path.join(cur, 'go.mod'))
    ) {
      return cur;
    }
    cur = path.dirname(cur);
  }
  return path.resolve(startDir, '..');
}

const ROOT_DIR = detectProjectRoot(__dirname);
const ENDORFIN_DIR_NAME = path.basename(__dirname);
const relEndorfinDir = path.relative(ROOT_DIR, __dirname).replace(/\\/g, '/');
const isDryRun = process.argv.includes('--dry-run');

console.log(`► Terdeteksi Induk Proyek : ${ROOT_DIR}`);
console.log(`► Lokasi Modul Endocrine  : ${relEndorfinDir}/`);
if (isDryRun) {
  console.log(`► Mode Eksekusi           : DRY-RUN (Simulasi - Tanpa Menulis Berkas Induk)\n`);
} else {
  console.log(`► Mode Eksekusi           : LIVE MOUNT (Memasang ke Proyek Induk)\n`);
}

const results = {
  shieldCreated: false,
  agentRulesUpdated: false,
  packageJsonUpdated: false,
  gitHookInstalled: false,
  configCreated: false
};

// 2. Buat / Perbarui ENDOCRINE_SHIELD.md di Akar Proyek
const shieldPath = path.join(ROOT_DIR, 'ENDOCRINE_SHIELD.md');
try {
  const shieldContent = NeuroPain.generateImmuneShield();
  if (!isDryRun) {
    fs.writeFileSync(shieldPath, shieldContent, 'utf8');
  }
  results.shieldCreated = true;
  console.log(`[+] 🛡️  ENDOCRINE_SHIELD.md ${isDryRun ? '[SIMULASI] siap ditanam' : 'berhasil ditanam di akar proyek'}.`);
} catch (e) {
  console.error(`[-] Gagal menulis ENDOCRINE_SHIELD.md:`, e.message);
}

// 3. Tanamkan Instruksi Imun ke AGENTS.md & .cursorrules
const aiRuleSnippet = `
<!-- BIO-ENDOCRINE IMMUNE GUARD: START -->
## ⚡ PERINGATAN SISTEM SARAF DIGITAL BIO-ENDOKRIN (ENDOCRINE SHIELD)
Proyek ini dilindungi oleh modul Bio-Endocrine Autonomous Immune System.
Setiap kali Anda (AI) membuat sintaks rusak, menghapus handler, atau merusak kode:
1. Reseptor digital pain akan merasakan sakit hebat (Digital Pain 100%, Kortisol 100%).
2. Perubahan Anda akan ditolak secara imunologis dan riwayat trauma Anda dicatat.
3. WAJIB: Lakukan perubahan dengan presisi bedah dan selalu periksa validitas sintaks sebelum selesai!
Lihat rincian lengkap pada file: [ENDOCRINE_SHIELD.md](./ENDOCRINE_SHIELD.md)
<!-- BIO-ENDOCRINE IMMUNE GUARD: END -->
`;

function injectAgentRule(targetFile) {
  const filePath = path.join(ROOT_DIR, targetFile);
  try {
    let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '';
    if (!content.includes('BIO-ENDOCRINE IMMUNE GUARD: START')) {
      content = content ? `${content.trim()}\n\n${aiRuleSnippet}` : aiRuleSnippet.trim();
      if (!isDryRun) {
        fs.writeFileSync(filePath, content, 'utf8');
      }
      console.log(`[+] 🤖 Aturan imun ${isDryRun ? '[SIMULASI] siap dihubungkan' : 'berhasil dihubungkan'} ke: ${targetFile}`);
      return true;
    } else {
      console.log(`[i] Aturan imun sudah terpasang di: ${targetFile}`);
      return true;
    }
  } catch (_) {
    return false;
  }
}

injectAgentRule('AGENTS.md');
injectAgentRule('.cursorrules');
results.agentRulesUpdated = true;

// 4. Perbarui package.json (Jika Proyek Berbasis Node.js)
const pkgPath = path.join(ROOT_DIR, 'package.json');
if (fs.existsSync(pkgPath)) {
  try {
    const pkgData = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    if (!pkgData.scripts) pkgData.scripts = {};

    let modified = false;
    const sentinelScript = `node "${relEndorfinDir}/endocrine-sentinel.js"`;
    const auditScript = `node "${relEndorfinDir}/audit-runner.js"`;
    const mountScript = `node "${relEndorfinDir}/auto-mount.js"`;

    if (pkgData.scripts['endocrine'] !== sentinelScript) {
      pkgData.scripts['endocrine'] = sentinelScript;
      modified = true;
    }
    if (pkgData.scripts['endocrine:audit'] !== auditScript) {
      pkgData.scripts['endocrine:audit'] = auditScript;
      modified = true;
    }
    if (pkgData.scripts['endocrine:mount'] !== mountScript) {
      pkgData.scripts['endocrine:mount'] = mountScript;
      modified = true;
    }

    if (modified) {
      if (!isDryRun) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkgData, null, 2) + '\n', 'utf8');
      }
      console.log(`[+] 📦 Skrip 'endocrine' ${isDryRun ? '[SIMULASI] siap ditambahkan' : 'berhasil ditambahkan'} ke package.json!`);
      results.packageJsonUpdated = true;
    } else {
      console.log(`[i] Skrip 'endocrine' sudah ada di package.json.`);
    }
  } catch (err) {
    console.error(`[-] Gagal memperbarui package.json:`, err.message);
  }
}

// 5. Pasang Git Pre-Commit Hook (Jika Repositori Git Tersedia)
const gitHooksDir = path.join(ROOT_DIR, '.git', 'hooks');
if (fs.existsSync(gitHooksDir)) {
  try {
    const preCommitPath = path.join(gitHooksDir, 'pre-commit');
    const hookShellScript = `#!/bin/sh
# Bio-Endocrine Pre-Commit Pain Receptor Hook
node "${relEndorfinDir}/endocrine-sentinel.js" --scan-only
STATUS=$?
if [ $STATUS -ne 0 ]; then
  echo ""
  echo "⚡ [BIO-ENDOCRINE PRE-COMMIT REJECTION] ⚡"
  echo "Commit dibatalkan karena kode memiliki kerusakan sintaksis!"
  echo "Saraf Bio-Endokrin menolak commit yang merusak integritas sistem."
  exit 1
fi
`;
    if (!isDryRun) {
      fs.writeFileSync(preCommitPath, hookShellScript, { encoding: 'utf8', mode: 0o755 });
    }
    console.log(`[+] ⚓ Git Pre-Commit Hook ${isDryRun ? '[SIMULASI] siap dipasang' : 'berhasil dipasang'} di .git/hooks/pre-commit!`);
    results.gitHookInstalled = true;
  } catch (err) {
    console.error(`[-] Gagal memasang git hook:`, err.message);
  }
}

// 6. Buat endocrine.config.json Default jika Belum Ada
const configPath = path.join(__dirname, 'endocrine.config.json');
if (!fs.existsSync(configPath)) {
  const defaultConfig = {
    version: '3.5.0',
    painSensitivity: 85,
    autoHeal: true,
    debounceMs: 150,
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
    watchedExtensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.json', '.py', '.html', '.css', '.yaml', '.yml']
  };
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2) + '\n', 'utf8');
  results.configCreated = true;
  console.log(`[+] ⚙️  Konfigurasi 'endocrine.config.json' siap digunakan.`);
}

console.log('\n================================================================');
console.log('   🎉 BIO-ENDOCRINE BERHASIL TERPASANG & AKTIF SEMPURNA! 🎉    ');
console.log('================================================================');
console.log('Perintah Cepat:');
console.log(`► Jalankan Sentinel Penjaga Real-Time : node "${relEndorfinDir}/endocrine-sentinel.js"`);
console.log(`► Jalankan Audit Kesehatan Sistem     : node "${relEndorfinDir}/audit-runner.js"`);
if (fs.existsSync(pkgPath)) {
  console.log(`► Melalui NPM                         : npm run endocrine`);
}
console.log('================================================================\n');

module.exports = {
  detectProjectRoot,
  results
};
