<?php
//echo 2323;

// config/test.php
$config =  yii\helpers\ArrayHelper::merge(
    require(__DIR__ . '/env-local.php'),
    [
        'id' => 'app-tests',
        'components' => [
            'db' => [
                'dsn' => 'mysql:host=localhost;dbname=yii_app_test',
            ]
        ]        
    ]
);
return $config;
