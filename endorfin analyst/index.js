/**
 * ============================================================================
 * ENDORFIN ANALYST - AUTONOMOUS ZERO-CONFIG ENTRYPOINT
 * ============================================================================
 * Jalankan langsung:
 *   node "endorfin analyst"
 * Atau impor di kode Anda:
 *   require('./endorfin analyst')
 * ============================================================================
 */

const EndorfinAnalyst = require('./endorfin.js');

if (require.main === module) {
  EndorfinAnalyst.BioEndocrine.startAutonomousEngine();
}

module.exports = EndorfinAnalyst;
