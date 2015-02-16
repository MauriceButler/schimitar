# schimitar

Naive schema cutter

## WAT

    Will take data, validate it against a JaySchema schema and try to fix what it can

    If it fixes everything it will return no errors and the valid data

    If it is unable to fix everything you will be returned the remaining JaySchema Errors and the data as fixed as possible.

## Usage

    var schimitar = require('schimitar');

    schimitar(data, schema, function(error, result){

        // winning
    });

