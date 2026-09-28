const nav=document.getElementById("nav"),menu=document.getElementById("menu"),mobile=document.getElementById("mobile");
window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>40));
menu.onclick=()=>mobile.classList.toggle("open");
document.querySelectorAll("#mobile a").forEach(a=>a.onclick=()=>mobile.classList.remove("open"));

/*
 * Securiti JSON Form Extractor-ready consent form.
 * The form uses standard HTML name/value fields so an extractor can read it
 * directly from the DOM/FormData.
 *
 * Browser -> /api/consent -> your server-side Securiti integration.
 * Never put Securiti credentials/tokens in this file.
 */
const form=document.getElementById("form");
const out=document.getElementById("status");
const CONSENT_API=form.getAttribute("action") || "/api/consent";
const DEMO_MODE=true; // change to false only after /api/consent exists

function getConsentJSON(){
  const fd=new FormData(form);
  const data={
    subject:{
      name:(fd.get("name")||"").toString().trim(),
      email:(fd.get("email")||"").toString().trim()
    },
    consent:{
      email:document.getElementById("emailConsent").checked,
      phone:document.getElementById("phoneConsent").checked,
      social_media:document.getElementById("socialConsent").checked
    },
    source:(fd.get("source")||"sagara-living-website").toString(),
    collected_at:new Date().toISOString()
  };
  return data;
}

// Public helper for Securiti JSON Form Extractor / browser integrations.
window.SecuritiConsent={
  getJSON:getConsentJSON,
  getJSONString:()=>JSON.stringify(getConsentJSON())
};

form.addEventListener("submit",async e=>{
  e.preventDefault();
  if(!form.reportValidity()) return;

  const data=getConsentJSON();

  // Makes the generated JSON available to integrations that listen for DOM events.
  form.dispatchEvent(new CustomEvent("securiti:consent",{bubbles:true,detail:data}));
  window.dispatchEvent(new CustomEvent("securiti:consent",{detail:data}));

  out.textContent="Memproses persetujuan…";

  if(DEMO_MODE){
    console.log("Securiti JSON Form Extractor payload:",JSON.stringify(data,null,2));
    // Also expose the latest payload for testing from DevTools.
    window.lastSecuritiConsent=data;
    await new Promise(r=>setTimeout(r,400));
    out.textContent="Terima kasih. Data consent berhasil dibuat sebagai JSON (mode testing).";
    return;
  }

  try{
    const r=await fetch(CONSENT_API,{
      method:"POST",
      headers:{"Content-Type":"application/json","Accept":"application/json"},
      body:JSON.stringify(data)
    });
    if(!r.ok) throw new Error("HTTP "+r.status);
    out.textContent="Terima kasih. Persetujuan Anda berhasil dikirim.";
    form.reset();
  }catch(err){
    console.error(err);
    out.textContent="Persetujuan belum dapat dikirim. Silakan coba lagi.";
  }
});
