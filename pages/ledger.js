const saved=JSON.parse(localStorage.getItem("lumen-ledger")||"[]");
function draw(){document.getElementById("led").innerHTML=saved.map(x=>"<li>"+x+"</li>").join(""); const sum=saved.reduce((n,x)=>n+(parseFloat(String(x).split(" ").pop())||0),0); document.getElementById("t").textContent="Total mock: "+sum.toFixed(2);} 
draw();
document.getElementById("f").onsubmit=(e)=>{e.preventDefault(); const v=document.getElementById("i").value.trim(); if(!v) return; saved.push(v); localStorage.setItem("lumen-ledger", JSON.stringify(saved)); document.getElementById("i").value=""; draw();};
