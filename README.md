# schimitar

Naive schema cutter

## WAT

    Will take data, and a Json Schema definition, and will attempt to remove unwanted properties/items from the data.

    Any major issues will result in a very invalid object.

    The intention is for very light clientside sanitisation of objects, not validation.

## Usage

    var schimitar = require('schimitar');

    cutDownData = schimitar(data, schema);

