/**
 * Created by Natalya on 15.10.2014.
 */

function changeId() {
    var e = document.getElementById('volume');
    var myaudio = document.getElementById("my_audio");

    if (e) {
        e.id = 'noVolume';
        myaudio.pause();
    }
    else {
        document.getElementById('noVolume').id = 'volume';
        myaudio.play();
    }
}

function ShowSettingsMenu() {
    document.getElementById('settingMenu').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function HideSettingsMenu() {
    document.getElementById('settingMenu').style.display = 'none';
    document.getElementById('overlay').style.display = 'none'
}

function ShowMenu(whatHide, whatShow) {
    document.getElementById(whatHide).style.display = 'none';
    document.getElementById(whatShow).style.display = 'block';
}

//код,отвечающий за движение облаков
$(document).ready(function () {
    $('#far-clouds').pan({fps: 30, speed: 0.7, dir: 'left', depth: 30});
    window.actions = {
        walkingClouds: function () {
            $('#far-clouds').spSpeed(2);
        }
    };
});
//код,отвечающий за зацикливание трека
$(function () {
    var wingsSound = document.getElementById("my_audio");
    wingsSound.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    wingsSound.play();
});

