const nav=document.getElementById("nav"),menu=document.getElementById("menu"),mobile=document.getElementById("mobile");window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>40));menu.onclick=()=>mobile.classList.toggle("open");document.querySelectorAll("#mobile a").forEach(a=>a.onclick=()=>mobile.classList.remove("open"));

/* Securiti.ai integration point.
   Keep credentials server-side. Browser -> /api/consent -> Securiti.ai.
   Known reporting endpoint:
   https://app2.securiti.ai/reporting/v1/sources/query?ref=getCmpConsentRecords
*/
const CONSENT_API="/api/consent";
const DEMO_MODE=true;

function payload(){return {
 subject:{name:document.getElementById("name").value.trim(),email:document.getElementById("email").value.trim()},
 consent:{
   email:document.getElementById("emailConsent").checked,
   phone:document.getElementById("phoneConsent").checked,
   social_media:document.getElementById("socialConsent").checked
 },
 source:"sagara-living-website",collected_at:new Date().toISOString()
};}

document.getElementById("form").addEventListener("submit",async e=>{e.preventDefault();const out=document.getElementById("status");const data=payload();out.textContent="Memproses persetujuan...";
if(DEMO_MODE){await new Promise(r=>setTimeout(r,500));console.log("Consent payload:",data);out.textContent="Terima kasih. Persetujuan Anda berhasil dicatat (demo).";e.target.reset();return;}
try{const r=await fetch(CONSENT_API,{method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(data)});if(!r.ok)throw new Error("HTTP "+r.status);out.textContent="Terima kasih. Persetujuan Anda berhasil dicatat.";e.target.reset()}catch(err){console.error(err);out.textContent="Persetujuan belum dapat dikirim. Silakan coba lagi."}});
