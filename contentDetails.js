console.clear()

let id = location.search.split('?')[1]
console.log(id)

if(document.cookie.indexOf(',counter=')>=0)
{
    let counter = document.cookie.split(',')[1].split('=')[1]
    document.getElementById("badge").innerHTML = counter
}

function dynamicContentDetails(ob)
{
    let mainContainer = document.createElement('div')
    mainContainer.id = 'containerD'
    document.getElementById('containerProduct').appendChild(mainContainer);

    let imageSectionDiv = document.createElement('div')
    imageSectionDiv.id = 'imageSection'

    let imgTag = document.createElement('img')
     imgTag.id = 'imgDetails'
     //imgTag.id = ob.photos
     imgTag.src = ob.preview

    imageSectionDiv.appendChild(imgTag)

    let ProductDetailsDiv = document.createElement('div')
    ProductDetailsDiv.id = 'ProductDetails'

    // console.log(ProductDetailsDiv);

    let h1 = document.createElement('h1')
    let h1Text = document.createTextNode(ob.name)
    h1.appendChild(h1Text)

    let h4 = document.createElement('h4')
    let h4Text = document.createTextNode(ob.brand)
    h4.appendChild(h4Text)
    console.log(h4);

    let detailsDiv = document.createElement('div')
    detailsDiv.id = 'details'

    let h3DetailsDiv = document.createElement('h3')
    let h3DetailsText = document.createTextNode('AUD  ' + ob.price + '.00')
    h3DetailsDiv.appendChild(h3DetailsText)

    let h3 = document.createElement('h3')
    let h3Text = document.createTextNode('Description')
    h3.appendChild(h3Text)

    let para = document.createElement('p')
    let paraText = document.createTextNode(ob.description)
    para.appendChild(paraText)

    let ProductPreviewDiv = document.createElement('div')
    ProductPreviewDiv.id = 'ProductPreview'

    let h3ProductPreviewDiv = document.createElement('h3')
    let h3ProductPreviewText = document.createTextNode('Product Preview')
    h3ProductPreviewDiv.appendChild(h3ProductPreviewText)
    ProductPreviewDiv.appendChild(h3ProductPreviewDiv)


     // Add size dropdown
     let sizeLabel = document.createElement('label');
     sizeLabel.for = 'size';
     sizeLabel.innerText = 'Size: ';
 
     let sizeSelect = document.createElement('select');
     sizeSelect.id = 'size';
     let sizes = ['200g', '500g', '1kg'];
     sizes.forEach(size => {
         let option = document.createElement('option');
         option.value = size;
         option.text = size;
         sizeSelect.appendChild(option);
     });

    let i;
    for(i=0; i<ob.photos.length; i++)
    {
        let imgTagProductPreviewDiv = document.createElement('img')
        imgTagProductPreviewDiv.id = 'previewImg'
        imgTagProductPreviewDiv.src = ob.photos[i]
        imgTagProductPreviewDiv.onclick = function(event)
        {
            console.log("clicked" + this.src)
            imgTag.src = ob.photos[i]
            document.getElementById("imgDetails").src = this.src 
            
        }
        ProductPreviewDiv.appendChild(imgTagProductPreviewDiv)
    }

    let buttonDiv = document.createElement('div')
    buttonDiv.id = 'button'


    let buttonTag = document.createElement('button')
    buttonDiv.appendChild(buttonTag)
    buttonTag.id = 'buttonTag'
    let buyTag = document.createElement('button')
    buttonDiv.appendChild(buyTag)


    buttonText = document.createTextNode('Add to Cart')
    buy = document.createTextNode('Buy Now')
    buttonTag.onclick = function() {
        let order = id + " ";
        let counter = 1;
        if (document.cookie.indexOf(',counter=') >= 0) {
            order = id + " " + document.cookie.split(',')[0].split('=')[1];
            counter = Number(document.cookie.split(',')[1].split('=')[1]) + 1;
        }
        document.cookie = "orderId=" + order + ",counter=" + counter;
        document.getElementById("badge").innerHTML = counter;
        console.log(document.cookie);

        // Show the modal
        let modal = document.getElementById("cartModal");
        modal.style.display = "block";
    };
    buttonTag.appendChild(buttonText)
    buyTag.appendChild(buy)

    // Modal close handling
    let modal = document.getElementById("cartModal");
    let span = document.getElementsByClassName("close")[0];
    let viewCartButton = document.getElementById("viewCartButton");

    span.onclick = function() {
        modal.style.display = "none";
    };

    viewCartButton.onclick = function() {
        window.location.href = 'cart.html';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };






    console.log(mainContainer.appendChild(imageSectionDiv));
    mainContainer.appendChild(imageSectionDiv)
    mainContainer.appendChild(ProductDetailsDiv)

    
    ProductDetailsDiv.appendChild(h1)
    ProductDetailsDiv.appendChild(h4)
    ProductDetailsDiv.appendChild(detailsDiv)
    detailsDiv.appendChild(h3DetailsDiv)
    detailsDiv.appendChild(sizeLabel);
    detailsDiv.appendChild(sizeSelect);
    detailsDiv.appendChild(h3)
    detailsDiv.appendChild(para)
    ProductDetailsDiv.appendChild(ProductPreviewDiv)
    
    
    ProductDetailsDiv.appendChild(buttonDiv)


    return mainContainer
}


// Function to make API call and display content details
function fetchAndDisplayContent(id) {
    let httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (this.readyState === 4 && this.status == 200) {
            console.log('API call successful!');
            let contentDetails = JSON.parse(this.responseText);
            // Check if any item in the array has the matching ID
            let matchingProduct = contentDetails.find(Product => Product.id === id);
            if (matchingProduct) {
                dynamicContentDetails(matchingProduct);
            } else {
                console.log("ID doesn't match with any Product in the API response!");
                console.log(contentDetails);
                console.log(id);
            }
        } else {
            console.log('API call failed!');
        }
    };

    httpRequest.open('GET',   "https://mocki.io/v1/65e00564-c1ea-4335-ac45-6d051fb78f26",true);
    httpRequest.send();
}


// Checking for counter in cookies
if (document.cookie.indexOf(',counter=') >= 0) {
    let counter = document.cookie.split(',')[1].split('=')[1];
    document.getElementById("badge").innerHTML = counter;
}

// Triggering API call and content display
fetchAndDisplayContent(id);