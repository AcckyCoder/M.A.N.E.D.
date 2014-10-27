/**
 * Created by Merry on 27.10.2014.
 */
document.getElementsByClassName("button").onclick = function () {
    var my_sound = document.getElementById("button_click");

    if (my_sound.paused == true) {
        document.getElementById("button_click").play();
    }

    else if (my_sound.paused == false) {

        document.getElementById("button_click").pause();

    }
};
