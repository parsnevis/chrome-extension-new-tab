console.clear();

var cal = 'a';
var _url = 'http://localhost/server-new-tab/public/';

jalali_months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شرویور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
gregorian_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
gregorian_months_fa = ['ژانویه', 'فوریه', 'مارس', 'آپریل', 'می', 'ژوئن', 'ژولای', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
Hijri_months = ['محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذی القعده', 'ذی الحجه'];

var jalali_days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
var gregorian_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var Hijri_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var text_number = ['یکم', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم', 'یازدهم', 'دوازدهم', 'سیزدهم', 'چهاردهم', 'پانزدهم', 'شانزدهم', 'هفدهم', 'هجدهم', 'نوزدهم', 'بیستم', 'بیست و یکم', 'بیست و دوم', 'بیست و سوم', 'بیست و چهارم', 'بیست و پنجم', 'بیست و ششم', 'بیست و هفتم', 'بیست و هشتم', 'بیست و نهم', 'سی ام', 'سی و یکم'];

// var _url = 'https://parsnevis.ir/';
console.log(cal);

// var check_connectivity = {
//     is_internet_connected: function() {
//         return $.get({
//             url: 'https://parsnevis.ir/wp-content/uploads/2019/04/logo.png',
//             dataType: 'text',
//             cache: false
//         });
//     }
// };
// check_connectivity.is_internet_connected().done(function() {
//     //The resource is accessible - you are **probably** online.
// }).fail(function(jqXHR, textStatus, errorThrown) {
//     $('.internet-notifications').show();
// });


function checkConnectionNetwork() {
    var xhr = new XMLHttpRequest();
    var file = "https://www.time.ir/Content/media/image/2021/12/152_orig.svg";
    var r = Math.round(Math.random() * 10000);
    // xhr.open('HEAD', file + "?subins=" + r, false);
    xhr.open('GET', file + "?subins=" + r, false);
    try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 304) {
            console.log('a');
            return true;
        }
        else {
            console.log('b');
            return false;
        }
    }
    catch (e) {
        console.log('c');
        return false;
    }
}

const element = $('.internet-notifications');
setInterval( function() {
    if(checkConnectionNetwork())
    {
        element.addClass('d-none').hide();
    }
    else
    {
        element.removeClass('d-none').show();
    }
}, 10000);


function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './assets/js/calendar.json', true); // Replace 'appDataServices' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
}


loadJSON(function(response) {
    // Parsing JSON string into object
    var actual_JSON = JSON.parse(response);
    // console.log(actual_JSON);
});

const fs = require('fs');
const data = fs.readFileSync('./assets/js/calendar.json',
            {encoding:'utf8', flag:'r'});
console.log(data);


function date_spliter(date)
{
    console.log(date);
    date = date.split('/');
    return [Number(date[0]), Number(date[1]), Number(date[2])];
}

function JS_today()
{
    const date = new Date();
    gy = date.getFullYear();
    gm = date.getMonth()+1;
    gd = date.getDate();

    gdate = gy + '/' + gm + '/' + gd;
    jdate = gregorian_to_jalali(gy, gm, gd).join('/');
    return {'gregorian': gdate, 'jalali': jdate};
}

function _today()
{
    if(checkConnectionNetwork())
    {
        // return cal['today']['date'];
    }
    else
    {
        return JS_today()['jalali'];
    }
}



// ########### Time ###########

function startTime() {
    const time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('current-time').innerHTML =  h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}
  
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// ########### End Time ###########



// ########### Weather ###########

// ########### End Weather ###########



// ########### Today ###########

function current_day_reset()
{
    // $('.current__day').html('');
    // $('.current__month').html('');

    $('.current-date .current-jalali-date .current-year').html('');
    $('.current-date .current-jalali-date .current-month').html('');
    $('.current-date .current-jalali-date .current-day').html('');

    $('.current-date .current-day-name span:nth-child(2)').html('');
    $('.current-date .current-hijri-date').html('');
    $('.current-date .current-gregorian-date').html('');
    $('.current-date .current-gregorian-date-number').html('');
}

function fill_current_day()
{
    current_day_reset();

    let jalali_today = today_jalali();
    let gregorian_today = today_gregorian();
    let hijri_today = today_hijri();

    $('.current-date .current-jalali-date .current-year').append(jalali_today[0]);
    $('.current-date .current-jalali-date .current-month').append(jalali_months[jalali_today[1]-1]);
    $('.current-date .current-jalali-date .current-day').append(jalali_today[2]);

    $('.current-date .current-day-name span:nth-child(2)').append(jalali_days[jalali_today[3]]);
    $('.current-date .current-hijri-date').append(text_number[hijri_today[2]-1] + ' ' + Hijri_months[hijri_today[1]-1] + ' <span class="yekan">' + hijri_today[0] + '</span>');
    $('.current-date .current-gregorian-date').append(text_number[gregorian_today[2]-1] + ' ' + gregorian_months_fa[gregorian_today[1]-1] + ' <span class="yekan">' + gregorian_today[0] + '</span>');
    $('.current-date .current-gregorian-date-number').append(gregorian_today.slice(0, -1).join('/'));
}

// ########### End Today ###########



// ########### Date ###########
function fech_date()
{
    _year = 1400;
    _month = 11;
    _url = _url + 'get-date/' + _year + '/' + _month;
    _type = 'GET';

    $.ajax({
        'url': _url,
        'type': _type,
        success: function(response){
            console.log(response);
            response[_month] = response['_' + _month]
            delete response['_' + _month];
            cal = response;
        }
    });
}

function find_date_by_jalali(date_type)
{
    jdate = date_spliter(_today());
    date = date_spliter(cal[jdate[1]][jdate[2]][date_type]['date']);
    return [date[0], date[1], date[2], Number(cal['today']['day']['number'])];
}

function today_jalali()
{
    return find_date_by_jalali('jalali');
}

function today_gregorian()
{
    return find_date_by_jalali('gregorian');
}

function today_hijri()
{
    return find_date_by_jalali('hijri');
}

function find_click_month(year, month, event)
{
    year = Number(year);
    month = Number(month);
    console.log(['1', year, month]);
    if(event == 'previous')
    {
        month = month-1;
        if(month < 1)
        {
            month = 12;
            year = year-1;
        }
    }
    if(event == 'next')
    {
        month += 1;
        if(month > 12)
        {
            month = 1;
            year += 1;
        }
    }

    console.log([year, month]);
    return [year, month];
}

function calendar_days_reset()
{
    $('.calendar_day_list').children().remove();
    $('.year-boxer').html('');
    $('.year-boxer').attr('data-year', '');
    $('.month-boxer').html('');
    $('.month-boxer').attr('data-month', '');


    $('.btn-previous-month').attr('data-year', '');
    $('.btn-previous-month').attr('data-month', '');

    $('.btn-next-month').attr('data-year', '');
    $('.btn-next-month').attr('data-month', '');
}

function fill_empty_day(start_day_number)
{
    for(i=0; i<start_day_number; i++)
    {
        $('.calendar_day_list').append('<div class="calendar__number"></div>');
    }
}

function fill_calendar_date(year_num,month_num)
{
    calendar_days_reset();
    fill_empty_day(cal[month_num]['start_day_number']-1);

    let jalali_today = today_jalali();
    let today = jalali_today[2];

    $.each(cal[month_num], function(day_number, day_dates){
        if(day_number != 'start_day_number')
        {
            $('.calendar_day_list').append('<div class="calendar__number ' + (month_num == jalali_today[1] ? (day_number == today ? 'calendar__number--current' : '') : '') + '"><div class="calendar-box"><div class="jalali">' + day_number + '</div><div class="calendar-small-box"><div class="gregorian-small">' + date_spliter(day_dates['gregorian']['date'])[2] + '</div><div class="hijri-small">' + date_spliter(day_dates['hijri']['date'])[2] + '</div></div></div></div>');
        }
    });

    
    $('.year-boxer').append(' ' + year_num + ' ');
    $('.year-boxer').attr('data-year', year_num);
    $('.month-boxer').append(' ' + jalali_months[month_num-1] + ' ');
    $('.month-boxer').attr('data-month', month_num);


    
    founded_date = find_click_month(year_num, month_num, 'previous');
    $('.btn-previous-month').attr('data-year', founded_date[0]);
    $('.btn-previous-month').attr('data-month', founded_date[1]);

    founded_date = find_click_month(year_num, month_num, 'next');
    $('.btn-next-month').attr('data-year', founded_date[0]);
    $('.btn-next-month').attr('data-month', founded_date[1]);
}

$(document).on('click', '.btn-previous-month', function(e){
    var year = $(this).attr('data-year');
    var month = $(this).attr('data-month');

    fill_calendar_date(year, month);
})

$(document).on('click', '.btn-next-month', function(){
    let year = $(this).attr('data-year');
    let month = $(this).attr('data-month');

    // let founded_date = find_click_month('next');
    fill_calendar_date(year, month);
})

$(document).on('click', '.btn-previous-month', function(){
    
})

$(document).on('click', '.btn-previous-month', function(){
    
})

// ########### End Date ###########


$(document).ready(function(){
    fech_date();




    let jalali_today = today_jalali();

    startTime();
    fill_calendar_date(jalali_today[0], jalali_today[1]);
    fill_current_day();

    
});

