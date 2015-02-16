var clone = require('clone');

function arrayValidation(data, schema){
    var length = schema.maxItems || schema.items.length;

    if(!Array.isArray(data)){
        return data;
    }

    while(data.length > length){
        data.pop();
    }

    for (var i = 0; i < data.length; i++) {
        process(data[i], schema.items[i]);
    }
}

function objectValidation(data, schema){
    if(!data || typeof data !== 'object'){
        return data;
    }

    for(var key in data){
        if(schema.additionalProperties === false && !(key in schema.properties)){
            delete data[key];
        } else {
            process(data[key], schema.properties[key]);
        }
    }
}

function process(data, schema){
    if(schema.type === 'array'){
        arrayValidation(data, schema);
    }else if(schema.type === 'object'){
        objectValidation(data, schema);
    }

    return data;
}

module.exports = function(data, schema){
    return process(clone(data), schema);
};
