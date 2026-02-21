(function(){

const cfg = window.INVITE_CONFIG;
const U = window.Utils;
const S = window.Store;

let LOCALES = {};
let currentLocale = cfg.i18n.defaultLocale;

// ---------------------------
// INIT
// ---------------------------
document.addEventListener("DOMContentLoaded", async () => {
  await loadLocales();
  initLanguage();
  applyTheme();
  initHero();
  initCountdown();
  initGallery();
  initCapsule();
  initForms();
  initShare();
});

// ---------------------------
// LOCALE SYSTEM
// ---------------------------
async function loadLocales(){
  const promises = cfg.i18n.supportedLocales.map(code =>
    fetch(`locales/${code}.json`).then(r=>r.json()).then(data=>{
      LOCALES[code]=data;
    })
  );
  await Promise.all(promises);
}

function detectBrowserLang(){
  const nav = navigator.language?.slice(0,2).toLowerCase();
  if(cfg.i18n.supportedLocales.includes(nav)) return nav;
  return cfg.i18n.defaultLocale;
}

function initLanguage(){
  const saved = S.getLocale();
  if(saved && cfg.i18n.persistChoice){
    currentLocale = saved;
  }else if(cfg.i18n.autoDetect){
    currentLocale = detectBrowserLang();
  }

  buildLangDropdown();
  applyTranslations();
}

function buildLangDropdown(){
  const select = document.getElementById("langSelect");
  select.innerHTML = "";

  cfg.i18n.supportedLocales.forEach(code=>{
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = LOCALES[code]["lang.name"];
    if(code===currentLocale) opt.selected=true;
    select.appendChild(opt);
  });

  select.addEventListener("change", e=>{
    currentLocale = e.target.value;
    if(cfg.i18n.persistChoice) S.setLocale(currentLocale);
    applyTranslations();
  });
}

function t(key){
  return LOCALES[currentLocale]?.[key] || key;
}

function applyTranslations(){
  document.getElementById("eventBadge").textContent = t("badge.invited");
  document.getElementById("eventTitle").textContent = t("event.title");
  document.getElementById("eventSubtitle").textContent = t("event.subtitle");

  document.getElementById("labelDate").textContent = t("labels.date");
  document.getElementById("labelTime").textContent = t("labels.time");
  document.getElementById("labelLocation").textContent = t("labels.location");

  document.getElementById("btnAddToCalendar").textContent = t("buttons.add_to_calendar");
  document.getElementById("btnOpenMap").textContent = t("buttons.open_map");

  document.getElementById("lblDays").textContent = t("countdown.days");
  document.getElementById("lblHours").textContent = t("countdown.hours");
  document.getElementById("lblMins").textContent = t("countdown.minutes");
  document.getElementById("lblSecs").textContent = t("countdown.seconds");

  document.getElementById("detailsTitle").textContent = t("sections.details");
  document.getElementById("timelineTitle").textContent = t("sections.schedule");
  document.getElementById("timelineChip").textContent = t("chips.whats_happening");
  document.getElementById("rsvpTitle").textContent = t("sections.rsvp");
  document.getElementById("rsvpHint").textContent = t("rsvp.hint");
  document.getElementById("galleryTitle").textContent = t("gallery.title");

  document.getElementById("detailsBody").innerHTML = U.safeHtml(t("details.html"));

  const quick = document.getElementById("quickInfo");
  quick.innerHTML="";
  for(let i=0;i<3;i++){
    const span=document.createElement("span");
    span.className="pill";
    span.textContent=t(`quick.${i}`);
    quick.appendChild(span);
  }
}

// ---------------------------
// THEME
// ---------------------------
function applyTheme(){
  document.documentElement.style.setProperty("--accent", cfg.theme.accent);
  document.documentElement.style.setProperty("--accent2", cfg.theme.accent2);
}

// ---------------------------
// HERO
// ---------------------------
function initHero(){
  document.getElementById("heroImage").src = cfg.assets.heroImage;
  document.getElementById("btnOpenMap").href = cfg.event.mapUrl;

  const start = new Date(cfg.event.startAtLocal);
  document.getElementById("eventDateText").textContent = U.fmtDate(start);
  document.getElementById("eventTimeText").textContent = U.fmtTime(start);
  document.getElementById("eventLocationText").textContent = t("event.location_name");
}

// ---------------------------
// COUNTDOWN
// ---------------------------
function initCountdown(){
  const target = new Date(cfg.event.startAtLocal).getTime();

  function update(){
    const now = Date.now();
    const diff = target - now;

    if(diff<=0){
      document.getElementById("cdDays").textContent=0;
      document.getElementById("cdHours").textContent=0;
      document.getElementById("cdMins").textContent=0;
      document.getElementById("cdSecs").textContent=0;
      return;
    }

    const d = Math.floor(diff/86400000);
    const h = Math.floor(diff%86400000/3600000);
    const m = Math.floor(diff%3600000/60000);
    const s = Math.floor(diff%60000/1000);

    document.getElementById("cdDays").textContent=d;
    document.getElementById("cdHours").textContent=h;
    document.getElementById("cdMins").textContent=m;
    document.getElementById("cdSecs").textContent=s;
  }

  update();
  setInterval(update,1000);
}

// ---------------------------
// GALLERY
// ---------------------------
function initGallery(){
  const grid=document.getElementById("galleryGrid");
  cfg.assets.gallery.forEach(src=>{
    const img=document.createElement("img");
    img.src=src;
    img.className="gImg";
    grid.appendChild(img);
  });
}

// ---------------------------
// TIME CAPSULE
// ---------------------------
function initCapsule(){
  const unlock=new Date(cfg.event.capsuleUnlockAtLocal).getTime();
  const now=Date.now();

  if(now>=unlock){
    document.getElementById("capsuleLocked").classList.add("hidden");
    document.getElementById("capsuleOpen").classList.remove("hidden");
    document.getElementById("capsuleContent").innerHTML=U.safeHtml(t("capsule.content_html"));
  }
}

// ---------------------------
// FORMS
// ---------------------------
function initForms(){
  const form=document.getElementById("rsvpForm");
  const toast=document.getElementById("rsvpToast");

  form.addEventListener("submit", async e=>{
    e.preventDefault();
    const data = new FormData(form);

    if(cfg.forms.enableEmailSend){
      try{
        await fetch(cfg.forms.endpoint,{
          method:"POST",
          body:data,
          headers:{'Accept':'application/json'}
        });
        U.toast(toast,t("rsvp.toast.sent"));
      }catch{
        U.toast(toast,t("rsvp.toast.saved_only"));
      }
    }
  });
}

// ---------------------------
// SHARE
// ---------------------------
function initShare(){
  document.getElementById("btnCopyLink").addEventListener("click", async ()=>{
    try{
      await navigator.clipboard.writeText(location.href);
      alert(t("alerts.link_copied"));
    }catch{
      alert(t("alerts.copy_failed"));
    }
  });
}

})();
