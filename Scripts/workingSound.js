/**
 * Created by Merry on 27.10.2014.
 */
function Sound(){
    var my_sound = document.getElementsByClassName("button");
    if (my_sound.paused == true) {
        my_sound.play();
        return true;
    }
    else if (my_sound.paused == false) {
        my_sound.pause();


    }

    return false;
};
