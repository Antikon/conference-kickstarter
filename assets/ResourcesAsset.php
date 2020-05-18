<?php

namespace app\assets;

class ResourcesAsset extends \luya\web\Asset
{
    public $sourcePath = '@app/resources';
    
    public $css = [
        //'//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',
        YII_ENV . '/css/Common.css',
        YII_ENV . '/css/Markup.css',
        YII_ENV . '/css/Text.css'
    ];

    public $js = [
        YII_ENV . '/js/browser.min.js',
        YII_ENV . '/js/breakpoints.min.js',
        YII_ENV . '/js/utils.js',
        YII_ENV . '/js/main.js'
    ];

/*
    public $publishOptions = [
        'only' => [
            YII_ENV .'css/*',
            YII_ENV .'js/*',
        ]
    ];
*/

    public $depends = [
        'yii\web\JqueryAsset',
    ];
}
