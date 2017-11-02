# schimitar

Naive schema cutter


## WAT

Will take data, and a Json Schema definition, and will attempt to remove unwanted properties/items from the data.

Any major issues will result in a very invalid object.

The intention is for very light sanitisation of objects, not validation.


## Usage

``` javascript
    var schimitar = require('schimitar');

    var cutDownData = schimitar(data, schema);
```
