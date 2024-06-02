// console.clear();

let contentTitle;

console.log(document.cookie);
function dynamicProductSection(ob) {
  let boxDiv = document.createElement("div");
  boxDiv.id = "box";

  let boxLink = document.createElement("a");
  // boxLink.href = '#'
  boxLink.href = "/contentDetails.html?" + ob.id;
  // console.log('link=>' + boxLink);

  let imgTag = document.createElement("img");
  // imgTag.id = 'image1'
  // imgTag.id = ob.photos
  imgTag.src = ob.preview;

  let detailsDiv = document.createElement("div");
  detailsDiv.id = "details";

  let h3 = document.createElement("h3");
  let h3Text = document.createTextNode(ob.name);
  h3.appendChild(h3Text);

  let h4 = document.createElement("h4");
  let h4Text = document.createTextNode(ob.brand);
  h4.appendChild(h4Text);

  let h2 = document.createElement("h3");
  let h2Text = document.createTextNode("AUD " + ob.price + '.00');
  h2.appendChild(h2Text);

  boxDiv.appendChild(boxLink);
  boxLink.appendChild(imgTag);
  boxLink.appendChild(detailsDiv);
  detailsDiv.appendChild(h3);
  detailsDiv.appendChild(h4);
  detailsDiv.appendChild(h2);

  return boxDiv;
}

//  TO SHOW THE RENDERED CODE IN CONSOLE
// console.log(dynamicProductSection());

// console.log(boxDiv)

let mainContainer = document.getElementById("mainContainer");
let containerProduct = document.getElementById("containerProduct");
let containerAccessories = document.getElementById("containerAccessories");

// BACKEND CALLING

let httpRequest = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", function() {
  fetch('data.json')
    .then(response => response.json())
    .then(contentTitle => {
      if (document.cookie.indexOf(",counter=") >= 0) {
        var counter = document.cookie.split(",")[1].split("=")[1];
        document.getElementById("badge").innerHTML = counter;
      }
      for (let i = 0; i < contentTitle.length; i++) {
        if (contentTitle[i].isAccessory) {
          console.log(contentTitle[i]);
          containerAccessories.appendChild(
            dynamicProductSection(contentTitle[i])
          );
        } else {
          console.log(contentTitle[i]);
          containerProduct.appendChild(
            dynamicProductSection(contentTitle[i])
          );
        }
      }
    })
    .catch(error => {
      console.log("call failed!", error);
    });
});
// httpRequest.open(
//   "GET",
//   "https://mocki.io/v1/65e00564-c1ea-4335-ac45-6d051fb78f26 ",
//   true
// );
// httpRequest.send();


// Function to filter content based on search input
function filterContent() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const ProductItems = document.querySelectorAll("#containerProduct #box");
  const accessoryItems = document.querySelectorAll("#containerAccessories #box");

  // Filter Product items
  ProductItems.forEach(item => {
    const itemName = item.querySelector("h3").textContent.toLowerCase();
    const itemBrand = item.querySelector("h4").textContent.toLowerCase();
    if (itemName.includes(searchInput) || itemBrand.includes(searchInput)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });

  // Filter accessory items
  accessoryItems.forEach(item => {
    const itemName = item.querySelector("h3").textContent.toLowerCase();
    const itemBrand = item.querySelector("h4").textContent.toLowerCase();
    if (itemName.includes(searchInput) || itemBrand.includes(searchInput)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// Event listener for search input
document.getElementById("searchInput").addEventListener("input", filterContent);