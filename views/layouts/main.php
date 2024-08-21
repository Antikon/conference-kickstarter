<?php

use antikon\conference\frontend\widgets\SponsorsWidget;
use app\assets\ResourcesAsset;
use luya\cms\widgets\LangSwitcher;
use yii\helpers\Html;



/* @var $language string */
/* @var $this \luya\web\View */
/* @var $provider \yii\data\ActiveDataProvider */


ResourcesAsset::register($this);

/* @var $this luya\web\View */
/* @var $content string */


// ONE TEMPLATE TO RULE THEM ALL


$headerData = \Yii::$app->getModule('conference')->getConferenceHeader();

$isHome = (Yii::$app->menu->current == '/'.Yii::$app->composition->langShortCode.'/index');

$this->beginPage();
?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->composition->langShortCode; ?>">
<head>

    <title><?= $this->title; ?></title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, user-scalable=yes" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
    <?php $this->head() ?>




</head>
<body>
<?php $this->beginBody() ?>


<div class="container-fluid p-0 pr-lg-5 pl-lg-5 main-wrapper">
    <div class="row no-gutters">
        <div class="col-md-3 navbg"></div>
        <div class="languages theme-bg-light col-xs-12 col-md-9 px-5 py-2 shadow">
            <div class="row">
                <div class="col-sm">
                    <a href="mailto:<?php echo (\Yii::$app->getModule('conference')->mainEmail);?>"><?php echo (\Yii::$app->getModule('conference')->mainEmail);?></a>
                </div>
                <div class="col-sm text-sm-center">
                    <ul class="scl-list list-inline mx-auto">
                        <li class="list-inline-item"><a href="#"><img src="/images/telegram.svg" class="w-100"></a></li>
                        <li class="list-inline-item"><a href="#"><img src="/images/vk.svg"  class="w-100"></a></li>
                    </ul>

                </div>
                <div class="col-sm text-sm-right">
                    <?=LangSwitcher::widget(
                        [
                            'elementActiveClass' => 'active',
                        ]
                    );?>
                </div>
            </div>
        </div>
    </div>

    <div class="row no-gutters">
        <div class="col-md-1 navbg"></div>
        <header class="header col-md-11 shadow p-5">
            <div class="row">
                <div class="col-xl-8 offset-xl-2">
                    <p class="display-3 name">
                    <?php if (!$isHome): ?><a href="<?=Yii::$app->getHomeUrl()?>"><?php endif;?>
                            <?=$headerData['number'];?> <?=$headerData['first'];?><br>
                            <?=$headerData['second'];?>
                    <?php if (!$isHome): ?></a><?php endif;?>
                    </p>
                </div>
                <div class="col-xl-2  my-auto">
                    <p class="h2"><?=\Yii::t('app/template', 'Moscow');?><br>
                        <?=\Yii::t('app/template', 'June, 10–13, 2028');?>
                    </p>
                </div>
            </div>
        </header>
    </div>

    <div class="d-block d-md-grid grid">

        <div class="a px-5 py-4  navbg left-column">
            <div class="row no-gutters mb-4 mt-4 mt-md-0">
                <div class="col-3 col-md-12 navbar-dark d-md-none">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="col-9 col-md-12">
                    <hr class="d-none d-md-block pb-2">
                    <div class="my-0 mt-md-4 mb-md-4 text-center">
                        <?= Html::a(\Yii::t('app/template', 'My office'),
                            ['/'.\Yii::$app->getModule('conference')->moduleHomeUrl],
                            ['class' => 'btn btn-warning shadow-sm btn-block font-weight-bold']
                        ) ?>
                    </div>
                </div>
            </div>
            <h5 class="d-none d-md-block left-column-header"><?=\Yii::t('app/template', 'Menu');?></h5>
            <nav class="navbar navbar-expand-md navbar-dark  p-0">
                <div id="navigation" class="collapse navbar-collapse flex-column" >
                    <ul class="navbar-nav flex-column text-left w-100 h5">
                        <?php foreach (Yii::$app->menu->findAll(['depth' =>1, 'container' => 'default']) as $item): /* @var $item \luya\cms\menu\Item */ ?>
                            <li class="nav-item<?=($item->isActive ? ' active' : '') ?>">
                                <a class="nav-link" href="<?= $item->link; ?>"><?= $item->title; ?></a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            </nav>

        </div>


        <div class="b theme-bg-light shadow ">
            <section class="main-text p-5">
                    <h1  class="heading"><?= $this->title; ?></h1>
                    <?= $content; ?>
            </section>
        </div>


        <div class="c navbg left-column px-5 py-4 pt-md-0">
            <section class="contacts">
                <h5 class="left-column-header"><?=\Yii::t('app/template', 'Contacts');?></h5>

                <!--                <p><b>+7 986 7661599</b> — телефон для связи с оргкомитетом во время симпозиума.</p>-->
                <p><i><?=\Yii::t('app/template', 'Ivan Fedorovich Krusenstern');?></i> — <?=\Yii::t('app/template', 'scientific secretary of the Conference');?> <br>
                    <b><?=\Yii::t('app/template', 'Ph.');?>: +7 (999) 999−99−99</b></p>
                <p><?=\Yii::t('app/template', 'Fax');?>: +7 (999) 999−99−98</p>
                <p>E-mail: <a href="mailto:<?php echo (\Yii::$app->getModule('conference')->mainEmail);?>"><?php echo (\Yii::$app->getModule('conference')->mainEmail);?></a></p>

            </section>
            <section class="important-dates">
                <h5 class="left-column-header"><?=\Yii::t('app/template', 'Important dates');?></h5>
                <ul>
                    <li class="highlight"><b>06.11.2019</b> — Регистрация, представление тезисов докладов;</li>
                    <li>26.11.2019 — Рассылка информации о принятии докладов и второго извещения;</li>
                    <li>23.01.2020 — Крайний срок оплаты оргвзноса за участие в Симпозиуме; </li>
                    <li>23.01.2020 — Крайний срок представления расширенных тезисов для публикации в трудах Cимпозиума; </li>
                    <li>05.03.2020 — Крайний срок представления статей для публикаций в журналах; </li>

                </ul>
            </section>
            <section class="sponsors">
                <h5 class="left-column-header"><?=\Yii::t('app/template', 'Sponsors');?></h5>
                <?= SponsorsWidget::widget(
                    [

                    ]
                );?>
            </section>
        </div>
    </div>
    <footer class="footer theme-bg-dark shadow">
        <div class="row no-gutters text-center text-lg-left py-3 pt-4">
        <div class="col-lg col-xl-3 px-md-5">
            <section>
                <p>© 2010&mdash;<?=date('Y');?>, <?=\Yii::t('app/template', 'Some institute');?>.<br>
                    E-mail: <a href="mailto:<?php echo (\Yii::$app->getModule('conference')->mainEmail);?>"><?php echo (\Yii::$app->getModule('conference')->mainEmail);?></a></p>
            </section>
        </div>
        <div class="col-lg px-xl-5">
            <section>
                <p><?=\Yii::t('app/template', 'Phone');?>: +7 (999) 999−99−99<br>
                    <?=\Yii::t('app/template', 'Fax');?>:  +7 (999) 999−99−98</p>
            </section>
        </div>
        <div class="col-lg px-md-5">
            <section>
                <p><?=\Yii::t('app/template', 'Address');?>: <?=\Yii::t('app/template', 'Leninskie gory, 1, Moscow, 119991, Russia');?></p>
            </section>
        </div>
        <div class="col-lg-2 px-md-5">
            <figure class="text-center text-lg-right">
                <a href="https://confetti-system.ru"><img src="/images/confetti-logo_eng_light_powered.png" class="w-75"></a>
            </figure>
        </div>
        </div>
    </footer>
</div>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>
