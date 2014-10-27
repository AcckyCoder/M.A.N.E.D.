/**
 * Created by Natalya on 15.10.2014.
 */

function changeId ()
{
    var e = document.getElementById('volume');
    var myaudio = document.getElementById("my_audio");

    if(e)
    {
        e.id = 'noVolume';
        myaudio.pause();
    }
    else
    {
        document.getElementById('noVolume').id = 'volume';
        myaudio.play();
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

