<?php

use antikon\conference\frontend\Module;
use app\assets\ResourcesAsset;
use luya\helpers\Url;
use luya\cms\widgets\LangSwitcher;
use yii\helpers\Html;
use yii\widgets\LinkPager;


/* @var $language string */
/* @var $this \luya\web\View */
/* @var $provider \yii\data\ActiveDataProvider */


\yii\bootstrap\BootstrapAsset::register($this);
ResourcesAsset::register($this);

/* @var $this luya\web\View */
/* @var $content string */


// ONE TEMPLATE TO RULE THEM ALL

$isHome = (Yii::$app->menu->current == '/'.Yii::$app->composition->language.'/index');



$this->beginBlock('contacts'); ?>
    <h2><?=\Yii::t('app/template', 'Contacts');?></h2>
    <!--                <p><b>+7 986 7661599</b> — телефон для связи с оргкомитетом во время симпозиума.</p>-->
    <p><i><?=\Yii::t('app/template', 'Vladimir Vladimirovich Rumyantsev');?></i> — <?=\Yii::t('app/template', 'scientific secretary of the Symposium');?>, <br>
        <b><?=\Yii::t('app/template', 'Ph.');?>: (831) 417−94−82 +262</b></p>
    <p><i><?=\Yii::t('app/template', 'Maria Vladimirovna Zorina');?></i><br>
        <b><?=\Yii::t('app/template', 'Ph.');?>: (831) 417-94-76 +520</b></p>

    <!--                <p><i>Валентина Григорьевна Беллюстина</i> (по вопросам оплаты), <br>
                    <b>+7 910 3810391</b></p>
                    <p><i>Роман Станиславович Малофеев</i> (по вопросам трансфера), <br>
                    <b>+7 904 9009555</b></p>
    -->

    <p><?=\Yii::t('app/template', 'Fax');?>: (831) 417–94–64</p>
    <p>E-mail: <a href="mailto:symp@nanosymp.ru">symp@nanosymp.ru</a></p>
    <p><a href="https://vk.com/nanosymp"><img src="/images/vk_icon.png"> Nanosymp</a></p>
<?php $this->endBlock();


$this->beginPage();
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->composition->language; ?>">
<head>

    <title><?= $this->title; ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <?php $this->head() ?>


    <script type="text/javascript">
        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-468412-4']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();
    </script>
</head>
<body class="is-preload">
<?php $this->beginBody() ?>
<div id="center-global-wrapper">
    <div id="x4-global-wrapper">
        <div id="pre-global-wrapper">


            <div id="global-wrapper">

                <div class="page">
                    <div class="top">
                        <div id="langs"><?=LangSwitcher::widget(
                                [
                                    'elementActiveClass' => 'active',


                                    /*
'listElementOptions' => ['class' => 'langnav__list'],
                                    'elementOptions' => ['class' => 'langnav__item'],
                                    'linkOptions' => ['class' => 'langnav__link'],*/
                                ]
                            );?></div>
                        <div id="name">
                            <?php if ($isHome): ?>
                                <header class="conf-name"><span class="dropcap">XXIV</span><?=\Yii::t('app/template', 'International Symposium');?><br>
                                        <span class="shift"><?=\Yii::t('app/template', '“Nanophysics & Nanoelectronics”');?></span></header>
                            <?php else: ?>
                                <header class="conf-name"><a href="<?=Yii::$app->getHomeUrl()?>"><span class="dropcap">XXIV</span><?=\Yii::t('app/template', 'International Symposium');?><br>
                                        <span class="shift"><?=\Yii::t('app/template', '“Nanophysics & Nanoelectronics”');?></span></a></header>
                            <?php endif?>
                        </div>

                        <div id="period">
                            <h2 class="conf-period"><?=\Yii::t('app/template', 'Nizhny Novgorod');?><br>
                                <span><?=\Yii::t('app/template', 'March, 10-13, 2020');?></span></h2>
                        </div>
                    </div>
                </div>

                <div class="page">
                    <div class="left-column">

                        <nav class="menu">
                            <ul>
                                <?php foreach (Yii::$app->menu->findAll(['depth' => 1, 'container' => 'main']) as $item): /* @var $item \luya\cms\menu\Item */ ?>
                                    <li class="nav-item<?= $item->isActive ? ' active' : '' ?>">
                                        <a class="nav-link" href="<?= $item->link; ?>"><?= $item->title; ?></a>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </nav>


                        <div class="kabinet-button">
                            <div class="button-shadow">
                                <?= Html::a(\Yii::t('app/template', 'My office'),
                                    ['/'.\Yii::$app->getModule('conference')->moduleHomeUrl],
                                    ['class' => 'button']
                                ) ?>
                            </div>
                            <div class="kabinet-button-shadow"></div>
                        </div>

                        <!--
                                <div class="left-col-block">

                                    <h2><?=\Yii::t('app/template', 'Sponsors');?></h2>

                                </div>
                        -->

                        <?php if (!$isHome): ?>

                            <div class="left-col-block">
                                <?php if (isset($this->blocks['contacts'])): ?>
                                    <?= $this->blocks['contacts'] ?>
                                <?php endif ?>
                            </div>
                        <?endif;?>



                    </div>

                    <div class="right-column">

                        <div class="unclearer">
                            <div class="bnrs-row">
                                <table><tr>

                                        <!--
                                                         <td class="one-half">
                                                            <div class="row-bnr">
                                                                <div class="bnr" id="registr"></div>
                                                                <h2>Регистрация</h2>
                                                                <a class="bnr-link" href="my_office?operate=register"><span class="hidden">Регистрация</span></a>
                                                            </div>
                                                        </td>



                                                        <td class="one-half">
                                                            <div class="row-bnr">
                                                                <div class="bnr" id="bablo"></div>
                                                                <h2>Порядок оплаты</h2>
                                                                <a class="bnr-link" href="payment"><span class="hidden">Порядок оплаты</span></a>
                                                            </div>
                                                        </td>
                                        -->
                                        <td class="one-first">
                                            <div class="row-bnr">
                                                <div class="bnr" id="sana"></div>
                                                <h2><?=\Yii::t('app/template', 'Venue');?></h2>
                                                <a class="bnr-link" href="location"><span class="hidden"><?=\Yii::t('app/template', 'Venue');?></span></a>
                                            </div>
                                        </td>
                                    </tr></table>
                            </div>

                            <?php if ($isHome): ?>
                                <div class="inner-right-column">
                                    <div class="news right-col">
                                        <block name="News">
                                    </div>
                                    <hr>
                                    <div class="contacts right-col">
                                        <?php if (isset($this->blocks['contacts'])): ?>
                                            <?= $this->blocks['contacts'] ?>
                                        <?php endif ?>
                                    </div>
                                </div>

                                <div class="inner-left-column">
                                    <div id="maintext">
                                        <!-- main text -->
                                        <h1><?= $this->title; ?></h1>
                                        <?= $content; ?>
                                        <!-- end of main text -->
                                    </div>

                                    <div class="maintext-shadow"></div>
                                </div>
                            <?else:?>
                                <div class="inner-page">
                                    <div id="maintext">
                                        <!-- main text -->
                                        <h1><?= $this->title; ?></h1>
                                        <?= $content; ?>
                                            <!-- end of main text -->
                                    </div>
                                </div>
                            <?endif;?>
                        </div>

                    </div>
                </div>

                <div class="clear"></div>

                <div id="footer">
                    <div class="page">
                        <div class="left-column">
                            <div class="copyright">
                                <p>© 2010&mdash;<?=date('Y');?>, <?=\Yii::t('app/template', 'IPM RAS');?>.<br>
                                        E-mail: <a href="mailto:symp@nanosymp.ru">symp@nanosymp.ru</a></p>
                            </div>
                        </div>

                        <div class="right-column">
                            <div class="address2">
                                <p><?=\Yii::t('app/template', 'Phone');?>: (831) 417−94−82 +262<br>
                                   <?=\Yii::t('app/template', 'Fax');?>:    (831) 417–94–74</p>
                            </div>
                            <div class="address1">
                                <p><?=\Yii::t('app/template', 'Address');?>: <?=\Yii::t('app/template', 'GSP-105, Nizhny Novgorod, 603950, Russia');?></p>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>

            </div>
        </div>
    </div>
</div>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>