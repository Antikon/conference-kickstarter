<?php

namespace app\assets;

use luya\bootstrap4\Bootstrap4Asset;

class ResourcesAsset extends \luya\web\Asset
{
    public $sourcePath = "@app/resources";
    
    public $css = [
        /*'//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css',*/
        /*'scss/main.scss',*/
        'css/main.css'
    ];

    public $js = [
        'js/bootstrap.min.js',
        'js/main.js'
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
