console.clear();
let proxyCounter = 0;

if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

let cartContainer = document.getElementById('cartContainer');

let boxContainerDiv = document.createElement('div');
boxContainerDiv.id = 'boxContainer';

// DYNAMIC CODE TO SHOW THE SELECTED ITEMS IN YOUR CART
function dynamicCartSection(ob, itemCounter, size, quantity) {
    let boxDiv = document.createElement('div');
    boxDiv.id = 'box';
    boxContainerDiv.appendChild(boxDiv);

    let boxImg = document.createElement('img');
    boxImg.src = ob.preview;
    boxDiv.appendChild(boxImg);

    let boxh3 = document.createElement('h3');
    let h3Text = document.createTextNode(ob.name + ' × ' + itemCounter);
    boxh3.appendChild(h3Text);
    boxDiv.appendChild(boxh3);

    let sizeLabel = document.createElement('p');
    sizeLabel.innerText = 'Size: ' + size;
    boxDiv.appendChild(sizeLabel);

    let quantityLabel = document.createElement('h4');
    quantityLabel.innerText = 'Quantity: ' + quantity;
    boxDiv.appendChild(quantityLabel);

    let plusButton = document.createElement('button');
    plusButton.innerText = '+';
    plusButton.onclick = function () {
        // Increment quantity
        let currentQuantity = parseInt(quantityLabel.innerText.split(':')[1].trim());
        quantityLabel.innerText = 'Quantity: ' + (currentQuantity + 1);
        updateTotalPrice(ob.price);
        proxyCounter += 1;
    };

    let minusButton = document.createElement('button');
    minusButton.innerText = '-';
    minusButton.onclick = function () {
        // Decrement quantity if greater than 1
        let currentQuantity = parseInt(quantityLabel.innerText.split(':')[1].trim());
        if (currentQuantity > 1) {
            quantityLabel.innerText = 'Quantity: ' + (currentQuantity - 1);
            updateTotalPrice(-ob.price); // Subtract price if quantity decreases
        }
        proxyCounter -= 1;
    };

    boxDiv.appendChild(minusButton);
    boxDiv.appendChild(plusButton);

    let boxh4 = document.createElement('h4');
    let h4Text = document.createTextNode('Amount: AUD ' + ob.price);
    boxh4.appendChild(h4Text);
    boxDiv.appendChild(boxh4);

    cartContainer.appendChild(boxContainerDiv);
    cartContainer.appendChild(totalContainerDiv);

    return cartContainer;
}

let totalContainerDiv = document.createElement('div');
totalContainerDiv.id = 'totalContainer';

let totalDiv = document.createElement('div');
totalDiv.id = 'total';
totalContainerDiv.appendChild(totalDiv);

let totalh2 = document.createElement('h2');
let h2Text = document.createTextNode('Total Amount');
totalh2.appendChild(h2Text);
totalDiv.appendChild(totalh2);

let totalPrice = 0; // Track total price

// TO UPDATE THE TOTAL AMOUNT
function amountUpdate(amount) {
    // Clear existing content
    totalDiv.innerHTML = '';

    let totalh4 = document.createElement('h4');
    let totalh4Text = document.createTextNode('Total: AUD  ' + amount);
    
    totalh4.id = 'toth4';
    totalh4.appendChild(totalh4Text);
    totalDiv.appendChild(totalh4);
    totalDiv.appendChild(buttonDiv);
    console.log(totalh4);
}
function updateTotalPrice(priceChange) {
    totalPrice += priceChange;
    amountUpdate(totalPrice);
}

let buttonDiv = document.createElement('div');
buttonDiv.id = 'button';
totalDiv.appendChild(buttonDiv);

let buttonTag = document.createElement('button');
buttonDiv.appendChild(buttonTag);

let buttonLink = document.createElement('a');
buttonLink.href = 'orderPlaced.html'; // Changed the href to orderPlaced.html
buttonTag.appendChild(buttonLink);

let buttonText = document.createTextNode('Place Order');
buttonTag.onclick = function () {
    console.log("Order Placed"); // Log that order is placed
    // Redirect to orderPlaced.html
    window.location.href = 'payment.html';
};
buttonTag.appendChild(buttonText);

// BACKEND CALL
let httpRequest = new XMLHttpRequest();
let totalAmount = 0;
httpRequest.onreadystatechange = function () {
    if (this.readyState === 4) {
        if (this.status == 200) {
            contentTitle = JSON.parse(this.responseText);

            let counter = Number(document.cookie.split(',')[1].split('=')[1]);
            document.getElementById("totalItem").innerHTML = ('Total Items: ' + (counter + proxyCounter));

            let item = document.cookie.split(',')[0].split('=')[1].split(" ");
            console.log(counter);
            console.log(item);

            let i;
            let totalAmount = 0;
            for (i = 0; i < counter; i++) {
                let itemCounter = 1;
                for (let j = i + 1; j < counter; j++) {
                    if (Number(item[j]) == Number(item[i])) {
                        itemCounter += 1;
                        
                    }
                }
                let size = '500g'; // Example size, you should fetch the actual size based on the item
                let quantity = itemCounter; // Example quantity, can be set dynamically as well
                totalAmount += Number(contentTitle[item[i] - 1].price) * itemCounter;
                dynamicCartSection(contentTitle[item[i] - 1], itemCounter, size, quantity);
                i += (itemCounter - 1);
            }
            if (counter === 0) {
                let noItemsMessage = document.createElement('h1');
                noItemsMessage.innerText = 'You have no items in the counter, please add some!';
                cartContainer.appendChild(noItemsMessage);
            } else {
                amountUpdate(totalAmount);
            }
            // Update payment details
            amountUpdate(totalAmount);
        } else {
            console.log('call failed!');
        }
    }
};

httpRequest.open('GET', 'https://mocki.io/v1/65e00564-c1ea-4335-ac45-6d051fb78f26 ', true);
httpRequest.send();
