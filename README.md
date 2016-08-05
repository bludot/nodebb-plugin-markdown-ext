Markdown extended
=================

Allows the creation of own codes for markdown using RegExp.

ex:

| text written in composer:       | Result:                                    |
| :-----------------------------: | :----------------------------------------: |
| `[color="red"]red text[/color]` | `<span style="color:red;">red text</span>` |
| `[ ]`                           | `<input type="checkbox" />`                |
| `[x]`                           | `<input type="checkbox" checked="true" />` |


| RegExp:                             | Replacement text:                          |
| :---------------------------------: | :----------------------------------------: |
| `\[color="(.+?)"\](.+?)\[\/color\]` | `<span style="color:$1;">$2</span>`        |
| `[\ ]`                              | `<input type="checkbox" />`                |
| `[x]`                               | `<input type="checkbox" checked="true" />` |


Installation
------------

`npm install nodebb-plugin-markdown-ext`
