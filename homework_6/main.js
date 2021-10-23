var vanilla = document.getElementById('button');
var none = document.getElementById('none');
var sugarFree = document.getElementById('sugar-free');
var choco = document.getElementById('chocolate');
var img = document.getElementById('img');


vanilla.onclick = function(){
    img.src = "img/glazing.png"
}

let buttonArray = [vanilla, none, sugarFree, choco]

function changeImage(a) {
    document.getElementById("img").src=a;
}
