window.Store = (function(){
  const k = {
    locale: "invite_locale_v1",
    rsvp: "invite_rsvp_v1",
    guest: "invite_guest_wall_v1"
  };

  function read(key, fallback){
    try{
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    }catch{
      return fallback;
    }
  }
  function write(key, val){
    localStorage.setItem(key, JSON.stringify(val));
  }

  return {
    getLocale(){ return read(k.locale, null); },
    setLocale(v){ write(k.locale, v); },

    getRsvp(){ return read(k.rsvp, null); },
    setRsvp(payload){ write(k.rsvp, payload); },

    getGuestMessages(){ return read(k.guest, []); },
    addGuestMessage(msg){
      const arr = read(k.guest, []);
      arr.unshift(msg);
      write(k.guest, arr.slice(0, 60));
      return arr;
    },
    clearGuestMessages(){ write(k.guest, []); }
  };
})();
