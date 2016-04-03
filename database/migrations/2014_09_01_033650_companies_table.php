<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CompaniesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('companies', function($table){
			$table->increments('id');
			$table->string('name', 255);
			$table->string('address', 255)->nullable();
			$table->string('postalcode', 20)->nullable();
			$table->string('country', 255)->nullable();
			$table->string('description', 255)->nullable();
			$table->string('bannerimg', 300)->nullable();
			$table->string('logoimg', 300)->nullable();
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
