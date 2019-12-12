$(function () {
    const getArticles = () => {
        const category = $('.header__sectionWrapper').val();
        $.ajax({
            type: 'GET',
            url: `https://api.nytimes.com/svc/topstories/v2/${category}.json?api-key=91MnfWevTdr6zkWbGOsM5wjGin9Hej9K`,
            beforeSend: function () {
                $('.loader').removeClass('hide');
            },
            success: function () {
                $('.loader').addClass('hide');
                $('.header').addClass('clicked');
            }
        })
            .then(
                data => {
                    for (let i = 0; i < 12; i++) {
                        const link = data.results[i].url;
                        const img = data.results[i].multimedia[4].url;
                        const desc = data.results[i].abstract;
                        $(`<a href="${link}" class="articles__item" style="background-image:url('${img}');" target="_blank">
                <article>
                    <p class="articles__desc hide">${desc}</p>
                </article>
            </a>`)
                            .appendTo(".articles");
                    }
                },
                error => alert('Failed to load')
            )
    }

    getArticles();

    $('.header__sectionWrapper').change(function () {
        $(".articles").empty();
        getArticles();
    });

    //abstract
    $("a").hover(
        function () {
            console.log('hover!')
            $('.articles__desc')
                .toggleClass('hide')
                .toggleClass('show')
        }
    );


});



