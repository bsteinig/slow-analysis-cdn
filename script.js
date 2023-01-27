// get titles from html element with id "titles" delimited by "|||" and store in array
let title = document.getElementById("titles").innerHTML;
let titles = title.split("||");
// get content from html element with id "descs" delimited by "|||" and store in array
let desc = document.getElementById("descs").innerHTML;
let content = desc.split("||");

// get selection coordinates from html element with id "coords" delimited by "|||" and store in array
let coord = document.getElementById("coords").innerHTML;
let coords = coord.split("||");
// convert coords into list of object with startX, startY, endX, endY properties
let coordList = [];
for (let i = 0; i < coords.length; i++) {
  let coord = coords[i].split(",");
  let obj = {
    startX: parseFloat(coord[0]),
    startY: parseFloat(coord[1]),
    endX: parseFloat(coord[2]),
    endY: parseFloat(coord[3]),
  };
  coordList.push(obj);
}

// get aspect ratio from html element with id "aspect" and store in variable
let aspect = parseFloat(document.getElementById("aspect").innerHTML);
document
  .getElementById("img-comp-img")
  .style.setProperty("aspect-ratio", aspect);
document
  .getElementById("img-comp-highlight")
  .style.setProperty("aspect-ratio", aspect);

// get the number of elements in the array
let len = titles.length;
let index = 0;
let comp_title = document.getElementById("comp-title");
let comp_info = document.getElementById("comp-info");
let highlight = document.getElementById("img-comp-highlight");
let mask = document.getElementById("img-comp-mask");

const nextClick = () => {
  ++index;
  index > len - 1 ? (index = 0) : index;
  handleClick();
};

const backClick = () => {
  --index;
  index < 0 ? (index = len - 1) : index;
  handleClick();
};

const handleClick = () => {
  /* Only needs to trigger first time */
  highlight.style.visibility = "visible";

  comp_title.innerHTML = titles[index];
  comp_info.innerHTML = content[index];

  /* set highlight position */
  mask.style.left = coordList[index].startX * 100 + "%";
  mask.style.top = coordList[index].startY * 100 + "%";
  mask.style.width = (coordList[index].endX - coordList[index].startX) * 100 + "%";
  mask.style.height = (coordList[index].endY - coordList[index].startY) * 100 + "%";
};
