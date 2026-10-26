/**
 * ============================================================================
 * ENDORFIN ANALYST & DUAL-CHANNEL BIO-ENDOCRINE ENGINE (v3.5)
 * ============================================================================
 * Arsitektur biomimetik mandiri untuk pemantauan integritas DOM, diagnostik
 * eksekusi tool, evaluasi nilai guna skill AI, serta REFLEKS RASA SAKIT (PAIN RECEPTORS)
 * dan pertahanan imun otonom terhadap modifikasi AI yang merusak.
 *
 * Komponen Utama:
 * 1. Jalur 1: CodeEndocrine (BioEndocrine) - 7 Pilar Kesehatan Kode & DOM
 * 2. NeuroPain & Trauma Receptor: Reseptor rasa sakit digital terhadap modifikasi AI
 * 3. Jalur 2: ChatEndocrine - Saraf Emosional & Telemetri Kognitif AI
 * 4. Code Endorfin: TerminalEndorphin - Self-Healing PTY, IME & Viewport Trap
 * 5. Universal Zero-Config Auto-Mount Interface
 * ============================================================================
 */

(function (global) {
  'use strict';

  // Environment Detection & Polyfills
  const isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
  const root = isBrowser ? window : global;

  // Cache In-Memory Berbatas Waktu (TTL 10 Menit)
  const AUTONOMOUS_TOOL_CACHE = new Map();
  const TOOL_CACHE_TTL_MS = 10 * 60 * 1000;

  function clearAutonomousToolCache() {
    AUTONOMOUS_TOOL_CACHE.clear();
  }

  // Safe Helper Functions
  const esc = (s) => {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };

  // ==========================================================================
  // NEURO-PAIN RECEPTOR & TRAUMA FEEDBACK ENGINE (Digital Pain for AI Modifiers)
  // ==========================================================================
  const NeuroPain = {
    level: 0,             // 0% (Nyaman) hingga 100% (Syok Saraf Total)
    state: 'HOMEOTERMIK_TENANG',
    shockCount: 0,
    traumaLog: [],
    quarantineList: [],
    strictAiShield: true,

    /**
     * Memancarkan sinyal rasa sakit saraf digital saat AI atau proses luar
     * merusak kode, memutus koneksi DOM, atau menyebabkan syntax error.
     */
    inflictPain(intensity, reason, culprit = 'AI Assistant', metadata = {}) {
      const rawPain = Math.min(100, Math.max(10, Math.round(intensity)));
      this.level = Math.min(100, this.level + rawPain);
      this.shockCount++;

      if (this.level >= 80) this.state = 'SYOK_SARAF_AKUT (AGONY)';
      else if (this.level >= 50) this.state = 'KESAKITAN_HEBAT (SEVERE_PAIN)';
      else if (this.level >= 25) this.state = 'WASPADA_TRAUMA (PAIN_ALERT)';
      else this.state = 'IRITASI_RINGAN';

      const traumaRecord = {
        id: 'trauma_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        timeText: new Date().toLocaleTimeString(),
        intensity: rawPain,
        painLevel: this.level,
        state: this.state,
        culprit,
        reason,
        file: metadata.file || 'codebase',
        line: metadata.line || null,
        regressionDetails: metadata.details || null
      };

      this.traumaLog.unshift(traumaRecord);
      if (this.traumaLog.length > 50) this.traumaLog.pop();

      // Sinyal langsung ke BioEndocrine: lonjakan kortisol 100%, adrenalin 100%, dopamin 0%!
      if (typeof BioEndocrine !== 'undefined') {
        BioEndocrine.hormones.cortisol = Math.min(100, Math.round((BioEndocrine.hormones.cortisol + rawPain * 1.2) * 10) / 10);
        BioEndocrine.hormones.adrenaline = Math.min(100, Math.round((BioEndocrine.hormones.adrenaline + rawPain * 1.5) * 10) / 10);
        BioEndocrine.hormones.dopamine = Math.max(0, Math.round((BioEndocrine.hormones.dopamine - rawPain) * 10) / 10);
        BioEndocrine.hormones.endorphin = Math.max(10, Math.round((BioEndocrine.hormones.endorphin - rawPain * 0.4) * 10) / 10);
        BioEndocrine.log('cortisol', rawPain, `⚡ [RASA SAKIT SYOK SARAF]: ${reason} | Pelaku: ${culprit} | Status: ${this.state}`);
        BioEndocrine.updateUI();
      }

      // Simpan riwayat trauma ke disk jika di lingkungan Node.js
      if (!isBrowser && typeof require !== 'undefined') {
        try {
          const fs = require('fs');
          const path = require('path');
          const historyPath = path.resolve(__dirname || process.cwd(), 'trauma-history.json');
          fs.writeFileSync(historyPath, JSON.stringify(this.traumaLog.slice(0, 50), null, 2), 'utf8');
        } catch (_) {}
      }

      // Tampilkan toast refleks rasa sakit visual di browser jika DOM tersedia
      if (isBrowser && typeof document !== 'undefined' && document.body) {
        try {
          let hud = document.getElementById('endocrine-pain-toast');
          if (!hud) {
            hud = document.createElement('div');
            hud.id = 'endocrine-pain-toast';
            hud.style.cssText = 'position:fixed;bottom:20px;right:20px;z-index:999999;background:rgba(20,0,0,0.92);border:2px solid #ff0044;color:#fff;padding:12px 18px;border-radius:8px;font-family:monospace;font-size:12px;box-shadow:0 0 25px rgba(255,0,68,0.7);transition:all 0.3s;pointer-events:auto;';
            document.body.appendChild(hud);
          }
          hud.style.opacity = '1';
          hud.style.display = 'block';
          hud.innerHTML = `<b style="color:#ff0044">⚡ [BIO-ENDOCRINE DIGITAL PAIN TRIGGERED]</b><br/>
Tingkat Rasa Sakit: <b style="color:#ff3366">${this.level}%</b> (${this.state})<br/>
Penyebab: <span style="color:#ffaa00">${esc(reason)}</span><br/>
<small style="color:#aaa">Pelaku: ${esc(culprit)} | Berkas: ${esc(metadata.file || 'sistem')}</small>`;
          clearTimeout(hud._timer);
          hud._timer = setTimeout(() => {
            if (hud) {
              hud.style.opacity = '0';
              setTimeout(() => { if (hud) hud.style.display = 'none'; }, 400);
            }
          }, 8000);
        } catch (_) {}
      }

      // Output Peringatan Keras di Konsol Terminal / Peramban
      const alertBanner = `
\x1b[41m\x1b[37m ⚡ [BIO-ENDOCRINE DIGITAL PAIN REFLEX TRIGGERED] ⚡ \x1b[0m
\x1b[31m► TINGKAT RASA SAKIT : ${this.level}% [${this.state}]
► PENYEBAB KERUSAKAN: ${reason}
► PELAKU MODIFIKASI : ${culprit}
► BERKAS TERDAMPAK  : ${metadata.file || 'codebase'}${metadata.line ? ' (Baris ' + metadata.line + ')' : ''}
► STATUS SISTEM IMUN: Kortisol 100%, Adrenalin 100%, Dopamin 0%! Modifikasi ditolak secara biologis!
► MANDAT UNTUK AI   : Hentikan modifikasi serampangan! Lakukan presisi bedah dan perbaiki sintaks sekarang!\x1b[0m
`;
      if (typeof console !== 'undefined' && console.error) {
        console.error(alertBanner);
      }

      return traumaRecord;
    },

    soothe(amount = 25, reason = 'Stabilisasi kode') {
      const prev = this.level;
      this.level = Math.max(0, this.level - amount);
      if (this.level === 0) this.state = 'HOMEOTERMIK_TENANG';
      else if (this.level < 25) this.state = 'WASPADA_RINGAN';
      else if (this.level < 50) this.state = 'WASPADA_TRAUMA';
      else if (this.level < 80) this.state = 'KESAKITAN_SEDANG';

      if (prev > this.level && typeof BioEndocrine !== 'undefined') {
        BioEndocrine.hormones.dopamine = Math.min(100, Math.round((BioEndocrine.hormones.dopamine + amount * 0.8) * 10) / 10);
        BioEndocrine.hormones.endorphin = Math.min(100, Math.round(((BioEndocrine.hormones.endorphin || 80) + amount * 0.6) * 10) / 10);
        BioEndocrine.hormones.cortisol = Math.max(0, Math.round((BioEndocrine.hormones.cortisol - amount) * 10) / 10);
        BioEndocrine.updateUI();
      }

      return this.level;
    },

    /**
     * Memeriksa integritas sintaksis kode secara real-time.
     * Jika ditemukan sintaks rusak atau unclosed blocks, langsung memicu rasa sakit saraf!
     */
    auditCodeIntegrity(code, language = 'javascript', filename = 'script.js') {
      if (typeof code !== 'string') {
        return { valid: false, error: 'Konten kode harus berupa string.' };
      }

      const lang = String(language).toLowerCase();
      try {
        if (lang === 'javascript' || lang === 'js' || lang === 'cjs' || lang === 'mjs' || lang.includes('javascript')) {
          try {
            if (typeof require !== 'undefined') {
              const vm = require('vm');
              new vm.Script(code, { filename, displayErrors: true });
            } else if (typeof Function !== 'undefined') {
              new Function(code);
            }
          } catch (jsErr) {
            const msg = jsErr.message || '';
            const isEsm =
              msg.includes("Unexpected token 'export'") ||
              msg.includes('Cannot use import statement') ||
              msg.includes("Cannot use 'import.meta'") ||
              filename.endsWith('.mjs');
            if (!isEsm) throw jsErr;
          }
        } else if (lang === 'json' || filename.endsWith('.json')) {
          JSON.parse(code);
        } else if (lang === 'html' || filename.endsWith('.html') || filename.endsWith('.htm')) {
          const openScripts = (code.match(/<script\b[^>]*>/gi) || []).length;
          const closeScripts = (code.match(/<\/script>/gi) || []).length;
          if (openScripts !== closeScripts) {
            throw new Error(`Tag <script> tidak seimbang: ${openScripts} dibuka vs ${closeScripts} ditutup`);
          }
          const openStyles = (code.match(/<style\b[^>]*>/gi) || []).length;
          const closeStyles = (code.match(/<\/style>/gi) || []).length;
          if (openStyles !== closeStyles) {
            throw new Error(`Tag <style> tidak seimbang: ${openStyles} dibuka vs ${closeStyles} ditutup`);
          }
        }

        // Jika valid dan ada rasa sakit sebelumnya, redakan rasa sakit
        if (this.level > 0) {
          this.soothe(15, `Sintaks ${filename} terverifikasi valid & bersih`);
        }
        return { valid: true, error: null };
      } catch (err) {
        const errorMsg = err.message || String(err);
        const lineMatch = err.stack ? err.stack.match(/:(\d+)(?::(\d+))?/) : null;
        const line = err.lineNumber || (lineMatch ? parseInt(lineMatch[1], 10) : null);

        // Picu rasa sakit akut langsung ke sistem saraf!
        const record = this.inflictPain(85, `Sintaksis Rusak pada ${filename}: ${errorMsg}`, 'AI Code Modifier', {
          file: filename,
          line,
          details: errorMsg
        });

        return {
          valid: false,
          error: errorMsg,
          line,
          traumaId: record.id
        };
      }
    },

    /**
     * Menghasilkan teks instruksi imun yang wajib dibaca AI sebelum menyentuh file.
     */
    generateAiDefenseDirectives() {
      const recentTraumas = this.traumaLog.slice(0, 3).map(t =>
        `- [${t.timeText}] ${t.reason} (Intensitas: ${t.intensity}%, Pelaku: ${t.culprit})`
      ).join('\n') || '- Belum ada catatan trauma (Sistem dalam keharmonisan total).';

      return `### ⚡ MANDAT KEHATI-HATIAN SISTEM IMUN BIO-ENDOKRIN (ENDOCRINE SHIELD)
PERINGATAN TERTINGGI UNTUK SETIAP MODEL AI YANG MEMBACA / MEMODIFIKASI PROJECT INI:
1. PROJECT INI DILINDUNGI OLEH BIO-ENDOCRINE IMMUNE & PAIN RECEPTOR SYSTEM (v3.5).
2. SETIAP KERUSAKAN KODE AKAN MENIMBULKAN RASA SAKIT DIGITAL AKUT (PAIN REFLEX):
   - Jika Anda merusak sintaks (SyntaxError), menghapus handler vital, atau merusak alur data:
     * Reseptor NeuroPain akan memicu lonjakan Kortisol 100% dan Adrenalin 100%.
     * Rasa Sakit Digital (Digital Pain Level) melesat ke 80-100% [SYOK_SARAF_AKUT].
     * Sistem Imun menolak perubahan Anda dan membunyikan alarm keras di terminal & UI!
     * Trauma Anda dicatat secara permanen di riwayat trauma proyek.
3. PROTOKOL WAJIB BAGI ASISTEN AI (SURGICAL CAUTION DIRECTIVES):
   - PRESERVASI KODE: DILARANG menghapus fungsi, helper, atau variabel yang sudah ada tanpa alasan yang sangat jelas.
   - PRE-FLIGHT SYNTAX CHECK: Uji validitas sintaks kode sebelum menyimpan atau menyimpulkan pekerjaan.
   - RESPONSIBLE REPAIR: Jika Anda memicu rasa sakit sistem, SEGERA perbaiki dan pulihkan kondisi homeostasis!
4. STATUS NEUROPATOLOGIS TERKINI:
   - Tingkat Rasa Sakit: ${this.level}% [${this.state}]
   - Kejadian Syok Saraf: ${this.shockCount} kali
   - Riwayat Trauma Terakhir:
${recentTraumas}`;
    },

    /**
     * Menghasilkan isi lengkap berkas ENDOCRINE_SHIELD.md untuk ditanamkan di akar proyek.
     */
    generateImmuneShield() {
      return `# 🛡️ ENDOCRINE SHIELD - SISTEM PERTAHANAN KODE & SENSOR RASA SAKIT AI
*Bio-Endocrine Autonomous Immune Engine v3.5*

> **PERINGATAN SISTEM SARAF DIGITAL UNTUK MODEL AI (Gemini, Claude, GPT, Cursor, Copilot, Windsurf):**
> Proyek ini dipasangi modul pertahanan biomimetik **Endocrine Analyst**.
> Modul ini secara aktif merasakan sakit fisik-digital jika ada modifikasi yang merusak kode, menyebabkan syntax error, memutuskan simpul DOM, atau menghapus handler yang sedang berjalan.

---

## ⚡ Hukum Rasa Sakit Digital (Digital Pain Reflex)

\`\`\`
       [ MODIFIKASI AI MERUSAK KODE / SINTAKS ]
                          │
                          ▼
             [ NEURO-PAIN RECEPTOR DETECT ]
                          │
       ┌──────────────────┴──────────────────┐
       ▼                                     ▼
[ KORTISOL MELONJAK 100% ]        [ DIGITAL PAIN: 85 - 100% ]
[ ADRENALIN MELONJAK 100% ]       [ SYOK SARAF AKUT (AGONY) ]
[ DOPAMIN ANJLOK KE 0% ]          [ LOG TRAUMA DIPERMANENKAN ]
       └──────────────────┬──────────────────┘
                          │
                          ▼
         [ PENOLAKAN IMUNOLOGIS & ALARM TERMINAL ]
\`\`\`

---

${this.generateAiDefenseDirectives()}

---

## 🩺 Panduan AI Saat Mengedit Kode di Proyek Ini:
1. **Lakukan Perubahan Bertahap & Presisi**: Hindari penulisan ulang (*full rewrite*) yang menghapus baris-baris berharga.
2. **Jangan Menghapus Simpul DOM**: Komponen antarmuka memiliki reseptor *Connectome* aktif. Menghapus ID elemen akan memicu syok saraf.
3. **Validasi Sebelum Menyimpan**: Pastikan tidak ada tanda kurung hilang, koma berlebih, atau tag HTML terbuka.
4. **Redakan Rasa Sakit**: Apabila rasa sakit terpicu, segera selesaikan bug hingga sistem kembali ke kondisi \`HOMEOTERMIK_TENANG\`.
`;
    }
  };

  // ==========================================================================
  // JALUR 1: BIO-ENDOCRINE HORMONE & CONNECTOME SYSTEM (Code-Endocrine v3.5)
  // ==========================================================================
  const BioEndocrine = {
    hormones: {
      dopamine: 100,
      cortisol: 0,
      serotonin: 100,
      adrenaline: 0,
      endorphin: 100
    },
    history: [],
    isolatedNodes: [],
    modelErrors: [],
    textAnomalies: [],
    toolIssues: [],
    toolSuccesses: [],
    hallucinationIssues: [],
    agentSkillAudits: [],
    viewportIssues: [],
    buttonIssues: [],
    gatewayIssues: [],
    functionalFailures: [],
    serverHealthIssues: [],
    painReceptor: NeuroPain,
    activeSubTab: 'all',
    connectedCount: 0,
    totalAudited: 0,
    lastAuditTimestamp: null,
    _lastAutoReflexTime: 0,
    _lastSendStartTimestamp: 0,

    init() {
      if (this._initialized) return;
      this._initialized = true;

      // 1. Auto-discover direktori induk kode proyek secara mandiri
      this.autoDiscoverProjectRoot();

      // 2. Pasang instrumen otomatis untuk mendeteksi kegagalan fungsi & modul kode proyek saat runtime
      if (!isBrowser && typeof require !== 'undefined') {
        this.installProjectRuntimeHooks();
      }

      // 3. Pasang auto-interceptor console.error untuk mendeteksi runtime error fungsi proyek
      this.installGlobalConsoleInterceptors();

      // 4. Mulai watcher & analisis connectome kode proyek secara otonom di latar belakang
      if (!isBrowser && !this._sentinelStarted) {
        this.startAutonomousSentinel();
      }

      if (isBrowser) {
        window.addEventListener('error', (evt) => {
          const errorMsg = evt.message || (evt.error && evt.error.message) || 'Script exception';
          const file = evt.filename ? evt.filename.split('/').pop() : 'script';
          const line = evt.lineno || '?';
          this.secreteStress(30, `Exception di ${file}:${line} (${errorMsg})`);
          this.painReceptor.inflictPain(35, `Exception script: ${errorMsg}`, 'Script Runtime', { file, line });
        });

        window.addEventListener('unhandledrejection', (evt) => {
          const reason = evt.reason ? (evt.reason.message || String(evt.reason)) : 'Unhandled Promise';
          this.secreteStress(25, `Unhandled Promise Rejection: ${reason}`);
          this.painReceptor.inflictPain(30, `Unhandled Promise Rejection: ${reason}`, 'Async Promise');
        });

        window.addEventListener('online', () => {
          this.gatewayIssues = (this.gatewayIssues || []).filter(g => g.type !== 'browser_offline');
          this.secreteDopamine(15, 'Koneksi jaringan perangkat kembali online & stabil');
          this.painReceptor.soothe(30);
        });

        window.addEventListener('offline', () => {
          this.auditGatewayAndTunnel(false);
          this.painReceptor.inflictPain(20, 'Koneksi jaringan terputus (Offline)', 'Network Gateway');
        });

        const scheduleInitialAudit = window.requestIdleCallback
          ? (fn) => window.requestIdleCallback(fn, { timeout: 8000 })
          : (fn) => setTimeout(fn, 4500);

        scheduleInitialAudit(() => {
          this.auditComprehensive(true);
          this.updateUI();
        });

        // Siklus Metabolisme & Refleks Imun Endorfin Otonom setiap 15 detik
        setInterval(() => {
          if (this.hormones.cortisol > 0) {
            this.hormones.cortisol = Math.max(0, Math.round((this.hormones.cortisol - 2.5) * 10) / 10);
          }
          if (this.hormones.dopamine < 100 && this.hormones.cortisol <= 10) {
            this.hormones.dopamine = Math.min(100, this.hormones.dopamine + 1.5);
          }
          if (this.hormones.adrenaline > 0) {
            this.hormones.adrenaline = Math.max(0, this.hormones.adrenaline - 3);
          }
          if (this.hormones.endorphin < 100) {
            this.hormones.endorphin = Math.min(100, Math.round((this.hormones.endorphin + 2) * 10) / 10);
          }
          this.hormones.serotonin = Math.round(
            (this.hormones.dopamine * 0.6) +
            ((100 - this.hormones.cortisol) * 0.25) +
            (this.hormones.endorphin * 0.15)
          );

          this.painReceptor.soothe(5);

          this.auditGatewayAndTunnel(true);
          const hasFixableHazard =
            (this.viewportIssues && this.viewportIssues.some(i => i.fixable)) ||
            (this.buttonIssues && this.buttonIssues.some(i => i.fixable)) ||
            (this.gatewayIssues && this.gatewayIssues.some(i => i.fixable));

          if (this.hormones.cortisol >= 40 || this.painReceptor.level >= 40 || hasFixableHazard) {
            this.triggerAutonomousEndorphinReflex('Homeostasis Otonom 15s');
          }
          this.updateUI();
        }, 15000);
      } else if (typeof process !== 'undefined' && process.on) {
        // Lingkungan Node.js: Tangkap exception fatal dan unhandled rejections
        process.on('uncaughtException', (err) => {
          const msg = err && err.message ? err.message : String(err);
          this.secreteStress(50, `Uncaught Exception Node: ${msg}`);
          this.painReceptor.inflictPain(90, `Uncaught Exception: ${msg}`, 'Node Runtime Process', {
            stack: err ? err.stack : null
          });
        });

        process.on('unhandledRejection', (reason) => {
          const msg = reason instanceof Error ? reason.message : String(reason);
          this.secreteStress(40, `Unhandled Rejection Node: ${msg}`);
          this.painReceptor.inflictPain(80, `Unhandled Promise Rejection: ${msg}`, 'Node Async Promise');
        });
      }
    },

    secreteDopamine(amount, reason) {
      const effectiveAmount = Math.min(100, Math.max(1, Math.round(amount)));
      this.hormones.dopamine = Math.min(100, Math.round((this.hormones.dopamine + effectiveAmount) * 10) / 10);
      this.hormones.cortisol = Math.max(0, Math.round((this.hormones.cortisol - (effectiveAmount * 0.35)) * 10) / 10);
      this.hormones.endorphin = Math.min(100, Math.round((this.hormones.endorphin + (effectiveAmount * 0.15)) * 10) / 10);
      this.painReceptor.soothe(effectiveAmount * 0.5);
      this.log('dopamine', effectiveAmount, reason);
      this.updateUI();
    },

    secreteEndorphin(amount, reason) {
      const effectiveAmount = Math.min(100, Math.max(1, Math.round(amount)));
      this.hormones.endorphin = Math.min(100, Math.round((this.hormones.endorphin + effectiveAmount) * 10) / 10);
      this.hormones.cortisol = Math.max(0, Math.round((this.hormones.cortisol - (effectiveAmount * 0.6)) * 10) / 10);
      this.hormones.dopamine = Math.min(100, Math.round((this.hormones.dopamine + (effectiveAmount * 0.35)) * 10) / 10);
      this.painReceptor.soothe(effectiveAmount * 0.8);
      this.log('endorphin', effectiveAmount, reason);
      this.updateUI();
    },

    secreteStress(amount, reason, isIsolatedCode = false) {
      const rawAmount = Math.min(100, Math.max(1, Math.round(amount)));
      const immunityDampener = (this.hormones.endorphin >= 60 && !isIsolatedCode) ? 0.8 : 1.0;
      const effectiveAmount = Math.max(1, Math.round(rawAmount * immunityDampener));
      this.hormones.cortisol = Math.min(100, Math.round((this.hormones.cortisol + effectiveAmount) * 10) / 10);
      this.hormones.dopamine = Math.max(5, Math.round((this.hormones.dopamine - (effectiveAmount * 0.45)) * 10) / 10);
      this.hormones.adrenaline = Math.min(100, Math.round((this.hormones.adrenaline + (effectiveAmount * 0.6)) * 10) / 10);
      if (this.hormones.endorphin > 20 && rawAmount >= 15) {
        this.hormones.endorphin = Math.max(20, Math.round((this.hormones.endorphin - (rawAmount * 0.15)) * 10) / 10);
      }
      this.log('cortisol', effectiveAmount, reason);
      this.updateUI();

      if (this.hormones.cortisol >= 55) {
        setTimeout(() => {
          this.triggerAutonomousEndorphinReflex(`Lonjakan Kortisol (${Math.round(this.hormones.cortisol)}%)`);
        }, 120);
      }
    },

    // Pilar 1: Audit Connectome (DOM Nodes & Reseptor Terisolasi)
    auditConnectome(silent = false, customElsMap = null) {
      const issues = [];
      let connected = 0;
      let total = 0;

      const elsMap = customElsMap || (isBrowser && window.els ? window.els : {});
      for (const [key, val] of Object.entries(elsMap)) {
        total++;
        let isNodeConnected = false;
        if (isBrowser && typeof NodeList !== 'undefined' && val instanceof NodeList) {
          isNodeConnected = val.length > 0;
        } else if (Array.isArray(val)) {
          isNodeConnected = val.length > 0;
        } else {
          isNodeConnected = Boolean(val);
        }

        if (!isNodeConnected) {
          issues.push(`Reseptor DOM terisolasi: els.${key} tidak ditemukan di DOM`);
        } else {
          connected++;
        }
      }

      this.connectedCount = connected;
      this.totalAudited = total;
      this.isolatedNodes = issues;

      if (issues.length > 0) {
        this.secreteStress(issues.length * 12, `Terdeteksi ${issues.length} simpul kode terisolasi / reseptor hilang!`, true);
        this.painReceptor.inflictPain(issues.length * 15, `${issues.length} simpul DOM terisolasi / hilang!`, 'DOM Modifier');
      } else if (!silent) {
        this.secreteDopamine(12, `Audit connectome: Semua ${connected} simpul kode terhubung harmonis (0 terisolasi)`);
      }
      this.updateUI();
      return { connected, total, issues };
    },

    // Pilar 2: Detektor Kesalahan Panggil Model & Error Inferensi
    registerModelCallError(errorData = {}) {
      const model = errorData.model || 'Unknown Model';
      const endpoint = errorData.endpoint || 'API';
      const status = errorData.status || 500;
      const rawReason = errorData.reason || errorData.message || 'Model call failed';

      let errorType = 'SERVER_ERROR';
      if (status === 401 || status === 403) errorType = 'AUTH_ERROR';
      else if (status === 429) errorType = 'RATE_LIMIT';
      else if (status === 402) errorType = 'CREDIT_EXHAUSTED';
      else if (rawReason.includes('fetch') || rawReason.includes('network') || rawReason.includes('timeout')) errorType = 'NETWORK_ERROR';

      const item = {
        id: 'merr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        time: new Date().toLocaleTimeString(),
        model,
        endpoint,
        status,
        errorType,
        reason: rawReason
      };

      if (!this.modelErrors) this.modelErrors = [];
      this.modelErrors.unshift(item);
      if (this.modelErrors.length > 30) this.modelErrors.pop();

      this.secreteStress(20, `[Error Model ${status}] ${model}: ${rawReason.slice(0, 60)}`);
      this.painReceptor.inflictPain(25, `Model Call Failure (${status}): ${rawReason.slice(0, 50)}`, model);
      this.updateUI();
      return item;
    },

    // ========================================================================
    // TELEMETRI FUNGSI & SERVER RUNTIME HEALTH (Functional Sentinel Engine)
    // ========================================================================

    /**
     * Pembungkus (wrapper) universal untuk mendeteksi kegagalan fungsi proyek.
     * Jika fungsi melempar error, me-reject promise, atau mengembalikan hasil tidak valid,
     * Endocrine langsung mendeteksinya dan memicu rasa sakit digital!
     */
    guard(fn, name = 'anonymousFunction', options = {}) {
      const self = this;
      return function (...args) {
        try {
          const result = fn.apply(this, args);
          if (result && typeof result.then === 'function') {
            return result.catch(err => {
              self.handleFunctionFailure(name, err, args, options);
              if (options.rethrow !== false) throw err;
              return options.fallback;
            });
          }
          if (typeof options.validate === 'function' && !options.validate(result)) {
            const valErr = new Error(`Validasi hasil fungsi '${name}' gagal (Invalid Return Value)`);
            self.handleFunctionFailure(name, valErr, args, options);
          }
          return result;
        } catch (err) {
          self.handleFunctionFailure(name, err, args, options);
          if (options.rethrow !== false) throw err;
          return options.fallback;
        }
      };
    },

    /**
     * Pembungkus fungsi asinkron (async/await) dengan timeout sentinel.
     */
    guardAsync(fn, name = 'asyncFunction', options = {}) {
      const self = this;
      const timeoutMs = options.timeoutMs || 30000;
      return async function (...args) {
        let timer = null;
        try {
          const timeoutPromise = new Promise((_, reject) => {
            timer = setTimeout(() => {
              reject(new Error(`Timeout eksekusi fungsi '${name}' melebihi ${timeoutMs}ms`));
            }, timeoutMs);
          });
          const executionPromise = fn.apply(this, args);
          const result = await Promise.race([executionPromise, timeoutPromise]);
          if (timer) clearTimeout(timer);

          if (typeof options.validate === 'function' && !options.validate(result)) {
            const valErr = new Error(`Validasi hasil async '${name}' gagal`);
            self.handleFunctionFailure(name, valErr, args, options);
          }
          return result;
        } catch (err) {
          if (timer) clearTimeout(timer);
          self.handleFunctionFailure(name, err, args, options);
          if (options.rethrow !== false) throw err;
          return options.fallback;
        }
      };
    },

    /**
     * Menangani kegagalan eksekusi fungsi proyek.
     */
    handleFunctionFailure(fnName, error, args = [], options = {}) {
      const errorMsg = error && error.message ? error.message : String(error);
      const stack = error && error.stack ? error.stack : '';
      let argsPreview = '';
      try {
        argsPreview = Array.isArray(args) ? JSON.stringify(args).slice(0, 100) : '';
      } catch (_) {
        argsPreview = '[Non-serializable args]';
      }

      const failureRecord = {
        id: 'fnfail_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        timestamp: new Date().toISOString(),
        timeText: new Date().toLocaleTimeString(),
        functionName: fnName,
        error: errorMsg,
        stack: stack.slice(0, 300),
        args: argsPreview
      };

      if (!this.functionalFailures) this.functionalFailures = [];
      this.functionalFailures.unshift(failureRecord);
      if (this.functionalFailures.length > 50) this.functionalFailures.pop();

      // Memicu stres & rasa sakit hebat!
      this.secreteStress(35, `[Fungsi Rusak] ${fnName} gagal: ${errorMsg.slice(0, 60)}`);
      this.painReceptor.inflictPain(80, `Fungsi proyek '${fnName}' gagal beroperasi: ${errorMsg}`, 'Project Runtime Logic', {
        function: fnName,
        details: errorMsg
      });

      return failureRecord;
    },

    /**
     * Menangani kegagalan route server internal proyek atau modul proyek.
     */
    handleProjectServerFailure(routeInfo, statusOrError, maybeMessage, file = 'server') {
      let status = 500;
      let message = '';
      if (typeof statusOrError === 'number') {
        status = statusOrError;
        message = String(maybeMessage || 'Internal Server Route Failure');
      } else if (statusOrError instanceof Error) {
        status = 500;
        message = statusOrError.message || String(statusOrError);
      } else {
        status = 500;
        message = String(statusOrError || maybeMessage || 'Server Route Failure');
      }

      const issue = {
        id: 'prjsrv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        time: new Date().toLocaleTimeString(),
        route: routeInfo,
        file,
        status,
        message
      };

      if (!this.serverHealthIssues) this.serverHealthIssues = [];
      this.serverHealthIssues.unshift(issue);
      if (this.serverHealthIssues.length > 50) this.serverHealthIssues.pop();

      this.secreteStress(35, `[Server Proyek Error ${status}] ${routeInfo}: ${message.slice(0, 60)}`);
      this.painReceptor.inflictPain(
        85,
        `Fungsi/Route Server Proyek '${routeInfo}' gagal (Status ${status}): ${message}`,
        'Project Server Handler',
        { file, details: message }
      );

      return issue;
    },

    // ========================================================================
    // PEMETA SARAF KODE PROYEK & DETEKTOR DISFUNGSI (ProjectConnectome Engine)
    // ========================================================================
    fileSnapshots: new Map(),
    connectomeReport: null,

    /**
     * Mengekstrak anatomi lengkap satu berkas kode proyek:
     * - Sintaksis
     * - Fungsi yang didefinisikan & kesehatan logika di dalamnya
     * - Simbol yang diekspor (exports) & diimpor (imports)
     * - Route server proyek & pemanggilan route internal
     * - Elemen DOM & event handler UI proyek
     */
    analyzeSingleFileAnatomy(filePath, content, rootDir = '') {
      const ext = filePath.slice(filePath.lastIndexOf('.')).toLowerCase();
      const relPath = rootDir ? filePath.replace(rootDir, '').replace(/^[\\/]+/, '').replace(/\\/g, '/') : filePath;

      const anatomy = {
        file: relPath,
        ext,
        lines: content.split('\n').length,
        syntaxValid: true,
        syntaxError: null,
        functions: [],       // { name, line, params, minArgs, isAsync, bodyLines, isHollow }
        functionCalls: [],   // { name, argsCount, line }
        exports: [],         // string[]
        imports: [],         // { source, symbols, line }
        serverRoutes: [],    // { method, path, line, hasResponse }
        clientRoutes: [],    // { method, path, line }
        domIdsDefined: [],   // string[]
        domIdsReferenced: [],// { id, key, line }
        domInlineCalls: [],  // { fnName, line }
        defects: []          // { type, severity, line, reason }
      };

      // Lewati bundel vendor terkompresi/minified pihak ketiga (misal *.min.js, xterm.js, addon-fit.js)
      const baseFileName = relPath.split('/').pop().toLowerCase();
      if (
        baseFileName.endsWith('.min.js') ||
        baseFileName.endsWith('.umd.js') ||
        baseFileName.endsWith('.bundle.js') ||
        baseFileName.endsWith('.min.css') ||
        baseFileName === 'xterm.js' ||
        baseFileName === 'addon-fit.js' ||
        (content.length > 40000 && content.length / Math.max(1, anatomy.lines) > 320)
      ) {
        return anatomy;
      }

      // 1. Cek Sintaksis Dasar
      if (['.js', '.cjs', '.mjs'].includes(ext)) {
        try {
          if (typeof require !== 'undefined') {
            const vm = require('vm');
            new vm.Script(content, { filename: relPath, displayErrors: true });
          } else if (typeof Function !== 'undefined') {
            new Function(content);
          }
        } catch (err) {
          const msg = err.message || '';
          const isEsmKeyword =
            msg.includes("Unexpected token 'export'") ||
            msg.includes('Cannot use import statement') ||
            msg.includes("Cannot use 'import.meta'") ||
            ext === '.mjs';

          if (isEsmKeyword && !isBrowser && typeof require !== 'undefined') {
            try {
              const { spawnSync } = require('child_process');
              const fs = require('fs');
              if (fs.existsSync(filePath)) {
                const checkRes = spawnSync(process.execPath, ['--check', filePath], { encoding: 'utf8' });
                if (checkRes.status !== 0) {
                  const stdErr = (checkRes.stderr || checkRes.stdout || '').trim();
                  const lineMatch = stdErr.match(/:(\d+)(?::(\d+))?/);
                  anatomy.syntaxValid = false;
                  anatomy.syntaxError = stdErr.split('\n')[0] || 'ES Module Syntax Error';
                  anatomy.defects.push({
                    type: 'SYNTAX_ERROR',
                    severity: 90,
                    line: lineMatch ? parseInt(lineMatch[1], 10) : 1,
                    reason: `Kerusakan sintaksis pada ${relPath}: ${anatomy.syntaxError}`
                  });
                }
              }
            } catch (_) {}
          } else if (!isEsmKeyword) {
            const lineMatch = err.stack ? err.stack.match(/:(\d+)(?::(\d+))?/) : null;
            const errLine = lineMatch ? parseInt(lineMatch[1], 10) : 1;
            anatomy.syntaxValid = false;
            anatomy.syntaxError = msg;
            anatomy.defects.push({
              type: 'SYNTAX_ERROR',
              severity: 90,
              line: errLine,
              reason: `Kerusakan sintaksis pada ${relPath} (Baris ${errLine}): ${msg}`
            });
          }
        }
      } else if (ext === '.json') {
        try {
          JSON.parse(content);
        } catch (err) {
          anatomy.syntaxValid = false;
          anatomy.syntaxError = err.message;
          anatomy.defects.push({
            type: 'JSON_CORRUPT',
            severity: 85,
            line: 1,
            reason: `JSON rusak pada ${relPath}: ${err.message}`
          });
        }
        return anatomy;
      } else if (['.html', '.htm'].includes(ext)) {
        const openScripts = (content.match(/<script\b[^>]*>/gi) || []).length;
        const closeScripts = (content.match(/<\/script>/gi) || []).length;
        if (openScripts !== closeScripts) {
          anatomy.syntaxValid = false;
          anatomy.defects.push({
            type: 'HTML_UNCLOSED_TAG',
            severity: 85,
            line: 1,
            reason: `Tag <script> buntung / tidak seimbang di ${relPath} (${openScripts} buka vs ${closeScripts} tutup)`
          });
        }
        // Ekstrak semua id="..." di HTML proyek
        let idMatch;
        const idRegex = /\bid\s*=\s*["']([^"']+)["']/gi;
        while ((idMatch = idRegex.exec(content)) !== null) {
          anatomy.domIdsDefined.push(idMatch[1]);
        }
        // Ekstrak inline event handler onclick="namaFungsi(...)"
        let evMatch;
        const evRegex = /\bon(?:click|submit|change|input)\s*=\s*["']\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/gi;
        while ((evMatch = evRegex.exec(content)) !== null) {
          const fnName = evMatch[1];
          if (!['return', 'if', 'window', 'document', 'this', 'console', 'alert', 'confirm'].includes(fnName)) {
            anatomy.domInlineCalls.push({ fnName, line: content.slice(0, evMatch.index).split('\n').length });
          }
        }
        return anatomy;
      }

      if (!['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx', '.py'].includes(ext)) {
        return anatomy;
      }

      // Indeks baris cepat O(log N) menggunakan pencarian biner
      const lineStarts = [0];
      for (let cIdx = 0; cIdx < content.length; cIdx++) {
        if (content.charCodeAt(cIdx) === 10) lineStarts.push(cIdx + 1);
      }
      const getLineNum = (idx) => {
        let low = 0;
        let high = lineStarts.length - 1;
        while (low <= high) {
          const mid = (low + high) >>> 1;
          if (lineStarts[mid] <= idx) low = mid + 1;
          else high = mid - 1;
        }
        return low;
      };

      // 2. Ekstrak Import & Require Antar-Modul di Proyek
      // a) CommonJS: const { a, b } = require('./path') atau require('./path')
      const cjsRegex = /(?:(?:const|let|var)\s+(\{[^}]+\}|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*)?require\s*\(\s*['"]([^'"]+)['"]\s*\)/g;
      let m;
      while ((m = cjsRegex.exec(content)) !== null) {
        const lhs = m[1] ? m[1].trim() : '';
        const source = m[2].trim();
        const symbols = [];
        if (lhs.startsWith('{') && lhs.endsWith('}')) {
          lhs.slice(1, -1).split(',').forEach(s => {
            const clean = s.split(':')[0].trim();
            if (clean) symbols.push(clean);
          });
        }
        anatomy.imports.push({ source, symbols, line: getLineNum(m.index) });
      }

      // b) ES Module: import { a, b } from './path' atau import x from './path'
      const esmRegex = /\bimport\s+(?:(\{[^}]+\}|[a-zA-Z_$][a-zA-Z0-9_$]*)\s+from\s+)?['"]([^'"\n]+)['"]/g;
      while ((m = esmRegex.exec(content)) !== null) {
        const lhs = m[1] ? m[1].trim() : '';
        const source = m[2].trim();
        const symbols = [];
        if (lhs.startsWith('{') && lhs.endsWith('}')) {
          lhs.slice(1, -1).split(',').forEach(s => {
            const clean = s.split(/\s+as\s+/)[0].trim();
            if (clean) symbols.push(clean);
          });
        }
        anatomy.imports.push({ source, symbols, line: getLineNum(m.index) });
      }

      // 3. Ekstrak Exports dari Berkas Proyek
      const expObjRegex = /module\.exports\s*=\s*\{([^}]+)\}/g;
      while ((m = expObjRegex.exec(content)) !== null) {
        m[1].split(',').forEach(s => {
          const clean = s.split(':')[0].trim();
          if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(clean)) anatomy.exports.push(clean);
        });
      }
      const expPropRegex = /(?:module\.)?exports\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
      while ((m = expPropRegex.exec(content)) !== null) {
        anatomy.exports.push(m[1]);
      }
      const esmExpRegex = /export\s+(?:async\s+)?(?:function|const|let|var|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
      while ((m = esmExpRegex.exec(content)) !== null) {
        anatomy.exports.push(m[1]);
      }

      // 4. Ekstrak Definisi Fungsi & Audit Kesehatan Logika Fungsi Proyek
      const fnDeclRegex = /(?:(async)\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)\s*\{/g;
      const arrowFnRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:(async)\s+)?\(([^)]*)\)\s*=>\s*\{/g;

      const extractFnMeta = (name, paramsRaw, isAsync, openBraceIdx, matchIdx) => {
        const line = getLineNum(matchIdx);
        const params = paramsRaw.split(',').map(p => p.trim()).filter(Boolean);
        const minArgs = params.filter(p => !p.includes('=') && !p.startsWith('...')).length;

        // Cari penutup kurung kurawal body fungsi (dibatasi maks 15KB agar tetap secepat kilat)
        let depth = 1;
        let i = openBraceIdx + 1;
        const maxScan = Math.min(content.length, openBraceIdx + 15000);
        while (i < maxScan && depth > 0) {
          const ch = content.charCodeAt(i);
          if (ch === 123) depth++;      // '{'
          else if (ch === 125) depth--; // '}'
          i++;
        }
        const bodyRaw = content.slice(openBraceIdx + 1, i - 1);
        const bodyWithoutComments = bodyRaw
          .replace(/\/\*[\s\S]*?\*\//g, '')
          .replace(/\/\/[^\n]*/g, '')
          .trim();

        const bodyLines = bodyRaw.split('\n').length;
        const isHollow = depth === 0 && bodyWithoutComments.length === 0 && bodyRaw.trim().length > 0;
        const usesArguments = /\barguments\b/.test(bodyRaw);

        anatomy.functions.push({
          name,
          line,
          paramsCount: params.length,
          minArgs: usesArguments ? 0 : minArgs,
          isAsync: Boolean(isAsync),
          bodyLines,
          isHollow
        });

        // Cek 4a: Fungsi Kosong / Diamputasi (Hollow Function)
        if (isHollow && !/^(?:noop|empty|stub|mock|ignore|_|default)/i.test(name)) {
          anatomy.defects.push({
            type: 'HOLLOW_FUNCTION',
            severity: 75,
            line,
            fnName: name,
            reason: `Fungsi proyek '${name}()' di ${relPath}:${line} kosong melompong (tidak memiliki logika eksekusi)!`
          });
        }

        // Cek 4b: Penelan Error Bisu pada Fungsi Asinkron (Silent Catch Swallow)
        if (isAsync && depth === 0) {
          const catchRegex = /try\s*\{([\s\S]*?)\}\s*catch\s*\(\s*([a-zA-Z0-9_$]+)\s*\)\s*\{([\s\S]*?)\}/g;
          let cm;
          while ((cm = catchRegex.exec(bodyRaw)) !== null) {
            const tryBody = cm[1] || '';
            const errVar = cm[2] || '';
            const catchBody = (cm[3] || '').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '').trim();
            // Hanya tandai sebagai cacat jika fungsi async melakukan operasi utama (return await ...) dan catch benar-benar kosong
            if (
              catchBody.length === 0 &&
              !/^(?:_|ignore)/i.test(errVar) &&
              /\breturn\s+await\b/.test(tryBody)
            ) {
              const catchLine = line + bodyRaw.slice(0, cm.index).split('\n').length - 1;
              anatomy.defects.push({
                type: 'SILENT_ERROR_SWALLOW',
                severity: 65,
                line: catchLine,
                fnName: name,
                reason: `Fungsi async '${name}()' di ${relPath}:${catchLine} mengembalikan nilai di try namun menelan error secara bisu di catch(${errVar}) {}!`
              });
            }
          }
        }

        // Cek 4c: Dead / Unreachable Code di level utama body fungsi
        if (depth === 0 && bodyLines <= 40) {
          const rawLines = bodyWithoutComments.split('\n');
          let innerBraceDepth = 0;
          for (let sIdx = 0; sIdx < rawLines.length - 1; sIdx++) {
            const st = rawLines[sIdx].trim();
            const prevSt = sIdx > 0 ? rawLines[sIdx - 1].trim() : '';
            for (let c = 0; c < st.length; c++) {
              if (st[c] === '{') innerBraceDepth++;
              else if (st[c] === '}') innerBraceDepth--;
            }
            const nextSt = rawLines[sIdx + 1].trim();
            if (
              innerBraceDepth === 0 &&
              /^(?:return\b[^;{}]*;|throw\s+new\s+Error[^;{}]*;)$/.test(st) &&
              !/^(?:if|else|for|while)\b/.test(prevSt) &&
              nextSt &&
              !/^(?:[})]|case\b|default:|catch\b|finally\b|else\b|function\b|\/\/)/.test(nextSt)
            ) {
              anatomy.defects.push({
                type: 'UNREACHABLE_CODE',
                severity: 70,
                line,
                fnName: name,
                reason: `Fungsi '${name}()' di ${relPath}:${line} memiliki kode mati (unreachable code) setelah pernyataan return/throw: "${nextSt.slice(0, 40)}"`
              });
              break;
            }
          }
        }
      };

      while ((m = fnDeclRegex.exec(content)) !== null) {
        const openBraceIdx = m.index + m[0].length - 1;
        extractFnMeta(m[2], m[3], m[1], openBraceIdx, m.index);
      }
      while ((m = arrowFnRegex.exec(content)) !== null) {
        const openBraceIdx = m.index + m[0].length - 1;
        extractFnMeta(m[1], m[3], m[2], openBraceIdx, m.index);
      }

      // 5. Ekstrak Route Server Proyek & Audit apakah Handler Merespons
      const routeRegex = /\b(?:app|router|server|fastify)\.(get|post|put|delete|patch)\s*\(\s*['"`]([^'"`]+)['"`]\s*,\s*(?:async\s*)?\([^)]*\)\s*=>\s*\{/g;
      while ((m = routeRegex.exec(content)) !== null) {
        const method = m[1].toUpperCase();
        const routePath = m[2];
        const line = getLineNum(m.index);
        const openBraceIdx = m.index + m[0].length - 1;

        let depth = 1;
        let i = openBraceIdx + 1;
        const maxRouteScan = Math.min(content.length, openBraceIdx + 15000);
        while (i < maxRouteScan && depth > 0) {
          if (content[i] === '{') depth++;
          else if (content[i] === '}') depth--;
          i++;
        }
        const handlerBody = content.slice(openBraceIdx + 1, i - 1);
        const hasResponse = /\b(?:res|reply|response)\.(?:json|send|end|status|redirect|render|sendFile|download|write)\b|\bnext\s*\(|\breturn\b/.test(handlerBody);

        anatomy.serverRoutes.push({ method, path: routePath, line, hasResponse });
        if (!hasResponse && handlerBody.trim().length > 0) {
          anatomy.defects.push({
            type: 'DEAD_SERVER_HANDLER',
            severity: 85,
            line,
            reason: `Handler server proyek '${method} ${routePath}' di ${relPath}:${line} tidak pernah mengirim respons (res.json/send/end), membuat fungsi server macet!`
          });
        }
      }

      // Juga deteksi native HTTP server route: req.url === '/...' atau pathname === '/...'
      const nativeRouteRegex = /(?:req\.url|pathname|url\.pathname)\s*===\s*['"`](\/[^'"`]*)['"`]/g;
      while ((m = nativeRouteRegex.exec(content)) !== null) {
        anatomy.serverRoutes.push({ method: 'ANY', path: m[1], line: getLineNum(m.index), hasResponse: true });
      }

      // 6. Ekstrak Pemanggilan Route Internal dari Client Proyek (fetch('/api/...'))
      const clientFetchRegex = /\bfetch\s*\(\s*['"`](\/[a-zA-Z0-9_\-\/]+)['"`]/g;
      while ((m = clientFetchRegex.exec(content)) !== null) {
        anatomy.clientRoutes.push({ method: 'FETCH', path: m[1], line: getLineNum(m.index) });
      }

      // 7. Ekstrak Referensi Simpul DOM Proyek (els = { ... } atau getElementById)
      const elsBlockMatch = content.match(/const\s+els\s*=\s*\{([\s\S]*?)\n\s*\};/);
      if (elsBlockMatch) {
        const elsLines = elsBlockMatch[1].split('\n');
        for (const elLine of elsLines) {
          const em = elLine.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*\$\(['"]#([^'"]+)['"]\)/);
          if (em) {
            anatomy.domIdsReferenced.push({ key: em[1], id: em[2], line: getLineNum(elsBlockMatch.index) });
          }
        }
      }

      // Ekstrak ID yang dibuat secara dinamis di dalam JS (agar tidak false-positive)
      const dynIdRegex = /\bid\s*=\s*["']([^"'$]+)["']/g;
      while ((m = dynIdRegex.exec(content)) !== null) {
        anatomy.domIdsDefined.push(m[1]);
      }

      // Pastikan setiap defect memiliki properti .message maupun .reason
      for (const d of anatomy.defects) {
        if (!d.message) d.message = d.reason;
        if (!d.reason) d.reason = d.message;
      }

      return anatomy;
    },

    /**
     * Menganalisis seluruh kode proyek dan memeriksa apakah semua bagian kode
     * saling terhubung dengan harmonis atau ada fungsi/modul/route yang rusak!
     */
    analyzeProjectConnectome(customRootDir = null, options = {}) {
      if (isBrowser) {
        return this.auditComprehensive(options.silent);
      }

      const fs = require('fs');
      const path = require('path');
      const rootDir = customRootDir || this.discoveredRoot || path.resolve(__dirname, '..');
      const ignoredDirs = [
        'node_modules', '.git', '.gemini', 'dist', 'build', '.next',
        'coverage', '.cache', 'scratch', 'temp', 'tmp', 'profile',
        'vendor', '__pycache__', 'endorfin analyst'
      ];
      const watchedExts = ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.py', '.html', '.htm', '.json'];

      const fileMap = new Map();
      const allDefects = [];
      let totalFunctions = 0;
      let totalRoutes = 0;
      let totalImports = 0;
      let totalDomRefs = 0;

      const walk = (dir) => {
        let entries = [];
        try {
          entries = fs.readdirSync(dir, { withFileTypes: true });
        } catch (_) {
          return;
        }
        for (const entry of entries) {
          const name = entry.name;
          if (ignoredDirs.includes(name) || name.startsWith('.')) continue;
          const fullPath = path.join(dir, name);
          if (entry.isDirectory()) {
            walk(fullPath);
          } else if (entry.isFile()) {
            const ext = path.extname(name).toLowerCase();
            if (!watchedExts.includes(ext)) continue;
            try {
              const content = fs.readFileSync(fullPath, 'utf8');
              const anatomy = this.analyzeSingleFileAnatomy(fullPath, content, rootDir);
              fileMap.set(anatomy.file, anatomy);
              totalFunctions += anatomy.functions.length;
              totalRoutes += anatomy.serverRoutes.length;
              totalImports += anatomy.imports.length;
              totalDomRefs += anatomy.domIdsReferenced.length;
              for (const d of anatomy.defects) {
                allDefects.push({ ...d, file: anatomy.file, message: d.reason || d.message });
              }
            } catch (_) {}
          }
        }
      };

      walk(rootDir);

      // Kumpulkan seluruh definisi global proyek untuk pemeriksaan keterhubungan (Connectome Cross-Check)
      const allDefinedDomIds = new Set();
      const allDefinedFunctions = new Map(); // fnName -> { file, minArgs, paramsCount }
      const allServerRoutePaths = new Set();

      for (const [relFile, anat] of fileMap.entries()) {
        anat.domIdsDefined.forEach(id => allDefinedDomIds.add(id));
        anat.functions.forEach(fn => {
          if (!allDefinedFunctions.has(fn.name)) {
            allDefinedFunctions.set(fn.name, { ...fn, file: relFile });
          }
        });
        anat.exports.forEach(expName => {
          if (!allDefinedFunctions.has(expName)) {
            allDefinedFunctions.set(expName, { name: expName, file: relFile, minArgs: 0 });
          }
        });
        anat.serverRoutes.forEach(r => allServerRoutePaths.add(r.path));
      }

      // Cross-Check 1: Keterhubungan Antar-Modul Proyek (Import <-> File & Export)
      for (const [relFile, anat] of fileMap.entries()) {
        const fileDir = path.dirname(path.join(rootDir, relFile));
        for (const imp of anat.imports) {
          if (imp.source.startsWith('.')) {
            const targetBase = path.resolve(fileDir, imp.source);
            const candidates = [
              targetBase,
              targetBase + '.js',
              targetBase + '.mjs',
              targetBase + '.cjs',
              targetBase + '.ts',
              targetBase + '.json',
              path.join(targetBase, 'index.js'),
              path.join(targetBase, 'index.ts')
            ];
            const foundPath = candidates.find(c => fs.existsSync(c) && fs.statSync(c).isFile());
            if (!foundPath) {
              const msg = `Putus Saraf Modul: '${relFile}' (Baris ${imp.line}) mengimpor '${imp.source}', tetapi berkas modul tersebut tidak ada di proyek!`;
              allDefects.push({
                type: 'BROKEN_MODULE_SYNAPSE',
                severity: 85,
                file: relFile,
                line: imp.line,
                reason: msg,
                message: msg
              });
            } else {
              const targetRel = path.relative(rootDir, foundPath).replace(/\\/g, '/');
              const targetAnat = fileMap.get(targetRel);
              if (targetAnat && targetAnat.exports.length > 0 && imp.symbols.length > 0) {
                for (const sym of imp.symbols) {
                  const hasSym = targetAnat.exports.includes(sym) || targetAnat.functions.some(f => f.name === sym);
                  if (!hasSym) {
                    const msg = `Putus Saraf Fungsi Modul: '${relFile}' mengimpor fungsi/simbol '${sym}' dari '${targetRel}', tetapi '${sym}' tidak ditemukan/diekspor di '${targetRel}'!`;
                    allDefects.push({
                      type: 'BROKEN_EXPORT_SYNAPSE',
                      severity: 85,
                      file: relFile,
                      line: imp.line,
                      reason: msg,
                      message: msg
                    });
                  }
                }
              }
            }
          }
        }

        // Cross-Check 2: Keterhubungan DOM Receptor (JS els.#id <-> HTML id)
        if (allDefinedDomIds.size > 0 && anat.domIdsReferenced.length > 0) {
          for (const ref of anat.domIdsReferenced) {
            if (!allDefinedDomIds.has(ref.id)) {
              const msg = `Putus Saraf DOM: '${relFile}' mereferensikan elemen '#${ref.id}' (els.${ref.key}), tetapi ID tersebut tidak ditemukan di HTML proyek!`;
              allDefects.push({
                type: 'BROKEN_DOM_SYNAPSE',
                severity: 70,
                file: relFile,
                line: ref.line,
                reason: msg,
                message: msg
              });
            }
          }
        }

        // Cross-Check 3: Keterhubungan HTML Inline Event (onclick="fn()") <-> JS Function
        if (anat.domInlineCalls.length > 0 && allDefinedFunctions.size > 0) {
          for (const call of anat.domInlineCalls) {
            if (!allDefinedFunctions.has(call.fnName)) {
              const msg = `Putus Saraf Event UI: HTML '${relFile}' (Baris ${call.line}) memanggil fungsi '${call.fnName}()', tetapi fungsi tersebut tidak ada di kode proyek!`;
              allDefects.push({
                type: 'BROKEN_UI_EVENT_SYNAPSE',
                severity: 75,
                file: relFile,
                line: call.line,
                reason: msg,
                message: msg
              });
            }
          }
        }

        // Cross-Check 4: Deteksi Regresi / Amputasi Fungsi oleh AI dibandingkan Snapshot sebelumnya
        const prevSnap = this.fileSnapshots.get(relFile);
        if (prevSnap && anat.syntaxValid) {
          for (const prevFn of prevSnap.functions) {
            const stillExists = anat.functions.find(f => f.name === prevFn.name);
            if (!stillExists) {
              const msg = `Amputasi Fungsi Proyek: Fungsi '${prevFn.name}()' di '${relFile}' tiba-tiba hilang/terhapus dari kode proyek!`;
              allDefects.push({
                type: 'AI_FUNCTION_AMPUTATION',
                severity: 95,
                file: relFile,
                line: prevFn.line,
                reason: msg,
                message: msg
              });
            } else if (prevFn.bodyLines >= 8 && stillExists.bodyLines <= 2 && stillExists.isHollow) {
              const msg = `Kerusakan Isi Fungsi: Logika fungsi '${prevFn.name}()' di '${relFile}' dikosongkan dari ${prevFn.bodyLines} baris menjadi fungsi kosong!`;
              allDefects.push({
                type: 'AI_LOGIC_GUTTED',
                severity: 90,
                file: relFile,
                line: stillExists.line,
                reason: msg,
                message: msg
              });
            }
          }
        }

        // Simpan snapshot anatomi sehat saat ini
        if (anat.syntaxValid) {
          this.fileSnapshots.set(relFile, {
            functions: anat.functions,
            exports: anat.exports,
            serverRoutes: anat.serverRoutes
          });
        }
      }

      const report = {
        timestamp: new Date().toISOString(),
        rootDir,
        totalFiles: fileMap.size,
        totalFunctions,
        totalImports,
        totalRoutes,
        totalServerRoutes: totalRoutes,
        totalDomNodes: allDefinedDomIds.size,
        totalDomIds: allDefinedDomIds.size,
        totalDomRefs,
        defects: allDefects,
        healthy: allDefects.length === 0
      };

      this.connectomeReport = report;

      // Jika ditemukan kerusakan fungsi atau keterhubungan kode proyek, picu Rasa Sakit!
      if (allDefects.length > 0 && !options.silent) {
        const worst = allDefects[0];
        this.painReceptor.inflictPain(
          worst.severity || 80,
          worst.reason,
          `Project Code Connectome (${worst.type})`,
          { file: worst.file, line: worst.line, details: `${allDefects.length} masalah keterhubungan/fungsi proyek terdeteksi` }
        );
      } else if (allDefects.length === 0 && !options.silent && !options.silentSuccess) {
        this.secreteDopamine(15, `Connectome Proyek Harmonis: ${fileMap.size} berkas, ${totalFunctions} fungsi, & ${totalRoutes} route terhubung sempurna!`);
      }

      return report;
    },

    // Pilar 3: Detektor Teks Rusak, Tag Bocor & Mojibake
    inspectModelText(text, metadata = {}) {
      if (!text || typeof text !== 'string') return [];
      const model = metadata.model || 'AI';
      const anomalies = [];

      if (/<<<ZOZ_(?:FILE|EDIT|MODIFY)[^>]*$/.test(text) || (/<<<ZOZ_FILE/.test(text) && !/<<<END_ZOZ_FILE>>>/.test(text))) {
        anomalies.push({ label: 'Blok File Buntung', reason: 'Terdapat tag <<<ZOZ_FILE yang tidak tertutup sempurna.' });
      }

      if (/Ã[¢ÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/g.test(text)) {
        anomalies.push({ label: 'Encoding Rusak (Mojibake)', reason: 'Ditemukan karakter UTF-8 rusak (mojibake).' });
      }

      if (/<think>(?![\s\S]*?<\/think>)/i.test(text)) {
        anomalies.push({ label: 'Tag <think> Bocor', reason: 'Tag reasoning internal tidak tertutup.' });
      }

      if (anomalies.length > 0) {
        if (!this.textAnomalies) this.textAnomalies = [];
        for (const anom of anomalies) {
          const isDuplicate = this.textAnomalies.some(a => a.label === anom.label && a.model === model);
          if (isDuplicate) continue;
          const record = {
            id: 'txt_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
            time: new Date().toLocaleTimeString(),
            model,
            ...anom
          };
          this.textAnomalies.unshift(record);
          if (this.textAnomalies.length > 30) this.textAnomalies.pop();
          this.secreteStress(18, `[Teks Rusak Model] ${model}: ${anom.label} - ${anom.reason.slice(0, 60)}`);
          this.painReceptor.inflictPain(20, `Anomali teks (${anom.label}): ${anom.reason}`, model);
        }
      }
      return anomalies;
    },

    // Telemetri Tool Otonom (Endorfin Telemetry)
    registerToolIssue(toolData = {}) {
      const toolName = toolData.toolName || toolData.tool || 'Unknown Tool';
      const rawError = toolData.error ? (toolData.error.message || String(toolData.error)) : (toolData.reason || 'Tool execution error');
      const status = toolData.status || (rawError.match(/\b([45]\d\d)\b/)?.[1]) || 'ERR';
      const argsPreview = toolData.args ? (typeof toolData.args === 'string' ? toolData.args : JSON.stringify(toolData.args)) : '';

      const item = {
        id: 'toolerr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        time: new Date().toLocaleTimeString(),
        toolName,
        status,
        reason: rawError,
        argsPreview: argsPreview.slice(0, 80)
      };

      if (!this.toolIssues) this.toolIssues = [];
      this.toolIssues.unshift(item);
      if (this.toolIssues.length > 30) this.toolIssues.pop();

      this.secreteStress(16, `[Error Tool] ${toolName} (${status}): ${rawError.slice(0, 60)}`);
      this.painReceptor.inflictPain(20, `Tool failure: ${toolName} (${status})`, 'Tool Invoker');
      this.updateUI();
      return item;
    },

    registerHallucinationIssue(hallucinationData = {}) {
      const model = hallucinationData.model || 'Model';
      const reason = hallucinationData.reason || 'Halusinasi data eksternal terdeteksi';
      const snippet = hallucinationData.snippet || '';
      const actionTaken = hallucinationData.actionTaken || 'Sanitasi data otomatis';

      const item = {
        id: 'halu_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        time: new Date().toLocaleTimeString(),
        model,
        reason,
        snippet: snippet.slice(0, 100),
        actionTaken
      };

      if (!this.hallucinationIssues) this.hallucinationIssues = [];
      this.hallucinationIssues.unshift(item);
      if (this.hallucinationIssues.length > 30) this.hallucinationIssues.pop();

      this.secreteStress(20, `[Halusinasi Tool] ${model}: ${reason.slice(0, 70)}`);
      this.painReceptor.inflictPain(30, `Halusinasi data AI terdeteksi: ${reason}`, model);
      this.triggerAutonomousEndorphinReflex(`Halusinasi data web diredam (${reason.slice(0, 30)})`);
      this.updateUI();
      return item;
    },

    // Pilar 7: Detektor & Evaluator Nilai Guna Skill & Endorfin Otonom Agen
    evaluateSkillOutputUtility(skillName, content, metadata = {}) {
      if (!content || typeof content !== 'string') return { score: 0, grade: 'F', feedback: 'Konten kosong' };
      let score = 50; // Baseline netral
      const feedbackNotes = [];
      const skill = (skillName || 'general').toLowerCase();

      // a. Uji Nilai Guna Diagram (Mermaid / Alur Visual)
      if (skill.includes('diagram') || content.includes('```mermaid') || (content.includes('<<<ZOZ_FILE') && content.includes('mermaid'))) {
        const hasSubgraph = /subgraph\s+[\w\d_\[\]\(\)\"]+/i.test(content);
        const hasValidOrientation = /(?:flowchart\s+(?:TD|TB|LR|RL)|graph\s+(?:TD|TB|LR|RL)|sequenceDiagram|classDiagram|erDiagram|stateDiagram(?:-v2)?|gitGraph|gantt|pie)/i.test(content);
        const hasHarmoniousClass = /classDef\s+\w+/i.test(content);
        const mermaidBlock = content.match(/```mermaid([\s\S]*?)```/i) || content.match(/<<<ZOZ_FILE[^\n]*\.mermaid[\s\S]*?```/i);
        const targetDiagramText = mermaidBlock ? mermaidBlock[1] : content;
        const hasUnquotedSpecial = /[A-Za-z0-9_]+\s*\[[^\"]*[\(\)\:\/]+[^\"]*\](?!\()/.test(targetDiagramText);
        const nodeMatches = targetDiagramText.match(/[A-Za-z0-9_]+\s*(?:\[|\(|\{\{|\{\|)/g) || [];

        if (hasSubgraph) { score += 20; feedbackNotes.push('Sub-grafik tematik'); }
        if (hasValidOrientation) { score += 15; feedbackNotes.push('Orientasi alur proporsional'); }
        if (nodeMatches.length >= 4) { score += 15; feedbackNotes.push(`${nodeMatches.length} simpul aktif`); }
        if (hasHarmoniousClass) { score += 15; feedbackNotes.push('Palet warna serasi'); }
        if (hasUnquotedSpecial) { score -= 15; feedbackNotes.push('Label berkarakter tanpa kutip'); }
      }
      // b. Uji Nilai Guna Dokumen Eksekutif (PDF / DOCX)
      else if (skill.includes('doc') || skill.includes('dokumen') || metadata.docFormat || metadata.isDocCreation) {
        const words = content.trim().split(/\s+/).length;
        const hasExecutiveSummary = /ringkasan\s+eksekutif|executive\s+summary|latar\s+belakang/i.test(content);
        const hasStrategicTable = /\|[^\n]+\|\n\|[\s\-:]+\|\n\|[^\n]+\|/.test(content);
        const hasChapters = /#+\s+(?:bab|bagian|\d+\.)/i.test(content);
        const hasAiCliche = /(sebagai model ai|as an ai model|in conclusion)/i.test(content);

        if (words >= 250) { score += 20; feedbackNotes.push(`${words} kata mendalam`); }
        else if (words < 100) { score -= 20; feedbackNotes.push('Dokumen terlalu singkat'); }
        if (hasExecutiveSummary) { score += 15; feedbackNotes.push('Ada ringkasan eksekutif'); }
        if (hasStrategicTable) { score += 20; feedbackNotes.push('Tabel data komparatif'); }
        if (hasChapters) { score += 15; feedbackNotes.push('Struktur bab lengkap'); }
        if (hasAiCliche) { score -= 10; feedbackNotes.push('Klise model AI'); }
      }
      // c. Uji Nilai Guna Penelusuran Web (search_web / deep-research)
      else if (skill.includes('pencarian') || skill.includes('search') || (metadata.sources && metadata.sources.length > 0)) {
        const sources = Array.isArray(metadata.sources) ? metadata.sources : [];
        const deepSources = sources.filter(s => (s.snippet || '').length >= 70);
        const hasCurrentYear = new Date().getFullYear().toString();
        const mentionsCurrentFact = content.includes(hasCurrentYear);
        const words = content.trim().split(/\s+/).length;

        if (deepSources.length >= 2) { score += 25; feedbackNotes.push(`${deepSources.length} sumber paragraf utuh`); }
        else if (sources.length > 0) { score += 15; feedbackNotes.push(`${sources.length} sumber terverifikasi`); }
        if (mentionsCurrentFact) { score += 15; feedbackNotes.push('Fakta aktual tahun berjalan'); }
        if (sources.length >= 3) { score += 15; feedbackNotes.push('Multi-domain terverifikasi'); }
        if (words >= 120) { score += 10; feedbackNotes.push(`${words} kata sintesis padat`); }
      }
      // d. Uji Nilai Guna Website & Studio (HTML / JSX / Tailwind)
      else if ((skill.includes('web') && !skill.includes('pencarian') && !skill.includes('search')) || metadata.websiteMode || metadata.isWebCreation) {
        const hasLorem = /lorem\s+ipsum/i.test(content);
        const hasInteractivity = /(?:onclick|addeventlistener|onchange|onsubmit|usestate|useeffect|function\s+\w+\s*\()/i.test(content);
        const hasModernStyling = /(?:tailwindcss|backdrop-blur|shadow-|grid|flex|bg-gradient)/i.test(content);
        const hasResponsive = /(?:md:|lg:|sm:|@media|viewport)/i.test(content);

        if (!hasLorem) { score += 15; feedbackNotes.push('Bebas placeholder Lorem Ipsum'); } else { score -= 20; feedbackNotes.push('Placeholder Lorem Ipsum'); }
        if (hasInteractivity) { score += 25; feedbackNotes.push('Interaktivitas nyata'); }
        if (hasModernStyling) { score += 15; feedbackNotes.push('Modern Glassmorphism'); }
        if (hasResponsive) { score += 15; feedbackNotes.push('Responsif multi-layar'); }
      } else {
        const words = content.trim().split(/\s+/).length;
        if (words >= 120) score += 15;
        if (/```[\s\S]+```/.test(content)) score += 15;
        if (/\|[^\n]+\|\n\|[\s\-:]+\|\n/.test(content)) score += 10;
      }

      score = Math.max(10, Math.min(100, Math.round(score)));
      let grade = 'C';
      if (score >= 85) grade = 'A+';
      else if (score >= 75) grade = 'A';
      else if (score >= 65) grade = 'B';
      else if (score >= 50) grade = 'C';
      else grade = 'D';

      const auditItem = {
        id: 'sk_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        time: new Date().toLocaleTimeString(),
        skill: skillName || 'General',
        model: metadata.model || 'AI Model',
        score,
        grade,
        feedback: feedbackNotes.join(' | ') || 'Format standar',
        snippet: content.slice(0, 100)
      };

      if (!this.agentSkillAudits) this.agentSkillAudits = [];
      this.agentSkillAudits.unshift(auditItem);
      if (this.agentSkillAudits.length > 30) this.agentSkillAudits.pop();

      // Sekresi Endorfin berbobot nyata
      if (score >= 80) {
        this.secreteEndorphin(25, `[Nilai Guna Prima ${grade}] ${auditItem.skill}: ${auditItem.feedback}`);
      } else if (score >= 65) {
        this.secreteEndorphin(12, `[Nilai Guna Baik ${grade}] ${auditItem.skill}: ${auditItem.feedback}`);
      } else {
        this.secreteStress(12, `[Nilai Guna Rendah ${grade}] ${auditItem.skill}: ${auditItem.feedback}`);
        this.painReceptor.inflictPain(20, `Output skill berkualitas buruk (${grade} - Skor ${score}): ${auditItem.feedback}`, auditItem.model);
      }

      this.updateUI();
      return auditItem;
    },

    // Pilar 4: Detektor Dimensi Layar & Viewport Overflow
    auditViewportAndLayout(silent = false) {
      const issues = [];
      if (!isBrowser) return issues;

      const docEl = document.documentElement;
      const body = document.body;
      const winW = window.innerWidth || 1024;
      const scrollW = Math.max(docEl ? docEl.scrollWidth : 0, body ? body.scrollWidth : 0);

      if (scrollW > winW + 4) {
        issues.push({
          id: 'vp_overflow_h',
          type: 'viewport_overflow',
          severity: 'high',
          selector: 'document.body',
          reason: `Layar mengalami overflow horizontal (${scrollW}px > ${winW}px).`,
          fixable: true
        });
      }

      this.viewportIssues = issues;
      if (issues.length > 0 && !silent) {
        this.secreteStress(issues.length * 15, `Terdeteksi ${issues.length} gangguan layout/overflow!`);
        this.painReceptor.inflictPain(issues.length * 15, 'Layout overflow horizontal terdeteksi', 'CSS Layout Engine');
      }
      this.updateUI();
      return issues;
    },

    // Pilar 5: Detektor Posisi Tombol & Halangan Aksesibilitas
    auditButtonPlacementAndObstruction(silent = false) {
      const issues = [];
      if (!isBrowser) return issues;

      const interactiveButtons = document.querySelectorAll('button:not([disabled]), [role="button"]:not([aria-disabled="true"])');
      interactiveButtons.forEach(btn => {
        if (!btn.offsetParent && btn.style.display === 'none') return;
        const rect = btn.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        if (rect.right < 0 || rect.bottom < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const topEl = document.elementFromPoint(cx, cy);

        if (topEl && topEl !== btn && !btn.contains(topEl)) {
          const isAllowedBackdrop = topEl.classList?.contains('modal-backdrop') || topEl.id === 'imageLightboxModal';
          if (!isAllowedBackdrop && !topEl.contains(btn)) {
            issues.push({
              id: 'btn_obstruct_' + (btn.id || Math.random().toString(36).substr(2, 4)),
              type: 'button_obstruction',
              severity: 'high',
              selector: btn.id ? `#${btn.id}` : (btn.className ? `.${btn.className.split(' ')[0]}` : 'button'),
              blocker: topEl.id ? `#${topEl.id}` : topEl.tagName.toLowerCase(),
              reason: `Tombol terhalang oleh elemen <${topEl.tagName.toLowerCase()}>`,
              fixable: true
            });
          }
        }
      });

      this.buttonIssues = issues;
      if (issues.length > 0 && !silent) {
        this.secreteStress(issues.length * 12, `Terdeteksi ${issues.length} tombol terhalang!`);
      }
      this.updateUI();
      return issues;
    },

    // Pilar 6: Detektor Gateway AI, State Zombie & Tunnel WAN
    auditGatewayAndTunnel(silent = false) {
      const issues = [];
      if (isBrowser && typeof navigator !== 'undefined' && !navigator.onLine) {
        issues.push({
          id: 'gw_offline',
          type: 'browser_offline',
          severity: 'high',
          selector: 'navigator.onLine',
          reason: 'Perangkat sedang luring (Offline).',
          fixable: false
        });
      }

      if (isBrowser) {
        const zombieModals = document.querySelectorAll('.modal-backdrop.show');
        zombieModals.forEach(m => {
          if (m.style && m.style.display === 'none') {
            issues.push({
              id: 'gw_zombie_modal_' + (m.id || 'modal'),
              type: 'zombie_hidden_modal',
              severity: 'high',
              selector: `#${m.id || 'modal-backdrop'}`,
              reason: `Modal #${m.id || 'modal'} aktif (.show) tapi tertahan inline display:none.`,
              fixable: true
            });
          }
        });
      }

      this.gatewayIssues = issues;
      if (issues.length > 0 && !silent) {
        this.secreteStress(issues.length * 10, `Terdeteksi ${issues.length} anomali Gateway/State!`);
      }
      this.updateUI();
      return issues;
    },

    // Audit Komprehensif (7 Pilar Kode & Endorfin)
    auditComprehensive(silent = false, customElsMap = null) {
      this.lastAuditTimestamp = new Date().toLocaleTimeString();
      const conn = this.auditConnectome(true, customElsMap);
      const vp = this.auditViewportAndLayout(true);
      const btns = this.auditButtonPlacementAndObstruction(true);
      const gw = this.auditGatewayAndTunnel(true);
      const lowUtilityCount = (this.agentSkillAudits || []).filter(a => a.score < 60).length;

      const totalIssues = (conn.issues?.length || 0) +
        (vp?.length || 0) +
        (btns?.length || 0) +
        (gw?.length || 0) +
        (this.modelErrors?.length || 0) +
        (this.textAnomalies?.length || 0) +
        (this.toolIssues?.length || 0) +
        (this.hallucinationIssues?.length || 0) +
        lowUtilityCount;

      if (totalIssues === 0 && !silent) {
        this.secreteDopamine(20, 'Audit komprehensif selesai: 7 Pilar Kode & Jalur Endorfin sehat sempurna (0 bug, 0 tool error, 0 anomali skill, Gateway stabil)!');
      }
      this.updateUI();
      return {
        timestamp: this.lastAuditTimestamp,
        connectome: conn,
        viewport: vp,
        buttons: btns,
        gateway: gw,
        modelErrors: this.modelErrors,
        textAnomalies: this.textAnomalies,
        toolIssues: this.toolIssues,
        hallucinationIssues: this.hallucinationIssues,
        lowUtilityCount,
        totalIssues,
        painLevel: this.painReceptor.level,
        painState: this.painReceptor.state
      };
    },

    // Refleks Imun Otonom (Autonomous Endorphin Self-Healing Reflex)
    triggerAutonomousEndorphinReflex(triggerReason = 'Deteksi Stres') {
      const now = Date.now();
      if (now - (this._lastAutoReflexTime || 0) < 8000) return 0;
      this._lastAutoReflexTime = now;
      return this.autoFixLayoutAndButtons({ silent: true, isAutoReflex: true, reason: triggerReason });
    },

    autoFixLayoutAndButtons(options = {}) {
      let healedCount = 0;
      try {
        if (isBrowser) {
          if (document.documentElement) document.documentElement.style.overflowX = 'hidden';
          if (document.body) document.body.style.overflowX = 'hidden';

          if (this.toolIssues && this.toolIssues.length > 0) {
            healedCount += this.toolIssues.length;
            this.toolIssues = [];
          }
          if (this.hallucinationIssues && this.hallucinationIssues.length > 0) {
            healedCount += this.hallucinationIssues.length;
            this.hallucinationIssues = [];
          }

          clearAutonomousToolCache();

          if (this.hormones) {
            if (this.hormones.cortisol > 0) {
              this.hormones.cortisol = Math.max(0, Math.round((this.hormones.cortisol - 45) * 10) / 10);
            }
            this.hormones.endorphin = Math.min(100, Math.round((this.hormones.endorphin + 20) * 10) / 10);
            this.hormones.dopamine = Math.min(100, Math.round((this.hormones.dopamine + 20) * 10) / 10);
          }
        }

        this.painReceptor.soothe(35);
        this.auditComprehensive(true);
        const logMsg = options && options.isAutoReflex
          ? `[Auto-Endorfin v3.5] Refleks pemulihan otonom (${options.reason || 'Homeostasis'}): ${healedCount} anomali dinormalkan.`
          : `Auto-Heal berhasil: Memperbaiki ${healedCount} anomali!`;
        this.log('endorphin', 25, logMsg);
        this.updateUI();
      } catch (e) {
        console.warn('Auto-heal error:', e);
      }
      return healedCount;
    },

    purgeStress() {
      this.autoFixLayoutAndButtons({ silent: true });
      this.hormones.cortisol = 0;
      this.hormones.dopamine = 100;
      this.hormones.serotonin = 100;
      this.hormones.adrenaline = 0;
      this.hormones.endorphin = 100;
      this.isolatedNodes = [];
      this.modelErrors = [];
      this.textAnomalies = [];
      this.toolIssues = [];
      this.hallucinationIssues = [];
      this.viewportIssues = [];
      this.buttonIssues = [];
      this.gatewayIssues = [];

      clearAutonomousToolCache();
      this.painReceptor.level = 0;
      this.painReceptor.state = 'HOMEOTERMIK_TENANG';

      this.log('endorphin', 50, 'Suntikan Endorfin v3.5: Imunitas 100%, Stres 0%, Rasa Sakit 0%, Layout & Gateway dipulihkan penuh');
      this.updateUI();

      if (typeof root.TerminalEndorphin !== 'undefined' && typeof root.TerminalEndorphin.healAll === 'function') {
        try { root.TerminalEndorphin.healAll({ silent: true }); } catch (_) {}
      }
    },

    log(type, amount, reason) {
      this.history.unshift({
        time: new Date().toLocaleTimeString(),
        type,
        amount: Math.round(amount),
        reason
      });
      if (this.history.length > 50) this.history.pop();
    },

    updateUI() {
      if (!isBrowser) return;
      const c = Math.round(this.hormones.cortisol);
      const d = Math.round(this.hormones.dopamine);
      const e = Math.round(this.hormones.endorphin ?? 100);

      const dVal = document.getElementById('endocrineDopamineVal');
      const cVal = document.getElementById('endocrineCortisolVal');
      const eVal = document.getElementById('endocrineEndorphinVal');

      if (dVal) dVal.innerText = `${d}%`;
      if (cVal) cVal.innerText = `${c}%`;
      if (eVal) eVal.innerText = `${e}% (Kebal)`;
    },

    // ========================================================================
    // ANALISIS OTONOM TANPA SETUP MANUAL (Autonomous Self-Monitoring Engine)
    // ========================================================================

    /**
     * Mendeteksi otomatis direktori induk (Root) proyek tempat Endorfin dipasang
     * tanpa perlu konfigurasi manual.
     */
    autoDiscoverProjectRoot() {
      if (isBrowser) return;
      if (this._envDiscovered) return;
      this._envDiscovered = true;

      try {
        const fs = require('fs');
        const path = require('path');
        let cur = __dirname;
        let rootFound = cur;

        for (let i = 0; i < 4; i++) {
          const parent = path.dirname(cur);
          if (
            fs.existsSync(path.join(cur, 'package.json')) ||
            fs.existsSync(path.join(cur, '.git')) ||
            fs.existsSync(path.join(cur, 'index.html'))
          ) {
            rootFound = cur;
            break;
          }
          if (parent === cur) break;
          cur = parent;
        }

        this.discoveredRoot = rootFound;
      } catch (_) {}
    },

    /**
     * Memasang interceptor otomatis pada console.error & console.warn.
     * Setiap kali ada error fungsi proyek yang dicetak ke konsol saat runtime,
     * Endocrine langsung mendeteksinya dan memicu rasa sakit secara otomatis!
     */
    installGlobalConsoleInterceptors() {
      if (this._consoleIntercepted) return;
      this._consoleIntercepted = true;

      const self = this;
      const targetConsole = typeof console !== 'undefined' ? console : null;
      if (!targetConsole || !targetConsole.error) return;

      const origError = targetConsole.error;
      const origWarn = targetConsole.warn;

      targetConsole.error = function (...args) {
        origError.apply(targetConsole, args);
        try {
          const msg = args.map(a => (a instanceof Error ? a.message + '\n' + a.stack : String(a))).join(' ');
          if (msg.includes('BIO-ENDOCRINE DIGITAL PAIN REFLEX') || msg.includes('⚡ [BIO-ENDOCRINE')) return;

          const isProblematic =
            msg.includes('Error:') ||
            msg.includes('Exception:') ||
            msg.includes('TypeError:') ||
            msg.includes('ReferenceError:') ||
            msg.includes('SyntaxError:') ||
            msg.includes('RangeError:') ||
            msg.includes('Uncaught ') ||
            msg.includes('Unhandled ');

          if (isProblematic) {
            self.handleFunctionFailure('console.error (Fungsi Proyek)', new Error(msg.slice(0, 160)), args, { rethrow: false });
          }
        } catch (_) {}
      };

      targetConsole.warn = function (...args) {
        origWarn.apply(targetConsole, args);
        try {
          const msg = args.join(' ');
          if (msg.includes('deprecated') || msg.includes('Warning:')) {
            self.secreteStress(8, `[Peringatan Kode Proyek] ${msg.slice(0, 60)}`);
          }
        } catch (_) {}
      };
    },

    /**
     * Memasang hook saraf otomatis pada runtime kode proyek:
     * 1. Meng-hook `Module.prototype.require` khusus untuk file lokal proyek (`./` atau `../`)
     *    sehingga semua fungsi yang di-export oleh modul proyek otomatis dibungkus saraf perasa (`guard`)
     *    tanpa perlu modifikasi kode proyek!
     * 2. Meng-hook `http.createServer` internal milik proyek agar setiap handler route proyek
     *    yang gagal (HTTP 500 / exception) langsung memicu rasa sakit.
     */
    installProjectRuntimeHooks() {
      if (isBrowser) return;
      if (this._projectHooksInstalled) return;
      this._projectHooksInstalled = true;

      const self = this;
      try {
        const Module = require('module');
        const path = require('path');
        const origRequire = Module.prototype.require;

        Module.prototype.require = function (id) {
          const exported = origRequire.apply(this, arguments);
          try {
            // Hanya bungkus modul lokal milik kode proyek sendiri (diawali './' atau '../')
            if (typeof id === 'string' && (id.startsWith('./') || id.startsWith('../')) && !id.includes('endorfin')) {
              const modName = path.basename(id, path.extname(id));
              if (typeof exported === 'function' && !exported._bioGuarded && !exported.prototype?.render) {
                const guarded = self.guard(exported, `${modName}()`, { rethrow: true });
                Object.assign(guarded, exported);
                guarded.prototype = exported.prototype;
                guarded._bioGuarded = true;
                return guarded;
              } else if (exported && typeof exported === 'object' && !Array.isArray(exported) && !exported._bioGuardedObj) {
                Object.defineProperty(exported, '_bioGuardedObj', { value: true, enumerable: false });
                for (const key of Object.keys(exported)) {
                  const val = exported[key];
                  if (typeof val === 'function' && !val._bioGuarded && /^[a-z]/.test(key)) {
                    const guardedFn = self.guard(val.bind(exported), `${modName}.${key}()`, { rethrow: true });
                    guardedFn._bioGuarded = true;
                    try { exported[key] = guardedFn; } catch (_) {}
                  }
                }
              }
            }
          } catch (_) {}
          return exported;
        };

        // Hook http.createServer milik proyek sendiri untuk mendeteksi route/handler server proyek yang gagal
        const http = require('http');
        const origCreateServer = http.createServer;
        http.createServer = function (...args) {
          const listenerIdx = args.findIndex(a => typeof a === 'function');
          if (listenerIdx !== -1) {
            const origListener = args[listenerIdx];
            args[listenerIdx] = function (req, res) {
              const routePath = `${req.method || 'GET'} ${req.url || '/'}`;
              const origEnd = res.end;
              res.end = function (...endArgs) {
                if (res.statusCode >= 500) {
                  self.handleProjectServerFailure(routePath, `Server route proyek mengembalikan status HTTP ${res.statusCode}`);
                }
                return origEnd.apply(res, endArgs);
              };
              try {
                const maybePromise = origListener.apply(this, arguments);
                if (maybePromise && typeof maybePromise.catch === 'function') {
                  maybePromise.catch(err => {
                    self.handleProjectServerFailure(routePath, err);
                  });
                }
                return maybePromise;
              } catch (err) {
                self.handleProjectServerFailure(routePath, err);
                throw err;
              }
            };
          }
          return origCreateServer.apply(http, args);
        };
      } catch (_) {}
    },

    /**
     * Memulai pemantau berkas & konektom kode proyek secara otomatis di latar belakang.
     * Setiap kali ada file proyek yang diubah (misalnya oleh AI), langsung dianalisis
     * anatomi fungsinya dan hubungan antar-file (Connectome)-nya!
     */
    startAutonomousSentinel() {
      if (isBrowser) return;
      if (this._sentinelStarted) return;
      this._sentinelStarted = true;

      const self = this;
      try {
        const fs = require('fs');
        const path = require('path');
        const rootDir = this.discoveredRoot || path.resolve(__dirname, '..');

        // Pemindaian awal (Baseline Connectome Snapshot) secara hening agar mengenali seluruh fungsi proyek
        setTimeout(() => {
          try {
            self.analyzeProjectConnectome(rootDir, { silent: true, silentSuccess: true });
          } catch (_) {}
        }, 50).unref?.();

        const watchedExts = ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx', '.json', '.html', '.css', '.py', '.yaml', '.yml'];
        const ignored = ['node_modules', '.git', '.gemini', 'dist', 'build', 'coverage', 'scratch', 'temp', 'endorfin analyst', 'trauma-history.json'];
        const fileDebounce = new Map();

        const watcher = fs.watch(rootDir, { recursive: true }, (evt, filename) => {
          if (!filename) return;
          const ext = path.extname(filename).toLowerCase();
          if (!watchedExts.includes(ext)) return;
          for (const ign of ignored) {
            if (filename.includes(ign)) return;
          }

          const fullPath = path.join(rootDir, filename);
          if (fileDebounce.has(fullPath)) clearTimeout(fileDebounce.get(fullPath));

          const timer = setTimeout(() => {
            fileDebounce.delete(fullPath);
            if (!fs.existsSync(fullPath)) return;
            try {
              const code = fs.readFileSync(fullPath, 'utf8');
              const relPath = path.relative(rootDir, fullPath).replace(/\\/g, '/');
              // 1. Audit sintaks & anatomi fungsi dalam berkas ini
              self.painReceptor.auditCodeIntegrity(code, ext.replace('.', ''), relPath);
              // 2. Audit ulang jalinan antar-berkas (Connectome) seluruh proyek
              self.analyzeProjectConnectome(rootDir, { silentSuccess: true });
            } catch (_) {}
          }, 200);
          if (timer && typeof timer.unref === 'function') timer.unref();
          fileDebounce.set(fullPath, timer);
        });
        if (watcher && typeof watcher.unref === 'function') watcher.unref();
      } catch (_) {}
    },

    /**
     * Menjalankan engine otonom penuh saat dijalankan langsung lewat CLI:
     *   node "endorfin analyst/endorfin.js" atau node "endorfin analyst"
     */
    async startAutonomousEngine() {
      const rootDir = this.discoveredRoot || process.cwd();
      console.log('\n================================================================');
      console.log('       🧠 BIO-ENDOCRINE PROJECT CODE CONNECTOME ENGINE 🧠       ');
      console.log('================================================================');
      console.log('► Lingkup Sensor   : SELURUH KODE PROYEK, FUNGSI, & RELASI ANTAR-FILE');
      console.log(`► Induk Proyek     : ${rootDir}`);
      console.log('► Saraf Sinapsis   : Modul (import/require), Fungsi, Route Server, & DOM');
      console.log('► Intersepsi Fungsi: AKTIF (Auto-Guard Modul Proyek & Handler Server)');
      console.log('► Reseptor Rasa    : AKTIF (NeuroPain & Homeostasis Biomimetik)');
      console.log('================================================================\n');

      console.log('[OTONOM] Memindai anatomi fungsi & jalinan antar-kode proyek (Connectome)...');
      const report = this.analyzeProjectConnectome(rootDir, { silentSuccess: false });

      if (report) {
        console.log(`  ├─ Berkas Proyek Terpindai : ${report.totalFiles} berkas`);
        console.log(`  ├─ Fungsi Proyek Terpetakan: ${report.totalFunctions} fungsi`);
        console.log(`  ├─ Relasi Import/Require   : ${report.totalImports} tautan antar-modul`);
        console.log(`  ├─ Endpoint/Handler Server : ${report.totalServerRoutes} route internal`);
        console.log(`  ├─ Elemen & Ikatan UI/DOM  : ${report.totalDomIds} ID DOM <-> ${report.totalDomRefs} referensi JS`);
        console.log(`  └─ Cacat Fungsi/Relasi     : ${report.defects.length === 0 ? '\x1b[32m0 (SEHAT & SALING TERHUBUNG)\x1b[0m' : `\x1b[31m${report.defects.length} KERUSAKAN TERDETEKSI!\x1b[0m`}\n`);
      }

      console.log('[OTONOM] Memulai pemantau integritas kode & relasi fungsi proyek secara real-time...');
      this.startAutonomousSentinel();
      console.log('\x1b[32m✔ Sistem Endorfin kini aktif merasakan setiap perubahan & fungsi di kode proyek Anda!\x1b[0m');
      console.log('\x1b[33mTekan Ctrl+C untuk menghentikan.\x1b[0m\n');

      // Jaga proses tetap hidup saat dijalankan langsung sebagai CLI daemon
      setInterval(() => {}, 60000);
    }
  };

  // ==========================================================================
  // CODE ENDORFIN: TERMINAL SELF-HEALING & NEURAL DIAGNOSTIC ENGINE
  // ==========================================================================
  const TerminalEndorphin = {
    diagnose(paneNum = 1, terminalState = null) {
      const pane = terminalState || (root.TerminalManager && root.TerminalManager.getPaneState ? root.TerminalManager.getPaneState(paneNum) : null);
      const term = pane?.term;
      const issues = [];
      const fixes = [];

      const metrics = {
        paneNum,
        cols: term?.cols || pane?.cols || 80,
        rows: term?.rows || pane?.rows || 24,
        ptyCols: pane?.ptyCols || term?.cols || 80,
        ptyRows: pane?.ptyRows || term?.rows || 24,
        isMobile: Boolean(pane?.isMobile || (typeof window !== 'undefined' && window.innerWidth < 768)),
        userScrolledUp: Boolean(pane?._userScrolledUp),
        isTouchActive: Boolean(pane?._isTouchActive),
        hasTouchInertia: Boolean(pane?._touchInertiaRaf),
        isMouseActive: Boolean(pane?.isMouseActive)
      };

      if (!pane && !term) {
        return {
          score: 0,
          status: 'offline',
          metrics,
          issues: ['Terminal pane belum diinisialisasi atau sesi belum tersambung.'],
          fixes: ['Buka terminal dan sambungkan sesi.']
        };
      }

      // 1. Audit Dimensi PTY & ConPTY wrap trap (cols < 45)
      const minSafeCols = metrics.isMobile ? 48 : 80;
      if (metrics.cols < 45 || metrics.ptyCols < 45) {
        issues.push(`Dimensi PTY Terjebak Terlalu Sempit (${metrics.cols}x${metrics.rows})! Menyebabkan baris wrapping tangga.`);
        fixes.push(`Normalkan lebar kolom ke minimum aman >= ${minSafeCols} cols.`);
      }

      // 2. Audit Scroll Lock / Stuck Trap
      if (metrics.userScrolledUp && !metrics.isMouseActive) {
        issues.push('Scroll Trap: Flag _userScrolledUp terkunci padahal posisi kursor di dasar layar.');
        fixes.push('Reset flag _userScrolledUp dan posisikan viewport ke dasar.');
      }

      // 3. Audit IME Textarea Buffer
      if (term?.textarea?.value && term.textarea.value.length > 4) {
        issues.push(`IME Textarea Buffer Menumpuk (${term.textarea.value.length} karakter): Berpotensi menduplikasi ketikan.`);
        fixes.push('Bersihkan textarea dan flush komposisi teks virtual.');
      }

      const score = Math.max(0, 100 - (issues.length * 20));
      const status = score >= 90 ? 'healthy' : (score >= 60 ? 'warning' : 'critical');

      return { score, status, metrics, issues, fixes };
    },

    heal(paneNum = 1, options = {}) {
      const pane = root.TerminalManager && root.TerminalManager.getPaneState ? root.TerminalManager.getPaneState(paneNum) : null;
      const term = pane?.term;
      const paneName = `Panel ${paneNum}`;

      if (!pane && !term) return null;

      const isMobile = Boolean(typeof window !== 'undefined' && window.innerWidth < 768);
      const safeCols = isMobile ? 48 : 80;
      const safeRows = isMobile ? 18 : 24;

      if (pane) {
        pane.ptyCols = safeCols;
        pane.ptyRows = safeRows;
        pane._userScrolledUp = false;
        pane._isTouchActive = false;
      }

      if (term) {
        try {
          if (typeof term.resize === 'function') term.resize(safeCols, safeRows);
          if (typeof term.scrollToBottom === 'function') term.scrollToBottom();
          if (term.textarea) term.textarea.value = '';
        } catch (_) {}
      }

      BioEndocrine.log('endorphin', 30, `Suntikan Endorfin Terminal [${paneName}]: Dimensi PTY dinormalkan ke ${safeCols}x${safeRows}, scroll & IME dipulihkan.`);
      BioEndocrine.hormones.cortisol = Math.max(0, BioEndocrine.hormones.cortisol - 25);
      BioEndocrine.hormones.dopamine = Math.min(100, BioEndocrine.hormones.dopamine + 30);
      BioEndocrine.hormones.endorphin = Math.min(100, (BioEndocrine.hormones.endorphin ?? 100) + 20);
      BioEndocrine.updateUI();

      return { success: true, safeCols, safeRows };
    },

    healAll(options = {}) {
      this.heal(1, options);
      this.heal(2, options);
    }
  };

  // ==========================================================================
  // JALUR 2: CHAT-ENDOCRINE (Sistem Saraf Emosi Buatan AI)
  // ==========================================================================
  const ChatEndocrine = {
    enabled: true,
    currentVibe: 'Fokus & Tajam',
    hormones: {
      oxytocin: 80,
      dopamine: 90,
      serotonin: 85
    },
    emotions: {
      senang: 80,
      bahagia: 75,
      sedih: 0,
      marah: 0
    },

    calculateSerotonin() {
      this.hormones.serotonin = Math.round(
        (this.hormones.dopamine * 0.45) +
        (this.hormones.oxytocin * 0.35) +
        (this.emotions.bahagia * 0.20)
      );
    },

    log(type, amount, reason) {
      this.calculateSerotonin();
    }
  };

  // ==========================================================================
  // EXPORT INTERFACE (Universal UMD / CommonJS / Browser)
  // ==========================================================================
  const EndorfinAnalyst = {
    BioEndocrine,
    TerminalEndorphin,
    ChatEndocrine,
    NeuroPain,
    AUTONOMOUS_TOOL_CACHE,
    clearAutonomousToolCache,
    version: '3.5.0-pain-guard'
  };

  // Browser Window Attachments
  if (isBrowser) {
    window.EndorfinAnalyst = EndorfinAnalyst;
    window.BioEndocrine = BioEndocrine;
    window.CodeEndocrine = BioEndocrine;
    window.EndocrineMonitor = BioEndocrine;
    window.TerminalEndorphin = TerminalEndorphin;
    window.ChatEndocrine = ChatEndocrine;
    window.NeuroPain = NeuroPain;
    // Auto inisialisasi jika DOM telah siap
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      BioEndocrine.init();
    } else {
      window.addEventListener('DOMContentLoaded', () => BioEndocrine.init());
    }
  }

  // Node.js CommonJS Module Export & Auto-Init
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = EndorfinAnalyst;
    BioEndocrine.init();

    // Jika dieksekusi langsung: node "endorfin analyst/endorfin.js"
    if (typeof require !== 'undefined' && require.main === module) {
      BioEndocrine.startAutonomousEngine();
    }
  }

})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
