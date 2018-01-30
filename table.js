var searchString = 'Skip';
$(".hovertable tr td:contains('" + searchString + "')").each(function() {
    if ($(this).text() == searchString) {
        $(this).parent().remove();
    }
});