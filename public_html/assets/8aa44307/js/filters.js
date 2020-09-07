zaa.filter('secondsToMinutesFilter', ['$filter',
    function($filter) {
        return function(input){
            dayjs.extend(window.dayjs_plugin_relativeTime);

            // TODO: Fucking locales

            var m1 = dayjs.unix(0);
            var m2 = dayjs.unix(input);
            var diff = m2.from(m1, true);

            return diff;
        };
    }
]);