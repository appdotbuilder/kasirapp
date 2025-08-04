<?php

arch()->preset()->laravel();

// Models should have proper PHPDoc annotations
test('models have proper annotations')
    ->expect('App\Models')
    ->toHavePropertiesDocumented();

// Controllers should only use standard REST methods
test('controllers only use standard rest methods')
    ->expect('App\Http\Controllers')
    ->classes()
    ->not()->toHaveMethod(['increment', 'decrement', 'custom', 'report'])
    ->ignoring('App\Http\Controllers\Auth')
    ->ignoring('App\Http\Controllers\Controller')
    ->ignoring('App\Http\Controllers\ReportController'); // ReportController is allowed to have custom methods