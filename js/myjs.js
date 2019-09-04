

$(document).ready(function(){
    M.AutoInit();
    var container = $('#feedsresult');
    const health_default_keywords = ['health','medical','life'];
    // $('select').material_select();
    // const country_list = ['ph', 'gb', 'us'];
    // const health_industry = ['media', 'technology'];
    // const pay_default_keywords = ['pay', 'benefits', 'tax', 'salary', 'insurance', 'benefits', 'bonus', 'compensation'];

    var country = "All";
    var news = new Array();
    // var bookmarks = new Array();

    
    $('#cmbcountry').on('change', filterNewsbyCountry);
    $('#industry').on('change', filterNewsbyIndustry);
    $('#edit-photo-icon').on('click', editphoto);
    getHeadlines(health_default_keywords, country);
    getPhilNews();

    function editphoto(){
        alert("Edit Photo");
    }

    function filterNewsbyIndustry(){
        var industry = $('#industry').val();
        // var tempNews = Array();
        industry = String(industry).split(',');
        container.html('');
        for(let i = 0; i < industry.length; i++){
            for(let j = 0; j < news.length; j++){
                if(news[j].description){
                    if(news[j].description.toLowerCase().includes(industry[i].toLowerCase())){
                        // tempNews.push(news[j]);
                        container.append(
                            `<div class='card card-pin'>
                                <img class='card-img' src='${ news[j].urlToImage }' alt='Card Image'/>
                                <div class='feed-title'>${ news[j].title }</div>
                                <button data-url="${ news[j].url }" type="button" class="btn btn-readmore" data-toggle="modal" data-content="${ news[j].description }" data-target="#feedModal" data-feedtitle="${ news[j].title }" data-imglink="${ news[j].urlToImage }">Read More</button>
                            </div>`
                        );
                    }
                }
                else{
                    if(news[j].text.toLowerCase().includes(industry[i].toLowerCase())){
                        container.append(
                            `<div class='card card-pin'>
                                <img class='card-img' src='${ news[j].thumbnail }' alt='Card Image'/>
                                <div class='feed-title'>${ news[j].title }</div>
                                <button data-url="${ news[j].url }" type="button" class="btn btn-readmore" data-toggle="modal" data-content="${ news[j].text }" data-target="#feedModal" data-feedtitle="${ news[j].title }" data-imglink="${ news[j].thumbnail }">Read More</button>
                            </div>`
                        );
                    }
                }
            }
        }
    }

    function filterNewsbyCountry(){
        container.html('');
        var country = $('#cmbcountry').val();
        var tagstoFilter = ($('#filteredkeys').attr("selectedIndex") == undefined)? health_default_keywords : $('#filteredkeys').val();
        country = String(country).split(',');
        
        news = [];
        console.log(news);
        for(let i = 0; i < country.length; i++){
            // if(country[i] != 'All'){ $('#cmbcountry option:first').prop("checked", false); }
            if(country[i] == "ph"){ getPhilNews(); }
            else if(country[i] == "All"){ getHeadlines(tagstoFilter, country[i]); getPhilNews(); }
            else{ getHeadlines(tagstoFilter, country[i]); }
            
        }  
        filterNewsbyIndustry();
        
    }

    function getPhilNews(){
        var url = 'https://abs-cbn.herokuapp.com/api/articles?category=life';
        var req = new Request(url);
            var counter = 0;
            fetch(req)
            .then(response => response.json())
                .then(data => {
                    for (const article of data.data) {
                        if(counter < 20){
                            if(article.thumbnail){
                                container.append(
                                    `<div class='card card-pin'>
                                        <img class='card-img' src='${ article.thumbnail }' alt='Card Image'/>
                                        <div class='feed-title'>${ article.title }</div>
                                        <button data-url="${ article.url }" type="button" class="btn btn-readmore" data-toggle="modal" data-content="${ article.text }" data-target="#feedModal" data-feedtitle="${ article.title }" data-imglink="${ article.thumbnail }">Read More</button>
                                    </div>`
                                );
                            }
                            else{
                                container.append(
                                    `<div class='card card-pin'>
                                        <div class='feed-title'>${ article.title }</div>
                                        <button data-url="${ article.url }" type="button" class="btn btn-readmore" data-toggle="modal" data-content="${ article.text }" data-target="#feedModal" data-feedtitle="${ article.title }">Read More</button>
                                    </div>`
                                );
                            }
                        }
                        else{
                            break;
                        }
                        counter += 1;
                        news.push(article);
                    }
                }) 
    }
    function getHeadlines(default_keywords, country){
        for(i = 0; i < default_keywords.length; i++){
            if(country != "All"){
                var url = 'https://newsapi.org/v2/top-headlines?' +
                'country=' + country + '&' +
                'q=' + default_keywords[i] + '&' +
                'apiKey=20a156e57bd944e2ab94903ef1316aa7';
            }
            else{
                var url = 'https://newsapi.org/v2/top-headlines?' +
                'q=' + default_keywords[i] + '&' +
                'apiKey=20a156e57bd944e2ab94903ef1316aa7';
            }
            var req = new Request(url);
            fetch(req)
                .then(response => response.json())
                    .then(data => {
                        for (const article of data.articles) {
                            if(article.urlToImage){
                                container.append(
                                    `<div class='card card-pin'>
                                        <img class='card-img' src='${ article.urlToImage }' alt='Card Image'/>
                                        <div class='feed-title'>${ article.title }</div>
                                        <button data-url="${ article.url }" type="button" class="btn btn-readmore" data-toggle="modal" data-content="${ article.description }" data-target="#feedModal" data-feedtitle="${ article.title }" data-imglink="${ article.urlToImage }">Read More</button>
                                    </div>`
                                );
                            }
                            else{
                                container.append(
                                    `<div class='card card-pin'>
                                        <div class='feed-title'>${ article.title }</div>
                                        <button data-url="${ article.url }" type="button" class="btn btn-readmore" data-toggle="modal" data-content="${ article.description }" data-target="#feedModal" data-feedtitle="${ article.title }">Read More</button>
                                    </div>`
                                );
                            }
                            news.push(article);
                        }
                    }) 
        }				
    }

    var expanded = false;

    function showCheckboxes() {
    var checkboxes = document.getElementById("checkboxes");
    if (!expanded) {
        checkboxes.style.display = "block";
        expanded = true;
    } else {
        checkboxes.style.display = "none";
        expanded = false;
    }
    }
});
