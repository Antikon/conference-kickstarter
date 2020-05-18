<?php

return [
    'components' => [
        'db' => [
            'class' => 'yii\db\Connection',
            'dsn' => 'mysql:host=localhost;dbname=rjuse201_rjuse',
            // 'dsn' => 'mysql:host=localhost;dbname=DB_NAME;unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock', // OSX MAMP
            // 'dsn' => 'mysql:host=localhost;dbname=DB_NAME;unix_socket=/Applications/XAMPP/xamppfiles/var/mysql/mysql.sock', // OSX XAMPP
            'username' => 'rjuse201_rjuse',
            'password' => 'bcnDhEs872',
            'charset' => 'utf8',

            // in productive environments you can enable the schema caching
            // 'enableSchemaCache' => true,
            // 'schemaCacheDuration' => 43200,
        ]
    ]
];
