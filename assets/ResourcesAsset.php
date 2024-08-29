<?php

namespace app\assets;

use luya\web\Asset;

class ResourcesAsset extends Asset
{
    public $sourcePath = "@app/resources";
    
    public $css = [
        'css/main.css'
    ];

    public $js = [
        'js/main.js'
    ];

    public $depends = [
        'yii\web\JqueryAsset',
        'yii\bootstrap4\BootstrapPluginAsset'
    ];
}
