<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RecruitersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('recruiters', function($table){
			$table->increments('id');
			$table->string('email', 255);
			$table->integer('company_id');
			$table->string('firstname', 255)->nullable();
			$table->string('lastname', 255)->nullable();
			$table->string('telephone', 255)->nullable();
			$table->string('wenotes', 500)->nullable();
			$table->boolean('active');
			$table->string('created_by');
			$table->string('updated_by')->nullable();
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
