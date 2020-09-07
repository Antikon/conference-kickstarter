<?php

use yii\db\Migration;

class m200518_082914_create_table_admin_lang extends Migration
{
    public function up()
    {

        Yii::$app->db->createCommand()->batchInsert('{{%admin_lang}}', ['id', 'name', 'short_code', 'is_default', 'is_deleted'], [
            [1, 'English', 'en', 1, 0],
            [2, 'Русский', 'ru', 0, 0]
        ])->execute();
        
    }

    public function down()
    {
		Yii::$app->db->createCommand()->delete('{{%admin_lang}}', ['in', 'short_code', ['en', 'ru']]
        )->execute();
    }
}
