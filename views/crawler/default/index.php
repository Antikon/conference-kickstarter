<?php
use luya\helpers\Url;
use yii\widgets\LinkPager;
use luya\crawler\widgets\DidYouMeanWidget;
/* @var $query string The lookup query encoded */
/* @var $language string */
/* @var $this \luya\web\View */
/* @var $provider \yii\data\ActiveDataProvider */
?>

<form class="searchpage__searched-form" action="" method="get">
    <input id="search" name="query" type="search" value="<?= $query ?>">
    <input type="submit" value="Search"/>
</form>

<h2><?= $provider->totalCount; ?> Results</h2>
<?= DidYouMeanWidget::widget(['query' => $query, 'language' => $language, 'dataProvider' => $provider]); ?>
<?php foreach($provider->models as $item): /* @var $item \luya\crawler\models\Index */ ?>
    <h3><a href="<?= $item->url; ?>"><?= $item->title; ?></a></h3>
    <p><?= $item->preview($query); ?></p>

<?php endforeach; ?>
<?= LinkPager::widget(['pagination' => $provider->pagination]); ?>