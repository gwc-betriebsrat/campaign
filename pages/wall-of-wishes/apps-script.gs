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
    // Row 0 = instruction banner, row 1 = headers (Wish, Name), rows 2+ = data
    const wishes = [];
    for (let i = 2; i < data.length; i++) {
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
    const url = `https://github.com/${GITHUB_OWNER}/${GITHUB_REPO}/edit/${GITHUB_BRANCH}/${GITHUB_FILE}`;

    // 4. Show dialog: copy JSON + open GitHub
    const escaped = json.replace(/`/g, '\\`');
    const html = HtmlService.createHtmlOutput(`
      <style>
        body { font-family: Arial, sans-serif; font-size: 13px; padding: 16px; margin: 0; }
        p { margin: 0 0 10px; line-height: 1.5; }
        .count { font-weight: bold; color: #b22222; }
        textarea {
          width: 100%; height: 120px; font-family: monospace; font-size: 11px;
          border: 1px solid #ccc; border-radius: 4px; padding: 8px;
          resize: none; box-sizing: border-box;
        }
        .actions { display: flex; gap: 8px; margin-top: 10px; }
        button, a.btn {
          flex: 1; padding: 9px 12px; border-radius: 5px; font-size: 13px;
          font-weight: bold; cursor: pointer; text-align: center;
          text-decoration: none; border: none;
        }
        button { background: #e8e8e8; color: #333; }
        button.copied { background: #2e7d32; color: #fff; }
        a.btn { background: #b22222; color: #fff; display: block; }
      </style>
      <p><span class="count">${wishes.length} wish${wishes.length === 1 ? '' : 'es'}</span> ready to publish.</p>
      <p><strong>Step 1:</strong> Copy the JSON below.<br>
         <strong>Step 2:</strong> Open GitHub, select all & paste, then click <em>Commit changes</em> → <em>Create pull request</em>.</p>
      <textarea id="json" readonly>${json.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</textarea>
      <div class="actions">
        <button id="copyBtn" onclick="
          navigator.clipboard.writeText(document.getElementById('json').value).then(() => {
            this.textContent = '✓ Copied!';
            this.className = 'copied';
          });
        ">Copy JSON</button>
        <a class="btn" href="${url}" target="_blank">Open GitHub →</a>
      </div>
    `)
    .setWidth(460)
    .setHeight(300);

    ui.showModalDialog(html, '🗳️ Publish Wishes to Website');

  } catch (err) {
    ui.alert(`❌ Unexpected error: ${err.message}`);
  }
}
