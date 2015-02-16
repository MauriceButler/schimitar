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
                    },
                    baz:{
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        maxItems: 2
                    }
                }
            }
        ],
        minItems: 2,
        maxItems: 2
    };


test('Doesn\'t mess with stuff if OK', function(t){
    t.plan(1);

    var data = [
            'a string',
            {
                bar: {
                    thing: 'another string'
                }
            }
        ];

    t.deepEqual(fix(data, testSchema), data, 'got correct result');
});

test('deletes additional props', function(t){
    t.plan(1);

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

    t.deepEqual(fix(data, testSchema), expectedResult, 'got correct result');
});


test('deletes additional items', function(t){
    t.plan(1);

    var data = [
            'a string',
            {
                bar: {
                    thing: 'another string'
                }
            },
            'Bazinga'
        ],
        expectedResult = [
            'a string',
            {
                bar: {
                    thing: 'another string'
                }
            }
        ];

    t.deepEqual(fix(data, testSchema), expectedResult, 'got correct result');
});

test('deletes additional items single type', function(t){
    t.plan(1);

    var data = [
            'a string',
            {
                baz: ['foo', 'bar', 'baz']
            }
        ],
        expectedResult = [
            'a string',
            {
                baz: ['foo', 'bar']
            }
        ];

    t.deepEqual(fix(data, testSchema), expectedResult, 'got correct result');
});

test('Completely wrong data', function(t){
    t.plan(1);

    var data = {
            'notAtAll': 'what we expected'
        },
        expectedResult = {
            'notAtAll': 'what we expected'
        };

    t.deepEqual(fix(data, testSchema), expectedResult, 'got correct result');
});