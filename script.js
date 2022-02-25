const upgrade = document.querySelector('#upgrade1'),
      click = document.querySelector("#click"),
      display = document.querySelector("#display");

let counter = 0, // the amount of clicks displayed on the screen
    inc = 1,     // how many clicks you get per click of the button
    unlockMilestone = 20, // how many clicks you have to click through to see the hidden button
    cost = setCost(unlockMilestone), // how many clicks you have to have to buy the upgrade
    collected = false; // have you collected the uppgrade

upgrade.disabled = true; // initially set the upgrade button as disabled



click.addEventListener('click', (e) => {
  // everytime you click, increment the counter and update the text accordingly
  counter+=inc;
  updateText();
  if(counter == unlockMilestone && !collected) {
    upgrade.innerText = `Get Clicker Upgrade: ${cost}`;
  } else if (counter == cost && !collected) {
    upgrade.disabled = false;
  }
});

upgrade.addEventListener('click', (e)=> {
  if(counter >= cost) { // this check is a lil redundant because the button only gets "undisabled" if you have enough clicks
                        // but could be useful for later
    inc += 4;
    counter -= cost;
    updateText();
    collected = true;
   
    upgrade.innerText = "Collected!";
    upgrade.disabled = true;
  }
});

// maybe we can work with this somewhere else...
function setCost(unlockMilestone) {
  return unlockMilestone * 2.5;
}

// abstracted this away, yeah
function updateText() {
  display.innerText = `Clicks: ${counter}`;
}
