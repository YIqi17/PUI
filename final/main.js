// var overlay = document.getElementById('wave');
// var sect1 = document.getElementById('sect1');
// var btn = document.getElementById('btn-click');
// var morphing = anime({
//     targets:'.wave',
//     d:[
//         {value:'M490.8,0s19.776,56.162-19.677,114.284S351.951,253.078,351.951,382.045,471.405,606.96,505.419,669.476,490.8,816.77,490.8,816.77H632.716V0Z" transform="translate(-351.951)'},
//         {value:'M323.077,0S279.7,36.317,280.326,136.717s42.751,139.229,42.751,268.2-34.553,167.059-35.019,270.018S311.34,816.77,311.34,816.77H632.716V0Z" transform="translate(-280.319)'},
//         {value:'M252.78,0s-.627,41.234,0,141.634,0,145.047,0,274.015.466,159.947,0,262.9,0,138.216,0,138.216H632.716V0Z'},
//     ],
//     easing:'easeInOutQuint',
//     duration:1200,
//     loop:false,
// });

function ani() {
    document.getElementById('sect1').className = 'transition';
    // document.getElementById('background').className = 'transition';
  }

//Add strike through for selected navigation
function addStrike(){
    var navElement = document.getElementsByClassName('nav-self');
    navElement.className += "del";
}