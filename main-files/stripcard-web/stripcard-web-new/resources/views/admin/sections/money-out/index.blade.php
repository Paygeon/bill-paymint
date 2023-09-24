@extends('admin.layouts.master')

@push('css')

@endpush

@section('page-title')
    @include('admin.components.page-title',['title' => __($page_title)])
@endsection

@section('breadcrumb')
    @include('admin.components.breadcrumb',['breadcrumbs' => [
        [
            'name'  => __("Dashboard"),
            'url'   => setRoute("admin.dashboard"),
        ]
    ], 'active' => __("Money Out Logs")])
@endsection

@section('content')
    <div class="table-area">
        <div class="table-wrapper">
            <div class="table-header">
                <h5 class="title">All Logs</h5>
            </div>
            <div class="table-responsive">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Phone</th>
                            <th>Amount</th>
                            <th>Method</th>
                            <th>Status</th>
                            <th>Time</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ul class="user-list">
                                    <li><img src="assets/images/user/user-1.jpg" alt="user"></li>
                                </ul>
                            </td>
                            <td><span>Sean Black</span></td>
                            <td>sean@gmail.com</td>
                            <td>sean</td>
                            <td>123-456(008)90</td>
                            <td>5.00</td>
                            <td><span class="text--info">Stripe</span></td>
                            <td><span class="badge badge--warning">Pending</span></td>
                            <td>2022-05-30 03:46 PM</td>
                            <td>
                                <button type="button" class="btn btn--base bg--success"><i class="las la-check-circle"></i></button>
                                <button type="button" class="btn btn--base bg--danger"><i class="las la-times-circle"></i></button>
                                <a href="out-logs-edit.html" class="btn btn--base"><i class="las la-expand"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ul class="user-list">
                                    <li><img src="assets/images/user/user-2.jpg" alt="user"></li>
                                </ul>
                            </td>
                            <td><span>Merri Diamond</span></td>
                            <td>merri@gmail.com</td>
                            <td>merri</td>
                            <td>123-456(008)90</td>
                            <td>5.00</td>
                            <td><span class="text--info">Paypal</span></td>
                            <td><span class="badge badge--success">Completed</span></td>
                            <td>2022-05-30 03:46 PM</td>
                            <td>
                                <button type="button" class="btn btn--base bg--success"><i class="las la-check-circle"></i></button>
                                <button type="button" class="btn btn--base bg--danger"><i class="las la-times-circle"></i></button>
                                <a href="out-logs-edit.html" class="btn btn--base"><i class="las la-expand"></i></a>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <ul class="user-list">
                                    <li><img src="assets/images/user/user-3.jpg" alt="user"></li>
                                </ul>
                            </td>
                            <td><span>Sean Black</span></td>
                            <td>sean@gmail.com</td>
                            <td>sean</td>
                            <td>123-456(008)90</td>
                            <td>5.00</td>
                            <td><span class="text--info">Razorpay</span></td>
                            <td><span class="badge badge--danger">Canceled</span></td>
                            <td>2022-05-30 03:46 PM</td>
                            <td>
                                <button type="button" class="btn btn--base bg--success"><i class="las la-check-circle"></i></button>
                                <button type="button" class="btn btn--base bg--danger"><i class="las la-times-circle"></i></button>
                                <a href="out-logs-edit.html" class="btn btn--base"><i class="las la-expand"></i></a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
@endsection

@push('script')
    
@endpush