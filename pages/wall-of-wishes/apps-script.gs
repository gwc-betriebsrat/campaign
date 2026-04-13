// ── GWC Wall of Wishes — Apps Script ─────────────────────────────────────
//
// SETUP (one-time):
//   1. In Apps Script editor: Project Settings → Script Properties
//   2. Add property:  GITHUB_TOKEN  →  your GitHub PAT (fine-grained, repo contents write)
//
// USAGE:
//   A "GWC" menu appears in the spreadsheet.
//   Click "GWC → Publish Wishes to Website" to sync approved wishes to wishes.json.

const GITHUB_OWNER  = 'gwc-betriebsrat';
const GITHUB_REPO   = 'campaign';
const GITHUB_FILE   = 'pages/wall-of-wishes/wishes.json';
const GITHUB_BRANCH = 'main';

// ── Menu ───────────────────────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🗳️ GWC')
    .addItem('Publish Wishes to Website', 'publishWishes')
    .addToUi();
}

// ── Main: read approved wishes → open GitHub edit URL in browser ──────────
function publishWishes() {
  const ui = SpreadsheetApp.getUi();

  try {
    // 1. Read Published tab
    const ss    = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Published');
    if (!sheet) {
      ui.alert('❌ Could not find a sheet named "Published". Please check the sheet name.');
      return;
    }

    const data = sheet.getDataRange().getValues();
    const wishes = [];
    for (let i = 1; i < data.length; i++) {
      const text   = String(data[i][0] || '').trim();
      const author = String(data[i][1] || '').trim();
      if (text) wishes.push({ text, author });
    }

    if (wishes.length === 0) {
      ui.alert('⚠️ No approved wishes found in the Published tab. Tick some "Approved" checkboxes first.');
      return;
    }

    // 2. Build the JSON content
    const json = JSON.stringify(wishes, null, 2) + '\n';

    // 3. Build GitHub edit URL
    // github.com/:owner/:repo/edit/:branch/:path?value=...
    const encoded = encodeURIComponent(json);
    const url = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/${GITHUB_FILE}?value=${encoded}`;

    // 4. Show dialog with the link + instructions
    const html = HtmlService.createHtmlOutput(`
      <style>
        body { font-family: Arial, sans-serif; font-size: 14px; padding: 16px; }
        p { margin: 0 0 12px; line-height: 1.5; }
        a.btn {
          display: inline-block;
          background: #b22222;
          color: #fff;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 14px;
        }
        .count { font-weight: bold; color: #b22222; }
      </style>
      <p>Ready to publish <span class="count">${wishes.length} wish${wishes.length === 1 ? '' : 'es'}</span>.</p>
      <p>Click below to open GitHub. You may be asked to log in.<br>
         The file will be pre-filled — just scroll down, click <strong>"Propose changes"</strong>, then <strong>"Create pull request"</strong>.</p>
      <a class="btn" href="${url}" target="_blank">Open GitHub →</a>
    `)
    .setWidth(420)
    .setHeight(200);

    ui.showModalDialog(html, '🗳️ Publish Wishes to Website');

  } catch (err) {
    ui.alert(`❌ Unexpected error: ${err.message}`);
  }
}
