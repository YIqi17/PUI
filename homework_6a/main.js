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
    this.tag = tag;
    this.price = price;
    this.inCart = inCart;
}

//new objects
var products = [new Item("no-glazing", "noGlazing", 6, 0), new Item("vanilla", "vanilla", 7, 0), new Item("no-sugar", "noSugar", 6, 0), new Item("chocolate", "chocolate", 7, 0)]
//save cart number on each page
// let hasSavedCart = false;
// window.onload = function(){
//     let productNumbers = sessionStorage.getItem('cartNumbers');
//     if (productNumbers !== null){
//         document.querySelector('.cart span').textContent = productNumbers;
//         hasSavedCart = true;
//     }


// }

const carts = document.getElementsByClassName('add-cart');
// console.log(carts);
// console.log(carts.length);




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
function setItems(products) {
    // console.log("Inside of set Items Function");
    // console.log("My Product is",products);
    let cartItems = sessionStorage.getItem('productInCart');
    cartItems = JSON.parse(cartItems);
    if (cartItems != null) {

        if (cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
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
    console.log(cartCost);
    
    if (cartCost != null){
        //change the parsed string to number
        cartCost = parseInt(cartCost);
        console.log(typeof cartCost);
        //store the itemcost + currentprice
        sessionStorage.setItem('totalCost', cartCost + products.price);
    }else{
        //store the itemcost
        sessionStorage.setItem('totalCost', products.price);
    }
}