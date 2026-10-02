'use strict';
(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const paths = {
    search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>',
    arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
    chevron:'<path d="m9 5 7 7-7 7"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>',
    menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
    grid:'<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
    book:'<path d="M12 6v15M3 4c4-1 7 0 9 2 2-2 5-3 9-2v15c-4-1-7 0-9 2-2-2-5-3-9-2z"/>',
    filter:'<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2"/><circle cx="15" cy="17" r="2"/>',
    copy:'<rect x="8" y="8" width="12" height="12"/><path d="M16 8V4H4v12h4"/>',
    reset:'<path d="M4 10a8 8 0 1 1 1 8M4 4v6h6"/>',
    lock:'<rect x="5" y="10" width="14" height="11"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
    code:'<path d="m8 5-6 7 6 7m8-14 6 7-6 7M14 3l-4 18"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    contents:'<path d="M8 5h12M8 12h12M8 19h12M3 5h1M3 12h1M3 19h1"/>'
  };
  const icon = name => '<svg viewBox="0 0 24 24" aria-hidden="true">'+(paths[name] || paths.code)+'</svg>';
  const data = [
    {id:'button', name:'Button', category:'Actions', description:'A clear next step. From primary actions to quiet alternatives.', tags:'submit action click loading', tier:'free', experimental:false, api:[['type','Use button for actions; submit inside a form.'],['disabled','Prevents activation while an action is unavailable.'],['aria-busy','Announces an operation in progress.']], usage:'Use one primary button for the most important action in a region. Start labels with a verb and keep the result predictable.', requirements:['Click or keyboard activation','Visible focus','Reduced-motion fallback'], html:'<div class="row">\n  <button id="save" class="primary">Save changes</button>\n  <button id="cancel">Cancel</button>\n</div>\n<p id="feedback" role="status">Try the primary action.</p>', css:'.primary { background: var(--accent); color: var(--on-accent); }\n.row { display: flex; flex-wrap: wrap; gap: 12px; }\n#feedback { color: var(--muted); }', js:'const save = document.querySelector("#save");\nconst feedback = document.querySelector("#feedback");\nsave.addEventListener("click", () => {\n  save.disabled = true;\n  save.setAttribute("aria-busy", "true");\n  save.textContent = "Saving…";\n  setTimeout(() => {\n    save.disabled = false;\n    save.removeAttribute("aria-busy");\n    save.textContent = "Save changes";\n    feedback.textContent = "Changes saved in this example.";\n  }, 600);\n});\ndocument.querySelector("#cancel").onclick = () => {\n  feedback.textContent = "No changes applied.";\n};'},
    {id:'input', name:'Text input', category:'Forms', description:'Capture a value with a visible label and useful feedback.', tags:'field form email validation text', tier:'free', experimental:false, api:[['type="email"','Enables email validation and an appropriate software keyboard.'],['aria-describedby','Associates help or error text with the field.'],['aria-invalid','Set true only after validation finds an error.']], usage:'Keep the label visible. Explain what is needed before submission and validate when the field loses focus.', requirements:['Keyboard text input','Focus navigation'], html:'<form novalidate>\n  <label for="email">Email address</label>\n  <input id="email" type="email" required\n    placeholder="you@example.com" aria-describedby="help">\n  <p id="help">Use a valid email address.</p>\n  <button class="primary" type="submit">Continue</button>\n  <p id="feedback" role="status"></p>\n</form>', css:'form { display: grid; gap: 12px; width: min(100%, 320px); }\n#help, #feedback { margin: 0; color: var(--muted); }\ninput[aria-invalid="true"] { border-color: var(--error); }', js:'const email = document.querySelector("#email");\nconst help = document.querySelector("#help");\nfunction validate() {\n  const valid = email.validity.valid;\n  email.setAttribute("aria-invalid", String(!valid));\n  help.textContent = valid ? "Email format looks correct." : "Enter an email address, such as you@example.com.";\n  return valid;\n}\nemail.addEventListener("blur", validate);\ndocument.querySelector("form").onsubmit = event => {\n  event.preventDefault();\n  if (validate()) document.querySelector("#feedback").textContent = "Ready. No data was sent.";\n  else email.focus();\n};'},
    {id:'tabs', name:'Tabs', category:'Navigation', description:'Switch between related views without losing your place.', tags:'navigation panels switch tab', tier:'free', experimental:false, api:[['role="tablist"','Names the group of related views.'],['aria-selected','Communicates the active tab.'],['aria-controls','Connects each tab with its corresponding panel.']], usage:'Use tabs for peer sections. Support arrow keys, Home and End, and keep one tab in the keyboard tab order.', requirements:['Focus navigation','Directional navigation'], html:'<div class="tabs" role="tablist" aria-label="Project views">\n  <button id="tab-overview" role="tab" aria-selected="true" aria-controls="panel-overview">Overview</button>\n  <button id="tab-activity" role="tab" aria-selected="false" aria-controls="panel-activity" tabindex="-1">Activity</button>\n</div>\n<section id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" tabindex="0">Your project, at a glance.</section>\n<section id="panel-activity" role="tabpanel" aria-labelledby="tab-activity" tabindex="0" hidden>No new activity. Changes will appear here.</section>', css:'.tabs { display: flex; gap: 8px; }\n[aria-selected="true"] { color: var(--accent); border-bottom: 2px solid var(--accent); }\n[role="tabpanel"] { padding: 24px 0; }', js:'const tabs = [...document.querySelectorAll("[role=tab]")];\nfunction activate(index) {\n  tabs.forEach((tab, i) => {\n    tab.setAttribute("aria-selected", String(i === index));\n    tab.tabIndex = i === index ? 0 : -1;\n    document.getElementById(tab.getAttribute("aria-controls")).hidden = i !== index;\n  });\n  tabs[index].focus();\n}\ntabs.forEach((tab, index) => {\n  tab.onclick = () => activate(index);\n  tab.onkeydown = event => {\n    const next = {ArrowRight:(index + 1) % tabs.length, ArrowLeft:(index + tabs.length - 1) % tabs.length, Home:0, End:tabs.length - 1}[event.key];\n    if (next !== undefined) { event.preventDefault(); activate(next); }\n  };\n});'},
    {id:'accordion', name:'Accordion', category:'Disclosure', description:'Keep the essentials visible. Reveal detail when it matters.', tags:'expand collapse disclosure details faq', tier:'free', experimental:false, api:[['details.open','Reflects whether the section is expanded.'],['summary','Provides the keyboard-operable section label.'],['toggle','Fires when a section opens or closes.']], usage:'Write summary labels that make sense while closed. Keep important information out of collapsed sections.', requirements:['Click or keyboard activation','Focus navigation'], html:'<div class="accordion">\n  <details>\n    <summary>Can I customize the tokens?</summary>\n    <p>Yes. Change the CSS variables to adapt the example.</p>\n  </details>\n  <details>\n    <summary>Does it need a framework?</summary>\n    <p>This example uses native HTML and JavaScript.</p>\n  </details>\n</div>', css:'.accordion { width: min(100%, 400px); }\ndetails { border-bottom: 1px solid var(--border); }\nsummary { padding: 16px 0; cursor: pointer; }\ndetails p { color: var(--muted); padding-bottom: 16px; }', js:'const sections = [...document.querySelectorAll("details")];\nsections.forEach(section => {\n  section.addEventListener("toggle", () => {\n    if (section.open) sections.forEach(other => {\n      if (other !== section) other.open = false;\n    });\n  });\n});'},
    {id:'switch', name:'Switch', category:'Forms', description:'A simple on or off choice, with an immediate result.', tags:'toggle settings on off checkbox', tier:'free', experimental:false, api:[['role="switch"','Identifies an on/off setting.'],['checked','Stores the current state of the checkbox.'],['change','Responds after the value changes.']], usage:'Use a switch when the change applies immediately. Keep its label stable as the value changes.', requirements:['Click or keyboard activation','Non-color state feedback'], html:'<label class="setting">\n  <span>Email notifications</span>\n  <input id="notifications" type="checkbox" role="switch" checked>\n</label>\n<p id="state" role="status">Notifications are on.</p>', css:'.setting { display: flex; align-items: center; gap: 24px; }\ninput[type="checkbox"] { width: 24px; height: 24px; accent-color: var(--accent); }\n#state { color: var(--muted); }', js:'document.querySelector("#notifications").onchange = event => {\n  document.querySelector("#state").textContent = event.target.checked ? "Notifications are on." : "Notifications are off.";\n};'},
    {id:'dialog', name:'Dialog', category:'Disclosure', description:'Give a focused decision the space and attention it needs.', tags:'modal overlay confirmation focus', tier:'free', experimental:false, api:[['showModal()','Opens the dialog with the surrounding content inert.'],['close()','Closes the dialog and returns to the trigger.'],['aria-labelledby','Provides the dialog name.']], usage:'Use a dialog for a short, focused task. Provide an explicit cancel path and allow Escape to dismiss it.', requirements:['Focus navigation','Escape dismissal'], html:'<button id="open" class="primary">Edit project</button>\n<dialog aria-labelledby="title">\n  <form method="dialog">\n    <h2 id="title">Project details</h2>\n    <label for="project">Project name</label>\n    <input id="project" value="My project" required>\n    <div class="row">\n      <button value="cancel" formnovalidate>Cancel</button>\n      <button value="save" class="primary">Save</button>\n    </div>\n  </form>\n</dialog>\n<p id="feedback" role="status"></p>', css:'dialog { background: var(--surface); color: var(--text); border: 1px solid var(--border); padding: 24px; width: min(90%, 360px); }\ndialog::backdrop { background: #0009; }\nform { display: grid; gap: 12px; }\n.row { display: flex; gap: 8px; justify-content: flex-end; }', js:'const dialog = document.querySelector("dialog");\ndocument.querySelector("#open").onclick = () => dialog.showModal();\ndialog.addEventListener("close", () => {\n  document.querySelector("#feedback").textContent = dialog.returnValue === "save" ? "Project name: " + document.querySelector("#project").value : "Changes canceled.";\n});'},
    {id:'data-table', name:'Data table', category:'Data display', description:'Structured information with a clear path to comparison.', tags:'table data sort rows grid', tier:'pro', experimental:false, api:[['caption','Describes the table purpose.'],['scope="col"','Associates column headers with cells.'],['aria-sort','Communicates the active sort direction.']], usage:'Prioritize comparison over decoration. Keep numeric data aligned and sorting states explicit.', requirements:['Focus navigation','Horizontal table scrolling']},
    {id:'command-menu', name:'Command menu', category:'Navigation', description:'A keyboard-first route to actions and destinations.', tags:'command palette search keyboard shortcut', tier:'pro', experimental:true, api:[['Accessible name','Describes the available command scope.'],['Keyboard navigation','Moves predictably through available results.'],['Escape','Closes the menu and restores focus.']], usage:'Keep commands short and searchable. Display relevant shortcuts, and never rely on shortcuts as the only entry point.', requirements:['Keyboard text input','Directional navigation','Focus navigation']}
  ];
  const styleLibrary = window.UIKitStyles;
  const styleNames = {core:'Core',...Object.fromEntries(Object.entries(styleLibrary.families).map(([id,family])=>[id,family.name]))};
  const levelNames = {basic:'Basic',composite:'Composite',advanced:'Advanced'};
  const coreLevels = {button:'basic',input:'basic',tabs:'composite',accordion:'composite',switch:'basic',dialog:'advanced','data-table':'advanced','command-menu':'advanced'};
  data.forEach(item=>{item.designStyle='core';item.level=coreLevels[item.id];});
  data.unshift(...styleLibrary.examples);
  const sampleStyles=document.createElement('style');
  sampleStyles.textContent=styleLibrary.miniatureCSS;
  document.head.append(sampleStyles);
  const categories = ['Actions','Forms','Navigation','Disclosure','Data display'];
  const inputs = ['Mouse / trackpad','Touch','Keyboard','Keypad / TV remote','Pen / stylus','Gamepad','Switch control','Voice control','Screen reader','Spatial input'];
  const environments = ['Mobile','Tablet','Desktop / laptop','TV / large screen','Kiosk','Wearable','Spatial / XR','Embedded display'];
  const targetDevices = {
    mobile:{label:'Mobile',environment:'Mobile',hint:'320 px first'},
    tablet:{label:'Tablet',environment:'Tablet',hint:'Portrait'},
    laptop:{label:'Laptop',environment:'Desktop / laptop',hint:'Wide layout'}
  };
  const deviceMatches = {targeted:'Targeted',exclusive:'Device-only',verified:'Verified support'};
  data.forEach(item => {
    // Editorial scope for these general-purpose examples, not tested support.
    // A dedicated example declares targetDevices:['mobile'] in its data record.
    item.targetDevices = item.targetDevices || Object.keys(targetDevices);
    item.compatibility = {environments:Object.fromEntries(environments.map(x => [x,'not-tested'])), inputs:Object.fromEntries(inputs.map(x => [x,'not-tested']))};
  });
  let state, currentItem, editorFile = 'html', theme = 'dark', timer, toastTimer, frameToken = '', liveFailed = false;
  const previewSizes = {
    mobile:{label:'Mobile',width:320,height:568},
    tablet:{label:'Tablet portrait',width:768,height:1024},
    laptop:{label:'Laptop',width:1366,height:768}
  };
  let previewSize = 'mobile';
  const readOnlyPreviews = {
    'data-table':{
      html:'<div class="table-wrap"><table><caption>Project overview</caption><thead><tr><th scope="col">Project</th><th scope="col">Status</th></tr></thead><tbody><tr><td>Design system</td><td>Active</td></tr><tr><td>Documentation</td><td>Draft</td></tr></tbody></table></div>',
      css:'body{justify-content:flex-start}.table-wrap{width:100%;overflow:auto}table{width:100%;border-collapse:collapse;text-align:left}caption{text-align:left;margin-bottom:24px;font-weight:600}th,td{padding:16px 8px;border-bottom:1px solid var(--border)}th{color:var(--muted);font-size:14px}td:last-child{white-space:nowrap}@media(max-width:375px){body{padding:12px}th,td{padding:12px 4px}}',
      js:''
    },
    'command-menu':{
      html:'<section class="commands"><label for="command-search">Find a command</label><input id="command-search" type="search" placeholder="Search commands…"><div id="commands"><button>Go to components</button><button>Open documentation</button><button>View design tokens</button></div><p id="command-feedback" role="status">Choose a command to try this example.</p></section>',
      css:'.commands{width:min(100%,480px);display:grid;gap:12px}#commands{display:grid;gap:8px}#commands button{text-align:left}#command-feedback{color:var(--muted)}',
      js:'const field=document.querySelector("#command-search");const buttons=[...document.querySelectorAll("#commands button")];field.oninput=()=>{buttons.forEach(b=>b.hidden=!b.textContent.toLowerCase().includes(field.value.toLowerCase()));};buttons.forEach(b=>b.onclick=()=>document.querySelector("#command-feedback").textContent=b.textContent+" selected in this example.");'
    }
  };
  let lastGood = null, dialogReturn = null, memoryUrl = null;
  const drafts = new Map();
  const main = $('#main');
  const modal = $('#modal');
  const defaultState = {page:'home',component:'',category:'',q:'',tier:'all',experimental:false,sort:'curated',device:'all',deviceMatch:'targeted',designStyle:'all',level:'all',environments:[],inputs:[]};

  function styleState(params) {
    const designStyle=params.get('designStyle'),level=params.get('level');
    return {designStyle:Object.keys(styleNames).includes(designStyle)?designStyle:'all',level:Object.keys(levelNames).includes(level)?level:'all'};
  }

  function deviceState(params) {
    const device = params.get('device');
    const deviceMatch = params.get('deviceMatch');
    return {
      device:Object.keys(targetDevices).includes(device) ? device : 'all',
      deviceMatch:Object.keys(deviceMatches).includes(deviceMatch) ? deviceMatch : 'targeted'
    };
  }

  function readState() {
    const source = location.hash.startsWith('#route?') ? location.hash.slice(7) : location.search;
    const p = new URLSearchParams(source);
    const s = {...defaultState, page:p.get('page') || 'home', component:p.get('component') || '', category:p.get('category') || '', q:p.get('q') || '', tier:p.get('tier') || 'all', experimental:p.get('experimental') === '1', sort:p.get('sort') || 'curated', environments:(p.get('environment') || '').split('|').filter(x=>environments.includes(x)), inputs:(p.get('input') || '').split('|').filter(x=>inputs.includes(x))};
    if (!['home','catalog','component','guide'].includes(s.page)) s.page = 'home';
    if (!categories.includes(s.category)) s.category = '';
    if (!['all','free','pro'].includes(s.tier)) s.tier = 'all';
    if (!['curated','az','za'].includes(s.sort)) s.sort = 'curated';
    Object.assign(s,deviceState(p));
    Object.assign(s,styleState(p));
    return s;
  }
  function href(next) {
    const p = new URLSearchParams();
    Object.entries(next).forEach(([key,value]) => {
      if (key === 'environments') { if(value.length) p.set('environment',[...value].sort().join('|')); }
      else if(key === 'inputs') { if(value.length) p.set('input',[...value].sort().join('|')); }
      else if(key === 'experimental') { if(value) p.set(key,'1'); }
      else if(value && value !== defaultState[key]) p.set(key,value);
    });
    p.sort();
    return '?' + p.toString();
  }
  function navigate(next, replace = false, preserveScroll = false) {
    const y = scrollY;
    try {
      history.replaceState({...history.state, scroll:y},'');
      history[replace ? 'replaceState' : 'pushState']({scroll:preserveScroll ? y : 0},'',href(next));
      memoryUrl = null;
    } catch (_) {
      memoryUrl = href(next);
      if (replace) location.replace('#route' + memoryUrl);
      else location.hash = 'route' + memoryUrl;
    }
    state = next;
    closeModal();
    render();
    window.scrollTo(0,preserveScroll ? y : 0);
    if (!preserveScroll) $('#page-title')?.focus({preventScroll:true});
  }
  function link(item, text, cls = '') {
    return '<a data-route class="'+cls+'" href="'+esc(href({...state,page:'component',component:item.id}))+'">'+text+'</a>';
  }
  function navMarkup() {
    return '<div class="nav-content"><a data-route href="?page=home" class="'+(state.page==='home'?'current':'')+'">'+icon('grid')+'Overview</a><a data-route href="?page=catalog" class="'+(state.page==='catalog'&&!state.category?'current':'')+'">'+icon('code')+'All components<span class="count">'+data.length+'</span></a><a data-route href="?page=guide">'+icon('book')+'Getting started</a><p class="nav-caption">Components</p>'+
      categories.map(cat=>'<details><summary>'+esc(cat)+'<span class="chevron">'+icon('chevron')+'</span></summary><a data-route href="'+esc(href({...defaultState,page:'catalog',category:cat}))+'">Browse '+esc(cat.toLowerCase())+'</a>'+data.filter(d=>d.category===cat).map(d=>link(d,esc(d.name)+(d.tier==='pro'?'<span class="count">PRO</span>':''),currentItem?.id===d.id?'current':'')).join('')+'</details>').join('')+
      '<p class="nav-caption">Resources</p><a data-route href="?page=guide#tokens">Design tokens</a><a data-route href="?page=guide#accessibility">Accessibility</a><div class="nav-bottom"><div class="eyebrow">Built to be explored</div><p>Find a component.<br>Make it your own.</p><a data-route href="?page=component&amp;component=button">Try a live example '+icon('arrow')+'</a></div></div>';
  }
  function tocMarkup() {
    const sections = state.page === 'component' ? [['overview','Overview'],['example','Interactive example'],['usage','Usage'],['api','API reference'],['compatibility','Compatibility']] : state.page==='guide' ? [['start','Get started'],['tokens','Design tokens'],['accessibility','Accessibility']] : [['overview','Overview'],['components','Components'],['workflow','Your workflow']];
    return '<p class="eyebrow">On this page</p>'+sections.map(([id,label])=>'<a class="rail-link" data-anchor="'+id+'" href="#'+id+'">'+label+'</a>').join('')+'<div class="rail-note"><h3>Stay in your flow.</h3><p>Press <kbd>Ctrl / ⌘ K</kbd> to find a component, from anywhere.</p></div><div class="rail-note"><h3>Native web examples</h3><p>Explore with <code>HTML</code>, <code>CSS</code> and <code>JavaScript</code>.</p></div>';
  }
  function mini(item) {
    if(item.designStyle!=='core') return '<div class="sample-thumb sample-'+item.designStyle+'" aria-hidden="true"><span class="sample-kicker">'+esc(styleNames[item.designStyle])+'</span><div class="sample-surface">'+item.miniature+'</div></div>';
    const content = {
      button:'<span class="mini-button">Continue '+icon('arrow')+'</span><span class="mini-button secondary">Cancel</span>',
      input:'<div class="mini-stack"><span class="mini-label">Email address</span><span class="mini-input">you@example.com '+icon('check')+'</span></div>',
      tabs:'<div class="mini-stack"><div class="mini-tabs"><span class="active">Overview</span><span>Activity</span><span>Settings</span></div><div class="mini-lines"><i></i><i></i><i></i></div></div>',
      accordion:'<div class="mini-stack"><div class="mini-row">How does it work?<span>+</span></div><div class="mini-row">Can I customize it?<span>+</span></div></div>',
      switch:'<div class="mini-stack"><div class="mini-row">Notifications<span class="mini-switch"></span></div><div class="mini-row">Auto-save<span class="mini-switch"></span></div></div>',
      dialog:'<div class="mini-dialog"><span class="mini-label">Project details</span><div class="mini-lines"><i></i><i></i></div><span class="mini-button">Save changes</span></div>',
      'data-table':'<div class="mini-table"><div class="mini-row"><span>PROJECT</span><span>STATUS</span></div><div class="mini-row"><span>Design system</span><span class="accent">Active</span></div><div class="mini-row"><span>Documentation</span><span class="muted">Draft</span></div></div>',
      'command-menu':'<div class="mini-stack"><span class="mini-input">'+icon('search')+' Find a command…</span><div class="mini-row">Go to components<kbd>G C</kbd></div></div>'
    };
    return '<div class="miniature od-cluster" aria-hidden="true"><span class="mini-caption">'+String(data.indexOf(item)+1).padStart(2,'0')+' / '+esc(item.category.toLowerCase())+'</span>'+content[item.id]+'</div>';
  }
  function matches(item,q) { return q.toLowerCase().trim().split(/\s+/).every(word=>(item.name+' '+item.category+' '+item.tags+' '+item.description+' '+styleNames[item.designStyle]+' '+levelNames[item.level]).toLowerCase().includes(word)); }
  function styleFiltersMarkup() {
    const group=(label,key,values)=>'<fieldset><legend>'+label+'</legend><div class="segments">'+Object.entries({all:'All',...values}).map(([id,name])=>'<button data-facet="'+key+'" data-value="'+id+'" aria-pressed="'+(state[key]===id)+'">'+name+'</button>').join('')+'</div></fieldset>';
    return '<div class="style-filters od-stack">'+group('Design style','designStyle',styleNames)+group('Example level','level',levelNames)+'<p class="small muted">Basic: one control · Composite: coordinated controls · Advanced: a complete flow. Levels describe scope, not production readiness.</p><div class="od-cluster">'+(state.designStyle!=='all'?'<button class="outline" data-facet="designStyle" data-value="all">Clear '+esc(styleNames[state.designStyle])+'</button>':'')+(state.level!=='all'?'<button class="outline" data-facet="level" data-value="all">Clear '+esc(levelNames[state.level])+'</button>':'')+'<button data-action="clear-filters">Clear all filters</button></div></div>';
  }
  function matchesDevice(item) {
    const selected = state.device==='all' ? Object.keys(targetDevices) : [state.device];
    if(state.deviceMatch==='verified') {
      return selected.some(id=>item.compatibility.environments[targetDevices[id].environment]==='supported');
    }
    if(state.deviceMatch==='exclusive' && item.targetDevices.length!==1) return false;
    return selected.some(id=>item.targetDevices.includes(id));
  }
  function targetLabel(item) {
    const names = item.targetDevices.map(id=>targetDevices[id].label).join(' · ');
    return item.targetDevices.length===1 ? names+' only' : names;
  }
  function deviceFiltersMarkup() {
    const choices = [['all','All devices','Any screen'],...Object.entries(targetDevices).map(([id,value])=>[id,value.label,value.hint])];
    const help = {
      targeted:'Intended device targets from example metadata, not verified compatibility. Mobile starts at 320 CSS px.',
      exclusive:'Only components declared for one device. No current example is device-only; a responsive component is not mobile-only.',
      verified:'Only linked, verified support qualifies. Current examples are Not tested and are excluded; preview size alone is not evidence.'
    };
    return '<div class="device-filters od-stack"><fieldset aria-describedby="device-filter-help"><legend>Target device</legend><div class="segments">'+choices.map(([id,label,hint])=>'<button type="button" data-device="'+id+'" aria-pressed="'+(state.device===id)+'"><span class="od-field"><span>'+label+'</span><small>'+hint+'</small></span></button>').join('')+'</div></fieldset><fieldset aria-describedby="device-filter-help"><legend>Match by</legend><div class="segments">'+Object.entries(deviceMatches).map(([id,label])=>'<button type="button" data-device-match="'+id+'" aria-pressed="'+(state.deviceMatch===id)+'">'+label+'</button>').join('')+'</div></fieldset><p id="device-filter-help" class="small muted">'+help[state.deviceMatch]+'</p>'+(state.device!=='all'||state.deviceMatch!=='targeted'?'<div><button class="outline" data-action="clear-device">Clear device filter</button></div>':'')+'</div>';
  }
  function filtered() {
    const list = data.filter(d=>(!state.category||d.category===state.category)&&(state.tier==='all'||d.tier===state.tier)&&(state.experimental||!d.experimental)&&(state.designStyle==='all'||d.designStyle===state.designStyle)&&(state.level==='all'||d.level===state.level)&&matches(d,state.q)&&matchesDevice(d)&&(!state.environments.length||state.environments.some(e=>d.compatibility.environments[e]==='supported'))&&(!state.inputs.length||state.inputs.some(e=>d.compatibility.inputs[e]==='supported')));
    if(state.sort==='az') list.sort((a,b)=>a.name.localeCompare(b.name));
    if(state.sort==='za') list.sort((a,b)=>b.name.localeCompare(a.name));
    return list;
  }
  function cardsMarkup() {
    const list = filtered();
    $('#result-count').textContent = String(list.length).padStart(2,'0')+' components';
    const emptyMessage = state.deviceMatch==='verified'||state.inputs.length||state.environments.length ? 'Verified support requires linked test evidence. Current examples are Not tested. Use Targeted without compatibility filters to browse intended devices.' : state.deviceMatch==='exclusive' ? 'No current example is declared device-only. Choose Targeted to include components intended for multiple devices.' : 'Try another target device, a broader search or include Experimental components.';
    return list.length ? list.map(item=>link(item,mini(item)+'<div class="card-body od-stack"><div class="card-title"><h3>'+item.name+'</h3><span class="badge '+item.tier+'">'+(item.tier==='pro'?'PRO':'FREE')+'</span></div><p>'+item.description+'</p><div class="target-meta od-field"><span>Targets: '+esc(targetLabel(item))+'</span><span class="muted">Compatibility: Not tested</span></div><div class="card-meta"><span>HTML / CSS'+(item.js?' / JS':'')+'</span><span class="od-fill"></span>'+(item.experimental?'<span class="badge experimental">Experimental</span>':icon('arrow'))+'</div></div>','component-card od-tile')).join('') : '<div class="empty-state"><h3>No components match these filters.</h3><p class="muted">'+emptyMessage+'</p><button class="outline" data-action="clear-filters">Clear filters</button></div>';
  }
  function hero() {
    return '<section class="hero" id="overview"><div class="hero-copy"><p class="eyebrow">A workspace for your interface</p><h1 id="page-title" tabindex="-1">Less setup.<span>More building.</span></h1><p>Explore the details. Try the interaction.<br>Take the code in your own direction.</p><form id="hero-form"><label class="search-label" for="hero-query">FIND YOUR NEXT COMPONENT</label><div class="hero-search">'+icon('search')+'<input id="hero-query" type="search" autocomplete="off" placeholder="Search components…" value="'+esc(state.q)+'"><kbd>↵</kbd></div><div class="hero-hints"><span>Try</span><a data-route href="?page=component&amp;component=button">Button</a><a data-route href="?page=component&amp;component=input">Text input</a><a data-route href="?page=component&amp;component=dialog">Dialog</a></div></form></div><div class="workbench"><div class="bench-head"><span>button.html</span>'+icon('code')+'</div><div class="bench-example"><button class="primary" data-action="bench-save">Save changes '+icon('arrow')+'</button></div><div class="bench-code"><span class="syntax-key">&lt;button</span> class=<span class="syntax-string">\"primary\"</span><span class="syntax-key">&gt;</span><br>&nbsp; Save changes<br><span class="syntax-key">&lt;/button&gt;</span></div><div class="bench-foot"><span id="bench-status"><span class="pulse-dot"></span>Ready to interact</span><a data-route href="?page=component&amp;component=button" aria-label="Open Button example">'+icon('arrow')+'</a></div></div></section>';
  }
  function catalogPage() {
    return (state.page==='home'?hero():'<div class="detail-head" id="overview"><p class="eyebrow">Component library</p><h1 id="page-title" tabindex="-1">'+esc(state.category||'All components')+'</h1><p>Small building blocks. Considered interactions. Code you can explore.</p><form id="catalog-form"><label class="search-label" for="catalog-query">Search this collection</label><div class="catalog-query"><input id="catalog-query" type="search" value="'+esc(state.q)+'" placeholder="Name, category or keyword"><button class="outline" type="submit" aria-label="Search collection">'+icon('search')+'</button></div></form></div>')+
      '<section id="components"><div class="section-head"><div><h2>Explore components</h2><p>Find the right piece for what comes next.</p></div><span class="mono" id="result-count" role="status"></span></div><div class="filterbar"><div class="segments" aria-label="Access filter">'+['all','free','pro'].map(t=>'<button data-tier="'+t+'" aria-pressed="'+(state.tier===t)+'">'+t[0].toUpperCase()+t.slice(1)+'</button>').join('')+'</div><label class="toggle-label"><input id="experimental" type="checkbox" role="switch" '+(state.experimental?'checked':'')+'>Experimental</label><div class="filter-end"><button data-action="filters" class="'+(state.inputs.length||state.environments.length?'is-filtered':'')+'">'+icon('filter')+'Compatibility'+(state.inputs.length+state.environments.length?' · '+(state.inputs.length+state.environments.length):'')+'</button><button data-action="sort">Sort: '+({curated:'Curated',az:'A–Z',za:'Z–A'}[state.sort])+'</button></div></div><div class="catalog" id="catalog"></div></section><section id="workflow" class="detail-section"><div class="section-head"><div><p class="eyebrow">From discovery to your codebase</p><h2>Make it yours.</h2></div><a data-route class="button outline" href="?page=guide">Getting started '+icon('arrow')+'</a></div><p class="muted">Open an example, edit its source, and see your changes in place. The details stay close to the code.</p></section>';
  }
  function compatibility(item) {
    const group = (title, entries) => '<div><h3>'+title+'</h3>'+entries.map(label=>'<div class="compat-row"><span>'+esc(label)+'</span><span class="muted">Not tested</span></div>').join('')+'</div>';
    return '<div class="target-summary od-stack"><h3>Intended targets</h3><p>'+esc(targetLabel(item))+'</p><p class="small muted">Editorial example scope, not verified support. Mobile targets start at 320 CSS px; use the preview above to explore layouts.</p></div><div class="compatibility">'+group('Verified environments',environments)+group('Input method',inputs)+'</div><h3 class="detail-section">Interaction requirements</h3><div class="od-cluster">'+item.requirements.map(x=>'<span class="badge">'+esc(x)+'</span>').join('')+'</div><p class="notice">No verification evidence is attached to these examples. Intended behavior is not a support guarantee. Device, input and interaction requirements are evaluated separately.</p>';
  }
  function previewMarkup(item) {
    const size=previewSizes[previewSize];
    return '<div class="preview-controls"><fieldset><legend>Preview viewport</legend>'+Object.entries(previewSizes).map(([id,preset])=>'<label class="preview-option"><input type="radio" name="preview-size" value="'+id+'" '+(previewSize===id?'checked':'')+'><span class="od-field"><span>'+preset.label+'</span><small>'+preset.width+' × '+preset.height+' px</small></span></label>').join('')+'</fieldset></div><div class="preview-scroll" role="region" tabindex="0" aria-label="Component preview viewport, scroll to explore" aria-describedby="viewport-help" style="--preview-width:'+size.width+'px;--preview-height:'+size.height+'px"><iframe id="preview" width="'+size.width+'" height="'+size.height+'" title="'+item.name+' preview — '+size.label+', '+size.width+' by '+size.height+' CSS pixels" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe></div><div class="preview-caption"><span id="viewport-size" role="status">'+size.label+' · '+size.width+' × '+size.height+' CSS px</span><span id="viewport-help">Actual size · Scroll to explore. Viewport only; input and browser are unchanged.</span></div>';
  }
  function detailPage(item) {
    const free = item.tier==='free';
    return '<div class="detail-head" id="overview"><div class="detail-meta"><span class="badge">'+esc(item.category)+'</span><span class="badge '+item.tier+'">'+item.tier.toUpperCase()+'</span>'+(item.experimental?'<span class="badge experimental">Experimental</span>':'')+'</div><h1 id="page-title" tabindex="-1">'+item.name+'</h1><p>'+item.description+'</p></div><section id="example"><div class="section-head"><h2>Interactive example</h2><span class="mono">Native web · HTML / CSS / JS</span></div><div class="example"><div class="example-top"><span>Default example</span><span class="accent" id="preview-status" role="status">'+(free?'Preparing preview':'Pro component')+'</span></div>'+
      (free?'<iframe id="preview" title="'+item.name+' interactive preview" sandbox="allow-scripts" referrerpolicy="no-referrer"></iframe><div class="example-actions"><div class="segments" aria-label="Preview appearance">'+['dark','light','a11y'].map(t=>'<button data-theme="'+t+'" aria-pressed="'+(theme===t)+'">'+({dark:'Dark',light:'Light',a11y:'Accessibility'}[t])+'</button>').join('')+'</div><div class="od-cluster"><button data-action="reset">'+icon('reset')+'Reset</button><button data-action="copy">'+icon('copy')+'Copy code</button></div></div><div class="editor-top"><div class="file-tabs" aria-label="Example files">'+['html','css','js'].map(f=>'<button data-file="'+f+'" aria-pressed="'+(editorFile===f)+'">'+({html:'index.html',css:'style.css',js:'script.js'}[f])+'</button>').join('')+'</div><label class="editor-label" for="editor">Editable source</label></div><textarea id="editor" class="editor" spellcheck="false" autocapitalize="off" autocomplete="off" aria-describedby="editor-help"></textarea><div class="editor-footer"><span id="edit-status">Original example</span><span id="editor-help">Auto-run · Tab moves focus</span></div><div id="error-panel" class="error-panel" role="alert" hidden></div>':mini(item)+'<div class="locked">'+icon('lock')+'<h3>Source available with Pro</h3><p class="muted">Read the documentation and explore the structure. Editing, copying and exporting this component require Pro access.</p><p class="small muted">Pro access is not connected in this prototype.</p></div>')+'</div>'+(free?'<p class="notice">Changes run in an isolated preview. Refresh restores the original. Accessibility mode changes contrast; it does not perform an audit.</p>':'')+'</section><section class="detail-section" id="usage"><h2>Usage</h2><p class="muted">'+item.usage+'</p></section><section class="detail-section" id="api"><h2>API reference</h2><div class="api-list">'+item.api.map(([name,description])=>'<div class="api-row"><code>'+esc(name)+'</code><p>'+esc(description)+'</p></div>').join('')+'</div></section><section class="detail-section" id="compatibility"><h2>Compatibility</h2>'+compatibility(item)+'</section>';
  }
  function guidePage() {
    return '<div class="detail-head" id="start"><p class="eyebrow">Getting started</p><h1 id="page-title" tabindex="-1">Explore. Edit. Adapt.</h1><p>A direct path from a component idea to a working example.</p></div><div class="api-list"><div class="api-row"><code>01 / Find</code><p>Search by name, category or behavior. Use the catalog filters to narrow your collection.</p></div><div class="api-row"><code>02 / Understand</code><p>Read the usage guidance, API details and compatibility status before adopting a pattern.</p></div><div class="api-row"><code>03 / Make it yours</code><p>Open a Free example. Edit HTML, CSS or JavaScript below its live preview, then copy your source.</p></div></div><div class="detail-section"><a data-route class="button primary" href="?page=component&amp;component=button">Open your first example '+icon('arrow')+'</a></div><section class="detail-section" id="tokens"><h2>Design tokens</h2><p class="muted">Semantic roles keep your interface consistent. Example styles inherit these variables in every preview theme.</p><div class="api-list">'+[['--accent','The primary action and active state.'],['--surface','The component background.'],['--text','The primary text color.'],['--muted','Secondary readable information.'],['--border','Functional input boundaries.'],['--focus','The keyboard focus indicator.']].map(([a,b])=>'<div class="api-row"><code>'+a+'</code><p>'+b+'</p></div>').join('')+'</div></section><section class="detail-section" id="accessibility"><h2>Accessibility is a behavior.</h2><p class="muted">Use visible labels, predictable keyboard paths and clear result feedback. Preview themes help inspect contrast; they do not certify accessibility. Every compatibility entry remains Not tested until evidence is attached.</p></section>';
  }
  function render() {
    clearTimeout(timer); frameToken = ''; lastGood = null;
    currentItem = state.page==='component' ? data.find(d=>d.id===state.component) : null;
    const body = state.page==='component' ? currentItem?detailPage(currentItem):'<div class="empty-state"><h1 id="page-title" tabindex="-1">Component not found.</h1><p>Return to the catalog to find an available example.</p><a data-route class="button primary" href="?page=catalog">Browse components</a></div>' : state.page==='guide'?guidePage():catalogPage();
    main.innerHTML = '<div class="mobile-tools"><button class="nav-trigger" data-action="navigation">'+icon('menu')+'Browse</button><button data-action="contents">On this page '+icon('contents')+'</button></div><nav class="breadcrumb" aria-label="Breadcrumb"><a data-route href="?page=home">Workspace</a><span>/</span><a data-route href="?page=catalog">Components</a>'+(currentItem?'<span>/</span><span>'+currentItem.name+'</span>':'')+'</nav>'+body+'<footer class="footer"><span>UI KIT / THE BUILDING BLOCKS</span><span>Considered details. Yours to build.</span></footer>';
    if (currentItem) {
      $('.breadcrumb a:last-of-type').href=href({...state,page:'catalog',component:''});
      $('.detail-meta').insertAdjacentHTML('beforeend','<span class="badge">'+esc(styleNames[currentItem.designStyle])+'</span><span class="badge">'+esc(levelNames[currentItem.level])+'</span>');
      if(currentItem.designStyle!=='core') $('#usage').insertAdjacentHTML('beforeend','<p class="notice">'+esc(styleLibrary.families[currentItem.designStyle].guidance)+' Example level: '+esc(levelNames[currentItem.level])+'. Scope only; compatibility remains Not tested.</p>');
      const previewSurface = $('#preview') || $('.example .miniature');
      if (previewSurface) previewSurface.outerHTML = previewMarkup(currentItem);
    }
    $('#sidebar').innerHTML = navMarkup();
    $('#rightbar').innerHTML = tocMarkup();
    document.title = (currentItem?.name || (state.page==='guide'?'Getting started':'Component workspace'))+' — UI Kit';
    if ($('#catalog')) {
      $('#catalog').insertAdjacentHTML('beforebegin',styleFiltersMarkup()+deviceFiltersMarkup());
      $('#catalog').innerHTML = cardsMarkup();
      $$('.component-card').forEach(card=>{
        const item=data.find(d=>d.id===new URL(card.href,location.href).searchParams.get('component'));
        if(item) $('.card-title',card).insertAdjacentHTML('afterend','<div class="od-cluster"><span class="badge">'+esc(styleNames[item.designStyle])+'</span><span class="badge">'+esc(levelNames[item.level])+'</span></div>');
      });
    }
    if (currentItem?.tier==='free') {
      if (!drafts.has(currentItem.id)) drafts.set(currentItem.id,{html:currentItem.html,css:currentItem.css,js:currentItem.js});
      $('#editor').value = drafts.get(currentItem.id)[editorFile];
      $('#editor').addEventListener('input', editorChanged);
    }
    if (currentItem) runPreview();
    bindPageForms();
  }
  function bindPageForms() {
    ['hero','catalog'].forEach(prefix=>{
      const form = $('#'+prefix+'-form');
      if(form) form.addEventListener('submit',event=>{
        event.preventDefault();
        navigate({...state,page:'catalog',q:$('#'+prefix+'-query').value,component:''});
      });
    });
    $('#experimental')?.addEventListener('change',event=>navigate({...state,experimental:event.target.checked},false,true));
  }
  const previewBase = ':root{--surface:#191d21;--text:#f2f5f7;--muted:#adb7c2;--accent:#75dccb;--on-accent:#10201d;--border:#46515d;--focus:#a5c9ff;--error:#ffb4ab;--space:12px;--hit:44px;--radius:0;color-scheme:dark}*{box-sizing:border-box}body{margin:0;padding:24px;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--surface);color:var(--text);font:16px/1.6 system-ui,sans-serif;gap:var(--space)}button,input{font:inherit;min-height:var(--hit);padding:8px 16px;border:1px solid var(--border);border-radius:var(--radius);background:transparent;color:inherit;max-width:100%}button{cursor:pointer}button:disabled{opacity:.65;cursor:wait}input{width:100%}input[type=checkbox]{width:auto}p,h2{margin:0}:focus-visible{outline:2px solid var(--focus);outline-offset:4px}[hidden]{display:none!important}.primary{background:var(--accent);color:var(--on-accent);border-color:var(--accent)}@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}';
  function themeCSS() {
    return theme==='light'?':root{--surface:#f5f7fa;--text:#15202b;--muted:#495767;--accent:#176c5f;--on-accent:#fff;--border:#667482;--focus:#174cb0;--error:#aa2020;color-scheme:light}':theme==='a11y'?':root{--surface:#000;--text:#fff;--muted:#fff;--accent:#ffff00;--on-accent:#000;--border:#fff;--focus:#ffff00;--error:#ffb4ab}':'';
  }
  function resolvedCSS(draft) {
    return currentItem.designStyle==='core' ? previewBase+themeCSS()+'\n'+draft.css : draft.css;
  }
  function editorChanged() {
    drafts.get(currentItem.id)[editorFile] = $('#editor').value;
    $('#edit-status').textContent = 'Modified · changes stay in this session';
    $('#preview-status').textContent = 'Waiting for changes…';
    clearTimeout(timer); timer = setTimeout(runPreview,450);
  }
  function runPreview() {
    const frame = $('#preview'); if(!frame || !currentItem) return;
    const draft = currentItem.tier==='free' ? drafts.get(currentItem.id) : readOnlyPreviews[currentItem.id];
    if (!draft) return;
    // Parse HTML inertly; examples cannot replace the sandbox policy or inject a second script.
    const parsed = new DOMParser().parseFromString(draft.html,'text/html');
    parsed.querySelectorAll('script,iframe,object,embed,base,meta,link').forEach(node=>node.remove());
    parsed.querySelectorAll('*').forEach(node=>Array.from(node.attributes).forEach(attr=>{
      if(/^on/i.test(attr.name)||['srcdoc','formaction','action'].includes(attr.name)||(/^href$|^src$/i.test(attr.name)&&/^\s*javascript:/i.test(attr.value))) node.removeAttribute(attr.name);
    }));
    frameToken = Date.now().toString(36)+Math.random().toString(36).slice(2);
    liveFailed = false;
    $('#preview-status').textContent = 'Applying changes…';
    if ($('#error-panel')) $('#error-panel').hidden = true;
    const payload = JSON.stringify({token:frameToken,appearance:theme,html:parsed.body.innerHTML,css:resolvedCSS(draft),js:draft.js}).replace(/</g,'\\u003c');
    const bridge = '(function(){const p='+payload+';document.documentElement.dataset.appearance=p.appearance;const send=(type,message)=>parent.postMessage({source:"ui-kit-preview",token:p.token,type,message},"*");window.addEventListener("error",e=>send("error",e.message+" (line "+e.lineno+")"));window.addEventListener("unhandledrejection",e=>send("error",String(e.reason)));const style=document.createElement("style");style.textContent=p.css;document.head.append(style);document.body.innerHTML=p.html;try{new Function(p.js+"\\n//# sourceURL=example.js")();send("ready","");}catch(e){send("error",e.name+": "+e.message+"\\n"+(e.stack||""));}})();';
    frame.srcdoc = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; script-src \'unsafe-inline\' \'unsafe-eval\'; style-src \'unsafe-inline\'; img-src data:; connect-src \'none\'; form-action \'none\'; base-uri \'none\'"></head><body><script>'+bridge+'<\/script></body></html>';
  }
  window.addEventListener('message',event=>{
    const frame = $('#preview'), message=event.data;
    if(!frame || event.source!==frame.contentWindow || !message || message.source!=='ui-kit-preview'||message.token!==frameToken) return;
    if(message.type==='error' && typeof message.message==='string'){
      liveFailed = true;
      $('#preview-status').textContent = 'Example needs attention';
      if ($('#error-panel')) {
        $('#error-panel').hidden = false;
        $('#error-panel').textContent = 'script.js — '+message.message.slice(0,1200)+'\nCheck the source or use Reset to restore the working example.';
      }
      if(lastGood) {
        const failedToken = frameToken;
        frameToken = '';
        frame.srcdoc = lastGood;
        // Messages from the restored revision are deliberately ignored.
        void failedToken;
      }
    } else if(message.type==='ready'&&!liveFailed) {
      $('#preview-status').textContent = 'Preview ready';
      lastGood = frame.srcdoc;
    }
  });
  function toast(text) {
    const el=$('#toast'); el.textContent=text; el.hidden=false;
    clearTimeout(toastTimer); toastTimer=setTimeout(()=>{el.hidden=true;},4000);
  }
  function closeModal() { if(modal.open) modal.close(); }
  function openModal(title,body,footer='') {
    closeModal(); dialogReturn=document.activeElement;
    modal.innerHTML='<div class="dialog-head"><h2 id="modal-title">'+title+'</h2><button class="icon-button" data-action="close" aria-label="Close">'+icon('close')+'</button></div>'+body+(footer?'<div class="dialog-actions">'+footer+'</div>':'');
    modal.showModal();
  }
  modal.addEventListener('close',()=>{if(dialogReturn?.isConnected) dialogReturn.focus({preventScroll:true});});
  modal.addEventListener('click',event=>{if(event.target===modal){const rect=modal.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeModal();}});
  function openSearch() {
    openModal('Find a component','<div class="dialog-body search-dialog"><label for="global-query" class="sr-only">Search components</label><input id="global-query" type="search" placeholder="Name, category, or behavior…" autocomplete="off"><div id="search-results" class="search-results"></div><p id="search-count" role="status" class="small muted"></p></div><div class="dialog-help">↑ ↓ Navigate · Enter Open · Esc Close</div>');
    const field=$('#global-query');
    function results() {
      const list=data.filter(d=>matches(d,field.value));
      $('#search-count').textContent = list.length ? list.length+' results' : 'No results. Try “button”, “form” or “navigation”.';
      $('#search-results').innerHTML=list.map(d=>link(d,'<span class="od-field"><span>'+d.name+'</span><small>'+d.category+'</small></span><span class="badge '+d.tier+'">'+d.tier.toUpperCase()+'</span>','search-result')).join('');
    }
    field.addEventListener('input',results); results(); field.focus();
  }
  function openFilters() {
    const options=(title,name,values,selected)=>'<fieldset><legend>'+title+'</legend>'+values.map(v=>'<label class="option"><input type="checkbox" name="'+name+'" value="'+esc(v)+'" '+(selected.includes(v)?'checked':'')+'><span>'+esc(v)+'</span></label>').join('')+'</fieldset>';
    openModal('Compatibility filters','<div class="dialog-body"><p class="small">Show verified support for any selected option within each group (OR). Both selected groups must match (AND). Not tested entries are excluded.</p></div><div class="dialog-body filter-options">'+options('Target environment','environment',environments,state.environments)+options('Input method','input',inputs,state.inputs)+'</div>','<button data-action="clear-compatibility">Clear</button><button class="primary" data-action="apply-filters">Apply filters</button>');
  }
  function openSort() {
    openModal('Sort components','<div class="dialog-body"><fieldset><legend>Order this collection</legend>'+[['curated','Curated'],['az','Name: A–Z'],['za','Name: Z–A']].map(([value,label])=>'<label class="option"><input type="radio" name="sort" value="'+value+'" '+(value===state.sort?'checked':'')+'>'+label+'</label>').join('')+'</fieldset></div>','<button class="primary" data-action="apply-sort">Apply order</button>');
  }
  async function copyCode() {
    const draft=drafts.get(currentItem.id);
    const text='<!doctype html>\n<html lang="en" data-appearance="'+theme+'">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n<title>'+esc(currentItem.name)+'</title>\n<style>\n'+resolvedCSS(draft)+'\n</style>\n</head>\n<body>\n'+draft.html+'\n<script>\n'+draft.js.replace(/<\/script/gi,'<\\/script')+'\n<\/script>\n</body>\n</html>';
    try { if(!navigator.clipboard) throw new Error('Clipboard unavailable'); await navigator.clipboard.writeText(text); toast('Complete example copied.'); }
    catch (_) {
      openModal('Copy example','<div class="dialog-body"><p>Clipboard access is unavailable. Select and copy the source below.</p><label for="copy-source">Complete example source</label><textarea id="copy-source" class="editor" readonly></textarea></div>');
      $('#copy-source').value=text; $('#copy-source').focus(); $('#copy-source').select();
    }
  }
  function navigateLink(anchor) {
    const url = new URL(anchor.getAttribute('href'),location.href);
    const nextUrl=url.search;
    const params=new URLSearchParams(nextUrl);
    const next={...defaultState,page:params.get('page')||'home',component:params.get('component')||'',category:params.get('category')||'',q:params.get('q')||'',tier:params.get('tier')||'all',experimental:params.get('experimental')==='1',sort:params.get('sort')||'curated',environments:(params.get('environment')||'').split('|').filter(Boolean),inputs:(params.get('input')||'').split('|').filter(Boolean)};
    Object.assign(next,deviceState(params));
    Object.assign(next,styleState(params));
    navigate(next);
    if(url.hash) document.getElementById(url.hash.slice(1))?.scrollIntoView();
  }
  document.addEventListener('click',event=>{
    const route=event.target.closest('a[data-route]');
    if(route&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey&&event.button===0){event.preventDefault();navigateLink(route);return;}
    const anchor=event.target.closest('[data-anchor]');
    if(anchor){event.preventDefault();closeModal();const target=document.getElementById(anchor.dataset.anchor);target?.scrollIntoView();if(target){target.tabIndex=-1;target.focus({preventScroll:true});}return;}
    const tier=event.target.closest('[data-tier]');
    if(tier){navigate({...state,tier:tier.dataset.tier},false,true);return;}
    const facet=event.target.closest('[data-facet]');
    if(facet){
      const key=facet.dataset.facet,value=facet.dataset.value;
      const values=key==='designStyle'?styleNames:key==='level'?levelNames:null;
      if(!values || (value!=='all'&&!Object.keys(values).includes(value)))return;
      navigate({...state,[key]:value},false,true);
      $('[data-facet="'+key+'"][data-value="'+value+'"]')?.focus({preventScroll:true});
      return;
    }
    const deviceButton=event.target.closest('[data-device], [data-device-match]');
    if(deviceButton){
      const field=deviceButton.hasAttribute('data-device')?'device':'deviceMatch';
      const attribute=field==='device'?'data-device':'data-device-match';
      const value=deviceButton.getAttribute(attribute);
      if(!(field==='device'?['all',...Object.keys(targetDevices)]:Object.keys(deviceMatches)).includes(value))return;
      navigate({...state,[field]:value},false,true);
      $('['+attribute+'="'+value+'"]')?.focus({preventScroll:true});
      return;
    }
    const file=event.target.closest('[data-file]');
    if(file){editorFile=file.dataset.file;$$('[data-file]').forEach(b=>b.setAttribute('aria-pressed',String(b===file)));$('#editor').value=drafts.get(currentItem.id)[editorFile];return;}
    const mode=event.target.closest('[data-theme]');
    if(mode){theme=mode.dataset.theme;$$('[data-theme]').forEach(b=>b.setAttribute('aria-pressed',String(b===mode)));runPreview();return;}
    const button=event.target.closest('[data-action]');if(!button)return;
    switch(button.dataset.action) {
      case 'search': openSearch(); break;
      case 'close': closeModal(); break;
      case 'navigation': openModal('Browse components','<nav class="dialog-body" aria-label="Mobile navigation">'+navMarkup()+'</nav>');break;
      case 'contents': openModal('On this page','<nav class="dialog-body" aria-label="Page sections">'+tocMarkup()+'</nav>');break;
      case 'filters': openFilters();break;
      case 'sort': openSort();break;
      case 'apply-sort': navigate({...state,sort:$('input[name=sort]:checked',modal).value},false,true);break;
      case 'apply-filters': navigate({...state,environments:$$('input[name=environment]:checked',modal).map(x=>x.value),inputs:$$('input[name=input]:checked',modal).map(x=>x.value)},false,true);break;
      case 'clear-compatibility': $$('input[type=checkbox]',modal).forEach(x=>x.checked=false);break;
      case 'clear-filters': navigate({...defaultState,page:'catalog'},false,true);break;
      case 'clear-device': navigate({...state,device:'all',deviceMatch:'targeted'},false,true);$('[data-device="all"]')?.focus({preventScroll:true});break;
      case 'copy': copyCode();break;
      case 'reset':
        openModal('Reset this example?','<div class="dialog-body"><p>Your HTML, CSS and JavaScript edits will be replaced with the original example.</p></div>','<button data-action="close">Keep editing</button><button class="primary" data-action="confirm-reset">Reset example</button>');break;
      case 'confirm-reset':
        drafts.set(currentItem.id,{html:currentItem.html,css:currentItem.css,js:currentItem.js});
        closeModal(); $('#editor').value=drafts.get(currentItem.id)[editorFile];$('#edit-status').textContent='Original example';runPreview();toast('Original example restored.');break;
      case 'bench-save':
        button.disabled=true;button.textContent='Saving…';$('#bench-status').textContent='Applying changes…';
        setTimeout(()=>{if(!button.isConnected)return;button.disabled=false;button.innerHTML='Save changes '+icon('arrow');$('#bench-status').textContent='Example saved';},600);break;
    }
  });
  document.addEventListener('toggle',event=>{
    const target=event.target;
    if(target.matches?.('.nav-content details')&&target.open) $$('details',target.closest('.nav-content')).forEach(el=>{if(el!==target)el.open=false;});
  },true);
  document.addEventListener('change',event=>{
    if (!event.target.matches('input[name="preview-size"]')) return;
    const next=event.target.value, size=previewSizes[next];
    if (!size) return;
    previewSize=next;
    const frame=$('#preview'), region=$('.preview-scroll');
    if (!frame || !region) return;
    region.style.setProperty('--preview-width',size.width+'px');
    region.style.setProperty('--preview-height',size.height+'px');
    frame.width=String(size.width);
    frame.height=String(size.height);
    frame.title=currentItem.name+' preview — '+size.label+', '+size.width+' by '+size.height+' CSS pixels';
    $('#viewport-size').textContent=size.label+' · '+size.width+' × '+size.height+' CSS px';
    region.scrollTo(0,0);
  });
  document.addEventListener('keydown',event=>{
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch();return;}
    if(modal.open&&$('#global-query')) {
      const results=$$('.search-result',modal), active=document.activeElement;
      if(event.key==='ArrowDown'||event.key==='ArrowUp'){
        event.preventDefault();
        const i=results.indexOf(active), next=event.key==='ArrowDown'?(i+1)%results.length:(i<=0?results.length-1:i-1);
        results[next]?.focus();
      } else if(event.key==='Enter'&&active===$('#global-query')&&results[0]) {event.preventDefault();results[0].click();}
    }
  });
  function restore() { state=readState();closeModal();render();requestAnimationFrame(()=>window.scrollTo(0,history.state?.scroll||0)); }
  window.addEventListener('popstate',restore);
  window.addEventListener('hashchange',()=>{if(location.hash.startsWith('#route?')&&!memoryUrl)restore();memoryUrl=null;});
  state=readState();render();
})();
