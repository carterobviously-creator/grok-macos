(function(){
  const link=document.createElement("link"); link.rel="stylesheet"; link.href="css/lumen60.css"; document.head.appendChild(link);
  const extra={timer:["Timer","pages/timer.html",320,240], quiz:["Quiz","pages/quiz.html",380,280], palette:["Palette","pages/palette.html",420,280], ledger:["Ledger","pages/ledger.html",420,320]};
  function arm(){
    if(!window.Desktop||!window.Apps||!window.Windows) return;
    Object.keys(extra).forEach((id)=>{
      Desktop.labels[id]=extra[id][0];
      Apps[id]=function(){ Windows.create(id, extra[id][0], extra[id][2], extra[id][3], '<iframe class="app-frame" src="'+extra[id][1]+'" title="'+id+'"></iframe>'); };
    });
  }
  arm(); setTimeout(arm, 400); setTimeout(arm, 1200);
  fetch("data/mind60.json").then((r)=>r.json()).then((mind)=>{
    window.LumenMind60=mind;
    const status=document.getElementById("boot-status");
    if(status) status.textContent="Phrase book ready · "+mind.name;
  }).catch(()=>{});
})();
