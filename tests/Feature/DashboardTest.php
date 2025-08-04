<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $response = $this->get('/dashboard');
    
    $response->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('dashboard')
                ->has('stats')
                ->has('recentSales')
                ->has('lowStockAlerts')
            );
});