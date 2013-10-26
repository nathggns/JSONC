JSONC
=====

JSON with cyclic structures

## What is JSONC?

JSONC is an extension to the JSON spec that adds support for "cyclic" structures. These are structures that reference parts of themselves, creating an infinitely deep structure. Obviously we can't create a direct string-based representation of these structures, but we can get around this in some ways. 


## How do we solve this problem?

JSON currently supports booleans, strings, objects, numbers and arrays. We'll add a new type to this, which we'll call references. References look like this in JSONC - `("key")`. Inside the quote marks, we put a path to find the target of the reference from the root of the structure. For example, say we had this structure in Javascript.

```ks
var obj = {
    a: {
        b: {
            c: 'd'
        }
    }
};

obj.a.b.e = obj.a.b;
```

This would compile to this in JSONC

```
{
    "a": {
        "b": {
            "c": "d",
            "e": ("a.b")
        }
    }
}
```

## Requirements

JSONC could theoretically be supported in any language that supports pointers or references, such as `Javascript` or `PHP`. I'll try to write a parser and a compiler for as many languages as possible, but feel free to write one yourself if you don't see one in this repository. 