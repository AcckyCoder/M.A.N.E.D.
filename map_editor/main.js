/**
 * Created by AleX on 16.10.14.
 */
var id_menu;
var cell =
{
    type : 0,
    texture : "default.jpg",
    res_cnt : 0,
    city : 0
};
/*
map = new Array();
for (var i=0; i<450; i++)
{
    map[i] = {
        type : 0,
        texture : "grass.jpg",
        res_cnt : 0,
        city : 0
    };
}
/*

$.getJSON('map.json', function(data) {
    $.each(data, function(i,item){
        map[i].type = item.type;
        map[i].texture = item.texture;

        map[i].res_cnt = item.res_cnt;
        map[i].city = item.city;

    });
});
*/
function create_map()
{
    var id_cnt=0;
    var l_max=30;
    for (var l_cnt=0; l_cnt<15; l_cnt++)
    {
        var line = document.createElement("DIV");
        if (l_cnt%2==0)
        {
            line.className = 'line1';
           // --l_max;
        }
        else
        {
            line.className = 'line2';
           // ++l_max
        }

        for (var r_cnt=0; r_cnt<l_max; r_cnt++)
        {

            var a = document.createElement("a");
            a.href = "";
            a.className="b-polygon b-polygon_hexagon b-polygon_hexagon2 popup-link-1";
            var span1=document.createElement("span");
            span1.className =  "b-polygon-part";
            var span2=document.createElement("span");
            span2.className =  "b-polygon-part b-polygon-part_content";
            span2.style.backgroundImage = "url(../icon_and_textures/" + map[id_cnt].texture+")";
            a.id = "cell_"+id_cnt.toString();
            span1.appendChild(span2);
            a.appendChild(span1);
            line.appendChild(a);
            ++id_cnt;
        }
        document.getElementsByClassName("map")[0].appendChild(line);
    }

}
        function first_city(){
            var found_city=[{
             "name":"" ,
             "index":""
            }]


            for(var i=0;i<map.size();i++){

             if(map.cityname!="undefined")
             found_city[i]=map.cityname;
            }

        }



$(document).ready(function() {
    $('body').append('<div id="blackout"></div>');
    var boxWidth = 400;
    function centerBox() {

        /* Preliminary information */
        var winWidth = $(window).width();
        var winWidth2 = $(document).width();
        var winHeight = $(document).height();
        var scrollPos = $(window).scrollTop();
        var scrollPos2 = $(window).scrollLeft();

        /* auto scroll bug */

        /* Calculate positions */

        var disWidth = ((winWidth - boxWidth) / 2)+scrollPos2;
        var disHeight = scrollPos + 150;

        /* Move stuff about */
        $('.popup-box').css({'width' : boxWidth+'px', 'left' : disWidth+'px', 'top' : disHeight+'px'});
        $('#blackout').css({'width' : winWidth2+'px', 'height' : winHeight+'px'});

        return false;
    }


    $(window).resize(centerBox);
    $(window).scroll(centerBox);
    centerBox();
    $('[class*=popup-link]').click(function(e) {
        /* Prevent default actions */
        e.preventDefault();
        e.stopPropagation();
        /* Get the id (the number appended to the end of the classes) */
        var name = $(this).attr('class');
        var id = name[name.length - 1];
        var scrollPos = $(window).scrollTop();
        var scrollPos2 = $(window).scrollLeft();
        $('#tst').text('Параметры ячейки '+$(this).attr('id').substring(5));
        $('#form_id').attr('value', $(this).attr('id').substring(5));

        /* Show the correct popup box, show the blackout and disable scrolling */
        $('#popup-box-'+id).show();
        $('#blackout').show();
        $('html').css('overflow', 'hidden');

        /* Fixes a bug in Firefox */
        $('html').scrollTop(scrollPos);
        $('html').scrollLeft(scrollPos2);
        var types;
        $.getJSON('types.json', function(data) {
            $.each(data, function(i,item){
                $('#type').append('<option value="' + item.type + '">' + item.name + '</option>');
            });
        });
        $.getJSON('texture.json', function(data) {
            $.each(data, function(i,item){
                $('#texture').append('<option value="' + item.img + '">' + item.name + '</option>');
            });
        });

    });

    $('button#sub').click(function(e){
    //$(document).on('submit','form',function(){
    //$('#map_form').on( 'submit', function(){
       //alert($('#res').val());
       map[$('#form_id').val()].type = $('#type').val();
       map[$('#form_id').val()].texture = $('#texture').val();
       map[$('#form_id').val()].res_cnt = $('#res').val();
       map[$('#form_id').val()].city = $('#city').val();
       $('#jsn').attr('value',JSON.stringify(map, "", 4));
        $('#map_form').submit();
    });
    $('[class*=popup-box]').click(function(e) {
        /* Stop the link working normally on click if it's linked to a popup */
        e.stopPropagation();
    });
    $('html').click(function() {
        var scrollPos = $(window).scrollTop();
        var scrollPos2 = $(window).scrollLeft();

        /* Hide the popup and blackout when clicking outside the popup */
        $('[id^=popup-box-]').hide();
        $('#blackout').hide();
        $("html").css("overflow","auto");
        $('html').scrollTop(scrollPos);
        $('html').scrollLeft(scrollPos2);
    });
    $('.close').click(function() {
        var scrollPos = $(window).scrollTop();
        var scrollPos2 = $(window).scrollLeft();

        /* Similarly, hide the popup and blackout when the user clicks close */
        $('[id^=popup-box-]').hide();
        $('#blackout').hide();
        $("html").css("overflow","auto");
        $('html').scrollTop(scrollPos);
        $('html').scrollLeft(scrollPos2);
    });
});
