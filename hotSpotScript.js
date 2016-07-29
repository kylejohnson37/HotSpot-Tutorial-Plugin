/** 
 * This JavaScript file contains a plugin that creates HotSpot Tutorials
 * 
 * @projectname HotSpot Plugin
 * @version 0.1
 * @author Kyle Johnson <kyle.johnson@myfela.com>
 * 
 */
/**
 * When making a question use a <label><input><span></span></label> set up.
 * EX.
 * <label for='yes'><input type='radio' value='yes' name='question' id='yes'><span>YES</span></label>
 */
/** The array of objects that are used to customize each individual hotspot. Consists of all strings.
 * @var {string} title the title of each hotspot
 * @var {string} content This is the content shown.
 * @var {string} rightButton The button shown on the right of the hotspot (mostly used for "next")
 * @var {string} leftButton The button shown on the left of the hotspot ("previous" or "close")
 * @var {string} size
 * @var {string} size.height The height of a hotspot, if left blank will generate an height of 100px
 * @var {string} size.width The width of a hotspot if left blank will generate a width of 500px
 * @var {string} position The position of the hotspot whether Centered or Relative to an id.
 * @var {string} id If "relative" position this determines which id to position the hotspot near.
 * @var {string} location Determines if it is position to the "right", "left", "bottom", or "top" of the id element.
 * @var {string} background If 'none' is passed in then it removes the faded background effect.
 * @var {string} type Pass in 'question' to be able to handle what happenes when the rightHotspot is clicked.
 * @var {string} questionId Pass in a number to distinguish between what event handler you want to use.
 */
var options = [{
    "title": "Welcome!",
    "content": "This is your <u>first</u> tutorial!",
    "rightButton": "Next",
    "leftButton": "I'M GOOD",
    "size": {
        "height": "200px",
        "width": "500px"
    },
    "position": "center",
    "id": "none",
    "location": "left-bottom"
}, {
    "title": "Welcome!",
    "content": "This is your <u><b>second</b></u> tutorial!<br><br> This demostrates a break.",
    "rightButton": "Next",
    "leftButton": "I'M GOOD",
    "size": {
        "height": "auto",
        "width": "200px"
    },
    "position": "relative",
    "id": "test",
    "location": "right-bottom"
}, {
    "title": "Welcome!",
    "content": "This is your <u><b>third</b></u> tutorial!<br><br> This demostrates a break.",
    "rightButton": "Next",
    "leftButton": "I'M GOOD ",
    "size": {
        "width": "200px"
    },
    "position": "relative",
    "id": "test3",
    "location": "top-right"
}];
/**
 * This function called when the tutorial has be completed.
 * @function myCallback
 */
function myCallback() {
    console.log("Tutorial Completed");
}

/**
 * This function tells us where to position the hotspot vertically.
 * @function getHotSpotTop
 * @param {string} side
 * @param {string} id
 * @returns {Number} 
 */
function getHotSpotTop(side, id) {
    if (side === "left" || side === "right") {
        return getPositionTop(id) - (getHeight("hotspotHolder") / 2) + (getHeight(id) / 3);
    }
    if (side === "bottom") {
        return getPositionBottom(id);
    }
    if (side === "top") {
        return getPositionTop(id) - getHeight("hotspotHolder") - 14;
    }
}

/**
 * This function tells us where to position the hotspot horizontally
 * @function getHotSpotLeft
 * @param {string} side
 * @param {string} id
 * @returns {Number}
 */
function getHotSpotLeft(side, id) {
    if (side === "left") {
        return getPositionLeft(id) - getWidth("hotspotHolder") - 14;
    } else if (side === "right") {
        return getPositionLeft(id) + getWidth(id) + 14;
    } else if (side === "center") {
        return getPositionLeft(id) - (getWidth("hotspotHolder") / 2) + getWidth(id) / 2;
    }
}

/**
 * Returns the left position of the id passed in.
 * @param {string} id
 * @returns {Number}
 */
function getPositionLeft(id) {
    var path = $("#" + id).parentsUntil("body");
    var left = 0;
    for (var i = 0; i < path.length; i++) {
        left = left + $(path[i]).position().left;
    }
    left = left + $("#" + id).position().left;
    return left;
}

/**
 * Returns the top position of the id passed in.
 * @param {string} id
 * @returns {Number}
 */
function getPositionTop(id) {
    var path = $("#" + id).parentsUntil("body");
    var top = 0;
    for (var i = 0; i < path.length; i++) {
        top = top + $(path[i]).position().top;
    }
    top = top + $("#" + id).position().top;
    return top
}

/**
 * Returns the bottom position of the id passed in.
 * @param {string} id
 * @returns {Number}
 */
function getPositionBottom(id) {
    return $("#" + id).position().top + getHeight(id) + 12;
}

/**
 * Returns the right position of the id passed in.
 * @param {string} id
 * @returns {Number}
 */
function getPositionRight(id) {
    return $("#" + id).position().left + getWidth(id);
}

/**
 * Returns the outer width of a passed in id.
 * @param {string} id
 * @returns {Number}
 */
function getWidth(id) {
    return $("#" + id).outerWidth(true);
}

/**
 * Returns the outer height of a passed in id.
 * @param {string} id
 * @returns {Number}
 */
function getHeight(id) {
    return $("#" + id).outerHeight(true);
}


function Hotspot() {
    /**
     * The function that puts together each hotspot when it is called.
     * @constructor init
     * @param {object[]} options Each specification the hotspot is made to.
     * @param {function} myCallback Function called at the completion on the tutorial.
     * @param {number} startingIndex What step in the tutorial they are at.
     */
    Hotspot.prototype.init = function(options, startingIndex, myCallback) {
        var screenHolder, hotspotHolder, hotspotNub, closeButton, hotspotTitle, hotspotContent, leftHotspot, rightHotspot, next, answer;

        this.options = options;

        next = new Hotspot();

        var docFrag = document.createDocumentFragment();

        var length = options.length;

        var id = this.options[startingIndex].id;

        if ($('#' + id).length === 0 && id != "none") {
            next.init(options, startingIndex + 1, myCallback);
        } else {
            /**
             * The variable that creates our "cover" for the screen
             * @var {object} screenHolder
             */
            screenHolder = document.createElement("div");
            var $screenHolder = $(screenHolder);
            $screenHolder.attr("id", "screenWrapper");
            var screenHeight = ($(document).height());
            $screenHolder.css("height", screenHeight);

            /**
             * This variable creates the clear cover over the whole screen so no buttons can be clicked
             * @var {object} clearCover
             */
            clearCover = document.createElement("div");
            var $clearCover = $(clearCover);
            $clearCover.attr("id", "clearWrapper");
            $clearCover.css("height", screenHeight);
            $screenHolder.append(clearCover);

            /**
             * The variable that creates the actual hotspot
             * @var {object} hotspotHolder
             */
            hotspotHolder = document.createElement("div");
            var $hotspotHolder = $(hotspotHolder);
            $hotspotHolder.attr("class", this.options[startingIndex].position);
            $hotspotHolder.attr("id", "hotspotHolder");
            if (this.options[startingIndex].size.width === null) {
                $hotspotHolder.width('500px');
            } else {
                $hotspotHolder.width(this.options[startingIndex].size.width);
            }

            if (this.options[startingIndex].size.height === null) {
                $hotspotHolder.css('min-height', '100px');
            } else {
                $hotspotHolder.css('min-height', this.options[startingIndex].size.height);
            }
            $screenHolder.append(hotspotHolder);

            /**
             * The variable that creates our "nub" on the hotspot. It"s the little triangle thingy.
             * @var {object} hotspotNub
             */
            hotspotNub = document.createElement("span");
            $(hotspotNub).attr("id", "hotspotNub");
            $hotspotHolder.append(hotspotNub);

            /**
             * The title shown for the hotSpot
             * @var {object} hotspotTitle
             */
            hotspotTitle = document.createElement("div");
            $(hotspotTitle).attr("id", "hotspotTitle");
            $(hotspotTitle).html(this.options[startingIndex].title);
            $hotspotHolder.append(hotspotTitle);

            /**
             * The content shown in the hotspot. You can used HTML code with this.
             * @var {object} hotspotContent
             */
            hotspotContent = document.createElement("div");
            $(hotspotContent).attr("id", "hotspotContent");
            $(hotspotContent).html(this.options[startingIndex].content);
            $hotspotHolder.append(hotspotContent);

            /**
             * Creates the button shown on the right side of the hotspot.
             * @var {object} rightHotspot
             */
            if (this.options[startingIndex].rightButton !== "") {
                rightHotspot = document.createElement("button");
                $(rightHotspot).attr("id", "rightHotspot");
                $(rightHotspot).text(this.options[startingIndex].rightButton);
                rightHotspot.addEventListener("click", function() {
                    if (startingIndex === length - 1) {
                        answer = $('input[name=question]:checked', '#hotspot').val();
                        $screenHolder.fadeOut();
                        $screenHolder.remove();
                        myCallback();
                    } else {
                        startingIndex = startingIndex + 1;
                        $("#" + id).css("z-index", "0");
                        $screenHolder.remove();
                        next.init(options, startingIndex, myCallback);
                    }
                });
            }

            /**
             * Creates the button shown on the left side of the hotspot.
             * @var {object} leftHotspot
             */
            if (this.options[startingIndex].leftButton === "") {
                $(rightHotspot).css("width", "80%");
            } else {
                leftHotspot = document.createElement("button");
                $(leftHotspot).attr("id", "leftHotspot");
                $(leftHotspot).text(this.options[startingIndex].leftButton);
                $hotspotHolder.append(leftHotspot);
                leftHotspot.addEventListener("click", function() {
                    $(screenHolder).fadeOut("slow");
                    $(screenHolder).remove();
                });
            }
            $hotspotHolder.append(rightHotspot);

            /**
             * The close button variable. That is shown in the top-right corner.
             * @var {object} closeButton
             */
            closeButton = document.createElement("button");
            $(closeButton).attr("id", "closeHotspot");
            $(closeButton).text("x");
            $hotspotHolder.append(closeButton);

            closeButton.addEventListener("click", function() {
                $screenHolder.fadeOut();
                $screenHolder.remove();
            });

            $(docFrag).append(screenHolder);
            $(document.body).append(docFrag);

            if (this.options[startingIndex].background === "none") {
                $screenHolder.css("background", "none");
            }

            /**
             * If position ="relative" it places the hotspot next to the id passed in based on the "location".
             */
            if (this.options[startingIndex].position === "relative") {
                switch (this.options[startingIndex].location) {
                    case ("bottom"):
                        $("#hotspotHolder").css("left", getHotSpotLeft("center", this.options[startingIndex].id));
                        $("#hotspotHolder").css("top", getHotSpotTop("bottom", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "top");
                        break;
                    case ("left"):
                        $("#hotspotHolder").css("left", getHotSpotLeft("left", this.options[startingIndex].id));
                        $("#hotspotHolder").css("top", getHotSpotTop("left", this.options[startingIndex].id - 36));
                        $("#hotspotNub").attr("class", "right");
                        break;
                    case ("right"):
                        $("#hotspotHolder").css("left", getHotSpotLeft("right", this.options[startingIndex].id));
                        $("#hotspotHolder").css("top", getHotSpotTop("right", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "left");
                        break;
                    case ("bottom-right"):
                        $("#hotspotHolder").css("top", getHotSpotTop("bottom", this.options[startingIndex].id));
                        $("#hotspotHolder").css("left", getPositionLeft(this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "top");
                        break;
                    case ("bottom-left"):
                        $("#hotspotHolder").css("top", getHotSpotTop("bottom", this.options[startingIndex].id));
                        $("#hotspotHolder").css("left", getPositionLeft(this.options[startingIndex].id) - getWidth("hotspotHolder") + getWidth(this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "top");
                        break;
                    case ("top-left"):
                        $("#hotspotHolder").css("top", getHotSpotTop("top", this.options[startingIndex].id) - 36);
                        $("#hotspotHolder").css("left", getPositionLeft(this.options[startingIndex].id) - getWidth("hotspotHolder") + getWidth(this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "bottom");
                        break;
                    case ("top-right"):
                        $("#hotspotHolder").css("top", getHotSpotTop("top", this.options[startingIndex].id) - 36);
                        $("#hotspotHolder").css("left", getPositionLeft(this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "bottom");
                        break;
                    case ("right-bottom"):
                        $("#hotspotHolder").css("top", getPositionTop(this.options[startingIndex].id) - 11);
                        $("#hotspotHolder").css("left", getHotSpotLeft("right", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "left");
                        break;
                    case ("right-top"):
                        $("#hotspotHolder").css("top", getPositionTop(this.options[startingIndex].id) - getHeight("hotspotHolder") + getHeight(this.options[startingIndex].id) + 10);
                        $("#hotspotHolder").css("left", getHotSpotLeft("right", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "left");
                        break;
                    case ("left-bottom"):
                        $("#hotspotHolder").css("top", getPositionTop(this.options[startingIndex].id) - getHeight(this.options[startingIndex].id) / 2);
                        $("#hotspotHolder").css("left", getHotSpotLeft("left", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "right");
                        break;
                    case ("left-top"):
                        $("#hotspotHolder").css("top", getPositionTop(this.options[startingIndex].id) - getHeight("hotspotHolder")- (getHeight(this.options[startingIndex].id)/2));
                        $("#hotspotHolder").css("left", getHotSpotLeft("left", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "right");
                        break;
                    default:
                        $("#hotspotHolder").css("left", getHotSpotLeft("center", this.options[startingIndex].id));
                        $("#hotspotHolder").css("top", getHotSpotTop("top", this.options[startingIndex].id));
                        $("#hotspotNub").attr("class", "bottom");
                        break;
                }


                if (getPositionTop(this.options[startingIndex].id) > window.innerHeight + $(window).scrollTop() || getPositionTop(this.options[startingIndex].id) < $(window).scrollTop()) {
                    $("html, body").animate({
                        scrollTop: getPositionTop('hotspotHolder') - 50
                    }, 2000);
                }
                $("#" + this.options[startingIndex].id).css("z-index", "999");
            }

            var dotMenuHolder = document.createElement('div');
            $(dotMenuHolder).attr('id', 'dotMenu');
            $hotspotHolder.append(dotMenuHolder);

            var unorderedList = document.createElement('ul');
            $(dotMenuHolder).append(unorderedList);

            for (var i = 0; i < length; i++) {
                if ($('#' + options[i].id).length != 0 || options[i].id == "none") {
                    var listItem = document.createElement('li');
                    $(unorderedList).append(listItem);
                    $(listItem).attr("id", i);
                    if (i === startingIndex) {
                        $(listItem).addClass('current');
                    }
                    listItem.addEventListener("click", function(event) {
                        $("#" + id).css("z-index", "0");
                        $screenHolder.remove();
                        next.init(options, parseInt(event.target.id), myCallback);
                    });
                }
            }

            if (this.options[startingIndex].type === "question") {
                if(this.options[startingIndex].questionId === "1"){
                    rightHotspot.addEventListener('click', function() {
                        if (answer === "no") {
                            var myNotification = new Notification({
                                background: "transparent",
                                fontColor: "blue",
                                id: "mindset",
                                choice: "fadeDown",
                                message: "<img src='downarrowicon.png' width='35px' height='40px'/>"
                            });
                            myNotification.open();

                            var myNotification1 = new Notification({
                                background: "transparent",
                                fontColor: "red",
                                id: "habits",
                                choice: "fadeDown",
                                message: "<img src='downarrowicon.png' width='35px' height='40px'/>"
                            });
                            myNotification1.open();

                            var myNotification1 = new Notification({
                                background: "transparent",
                                fontColor: "red",
                                id: "knowledge",
                                choice: "fadeUp",
                                message: "<img src='uparrowicon.png' width='45px' height='50px'/>"
                            });
                            myNotification1.open();
                        } else {
                            var myNotification = new Notification({
                                id: "new",
                                choice: "advancedAlert",
                                type: "goal",
                                number: '1',
                                message: "You unlocked a new goal!",
                                background: "#39aba3",
                                fontColor: "white"
                            });
                            myNotification.open();
                            var myNotification = new Notification({
                                id: "new2",
                                choice: "advancedAlert",
                                type: "badge",
                                number: '2',
                                message: "You unlocked a new goal!",
                                background: "#39aba3",
                                fontColor: "white"
                            });
                            myNotification.open();
                        }
                    });
                }
            }

            /**
             * Puts the "nub" in the center of the hotspot
             */
            var startHeight = getHeight('hotspotHolder');
            var height = startHeight / 2 + 4;
            var startWidth = getWidth('hotspotHolder');
            var width = startWidth / 2 + 2;

            switch (this.options[startingIndex].location) {
                case "right":
                case "left":
                    $(hotspotNub).css("top", height);
                    break;
                case "top":
                case "bottom":
                    $(hotspotNub).css("left", width);
                    break;
                case "bottom-left":
                case "top-left":
                    $(hotspotNub).css("right", getWidth(this.options[startingIndex].id) / 2 - 14);
                    break;
                case "bottom-right":
                case "top-right":
                    $(hotspotNub).css("left", getWidth(this.options[startingIndex].id) / 2 - 14);
                    break;
                case "right-bottom":
                case "left-bottom":
                    $(hotspotNub).css("top", "7px");
                    break;
                case "right-top":
                case "left-top":
                    $(hotspotNub).css("bottom", "7px");
                    break;
            }
        }
    }
};