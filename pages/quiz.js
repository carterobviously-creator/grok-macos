const qs=[["Helper loaded at boot?","Aura"],["Where do notes save?","browser"],["Is this macOS?","No"]];
let i=0; const show=()=>document.getElementById("q").textContent=qs[i][0]; show();
document.getElementById("s").onclick=()=>{ const v=document.getElementById("a").value.toLowerCase(); document.getElementById("r").textContent=v.includes(qs[i][1].toLowerCase().slice(0,3))?"Correct.":"Try: "+qs[i][1]; i=(i+1)%qs.length; document.getElementById("a").value=""; show(); };
