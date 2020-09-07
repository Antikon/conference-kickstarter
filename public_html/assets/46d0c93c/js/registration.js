$(document).ready(function() {

    $('#field-country-id').on('change', function () {

        var $this = $(this);
        var countryId = $this.val();
        var url = $this.data('getJsonCitiesUrl');
        var $select = $('#field-city-id');
        var $countryCode = $('#country-code-id');

        $.get(url, {id: countryId}, function (data) {
            //get the JSON data from the action
            //check if the system found any data
            if (data !== null && data.cities !== undefined) {
                // Response is ok
                var timer;
                clearTimeout(timer);


                $select.find('option').remove();
                var size = 0;
                $.each(data.cities, function (key, value) {
                    if (value.city_name !== undefined && value.id !== undefined) {
                        $select.append($('<option>').text(value.city_name).attr('value', value.id));
                        size++;
                    }
                });
                if (!size) {
                    $select.append($('<option>').attr('disabled', 'disabled').attr('value', 0));
                }

                $select.trigger('change').addClass('highlightField');
                timer = setTimeout(function () {
                    $select.removeClass('highlightField').blur();
                }, 1000);

                // TODO: Country code

                if (data.code !== undefined && !$countryCode.hasClass('manualMode')) {
                    $countryCode.val('+' + data.code);
                }

            } else {
                console.log('%cAjax error', 'color: red;');
                //if data wasn't found the alert.
            }
        });
    });


    $('#field-city-id').on('change', function () {

        var $this = $(this);
        var cityId = $this.val();
        var url = $this.data('getJsonInstitutesUrl');
        var $select = $('#field-affiliation-id');


        $.get(url, {id: cityId}, function (data) {
            //get the JSON data from the action
            //check if the system found any data


            if (data !== null && data.institutes !== undefined) {
                // Response is ok
                var timer;
                clearTimeout(timer);

                $select.find('option').remove();
                var size = 0;
                $.each(data.institutes, function (key, value) {
                    if (value.short_name !== undefined && value.id !== undefined) {
                        $select.append($('<option>').text(value.short_name).attr('value', value.id));
                        size++;
                    }
                });

                //TODO: Проверить, как yii2 реагирует на select без option
                if (!size) {
                    $select.append($('<option>').attr('disabled', 'disabled').attr('hidden', 'hidden').attr('value', 0));
                }
                $select.trigger('change').addClass('highlightField').blur();
                timer = setTimeout(function () {
                    $select.removeClass('highlightField');
                }, 1000);
            } else {
                console.log('%cAjax error', 'color: red;');
                //if data wasn't found the alert.
            }
        });
    });

    $('#field-affiliation-id').on('change', function () {
        var $this = $(this);
        var instituteId = $this.val();
        var url = $this.data('getJsonInstitutesNamesUrl');
        var $textarea = $('#field-full-affiliation-name');


        $.get(url, {id: instituteId}, function (data) {
            //get the JSON data from the action
            //check if the system found any data


            if (data !== null && data.fullName !== undefined) {
                // Response is ok
                var timer;
                clearTimeout(timer);

                $textarea.val(data.fullName);

                $textarea.addClass('highlightField').blur();
                timer = setTimeout(function () {
                    $textarea.removeClass('highlightField');
                }, 1000);
            } else {
                console.log('%cAjax error', 'color: red;');
                //if data wasn't found the alert.
            }
        });
    });


    $('#country-code-id').on('change', function () {
        var $this = $(this);
        $this.addClass('manualMode');
    });


    if (_formJsTrigger !== undefined) {
        //console.log(_formJsTrigger );

        switch (_formJsTrigger) {

            case 'country':
                $('#field-country-id').trigger('change');
                break;

            case 'city':
                $('#field-city-id').trigger('change');
                break;

            default:
                $('#field-affiliation-id').trigger('change');

        }

    }

    // Init the first change
    //$('#field-country-id').trigger('change');

});