$(document).ready(function() {

    $('.generate-english-contributors').on('click', function (e) {
        var contributors = $('#contributors-id').val();
        var contributorsEn = transliterate(contributors.replace('ё', 'е'));
        $('#contributors-id-en').val(contributorsEn);
    });


/*

    function readFileInputEventAsArrayBuffer(file, callback) {
        var reader = new FileReader();

        reader.onload = function(loadEvent) {
            var arrayBuffer = loadEvent.target.result;
            callback(arrayBuffer);
        };

        reader.readAsArrayBuffer(file);
    }



    $('#field-paper-file-id').on('change filebatchselected', function (e) {
        $(this).trigger('blur');

        $('#paper-not-parsed').hide();

        var file = this.files[0];

        var options = {
            styleMap: [
                "p[style-name='Авторы'] => h1",
                "p[style-name='Места работы'] => h3",
            ],
            includeDefaultStyleMap: false
        };
        readFileInputEventAsArrayBuffer(file, function(arrayBuffer) {

            try {
                mammoth.convertToHtml({arrayBuffer: arrayBuffer}, options)
                    .then(parseResult, displayError)
                    .done();
            }
            catch (ex) {
                displayError();
            }

        });
    });




*/

/*
    function parseResult(result) {

        var resultArray = [];

        var $html = $('<div>').html(result.value);

        $authors = $html.find('h1:first');
        $numbers = $authors.find('sup').remove();
*/

        //console.log (result.messages);

        /*
        var works = [];
        $numbers.each(function( index ) {
            var t = $(this).text().split(',');
            var filteredWorks = [];
            $.each(t, function( i, value ) {
                if ($.isNumeric(value)) {
                    filteredWorks.push(+value);
                }
            });
            works[index] = filteredWorks;
        });

        var authors = $authors.text();
        var a = authors.split(',');

        $.each(a, function( index, value ) {
            var q = {};

            var filteredAuthor = [];

            var splits = value.split(/\s+/);

            var surname = splits.pop();
            var therest = splits;

            filteredAuthor['surname'] = surname;
            filteredAuthor['initials'] = therest;

            q.author = filteredAuthor;
            q.works = works[index];

            resultArray.push(
                q
            );
        });


        console.log (resultArray);
*/
/*
        var contributors = $authors.text();

        var contributorsEn = transliterate(contributors.replace('ё', 'е'));

        $('#contributors-id').val(contributors).blur();
        $('#contributors-id-en').val(contributorsEn).blur();

    }


    function displayError() {
        $('#paper-not-parsed').show();
    }
*/

});