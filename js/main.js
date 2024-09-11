/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 YOUR NAME
 * MIT License
 * http://link-to-your-git-repo.com
 */

/*document.addEventListener("DOMContentLoaded", function() {});*/

$(document).ready((function() {
    loadPhotos();

    $("#section-intro").paroller({ 
        factor: 0.3, 
        factorSm: 0.2, 
        type: 'background', 
        direction: 'vertical' 
    });  

    $(".details-img").paroller({ 
        factor: 0.2, 
        type: 'background', 
        direction: 'vertical' 
    });

    $(".header-r ul.menu a, .more a").click((function(e) {
        e.preventDefault();
        var aid = $(this).attr("href");
        $('html,body').animate({scrollTop: $(aid).offset().top},'slow');
    }));

    $('.toggler').click((function() {
        $('.header-r ul.menu').toggleClass('active');
    }));

    $('.scrollup').click((function() {
        $('html,body').animate({scrollTop: 0}, 1000);
    }));
    
    if($(window).scrollTop() >= 50){
        $('body').addClass('colorbg');
    }
    else{
        $('body').removeClass('colorbg');
    }
    
    $(window).scroll((function(){
        if($(window).scrollTop() >= 50){
            $('body').addClass('colorbg');
        }
        else{
            $('body').removeClass('colorbg');
        }
    }));

    $(window).on("resize", (function () {
        loadPhotos();
    }));

    /*Slider*/
    const list = $(".slide");
    const navigation = $(".navigation");
    const prev = $(".prev");
    const next = $(".next");

    const changeActive = (id, arr) => {
        arr.each((i, item) => {
            if (id == i) {
                $(item).addClass("active");
            } else {
                $(item).removeClass("active");
            }
        });
    };

    const changeSlide = (number, slide) => {
        const points = $(".point");
        let position = 0;

        list.each((i, item) => {
            if ($(item).hasClass("active")) position = i;
        });

        if (isFinite(slide)) {
            if (slide == position) return;
            changeActive(slide, points);
            changeActive(slide, list);
        } else {
            let nextPosition = position + number;

            if (nextPosition < 0) nextPosition += list.length;
            if (nextPosition >= list.length) nextPosition -= list.length;

            changeActive(nextPosition, points);
            changeActive(nextPosition, list);
        }
    };

    const createNavigation = () => {
        list.each((i, item) => {
            if ($(item).hasClass("active")) {
                navigation.append("<button class='point active'></button>");
            } else {
                navigation.append("<button class='point'></button>");
            }
        });

        navigation.children().each((i, button) => {
            $(button).on("click", () => {
                changeSlide(null, i);
            });
        });
    };

    prev.on("click", () => {
        changeSlide(-1);
    });

    next.on("click", () => {
        changeSlide(1);
    });

    [prev, next, navigation].forEach(item => {
        $(item).on("mouseover", () => {
            clearInterval(timer);
        });
    });

    [prev, next, navigation].forEach(item => {
        $(item).on("mouseout", () => {
            timer = setInterval(timerConstructor, 5000);
        });
    });

    const timerConstructor = () => {
        changeSlide(1);
    };

    let timer = setInterval(timerConstructor, 5000);
    createNavigation();
    /*Slider*/


    $("[data-button]").each((i, item) => {
        $(item).on("click", () => {
            $(".canvas").addClass("active");
            $("body").css("overflow", "hidden");
        });
    });

    $(".canvas").on("click", (e) => {
        if($(e.target).hasClass("canvas")){
            $(".canvas").removeClass("active");
            $("body").css("overflow", "auto");
        }
    });

    $(".close").on("click", (e) => {
        $(".canvas").removeClass("active");
        $("body").css("overflow", "auto");
    });
}));


function loadPhotos() {
    if ($(window).width() > 960) {
        $("#lightgallery").load("photos.html", (function() {
            $("#lightgallery").lightGallery({
                mode: 'lg-fade',
            }); 
        }));
    }
    else {
        $("#lightgallery").load("photos-sm.html", (function() {
            $("#lightgallery").lightGallery({
                mode: 'lg-fade',
            }); 
        }));
    }
}