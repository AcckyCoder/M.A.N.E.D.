/**
 * Created by Natalya on 15.10.2014.
 */

function changeId ()
{
    var e = document.getElementById('volume');
    var myaudio = document.getElementById("myaudio");

    if(e)
    {
        e.id = 'noVolume';
        document.getElementById("myaudio").pause();
    }
    else
    {
        document.getElementById('noVolume').id = 'volume';
        document.getElementById("myaudio").play();
    }
}

function ShowSettingsMenu(){
    document.getElementById('settingMenu').style.display='block';
    document.getElementById('overlay').style.display='block';
}

function HideSettingsMenu(){
    document.getElementById('settingMenu').style.display='none';
    document.getElementById('overlay').style.display='none'
}

function ShowMenu(whatHide, whatShow){
    document.getElementById(whatHide).style.display = 'none';
    document.getElementById(whatShow).style.display = 'block';
}

