"use strict";
const moods={
  "happy": [
    "Enjoy the little moments that make today good.",
    "Carry that good energy into something you enjoy.",
    "Here's to more reasons to smile today."
  ],
  "sad": [
    "You don't have to rush through a difficult day.",
    "Give yourself room to feel what you feel.",
    "Take things at a pace that feels manageable."
  ],
  "excited": [
    "Channel that energy into something you look forward to.",
    "Enjoy the anticipation and the moment itself.",
    "Make a little room for something new today."
  ],
  "tired": [
    "A little rest can be a worthwhile part of your day.",
    "Give yourself time to recharge.",
    "Keep today's expectations manageable."
  ],
  "neutral": [
    "An ordinary day can be a perfectly good day.",
    "See where the day takes you.",
    "Here's to a steady, peaceful day."
  ]
};
function timeInfo(hour){if(!Number.isInteger(hour)||hour<0||hour>23)return {key:"unknown",label:"Hello"};if(hour>=5&&hour<12)return {key:"morning",label:"Good morning"};if(hour>=12&&hour<17)return {key:"afternoon",label:"Good afternoon"};if(hour>=17&&hour<21)return {key:"evening",label:"Good evening"};return {key:"night",label:"Good night"};}
function makeGreeting(name,mood,hour,random=Math.random){const cleaned=typeof name==="string"?name.trim():"";if(!cleaned||cleaned.length>60)return {error:"Enter a name between 1 and 60 characters.",field:"userName"};if(!Object.hasOwn(moods,mood))return {error:"Choose one of the available moods.",field:"userMood"};const time=timeInfo(hour),list=moods[mood],n=random(),i=Number.isFinite(n)?Math.max(0,Math.min(list.length-1,Math.floor(n*list.length))):0;return {title:time.label+", "+cleaned+"!",message:list[i],mood,time:time.key};}
if(typeof module!=="undefined"&&module.exports)module.exports={timeInfo,makeGreeting};
if(typeof document!=="undefined")document.addEventListener("DOMContentLoaded",()=>{
 const get=id=>document.getElementById(id),form=get("greeting-form"),name=get("userName"),mood=get("userMood"),card=get("greetingMessage"),error=get("error"),again=get("again"),copy=get("copy"),status=get("copy-status");
 let current=null;
 function clearError(){error.textContent="";name.removeAttribute("aria-invalid");mood.removeAttribute("aria-invalid");}
 function render(result){current=result;card.dataset.mood=result.mood;card.dataset.time=result.time;get("context").textContent=result.mood.toUpperCase()+" / "+result.time.toUpperCase();get("greeting-title").textContent=result.title;get("greeting-text").textContent=result.message;card.classList.remove("animate");void card.offsetWidth;card.classList.add("animate");again.disabled=false;copy.disabled=false;status.textContent="";}
 function generate(){clearError();const result=makeGreeting(name.value,mood.value,new Date().getHours());if(result.error){error.textContent=result.error;get(result.field).setAttribute("aria-invalid","true");get(result.field).focus();return;}render(result);}
 form.addEventListener("submit",e=>{e.preventDefault();generate();});
 again.addEventListener("click",()=>{if(!current)return;generate();});
 copy.addEventListener("click",async()=>{if(!current)return;const text=current.title+" "+current.message;try{if(!navigator.clipboard)throw Error("Clipboard unavailable");await navigator.clipboard.writeText(text);status.textContent="Greeting copied.";}catch{status.textContent="Clipboard is unavailable. Select and copy the greeting text manually.";}});
 form.addEventListener("reset",()=>{clearError();current=null;card.dataset.mood="neutral";card.dataset.time="unknown";card.classList.remove("animate");get("context").textContent="READY TO GENERATE";get("greeting-title").textContent="Hello there.";get("greeting-text").textContent="Your personalized greeting will appear here.";again.disabled=true;copy.disabled=true;status.textContent="";});
 name.addEventListener("input",clearError);mood.addEventListener("change",clearError);get("fields").disabled=false;
});
