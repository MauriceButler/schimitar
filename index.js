var JaySchema = require('jayschema'),
    jayschema = new JaySchema(),
    clone = require('clone'),
    contextBaseRegex = /#\//;

function getBase(target, keyArray){
    var base;

    for (var i = 0; i < keyArray.length; i++) {
        if(base){
            base = base[keyArray[i]];
        } else {
            base = target[keyArray[i]];
        }
    }

    return base;
}

function fix(data, schema, callback){
    var result = clone(data);

    jayschema.validate(data, schema, function(validationErrors){
            var cantFix = [];

            if(validationErrors){
                for (var i = 0; i < validationErrors.length; i++) {
                    if(validationErrors[i].constraintName === 'additionalProperties'){
                        var contextParts = validationErrors[i].instanceContext.replace(contextBaseRegex, '').split('/');
                        delete getBase(result, contextParts)[validationErrors[i].testedValue];
                    } else {
                        cantFix.push(validationErrors[i]);
                    }
                }
            }

            callback(cantFix.length ? cantFix : null, result);
        }
    );
}


module.exports = fix;

