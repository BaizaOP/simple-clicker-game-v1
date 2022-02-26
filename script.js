const upgrades = document.querySelector('#upgrades'),
      click = document.querySelector("#click"),
      display = document.querySelector("#display"),
      SHOW_THRESHOLD = [20, 100, 400, 800, 1500],
      COSTS = SHOW_THRESHOLD.map(e => e * 2.5),
      INCS = [5, 20, 60, 120, 200];

let counter = 0, // the amount of clicks displayed on the screen
    inc = 1,     // how many clicks you get per click of the button
    index = 0;

updateText();

upgrades.childNodes.forEach((el) => {
  if(el.nodeName == "BUTTON") {
    el.disabled = true; 
    el.addEventListener('click', (e) => {
      if(index == retIndex(el.id) && counter >= COSTS[index]) { 
        counter -= COSTS[retIndex(el.id)];
        inc = INCS[index]; // level up! 
        index++;
        el.disabled = true;
        updateText();
      }
    });
  }
});
      
click.addEventListener('click', (e) => {
  // everytime you click, increment the counter and update the text accordingly
  counter+=inc;
  updateText();
  if(counter >= SHOW_THRESHOLD[index]) {
    upgrades.childNodes.forEach((e) => {
      if(e.nodeName == "BUTTON" && retIndex(e.id) == index) {
        e.innerText = `${COSTS[index]} Clicks: ${INCS[index]} inc`;
      }
    });
  }
  if(counter >= COSTS[index]) {
    upgrades.childNodes.forEach((e) => {
      if(e.nodeName == "BUTTON" && retIndex(e.id) == index) {
        e.disabled = false;
      }
    });
  }
});

// abstracted this away, yeah
function updateText() {
  display.innerText = `Clicks: ${counter}\nInc: ${inc}`;
}

function retIndex(str) {
  return parseInt(str.slice(7));
}
