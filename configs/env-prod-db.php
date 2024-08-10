<?php

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=confetti',
            'username' => 'antikon',
            'password' => '111111',
            'charset' => 'utf8',

            // in productive environments you can enable the schema caching
            'enableSchemaCache' => true,
            'schemaCacheDuration' => 43200,
        ]
    ]
];
