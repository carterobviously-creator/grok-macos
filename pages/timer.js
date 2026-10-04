let left=1500, h=null; const el=document.getElementById("t");
function draw(){el.textContent=String(Math.floor(left/60)).padStart(2,"0")+":"+String(left%60).padStart(2,"0");}
document.getElementById("go").onclick=()=>{ if(h) return; h=setInterval(()=>{ left=Math.max(0,left-1); draw(); if(!left){clearInterval(h); h=null;} },1000); };
document.getElementById("reset").onclick=()=>{ clearInterval(h); h=null; left=1500; draw(); };
