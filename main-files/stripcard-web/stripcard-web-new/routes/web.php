<?php

use App\Http\Controllers\SiteController;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;
use Stripe\Stripe;
use Stripe\Issuing\Card;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//landing page
Route::controller(SiteController::class)->group(function(){
    Route::get('/','home')->name('index');
    Route::get('about','about')->name('about');
    Route::get('services','services')->name('services');
    Route::get('announcement','blog')->name('announcement');
    Route::get('announcement/details/{id}/{slug}','blogDetails')->name('blog.details');
    Route::get('announcement/by/category/{id}/{slug}','blogByCategory')->name('blog.by.category');
    Route::get('contact','contact')->name('contact');
    Route::post('contact/store','contactStore')->name('contact.store');
    Route::get('change/{lang?}','changeLanguage')->name('lang');
    Route::get('page/{slug}','usefulPage')->name('useful.link');
    Route::get('cookie/accept','cookieAccept')->name('cookie.accept');
    Route::get('cookie/decline','cookieDecline')->name('cookie.decline');
});

