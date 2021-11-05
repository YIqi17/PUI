var vanilla = document.getElementById('button');
var none = document.getElementById('none');
var sugarFree = document.getElementById('sugar-free');
var choco = document.getElementById('chocolate');
var chooseNumber = document.getElementsByClassName('chooseNumber');
var input = document.getElementsByName('buttonGroup');
// input.addEventListener("click",function(){
//         img.setAttribute("src", "img/glazing-sugar.png");
// });

var arrayImage = ['img/no-glazing.png', 'img/glazing-sugar.png', 'img/glazing.png', 'img/choco-glazing-sugar.png']


function showGlazingValue() {
    for (i = 0; i < input.length; i++) {
        if (input[i].checked) {
            document.getElementById("chosenGlazing").innerHTML
                = "glazing-" + input[i].value;
            document.getElementById('img').setAttribute("src", arrayImage[i]);

        }
        // console.log(document.getElementById('chosenGlazing').innerHTML);

    }
}
// constructor
function Item(name, tag, price, inCart) {
    this.name = name;
    //get images
    this.tag = tag;
    this.price = price;
    this.inCart = inCart;
}

//new objects
var products = [new Item("original with no-glazing", "no-glazing", 6, 0), new Item("original with vanilla", "glazing-sugar", 7, 0), new Item("original with no-sugar", "glazing", 6, 0), new Item("original with chocolate", "choco-glazing-sugar", 7, 0)]


const carts = document.getElementsByClassName('add-cart');
// console.log(carts);
// console.log(carts.length);
const minus = document.getElementsByClassName('fa-minus-circle');
const plus = document.getElementsByClassName('fa-plus-circle');


//click 1 , cart + 1
for (let i = 0; i < carts.length; i++) {
    // console.log('loop');
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        // console.log('added to cart');
        totalCost(products[i]);
    })
}
//Ensure all page remember
window.onload = function onloadCartNumbers() {
    let productNumbers = sessionStorage.getItem('cartNumbers');
    if (productNumbers) {
        document.querySelector('.cart span').textContent = "Cart(" + productNumbers + ")";
    }
}


//Set +1 to the cart
function cartNumbers(products) {
    // console.log('The product clicked is,',products)
    let productNumbers = sessionStorage.getItem('cartNumbers');
    //change back to number
    productNumbers = parseInt(productNumbers);
    if (productNumbers) {
        //one click = older one + 1
        sessionStorage.setItem('cartNumbers', productNumbers + 1)
        document.querySelector('.cart span').textContent = "Cart(" + (productNumbers + 1) + ")";
    } else {
        sessionStorage.setItem('cartNumbers', 1); //sets to one to begin with once clicked
        document.querySelector('.cart span').textContent = "Cart(" + 1 + ")"
    }
    setItems(products);
}
//save cart items to session storage
function setItems(products) {
    // console.log("Inside of set Items Function");
    // console.log("My Product is",products);
    let cartItems = sessionStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    //Tried to call local storage and does not have it, it will add a cart item
    if (cartItems != null) {
    
        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        //add one to product.incart
        cartItems[products.tag].inCart += 1;
    }
    else {
        products.inCart = 1;
        cartItems = {
            [products.tag]: products
        }
    }


    sessionStorage.setItem("productInCart", JSON.stringify(cartItems));
}

function totalCost(products){
    //set totalcost to current clicked element + the existing item in cart
    let cartCost = sessionStorage.getItem('totalCost');

    
    if (cartCost != null){
        //change the parsed string to number
        cartCost = parseInt(cartCost);
        
        //store the itemcost + currentprice
        sessionStorage.setItem('totalCost', cartCost + products.price);
    }else{
        //store the itemcost
        sessionStorage.setItem('totalCost', products.price);
    }
}
function displayCart(){
    let cartItems = sessionStorage.getItem('productInCart');
    let cartCost = sessionStorage.getItem('totalCost');
    //parse the storage
    cartItems = JSON.parse(cartItems);
    // console.log(cartItems);
    let productContainer = document.querySelector('.item-container');
    if (cartItems && productContainer ){
        //set product-container to be empty
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            // console.log(item);
            //everytime add a new product item to product-container
            productContainer.innerHTML += `
            <div class = 'products-wrapper'>
            <div class="products">
                <i class="fa fa-times-circle remove" onclick = "removeItem('${escape(JSON.stringify(item))}')"></i>
                <img src="img/${item.tag}.png" class="product-image">
                <span class="product-title">${item.name}</span>
            </div>
            <div class="product-price">$${item.price},00</div>
            <div class="product-quantity">
                <i class="fa fa-minus-circle"></i>
                <span class="product-number">${item.inCart}</span>
                <i class="fa fa-plus-circle"></i>
            </div>
            <div class="product-total">
            $${item.inCart* item.price},00
            </div> 
            </div> 
            `;
            // var list_btns = document.getElementsByClassName('remove')
            // var button =  list_btns[list_btns.length - 1]
            // console.log(item)
            // console.log(button)
            // console.log(list_btns.length)
            // button.addEventListener('click', function (event) {
            //     console.log('clicked')

            //     var buttonClicked = event.target;
            //     buttonClicked.parentElement.parentElement.remove();
            //     // updateCartTotal();
            // })
            // console.log(button)

            
        });

        productContainer.innerHTML += `
        <hr>
        <div class = "basketTotalContainer">
        <h1 class="basketTotalTitle">
        Total
        </h1> 
        <h1 class="entireTotal">
        $${cartCost}.00
        </h1> 
        </div>
        <!-- <p>Shipping and Tax not included</p> -->
        <button class="button"><span>Check Out Cart</span>
        `
    }
    // var removeCartItemButton = document.getElementsByClassName('remove')
    // // console.log(removeCartItemButton);
    // //remove the row of cart items
    // for (var i = 0; i < removeCartItemButton.length; i++) {
    //     var button = removeCartItemButton[i]
    //     button.addEventListener('click', function (event) {
    //         // console.log('clicked')
    //         var buttonClicked = event.target;
    //         var rowClicked = buttonClicked.parentNode.parentNode;
    //         rowClicked.remove();
    //         if(sessionStorage.getItem('productInCart')){
    //             cart = JSON.parse(sessionStorage.getItem('productInCart'));
    //         }
    //         // remove

    //         updateCartTotal();

    //     })
    // }
    // function updateCartTotal() {
    //     var cartRow = document.getElementsByClassName('products-wrapper')[0];
    //     for (var i = 0; i < cartRow.length; i++) {
    //         var cartRow = cartRow[i]
    //         var priceElement = cartRow.getElementsByClassName('c')
    //     }

    // }
}






// function plusCart(products) {
//     let cartItems = sessionStorage.getItem('productInCart');
//     cartItems = JSON.parse(cartItems);
//     for (let i = 0; i < plus.length; i++) {
//         // console.log('loop');
//         plus[i].addEventListener('click', () => {
//             cartNumbers(products[i]);
//             totalCost(products[i]);
            
//         })
//     }
// }

function removeItem(objString) {
    obj = JSON.parse(unescape(objString))
    // retrieve the stored value of the cart items so that we can modify it
    var cartItemsString = sessionStorage.getItem("productInCart")
    var cartCost = sessionStorage.getItem('totalCost');
    var cartNumber = sessionStorage.getItem('cartNumbers');
    if (cartItemsString !== null) {
        var cartItems = JSON.parse(cartItemsString) // successfully loaded in the cart items
        if (cartTotal !== null){
            var cartTotal = parseInt(cartCost)
            console.log(parseInt([obj.price]))
            cartTotal = cartTotal - ([obj.price]*[obj.inCart])
            sessionStorage.setItem("totalCost", JSON.stringify(cartTotal))
            // re-render the page to reflect change
        }
        if (cartNumber !== null){
            var cartNumber = parseInt(cartNumber)
            cartNumber = cartNumber -[obj.inCart]
            sessionStorage.setItem("cartNumbers", JSON.stringify(cartNumber))
            
        }
        // console.log(cartItems);
        delete cartItems[obj.tag];
        sessionStorage.setItem("productInCart", JSON.stringify(cartItems))
        displayCart();
        let productNumbers = sessionStorage.getItem('cartNumbers');
        if (productNumbers) {
            document.querySelector('.cart span').textContent = "Cart(" + productNumbers + ")";
        }
    }


}
displayCart();







