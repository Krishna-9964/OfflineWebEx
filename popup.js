
button = document.getElementById('openNewTabButton');
button.addEventListener('click', function () {
    window.open("index.html", '_blank')

})
filter = document.getElementById('FilterHistory');
filter.addEventListener('click', function () {
    window.open("filter.html", '_blank')

})

search = document.getElementById('OfflineSearch');
search.addEventListener('click', function () {
    window.open("./search box/index.html", '_blank')
})
