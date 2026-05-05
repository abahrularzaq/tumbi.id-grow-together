/**
 * Tumbi waitlist — Google Apps Script Web App
 *
 * Setup:
 * 1. Buat Google Sheet baru, salin ID dari URL: .../d/SPREADSHEET_ID/edit
 * 2. Ganti SPREADSHEET_ID di bawah dengan ID itu, atau paste URL lengkap .../spreadsheets/d/ID/edit
 *    (bukan link publish /pubhtml / 2PACX — itu tidak bisa dipakai openById).
 * 3. Deploy > New deployment > Web app:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Jalankan sekali dari editor: menu Run > authorize (agar MailApp / Spreadsheet OK).
 *
 * Frontend mengirim POST body JSON (Content-Type: text/plain) sesuai FinalCTA.tsx.
 */

const SHEET_NAME = "submissions";
const ADMIN_EMAIL = "abahrularzaq@gmail.com";

/** Wajib isi jika script tidak “bound” ke file Spreadsheet yang sama. */
const SPREADSHEET_ID = "1i78Aq3JRYg7s5UIcYXEGQaq1QKkMPwIsttCLeS4iblE";

function doPost(e) {
  try {
    const payload = parsePayload_(e);

    if (!payload.email) {
      return jsonResponse_({ ok: false, error: "missing_email" });
    }

    var hasMainFormFields = payload.plan && payload.childAge;
    var hasFeatureVoteOnly = payload.featureVote && !payload.plan && !payload.childAge;

    if (payload.website && String(payload.website).trim() !== "") {
      return jsonResponse_({ ok: false, error: "spam_detected" });
    }

    const sheet = getOrCreateSheet_();
    const nowIso = new Date().toISOString();

    const existingRow = findRowByEmail_(sheet, payload.email);

    if (hasMainFormFields) {
      const record = [
        nowIso,
        String(payload.email || "").trim(),
        String(payload.plan || "").trim(),
        String(payload.childAge || "").trim(),
        String(payload.biggestConcern || "").trim(),
        String(payload.featureVote || "").trim(),
        String(payload.timestamp || "").trim(),
        String(payload.source || "final_cta").trim(),
        String(payload.userAgent || "").trim(),
      ];

      if (existingRow > 0) {
        sheet.getRange(existingRow, 1, 1, record.length).setValues([record]);
      } else {
        sheet.appendRow(record);
      }
    } else if (hasFeatureVoteOnly) {
      if (existingRow > 0) {
        // Kolom featureVote adalah kolom ke-6 (F) sesuai header.
        sheet.getRange(existingRow, 6).setValue(String(payload.featureVote || "").trim());
      } else {
        // Jika entri email belum ada (harusnya jarang), buat baris minimal.
        const record = [
          nowIso,
          String(payload.email || "").trim(),
          "",
          "",
          "",
          String(payload.featureVote || "").trim(),
          String(payload.timestamp || "").trim(),
          String(payload.source || "feature_vote").trim(),
          String(payload.userAgent || "").trim(),
        ];
        sheet.appendRow(record);
      }
    } else {
      return jsonResponse_({ ok: false, error: "missing_required_fields" });
    }

    try {
      sendNotificationEmail_(payload, existingRow > 0);
    } catch (mailErr) {
      // Jangan gagalkan penyimpanan baris jika email saja yang error (kuota / belum authorize).
    }

    return jsonResponse_({
      ok: true,
      deduped: existingRow > 0,
    });
  } catch (err) {
    return jsonResponse_({
      ok: false,
      error: "server_error",
      message: String(err),
    });
  }
}

function doGet() {
  return jsonResponse_({ ok: true, service: "tumbi-waitlist-gas" });
}

function parsePayload_(e) {
  if (!e || !e.postData || !e.postData.contents) return {};
  try {
    return JSON.parse(e.postData.contents);
  } catch (_) {
    return {};
  }
}

/**
 * Terima ID saja (contoh: 1abc...xyz) atau URL edit lengkap .../spreadsheets/d/ID/edit
 */
function normalizeSpreadsheetId_(raw) {
  if (!raw || typeof raw !== "string") {
    throw new Error("SPREADSHEET_ID kosong.");
  }
  var s = raw.trim();
  if (s.indexOf("2PACX-1v") !== -1 || s.indexOf("/pub") !== -1) {
    throw new Error(
      "Link publish / 2PACX tidak valid untuk openById. Buka spreadsheet asli, salin URL yang berbentuk .../spreadsheets/d/ID_SINGKAT/edit"
    );
  }
  var match = s.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    return match[1];
  }
  if (/^[a-zA-Z0-9-_]+$/.test(s)) {
    return s;
  }
  throw new Error(
    "SPREADSHEET_ID tidak dikenali. Pakai hanya ID (huruf/angka/garis) atau URL edit Google Sheet."
  );
}

function getSpreadsheet_() {
  var placeholder = "GANTI_DENGAN_SPREADSHEET_ID_DARI_URL";
  if (SPREADSHEET_ID && SPREADSHEET_ID !== placeholder) {
    return SpreadsheetApp.openById(normalizeSpreadsheetId_(SPREADSHEET_ID));
  }
  const bound = SpreadsheetApp.getActiveSpreadsheet();
  if (!bound) {
    throw new Error(
      "Tidak ada Spreadsheet aktif. Isi SPREADSHEET_ID di waitlist-backend.gs, atau buat script dari menu Extensions > Apps Script di dalam Sheet."
    );
  }
  return bound;
}

function getOrCreateSheet_() {
  const ss = getSpreadsheet_();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "receivedAt",
      "email",
      "plan",
      "childAge",
      "biggestConcern",
      "featureVote",
      "timestamp",
      "source",
      "userAgent",
    ]);
  }

  return sheet;
}

function findRowByEmail_(sheet, email) {
  const target = String(email || "").trim().toLowerCase();
  if (!target) return -1;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const values = sheet.getRange(2, 2, lastRow - 1, 1).getValues();

  for (var i = 0; i < values.length; i++) {
    var current = String(values[i][0] || "").trim().toLowerCase();
    if (current === target) {
      return i + 2;
    }
  }
  return -1;
}

function sendNotificationEmail_(payload, isUpdate) {
  if (!ADMIN_EMAIL) return;

  var subject = isUpdate ? "[Tumbi] Waitlist updated" : "[Tumbi] Waitlist submission baru";

  var body =
    "Ada data waitlist baru/terupdate:\n\n" +
    "Email: " +
    (payload.email || "") +
    "\n" +
    "Plan: " +
    (payload.plan || "") +
    "\n" +
    "Child Age: " +
    (payload.childAge || "") +
    "\n" +
    "Biggest Concern: " +
    (payload.biggestConcern || "-") +
    "\n" +
    "Feature Vote: " +
    (payload.featureVote || "-") +
    "\n" +
    "Source: " +
    (payload.source || "final_cta") +
    "\n" +
    "Timestamp: " +
    (payload.timestamp || "") +
    "\n";

  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: subject,
    body: body,
  });
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
