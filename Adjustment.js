const firstSet = document.getElementById("firstSet");
const secondSet = document.getElementById("secondSet");
const smallMainMenu = document.getElementById("smallMainMenu");

let screenWidth = window.innerWidth;
console.log("Screen width: " + screenWidth); // Debugging line

function rowOrCol() {
    if (screenWidth >= 1080) {
        firstSet.className = "row";
        secondSet.className = "row";
    } else {
        smallMainMenu.className = "row";
    }
}

rowOrCol();