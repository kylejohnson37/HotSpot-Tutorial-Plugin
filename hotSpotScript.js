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
 * @var {string} size.height The height of a hotspot
 * @var {string} size.width The width of a hotspot
 * @var {string} position The position of the hotspot whether Centered or Relative to an id.
 * @var {string} id If "relative" position this determines which id to position the hotspot near.
 * @var {string} location Determines if it is position to the "right", "left", "bottom", or "top" of the id element.
 * @var {string} background If 'none' is passed in then it removes the faded background effect.
 */
var options = [{
	"title": "Welcome!",
	"content": "This is your <u>second</u> tutorial!",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "200px",
		"width": "500px"
	},
	"position": "relative",
	"id": "test",
	"location": "bottom-right"
}, {
	"title": "Welcome!",
	"content": "This is your <u><b>third</b></u> tutorial!<br><br> This demostrates a break.",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "440px",
		"width": "200px"
	},
	"position": "relative",
	"id": "test2",
	"location": "left-top"
}, {
	"title": "Welcome!",
	"content": "This is your <u><b>fifth</b></u> tutorial!<br><br> This demostrates a break.",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "440px",
		"width": "200px"
	},
	"position": "relative",
	"id": "test3",
	"location": "top-left"
}, {
	"title": "Welcome!",
	"content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "440px",
		"width": "200px"
	},
	"position": "relative",
	"id": "test3",
	"location": "top-left"
}, {
	"title": "Welcome!",
	"content": "Are you having a good day? <label for='yes'><input type='radio' value='yes' name='question' id='yes'><span>YES</span></label> <label for='no'><input type='radio' value='no' name='question' id='no'><span>NO</span></label>",
	"rightButton": "Submit",
	"leftButton": "",
	"size": {
		"height": "250px",
		"width": "500px"
	},
	"position": "center",
	"id": "none",
	"background": "none"
}];
var options2 = [{
	"title": "Welcome!",
	"content": "This is your second <b>introductory</b> tutorial!",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "250px",
		"width": "500px"
	},
	"position": "center",
	"id": "none",
	"background": "none"
}, {
	"title": "Welcome!",
	"content": "This is your <u>second</u> tutorial!",
	"rightButton": "Next",
	"leftButton": "I'M GOOD ",
	"size": {
		"height": "200px",
		"width": "500px"
	},
	"position": "relative",
	"id": "test",
	"location": "bottom-right"
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
    return $("#" + id).position().left;
}

/**
 * Returns the top position of the id passed in.
 * @param {string} id
 * @returns {Number}
 */
function getPositionTop(id) {
    return $("#" + id).position().top;
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
     * @param {number} i What step in the tutorial they are at.
     */
    Hotspot.prototype.init = function(options, myCallback, i) {
        var screenHolder, hotspotHolder, hotspotNub, closeButton, hotspotTitle, hotspotContent, leftHotspot, rightHotspot, next;
	
        this.options = options;

        next = new Hotspot();

        var docFrag = document.createDocumentFragment();

        var length = options.length;

        var id = this.options[i].id;

        if ($('#' + id).length === 0 && id != "none") {
            next.init(options, myCallback, i + 1);
        } else { /**
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
            $hotspotHolder.attr("class", this.options[i].position);
            $hotspotHolder.attr("id", "hotspotHolder");
            $hotspotHolder.width(this.options[i].size.width);
            $hotspotHolder.height(this.options[i].size.height);
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
            $(hotspotTitle).html(this.options[i].title);
            $hotspotHolder.append(hotspotTitle);

            /**
             * The content shown in the hotspot. You can used HTML code with this.
             * @var {object} hotspotContent
             */
            hotspotContent = document.createElement("div");
            $(hotspotContent).attr("id", "hotspotContent");
            $(hotspotContent).html(this.options[i].content);
            $hotspotHolder.append(hotspotContent);

            /**
             * Creates the button shown on the right side of the hotspot.
             * @var {object} rightHotspot
             */
            if (this.options[i].rightButton !== "") {
                rightHotspot = document.createElement("button");
                $(rightHotspot).attr("id", "rightHotspot");
                $(rightHotspot).text(this.options[i].rightButton);
                rightHotspot.addEventListener("click", function() {
                    if (i === length - 1) {
                        $screenHolder.fadeOut();
                        $screenHolder.remove();
                        myCallback();
                    } else {
                        i = i + 1;
                        $("#" + id).css("z-index", "0");
                        $screenHolder.remove();
                        next.init(options, myCallback, i);
                    }
                });
            }

            /**
             * Creates the button shown on the left side of the hotspot.
             * @var {object} leftHotspot
             */
            if (this.options[i].leftButton === "") {
                $(rightHotspot).css("width", "80%");
            } else {
                leftHotspot = document.createElement("button");
                $(leftHotspot).attr("id", "leftHotspot");
                $(leftHotspot).text(this.options[i].leftButton);
                $hotspotHolder.append(leftHotspot);
                leftHotspot.addEventListener("click", function() {
                    $(screenHolder).fadeOut("slow");
                    $(screenHolder).remove();
                });
            }
			$hotspotHolder.append(rightHotspot);

            /**
             * Puts the "nub" in the center of the hotspot
             */
            var startHeight = this.options[i].size.height.replace("px", "");
            var height = startHeight / 2 + 4;
            var startWidth = this.options[i].size.width.replace("px", "");
            var width = startWidth / 2 + 2;

            if (this.options[i].location === "right" || this.options[i].location === "left") {
                $(hotspotNub).css("top", height);
            } else if (this.options[i].location === "top" || this.options[i].location === "bottom") {
                $(hotspotNub).css("left", width);
            } else if (this.options[i].location === "bottom-left" || this.options[i].location === "top-left") {
                $(hotspotNub).css("right", getWidth(this.options[i].id) / 2 - 14);
            } else if (this.options[i].location === "bottom-right" || this.options[i].location === "top-right") {
                $(hotspotNub).css("left", getWidth(this.options[i].id) / 2 - 14);
            } else if (this.options[i].location === "right-top" || this.options[i].location === "left-top") {
                $(hotspotNub).css("top", "7px");
            } else if (this.options[i].location === "right-bottom" || this.options[i].location === "left-bottom") {
                $(hotspotNub).css("bottom", "7px");
            }


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

            if (this.options[i].background === "none") {
                $screenHolder.css("background", "none");
            }

            /**
             * If position ="relative" it places the hotspot next to the id passed in based on the "location".
             */
            if (this.options[i].position === "relative") {
                if (this.options[i].location === "bottom") {
                    $("#hotspotHolder").css("left", getHotSpotLeft("center", this.options[i].id));
                    $("#hotspotHolder").css("top", getHotSpotTop("bottom", this.options[i].id));
                    $("#hotspotNub").attr("class", "top");
                } else if (this.options[i].location === "left") {
                    $("#hotspotHolder").css("left", getHotSpotLeft("left", this.options[i].id));
                    $("#hotspotHolder").css("top", getHotSpotTop("left", this.options[i].id));
                    $("#hotspotNub").attr("class", "right");
                } else if (this.options[i].location === "right") {
                    $("#hotspotHolder").css("left", getHotSpotLeft("right", this.options[i].id));
                    $("#hotspotHolder").css("top", getHotSpotTop("right", this.options[i].id));
                    $("#hotspotNub").attr("class", "left");
                } else if (this.options[i].location === "bottom-right") {
                    $("#hotspotHolder").css("top", getHotSpotTop("bottom", this.options[i].id));
                    $("#hotspotHolder").css("left", getPositionLeft(this.options[i].id));
                    $("#hotspotNub").attr("class", "top");
                } else if (this.options[i].location === "bottom-left") {
                    $("#hotspotHolder").css("top", getHotSpotTop("bottom", this.options[i].id));
                    $("#hotspotHolder").css("left", getPositionLeft(this.options[i].id) - getWidth("hotspotHolder") + getWidth(this.options[i].id));
                    $("#hotspotNub").attr("class", "top");
                } else if (this.options[i].location === "top-left") {
                    $("#hotspotHolder").css("top", getHotSpotTop("top", this.options[i].id)-10);
                    $("#hotspotHolder").css("left", getPositionLeft(this.options[i].id) - getWidth("hotspotHolder") + getWidth(this.options[i].id));
                    $("#hotspotNub").attr("class", "bottom");
                } else if (this.options[i].location === "top-right") {
                    $("#hotspotHolder").css("top", getHotSpotTop("top", this.options[i].id));
                    $("#hotspotHolder").css("left", getPositionLeft(this.options[i].id));
                    $("#hotspotNub").attr("class", "bottom");
                } else if (this.options[i].location === "right-top") {
                    $("#hotspotHolder").css("top", getPositionTop(this.options[i].id) - 10);
                    $("#hotspotHolder").css("left", getHotSpotLeft("right", this.options[i].id));
                    $("#hotspotNub").attr("class", "left");
                } else if (this.options[i].location === "right-bottom") {
                    $("#hotspotHolder").css("top", getPositionTop(this.options[i].id) - getHeight("hotspotHolder") + getHeight(this.options[i].id) + 10);
                    $("#hotspotHolder").css("left", getHotSpotLeft("right", this.options[i].id));
                    $("#hotspotNub").attr("class", "left");
                } else if (this.options[i].location === "left-top") {
                    $("#hotspotHolder").css("top", getPositionTop(this.options[i].id) - getHeight(this.options[i].id) / 2);
                    $("#hotspotHolder").css("left", getHotSpotLeft("left", this.options[i].id));
                    $("#hotspotNub").attr("class", "right");
                } else if (this.options[i].location === "left-bottom") {
                    $("#hotspotHolder").css("top", getPositionTop(this.options[i].id) - getHeight("hotspotHolder") + getHeight(this.options[i].id) + 10);
                    $("#hotspotHolder").css("left", getHotSpotLeft("left", this.options[i].id));
                    $("#hotspotNub").attr("class", "right");
                } else {
                    $("#hotspotHolder").css("left", getHotSpotLeft("center", this.options[i].id));
                    $("#hotspotHolder").css("top", getHotSpotTop("top", this.options[i].id));
                    $("#hotspotNub").attr("class", "bottom");
                }

                if (getPositionTop(this.options[i].id) > window.innerHeight || getPositionTop(this.options[i].id) < window.innerHeight) {
                    $("html, body").animate({
                        scrollTop: getPositionTop('hotspotHolder')-50
                    }, 500);
                }
                $("#" + this.options[i].id).css("z-index", "999");
            }

            var dotMenuHolder = document.createElement('div');
            $(dotMenuHolder).attr('id', 'dotMenu');
            $hotspotHolder.append(dotMenuHolder);

            var unorderedList = document.createElement('ul');
            $(dotMenuHolder).append(unorderedList);

            for (var j = 0; j < length; j++) {
                var listItem = document.createElement('li');
                $(unorderedList).append(listItem);
                $(listItem).attr("id", j);
                if (j === i) {
                    $(listItem).addClass('current');
                }
                listItem.addEventListener("click", function(event) {
                    $("#" + id).css("z-index", "0");
                    $screenHolder.remove();
                    next.init(options, myCallback, parseInt(event.target.id));
                });
            }
        }
    }
};