var test = require('tape'),
    schimitar = require('../'),
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
            },
            {
                type: 'object',
                additionalProperties: false,
                properties: {
                    foo: {
                        type: 'object'
                    }
                }
            }
        ],
        minItems: 2,
        maxItems: 3
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

    t.deepEqual(schimitar(data, testSchema), data, 'got correct result');
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

    t.deepEqual(schimitar(data, testSchema), expectedResult, 'got correct result');
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
            'majigger',
            'Bazinga'
        ],
        expectedResult = [
            'a string',
            {
                bar: {
                    thing: 'another string'
                }
            },
            'majigger'
        ];

    t.deepEqual(schimitar(data, testSchema), expectedResult, 'got correct result');
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

    t.deepEqual(schimitar(data, testSchema), expectedResult, 'got correct result');
});

test('Completely wrong data', function(t){
    t.plan(1);

    var data = {
            'notAtAll': 'what we expected'
        },
        expectedResult = {
            'notAtAll': 'what we expected'
        };

    t.deepEqual(schimitar(data, testSchema), expectedResult, 'got correct result');
});

test('max items', function(t){
    t.plan(1);

    var data = ['foo'],
        expectedResult = [];

    t.deepEqual(schimitar(data, {
        type: 'array',
        maxItems: 0
    }), expectedResult, 'got correct result');
});

test('allows non determined props', function(t){
    t.plan(1);

    var data = [
            'a string',
            {},
            {
                foo: {
                    bar: {
                        things: 'stuff'
                    }
                }
            }
        ];

    t.deepEqual(schimitar(data, testSchema), data, 'got correct result');
});

test('works with arrays with single object item', function(t){
    t.plan(1);

    var data = [
            {
                foo: 'bar'
            },
            {
                foo: 'bar',
                things: 'stuff'
            },
            {
                foo: {
                    bar: {
                        things: 'stuff'
                    }
                }
            }
        ],
        testSchema = {
            type: 'array',
            items: {
                type: 'object',
                additionalProperties: false,
                properties: {
                    foo: {
                        type: 'string'
                    }
                }
            },
            maxItems: 2
        };

    t.deepEqual(schimitar(data, testSchema), [{foo:'bar'},{foo:'bar'}], 'got correct result');
});