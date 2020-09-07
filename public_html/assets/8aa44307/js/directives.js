zaa.directive('confCheckboxRelations', function () {
    return {
        restrict: 'E',
        scope: {
            'horizontal': '@',
            'vertical': '@',
            'horizontalUrl': '@',
            'verticalUrl': '@',
            'relationsUrl': '@',
            'saveRelationsUrl': '@',

        },
        controller: ['$scope', '$http', 'AdminToastService', function ($scope, $http, AdminToastService) {

            if ($scope.horizontal === undefined || $scope.horizontal === '' || $scope.vertical === undefined || $scope.vertical === '') {
                throw i18n['Both horizontal and vertical modes must be set when using conf-checkbox-relations directive'];
            }


            if ($scope.horizontalUrl === undefined || $scope.horizontalUrl === '') {
                $scope.horizontalUrl = 'admin/api-conference-conf'+$scope.horizontal+'/get-'+$scope.horizontal;
            }


            if ($scope.verticalUrl === undefined || $scope.verticalUrl === '') {
                $scope.verticalUrl = 'admin/api-conference-conf'+$scope.vertical+'/get-'+$scope.vertical;
            }


            if ($scope.relationsUrl === undefined || $scope.relationsUrl === '') {
                $scope.relationsUrl = 'admin/api-conference-'+$scope.vertical+'and'+$scope.horizontal+'/get-relations';
            }

            if ($scope.saveRelationsUrl === undefined || $scope.saveRelationsUrl === '') {
                $scope.saveRelationsUrl = 'admin/api-conference-'+$scope.vertical+'and'+$scope.horizontal+'/set-relations';
            }




            $scope[$scope.horizontal] = null;
            $scope[$scope.vertical] = null;
            $scope.relations = null;


            $scope.loadHorizontal = function() {
                $http.get($scope.horizontalUrl).then(function(response) {
                    if (response.status === 200) {
                        $scope[$scope.horizontal] = response.data;
                    } else {
                        AdminToastService.error($scope.horizontal + ' ' + i18n['not loaded']);
                    }
                });
            };

            $scope.loadVertical = function() {
                $http.get($scope.verticalUrl).then(function(response) {
                    if (response.status === 200) {
                        $scope[$scope.vertical] = response.data;
                    } else {
                        AdminToastService.error($scope.vertical + ' ' + i18n['not loaded']);
                    }
                });
            };


            $scope.loadRelations = function() {
                $http.get($scope.relationsUrl).then(function(response) {
                    if (response.status === 200) {
                        $scope.relations = response.data;
                    } else {
                        AdminToastService.error(i18n['Relations not loaded']);
                    }
                });
            };

            $scope.sendRequest = function(verticalId, horizontalId, checked) {
                $http({
                    method: 'PUT',
                    url: $scope.saveRelationsUrl,
                    data: {
                        'verticalId':verticalId,
                        'horizontalId':horizontalId,
                        'isSet': checked
                    }
                }).then(function(response) {
                    // Ok
                    AdminToastService.success(i18n['Data saved']);
                    //console.log(response)
                }, function (response) {
                    // Error
                    AdminToastService.error(i18n['Data not saved']);
                    //console.log(response)
                });

            };


            $scope.getHorizontal = function() {
                return $scope[$scope.horizontal];
            };

            $scope.getVertical = function() {
                return $scope[$scope.vertical];
            };

            $scope.init = function() {
                $scope.loadHorizontal();
                $scope.loadVertical();
                $scope.loadRelations();

            };

            $scope.init();

        }],
        template: function () {
            return '<div class="card-body">\n' +
                '        <table class="table table-hover">\n' +
                '            <thead>\n' +
                '                <tr>\n' +
                '                    <th>\n' +
                '                    </th>\n' +
                '                    <th ng-repeat="hor in getHorizontal()">\n' +
                '                        {{hor}}\n' +
                '                    </th>\n' +
                '                </tr>\n' +
                '            </thead>\n' +
                '            <tbody ng-repeat="(vertKey, vert) in getVertical()">\n' +
                '                <tr class="permissions__container-row">\n' +
                '                    <td>{{vert}}</td>\n' +
                '                    <td ng-repeat="(horKey, hor) in getHorizontal()">\n' +
                '                        <input id="{{vertical.charAt(0)}}2{{horizontal.charAt(0)}}-id-{{vertKey}}-{{horKey}}" type="checkbox"  ng-model="relations[vertKey][horKey]" ng-change="sendRequest(vertKey, horKey, relations[vertKey][horKey])"/>\n' +
                '                        <label for="{{vertical.charAt(0)}}2{{horizontal.charAt(0)}}-id-{{vertKey}}-{{horKey}}">&nbsp;</label>\n' +
                '                    </td>\n' +
                '                </tr>\n' +
                '            </tbody>\n' +
                '        </table>\n' +
                '    </div>';
        }
    };
});


zaa.directive('confPrintLists', function () {
    return {
        restrict: 'E',
        scope: {
            'mode': '@',
            'initLanguage': '@',
            'allLanguagesUrl': '@',
            'listOfGeneratedFilesUrl': '@',
            'mainDataUrl': '@',
        },
        controller: ['$rootScope', '$scope', '$http', 'AdminToastService', function ($rootScope, $scope, $http, AdminToastService) {

            if ($scope.initLanguage === undefined) {
                throw i18n['Init language must be set when using conf-print-lists directive'];
            }

            if ($scope.mode === undefined || $scope.mode === '') {
                throw i18n['Mode must be set when using conf-print-lists directive'];
            }

            var availableModes = ['participants', 'badges'];

            if (availableModes.indexOf($scope.mode) === -1) {
                throw i18n['Mode must be "participants" or "badges"'];
            }


            if ($scope.allLanguagesUrl === undefined || $scope.allLanguagesUrl === '') {
                $scope.allLanguagesUrl = 'admin/api-conference-confpeople/get-all-languages'; // TODO: Need another URL (or maybe we have already url with suc functionality)
            }


            if ($scope.listOfGeneratedFilesUrl === undefined || $scope.listOfGeneratedFilesUrl === '') {
                if ($scope.mode === 'participants') {
                    $scope.listOfGeneratedFilesUrl = 'admin/api-conference-confpeople/load-list-of-generated-files';
                } else {
                    $scope.listOfGeneratedFilesUrl = 'admin/api-conference-confpeople/load-list-of-generated-badges';
                }
            }


            if ($scope.mainDataUrl === undefined || $scope.mainDataUrl === '') {
                if ($scope.mode === 'participants') {
                    $scope.mainDataUrl = 'admin/api-conference-confpeople/generate-participants-list';
                } else {
                    $scope.mainDataUrl = 'admin/api-conference-confpeople/generate-badges';
                }
            }




            $scope.filesLists = false;
            $scope.total = false;


            $scope.loadListOfGeneratedFiles = function() {
                $scope.listOfFilesLoaded = false;
                $http.get($scope.listOfGeneratedFilesUrl).then(function(response) {
                    if (response.status === 200) {
                        // Update models

                        $scope.filesLists = response.data;
                        $scope.listOfFilesLoaded = true;

                    } else {
                        AdminToastService.error(i18n['List of already generated files not loaded']);
                    }
                });
            };

            $scope.loadLanguages = function() {
                $scope.languagesLoaded = false;
                $http.get($scope.allLanguagesUrl).then(function(response) {
                    if (response.status === 200) {
                        // Update models
                        $scope.languages = response.data;
                        $scope.languagesLoaded = true;
                    } else {
                        AdminToastService.error(i18n['Languages not loaded']);
                    }
                });
            };


            $scope.sendRequest = function(lang) {

                $http({
                    method: 'GET',
                    url: $scope.mainDataUrl,
                    params: {lang:lang}
                }).then(function(response) {

                    //console.log (response);

                    if (response.data.status === 'success') {

                        $scope.total = response.data.total;

                        if ($scope.filesLists === false) {
                            $scope.filesLists = {};
                        }

                        $scope.filesLists[lang] = {
                            date: response.data.date,
                            filename: response.data.filename,
                            langName: response.data.langName,
                        };

                        AdminToastService.success(i18nParam('List generated successfully (%records% records stored)', {records: $scope.total}));

                    } else {
                        AdminToastService.error(response.data.message);
                    }



                    //console.log (response.data.a);
                });

            };


            $scope.init = function() {
                $scope.loadListOfGeneratedFiles();
                $scope.loadLanguages();
            };

            $scope.init();


        }],
        template: function () {
            return '' +
                '<h2>'+i18n['Generation of new data']+'</h2>\n' +
                '    <div class="row">\n' +
                '        <div class="col-md-12 col-lg-12 col-xl-6 col-xxxl-4">\n' +
                '            <conf-select label="'+i18n['Language']+'" hint="'+i18n['Language of generated data']+'" initValue="{{initLanguage}}" model="language" options="languages"></conf-select>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <p><button type="button" ng-click="sendRequest(language)" class="btn btn-primary">Generate</button></p>\n' +
                '    <h2 ng-show="filesLists">'+i18n['Already generated data']+'</h2>\n' +
                '    <ul>\n' +
                '        <li ng-repeat="(lang, data) in filesLists">\n' +
                '            <a href="{{data.filename}}?{{data.date}}">{{data.langName}}</a> ('+i18n['updated']+' {{1000*data.date | date : \'medium\' }})\n' +
                '        </li>\n' +
                '    </ul>';
        }
    };
});




zaa.directive('confPlacing', function () {
    return {
        restrict: 'E',
        scope: {
            'mode': '@',
            'entitiesLoadUrl': '@',
            'peopleLoadUrl': '@',
            'matchedPairsUrl': '@',
            'savedPeopleUrl': '@',
            'autosaveUrl': '@',
            'saveRecordsUrl': '@',
        },
        controller: ['$rootScope', '$scope', '$http', 'AdminToastService', function ($rootScope, $scope, $http, AdminToastService) {

            if ($scope.mode === undefined || $scope.mode === '') {
                throw i18n['Mode must be set when using conf-placing directive'];
            }

            var availableModes = ['room', 'table'];

            if (availableModes.indexOf($scope.mode) === -1) {
                throw i18n['Mode must be "room" or "table"'];
            }

            if ($scope.entitiesLoadUrl === undefined || $scope.entitiesLoadUrl === '') {
                if ($scope.mode === 'room') {
                    $scope.entitiesLoadUrl = 'admin/api-conference-confrooms/load-rooms-in-buildings';
                } else {
                    $scope.entitiesLoadUrl = 'admin/api-conference-conftables/load-tables-in-restaurants';
                }
            }

            if ($scope.peopleLoadUrl === undefined || $scope.peopleLoadUrl === '') {
                $scope.peopleLoadUrl = 'admin/api-conference-confpeople/with-accommodation';
            }

            if ($scope.matchedPairsUrl === undefined || $scope.matchedPairsUrl === '') {
                $scope.matchedPairsUrl = 'admin/api-conference-confaccommodationwishes/matched-pairs';
            }

            if ($scope.savedPeopleUrl === undefined || $scope.savedPeopleUrl === '') {
                if ($scope.mode === 'room') {
                    $scope.savedPeopleUrl = 'admin/api-conference-confrooms/load-saved-people';
                } else {
                    $scope.savedPeopleUrl = 'admin/api-conference-conftables/load-saved-people';
                }
            }

            if ($scope.autosaveUrl === undefined || $scope.autosaveUrl === '') {
                if ($scope.mode === 'room') {
                    $scope.autosaveUrl = 'admin/api-conference-confrooms/save-room-data';
                } else {
                    $scope.autosaveUrl = 'admin/api-conference-conftables/save-table-data';
                }
            }

            if ($scope.saveRecordsUrl === undefined || $scope.saveRecordsUrl === '') {
                if ($scope.mode === 'room') {
                    $scope.saveRecordsUrl = 'admin/api-conference-confpeopleaddinfo/save-rooms-to-add-info';
                } else {
                    $scope.saveRecordsUrl = 'admin/api-conference-confpeopleaddinfo/save-tables-to-add-info';
                }
            }






            $scope.entitiesLoading = true;


            $scope.duplicates = {};
            $scope.savedObj      = {};


            $scope.allEntities = null;


            $scope.people = null;
            $scope.pairs = null;
            $scope.maindata = {};


            $scope.savingState = false;

            /**
             *
             * @param min
             * @param max
             * @param step
             * @returns {[]}
             */
            $scope.range = function(min, max, step) {
                step = step || 1;
                var input = [];
                for (var i = min; i <= max; i += step) {
                    input.push(i);
                }
                return input;
            };



            $scope.reverseMainData = function (data)
            {
                var reverseObj = {};
                angular.forEach(data, function(entity, entityId) {
                    angular.forEach(entity, function(manId, place) {
                        if (manId !== undefined) {
                            if (!Array.isArray(reverseObj[manId])) {
                                reverseObj[manId] = [];
                            }
                            reverseObj[manId].push([+entityId, +place]);
                        }
                    });
                });

                return reverseObj;
            };


            // Watches changes in mainData and recalculates duplicates array
            $scope.$watch(
                'maindata',
                function(newVal, oldVal, scope)
                {
                    var reverseObj = $scope.reverseMainData(newVal);
                    //console.log(reverseObj);

                    var filteredObj = {};
                    angular.forEach(reverseObj, function(data, manId) {
                        if (data.length > 1) {
                            filteredObj[manId] = data;
                        }
                    });

                    //console.log(filteredObj);

                    $scope.duplicates = filteredObj;
                },
                true
            );


            $scope.loadAllEntities = function() {
                $scope.entitiesLoaded = false;
                $http.get($scope.entitiesLoadUrl).then(function(response) {
                    if (response.status === 200) {
                        $scope.allEntities = response.data;
                        $scope.entitiesLoaded = true;
                    } else {
                        AdminToastService.error(i18n['Entities not loaded']);
                    }
                });
            };


            $scope.loadPeople = function() {
                $scope.peopleLoaded = false;
                $http.get($scope.peopleLoadUrl).then(function(response) {
                    if (response.status === 200) {
                        $scope.people = response.data;
                        $scope.peopleLoaded = true;
                    } else {
                        AdminToastService.error(i18n['People not loaded']);
                    }
                });
            };


            $scope.loadMatchedPairs = function() {
                $scope.matchedPairsLoaded = false;
                $http.get($scope.matchedPairsUrl).then(function(response) {
                    if (response.status === 200) {
                        $scope.pairs = response.data;
                        $scope.matchedPairsLoaded = true;
                    } else {
                        AdminToastService.error(i18n['Wishes not loaded']);
                    }
                });
            };


            $scope.loadSavedPeople = function() {
                $scope.savedPeopleLoaded = false;
                $http.get($scope.savedPeopleUrl).then(function(response) {
                    if (response.status === 200) {
                        // Update models
                        $scope.maindata = response.data;
                        $scope.savedPeopleLoaded = true;

                    } else {
                        AdminToastService.error(i18n['Saved people not loaded']);
                    }
                });
            };


            // Add special class to duplicated elements
            $scope.getNumberOfPlacesInEntity = function(entityId) {
                for (var poolId in $scope.allEntities) {
                    if ($scope.allEntities.hasOwnProperty(poolId)) {
                        var entities = $scope.allEntities[poolId];
                        for (var i = 0; i < entities.length; i++) {
                            var entity = (entities[i]);
                            if (+entity.id === +entityId) {
                                return +entity.places;
                            }
                        }
                    }
                }

                return false;
            };


            $scope.hasAnyDuplicates = function() {
                for (var manId in $scope.duplicates) {
                    if ($scope.duplicates.hasOwnProperty(manId)) {
                        return true;
                    }
                }
                return false;
            };

            $scope.hasUnsavedData = function() {
                for (var entityId in $scope.savedObj) {
                    if ($scope.savedObj.hasOwnProperty(entityId)) {
                        for (var placeId in $scope.savedObj[entityId]) {
                            if ($scope.savedObj[entityId].hasOwnProperty(placeId)) {
                                if ($scope.savedObj[entityId][placeId] === false) {return true;}
                            }
                        }
                    }
                }
                return false;
            };


            // Add special class to duplicated elements
            $scope.isDuplicated = function(entityId, place) {
                for (var manId in $scope.duplicates) {
                    if ($scope.duplicates.hasOwnProperty(manId)) {
                        var data = $scope.duplicates[manId];
                        for (var i = 0; i < data.length; i++) {
                            if (data[i][0] === +entityId && data[i][1] === +place) {return true;}
                        }
                    }
                }

                return false;
            };


            $scope.sendRequest = function(entityId, place, manId) {

                entityId = +entityId;
                place = +place;
                if (manId) {
                    manId = +manId;
                }

                if (!$scope.savedObj.hasOwnProperty(entityId)) {
                    $scope.savedObj[entityId]={};
                }

                // Get pairs
                if (manId && $scope.pairs[manId]) {

                    var pairedManId = +$scope.pairs[manId];

                    // Get number of places in entity
                    var p = $scope.getNumberOfPlacesInEntity(entityId);

                    if (p) {
                        var i;
                        // Check if the pair is already in entity
                        var alreadyExistFlag = false;
                        for (i = 0; i < p; i++) {
                            if ($scope.maindata[entityId][i] === pairedManId) {
                                alreadyExistFlag = true;
                                break;
                            }
                        }

                        // Checking for empty spaces
                        var hasEmptyPlaces = false;
                        for (i = 0; i < p; i++) {
                            if (!$scope.maindata[entityId][i]) {
                                hasEmptyPlaces = true;
                                break;
                            }
                        }


                        if (!alreadyExistFlag && hasEmptyPlaces) {
                            // Trying to put pair in a neighboring place on the right
                            if (place < p-1 && !$scope.maindata[entityId][place+1]) {
                                $scope.maindata[entityId][place+1] = pairedManId;
                                $scope.sendRequest(entityId, place+1, pairedManId);
                            } else if (place > 0 && !$scope.maindata[entityId][place-1]) {
                                // Trying to put pair in a neighboring place on the left
                                $scope.maindata[entityId][place-1] = pairedManId;
                                $scope.sendRequest(entityId, place-1, pairedManId);
                            } else {
                                // Put pair in a first empty place
                                for (var k = 0; k < p; k++) {
                                    if (!$scope.maindata[entityId][k]) {
                                        $scope.maindata[entityId][k] = pairedManId;
                                        $scope.sendRequest(entityId, k, pairedManId);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }


                $http({
                    method: 'PUT',
                    url: $scope.autosaveUrl,
                    data: {
                        'entityId': entityId,
                        'place': place,
                        'manId': manId
                    }
                }).then(function(response) {

                    if (response.status === 200) {

                        if (response.data == true) {
                            // Add saved style
                            $scope.savedObj[entityId][place] = true;

                        } else {
                            $scope.savedObj[entityId][place] = false;
                        }

                    } else {
                        $scope.savedObj[entityId][place] = false;
                        //console.log ('Changes not saved');
                    }

                    // Ok
                    //console.log(response)
                }, function (response) {
                    $scope.savedObj[entityId][place] = false;
                    // Error
                    //console.log(response)
                });

            };



            $scope.saveEntitiesToAddInfo = function() {
                $scope.savingState = true;

                var reversed = $scope.reverseMainData($scope.maindata);

                $http({
                    method: 'PUT',
                    url: $scope.saveRecordsUrl,
                    data: {
                        'reversedData': reversed,
                    }
                }).then(function(response) {


                    if (response.status === 200) {
                        //console.log (response.data);
                        AdminToastService.success(i18n['Data saved']);
                    } else {
                        AdminToastService.error(i18n['Data not saved']);
                    }


                    $scope.savingState = false;
                    // Ok
                    //console.log(response)
                }, function (response) {
                    $scope.savingState = false;
                    // Error
                    //console.log(response)
                });

            };



            $scope.init = function() {
                i18n['ngrest_select_no_selection'] = '-'; // Workaround to avoid "Nothing selected" init message

                $scope.loadAllEntities();
                $scope.loadPeople();

                if ($scope.mode === 'room') {
                    $scope.loadMatchedPairs();
                } else {
                    $scope.matchedPairsLoaded = true;
                    $scope.pairs = [];
                }
                $scope.loadSavedPeople();

            };

            $scope.init();

        }],
        template: function () {
            return '' +
                '    <div ng-show="!entitiesLoaded">'+i18n['Entities loading...']+'</div>\n' +
                '    <div ng-show="!peopleLoaded">'+i18n['Participants with accommodation loading...']+'</div>\n' +
                '    <div ng-show="!matchedPairsLoaded">'+i18n['Accommodation wishes loading...']+'</div>\n' +
                '    <div ng-show="!savedPeopleLoaded">'+i18n['Already saved data loading...']+'</div>\n' +
                '    <div ng-repeat="(pool, entities) in allEntities">\n' +
                '        <h3 class="mt-3">{{pool}}</h3>\n' +
                '        <div ng-repeat="entity in entities">\n' +

                     '            <h4 class="mt-3" ng-show="entity.building">{{entity.building}}/{{entity.number}} <small><small>{{entity.comment}}</small></small></h4>\n' +
                     '            <h4 class="mt-3"  ng-show="entity.restaurant">{{entity.restaurant}}/{{entity.number}}</h4>\n' +
                '            <div class="row">\n' +
                '                <div class="conf-entity-div col-sm-12 col-md-6 col-lg-6 col-xl-4 col-xxl-3" ng-repeat="n in range(0,entity.places-1)" ng-class="{\'conf-entity-div-duplicate\': isDuplicated(+entity.id, n), \'conf-entity-div-saved\': savedObj[+entity.id][n], \'conf-entity-div-error\': savedObj[+entity.id][n]===false }">\n' +
                '                    <lazy-luya-select ng-model="maindata[+entity.id][n]" options="people" ng-change="sendRequest(+entity.id, n, maindata[entity.id][n])"/>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '    <div class="mt-4 mb-3">\n' +
                '        <button class="btn btn-save btn-icon" type="button" ng-click="saveEntitiesToAddInfo()" ng-disabled="savingState || !entitiesLoaded || !peopleLoaded || !matchedPairsLoaded || !savedPeopleLoaded || hasAnyDuplicates() || hasUnsavedData() " class="btn btn-primary">'+i18n['Save data to badges']+'</button>\n' +
                '    </div>\n';
        }
    };
});



zaa.directive('confListCheckbox', function () {
    return {
        restrict: 'E',
        scope: {
            'model': '=',
            'options': '=',
            'allowedsectionstoedit': '=',
            'disabledexpression': '@',
            'sectionsattribute': '@',
            'additionalsectionsattribute': '@',
            'editableexpression': '@',
            'itemvalue': '=',
            'url': '@',
            'valueTrue': '@',
            'valueFalse': '@',
            'i18n': '@i18n',
            'id': '@fieldid',
            'label': '@label',
            'initvalue': '@initvalue'
        },
        controller: ['$rootScope', '$scope', '$http', '$filter', '$timeout', '$parse', function ($rootScope, $scope, $http, $filter, $timeout, $parse) {

            $scope.responseOk    = false;
            $scope.responseError = false;

            if ($scope.sectionsattribute === undefined || $scope.sectionsattribute === null) {
                $scope.sectionsattribute = 'section_id';
            }

            if ($scope.additionalsectionsattribute === undefined || $scope.additionalsectionsattribute === null) {
                $scope.additionalsectionsattribute = 'requested_add_section_id';
            }

            if ($scope.valueTrue === undefined) {
                $scope.valueTrue = 1;
            }

            if ($scope.valueFalse === undefined) {
                $scope.valueFalse = 0;
            }

            $scope.init = function () {
                if ($scope.model === undefined || $scope.model === null) {
                    $scope.model = typeCastValue($scope.initvalue);
                }
            };

            $timeout(function () {
                $scope.init();
            });


            // Send request to change final type value in DB
            $scope.sendRequest = function() {
                $scope.responseOk    = false;
                $scope.responseError = false;
                $http({
                    method: 'PUT',
                    url: $scope.url,
                    params: {
                        'itemId' : $scope.itemvalue.id,
                        'finalValue':($scope.model === null ? 'null' : $scope.model) // The meaning depends on url
                    }
                }).then(function(response) {
                    if (response.data.status === 'success') {
                        $scope.responseOk    = true;


                        if (response.data.toRootScope !== undefined) {
                            $rootScope.$emit('confRootUpdateEvent', response.data.toRootScope);
                        }


                        if (response.data.toScope !== undefined && response.data.toScope.itemValues !== undefined) {
                            for (var prop in response.data.toScope.itemValues) {
                                $scope.itemvalue[prop] = response.data.toScope.itemValues[prop];
                            }
                        }
                    } else {
                        $scope.responseError = true;
                        //console.log (response.data.error);
                    }
                }, function errorCallback(response) {
                    //console.log (response);
                    $scope.responseError = true;
                });
            };


            $scope.isSectionAllowed = function () {
                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }

                var parsed2 = $parse($scope.sectionsattribute)($scope.itemvalue);
                return ($scope.allowedsectionstoedit.indexOf(parsed2) !== -1);
            };

            $scope.isAdditionalSectionAllowed = function () {
                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }

                var parsed3 = $parse($scope.additionalsectionsattribute)($scope.itemvalue);
                return ($scope.allowedsectionstoedit.indexOf(parsed3) !== -1);
            };


            /**
             *  Parse the expression and return true if checkbox needs to be disabled
             * @returns {boolean}
             */
            $scope.isDisabled = function () {
                if ($scope.disabledexpression === undefined || $scope.disabledexpression === null) {
                    return false;
                } else {
                    return $parse($scope.disabledexpression)($scope.itemvalue);
                }
            };



            $scope.isEditable2 = function () {
                $scope.itemvalue.isSectionAllowed           = $scope.isSectionAllowed();
                $scope.itemvalue.isAdditionalSectionAllowed = $scope.isAdditionalSectionAllowed();

                if ($scope.editableexpression === undefined || $scope.editableexpression === null) {
                    // No editable expression? Just check sections.
                    return $scope.itemvalue.isSectionAllowed;
                } else {
                    var parsed = $parse($scope.editableexpression)($scope.itemvalue);
                    //console.log (parsed);
                    return parsed;

                }
            };




            // Check if Admin can edit final type or not
            $scope.isEditable = function () {
                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }
                // Use $parse to get nested object properties in dot notation
                var parsed = $parse($scope.sectionsattribute)($scope.itemvalue);
                return ($scope.allowedsectionstoedit.indexOf(parsed) !== -1);
            };

            $scope.getCurrentValue = function() {
                return ($scope.model === $scope.valueTrue);
            };

        }],
        template: function () {
            return '' +
                '<div class="confcheckbox" style="white-space: nowrap;" ng-class="{\'input--hide-label\': i18n}"> ' +
                '<input id="{{id}}[{{itemvalue.id}}]"  ng-change="sendRequest()" ng-disabled="isDisabled()"  ng-true-value="{{valueTrue}}" ng-false-value="{{valueFalse}}" ng-model="model" type="checkbox" class="confselect-checkbox" ng-checked="model == valueTrue" />' +
                '<label ng-show="isEditable2()" for="{{id}}[{{itemvalue.id}}]"></label>' +
                '<span ng-show="!isEditable2()"><i ng-show="getCurrentValue()" class="material-icons">check</i><i ng-show="!getCurrentValue()" class="material-icons">-</i></span>'+
                '<span ng-show="responseOk"    class="text-success"> ✔</span>'+
                '<span ng-show="responseError" class="text-danger"> ✘</span>'+
                //'<span ng-show="isWarning()"   class="text-warning"> ⚠</span>'+ // Warning sign
                '</div>';

        }
    };
});





zaa.directive('confListSelect', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: { //@ reads the attribute value, = provides two-way binding, & works with functions
            'model': '=',
            'options': '=',
            'allowedsectionstoedit': '=',
            'itemvalue': '=',
            'url': '@',
            'optionsvalue': '@',
            'optionslabel': '@',
            'sectionsattribute': '@',
            'additionalsectionsattribute': '@',
            'editableexpression': '@',
            'label': '@',
            'i18n': '@',
            'initvalue': '@',
            'id': '@fieldid',
        },
        controller: ['$rootScope', '$scope', '$http', '$filter', '$parse', 'confChangedSelectsService', function ($rootScope, $scope, $http, $filter, $parse, confChangedSelectsService) {

            /* default scope values */


            $scope.responseOk    = false;
            $scope.responseError = false;

            if ($scope.sectionsattribute === undefined || $scope.sectionsattribute === null) {
                $scope.sectionsattribute = 'final_section_id';
            }

            if ($scope.additionalsectionsattribute === undefined || $scope.additionalsectionsattribute === null) {
                $scope.additionalsectionsattribute = 'requested_add_section_id';
            }

            if ($scope.optionsvalue === undefined) {
                $scope.optionsvalue = 'value';
            }

            if ($scope.optionslabel === undefined) {
                $scope.optionslabel = 'label';
            }

            if (angular.isNumber($scope.model)) {
                $scope.model = typeCastValue($scope.model);
            }





            /* methods */

            // Listener to emitter of global update
            $rootScope.$on('confRootUpdateEvent', function (event, data) {

                // listenerId - id of column to which the handler is attached
                // $scope.id - id of current column
                // They must be the same
                if (data.listenerId !== undefined && $scope.id !== data.listenerId) {
                    return false;
                }

                // itemIds - array of Ids (rows) which will be affected
                // $scope.itemvalue.id - id of current row
                if (data.itemIds !== undefined && Object.keys(data.itemIds).length) {
                    if (data.itemIds.indexOf($scope.itemvalue.id) === -1) {
                        return false;

                    }
                }


                // itemValues - values to set to specific cells of current row
                if (data.itemValues !== undefined && Object.keys(data.itemValues).length) {
                    for (var prop in data.itemValues) {
                        $scope.itemvalue[prop] = data.itemValues[prop];
                    }
                }

            });


            $scope.getCurrentValueLabel = function() {
                var filterObj = {};
                filterObj[$scope.optionsvalue] = $scope.model;
                var modelObj = $filter('filter')($scope.options, filterObj, true)[0];

                if (modelObj === undefined) {
                    return null;
                }

                return modelObj[$scope.optionslabel];

            };



            $scope.isSectionAllowed = function () {
                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }

                var parsed2 = $parse($scope.sectionsattribute)($scope.itemvalue);
                return ($scope.allowedsectionstoedit.indexOf(parsed2) !== -1);
            };


            $scope.isAdditionalSectionAllowed = function () {
                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }

                var parsed3 = $parse($scope.additionalsectionsattribute)($scope.itemvalue);
                return ($scope.allowedsectionstoedit.indexOf(parsed3) !== -1);
            };



            $scope.isEditable2 = function () {
                $scope.itemvalue.isSectionAllowed           = $scope.isSectionAllowed();
                $scope.itemvalue.isAdditionalSectionAllowed = $scope.isAdditionalSectionAllowed();

                // Force disable check
                if ($scope.itemvalue.forceDisable) {
                    return false;
                }

                if ($scope.editableexpression === undefined || $scope.editableexpression === null) {
                    // No editable expression? Just check sections.
                    return $scope.itemvalue.isSectionAllowed;
                } else {
                    var parsed = $parse($scope.editableexpression)($scope.itemvalue);
                    //console.log (parsed);
                    return parsed;

                }
            };


            // Check if Admin can edit final type or not
            $scope.isEditable = function () {
                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }
                // Use $parse to get nested object properties in dot notation
                var parsed = $parse($scope.sectionsattribute)($scope.itemvalue);
                return ($scope.allowedsectionstoedit.indexOf(parsed) !== -1);
            };


/*
            $scope.isWarning = function () {
                return 1;


                if ($scope.allowedsectionstoedit === true) {
                    return true;
                }
                if ($scope.allowedsectionstoedit === false) {
                    return false;
                }
                return ($scope.allowedsectionstoedit.indexOf($scope.itemvalue[$scope.sectionsattribute]) !== -1);
            };
*/

            // Send request to change final type value in DB
            $scope.sendRequest = function() {


                if ($scope.url === undefined) {
                    return false;
                    //throw new Error('No route provided');
                }




                $scope.responseOk    = false;
                $scope.responseError = false;
                $http({
                    method: 'PUT',
                    url: $scope.url,
                    params: {
                        'itemId' : $scope.itemvalue.id,
                        'finalValue':($scope.model === null ? 'null' : $scope.model) // The meaning depends on url
                    }
                }).then(function(response) {
                    if (response.data.status === 'success') {
                        $scope.responseOk    = true;


                        confChangedSelectsService.addSelect($scope.itemvalue);
                        $rootScope.$emit('confSelectChangedEvent', $scope.itemvalue);

                        if (response.data.toRootScope !== undefined) {
                            $rootScope.$emit('confRootUpdateEvent', response.data.toRootScope);
                        }



                        if (response.data.toScope !== undefined && response.data.toScope.itemValues !== undefined) {
                            for (var prop in response.data.toScope.itemValues) {
                                $scope.itemvalue[prop] = response.data.toScope.itemValues[prop];
                            }
                        }
                    } else {
                        $scope.responseError = true;
                        //console.log (response.data.error);
                    }
                }, function errorCallback(response) {
                    //console.log (response);
                    $scope.responseError = true;
                });
            };


            $scope.valueExistsInOptions = function (value) {
                var exists = false;
                angular.forEach($scope.options, function (item) {
                    if (value == item[$scope.optionsvalue]) {
                        exists = true;
                    }
                });
                return exists;
            };


/*
            $scope.setModelValue = function (option) {
                $scope.model = option[$scope.optionsvalue];
            };
*/

            $scope.hasSelectedValue = function () {
                var modelValue = $scope.model;

                if ($scope.valueExistsInOptions(modelValue) && modelValue != $scope.initvalue) {
                    return true;
                }

                return false;
            };
        }],


        template: function () {
            return '' +
                '<div class="confselect" style="white-space: nowrap;" ng-class="{\'selected\':hasSelectedValue()}"> ' +
                    '<select class="confselect-select" ng-model="model" ng-show="isEditable2()" ng-change="sendRequest()">' +
                        '<option ng-repeat="opt in options" ng-value="opt[optionsvalue]">{{opt[optionslabel]}}</option>' +
                    '</select>' +
                '<span ng-show="!isEditable2()">{{getCurrentValueLabel()}}</span>'+
                '<span ng-show="responseOk"    class="text-success"> ✔</span>'+
                '<span ng-show="responseError" class="text-danger"> ✘</span>'+
                //'<span ng-show="isWarning()"   class="text-warning"> ⚠</span>'+ // Warning sign
                '</div>';
        }
    };
});

zaa.directive('selectArraySpan', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: { //@ reads the attribute value, = provides two-way binding, & works with functions
            'model': '=',
            'options': '=',
            'optionsvalue': '@optionsvalue',
            'optionslabel': '@optionslabel',
        },
        controller: ['$rootScope', '$scope',  function ($rootScope, $scope) {
            if ($scope.optionsvalue === undefined) {
                $scope.optionsvalue = 'value';
            }
            if ($scope.optionslabel === undefined) {
                $scope.optionslabel = 'label';
            }

            $scope.getSelectedLabel = function () {
                // Keep raw value by default
                var selectedLabel = $scope.model;
                angular.forEach($scope.options, function (item) {
                    if ($scope.model == item[$scope.optionsvalue]) {
                        selectedLabel = item[$scope.optionslabel];
                    }
                });

                return selectedLabel;
            };
        }],


        template: function () {
            return '<span>{{getSelectedLabel()}}</span>';
        }
    };
});




zaa.directive('confSectionNumber', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: { //@ reads the attribute value, = provides two-way binding, & works with functions
            'model': '=',
            'itemvalue': '=',
            'options': '=',
            'sectionsattribute': '@',
            'usersectionidproperty': '@',
            'usersectionnumberproperty': '@',
            'usersectionlockproperty': '@',
            'label': '@',
            'i18n': '@',
            'initvalue': '@',
            'id': '@fieldid',
        },
        controller: ['$rootScope', '$scope',  function ($rootScope, $scope) {

            /* default scope values */

            if ($scope.sectionsattribute === undefined) {
                $scope.sectionsattribute = 'final_section_id';
            }

            if ($scope.usersectionidproperty === undefined) {
                $scope.usersectionidproperty = 'section_id';
            }

            if ($scope.usersectionnumberproperty === undefined) {
                $scope.usersectionnumberproperty = 'section_number';
            }

            if ($scope.usersectionlockproperty === undefined) {
                $scope.usersectionlockproperty = 'section_lock';
            }


            if (angular.isNumber($scope.model[$scope.usersectionidproperty])) {
                $scope.model[$scope.usersectionidproperty] = typeCastValue($scope.model[$scope.usersectionidproperty]);
            }

            if (angular.isNumber($scope.model[$scope.usersectionlockproperty])) {
                $scope.model[$scope.usersectionlockproperty] = typeCastValue($scope.model[$scope.usersectionlockproperty]);
            }


            $scope.isWarning = function () {
                if ($scope.model[$scope.usersectionidproperty] !== $scope.itemvalue[$scope.sectionsattribute]) {
                    return true;
                } else {
                    return false;
                }

            };

            $scope.getSectionId = function () {
                if (!$scope.model[$scope.usersectionidproperty]) {
                    return 0;
                }
                return $scope.model[$scope.usersectionidproperty];
            };
/*
            $scope.getSectionNumber = function () {
                return $scope.model[$scope.usersectionnumberproperty];
            };
*/
            $scope.getSectionLock = function () {
                return $scope.model[$scope.usersectionlockproperty];
            };

        }],


        template: function () {
            return '' +
                '<div class="confselect" style="white-space: nowrap;">' +
                    '<select-array-span model="getSectionId()" options="options"></select-array-span>'+
                    '<span ng-show="getSectionLock()"> <i class="material-icons">lock</i></span>' +
                    '<span ng-show="isWarning()" class="text-warning"> <i class="material-icons" data-toggle="tooltip" title="'+i18n['User section is different from the final section of abstract'] +'">warning</i></span>'+ // Warning sign
                '</div>';
        }
    };
});



zaa.directive('confPaymentNote', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        scope: { //@ reads the attribute value, = provides two-way binding, & works with functions
            'model': '=',
            'itemvalue': '=',
            'accommodationcancelled': '@',
            'unknownaccommodation': '@',
            'participationcancelled': '@',
            'isparticipant': '@',
            'fee': '@',
            'messages': '@',
            'i18n': '@',
            'initvalue': '@',
            'id': '@fieldid',
        },
        controller: ['$rootScope', '$scope',  function ($rootScope, $scope) {

            /* default scope values */


            if ($scope.unknownaccommodation === undefined) {
                $scope.unknownaccommodation = 'is_unknown_accommodation';
            }

            if ($scope.accommodationcancelled === undefined) {
                $scope.accommodationcancelled = 'is_accommodation_cancelled';
            }

            if ($scope.participationcancelled === undefined) {
                $scope.participationcancelled = 'is_participation_cancelled';
            }

            if ($scope.isparticipant === undefined) {
                $scope.isparticipant = 'is_participant';
            }

            if ($scope.fee === undefined) {
                $scope.fee = 'fee';
            }


            $scope.msgObj = angular.fromJson($scope.messages);


            if (angular.isNumber($scope.model[$scope.accommodationcancelled])) {
                $scope.model[$scope.accommodationcancelled] = typeCastValue($scope.model[$scope.accommodationcancelled]);
            }

            if (angular.isNumber($scope.model[$scope.participationcancelled])) {
                $scope.model[$scope.participationcancelled] = typeCastValue($scope.model[$scope.participationcancelled]);
            }

            if (angular.isNumber($scope.model[$scope.isparticipant])) {
                $scope.model[$scope.isparticipant] = typeCastValue($scope.model[$scope.isparticipant]);
            }

            if (angular.isNumber($scope.model[$scope.fee])) {
                $scope.model[$scope.fee] = typeCastValue($scope.model[$scope.fee]);
            }

            if (angular.isNumber($scope.model[$scope.unknownaccommodation])) {
                $scope.model[$scope.unknownaccommodation] = typeCastValue($scope.model[$scope.unknownaccommodation]);
            }




            $scope.isUnknownAccommodation = function () {
                return $scope.model[$scope.unknownaccommodation];
            };

            $scope.isParticipationCancelled = function () {
                return $scope.model[$scope.participationcancelled];
            };


            $scope.isManuallyExempted = function () {
                return ($scope.model[$scope.fee] > 0) && ($scope.itemvalue.payment_status_id === 1); // 1 for Free of Charge TODO: Pass the constant from backend
            };

        }],


        template: function () {
            return '' +
                '<div class="confselect" style="white-space: nowrap;">' +
                    '<p ng-show="isManuallyExempted()"><span  class="badge badge-success">{{msgObj.manExempted}}</span></p>'+
                    '<p ng-show="isUnknownAccommodation()"><span  class="badge badge-secondary">{{msgObj.undefAccommodationStatus}}</span></p>'+
                    '<p ng-show="isParticipationCancelled()"><span  class="badge badge-danger">{{msgObj.notParticipant}}</span></p>'+
                '</div>';
        }
    };
});




zaa.directive('confCustomFile', function(){
    return {
        restrict: 'E',
        scope: {
            'model': '=',
            'data' : '=',
            'options': '=',
            'label': '@label',
            'i18n': '@i18n',
            'id': '@fieldid',
        },
        template: function() {
            return  '<div class="form-group form-side-by-side" ng-class="{\'input--hide-label\': i18n}">' +
                        '<div class="form-side form-side-label">' +
                            '<label for="{{id}}">{{label}}</label>' +
                        '</div>' +
                        '<div class="form-side">' +

                        //'<input id="{{id}}" ng-model="model" className="form-control" placeholder="{{placeholder}}"/>' +

                            //'<input id="{{id}}" insert-paste-listener ng-model="model" type="text" class="form-control" placeholder="{{placeholder}}" />' +
                            '<temp-storage-file-upload ng-model="model" ng-data="data"></temp-storage-file-upload>' +

                        '</div>' +
                    '</div>';
        }
        //'<storage-file-upload ng-model="model"></storage-file-upload>' +
    };
});



zaa.directive('confSelect', function () {
    return {
        restrict: 'E',
        scope: {
            'model': '=',
            'options': '=',
            'optionsvalue': '@optionsvalue',
            'optionslabel': '@optionslabel',
            'optionshint': '@optionshint',
            'label': '@label',
            'hint': '@hint',
            'id': '@fieldid',
            'initvalue': '@initvalue',
            'isfilter': '@isfilter'
        },
        controller: ['$scope', '$timeout', '$rootScope', function ($scope, $timeout, $rootScope) {
            if ($scope.optionsvalue == undefined || $scope.optionsvalue == '') {
                $scope.optionsvalue = 'value';
            }

            if ($scope.optionslabel == undefined || $scope.optionslabel == '') {
                $scope.optionslabel = 'label';
            }

            if ($scope.optionshint == undefined || $scope.optionshint == '') {
                $scope.optionshint = 'hint';
            }

            if ($scope.isfilter == undefined || $scope.isfilter == '') {
                $scope.isfilter = false;
            }


            $scope.getValueHint = function() {
                var hint = '';
                angular.forEach($scope.options, function (item) {
                    if ($scope.model == item[$scope.optionsvalue]) {
                        hint = item[$scope.optionshint];
                    }
                });

                return hint;
            };


            $scope.model = $scope.initvalue;

            $scope.isNotInitValue = function () {
                if ($scope.isfilter) {
                    return ($scope.model !== $scope.initvalue);
                } else {
                    return false;
                }
            };


        }],
        template: function () {
            return '<div class="form-group form-side-by-side">' +
                        '<div class="form-side form-side-label">' +
                            '<label for="{{id}}">{{label}}</label>' +
                        '</div>' +
                        '<div class="form-side">'+
                            '<select class="form-control confselect" ng-model="model" ng-class="{\'activeFilter\':isNotInitValue()}">'+
                                '<option ng-repeat="opt in options" ng-value="opt[optionsvalue]">'+
                                    '{{opt[optionslabel]}}'+
                                '</option>'+
                            '</select>'+
                            '<p class="small">{{hint}}</p>'+
                            '<p>{{getValueHint()}}</p>'+
                        '</div>' +
                    '</div>';
        }
    };
});

zaa.directive('confTextarea', function () {
    return {
        restrict: 'E',
        scope: {
            'model': '=',
            'options': '=',
            'optionsvalue': '@optionsvalue',
            'optionslabel': '@optionslabel',
            'optionshint': '@optionshint',
            'label': '@label',
            'hint': '@hint',
            'id': '@fieldid',
            'initvalue': '@initvalue',
            'isfilter': '@isfilter',
            'required': '@required'

        },
        controller: ['$scope', '$timeout', '$rootScope', function ($scope, $timeout, $rootScope) {
            if ($scope.optionsvalue == undefined || $scope.optionsvalue == '') {
                $scope.optionsvalue = 'value';
            }

            if ($scope.optionslabel == undefined || $scope.optionslabel == '') {
                $scope.optionslabel = 'label';
            }

            if ($scope.optionshint == undefined || $scope.optionshint == '') {
                $scope.optionshint = 'hint';
            }


            $scope.model = $scope.initvalue;

        }],
        template: function () {
            return '<div className="form-group form-side-by-side">\n' +
                        '<div class="form-side form-side-label">' +
                            '<label for="{{id}}">{{label}}</label>' +
                        '</div>' +
                        '<div className="form-side">' +
                            '<textarea id="{{id}}" insert-paste-listener ng-model="model" type="text" class="form-control" rows="8" ng-required="{{required}}"></textarea>' +
                        '</div>\n' +
                        '<p class="small">{{hint}}</p>'+
                   '</div>';

        }
    };
});


zaa.directive('confCheckbox', function () {
    return {
        restrict: 'E',
        scope: {
            'model': '=',
            'options': '=',
            'id': '@fieldid',
            'label': '@label',
            'hint': '@hint',
            'initvalue': '@initvalue'
        },
        controller: ['$scope', '$timeout', function ($scope, $timeout) {
            if ($scope.options === null || $scope.options === undefined) {
                $scope.valueTrue = 1;
                $scope.valueFalse = 0;
            } else {
                $scope.valueTrue = $scope.options['true-value'];
                $scope.valueFalse = $scope.options['false-value'];
            }

            $scope.init = function () {
                if ($scope.model == undefined && $scope.model == null) {
                    $scope.model = typeCastValue($scope.initvalue);
                }
            };
            $timeout(function () {
                $scope.init();
            });
        }],
        template: function () {
            return '<div class="form-group form-side-by-side">' +
                        '<div class="form-side form-side-label">' +
                            '<label for="{{id}}">{{label}}</label>' +
                        '</div>' +
                        '<div class="form-side">' +
                            '<div class="form-control" style="border: none; background-color: inherit;">' +
                                '<input id="{{id}}" ng-true-value="{{valueTrue}}" ng-false-value="{{valueFalse}}" ng-model="model" type="checkbox" class="form-check-input-standalone" ng-checked="model == valueTrue" />' +
                                '<label for="{{id}}"></label>' +
                            '</div>' +
                            '<p class="small">{{hint}}</p>'+

                        '</div>' +
                    '</div>';
        }
    };
});

zaa.directive('confCheckboxList', function () {
    return {
        restrict: 'E',
        scope: {
            'model': '=',
            'options': '=',
            'id': '@fieldid',
            'label': '@label',
            'hint': '@hint',
            'preselect': '@preselect'
        },
        controller: ['$scope', function ($scope, $filter) {

            if ($scope.model == undefined) {
                $scope.model = [];
            }
/*
            $scope.preselectOptionValuesToModel = function (options) {
                angular.forEach(options, function (value) {
                    $scope.model.push({ 'value': value.value });
                });
            };


            $scope.$watch('options', function (n, o) {
                if (n != undefined && n.hasOwnProperty('items')) {
                    $scope.optionitems = $filter('orderBy')(n.items, 'label');
                    if ($scope.preselect) {
                        $scope.preselectOptionValuesToModel(n.items);
                    }
                }
            });

*/

            $scope.toggleSelection = function (item) {
                if ($scope.model == undefined) {
                    $scope.model = [];
                }

                for (var i in $scope.model) {
                    if ($scope.model[i] == item.value) {
                        $scope.model.splice(i, 1);
                        //console.log ($scope.model);
                        return;
                    }
                }
                $scope.model.push(item.value);
            };

            $scope.isChecked = function (item) {
                for (var i in $scope.model) {
                    if ($scope.model[i] == item.value) {
                        return true;
                    }
                }
                return false;
            };
        }],
        link: function (scope) {
            scope.random = Math.random().toString(36).substring(7);
        },
        template: function () {
            return '<div class="form-group form-side-by-side" ng-class="{\'input--hide-label\': i18n}">' +
                        '<div class="form-side form-side-label">' +
                            '<label for="{{id}}">{{label}}</label>' +
                        '</div>' +

                        '<div class="form-side">' +
                            '<div class="form-check-inline" ng-repeat="(k, item) in options track by k">' +
                                '<input type="checkbox" class="form-check-input" ng-checked="isChecked(item)" id="{{random}}_{{k}}" ng-click="toggleSelection(item)" />' +
                                '<label for="{{random}}_{{k}}">{{item.label}}</label>' +
                            '</div>' +
                        '<p class="small">{{hint}}</p>'+
                        '</div>' +
                    '</div>';
        }
    };
});




// Require ngFileUpload
angular.module('zaa').requires.push('ngFileUpload');

zaa.directive('tempStorageFileUpload', function() {
    return {
        restrict : 'E',
        scope : {
            ngModel : '=',
            ngData : '='
        },
        controller: ['$scope', '$filter', 'Upload', '$timeout', 'AdminToastService', function($scope, $filter, Upload, $timeout, AdminToastService) {

            $scope.uploadFiles = function(file, type, errFiles) {

                $scope.errorMsg = '';
                $scope.f = file;
                $scope.errFile = errFiles && errFiles[0];
                if (file) {
                    file.upload = Upload.upload({
                        url: $scope.ngData.uploadUrl,
                        data: {
                            type: type,
                            superfile: file
                        },
                        headers: {
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    file.upload.then(function (response) {
                        $timeout(function () {
                            $scope.ngModel = response.data;
                            file.result = response.data;
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            AdminToastService.error(response.data[0].message); // TODO: Check the array populating
                            $scope.errorMsg = response.data[0].message;
                        }
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 *
                            evt.loaded / evt.total));
                    });
                }
            };
        }],


        template : function() {
            return  '' +
                '<p ng-show="ngModel">{{ngModel}}</p>'+
                '<div><button type="file" ngf-select="uploadFiles($file, ngData.type, $invalidFiles)"\n' +
                '          ngf-max-size="{{ngData.maxFileSize}}">\n' +
                '      Select File</button>' +

                '  {{f.name}}' +
                '</div>     \n' +
                '<div>{{errFile.name}} {{errFile.$error}} {{errFile.$errorParam}}\n' +
                '    <span class="progress" ng-show="f.progress >= 0">\n' +
                '        <p style="width:{{f.progress}}%"  \n' +
                '             ng-bind="f.progress + \'%\'"></p>\n' +
                '    </span>\n' +
                '{{errorMsg}}'+
                '</div>     \n';

        },

        // TODO: Use global template
        //templateUrl : 'admin/api-conference-conffileupload/tempfileupload'


    };
});




zaa.directive('lazyLuyaSelect', function() {
    return {
        restrict: 'E',
            scope: {
                'model': '=ngModel',
                'options': '=',
                'optionsvalue': '@optionsvalue',
                'optionslabel': '@optionslabel',
                'id': '@fieldid',
                'initvalue': '@initvalue',
                ngChange : '&'
        },
        controller: ['$scope', '$timeout', '$rootScope', function ($scope, $timeout, $rootScope) {

            $scope.isOpen = 0;
            $scope.limiter = 0;

            if ($scope.optionsvalue == undefined || $scope.optionsvalue == '') {
                $scope.optionsvalue = 'value';
            }

            if ($scope.optionslabel == undefined || $scope.optionslabel == '') {
                $scope.optionslabel = 'label';
            }

            if (angular.isNumber($scope.model)) {
                $scope.model = typeCastValue($scope.model);
            }

            /* listeners */

            $scope.$on('closeAllSelects', function () {
                if ($scope.isOpen) {
                    $scope.closeSelect();
                }
            });

            $timeout(function () {
                $scope.$watch(function () { return $scope.model; }, function (n, o) {
                    if (n == undefined || n == null || n == '') {
                        if (angular.isNumber($scope.initvalue)) {
                            $scope.initvalue = typeCastValue($scope.initvalue);
                        }
                        var exists = $scope.valueExistsInOptions(n);

                        if (!exists) {
                            $scope.model = $scope.initvalue;
                        }
                    }


                });
            });

            /* methods */

            $scope.valueExistsInOptions = function (value) {
                var exists = false;
                angular.forEach($scope.options, function (item) {
                    if (value == item[$scope.optionsvalue]) {
                        exists = true;
                    }
                });
                return exists;
            };

            $scope.toggleIsOpen = function () {
                if (!$scope.isOpen) {
                    $rootScope.$broadcast('closeAllSelects');
                    $scope.limiter = undefined;
                } else {
                    $scope.limiter = 0;
                }

                $scope.isOpen = !$scope.isOpen;


            };

            $scope.closeSelect = function () {
                $scope.isOpen = 0;
            };

            $scope.setModelValue = function (option) {
                $scope.model = angular.isObject(option) ? option[$scope.optionsvalue] : option;
                $timeout($scope.ngChange, 0);
                $scope.closeSelect();
            };

            $scope.getSelectedLabel = function () {
                var defaultLabel = i18n['ngrest_select_no_selection'];
                angular.forEach($scope.options, function (item) {
                    if ($scope.model == item[$scope.optionsvalue]) {
                        defaultLabel = item[$scope.optionslabel];
                    }
                });

                return defaultLabel;
            };

            $scope.hasSelectedValue = function () {
                var modelValue = $scope.model;

                if ($scope.valueExistsInOptions(modelValue) && modelValue != $scope.initvalue) {
                    return true;
                }

                return false;
            };
        }],
        template: function () {
            return  '<div class="zaaselect" ng-class="{\'open\':isOpen, \'selected\':hasSelectedValue()}">' +
                        '<select class="zaaselect-select" ng-model="model">' +
                            '<option ng-repeat="opt in options | limitTo: limiter" ng-value="opt[optionsvalue]">{{opt[optionslabel]}}</option>' +
                        '</select>' +
                        '<div class="zaaselect-selected">' +
                            '<span class="zaaselect-selected-text" ng-click="toggleIsOpen()">{{getSelectedLabel()}}</span>' +
                            '<i class="material-icons zaaselect-clear-icon" ng-click="setModelValue(initvalue)">clear</i>' +
                            '<i class="material-icons zaaselect-dropdown-icon" ng-click="toggleIsOpen()">keyboard_arrow_down</i>' +
                        '</div>' +
                        '<div class="zaaselect-dropdown">' +
                            '<div class="zaaselect-search">' +
                                '<input class="zaaselect-search-input" type="search" focus-me="isOpen" ng-model="searchQuery" />' +
                            '</div>' +
                            '<div class="zaaselect-overflow">' +
                                '<div class="zaaselect-item" ng-repeat="opt in options | filter:searchQuery | limitTo: limiter">' +
                                    '<span class="zaaselect-label" ng-class="{\'zaaselect-label-active\': opt[optionsvalue] == model}" ng-click="opt[optionsvalue] == model ? false : setModelValue(opt)">{{opt[optionslabel]}}</span>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
        }
    };
});


zaa.directive('ngConfirmClick', [
    function(){
        return {
            link: function (scope, element, attr) {
                var msg = attr.ngConfirmClick || 'Are you sure?';
                var clickAction = attr.confirmedClick;
                element.bind('ng-click',function (event) {
                    if (window.confirm(msg) ) {  // TODO: Replace with more pretty dialog
                        scope.$eval(clickAction);
                    }
                });
            }
        };
    }]);




zaa.directive('visTimeline', function () {
    'use strict';
    return {
        restrict: 'EA',
        transclude: false,
        scope: {
            data: '=',
            options: '=',
            events: '=',
            component: '=?'
        },
        link: function (scope, element, attr) {
            var timelineEvents = [
                'rangechange',
                'rangechanged',
                'timechange',
                'timechanged',
                'select',
                'doubleClick',
                'click',
                'contextmenu'
            ];

            // Declare the timeline
            var timeline = null;

            scope.$watch('data', function () {
                // Sanity check
                //console.log(scope.data);
                if (scope.data == null) {
                    return;
                }

                // If we've actually changed the data set, then recreate the graph
                // We can always update the data by adding more data to the existing data set
                if (timeline != null) {
                    timeline.destroy();
                }

                // Create the timeline object
                //console.log(scope.data);
                timeline = new vis.Timeline(element[0]);
                scope.component = timeline;


                // Attach an event handler if defined
                angular.forEach(scope.events, function (callback, event) {
                    if (timelineEvents.indexOf(String(event)) >= 0) {
                        timeline.on(event, callback);
                    }
                });

                // Set the options first
                timeline.setOptions(scope.options);

                // Add groups and items
                if (scope.data.groups != null) {
                    timeline.setGroups(scope.data.groups);
                }
                if (scope.data.items != null) {
                    timeline.setItems(scope.data.items);
                }


                // onLoad callback
                if (scope.events != null && scope.events.onload != null && angular.isFunction(scope.events.onload)) {
                    scope.events.onload(timeline);
                }
            });

            scope.$watchCollection('options', function (options) {
                if (timeline == null) {
                    return;
                }
                timeline.setOptions(options);
            });
        }
    };
});



/*
<script type="text/ng-template" id="storageFileUpload">
    <div className="link-selector">
        <div className="link-selector-actions">
            <div className="link-selector-btn btn btn-secondary" ng-click="toggleModal()">
                <i className="material-icons left" ng-show="!fileinfo.name_original">file_upload</i>
                <i className="material-icons left" ng-show="fileinfo.name_original">attach_file</i>
                <span ng-if="fileinfo.name_original">{{fileinfo.name_original | truncateMiddle: 30}}</span>
                <span ng-if="!fileinfo.name_original">
                    Choose file                </span>
            </div>
            <span className="link-selector-reset" ng-click="reset()" ng-show="fileinfo!=null">
                <i className="material-icons">remove_circle</i>
            </span>
        </div>
        <modal is-modal-hidden="modal.state" modal-title="Choose file">
            <div ng-if="!modal.state">
                <storage-file-manager selection="true"/>
            </div>
        </modal>
    </div>
</script>
*/


zaa.directive('confReminder', function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        transclude: true,
        scope: { //@ reads the attribute value, = provides two-way binding, & works with functions

            'isActive': '@',
            'withFiles': '@',
            'id': '@',
            'header': '@',
            'previewUrl': '@',
            'broadcastUrl': '@',
            'delay': '@',
        },
        controller: ['$scope', '$interval', 'confBroadcastService', 'AdminLangService',  function ($scope, $interval, confBroadcastService, AdminLangService) {
            if ($scope.previewUrl === undefined || $scope.previewUrl === '') {
                $scope.previewUrl = 'admin/api-conference-confmails/preview';
            }

            if ($scope.broadcastUrl === undefined || $scope.broadcastUrl === '') {
                $scope.broadcastUrl = 'admin/api-conference-confmails/broadcast';
            }

            // Interval between emails (ms) for one thread
            $scope.delay = parseInt($scope.delay);
            if (!$scope.delay) {
                $scope.delay = 1000;
            }

            var options = {};
            options.files = {};





            $scope.isFiles = false;
            $scope.isFiles = ($scope.withFiles === 'true' || $scope.withFiles === '1');


            $scope.isOpen = $scope.isActive;
            $scope.isBroadcasting = false;


            $scope.total = 0;
            $scope.remaining = 0;
            $scope.lastAccess = '';
            $scope.totalSeconds = 0;
            $scope.lastEmail = '';
            $scope.percent = 0;

            $scope.preview = false;

            $scope.file1 = {};
            $scope.file2 = {};

            $scope.test = {};

            $scope.AdminLangService = AdminLangService;

            // Force all languages to show
            angular.forEach(AdminLangService.data, function(value, key) {
                if (!$scope.AdminLangService.isInSelection(value.short_code)) {
                    $scope.AdminLangService.selection.push(value.short_code);
                }
            });

            /**
             * Get and show random letter from server
             * @param type Broadcast mode
             */
            $scope.showPreview = function(type) {
                options.files[1] = $scope.file1;
                options.files[2] = $scope.file2;

                var promise = confBroadcastService.showPreview(type, $scope.previewUrl, options);
                promise.then(function(data) {
                    $scope.preview = data.preview;
                    $scope.total   = data.total;
                    $scope.lastEmail = data.lastEmail;
                    $scope.percent   = data.percent;
                    $scope.remaining   = data.remaining;


                    let lastAccess = new Date(1000*data.lastAccess);
                    $scope.lastAccess  = lastAccess.toLocaleDateString();



                    // Total seconds to broadcast
                    $scope.totalSeconds = Math.floor(+data.total*$scope.delay/100)/10;

                    // Remaining seconds to broadcast
                    $scope.remainingSeconds = Math.floor(+data.remaining*$scope.delay/100)/10;
                });

            };


            var stop;

            /**
             *  Broadcasting letters
             * @param type Broadcast mode
             */
            $scope.startMailing = function(type) {
                $scope.isBroadcasting = true;
                console.log ('Broadcast started. Type: '+type);

                options.files[1] = $scope.file1;
                options.files[2] = $scope.file2;


                stop = $interval(function() {
                    var promise = confBroadcastService.sendOneMail(type, $scope.broadcastUrl, options);
                    promise.then(function(data) {
                        $scope.lastEmail = data.lastEmail;
                        $scope.percent   = data.percent;
                        $scope.remaining   = data.remaining;


                        // Remaining seconds to broadcast
                        $scope.remainingSeconds = Math.floor(+data.remaining*$scope.delay/100)/10;

                        if (data.lastEmail === 'complete') {
                            $scope.stopMailing();
                        }
                    });

                }, $scope.delay);
            };




            $scope.stopMailing = function() {
                $scope.isBroadcasting = false;

                if (angular.isDefined(stop)) {
                    $interval.cancel(stop);
                    stop = undefined;

                    console.log ('Broadcast stopped');
                }
            };




            // Make sure that the interval is destroyed too
            $scope.$on('$destroy', function() {
                $scope.stopMailing();
            });

        }],


        template: function () {
            return '' +
                '<div class="collapsablePanel" ng-class="{expanded: isOpen, faded: !isActive, broadcasting: isBroadcasting}">' +
                    '<h2 class="panelHeader " ng-click="isOpen = (!isOpen || isBroadcasting)">{{header}}</h2>' +
                    '<div class="panelContent mb-5 pl-4" ng-show="isOpen">' +
                        '<ng-transclude></ng-transclude>' +
                        '<div ng-if="isFiles" ng-show="!isBroadcasting">' +
                            '<h3>Файлы</h3>'+
                            '<div class="row">' +
                                '<div class="col" ng-repeat="lang in AdminLangService.data" ng-show="AdminLangService.isInSelection(lang.short_code)">' +
                                    '<zaa-file-upload model="file1[lang.short_code]" label="Файл 1"></zaa-file-upload>'+
                                    '<zaa-file-upload model="file2[lang.short_code]" label="Файл 2"></zaa-file-upload>'+
                                    '<span class="flag flag-{{lang.short_code}} form-col-flag">' +
                                        '<span class="flag-fallback">{{lang.name}}</span>' +
                                    '</span>'+

                                '</div>' +
                            '</div>'+

                        '</div>'+

                        '<p class="mt-4"><button class="btn btn-info btn-icon" type="button" ng-click="showPreview(id)" ng-disabled="isBroadcasting" class="btn btn-primary">Preview random letter</button></p>' +

                        '<div ng-if="preview && !total">' +
                            '<p class="alert alert-danger">Нет возможных получателей</p>'+
                        '</div>'+

                        '<div ng-if="preview && total">' +

                            '<h3>Статистика</h3>' +
                            '<p>Всего получателей: ' +
                                '<b>{{total}}</b>' +
                            '</p>' +
                            '<p>Приблизительное время всей рассылки: ' +
                                '<b>{{totalSeconds | secondsToMinutesFilter}}</b>' +
                            '</p>' +
                            '<p>Дата отправки последнего письма: ' +
                                '<b>{{lastAccess}}</b>' +
                            '</p>' +
                
                            //'<p>Total recipients <b>{{count}}</b></p>\n' +
                            '<h3>Пример письма</h3>' +
                            '<div class="row mt-2">' +
                                '<div class="col yellowLetter" ng-repeat="lang in AdminLangService.data" ng-if="AdminLangService.isInSelection(lang.short_code)">' +
                                    '<div ng-bind-html="preview[lang.short_code]"></div>' +
                                    '<span class="flag flag-{{lang.short_code}} form-col-flag">' +
                                        '<span class="flag-fallback">{{lang.name}}</span>' +
                                    '</span>'+
                                '</div>' +
                            '</div>'+

                            '<div ng-if="isActive">' +
                                '<p class="mt-2 mb-4">' +
                                    '<button class="btn btn-success btn-icon" type="button" ng-disabled="isBroadcasting" ng-click="startMailing(id)">Send letters</button>  ' +
                                    '<button class="btn btn-danger btn-icon" type="button"  ng-show="isBroadcasting" ng-click="stopMailing(id)">Stop</button>' +
                                '</p>' +
                                '<div class="mb-4" ng-show="lastEmail || isBroadcasting">' +
                                    '<p>Last email: <b>{{lastEmail}}</b></p>' +
                                    '<p>Estimated remaining time (in seconds): <b>{{remainingSeconds}}</b></p>' +
                                    '<div class="progress">' +
                                        '<div class="progress-bar progress-bar-info" ng-class="{\'progress-bar-striped progress-bar-animated\': isBroadcasting}" role="progressbar" aria-valuenow="{{percent}}" aria-valuemin="0" aria-valuemax="100" style="width: {{percent}}%;">' +
                                            '{{percent}}%' +
                                        '</div>' +
                                    '</div>' +
                                '</div>'+
                            '</div>' +
                        '</div>'+
                    '</div>' +
                '</div>';
        }
    };
});