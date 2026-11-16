/**
 * bulk-editor.js — Inline bulk mind map editor
 * Adds a floating "Bulk Edit" button that opens a modal where you can
 * type your full map as an indented outline, preview it, and push it
 * to the active mind map — all on the same origin/localStorage.
 */
(function () {
  'use strict';

  /* ── Constants ───────────────────────────────────────────────── */
  const BRANCH_COLORS = ['#3498db','#e74c3c','#2ecc71','#f39c12','#9b59b6','#1abc9c','#e67e22','#e91e63'];
  let _nodeId = 0;

  /* ── CSS (injected once) ─────────────────────────────────────── */
  function injectStyles() {
    if (document.getElementById('bulk-editor-styles')) return;
    const s = document.createElement('style');
    s.id = 'bulk-editor-styles';
    s.textContent = `
      #bulk-editor-fab {
        position: fixed; bottom: 24px; right: 24px; z-index: 99990;
        width: 48px; height: 48px; border-radius: 14px;
        background: #7c3aed; color: #fff; border: none; cursor: pointer;
        font-size: 22px; display: flex; align-items: center; justify-content: center;
        box-shadow: 0 4px 16px rgba(124,58,237,.4);
        transition: transform .15s, box-shadow .15s;
      }
      #bulk-editor-fab:hover { transform: scale(1.08); box-shadow: 0 6px 24px rgba(124,58,237,.55); }

      #bulk-editor-overlay {
        position: fixed; inset: 0; z-index: 99991;
        background: rgba(0,0,0,.55); backdrop-filter: blur(4px);
        display: none; opacity: 0; transition: opacity .2s;
      }
      #bulk-editor-overlay.show { display: flex; opacity: 1; align-items: center; justify-content: center; }

      #bulk-editor-modal {
        width: min(96vw, 1100px); height: min(88vh, 740px);
        background: #0f1117; border-radius: 16px; border: 1px solid #2d3148;
        display: flex; flex-direction: column; overflow: hidden;
        box-shadow: 0 20px 60px rgba(0,0,0,.5);
        transform: scale(.96); transition: transform .2s;
      }
      #bulk-editor-overlay.show #bulk-editor-modal { transform: scale(1); }

      .be-header {
        display: flex; align-items: center; padding: 12px 16px;
        background: #1a1d27; border-bottom: 1px solid #2d3148; gap: 10px;
      }
      .be-header h3 { margin: 0; color: #a78bfa; font-size: 15px; flex: 1; }
      .be-close { background: none; border: none; color: #64748b; cursor: pointer; font-size: 22px; padding: 4px 8px; }
      .be-close:hover { color: #f87171; }

      .be-body { display: flex; flex: 1; overflow: hidden; }

      .be-panel { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
      .be-panel-label {
        padding: 8px 14px; font-size: 11px; font-weight: 600;
        letter-spacing: .06em; text-transform: uppercase; color: #64748b;
        background: #161927; border-bottom: 1px solid #2d3148;
      }
      .be-divider { width: 1px; background: #2d3148; }

      #be-textarea {
        flex: 1; resize: none; border: none; outline: none;
        background: #0f1117; color: #e2e8f0;
        font-family: 'Fira Code','Cascadia Code','Consolas', monospace;
        font-size: 14px; line-height: 1.7; padding: 16px; tab-size: 2;
      }
      #be-textarea::placeholder { color: #334155; }

      #be-preview { flex: 1; overflow: auto; padding: 16px; background: #0f1117; color: #c8ccd4; font-size: 13px; }

      .be-tree-node { margin: 1px 0; line-height: 1.55; }
      .be-tree-label {
        display: inline-block; padding: 1px 8px; border-radius: 4px; font-size: 13px;
      }
      .be-tree-root > .be-tree-label  { background: #312e81; color: #c4b5fd; font-weight: 700; font-size: 14px; padding: 3px 10px; }
      .be-tree-d1 > .be-tree-label    { background: #1e3a5f; color: #7dd3fc; }
      .be-tree-d2 > .be-tree-label    { background: #14532d; color: #86efac; }
      .be-tree-d3 > .be-tree-label    { background: #431407; color: #fdba74; }
      .be-tree-d4 > .be-tree-label    { background: #2d1657; color: #d8b4fe; }
      .be-tree-children { margin-left: 18px; border-left: 1px dashed #2d3148; padding-left: 10px; }

      .be-footer {
        display: flex; gap: 8px; padding: 10px 14px; align-items: center;
        background: #1a1d27; border-top: 1px solid #2d3148;
      }
      .be-btn {
        padding: 7px 18px; border-radius: 8px; border: none;
        font-size: 13px; font-weight: 600; cursor: pointer; transition: all .15s;
      }
      .be-btn-primary { background: #7c3aed; color: #fff; }
      .be-btn-primary:hover { background: #6d28d9; }
      .be-btn-secondary { background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
      .be-btn-secondary:hover { background: #334155; color: #e2e8f0; }
      .be-status { font-size: 12px; margin-left: auto; padding: 4px 10px; border-radius: 6px; font-weight: 500; }
      .be-status.ok  { background: #14532d; color: #86efac; }
      .be-status.err { background: #7f1d1d; color: #fca5a5; }
      .be-status.inf { background: #1e3a5f; color: #7dd3fc; }
      .be-node-count { font-size: 11px; color: #64748b; }
      .be-hint { font-size: 11px; color: #475569; padding: 6px 14px; border-top: 1px solid #1e293b; background: #0d1117; }
      .be-hint b { color: #7c3aed; }
    `;
    document.head.appendChild(s);
  }

  /* ── Pre-process #* ... *# multiline blocks ──────────────────── */
  // Returns an array of { indent: string, content: string } objects
  // where content may contain \n for multiline nodes
  function preprocessLines(text) {
    var rawLines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    var entries = [];
    var i = 0;
    while (i < rawLines.length) {
      var line = rawLines[i];
      var trimmed = line.trim();

      // Skip empty lines
      if (!trimmed) { i++; continue; }

      // Check if line contains #*
      var openIdx = trimmed.indexOf('#*');
      if (openIdx !== -1) {
        // Get the indent from this line
        var indent = line.match(/^(\s*)/)[1];
        var contentParts = [];

        // Get content after #* on this line
        var afterMarker = trimmed.substring(openIdx + 2).trim();

        // Check if *# is on the same line
        var closeIdx = afterMarker.indexOf('*#');
        if (closeIdx !== -1) {
          // Single-line: #* some text *#
          contentParts.push(afterMarker.substring(0, closeIdx).trim());
          entries.push({ indent: indent, content: contentParts.join('\n') });
          i++;
          continue;
        }

        if (afterMarker) contentParts.push(afterMarker);
        i++;

        // Collect lines until *#
        while (i < rawLines.length) {
          var innerTrimmed = rawLines[i].trim();
          var endIdx = innerTrimmed.indexOf('*#');
          if (endIdx !== -1) {
            var lastContent = innerTrimmed.substring(0, endIdx).trim();
            if (lastContent) contentParts.push(lastContent);
            i++;
            break;
          } else {
            if (innerTrimmed) contentParts.push(innerTrimmed);
            i++;
          }
        }

        entries.push({ indent: indent, content: contentParts.join('\n') });
      } else {
        var indent = line.match(/^(\s*)/)[1];
        entries.push({ indent: indent, content: trimmed });
        i++;
      }
    }
    return entries;
  }

  /* ── Parse indented text → tree ─────────────────────────────── */
  function parseIndented(text) {
    _nodeId = 0;
    var entries = preprocessLines(text);
    if (!entries.length) return null;

    // Detect indent unit from first indented entry
    var indentUnit = null;
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].indent.length > 0) {
        indentUnit = entries[i].indent.length;
        break;
      }
    }

    function getDepth(entry) {
      if (!indentUnit) return 0;
      var spaces = entry.indent.replace(/\t/g, '  ');
      return Math.floor(spaces.length / indentUnit);
    }

    var root = { content: entries[0].content, children: [], id: 'node_' + (++_nodeId) };
    var stack = [{ depth: 0, node: root }];

    for (var i = 1; i < entries.length; i++) {
      var entry = entries[i];
      var depth = getDepth(entry);
      var node = { content: entry.content, children: [], id: 'node_' + (++_nodeId) };
      while (stack.length > 1 && stack[stack.length - 1].depth >= depth) stack.pop();
      stack[stack.length - 1].node.children.push(node);
      stack.push({ depth: depth, node: node });
    }
    return root;
  }

  /* ── Assign branch colors ───────────────────────────────────── */
  function assignColors(node, depth, ci) {
    depth = depth || 0; ci = ci || 0;
    if (depth === 0) {
      node.children.forEach(function(c, i) { assignColors(c, 1, i % BRANCH_COLORS.length); });
    } else {
      node.branchColor = BRANCH_COLORS[ci];
      node.children.forEach(function(c) { assignColors(c, depth + 1, ci); });
    }
    return node;
  }

  /* ── Count nodes ────────────────────────────────────────────── */
  function countNodes(n) { return n ? 1 + n.children.reduce(function(s,c) { return s + countNodes(c); }, 0) : 0; }

  /* ── Resolve mm-node from any storage format ────────────────── */
  function resolveMmNode(raw) {
    if (!raw) return null;
    try {
      var d = JSON.parse(raw);
      if (d['mm-node']) return d['mm-node'];
      if (d.mindmap && d.mindmap['mm-node']) return d.mindmap['mm-node'];
      if (d.content && Array.isArray(d.children)) return d;
      if (d.mindmap && d.mindmap.content) return d.mindmap;
    } catch(e) {}
    return null;
  }

  /* ── Flatten tree → indented text ───────────────────────────── */
  function flattenNode(node, depth) {
    depth = depth || 0;
    var content = node.content || '(empty)';
    var indent = '  '.repeat(depth);
    var lines;
    if (content.indexOf('\n') !== -1) {
      // Multi-line content → wrap in #* ... *#
      lines = [indent + '#* ' + content.split('\n').join('\n' + indent + '   ') + ' *#'];
    } else {
      lines = [indent + content];
    }
    (node.children || []).forEach(function(c) {
      lines = lines.concat(flattenNode(c, depth + 1));
    });
    return lines;
  }

  /* ── Render preview tree ────────────────────────────────────── */
  function renderTree(node, depth) {
    depth = depth || 0;
    var cls = depth === 0 ? 'be-tree-root' : 'be-tree-d' + Math.min(depth, 4);
    var prefix = depth === 0 ? '◉ ' : depth === 1 ? '▸ ' : '· ';
    var html = '<div class="be-tree-node ' + cls + '">';
    html += '<span class="be-tree-label">' + prefix + escHtml(node.content).replace(/\n/g, '<br>') + '</span>';
    if (node.children && node.children.length) {
      html += '<div class="be-tree-children">';
      node.children.forEach(function(c) { html += renderTree(c, depth + 1); });
      html += '</div>';
    }
    html += '</div>';
    return html;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Build modal DOM ────────────────────────────────────────── */
  function buildUI() {
    // FAB button
    var fab = document.createElement('button');
    fab.id = 'bulk-editor-fab';
    fab.title = 'Bulk Edit Map';
    fab.innerHTML = '✏️';
    document.body.appendChild(fab);

    // Overlay + modal
    var overlay = document.createElement('div');
    overlay.id = 'bulk-editor-overlay';
    overlay.innerHTML = [
      '<div id="bulk-editor-modal">',
      '  <div class="be-header">',
      '    <h3>⚡ Bulk Map Editor</h3>',
      '    <span class="be-node-count" id="be-node-count"></span>',
      '    <button class="be-close" id="be-close-btn">&times;</button>',
      '  </div>',
      '  <div class="be-body">',
      '    <div class="be-panel">',
      '      <div class="be-panel-label">📝 Indented Outline</div>',
      '      <textarea id="be-textarea" placeholder="Operating System\n  Process Management\n    Scheduling\n      Round Robin\n      FCFS\n    IPC\n      Pipes\n      Sockets\n  Memory Management\n    Paging\n    Virtual Memory\n  File Systems\n    FAT32\n    NTFS\n\n← First line = root node\n   Indent with spaces/tabs = depth"></textarea>',
      '      <div class="be-hint"><b>Tab</b> inserts 2 spaces &nbsp;|&nbsp; First line = root &nbsp;|&nbsp; Each indent = one level deeper &nbsp;|&nbsp; <b>#* ... *#</b> = multiline node</div>',
      '    </div>',
      '    <div class="be-divider"></div>',
      '    <div class="be-panel">',
      '      <div class="be-panel-label">👁 Live Preview</div>',
      '      <div id="be-preview" style="color:#475569;display:flex;align-items:center;justify-content:center">Start typing to preview</div>',
      '    </div>',
      '  </div>',
      '  <div class="be-footer">',
      '    <button class="be-btn be-btn-secondary" id="be-load-btn">⬇ Load Current</button>',
      '    <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:#94a3b8;cursor:pointer;user-select:none"><input type="checkbox" id="be-collapse-check" checked style="accent-color:#7c3aed"> Collapse after push</label>',
      '    <button class="be-btn be-btn-primary" id="be-push-btn">🚀 Push to Map</button>',
      '    <span class="be-status" id="be-status" style="display:none"></span>',
      '  </div>',
      '</div>'
    ].join('\n');
    document.body.appendChild(overlay);

    // Wire events
    fab.addEventListener('click', function() { overlay.classList.add('show'); });
    document.getElementById('be-close-btn').addEventListener('click', function() { overlay.classList.remove('show'); });
    overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.classList.remove('show'); });

    var ta = document.getElementById('be-textarea');
    var timer = null;
    ta.addEventListener('input', function() {
      clearTimeout(timer);
      timer = setTimeout(updatePreview, 100);
    });
    ta.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        e.preventDefault();
        var start = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.substring(0, start) + '  ' + ta.value.substring(end);
        ta.selectionStart = ta.selectionEnd = start + 2;
        updatePreview();
      }
    });

    document.getElementById('be-load-btn').addEventListener('click', loadCurrent);
    document.getElementById('be-push-btn').addEventListener('click', pushToApp);
  }

  /* ── Preview ────────────────────────────────────────────────── */
  function updatePreview() {
    var text = document.getElementById('be-textarea').value.trim();
    var preview = document.getElementById('be-preview');
    if (!text) {
      preview.innerHTML = '<span style="color:#475569">Start typing to preview</span>';
      document.getElementById('be-node-count').textContent = '';
      return;
    }
    var root = parseIndented(text);
    if (!root) {
      preview.innerHTML = '<span style="color:#f87171">Could not parse — check indentation</span>';
      return;
    }
    assignColors(root);
    preview.innerHTML = renderTree(root);
    document.getElementById('be-node-count').textContent = countNodes(root) + ' nodes';
  }

  /* ── Load current map ───────────────────────────────────────── */
  function loadCurrent() {
    var mmNode = resolveMmNode(localStorage.getItem('json-mindmap-content'));

    if (!mmNode) {
      try {
        var history = JSON.parse(localStorage.getItem('mindmap-history') || '[]');
        if (history.length) {
          var latest = history[history.length - 1];
          mmNode = resolveMmNode(latest.mindmap);
        }
      } catch(e) {}
    }

    if (!mmNode) {
      showStatus('No map found in localStorage', 'err');
      return;
    }

    document.getElementById('be-textarea').value = flattenNode(mmNode).join('\n');
    updatePreview();
    showStatus('✓ Loaded — edit away!', 'inf');
  }

  /* ── Push to app ────────────────────────────────────────────── */
  function pushToApp() {
    var text = document.getElementById('be-textarea').value.trim();
    if (!text) { showStatus('Nothing to push', 'err'); return; }

    var root = parseIndented(text);
    if (!root) { showStatus('Parse error — check indentation', 'err'); return; }

    assignColors(root);

    // If "Collapse after push" is checked, collapse everything from level 2+
    var shouldCollapse = document.getElementById('be-collapse-check').checked;
    if (shouldCollapse) {
      (function collapseDeep(node, level) {
        if (node.children && node.children.length > 0 && level >= 2) {
          node.collapsed = true;
        }
        (node.children || []).forEach(function(c) { collapseDeep(c, level + 1); });
      })(root, 0);
    }

    var mmObj = { 'mm-settings': { spacing: 30, 'border-radius': 4 }, 'mm-node': root };
    var fullStr = JSON.stringify(mmObj, null, 2);

    // Write to json-mindmap-content
    localStorage.setItem('json-mindmap-content', fullStr);

    // Also update the current history entry (matched by ?id= in URL)
    try {
      var urlParams = new URLSearchParams(window.location.search);
      var currentId = urlParams.get('id');
      if (currentId) {
        var history = JSON.parse(localStorage.getItem('mindmap-history') || '[]');
        var idx = history.findIndex(function(h) { return String(h.id) === String(currentId); });
        if (idx >= 0) {
          history[idx].mindmap = fullStr;
          history[idx].timestamp = new Date().toISOString();
        } else {
          history.push({ mindmap: fullStr, timestamp: new Date().toISOString(), id: parseInt(currentId) });
        }
        localStorage.setItem('mindmap-history', JSON.stringify(history));
      }
    } catch(e) {}

    // Also update the json-editor textarea if it exists (app uses this)
    try {
      var editor = document.getElementById('json-editor');
      if (editor) {
        editor.value = fullStr;
        editor.dispatchEvent(new Event('input', { bubbles: true }));
      }
    } catch(e) {}

    var total = countNodes(root);
    showStatus('✓ Pushed ' + total + ' nodes — reloading...', 'ok');

    // Auto-reload after a short delay so user sees the message
    setTimeout(function() { window.location.reload(); }, 800);
  }

  function showStatus(msg, type) {
    var el = document.getElementById('be-status');
    el.textContent = msg;
    el.className = 'be-status ' + type;
    el.style.display = 'inline-block';
    clearTimeout(el._t);
    el._t = setTimeout(function() { el.style.display = 'none'; }, 4000);
  }

  /* ── Init ────────────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { injectStyles(); buildUI(); });
  } else {
    injectStyles(); buildUI();
  }

})();

