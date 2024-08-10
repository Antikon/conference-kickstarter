<?php

/**
 * This is the base config. It doesn't hold any information about the database and is only used for local development.
 * Use env-local-db.php to configure your database.
 */

/*
 * Enable or disable the debugging, if those values are deleted, YII_DEBUG is false, and YII_ENV is prod.
 * The YII_ENV value will also be used to load assets based on environment (see assets/ResourcesAsset.php)
 */
defined('YII_ENV') or define('YII_ENV', 'prod');
defined('YII_DEBUG') or define('YII_DEBUG', false);

$config = [

    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm'   => '@vendor/npm-asset',
    ],


    /*
     * For the best interoperability,
     * it is recommended to use only alphanumeric characters when specifying an application ID.
     */
    'id'           => 'confetti',
    /*
     * The name of your site will be display on the login screen
     */
    'siteTitle'    => 'Confetti Conference Example',


    //    'timeZone' => 'UTC',
    'timeZone'     => 'Europe/Moscow',
    //    'timeZone' => 'Asia/Calcutta',


    /*
     * Let the application know which module should be executed by default (if no url is set). This module must be included
     * in the modules section. In most cases, you are using the cms as default handler for your website. But the concept
     * of LUYA is also that you can use a website without the CMS module!
     */
    'defaultRoute' => 'cms',


    'ensureSecureConnection' => true,

    /*
     * Define the basePath of the project (Yii Configration Setup)
     */
    'basePath'     => dirname(__DIR__),


    'modules'       => [
        /*
         * If you have other admin modules (e.g., cmsadmin), then you need the admin section.
         * The Admin module provides a lot of functionality, like storage, user, permission, crud, etc.,
         * but the basic concept of LUYA is also that you can use LUYA without the admin module.
         *
         * @secureLogin:
         * (boolean) This will activate a two-way authentication method where u get a token sent by mail,
         * for this feature
         * you have to make sure the mail component is configured correctly.
         * You can test this with console command `./vendor/bin/luya health/mailer`.
         */
        'admin'    => [
            'class'                => 'luya\admin\Module',
            'secureLogin'          => false,
            // when enabling secure login, the mail component must be properly configured otherwise the auth token mail will not send.
            'strongPasswordPolicy' => false,
            // If enabled, the admin user passwords require strength input with special chars, lower, upper, digits and numbers
            'interfaceLanguage'    => 'ru',
            // Admin interface default language. Currently supported: en, de, ru, es, fr, ua, it, el, vi, pt, fa

        ],
        /*
         * Frontend module for the `cms` module.
         */
        'cms'      => [
            'class'              => 'luya\cms\frontend\Module',
            'contentCompression' => false, // compressing the cms output (removing white spaces and newlines),

        ],
        /*
         * Admin module for the `cms` module.
         */
        'cmsadmin' => [
            'class'           => 'luya\cms\admin\Module',
            'hiddenBlocks'    => [],
            'blockVariations' => [],
        ],


        'conferenceadmin' => 'antikon\conference\admin\Module',
        'conference'      => [
            'class'             => 'antikon\conference\frontend\Module',
            'defaultLanguage'   => 'en',
            'hostInstituteName' => 'MSU',
            'friendlyCountries' => [
                'Belarus',
                'Kazakhstan'
            ],


            'isOnlineEnabled'     => true,
            'isSettlementEnabled' => true,
            'isSeatingEnabled'    => true,
            'isTransportEnabled'  => true,

            'fees' => [
                'local' => [
                    'base'          => 0,
                    'accommodation' => 0,
                    'oral'          => 10000,
                    'invited'       => 10000,
                    'plenary'       => 10000
                ],


                'abroad' => [
                    'base'          => 0,
                    'accommodation' => 0
                ]

            ],

            'feeCurrencies' => [
                'local'  => 'RUB',
                'abroad' => 'EUR'
            ],


            'yandexRaspApiKey' => '#####insert key here#####',


            'mainEmail'     => 'conf@confetti-example.ru',
            'moduleHomeUrl' => 'my-office',

            'conferenceName' => [
                'en' => [
                    'nominative' => '{VII [Conference]} on Physics of Liquids'
                ],
                'ru' => [
                    'nominative'    => '{VII [Конференция]} по физике жидкостей',
                    'genitive'      => '{VII [Конференции]} по физике жидкостей',
                    'dative'        => '{VII [Конференции]} по физике жидкостей',
                    'accusative'    => '{VII [Конференция]} по физике жидкостей',
                    'instrumental'  => '{VII [Конференцией]} по физике жидкостей',
                    'prepositional' => '{VII [Конференции]} по физике жидкостей'
                ],

            ],


        ],

        'datecontrol' => [
            'class' => 'kartik\datecontrol\Module',
        ],


    ],
    'components'    => [

        'assetManager' => [
            // override bundles to use local project files :
            'bundles'   => [
                'yii\bootstrap4\BootstrapAsset' => [
                    'sourcePath' => '@app/resources',
                    'css'        => [
                        'css/main.css'
                    ],
                ],
            ],
        ],


        'log' => [
            'targets' => [
                [
                    'class'      => 'yii\log\FileTarget',
                    'levels'     => ['error', 'warning', 'info', 'trace'],
                    'categories' => ['yii\db\*']
                ],
            ],
        ],


        'user' => [
            'class'         => 'yii\web\User',
            'identityClass' => 'antikon\conference\models\User',
        ],


        'geoip'       => [
            'class' => 'dpodium\yii2\geoip\components\CGeoIP',
        ],


        /*
         * Add your smtp connection to the mail component to send mails (which is required for secure login), you can test your
         * mail component with the luya console command ./vendor/bin/luya health/mailer.
         */
        'mail'        => [
            'host'       => 'localhost',
            'port'       => 25,
            'smtpSecure' => '',
            'smtpAuth'   => false,
            'username'   => '',
            'password'   => null,
            /*            'from' => 'antikon2@yandex.ru',
                        'fromName' => 'Symp',*/
        ],
        /*
         * The composition component handles your languages, and they way your urls will look like. The composition components will
         * automatically add the language prefix which is defined in `default` to your url (the language part in the url  e.g. "yourdomain.com/en/homepage").
         *
         * hidden: (boolean) If this website is not multilingual you can hide the composition, otherwise you have to enable this.
         * default: (array) Contains the default setup for the current language, this must match your language system configuration.
         */
        'composition' => [
            'hidden'  => false,
            // no languages in your url (most case for pages which are not multilingual)
            'default' => ['langShortCode' => 'en'],
            // the default language for the composition should match your default language shortCode in the language table.
        ],
        /*
         * If cache is enabled, LUYA will cache cms blocks and speed up the system in different ways. In the local config
         * we use the DummyCache to imitate the caching behavior, but actually nothing gets cached. In production, you should
         * use caching which matches your hosting environment. In most cases, yii\caching\FileCache will result in fast website.
         *
         * http://www.yiiframework.com/doc-2.0/guide-caching-data.html#cache-apis
         */
        'cache'       => [
            'class' => 'yii\caching\FileCache', // use: yii\caching\FileCache
        ],


        /* Date formats and so on */
        'formatter'   => [
            'dateFormat' => 'medium',
        ],


        /*
    	 * Translation component. If you don't have translations, just remove this component and the folder `messages`.
    	 */
        'i18n'        => [
            'translations' => [
                'app*' => [
                    'class'   => 'yii\i18n\PhpMessageSource',
                    'fileMap' => [
                        'app'          => 'app.php',
                        'app/template' => 'template.php',
                    ],
                ],
            ],
        ],
    ],
];


return \yii\helpers\ArrayHelper::merge($config, require('env-prod-db.php'));