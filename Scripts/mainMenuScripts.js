/**
 * Created by Natalya on 15.10.2014.
 */

function changeId() {
    var e = document.getElementById('volume');
    var myaudio = document.getElementById("my_audio");

    if (e) {
        e.id = 'noVolume';
        myaudio.pause();
        var d = new Date();
        document.cookie = "music=false; expires=" + (d+86400000).toString();
    }
    else {
        document.getElementById('noVolume').id = 'volume';
        myaudio.play();
        document.cookie = "music=true; expires=" + (d+86400000).toString();
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



