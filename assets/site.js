'use strict';
(() => {
  for(const button of document.querySelectorAll('[data-copy]')){
    button.addEventListener('click',async()=>{
      const value=button.dataset.copy||'';
      const status=button.parentElement.querySelector('.copy-status');
      try{await navigator.clipboard.writeText(value);if(status)status.textContent='Copied';}
      catch{if(status)status.textContent='Select and copy the visible code manually';}
    });
  }
  function sec(value){
    const text=String(value).trim();
    if(!/^\d+(?::[0-5]?\d(?:\.\d+)?)?$/.test(text))return NaN;
    if(!text.includes(':'))return Number(text);
    const [mm,ss]=text.split(':').map(Number);
    return mm*60+ss;
  }
  const time=document.getElementById('time-gap-tool');
  if(time){
    const out=document.getElementById('gap-result');
    document.getElementById('calculate-gap').addEventListener('click',()=>{
      const target=sec(document.getElementById('gold-target').value),actual=sec(document.getElementById('run-time').value);
      const penalty=Number(document.getElementById('penalty').value||0);
      if(!Number.isFinite(target)||!Number.isFinite(actual)||target<=0||actual<0||!Number.isFinite(penalty)||penalty<0){out.textContent='Enter valid positive target and run times, plus a nonnegative penalty.';return;}
      const gap=actual+penalty-target;
      out.textContent= Math.abs(gap)<0.001 ? 'Your entered run exactly matches the entered target.' : gap>0 ? `Your entered run is ${gap.toFixed(1)} seconds slower than the entered target. Save that much time to match it.` : `Your entered run is ${(-gap).toFixed(1)} seconds quicker than the entered target. Check the game for the actual medal result.`;
    });
    document.getElementById('reset-gap').addEventListener('click',()=>{time.querySelectorAll('input').forEach(x=>x.value=x.id==='penalty'?'0':'');out.textContent='Enter the target from your stage and your own result.';});
  }
  const reward=document.getElementById('reward-tool');
  if(reward){
    const output=document.getElementById('reward-result');
    document.getElementById('calc-reward').addEventListener('click',()=>{
      const inputs=[...reward.querySelectorAll('input[data-cr],input[data-xp]')];
      if(inputs.some(x=>x.value && (!Number.isFinite(+x.value)|| +x.value<0))){output.textContent='Please enter only nonnegative numbers.';return;}
      const total=key=>inputs.filter(x=>x.dataset[key]!==undefined).reduce((sum,x)=>sum+Number(x.value||0),0);
      const cr=total('cr'),xp=total('xp');
      output.textContent=`Your manually entered run: ${cr.toLocaleString('en-US')} CR and ${xp.toLocaleString('en-US')} XP. One-time bonuses may not repeat; do not add VIP twice.`;
    });
    document.getElementById('reset-reward').addEventListener('click',()=>{reward.querySelectorAll('input').forEach(x=>x.value='');output.textContent='Enter the amounts shown by your game.';});
  }
})();