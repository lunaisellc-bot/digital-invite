window.Utils = {
  mustStr(v, name){
    if (typeof v !== "string" || v.trim().length === 0) throw new Error(`${name} must be a non-empty string`);
    return v;
  },
  clampInt(n, min, max){
    const x = Number.parseInt(String(n), 10);
    if (!Number.isFinite(x)) return min;
    return Math.min(max, Math.max(min, x));
  },
  safeHtml(html){
    return String(html ?? "");
  },
  fmtDate(dt){
    try{
      const d = new Date(dt);
      if (Number.isNaN(d.getTime())) return "—";
      return d.toLocaleDateString(undefined, { weekday:"short", year:"numeric", month:"short", day:"numeric" });
    }catch{ return "—"; }
  },
  fmtTime(dt){
    try{
      const d = new Date(dt);
      if (Number.isNaN(d.getTime())) return "—";
      return d.toLocaleTimeString(undefined, { hour:"2-digit", minute:"2-digit" });
    }catch{ return "—"; }
  },
  isoForCalendar(localIso){
    const d = new Date(localIso);
    if (Number.isNaN(d.getTime())) return null;
    const pad = (x) => String(x).padStart(2,"0");
    const yyyy = d.getFullYear();
    const mm = pad(d.getMonth()+1);
    const dd = pad(d.getDate());
    const hh = pad(d.getHours());
    const mi = pad(d.getMinutes());
    const ss = pad(d.getSeconds());
    return `${yyyy}${mm}${dd}T${hh}${mi}${ss}`;
  },
  toast(el, msg){
    el.textContent = msg;
    el.style.display = "block";
    clearTimeout(el.__t);
    el.__t = setTimeout(()=>{ el.style.display="none"; }, 3200);
  },
  now(){ return new Date(); }
};
