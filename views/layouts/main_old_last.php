<?php
use app\assets\ResourcesAsset;
use luya\helpers\Url;
use luya\cms\widgets\LangSwitcher;
use yii\widgets\LinkPager;


/* @var $language string */
/* @var $this \luya\web\View */
/* @var $provider \yii\data\ActiveDataProvider */



ResourcesAsset::register($this);

/* @var $this luya\web\View */
/* @var $content string */


$isHome = (Yii::$app->menu->current == Yii::$app->getHomeUrl());

$this->beginPage();
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->composition->language; ?>">
<head>
    <title><?= $this->title; ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
    <?php $this->head() ?>
</head>
<body class="is-preload">
    <?php $this->beginBody() ?>

    <!-- Wrapper -->
    <div id="wrapper">

        <!-- Main -->
        <div id="main">
            <div class="inner">

                <?php if($isHome): ?>
                    <!-- Header -->
                    <header id="header">
                        <div class="name"> 8<sup>th</sup> <span class="blue">R</span>ussia-<span class="blue">J</span>apan-<span class="blue">US</span>A-<span class="blue">E</span>urope Symposium<br>
                            on Fundamental & Applied Problems<br>
                            of <span class="red">Tera</span>hertz Devices & <span class="red">Tech</span>nologies<br>
                            & GDR-I FIR-LAB Workshop
                        </div>

                        <!--									<ul class="icons">
                                                                <li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
                                                                <li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
                                                                <li><a href="#" class="icon fa-snapchat-ghost"><span class="label">Snapchat</span></a></li>
                                                                <li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
                                                                <li><a href="#" class="icon fa-medium"><span class="label">Medium</span></a></li>
                                                            </ul>
                        -->
                    </header>
                <?php else: ?>
                <header id="tinyheader">
                    <div class="name"> 8<sup>th</sup> <span class="blue">RJUSE</span> & <span class="red">TeraTech</span> & GDR-I Workshop
                    </div>
                </header>

                <section>
                    <h1 class="main"><?= $this->title; ?></h1>
                </section>

                <?php endif ?>


                <?= $content; ?>

                <?php if($isHome): ?>
                    <!-- Organisers -->
                    <section>

                        <div class="row" style="align-items: center;">
                            <div class="col-3 col-6-medium col-12-xsmall">
                                <span class="image fit slim" style="max-width: 60%; margin: 0 auto 1em;">
                                    <img src="<?= $this->publicHtml; ?>/images/orgs/ipmras.png">
                                </span>
                            </div>
                            <div class="col-3 col-6-medium col-12-xsmall">
                                <span class="image fit slim" style="max-width: 50%; margin: 0 auto 1em;">
                                    <img src="<?= $this->publicHtml; ?>/images/orgs/iapras.png">
                                </span>
                            </div>
                            <div class="col-3 col-6-medium col-12-xsmall">
                                <span class="image fit slim" style="max-width: 72%; margin: 0 auto 1em;">
                                    <img src="<?= $this->publicHtml; ?>/images/orgs/ras.png">
                                </span>
                            </div>
                            <div class="col-3 col-6-medium col-12-xsmall">
                                <span class="image fit slim" style="max-width: 32%; margin: 0 auto 1em;">
                                    <img src="<?= $this->publicHtml; ?>/images/orgs/unn.png">
                                </span>
                            </div>
                        </div>
                    </section>
                <?php endif ?>
            </div>
        </div>

        <!-- [CRAWL_IGNORE] -->

        <!-- Sidebar -->
        <div id="sidebar">
            <div class="inner">
                <?=LangSwitcher::widget();?>
                <!-- Logo -->
                <section id="logo">
                    <span class="image fit slim">
                        <?php if ($isHome): ?>
                            <img src="<?= $this->publicHtml; ?>/images/logo/logo.png">
                        <?php else: ?>
                            <a href="<?=Yii::$app->getHomeUrl()?>"><img src="<?= $this->publicHtml; ?>/images/logo/logo.png"></a>
                        <?php endif?>
                    </span>
                </section>

                <!-- Search -->

                <section id="search" class="alt">
                    <form class="searchpage__searched-form" action="<?= Url::toRoute(['/search']); ?>" method="get">
                        <input id="query" name="query" type="search"  placeholder="Search">

                    </form>
                </section>

                <!-- Menu -->
                <nav id="menu">
                    <header class="major">
                        <h2>Menu</h2>
                    </header>
                    <ul>
                        <?php foreach (Yii::$app->menu->findAll(['depth' => 1, 'container' => 'main']) as $item): /* @var $item \luya\cms\menu\Item */ ?>
                            <li class="nav-item<?= $item->isActive ? ' active' : '' ?>">
                                <a class="nav-link" href="<?= $item->link; ?>"><?= $item->title; ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </nav>

                <!-- Section -->
                <section>
                    <header class="major">
                        <h2>Important dates</h2>
                    </header>
                    <ul>
                        <li><b>Abstract submission: April&nbsp;8,&nbsp;2019</b></li>
                        <li>Acceptance notification: April&nbsp;23,&nbsp;2019</li>
                        <li>“Early-bird” registration: June&nbsp;7,&nbsp;2019</li>
                        <li>Symposium dates: July&nbsp;08–11,&nbsp;2019</li>
                    </ul>
                </section>

                <!-- Contact -->
                <section>
                    <header class="major">
                        <h2>Contact</h2>
                    </header>
                    <p>Dr. Alexandre Dubinov, scientific secretary</p>
                    <ul class="contact">
                        <li class="fa-envelope-o"><a href="mailto:info@rjuse-2019.org">info@rjuse-2019.org</a></li>
                        <li class="fa-phone">+7 831 4179482 +234</li>
                        <li class="fa-home">GSP-105, Nizhny Novgorod, 603950, Russia </li>
                    </ul>
                </section>

                <!-- Footer -->
                <footer id="footer">
                    <p class="copyright">&copy;&nbsp;2019 IPM RAS. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
                </footer>

            </div>
        </div>

        <!-- [/CRAWL_IGNORE] -->
    </div>

    <?php $this->endBody() ?>
    </body>
</html>
<?php $this->endPage() ?>