<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class InstitutionTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('institutions', function($table){
			$table->increments('id');
			$table->string('name', 100);
			$table->string('logoimg', 500)->nullable();
			$table->string('telephone', 100)->nullable();
			$table->string('fax', 100)->nullable();
			$table->string('email', 200)->nullable();
			$table->string('address', 300)->nullable();
			$table->string('postalcode', 20)->nullable();
			$table->string('country', 3);
			$table->string('comment', 1000)->nullable();
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
