const t={btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]"),body:document.querySelector("body")};let e=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.btnStart.addEventListener("click",(function(){t.btnStart.setAttribute("disabled",""),t.body.style.backgroundColor=n(),e=setInterval((()=>{t.body.style.backgroundColor=n()}),1e3)})),t.btnStop.addEventListener("click",(function(){t.btnStart.removeAttribute("disabled"),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.293746b6.js.map