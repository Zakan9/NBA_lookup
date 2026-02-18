"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertFeetAndInchesToCm = convertFeetAndInchesToCm;
function convertFeetAndInchesToCm(height) {
    const parts = height.split('-');
    if (!Number.isNaN(parts[0]) && !Number.isNaN(parts[1])) {
        return Math.round(parseInt(parts[0]) * 30.48 + parseInt(parts[1]) * 2.54);
    }
    return null;
}
//# sourceMappingURL=convert-feet-and-inches-to-cm.utility.js.map