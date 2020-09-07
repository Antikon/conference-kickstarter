$(document).ready(function() {

    var $wrapperDiv = $('#conf-transport-concrete-date-div');
    var $dateSelect = $('#conf-transport-date-select');
    var $transportTypeSelect = $('#conf-transport-type-select');
    var $transportStationSelect = $('#conf-transport-station-select');
    var $transportSelect = $('#conf-transport-select');
    var $timeInput = $('#conf-transport-time');



    var reloadTransportSelect = function()
    {

        var date = $dateSelect.val();
        var type = $transportTypeSelect.val();
        var station = $transportStationSelect.val();



        var url = $transportSelect.data('getJsonTransport');

        $.get(url,
            {
                event: _transportEvent,
                date: date,
                type: type,
                station: station
            },
            function (data) {
                //get the JSON data from the action
                //check if the system found any data


                if (data !== null && data.transport !== undefined) {
                    // Response is ok
                    var timer;
                    clearTimeout(timer);

                    $transportSelect.find('option').remove();
                    var size = 0;
                    $.each(data.transport, function (key, value) {

                        $transportSelect.append(
                            $('<option>')
                                .text(value.fullName)
                                .attr('value', value.id)
                                .attr('data-time', value.time)
                        );
                        size++;
                    });

                    //TODO: Проверить, как yii2 реагирует на select без option
                    if (!size) {
                        $transportSelect.append($('<option>').attr('disabled', 'disabled').attr('hidden', 'hidden').attr('value', 0));
                    }


                    $transportSelect.trigger('change').addClass('highlightField').blur();
                    timer = setTimeout(function () {
                        $transportSelect.removeClass('highlightField');
                    }, 1000);
                } else {
                    console.log('%cAjax error', 'color: red;');
                    //if data wasn't found the alert.
                }
            });


    };


    $dateSelect.on(
        'change',
        function ()
        {

            var $this = $(this);
            var dateTimestamp = +$this.val();


            if (dateTimestamp > 0) {
                if ($wrapperDiv.is(':hidden')){
                    $transportTypeSelect.trigger('change');
                } else {
                    reloadTransportSelect();
                }
                $wrapperDiv.show('fast');
            } else {
                $wrapperDiv.hide('fast');
            }
        }
    );


    $transportTypeSelect.on('change', function () {

        var $this = $(this);
        var type = $this.val();
        var url = $this.data('getJsonStations');

        $.get(url,
            {type: type},
            function (data) {
            //get the JSON data from the action
            //check if the system found any data


            if (data !== null && data.stations !== undefined) {
                // Response is ok
                var timer;
                clearTimeout(timer);

                $transportStationSelect.find('option').remove();
                var size = 0;
                $.each(data.stations, function (key, value) {

                    $transportStationSelect.append($('<option>').text(value).attr('value', key));
                    size++;
                });

                //TODO: Проверить, как yii2 реагирует на select без option
                if (!size) {
                    $transportStationSelect.append($('<option>').attr('disabled', 'disabled').attr('hidden', 'hidden').attr('value', 0));
                }

                $transportStationSelect.trigger('change').addClass('highlightField').blur();
                timer = setTimeout(function () {
                    $transportStationSelect.removeClass('highlightField');
                }, 1000);
            } else {
                console.log('%cAjax error', 'color: red;');
                //if data wasn't found the alert.
            }
        });
    });

    $transportStationSelect.on('change', function () {
        // Reload transport select
        reloadTransportSelect();
    });


    $transportSelect.on('change', function () {
        var time = $('option:selected', this).data('time');
        $timeInput.val(time);
    });

});