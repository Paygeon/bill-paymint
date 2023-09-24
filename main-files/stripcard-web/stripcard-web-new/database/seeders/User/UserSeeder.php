<?php

namespace Database\Seeders\User;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $data = [
            array('firstname' => 'Test','lastname' => 'User','username' => 'appdevs','email' => 'user@appdevs.net','mobile_code' => '1','mobile' => '18008675309','full_mobile' => '118008675309','password' => '$2y$10$mvk4/5Hhy5qp4pWoG6XAUuYA6cbooLrodTWWGpQQLK5XXLc/cs/2G','refferal_user_id' => NULL,'image' => NULL,'status' => '1','address' => '{"country":"United States","state":"CA","city":"San Francisco","zip":"94111","address":"123 Main Street"}','email_verified' => '1','sms_verified' => '1','kyc_verified' => '1','ver_code' => NULL,'ver_code_send_at' => NULL,'two_factor_verified' => '0','device_id' => NULL,'email_verified_at' => NULL,'remember_token' => NULL,'deleted_at' => NULL,'created_at' => '2023-08-27 16:43:35','updated_at' => '2023-08-27 16:47:44','stripe_card_holders' => '{"id":"ich_1NjgZaK6kUt0AggqgHVTdzkv","object":"issuing.cardholder","billing":{"address":{"city":"San Francisco","country":"US","line1":"123 Main Street","line2":null,"postal_code":"94111","state":"CA"}},"company":null,"created":1693133522,"email":"user@appdevs.net","individual":{"card_issuing":{"user_terms_acceptance":{"date":1693133522,"ip":"::1","user_agent":"Mozilla\/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit\/537.36 (KHTML, like Gecko) Chrome\/116.0.0.0 Safari\/537.36"}},"dob":{"day":1,"month":11,"year":1981},"first_name":"Test","last_name":"User","verification":{"document":{"back":null,"front":null}}},"livemode":false,"metadata":{"celtic_bank_authorized_user_terms":"1","terms_and_privacy_agreement":"1"},"name":"Test User","phone_number":"+18008675309","preferred_locales":[],"requirements":{"disabled_reason":"under_review","past_due":[]},"spending_controls":{"allowed_categories":[],"blocked_categories":[],"spending_limits":[],"spending_limits_currency":null},"status":"active","type":"individual"}'),
            array('firstname' => 'Test','lastname' => 'User2','username' => 'testusr2','email' => 'user2@appdevs.net','mobile_code' => '880','mobile' => '123456781','full_mobile' => '880123456781','password' => '$2y$10$Xw0gOJiUzMACjNhmSvFe0uecCDrnCXww/r.7jTH6974wmf8gDyOiy','refferal_user_id' => NULL,'image' => NULL,'status' => '1','address' => '{"country":"Bangladesh","city":"Dhaka","zip":"1230","state":"Bangladesh","address":"Dhaka,Bangladesh"}','email_verified' => '1','sms_verified' => '1','kyc_verified' => '1','ver_code' => NULL,'ver_code_send_at' => NULL,'two_factor_verified' => '0','device_id' => NULL,'email_verified_at' => NULL,'remember_token' => NULL,'deleted_at' => NULL,'created_at' => '2023-08-27 16:43:35','updated_at' => '2023-08-27 16:43:35','stripe_card_holders' => NULL)
        ];

        User::insert($data);
    }
}
