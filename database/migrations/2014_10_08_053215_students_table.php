<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class StudentsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('students', function($table){
			$table->increments('id');
			$table->string('email');
			$table->string('firstname');
			$table->string('lastname');
			$table->string('password', 60)->nullable();
			$table->enum('gender', array('male', 'female', 'unspecified'));
			$table->date('dob');
			$table->string('country', 255);

			$table->string('address', 255)->nullable();
			$table->string('postalcode', 20)->nullable();
			$table->string('telephone', 60)->nullable();
			$table->string('applicant_summary', 1000)->nullable();
			$table->string('profileimg', 300)->nullable();
			
			$table->timestamp('last_login')->default('0000-00-00 00:00:00')->nullable();
			$table->boolean('active');
			$table->string('wenotes', 500)->nullable();
			$table->string('activate_code', 60)->nullable();
			$table->text('remember_token')->nullable();
			$table->string('forgotpsswd_code')->nullable();
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
