/**
 * @param {object} result
 */
function addResult(result) {
    var gitUrl = result.git_url;

    $.getJSON(gitUrl, function(snippet) {
        var content = snippet.content;
        var decodedContent= decode(content);

        addToHTML(result, decodedContent);
    });
}

/**
 * @param {array} results
 */
function addResults(results) {
    var resultsCount = results.length;

    for (var i = 0; i < resultsCount; i++) {
        addResult(results[i]);
    }
    if(resultsCount === 0){
      showNoResult(true);
    }
}

/**
 * @param {object} result
 * @param {string} snippet
 */
function addToHTML(result, snippet){
    var path = result.path;
    var url = result.html_url;
    var avatarUrl = result.repository.owner.avatar_url;

    var image = '<img class="small-logo" src=' + avatarUrl + ">";
    var link = "<a target=_blank href=" + url + ">" + path + "</a>";
    var preview = "<div>"+ snippet +"</div>";

    var html = "<li class='result'>" + image + link + preview + "</li>";

    $("#results").append(html);
}
/**
 * @param {string} content
 * @return {string}
 */
function decode(content) {
    var encodedContent = content.split("\n").join("");
    var decodedContent = atob(encodedContent);
    return decodedContent;
}

/**
 * @param {string} searchQuery
 */
function getGithubSearchResults(searchQuery) {
    var GITHUB_API_URL = "https://api.github.com/search/code?q=repo%3AScriptEdcurriculum%2Fcurriculum2016+";

    $.getJSON(GITHUB_API_URL + searchQuery, function(response) {
        loading(false);
        addResults(response.items);
    })
    .error(function() {
        loading(false);
    });
}

function search(){
    $("#results").empty();
    showNoResult(false);
    loading(true);
    var searchQuery = $("#search-input").val();

    getGithubSearchResults(searchQuery);
}

function loading(show){
    if (show){
        $("#loadingIcon").show();
    }
    else{
     $("#loadingIcon").hide();
    }
}

function showNoResult(show){
     if (show){
        $("#noResult").show();
    }
    else{
     $("#noResult").hide();
    }
}
$(document).ready(function() {
    $("#search-button").click(function () {
      search();
    });


    $("#search-input").keydown(function(event){
       if(event.which === 13){
          search();
       }
    });
});
