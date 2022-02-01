console.clear();

var CalendarDates = 'as';
var CalendarMonthDates = '';
var Today = '';
var Url = 'http://localhost/server-new-tab/public/api/';

jalali_months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شرویور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
gregorian_months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
gregorian_months_fa = ['ژانویه', 'فوریه', 'مارس', 'آپریل', 'می', 'ژوئن', 'ژولای', 'آگوست', 'سپتامبر', 'اکتبر', 'نوامبر', 'دسامبر'];
Hijri_months = ['محرم', 'صفر', 'ربیع الاول', 'ربیع الثانی', 'جمادی الاول', 'جمادی الثانی', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذی القعده', 'ذی الحجه'];

var jalali_days = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
var gregorian_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var Hijri_days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

var text_number = ['یکم', 'دوم', 'سوم', 'چهارم', 'پنجم', 'ششم', 'هفتم', 'هشتم', 'نهم', 'دهم', 'یازدهم', 'دوازدهم', 'سیزدهم', 'چهاردهم', 'پانزدهم', 'شانزدهم', 'هفدهم', 'هجدهم', 'نوزدهم', 'بیستم', 'بیست و یکم', 'بیست و دوم', 'بیست و سوم', 'بیست و چهارم', 'بیست و پنجم', 'بیست و ششم', 'بیست و هفتم', 'بیست و هشتم', 'بیست و نهم', 'سی ام', 'سی و یکم'];



$(document).ready(function(e) {
    
    function load_today()
    {
        chrome.storage.local.get('today', function(items) {
            var today = items.today;
            if (!today)
                set_today();
            else
                Today = today;

        });

        function set_today()
        {
            if(checkConnectionNetwork())
                server_set_today();
            else
                JS_set_today();
        }

        function server_set_today()
        {
            _url = Url + 'get-today';
            _type = 'GET';
    
            $.ajax({
                'url': _url,
                'type': _type,
                'alocal': false,
                'global': false,
                success: function(response){
                    chrome.storage.local.set({'today': response});
                    Today = response;
                }
            });
        }

        function JS_set_today()
        {
            const date = new Date();
            gy = date.getFullYear();
            gm = date.getMonth()+1;
            gd = date.getDate();
    
            gdate = gy + '/' + gm + '/' + gd;
            jdate = gregorian_to_jalali(gy, gm, gd).join('/');
    
            let today = {};
            today.date = jdate;
    
            today.day = {};
            today.day.number = date.getDay()+1
            today.day.name = jalali_days[date.getDay()+1];
    
            chrome.storage.local.set({'today': today});
            Today = today;
        }
    }
    load_today();

    
    function load_calendar_dates()
    {
        chrome.storage.local.get('calendar_dates', function(items) {
            var calendar_dates = items.calendar_dates;
            if (!calendar_dates)
                set_calendar_dates();
            else
                get_calendar_dates(calendar_dates);
        });


        // Get Calendar Dates
        function set_calendar_dates()
        {
            _url = Url + 'get-calendar-dates';
            _type = 'GET';

            $.ajax({
                'url': _url,
                'type': _type,
                'alocal': false,
                'global': false,
                'async': false,
                success: function(response){
                    chrome.storage.local.set({'valid_data': true});
                    chrome.storage.local.set({'calendar_dates': response});
                    CalendarDates = response;
                }
            });
        }

        function get_calendar_dates(calendar_dates)
        {
            CalendarDates = calendar_dates;
        }
    }
    load_calendar_dates();
});


// Check Intenet Connection
function checkConnectionNetwork() {
    var xhr = new XMLHttpRequest();
    var file = "https://www.time.ir/Content/media/image/2021/12/152_orig.svg";
    var r = Math.round(Math.random() * 10000);
    // xhr.open('HEAD', file + "?subins=" + r, false);
    xhr.open('GET', file + "?subins=" + r, false);
    try {
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 304)
            return true;
        return false;
    }
    catch (e) {
        return false;
    }
}

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


// Load File From Local
// function loadJSON(callback) {   

//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', './assets/js/calendar.json', true);
//     xobj.onreadystatechange = function () {
//           if (xobj.readyState == 4 && xobj.status == "200") {
//             // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in alocalhronous mode
//             callback(xobj.responseText);
//           }
//     };
//     xobj.send(null);  
// }

// loadJSON(function(response) {
//     var actual_JSON = JSON.parse(response);
// });


// Register User In Api Or Chrome Extension
function getRandomToken() {
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    return hex;
}

chrome.storage.local.get('extension_user_id', function(items) {
    var extension_user_id = items.extension_user_id;
    if (extension_user_id)
        useToken(extension_user_id);
    else
    {
        extension_user_id = getRandomToken();
        chrome.storage.local.set({extension_user_id: extension_user_id}, function() {
            useToken(extension_user_id);
        });
    }

    function useToken(extension_user_id) {
        // TODO: Use user id for authentication or whatever you want.
        console.log("extension_user_id:" + extension_user_id);
    }
});


$(window).on('load', function(){
    startTime();
    // weather();
    fill_current_day();
    fill_current_time_text();
    

    let jalali_today = today_jalali();
    fill_calendar_date(jalali_today[0], jalali_today[1]);

    fill_year_box();
    fill_month_box();
    // fech_date();
    // let jalali_today = today_jalali();

    
    // fill_calendar_date(jalali_today[0], jalali_today[1]);
    // fill_current_day();
});


// ########### Public Function ###########
function clear_all_storage()
{
    // chrome.storage.local.remove('extension_user_id');
    chrome.storage.local.clear(() => {
        console.log('Everything was removed');
    });
}
// clear_all_storage();

function date_spliter(date)
{
    date = date.split('/');
    return [Number(date[0]), Number(date[1]), Number(date[2])];
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
// ########### Public Function ###########



// ########### Current Time ###########

function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function find_time()
{
    const time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    return [h, m, s];
}

function startTime() {
    time = find_time();
    document.getElementById('current-time').innerHTML =  time[0] + ":" + time[1] + ":" + time[2];
    setTimeout(startTime, 1000);
}
  
function fill_current_time_text()
{
    time = find_time();
    switch (time[0]) {
        case 1:
            text = "لا لا لا، گل پونه 🌛";
            break;

        case 2:
            text = "وجدانا بیداری؟";
            break;

        case 3:
            text = "چیزی ندارم بگم!";
            break;

        case 4:
            text = "";
            break;

        case 5:
            text = "به به سحر خیز";
            break;

        case 6:
            text = "ورزش کردی؟ 🏃‍♂️";
            break;

        case 7:
            text = "نیمرو چی میگه! 🍳";
            break;

        case 8:
            text = "روز خوبی داشته باشی ✌️";
            break;

        case 9:
            text = "چایی ات رو خوردی؟ ☕";
            break;

        case 10:
            text = "یه لیوان شیر بزن 🥛";
            break;

        case 11:
            text = "پاشو یه قدم بزن 👣";
            break;

        case 12:
            text = "اااا 12 شد؟ 🕛";
            break;

        case 13:
            text = "ناهار چی داری؟ 😋";
            break;

        case 14:
            text = "خوابت نبره! 🥱";
            break;

        case 15:
            text = "چایی دوم رو بزن ☕";
            break;

        case 16:
            text = "پاشو وقت رفتنه";
            break;

        case 17:
            text = "یه استراحت کوچیک لازمه!";
            break;

        case 18:
            text = "چایی سوم رو زدی؟";
            break;

        case 19:
            text = "میوه قبل شام رو خوردی؟ 🥙";
            break;

        case 20:
            text = "شام خوب بود؟";
            break;

        case 21:
            text = "نمیخوای بری؟";
            break;

        case 22:
            text = "برو بخواب دیگه! 😴";
            break;

        case 23:
            text = "هنوز بیداری؟ 🤓";
            break;

        case 24:
            text = "نشستی ببینی چی مینویسم؟ 🤣";
            break;

        default:
            text = "یه روز عااالی 💪";
            break;
    }

    $('.current-time-text').html(text);

    setTimeout(fill_current_time_text, 60000);
}


// ########### End Current Time ###########


// ########### Weather ###########

// ########### End Weather ###########



// ########### Today ###########

function current_day_reset()
{
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
function find_date_by_jalali(date_type)
{
    jdate = date_spliter(Today['date']);

    result = [];
    $.each(CalendarDates, function(index, calendar_year){
        // console.log(index, calendar_year)
        year_dates = calendar_year['year'];
        if(year_dates == jdate[0])
        {
            month_dates = JSON.parse(calendar_year['_'+jdate[1]]);
            day_dates = month_dates[jdate[2]];
            date = date_spliter(day_dates[date_type]['date']);
            result =  [date[0], date[1], date[2], Number(Today['day']['number'])];
        }
    });
    return result;
}


function find_calendar_of_year(year)
{    
    $.each(CalendarDates, function(index, calendar_year){
        year_dates = calendar_year['year'];
        if(year_dates == year)
            result = calendar_year;
    });
    return result;
}

function find_click_month(year, month, event)
{
    year = Number(year);
    month = Number(month);

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
    
    // $('.year-box .wrapper .grid *').attr('data-year', '');
    // $('.year-box .wrapper .grid *').attr('data-month', '');
        
    // $('.month-box .wrapper .grid *').attr('data-year', '');
    // $('.month-box .wrapper .grid *').attr('data-month', '');
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
    let jalali_today = today_jalali();
    let year = jalali_today[0];
    let day = jalali_today[2];
    let cal = find_calendar_of_year(year);

    calendar_days_reset();
    
    month_dates = JSON.parse(cal['_'+month_num]);
    fill_empty_day(month_dates['start_day_number']);

    $.each(month_dates, function(day_number, day_dates){
        if(day_number != 'start_day_number')
        {
            $('.calendar_day_list').append('<div class="calendar__number ' + (month_num == jalali_today[1] ? (day_number == day ? 'calendar__number--current' : '') : '') + '"><div class="calendar-box"><div class="jalali">' + day_number + '</div><div class="calendar-small-box"><div class="gregorian-small">' + date_spliter(day_dates['gregorian']['date'])[2] + '</div><div class="hijri-small">' + date_spliter(day_dates['hijri']['date'])[2] + '</div></div></div></div>');
        }
    });

    $('.year-boxer').append(' ' + year_num + ' ');
    $('.year-boxer').attr('data-year', year_num);
    $('.month-boxer').append(' ' + jalali_months[(month_num-1)] + ' ');
    $('.month-boxer').attr('data-month', month_num);

    founded_date = find_click_month(year_num, month_num, 'previous');
    $('.btn-previous-month').attr('data-year', founded_date[0]);
    $('.btn-previous-month').attr('data-month', founded_date[1]);

    founded_date = find_click_month(year_num, month_num, 'next');
    $('.btn-next-month').attr('data-year', founded_date[0]);
    $('.btn-next-month').attr('data-month', founded_date[1]);
}

function fill_year_box()
{
    month = $('.month-boxer').attr('data-month');
    $.each(CalendarDates, function(index, calendars){
        $('.year-box .wrapper .grid').append('<span class="text-sm p-1 cursor-pointer text-center rounded-sm year" data-year="'+ calendars['year'] +'" data-month="'+ month +'">'+ calendars['year'] +'</span>');
    });
}

function fill_month_box()
{
    year = $('.year-boxer').attr('data-year');
    $.each(jalali_months, function(index, month){
        $('.month-box .wrapper .grid').append('<span class="text-sm p-1 cursor-pointer text-center rounded-sm month"  data-year="'+ year +'" data-month="'+ (index+1) +'">'+ month +'</span>');
    });
}


$(document).on('click', '.btn-previous-month', function(e){
    var year = $(this).attr('data-year');
    var month = $(this).attr('data-month');

    $('.year-box .wrapper .grid *').attr('data-month', (month));
    $('.month-box .wrapper .grid *').attr('data-year', year);

    fill_calendar_date(year, month);
})

$(document).on('click', '.btn-next-month', function(){
    let year = $(this).attr('data-year');
    let month = $(this).attr('data-month');

    $('.year-box .wrapper .grid *').attr('data-month', (month));
    $('.month-box .wrapper .grid *').attr('data-year', year);

    fill_calendar_date(year, month);
})

$(document).on('click', '.month-boxer', function(e){
    e.stopPropagation();
    $(".year-box").hide();
    $('.month-box').toggle();
})

$(document).on('click', '.year-boxer', function(e){
    e.stopPropagation();
    $(".month-box").hide();
    $('.year-box').toggle();
})

$(document).on("click", function () {
    $(".month-box").hide();
    $(".year-box").hide();
});

$(document).on('click', '.year-box .year', function(){
    let year = $(this).data('year');
    let month = $(this).data('month');
    fill_calendar_date(year, month);
});

$(document).on('click', '.month-box .month', function(){
    let year = $(this).data('year');
    let month = $(this).data('month');
    fill_calendar_date(year, month);
});
// ########### End Date ###########




