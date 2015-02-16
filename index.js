var clone = require('clone');

var schema = {
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

var data = [
    'a string',
    {
        bar: {
            thing: 'another string',
            stuff: 'some stuff'
        }
    }
];

function arrayValidation(data, schema){
    var length = schema.maxItems || schema.items.length;

    while(data.length > length){
        data.pop();
    }

    for (var i = 0; i < data.length; i++) {
        process(data[i], schema.items[i]);
    }
}

function objectValidation(data, schema){
    for(var key in data){
        if(schema.additionalProperties === false && !(key in schema.properties)){
            delete data[key];
        } else {
            process(data[key], schema.properties[key]);
        }
    }
}

function process(data, schema){
    if(data.type === 'array'){
        return arrayValidation(data, schema);
    }

    if(data.type === 'object'){
        return objectValidation(data, schema);
    }

    return data;
}

module.exports = function(data, schema, callback){
    var result = clone(data);

    callback(null, process(result, schema));
};

