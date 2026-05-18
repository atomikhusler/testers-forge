// TESTERS FORGE - LOGIC ENGINE
let appData = [];
let isSidebarEditMode = false;
let isMainEditMode = false;
let attachedLogText = "";

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('meta-date').valueAsDate = new Date();
    loadState();
    
    // Auto-save, Auto-update dynamic summary, and Hide Toast on Input
    ['meta-tester', 'meta-device', 'meta-rom'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            hideToast(); // Instantly dismisses the toast!
            saveState();
            updateMetaSummary();
        });
    });

    document.getElementById('log-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if(!file) return;
        const reader = new FileReader();
        reader.onload = function(event) {
            attachedLogText = event.target.result;
            document.getElementById('log-preview-text').textContent = "✅ " + file.name + " ready.";
        };
        reader.readAsText(file);
    });
});

function loadState() {
    let hasSavedProfile = false;
    
    try {
        const storedData = localStorage.getItem('forgeData');
        appData = storedData ? JSON.parse(storedData) : JSON.parse(JSON.stringify(defaultSchema));
        
        const storedMeta = JSON.parse(localStorage.getItem('forgeMeta'));
        if(storedMeta && (storedMeta.tester || storedMeta.device || storedMeta.rom)) {
            hasSavedProfile = true;
            if(storedMeta.tester) document.getElementById('meta-tester').value = storedMeta.tester;
            if(storedMeta.device) document.getElementById('meta-device').value = storedMeta.device;
            if(storedMeta.rom) document.getElementById('meta-rom').value = storedMeta.rom;
        }
    } catch(e) {
        appData = JSON.parse(JSON.stringify(defaultSchema));
    }
    
    updateMetaSummary(); // Initialize Summary
    renderApp();
    
    // Smart UX Flow Handling
    if (hasSavedProfile) {
        // Return user: Close the accordion and keep toast hidden
        document.getElementById('meta-panel').style.display = 'none';
        document.getElementById('meta-chevron').classList.add('collapsed');
        hideToast();
    } else {
        // New user: Open accordion and show toast
        document.getElementById('meta-panel').style.display = 'block';
        document.getElementById('meta-chevron').classList.remove('collapsed');
        showToast();
    }
}

function saveState() {
    try { 
        localStorage.setItem('forgeData', JSON.stringify(appData)); 
        localStorage.setItem('forgeMeta', JSON.stringify({
            tester: document.getElementById('meta-tester').value,
            device: document.getElementById('meta-device').value,
            rom: document.getElementById('meta-rom').value
        }));
    } catch(e) {}
}

/* --- TOAST LOGIC --- */
function showToast() {
    const toast = document.getElementById('init-toast');
    if(toast) toast.classList.remove('toast-hidden');
}

function hideToast() {
    const toast = document.getElementById('init-toast');
    if(toast) toast.classList.add('toast-hidden');
}

/* --- ACCORDION LOGIC --- */
function toggleMetaAccordion() {
    const panel = document.getElementById('meta-panel');
    const chevron = document.getElementById('meta-chevron');
    const hint = document.getElementById('pulse-hint');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        chevron.classList.remove('collapsed');
        updateMetaSummary(); // Re-evaluate if hint should show
    } else {
        panel.style.display = 'none';
        chevron.classList.add('collapsed');
        hint.classList.remove('visible'); // Always hide hint when collapsed
    }
}

function updateMetaSummary() {
    const t = document.getElementById('meta-tester').value.trim();
    const d = document.getElementById('meta-device').value.trim();
    const r = document.getElementById('meta-rom').value.trim();
    
    document.getElementById('meta-summary').textContent = `👤 ${t || 'Tester'} • 📱 ${d || 'Device'} • 💾 ${r || 'ROM'}`;
    
    // Trigger Pulsing Hint if data exists AND accordion is open
    const panel = document.getElementById('meta-panel');
    const hint = document.getElementById('pulse-hint');
    if ((t || d || r) && panel.style.display !== 'none') {
        hint.classList.add('visible');
    } else {
        hint.classList.remove('visible');
    }
}


/* --- UI CONTROLS --- */
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('open'); }
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if(window.innerWidth <= 800) toggleSidebar();
}

// Sidebar Edit Mode (Sections)
function toggleSidebarEdit() {
    isSidebarEditMode = !isSidebarEditMode;
    document.getElementById('sidebar-scroll').classList.toggle('edit-sidebar-active');
    const btn = document.getElementById('btn-edit-sidebar');
    if(isSidebarEditMode) { btn.classList.add('active'); btn.innerText = "Done Editing"; }
    else { btn.classList.remove('active'); btn.innerText = "⚙️ Edit Sections"; }
}

// Main Edit Mode (Tests)
function toggleMainEdit() {
    isMainEditMode = !isMainEditMode;
    document.getElementById('checklist-container').classList.toggle('edit-main-active');
    const btn = document.getElementById('btn-edit-main');
    if(isMainEditMode) { btn.classList.add('active'); btn.innerText = "Done Editing"; }
    else { btn.classList.remove('active'); btn.innerText = "✏️ Edit Tests"; }
}

/* --- DATA MUTATIONS --- */
window.setState = function(sIdx, iIdx, state) {
    if(isMainEditMode) return;
    appData[sIdx].items[iIdx].state = (appData[sIdx].items[iIdx].state === state) ? 0 : state;
    saveState(); renderApp(); 
};
window.deleteItem = function(sIdx, iIdx) { appData[sIdx].items.splice(iIdx, 1); saveState(); renderApp(); };
window.addItem = function(sIdx) {
    const input = document.getElementById(`add-input-${sIdx}`);
    if(input.value.trim()) {
        appData[sIdx].items.push({ id: 'i_' + Date.now(), text: input.value.trim(), state: 0 });
        input.value = ''; saveState(); renderApp();
    }
};

window.addSection = function() {
    const icon = document.getElementById('new-sec-icon').value.trim() || "📁";
    const title = document.getElementById('new-sec-title').value.trim();
    if(title) {
        appData.push({ id: 'sec-' + Date.now(), icon: icon, title: title, items: [] });
        document.getElementById('new-sec-icon').value = ''; document.getElementById('new-sec-title').value = '';
        saveState(); renderApp();
        setTimeout(() => { const s = document.getElementById('sidebar-scroll'); s.scrollTop = s.scrollHeight; }, 50);
    }
};
window.deleteSection = function(sIdx) {
    if(confirm("Delete this entire subsection?")) { appData.splice(sIdx, 1); saveState(); renderApp(); }
};
window.moveSection = function(sIdx, dir) {
    if(sIdx + dir < 0 || sIdx + dir >= appData.length) return;
    const temp = appData[sIdx]; appData[sIdx] = appData[sIdx + dir]; appData[sIdx + dir] = temp;
    saveState(); renderApp();
};

/* --- GLOBAL ACTIONS --- */
window.clearSelections = function() {
    if(confirm("Reset all tests to Unselected?")) {
        appData.forEach(sec => sec.items.forEach(i => i.state = 0));
        saveState(); renderApp(); if(window.innerWidth <= 800) toggleSidebar();
    }
};
window.factoryReset = function() {
    if(confirm("⚠️ Wipes all custom categories. Restore Factory Baseline?")) {
        localStorage.removeItem('forgeData'); localStorage.removeItem('forgeMeta');
        document.getElementById('meta-tester').value = ''; document.getElementById('meta-device').value = ''; document.getElementById('meta-rom').value = '';
        loadState(); if(window.innerWidth <= 800) toggleSidebar();
    }
};

/* --- RENDER ENGINE --- */
function renderApp() {
    const nav = document.getElementById('nav-container');
    const container = document.getElementById('checklist-container');
    nav.innerHTML = ''; container.innerHTML = '';
    let total = 0, pass = 0, fail = 0;

    appData.forEach((section, sIdx) => {
        // Build Nav Row
        const link = document.createElement('div');
        link.className = 'nav-item';
        link.innerHTML = `
            <div class="nav-title" onclick="scrollToSection('${section.id}')"><span>${section.icon}</span> ${section.title}</div>
            <div class="sec-controls">
                <button class="sec-btn" onclick="moveSection(${sIdx}, -1)">▲</button>
                <button class="sec-btn" onclick="moveSection(${sIdx}, 1)">▼</button>
                <button class="sec-btn del" onclick="deleteSection(${sIdx})">🗑️</button>
            </div>
        `;
        nav.appendChild(link);

        // Build Main Block
        const secDiv = document.createElement('div');
        secDiv.className = 'section-block'; secDiv.id = section.id;
        secDiv.innerHTML = `<div class="section-title">${section.icon} ${section.title}</div>`;

        section.items.forEach((item, iIdx) => {
            total++; if (item.state === 1) pass++; else if (item.state === -1) fail++;
            const row = document.createElement('div'); row.className = 'test-row';
            row.innerHTML = `
                <div class="test-text">${item.text}</div>
                <div class="toggle-group">
                    <button class="circle-btn btn-pass ${item.state === 1 ? 'active' : ''}" onclick="setState(${sIdx}, ${iIdx}, 1)"></button>
                    <button class="circle-btn btn-fail ${item.state === -1 ? 'active' : ''}" onclick="setState(${sIdx}, ${iIdx}, -1)"></button>
                </div>
                <button class="edit-control btn-delete" onclick="deleteItem(${sIdx}, ${iIdx})">🗑️</button>
            `;
            secDiv.appendChild(row);
        });

        // Main Inline Add
        const addRow = document.createElement('div'); addRow.className = 'edit-control add-row';
        addRow.innerHTML = `
            <input type="text" id="add-input-${sIdx}" placeholder="Type new test...">
            <button class="btn-add" onclick="addItem(${sIdx})">+ Add</button>
        `;
        secDiv.appendChild(addRow); container.appendChild(secDiv);
        
        setTimeout(() => {
            const input = document.getElementById(`add-input-${sIdx}`);
            if(input) input.addEventListener('keypress', (e) => { if(e.key === 'Enter') addItem(sIdx); });
        }, 0);
    });

    document.getElementById('stats-display').innerHTML = `<span>${total} Total</span><span class="pass-text">${pass} Pass</span><span class="fail-text">${fail} Fail</span>`;
}

/* --- EXPORT --- */
window.generateReport = function() {
    const d = document.getElementById('meta-date').value, t = document.getElementById('meta-tester').value || 'Unknown', dev = document.getElementById('meta-device').value || 'Unknown', r = document.getElementById('meta-rom').value || 'Custom ROM', rem = document.getElementById('meta-remarks').value;
    let md = `# 🛡️ TESTERS FORGE REPORT\n\n> **Date:** ${d}\n> **Device:** ${dev}\n> **ROM:** ${r}\n> **Tester:** ${t}\n\n## 🚨 FAILURES\n`;
    let hasFails = false;
    appData.forEach(sec => sec.items.forEach(item => { if(item.state === -1) { md += `- **[${sec.title}]** ${item.text}\n`; hasFails = true; } }));
    if(!hasFails) md += `*No bugs reported in this build.*\n`;

    md += `\n## ✅ WORKING\n`;
    appData.forEach(sec => sec.items.forEach(item => { if(item.state === 1) md += `- ${item.text}\n`; }));

    if(rem) md += `\n## 📝 REMARKS\n\`\`\`\n${rem}\n\`\`\`\n`;
    if(attachedLogText) md += `\n## 📋 ATTACHED LOGS\n<details><summary>Expand Logs</summary>\n\n\`\`\`log\n${attachedLogText}\n\`\`\`\n\n</details>\n`;
    md += `\n---\n> _made with ❤️ </> by atomikhusler [ spesium ]_\n`;

    const codeBox = document.getElementById('export-code'); codeBox.style.display = 'block'; codeBox.value = md;
    try {
        const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([md], { type: 'text/markdown' })); a.download = `Forge_${dev}_${r.replace(/\s/g,'')}.md`; a.click();
    } catch(e) {}
};