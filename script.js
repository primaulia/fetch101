$(function () {
  var $source = $('.source')
  var $h1 = $('h1')
  var $author = $('small span')

  $source.on('change', function(e) {
    console.log(this);
    var source = $(this).find(':selected').val()
    callApi(source) // is a fn that fetch newsapi
    randomQuote() // is a fn that fetch randomQuote
  })

  function randomQuote() {
    var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/'

    fetch(url, {
      method: 'POST',
      headers: {
        'X-Mashape-Key': 'y2WFWXi1A1mshLXvjdIjez35utEGp1FW9JgjsnMjbWIdC6nINL',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // 'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      $h1.text(data.quote)
      $author.text(data.author)
    })
  }

  randomQuote()

  function callApi (source = 'reuters') {
    var url = `https://newsapi.org/v1/articles?source=${source}&apiKey=6a1b87ded86d47cf8f7b18a230f094bf`

    var apiCall = fetch(url)

    apiCall
    .then((res) => { // when we got response back
      return res.json() // asynchronously happening
    })
    .then(writeLiEveryArticle)
    .catch((err) => {
      console.log('error happened somewhere')
      console.log(err)
    })
  }

  // the dom manipulations part
  function writeLiEveryArticle(data) {
    // loop the data.articles
    // create <li> every article
    // append it to the ul in the html
    var articles = data.articles
    var $ul = $('ul')
    $ul.empty()

    articles.forEach(article => {
      var $title = $('<h3>')
      $title.text(article.title)

      var $p = $('<p>')
      $p.text(article.description)

      var $img = $('<img>')
      $img.attr('src', article.urlToImage)

      var $li = $('<li>')
      $li.append($title, $p, $img)
      $ul.append($li)
    })
  }

  callApi()
})
