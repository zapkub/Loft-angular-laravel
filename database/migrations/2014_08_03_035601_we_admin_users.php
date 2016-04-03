<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class WeAdminUsers extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('weadminusers', function($table){
			$table->increments('id');
			$table->string('email',100);
			$table->string('password',60);
			$table->string('activate_code',60);
			$table->boolean('active');
			$table->text('remember_token')->nullable();
			//Timestamps will create 'created_at' and 'updated_at' columns
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		//
	}

}
