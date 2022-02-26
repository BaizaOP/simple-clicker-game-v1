const upgrades = document.querySelector('#upgrades'),
      click = document.querySelector("#click"),
      display = document.querySelector("#display"),
      SHOW_THRESHOLD = [20, 100, 400, 800, 1500],
      COSTS = SHOW_THRESHOLD.map(e => e * 2.5),
      INCS = [5, 20, 60, 120, 200];

let counter = 0, // the amount of clicks displayed on the screen
    inc = 1;     // how many clicks you get per click of the button

updateText();
checkEnableState(findGreatestNumLessThan(COSTS, counter));

upgrades.childNodes.forEach((el) => {
  if(el.nodeName == "BUTTON") {
    el.addEventListener('click', (e) => {
      counter -= COSTS[idToIndex(el.id)];
      inc += INCS[idToIndex(el.id)];
      checkEnableState(findGreatestNumLessThan(COSTS, counter));
      updateText();
    });
  }
});
      
click.addEventListener('click', (e) => {
  // everytime you click, increment the counter and update the text accordingly
  counter+=inc;
  updateText();
  checkMessageState(findGreatestNumLessThan(SHOW_THRESHOLD, counter));
  checkEnableState(findGreatestNumLessThan(COSTS, counter));
});

// abstracted this away, yeah
function updateText() {
  display.innerText = `Clicks: ${counter}\nInc: ${inc}`;
}

function idToIndex(str) {
  return parseInt(str.slice(7));
}

function findGreatestNumLessThan(arr, num) {
  for(var i = arr.length-1; i >= 0; i--) {
    if(num >= arr[i]) {
      return i;
    }
  }
  return -1;
}

function checkEnableState(index) {
  upgrades.childNodes.forEach((el) => {
    if(el.nodeName == "BUTTON") {
      if(idToIndex(el.id) > index) {
        el.disabled = true;
      } else {
        el.disabled = false;
      }
    }
  });
}

function checkMessageState(index) {
  upgrades.childNodes.forEach((el) => {
    if(el.nodeName == "BUTTON") {
      if(idToIndex(el.id) <= index) {
        el.innerText = `${COSTS[idToIndex(el.id)]} Clicks: +${INCS[idToIndex(el.id)]} inc`;
      }
    }
  });
}
