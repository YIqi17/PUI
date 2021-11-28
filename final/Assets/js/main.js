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

//Barba + GSAP animation
function init(){
    
    const loader = document.querySelector('.loader');

    // reset position of the loading screen
    gsap.set(loader, {
        scaleX: 0, 
        rotation: 10, 
        xPercent: -5,
        yPercent: -50, 
        transformOrigin: 'left center', 
        autoAlpha: 1
    });

    function loaderIn() {
        // GSAP tween to stretch the loading screen across the whole screen
        return gsap.fromTo(loader, 
            {
                rotation: 10,
                scaleX: 0,
                xPercent: -5
            },
            { 
                duration: 0.8,
                xPercent: 0,
                scaleX: 1, 
                rotation: 0,
                ease: 'Power4.inOut', 
                transformOrigin: 'left center'
            });
    }

    function loaderAway() {
        // GSAP tween to hide the loading screen
        return gsap.to(loader, { 
            duration: 0.8, 
            scaleX: 0,
            xPercent: 5, 
            rotation: -10, 
            transformOrigin: 'right center', 
            ease: 'Power4.inOut'
        });
    }

    // do something before the transition starts
    barba.hooks.before(() => {

        document.querySelector('html').classList.add('is-transitioning');
        barba.wrapper.classList.add('is-animating');

    });

    // do something after the transition finishes
    barba.hooks.after(() => {

        document.querySelector('html').classList.remove('is-transitioning');
        barba.wrapper.classList.remove('is-animating');

    });

    // scroll to the top of the page
    barba.hooks.enter(() => {

        window.scrollTo(0, 0);

    });

    barba.init({
        transitions: [{
            async leave() {
                await loaderIn();
        
            },
            enter() {
                loaderAway();
            }
        }]
    })

}

window.addEventListener('load', function(){
    init();
});



$(function() {
    var selectedClass = "";
    $("p").click(function(){
    selectedClass = $(this).attr("data-rel");
$("#portfolio").fadeTo("fast", 0.1);
    $("#portfolio div").not("."+selectedClass).fadeOut();
setTimeout(function() {
  $("."+selectedClass).fadeIn();
  $("#portfolio").fadeTo(500, 1);
}, 500);
    
});
});



$(".grid").imagesLoaded(function() {
    $(".grid").masonry({
      itemSelector: ".grid-item"
    });
  });

  