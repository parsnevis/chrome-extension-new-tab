function history()
{
    chrome.history.search({text: '', startTime:31556952000, maxResults: 50, }, function(data) {
        fill_realbox(data);
    });

    $('#matches').show();
}

function search(input)
{
    chrome.history.search({text: input, startTime:31556952000, maxResults: 500, }, function(data) {
        console.log(data)
        fill_realbox(data, 'search');
    });
}

function fill_realbox(data, type='history')
{
    $('#matches #groups').children().remove();

    count = 0;
    data.forEach(function(page) {
        title = page.title;//.substring(0, 50);

        if(count < 8 && title != "")
        {
            if(page.url.includes('google.com/search'))
            {
                $('#matches #groups').append('<div class="realbox-match"><div class="flex img"><span class="history"></span></div><div class="flex text" data-url="'+ page.url +'">'+ title +'</div><div class="flex remove"><span data-url="'+ page.url +'"></span></div></div>');
                count++;
            }
            
            if(type == 'search')
            {
                img = "https://www.google.com/s2/favicons?domain=" + page.url;
                $('#matches #groups').append('<div class="realbox-match"><div class="flex img"><img src="'+ img +'" /></div><div class="flex text" data-url="'+ page.url +'">'+ title +'</div><div class="flex remove"><span data-url="'+ page.url +'"></span></div></div>');
                count++;
            }
        }

    });   
}

function remove(url)
{
    chrome.history.deleteUrl({ url: url });
}

$(document).on("click", function (e) {
    var container = $("#matches");

    if ((!container.is(e.target) && container.has(e.target).length === 0) && !$(e.target).hasClass('bg')) 
    {
        $('#realbox-content').addClass('shadow');
        container.hide();
    }
});

$('#realbox-content').on('click', function(e){
    e.stopPropagation();
    $(this).removeClass('shadow');

    history();
});


$(document).on('mouseenter', '.realbox-match', function(){
    $(this).find('.remove span').css({'display': 'flex'});
});
$(document).on('mouseleave', '.realbox-match', function(){
    $(this).find('.remove span').css({'display': 'none'});
});


$(document).on('mouseenter', '.realbox-match .remove span', function(e){
    $(this).addClass('bg');
});

$(document).on('mouseleave', '.realbox-match .remove span', function(e){
    $(this).removeClass('bg');
});

$(document).on('click', '.realbox-match .remove span.bg', function(e){
    url = $(this).data('url');
    $(this).parent().parent().remove();
    remove(url);
});

$(document).on('keyup', '#search', function(e){
    input = $(this).val();
    search(input);
});

$(document).on('click', '.realbox-match .text', function(e){
    url = $(this).data('url');
    window.open(url, '_self');
});


