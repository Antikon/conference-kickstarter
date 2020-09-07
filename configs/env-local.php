<?php

/**
 * This is the base config. It doesn't hold any informations about the database and is only used for local development.
 * Use env-local-db.php to configure you database.
 */

/*
 * Enable or disable the debugging, if those values are deleted YII_DEBUG is false and YII_ENV is prod.
 * The YII_ENV value will also be used to load assets based on environment (see assets/ResourcesAsset.php)
 */
defined('YII_ENV') or define('YII_ENV', 'local');
defined('YII_DEBUG') or define('YII_DEBUG', true);

$config = [
	'aliases' => [
    	'@bower' => '@vendor/bower-asset',
	    '@npm' => '@vendor/npm-asset',
	],


     'bootstrap' => ['log'],
    /*
     * For best interoperability it is recommend to use only alphanumeric characters when specifying an application ID.
     */
    'id' => 'myproject',
    /*
     * The name of your site, will be display on the login screen
     */
    'siteTitle' => 'My Project',


//    'timeZone' => 'UTC',
    'timeZone' => 'Europe/Moscow',
//    'timeZone' => 'Asia/Calcutta',
    /*
     * Let the application know which module should be executed by default (if no url is set). This module must be included
     * in the modules section. In the most cases you are using the cms as default handler for your website. But the concept
     * of LUYA is also that you can use a website without the CMS module!
     */
    'defaultRoute' => 'cms',
    /*
     * Define the basePath of the project (Yii Configration Setup)
     */
    'basePath' => dirname(__DIR__),


    'modules' => [
        /*
         * If you have other admin modules (e.g. cmsadmin) then you going to need the admin. The Admin module provides
         * a lot of functionality, like storage, user, permission, crud, etc. But the basic concept of LUYA is also that you can use LUYA without the
         * admin module.
         *
         * @secureLogin: (boolean) This will activate a two-way authentication method where u get a token sent by mail, for this feature
         * you have to make sure the mail component is configured correctly. You can test this with console command `./vendor/bin/luya health/mailer`.
         */
        'admin' => [
            'class' => 'luya\admin\Module',
            'secureLogin' => false, // when enabling secure login, the mail component must be proper configured otherwise the auth token mail will not send.
            'strongPasswordPolicy' => false, // If enabled, the admin user passwords require strength input with special chars, lower, upper, digits and numbers
            'interfaceLanguage' => 'en', // Admin interface default language. Currently supported: en, de, ru, es, fr, ua, it, el, vi, pt, fa

        ],
        /*
         * Frontend module for the `cms` module.
         */
        'cms' => [
            'class' => 'luya\cms\frontend\Module',
            'contentCompression' => false, // compressing the cms output (removing white spaces and newlines),

        ],
        /*
         * Admin module for the `cms` module.
         */
        'cmsadmin' => [
            'class' => 'luya\cms\admin\Module',
            'hiddenBlocks' => [],
            'blockVariations' => [],
        ],


        'crawler' => [
            'class' => 'luya\crawler\frontend\Module',
            'baseUrl' => 'http://rjuse',
        ],
        'crawleradmin' => 'luya\crawler\admin\Module',


        'conferenceadmin' => 'antikon\conference\admin\Module',
        'conference'    => [
            'class' => 'antikon\conference\frontend\Module',
            'defaultLanguage' => 'en',
            'hostInstituteName' => 'IPM RAS',
            'friendlyCountries' => [
                'Belarus',
                'Kazakhstan',
                'Ukraine'
            ],


            'isAdditionalSectionEnabled' => true,

            'abstractSubmissionType' => 'typing', // "upload" or "typing" (default)
            
            'isAbstractsAndProceedingsAreTheSame' => true,

            'fees' => [
            
                'local' => [
                    'default' => 0,
                    'accommodation' => 20000
                ],


                'abroad' => [
                    'default' => 0,
                    'accommodation' => 300
                ]
                
            ],

            'feeCurrencies' => [
                'local'  => 'RUB',
                'abroad' => 'EUR'
            ],

            'yandexRaspApiKey' => '2d78d5e1-3312-4685-a104-f40a4b2644ce',


            'mainEmail' => 'symp@nanosymp.ru',  
            'moduleHomeUrl'=> 'my-office',
            'conferenceName' => [
                'en' => [
                    'nominative'    => '{VII [Conference]} on Physics of Liquids'
                ],
/*                'ru' => [
                    'nominative'    => '{XXIV [Cимпозиум]} «Нанофизика и наноэлектроника»',
                    'genitive'      => '{XXIV [Cимпозиума]} «Нанофизика и наноэлектроника»',
                    'dative'        => '{XXIV [Cимпозиуму]} «Нанофизика и наноэлектроника»',
                    'accusative'    => '{XXIV [Cимпозиум]} «Нанофизика и наноэлектроника»',  
                    'instrumental'  => '{XXIV [Cимпозиумом]} «Нанофизика и наноэлектроника»',
                    'prepositional' => '{XXIV [Cимпозиуме]} «Нанофизика и наноэлектроника»'
                ],
                */
            ],


        ],

        'datecontrol' => [
            'class' => 'kartik\datecontrol\Module',
        ],

/*
        'gallery' => [
            'class' => 'luya\gallery\frontend\Module',
            'useAppViewPath' => true, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        'galleryadmin' => 'luya\gallery\admin\Module',
*/
//        'addressbookadmin' => 'luya\addressbook\admin\Module',
//        'addressbook' => 'luya\addressbook\frontend\Module',

/*
        'userauthfrontend' => [
            'class' => 'luya\userauth\frontend\Module',
            'useAppViewPath' => false, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
        'userauthadmin' => [
            'class' => 'luya\userauth\admin\Module',

        ],
*/

        /*
        'errorapi' => [
          'class' => 'luya\errorapi\Module',
        ],

        'news' => [
        	'class' => 'luya\news\frontend\Module',
        	'useAppViewPath' => false, // When enabled the views will be looked up in the @app/views folder, otherwise the views shipped with the module will be used.
        ],
       'newsadmin' => 'luya\news\admin\Module',
        */

    ],
    'components' => [

	    'assetManager' => [
            'converter' => [
                'class' => 'yii\web\AssetConverter',
                'commands' => [
	                'scss' => ['css', 'sass {from} {to} --source-map'],
                ],
            ],

            // override bundles to use local project files :
            
            'bundles' => [
                'yii\bootstrap4\BootstrapAsset' => [
                    'sourcePath' => '@app/resources',
                    'css' => [
                        'css/main.css'
                    ],
                ],
                /*	
                'yii\bootstrap\BootstrapPluginAsset' => [
                    'sourcePath' => '@app/resources',
                    'css' => [
                        'css/main.css'
                    ],
                    'js' => [
                        'js/bootstrap.min.js'
                    ],

                ],
                
                'yii\bootstrap\BootstrapThemeAsset' => [
                    'sourcePath' => '@app/resources',
                    'css' => [
                        'css/main.css'
                    ],
                    'js' => [
                        'js/bootstrap.min.js'
                    ],
                ],
                */
            ],
            

        ],

    
        'log' => [
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning', 'info', 'trace'],
                    'categories' => ['yii\db\*']
                ],
            ],
        ],
         



         'user' => [
             'class' => 'yii\web\User',
             'identityClass' => 'antikon\conference\models\User',
         ],


         'geoip' => [
             'class' => 'dpodium\yii2\geoip\components\CGeoIP',
         ],


        /*
         * Add your smtp connection to the mail component to send mails (which is required for secure login), you can test your
         * mail component with the luya console command ./vendor/bin/luya health/mailer.
         */
        'mail' => [
            'host' => 'localhost',
            'port' => 25,
            'smtpSecure'=>'',
            'smtpAuth' => false,
            'username' => '',
            'password' => null,
            'from' => 'antikon2@yandex.ru',
            'fromName' => 'Symp',
        ],
        /*
         * The composition component handles your languages and they way your urls will look like. The composition components will
         * automatically add the language prefix which is defined in `default` to your url (the language part in the url  e.g. "yourdomain.com/en/homepage").
         *
         * hidden: (boolean) If this website is not multi lingual you can hide the composition, other whise you have to enable this.
         * default: (array) Contains the default setup for the current language, this must match your language system configuration.
         */
        'composition' => [
            'hidden' => false, // no languages in your url (most case for pages which are not multi lingual)
            'default' => ['langShortCode' => 'en'], // the default language for the composition should match your default language shortCode in the language table.
        ],
        /*
         * If cache is enabled LUYA will cache cms blocks and speed up the system in different ways. In the prep config
         * we use the DummyCache to imitate the caching behavior, but actually nothing gets cached. In production you should
         * use caching which matches your hosting environment. In most cases yii\caching\FileCache will result in fast website.
         *
         * http://www.yiiframework.com/doc-2.0/guide-caching-data.html#cache-apis
         */
        'cache' => [
            'class' => 'yii\caching\DummyCache', // use: yii\caching\FileCache
        ],



        /* Date formats and so on */
        'formatter' => [
            'dateFormat' => 'medium',
        ],


        /*
    	 * Translation component. If you don't have translations just remove this component and the folder `messages`.
    	 */
        'i18n' => [
            'translations' => [
                'app*' => [
                    'class' => 'yii\i18n\PhpMessageSource',
                    'fileMap' => [
                        'app'          => 'app.php',
                        'app/template' => 'template.php',
                    ],
                ],
            ],
        ],


/*        'errorHandler' => [
          
          'api' => 'http://rjuse/errorapi', // where example is the domain you have setup error api above
          'transferException' => true,
        ],
*/


    ],
    'controllerMap' => [
        'migration' => [
            'class' => 'bizley\migration\controllers\MigrationController',
        ],

/*
        'migrate' => [
            'class' => \yii\console\controllers\MigrateController::class,
            'migrationPath' => [
                '@app/migrations',
                '@yii/rbac/migrations', // Just in case you forgot to run it on console (see next note)
            ],
            'migrationNamespaces' => [
                'Da\User\Migration',
            ],
        ],
*/
    ],
];

/*
if (YII_DEBUG) {
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = ['class' => 'yii\debug\Module', 'allowedIPs' => ['*']];
    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = ['class' => 'yii\gii\Module', 'allowedIPs' => ['*']];
}
*/
return \yii\helpers\ArrayHelper::merge($config, require('env-local-db.php'));
