$(document).ready(function() {

    var lang = "en";

    if($("html").attr("lang") == "fr-CA" || $("html").attr("lang") == "fr" ) {
        lang = "fr";
        // console.log("lang", lang)
    }

    var MARGIN_DESKTOP = 16;
    var MARGIN_MOBILE = 8;

    var isAnimationInProgress = false;

    var windowWidth = $(window).width();

    var cardContainerHeight = 0;


    $(window).on('load', function() {
        setTimeout(function() {
            setCardExpandableMargins();
            sameHeightBoxes();
            scaleFlipCallouts();
            setVantageBanner();
            featureTableBorder();
            vantageCollapse();
        }, 750);

    });

    var resizeFunctions = debounce(function() {

        if($(window).width() != windowWidth) {
            setCardExpandableMargins();
            sameHeightBoxes();
            scaleFlipCallouts();
            setVantageBanner();
            featureTableBorder();
            vantageCollapse();
            windowWidth = $(window).width();
        }

    }, 250);

    window.addEventListener('resize', resizeFunctions);

    $('#vantageCollapse').on('shown.bs.collapse', function () {
        setCardExpandableMargins();
        sameHeightBoxes();
        scaleFlipCallouts();
        setVantageBanner();
        featureTableBorder();
        vantageCollapse();
        $('#vantageExpand').slick('setPosition');
    })

    $(".flip-callout-back").attr("aria-hidden", true);
    $(".flip-callout-front").attr("aria-hidden", false);


    if ($('.flip-callout .plus-btn').length) {


        $('.flip-callout .flip-callout-front').on('click', function() {

            if($(this).hasClass("hover")) {
                $(".flip-callout-back").attr("aria-hidden", true);
                $(".flip-callout-front").attr("aria-hidden", false);


                // $(this).show();
            }
            else {
                $(this).parent().find(".flip-callout-back").show();

            }

            $(this).closest('.flip-callout').toggleClass("hover");

            var _this = this;
            setTimeout(function() {
                $(_this).closest('.flip-callout').attr("tabindex", -1).focus();
            }, 750);
        });

        $('.flip-callout .close-btn').on('click', function() {

            if($(this).closest('.flip-callout').hasClass("hover")) {
                $(".flip-callout-back").attr("aria-hidden", true);
                $(".flip-callout-front").attr("aria-hidden", false);
            }
            else {
                $(".flip-callout-back").attr("aria-hidden", false);
                $(".flip-callout-front").attr("aria-hidden", true);
            }

            $(this).closest('.flip-callout').toggleClass("hover");

            var _this = this;
            setTimeout(function() {
                $(_this).closest('.flip-callout').find(".plus-btn").focus();
                $(_this).closest('.flip-callout-inner').find(".flip-callout-back").hide();
            }, 750);
        });
    }

    if ($('#value-program-select').length) {

        $('#value-program-select').val("ee");
        $(".value-program-accordion").hide();
        $("#ee").show();

        $('#value-program-select').on('change', function() {
            $(".value-program-accordion").hide();
            $("#" + $(this).val()).show();
        });
    }

    //Expandable cards
    if ($('.card-expandable').length) {
        $('.card-expandable').find(".card-expandable-full").hide();
        $('.card-expandable').on('click', function(e) {

            // console.log("card-expandable click e", e);

            if(isAnimationInProgress) return;

            if ($(this).hasClass('expanded')) {
                return;
            }

            if (e.target.className.indexOf("trigger-icon") > -1 || e.target.className.indexOf("scrollto") > -1 || e.target.className.indexOf("tooltip-trigger") > -1) {
                return;
            }

            isAnimationInProgress = true;

            $(this).addClass("move-to-front");
            $(this).find(".card-expandable-excerpt").addClass("faded");
            $(this).find(".card-expandable-full").show();

            var _this = this;
            setTimeout(function() {
                $(_this).toggleClass("expanded");

                if ($(_this).hasClass("card-expandable-calc")) {
                    if ($(window).outerWidth() < 640) {
                        $(_this).css('width', $(_this).closest(".card-expandable-container").outerWidth());
                        $(_this).css('height', 'auto');
                    } else {
                        $(_this).css('width', $(_this).closest(".grid-wpr").outerWidth() - $(_this).closest(".grid-half").css('padding-right').replace("px", "") * 2 + 2);
                        $(_this).css('left', "0");

                        $(_this).css('height', $(_this).closest(".card-expandable-container").outerHeight() + 120);

                        // if($(window).outerWidth() >= 640 && $(window).outerWidth() <= 1200) {
                        //     console.log("asdasdaadas", $(_this).find(".calc-widget").outerHeight());
                        //     $(_this).css('height', $(_this).find(".calc-widget").outerHeight());
                        // }
                        // else {
                        //     $(_this).css('height', $(_this).closest(".card-expandable-container").outerHeight());
                        // }

                    }
                } else {
                    $(_this).css('width', $(_this).closest(".card-expandable-container").outerWidth());
                    $(_this).css('height', $(_this).closest(".card-expandable-container").outerHeight());
                }

            }, 500);
            setTimeout(function() {
                $(_this).find(".card-expandable-full").removeClass("faded");

                $(_this).attr("tabindex", -1).focus();

                $(_this).find(".card-expandable-excerpt").hide();



                $('.card-expandable:not(.expanded)').each(function() {
                    $(this).hide();
                    $(this).attr("aria-hidden", true);
                });

                if($(window).outerWidth() >= 640 && $(window).outerWidth() <= 1200) {

                    if ($(_this).hasClass("card-expandable-calc")) {
                        $(_this).closest(".grid-wpr").find(".callout-navy").hide();
                    }

                    $(_this).css('height', $(_this).find(".calc-widget").outerHeight() + 80);

                    $cardContainer = $(_this).closest(".grid-wpr").find(".card-expandable-container");
                    cardContainerHeight = $cardContainer.css('height');
                    $cardContainer.css('height', $(_this).find(".calc-widget").outerHeight() - 30);
                }


            }, 1000);


            setTimeout(function() {
                if($(window).outerWidth() < 640 && $(_this).hasClass("card-expandable-calc")) {
                    // console.log("calc-widget height", $(_this).find(".calc-widget").outerHeight());
                    $cardContainer = $(_this).closest(".grid-wpr").find(".card-expandable-container");
                    $cardContainer.css('min-height', $(_this).find(".calc-widget").outerHeight() - 30);
                }

                isAnimationInProgress = false;
            }, 2000);




        });

        // Make this  $('.card-expandable-full') to make the whole card clickable
        // $('.card-expandable .close-btn').on('click', function(e) {
        $('.card-expandable-full').on('click', function(e) {

            if(isAnimationInProgress) return;

            if (e.target.className.indexOf("trigger-icon") > -1 || e.target.className.indexOf("scrollto") > -1 || e.target.className.indexOf("tooltip-trigger") > -1) {
                return;
            }

            if($(this).closest('.card-expandable').hasClass("card-expandable-calc") && $(this).closest('.card-expandable').hasClass("expanded") && e.target.className.indexOf("close-btn") == -1) {

                // console.log("e.target.className", e.target.className);
                return;
            }

            isAnimationInProgress = true;

            e.stopPropagation();

            $('.card-expandable:not(.expanded)').each(function() {
                $(this).show();
                $(this).attr("aria-hidden", false);
            });

            $(this).closest('.card-expandable').find(".card-expandable-full").addClass("faded");

            var _this = this;
            setTimeout(function() {

                $(_this).closest('.card-expandable').find(".card-expandable-excerpt").show();
                $(_this).closest(".grid-wpr").find(".callout-navy").show();

                if ($(_this).closest('.card-expandable').hasClass("card-expandable-calc")) {
                    // $(_this).css('width', $(_this).closest(".grid-wpr").outerWidth());
                    $(_this).closest('.card-expandable').css('left', "auto");
                }

                if($(window).outerWidth() >= 640 && $(window).outerWidth() <= 1200) {
                    $cardContainer = $(_this).closest(".grid-half").find(".card-expandable-container");
                    $cardContainer.css('height', cardContainerHeight);
                }

                if ($(window).outerWidth() < 640) {
                    $cardContainer = $(_this).closest(".grid-half").find(".card-expandable-container");
                    $cardContainer.css('min-height', 'auto');

                    $(_this).closest('.card-expandable').css('width', ($(_this).closest(".card-expandable-container").outerWidth() - 8) / 2);
                    $(_this).closest('.card-expandable').css('height', ($(_this).closest(".card-expandable-container").outerHeight() - 8) / 2);



                } else {
                    $(_this).closest('.card-expandable').css('width', ($(_this).closest(".card-expandable-container").outerWidth() - 16) / 2);
                    $(_this).closest('.card-expandable').css('height', ($(_this).closest(".card-expandable-container").outerHeight() - 16) / 2);
                }

            }, 500);


            var _this = this;
            setTimeout(function() {
                $(_this).closest('.card-expandable').find(".card-expandable-excerpt").removeClass("faded");

                $(_this).closest('.card-expandable').removeClass("move-to-front");
                $(_this).closest('.card-expandable').removeClass("expanded");
                $(_this).closest('.card-expandable').find(".plus-btn").focus();
                $('.card-expandable .card-expandable-full').hide();

                isAnimationInProgress = false;
            }, 1000);
        });

    }

    function setVantageBanner() {

        if($(".animated-h1-container").length) {

            var height = $(".animated-h1-container").find(".first").outerHeight();
            // console.log("setVantageBanner", height);
            // console.log("elementid", document.getElementById("animated-h1-container"));

            var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

            if(!isIE11) {
                document.getElementById("animated-h1-container").animate([
                  { height: '0px' },
                  { height:  height}
                ], {
                  duration: 200,
                  iterations: 1
                });
            }
            else {
                $("#animated-h1-container").css("height", height);
            }


            $(".animated-h1-container").css("height",$(".animated-h1-container").find(".first").outerHeight() + 10);
        }
    }

    function scaleFlipCallouts() {
        // console.log("scaling");
        if ($('.flip-callout .plus-btn').length) {

            setTimeout(function() {
                $('.flip-callout').each(function() {

                    $(this).find(".flip-callout-back").show();
                    var $footerLink = $(this).find(".flip-callout-back").find(".flip-callout-back-content").find(".flip-callout-footer a");
                    if($footerLink.length) {
                        var contentHeight = $(this).find(".flip-callout-back-content").outerHeight() + $footerLink.outerHeight() + 40 + 15;
                    }
                    else {
                        var contentHeight = $(this).find(".flip-callout-back-content").outerHeight() + 40;
                    }


                    if(contentHeight < 215) contentHeight = 215;

                    $(this).css("min-height", contentHeight);
                    $(this).css("height", contentHeight);
                    $(this).find(".flip-callout-inner").css("transform-origin", "100% " + contentHeight / 2 + "px");

                    $(this).find(".flip-callout-back").hide();
                });
            }, 800);

        }
    }


    function setCardExpandableMargins() {
        if ($('.card-expandable').length) {
            // console.log("fire setCardExpandableMargins");
            var cardExpandableMargin = MARGIN_DESKTOP;

            if ($(window).outerWidth() < 640) {
                cardExpandableMargin = MARGIN_MOBILE;
            }


            $('.card-expandable-container, .card-expandable:not(.expanded)').each(function() {
                $(this).css('height', 'auto');
            });




            $('.card-expandable-container').each(function() {
                if ($(window).outerWidth() < 640) {
                    $(this).css('width', $(this).closest(".grid-half").width() - 16);
                } else {
                    $(this).css('width', $(this).closest(".grid-half").width());
                }
            });

            $('.card-expandable:not(.expanded)').each(function() {
                $(this).css('width', ($(this).closest(".card-expandable-container").outerWidth() - cardExpandableMargin) / 2);
                // $(this).css('height', maxHeight + 40);
            });

            setTimeout(function(){
                var maxHeight = Math.max.apply(null, $(".card-expandable-excerpt").map(function() {
                    return $(this).outerHeight();
                }).get());

                // console.log("maxHeight", maxHeight);


                $('.card-expandable:not(.expanded)').each(function() {
                    // $(this).css('width', ($(this).closest(".card-expandable-container").outerWidth() - cardExpandableMargin) / 2);
                    $(this).css('height', maxHeight + 40);
                });
            }, 300);




            // return false;

            setTimeout(function(){

            $('.card-expandable-container').each(function() {
                $(this).css('height', 2 * $(this).find(".card-expandable").outerHeight() + cardExpandableMargin);
            });

            $('.card-expandable.expanded').each(function() {

                if ($(this).hasClass("card-expandable-calc")) {
                    if ($(window).outerWidth() < 640) {
                        $(this).css('left', "auto");
                        $(this).css('width', $(this).closest(".card-expandable-container").outerWidth());
                        $(this).css('height', 'auto');

                    } else {
                        // console.log("here's the landscape problem");
                        $(this).css('left', "0");
                        $(this).css('width', $(this).closest(".grid-wpr").outerWidth() - $(this).closest(".grid-half").css('padding-right').replace("px", "") * 2);

                        $(this).css('height', $(this).closest(".card-expandable-container").outerHeight() + 25);

                        if($(window).outerWidth() >= 640 && $(window).outerWidth() <= 900) {
                            // console.log("calc widget height", $(this).find(".calc-widget").outerHeight());
                            // $(this).css('height', $(this).find(".calc-widget").outerHeight() + 80);
                            $(this).css('height', $(this).closest(".card-expandable-container").outerHeight() + 100);
                        }
                        else if ($(window).outerWidth() < 640){
                            $(this).css('height', $(this).closest(".card-expandable-container").outerHeight() + 25);
                        }
                        else {
                            $(this).css('height', $(this).closest(".card-expandable-container").outerHeight() + 120);
                        }

                    }
                } else {
                    $(this).css('width', $(this).closest(".card-expandable-container").outerWidth());
                    $(this).css('height', $(this).closest(".card-expandable-container").outerHeight());
                }

                $cardContainer = $(this).closest(".grid-wpr").find(".card-expandable-container");

                // if(cardContainerHeight > $cardContainer.css('height')) {
                //     console.log("bigger");
                // }
                // else {
                //     console.log("smaller");
                // }

                cardContainerHeight = $cardContainer.css('height');

            });

            }, 600);

        }

    }


    //same-height-boxes
    function sameHeightBoxes() {
        if ($(".same-height-boxes").length) {

            if ($(window).outerWidth() >= 640) {

                $(".same-height-boxes").each(function() {

                    var boxes = $(this).attr("data-box").split(",");
                    var applyAll = $(this).attr("data-apply-all");
                    var isCollapsible = $(this).attr("data-collapsible") || false;
                    for(var i = 0; i < boxes.length; i ++) {
                        //
                        // if( $(this).attr("data-l-col") && $(this).attr("data-r-col")) {
                        //     var $left = $(this).find("." + $(this).attr("data-l-col"));
                        //     var $right = $(this).find("." + $(this).attr("data-r-col"));
                        // }
                        // else {
                            var $left = $(this).find(".grid-half")[0];
                            var $right = $(this).find(".grid-half")[1];
                        // }

                        $($left).find("." + boxes[i]).each(function(j) {

                            var $rightbox = $($right).find("." + boxes[i])[j];

                            if(isCollapsible) var prop = "min-height";
                            else var prop = "height";

                            if ($(this).outerHeight() > $($rightbox).outerHeight()) {
                                 $($rightbox).css(prop, $(this).outerHeight());


                                 if(applyAll == "true") $(this).css(prop, $(this).outerHeight());
                            }
                            else {
                                $(this).css(prop, $($rightbox).outerHeight());

                                if(applyAll == "true")  $($rightbox).css(prop, $($rightbox).outerHeight());
                            }
                        });
                    }
                });
            }
            else {
                $(".same-height-boxes").each(function() {
                    var boxes = $(this).attr("data-box").split(",");
                    var applyAll = $(this).attr("data-apply-all");
                    for(var i = 0; i < boxes.length; i ++) {
                        $("." + boxes[i]).each(function(i) {


                            if(applyAll == "true") {
                                $(this).css('height', $(this).outerHeight());
                            }
                            else {
                                $(this).css('height', 'auto');
                            }
                        });
                    }
                });
            }
        }
    }

    //same-height-boxes
    function featureTableBorder() {
        if ($(".feature-table-border").length) {

            if ($(window).outerWidth() >= 640) {

                $(".feature-table-border").each(function() {

                    var box = "." + $(this).attr("data-box");

                    $(this).find(box).css('height', 'auto');

                    var maxHeight = 0;

                    $(this).find(box).each(function(){
                       if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
                    });

                    $(this).find(box).css('height', maxHeight);
                });
            }
            else {
                $(".feature-table-border").each(function() {

                    var box = "." + $(this).attr("data-box");

                    $(this).find(box).css('height', 'auto');
                });
            }
        }
    }


    function deferSlider(method) {
        var my_range = $(".slider-wpr").find('.slider > input').data("ionRangeSlider");
        if (my_range) {
            method();
        } else {
            setTimeout(function() { deferSlider(method) }, 50);
        }
    }





    if ($('#account_transaction_slider').length) {

        deferSlider(function () {

            $('.slider-continue').attr("aria-label", "continue to find an account tool");

            setTimeout(function() {
                $('.irs-grid-pol').each(function() {
                    // console.log($(this).attr("style"));

                    if ($(this).attr("style") == "left: 100%") {
                        $(this).addClass('last');
                    }
                });

                $(".irs-slider").attr("tabindex", 0);
                $(".irs-slider").attr("aria-label", "Transaction number 0, please use left/right arrow to change");
                $('#account_transaction_slider').attr("role", "application");
                $('.irs-with-grid').attr("aria-hidden", false);


            }, 300);


            setInterval(function() {
                if ($('#transactions_number').val() == 25) {
                    $(".irs-slider").html("<span>25+</span>");
                }
                else {
                    $(".irs-slider").html("<span>" + $('#transactions_number').val() + "</span>");
                }

            }, 100);



            $('.slider-continue').on('click', function(e) {
                e.preventDefault();
                var link = $(this).attr('href') + $("#transactions_number").val();
                window.open(link, "_blank").focus();
            });


            $("body").on('keydown', '.irs-slider', function(e) {



                var keyCode = e.keyCode || e.which;

                var my_range = $(".slider-wpr").find('.slider > input').data("ionRangeSlider");



                // 3. Update range slider content (this will change handles positions)
                // my_range.update({
                //     from: 300,
                //     to: 400
                // });

                //left arrow
                if (keyCode == 37) {
                    e.preventDefault();
                    // console.log("left arrow", $('#transactions_number').val());
                    if($('#transactions_number').val() > 0) {
                        $('#transactions_number').val(parseInt($('#transactions_number').val()) - 1);

                        my_range.update({
                            from: $('#transactions_number').val()
                        });

                        $(".irs-slider").attr("aria-label", "Transaction number " + $('#transactions_number').val() + ", please use left/right arrow to change");


                        $(".irs-slider").attr("tabindex", 0).focus();
                        $('.irs-grid-pol').each(function() {
                            // console.log($(this).attr("style"));

                            if ($(this).attr("style") == "left: 100%") {
                                $(this).addClass('last');
                            }
                        });
                    }

                }
                //right arrow
                else if(keyCode == 39) {
                    e.preventDefault();
                    // console.log("right arrow", $('#transactions_number').val());
                    if($('#transactions_number').val() < 25) {
                        $('#transactions_number').val(parseInt($('#transactions_number').val()) + 1);

                        // console.log("my_range", my_range);
                        my_range.update({
                            from: $('#transactions_number').val()
                        });

                        $(".irs-slider").attr("aria-label", "Transaction number " + $('#transactions_number').val() + ", please use left/right arrow to change");


                        $(".irs-slider").attr("tabindex", 0).focus();
                        $('.irs-grid-pol').each(function() {
                            // console.log($(this).attr("style"));

                            if ($(this).attr("style") == "left: 100%") {
                                $(this).addClass('last');
                            }
                        });


                    }
                }
            });

        });



    }



    //account buttons
    $('.account-btns-open').on('click', function(e) {

        if ($(this).attr("aria-label") == "collapsed") {
            $(this).attr("aria-label", "expanded");
        } else {
            $(this).attr("aria-label", "collapsed");
        }
        // e.stopPropagation();
        // $(this).closest('.grey-box').find(".account-btns-container").show();
        // $(this).closest('.grey-box').find(".account-btns-container").attr("tabindex", -1).focus();
        $(this).closest('.grey-box').toggleClass("expanded");

        if ($(this).attr("aria-label") == "collapsed") {
            $(this).closest('.grey-box').css("height", $(this).closest('.grey-box').outerHeight() - 50);
        }
        else {

            $(this).closest('.grey-box').css("height", $(this).closest('.grey-box').outerHeight() + 50);
        }


    });


    //
    // $('.custom-focus').on('blur', function(e) {
    //
    //     var id = $(this).attr('focus-fwd');
    //
    //     $("#" + id).focus();
    //
    // });

    $(".card-expandable-full .standalone-link").on('keydown', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9) {

            if(!e.shiftKey) {
                e.preventDefault();
                $(this).closest(".card-expandable-full").find(".close-btn").focus();
            }
        }
    });

    $(".card-expandable-full .close-btn").on('keydown', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9) {

            if(e.shiftKey) {
                e.preventDefault();
                $(this).closest(".card-expandable-full").find(".standalone-link").focus();
            }
        }
    });

    $('.custom-focus').on('keydown', function(e) {
        var keyCode = e.keyCode || e.which;


        var id = "";
        if (keyCode == 9) {

            if(e.shiftKey) {
                // console.log("shift-tab");
               //Focus previous

               id = $(this).attr('focus-prev');

               // console.log('id', "#" + id);

                if(id != "" && id != undefined) {
                    e.preventDefault();
                    // console.log("focusing");
                    $("#" + id).focus();
                }
            }
            else {
                // console.log("tab");
               //Focus next input
               id = $(this).attr('focus-next');

               // console.log('id', "#" + id);
               if(id != "" && id != undefined) {
                   // console.log("focusing");
                   e.preventDefault();
                   $("#" + id).focus();
               }
            }
        }
    });



    $(".flip-callout-back .close-btn").on('keydown', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode == 9) {

            if(e.shiftKey) {
                e.preventDefault();

            }
            else {
                e.preventDefault();
                $(this).closest(".flip-callout-back").find(':focusable').eq(0).focus();
            }
        }
    });


    // $('.account-btns-close').on('click', function(e) {
    //     e.stopPropagation();
    //     // $(this).closest('.grey-box').find(".account-btns-container").hide();
    //     $(this).closest('.grey-box').attr("tabindex", -1).focus();
    //     $(this).closest('.grey-box').removeClass("expanded");
    // });

    // $('.account-btns-container').on('click', function(e) {
    //     e.stopPropagation();
    // });

    // $('.grey-box').on('click', function(e) {
    //     // $(this).find(".account-btns-container").hide();
    //     $(this).attr("tabindex", -1).focus();
    //     $(this).removeClass("expanded");
    // });

    $('.expand-btn').on('click', function(e) {
        let controlled = $(this).attr("data-controls");
        $("#" + controlled).addClass("expanded");

        $(this).closest(".collapsible-controls").find(".controls-collapsed").toggleClass("hide");
        $(this).closest(".collapsible-controls").find(".controls-expanded").toggleClass("hide");
    });

    $('.collapse-btn').on('click', function(e) {
        let controlled = $(this).attr("data-controls");
        $("#" + controlled).removeClass("expanded");

        $(this).closest(".collapsible-controls").find(".controls-expanded").toggleClass("hide");
        $(this).closest(".collapsible-controls").find(".controls-collapsed").toggleClass("hide");
    });

    $('.feature-box .hidden-content').hide();

    $('.expand-toggle').on('click', function(e) {
        let controlled = $(this).attr("data-controls");
        var _this = this;
        if($("#" + controlled).hasClass("expanded")) {

            $("#" + controlled).toggleClass("expanded");
            $(this).toggleClass("expanded");

            setTimeout(function(){

                $('.feature-box .hidden-content').hide();

                $('html, body').animate({
                    scrollTop: $(_this).offset().top - 150
                }, 200);
                $(_this).focus()

            }, 500);
        }
        else {
            $('.feature-box .hidden-content').show();

            setTimeout(function(){
                $("#" + controlled).toggleClass("expanded");
                $(_this).toggleClass("expanded");

                $('html, body').animate({
                    scrollTop: $(_this).offset().top - 150
                }, 200);
                // $(_this).focus();
                $(".feature-box .hidden-content").find(':focusable').eq(0).focus();

            }, 500);
        }




        // console.log($(this).offset().top);
        // var _this = this;
        // setTimeout(function() {
        //     $([document.documentElement, document.body]).animate({
        //         scrollTop: $(_this).offset().top - $(document.body).height()/2
        //     }, 500);
        // }, 500);
    });

    if ($('button[data-target="#more-faqs"]').length) {
        $('button[data-target="#more-faqs"]').on("click", function(e){
            if($(this).hasClass("collapsed")) {
                // $("#more-faqs").find(".accordion-panel")[0].find("a").focus();
                var firstPanel = $("#more-faqs").find(".accordion-panel a")[0];

                if(firstPanel) {
                    setTimeout(function() {
                        firstPanel.focus();
                    }, 300);
                }
            }

        });

    }




    //global search
    if ($('#global-search').length) {
        if ($("#global-search #search").val()) {
            $("#global-search a").removeClass("disabled");
            $("#global-search a").attr("aria-disabled", false);
        } else {
            $("#global-search a").addClass("disabled");
            $("#global-search a").attr("aria-disabled", true);
        }

        $("#global-search #search").on('input', function(e) {
            // console.log("$(this).val()", $(this).val());
            if ($(this).val()) {
                $("#global-search a").removeClass("disabled");
                $("#global-search a").attr("aria-disabled", false);
            } else {
                $("#global-search a").addClass("disabled");
                $("#global-search a").attr("aria-disabled", true);
            }
        });
    }
    $('#global-search a').on('click', function(e) {
        e.preventDefault();
        if(lang == 'fr') {
            //silver
             if (window.location.href.indexOf("silver.rbcroyalbank") > -1) {
                 window.location.href = "https://silver.rbcbanqueroyale.com" + $(this).attr('href') + $("#global-search #search").val();
             }
             //bronze
             else if (window.location.href.indexOf(".rbcroyalbank") == -1) {
                 window.location.href = "https://www.sterbcbanqueroyale.com" + $(this).attr('href') + $("#global-search #search").val();
             }
             //prod
             else {
                  window.location.href = "https://www.rbcbanqueroyale.com" + $(this).attr('href') + $("#global-search #search").val();
             }
        }
        else {
            window.location.href = $(this).attr('href') + $("#global-search #search").val();
        }

    });
    $('#global-search input').keyup( function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if (keyCode == 13) {
            $('#global-search a').click();
        }
    });

    // $('#see-more').click(function () {
    //     console.log('aaaaa');
    //     setTimeout(function () {
    //         if($(this).parent().hasClass("expanded")) {
    //             console.log("thiss");
    //             $('html, body').animate({
    //                 scrollTop: $(this).offset().top - 150
    //             }, 200);
    //             $(this).focus();
    //         }
    //         else {
    //             $('html, body').animate({
    //                 scrollTop: $("#featr").offset().top - 150
    //             }, 200);
    //             // $(".hidden-content a").each(function(){
    //             //     $(this).attr("tabindex", "0");
    //             // });
    //             // $(".hidden-content").focus();
    //         }
    //
    //     }, 1000);
    //
    // });
    // $(".toggle-btn").on('click', function(e) {
    //     if ($(this).hasClass("inverse")) {
    //         $("#" + $(this).parent().find(".toggle-btn:not(.inverse)").attr("data-controls")).hide();
    //         $("#" + $(this).attr("data-controls")).show();
    //         $(this).parent().find(".toggle-btn:not(.inverse)").addClass("inverse");
    //         $(this).removeClass("inverse");
    //     }
    // });

    $(".toggle-btn").on('click', function(e) {
        if(!$(this).hasClass("inverse")) {
            $("#" + $(this).parent().find(".toggle-btn.inverse").attr("data-controls")).hide();
            $("#" + $(this).attr("data-controls")).show();
            $(this).parent().find(".toggle-btn.inverse").removeClass("inverse");
            $(this).addClass("inverse");
        }
    });

    //accessible toggle switch

    $('.switch').keypress(function() {
        $(this).find('input').trigger('click');
    });



    // animate to top of whichever accordion is clicked
    // $('.collapse-toggle').on('click', function() {
    //     if ($(window).width() <= 640) {
    //
    //         var collapser = $(this);
    //
    //         var stickyHeaderHeight = 0;
    //
    //         if($("#sticky-wrapper").length) {
    //             stickyHeaderHeight = $("#sticky-wrapper").find(".nav-bar").outerHeight;
    //         }
    //
    //         setTimeout(function() {
    //             $('html, body').animate({
    //                 scrollTop: collapser.offset().top + stickyHeaderHeight
    //             }, 500);
    //         }, 400);
    //     }
    // });

    // $('#dvl-wpr').attr('data-lang-toggle', 'accounts/_assets-custom/js');
    $('#side-menu-language .lang-en').addClass('active').attr('tabindex', '-1').attr('aria-disabled', 'true').attr('role', 'button');


    //make AO links relative to ENV.
     $('a[href*="apps.royalbank.com"]').on('click', function(e) {
         if (window.location.href.indexOf(".sterbcroyalbank") > -1) {
             e.preventDefault();
             var link = $(this).attr("href").replace("apps.royalbank", "appsasm.steroyalbank");
             window.open(link, '_blank').focus();
         }
         else if(window.location.href.indexOf("silver.rbcroyalbank") > -1) {
             e.preventDefault();
             var link = $(this).attr("href").replace("apps.royalbank", "appssai.steroyalbank");
             window.open(link, '_blank').focus();
         }
         else {
             e.preventDefault();
             var link = $(this).attr("href");
             window.open(link, '_blank').focus();
         }
     });
});


function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function vantageCollapse(){
  if($('#vantageCollapse').length > 0){
    setTimeout(function(){
      $("#vantageCollapse").addClass('collapse');
      $("#vantageCollapseBtn").addClass('collapsed');

    }, 500);


  }
}
