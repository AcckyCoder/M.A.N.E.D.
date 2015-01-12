/**
 * Created by Merry on 12.01.2015.
 */

$(document).ready(function () {
    $('#far-clouds').pan({fps: 30, speed: 0.7, dir: 'left', depth: 30});
    window.actions = {
        walkingClouds: function () {
            $('#far-clouds').spSpeed(2);
        }
    };
});