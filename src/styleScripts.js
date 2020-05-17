Array.from(document.querySelectorAll("input")).forEach(thisInput=>{
    thisInput.addEventListener("focus", ()=>{
      thisInput.parentNode.classList.add("animate");
      changeRandom(thisInput.parentNode);
      var intervalChange = window.setInterval(()=>{
        changeRandom(thisInput.parentNode);
      }, 1000)
      thisInput.addEventListener("focusout", ()=>{
        thisInput.parentNode.classList.remove("animate");
        window.clearInterval(intervalChange)
      });
    });
  })
    
  function changeRandom(varContainer){
    for (i=1; i<4; i++) {
      varContainer.style.setProperty('--random'+i, (Math.floor(Math.random()*6)-3) + "deg");
    }
    
  
      varContainer.style.setProperty('--random4', 1+(Math.random()/20) );
    varContainer.style.setProperty('--random5', 1+(Math.random()/8) );
  
    
  }