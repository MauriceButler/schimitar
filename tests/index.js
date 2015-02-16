var test = require('tape'),
    fix = require('../'),
    testSchema = {
        type: 'array',
        items: [
            {
                type: 'string'
            },
            {
                type: 'object',
                additionalProperties: false,
                properties: {
                    bar: {
                        type: 'object',
                        additionalProperties: false,
                        properties: {
                            thing: {
                                type:'string'
                            }
                        }
                    }
                }
            }
        ],
        minItems: 2,
        maxItems: 2
    };


test('Doesn\'t mess with stuff if OK', function(t){
    t.plan(2);

    var data = [
            'a string',
            {
                bar: {
                    thing: 'another string'
                }
            }
        ];

    fix(data, testSchema, function(error, result){
        t.notOk(error, 'no error');
        t.deepEqual(result, data, 'got correct result');
    });
});

test('deletes additional props', function(t){
    t.plan(2);

    var data = [
            'a string',
            {
                bar: {
                    thing: 'another string',
                    stuff: 'some stuff'
                }
            }
        ],
        expectedResult = [
            'a string',
            {
                bar: {
                    thing: 'another string'
                }
            }
        ];

    fix(data, testSchema, function(error, result){
        t.notOk(error, 'no error');
        t.deepEqual(result, expectedResult, 'got correct result');
    });
});

test('returns additional errors', function(t){
    t.plan(2);

    var data = [
            123,
            {
                bar: {
                    thing: 'another string'
                }
            }
        ],
        expectedError = [
            {
                constraintName: 'type',
                constraintValue: 'string',
                instanceContext: '#/0',
                resolutionScope: 'anon-schema://d0282df19787a42c749164ea965c5f9bab0e6784/#/items/0',
                testedValue: 'integer'
            }
        ];

    fix(data, testSchema, function(error, result){
        t.deepEqual(error, expectedError, 'additional errors returned');
        t.deepEqual(result, data, 'got correct result');
    });
});

test('returns additional errors', function(t){
    t.plan(2);

    var data = [
            123,
            {
                bar: {
                    thing: 'another string',
                    stuff: 'some stuff'
                }
            }
        ],
        expectedError = [
            {
                constraintName: 'type',
                constraintValue: 'string',
                instanceContext: '#/0',
                resolutionScope: 'anon-schema://d0282df19787a42c749164ea965c5f9bab0e6784/#/items/0',
                testedValue: 'integer'
            }
        ],
        expectedResult = [
            123,
            {
                bar: {
                    thing: 'another string'
                }
            }
        ];

    fix(data, testSchema, function(error, result){
        t.deepEqual(error, expectedError, 'additional errors returned');
        t.deepEqual(result, expectedResult, 'got correct result');
    });
});