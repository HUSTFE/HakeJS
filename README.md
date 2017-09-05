# HakeJS

<img src="http://39.108.79.219/wp-content/uploads/2017/09/Hakejs-768x384.png" style="width:200px" />

> Unfinished by Dominic Ming

- [HakeJS](#hakejs)
  * [What is HakeJS](#what-is-hakejs)
  * [HakeJS feature](#hakejs-featuacre)
  * [About Hake](#about-hake)
  * [HakeJS Doc](#hakejs-doc)
    + [Hake](#hake)
    + [Hake.dom](#hakedom)
    + [Hake.event](#hakeevent)
    + [Hake.observe](#hakeobserve)
    + [Hake.parse](#hakeparse)
    + [Hake.data](#hakedata)
  * [About abolished](#about-abolished)

## What is HakeJS
HakeJS is a modern web library with simple data bind and component.

Just build it for fun, so it may not have such thing like efficiency, stability or anything you heard to describe a mainstream framework.

## HakeJS feature

- You can use Hake lang to write template.
	It look like this;
    ```
    (div(a{href="sss"} {{somedata}} www))
    ```
	And it will turn out like this.
	```HTML
	<div><a href="sss">somedata www</a></div>
	```

- Nearly every function can be use.

    You can directly use part of the function as a tool instead of use whole Hake.

- Shadow DOM(TODO)

    I will write Shadow DOM Mode for who want use it in new browser.

- Virtual DOM(TODO)

    It will come back, only wait for some time.

## About Hake
There is some library I write also using Hake as a identify, but it's fine to use them separately.

## HakeJS Doc
### Hake
> Main instance of whole hakejs

First of all, you should have at least one.
```JavaScript
var hakejs = new Hake();
//when ES6
const hakejs = new Hake();
```

### Hake.dom

#### getOne(selector) ⇒ <code>Element</code>
document.querySelector shortcut

**Kind**: global function

| Param | Type |
| --- | --- |
| selector | <code>string</code> |

#### getAll(selector) ⇒ <code>NodeList</code>
document.querySelectorAll shortcut

| Param | Type |
| --- | --- |
| selector | <code>string</code> |

#### getAttr(el, name) ⇒ <code>string</code>
getAttribute shortcut

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> |
| name | <code>string</code> |

#### getAttrs(el) ⇒ <code>object</code>
return all attribute in element in a object

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> |

#### addClass(el, className) ⇒ <code>\*</code> \| <code>string</code>
Add class on element.

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> |
| className | <code>string</code> |


#### removeClass(el, className) ⇒ <code>\*</code> \| <code>string</code>
Remove class on element.

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> |
| className | <code>string</code> |

#### toggleClass(el, className) ⇒ <code>\*</code>
Toggle class on element.

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> |
| className | <code>string</code> |

### Hake.event
#### eventpool : <code>object</code>
A pool to store event that not native

<a name="addEvent"></a>

#### addEvent(event, callback, target)
Add event to anything (some just fake event)

| Param | Type |
| --- | --- |
| event | <code>string</code> |
| callback | <code>function</code> |
| target | <code>\*</code> |

#### trigEvent(event, target)
Run a event on target (fake events don't care target)

| Param | Type |
| --- | --- |
| event | <code>string</code> |
| target | <code>\*</code> |

#### removeEvent(event, callback, target)
Remove event on anything (fake events don't care target and callback)

| Param | Type |
| --- | --- |
| event | <code>string</code> |
| callback | <code>function</code> |
| target | <code>\*</code> |

### Hake.observe

#### new OArray(callback, top)
Observable array, not the real one.

| Param | Type |
| --- | --- |
| callback | <code>function</code> |
| top | <code>string</code> |

#### object(obj, callback, top) ⇒ [<code>object</code>](#object)
Observe Object with call back, and only return top level key

| Param | Type |
| --- | --- |
| obj | [<code>object</code>](#object) |
| callback | <code>function</code> |
| top | <code>string</code> |

#### key(obj, key, callback) ⇒ <code>\*</code>
Only observe special key change, not care about its children.

| Param | Type |
| --- | --- |
| obj | [<code>object</code>](#object) |
| key | [<code>string</code>](#string) |
| callback | <code>function</code> |

#### btw(val, a, b) ⇒ <code>boolean</code>
Return if a <= val < b .

| Param | Type |
| --- | --- |
| val | <code>number</code> |
| a | <code>number</code> |
| b | <code>number</code> |

#### array(arr, callback, top) ⇒ [<code>OArray</code>](#OArray)
Observe array with call back, and only return top level key.

| Param | Type |
| --- | --- |
| arr | [<code>array</code>](#array) |
| callback | <code>function</code> |
| top | <code>string</code> |

### Hake.parse

#### new DataBlock(str)
DataBlock contain origin data, generator and related variable

| Param | Type |
| --- | --- |
| str | <code>string</code> |

#### parseDOM(str) ⇒ <code>HTMLElement</code>
Use browser native api to parse HTML, Lazy Easy DOM parser.

| Param | Type |
| --- | --- |
| str | <code>string</code> |

#### readTag(startIndex, str) ⇒ <code>Object</code> \| <code>boolean</code>
Read tag name and return it with a char after it

| Param | Type |
| --- | --- |
| startIndex | <code>number</code> |
| str | <code>string</code> |

#### parseHake(str) ⇒ <code>HTMLElement</code>
Parse Hake string and return HTMLElement.

| Param | Type |
| --- | --- |
| str | <code>string</code> |

#### parseData(str) ⇒ <code>Array</code>
Parse data string contain '{{...}}' and slice it into a string

| Param | Type |
| --- | --- |
| str | <code>string</code> |

### Hake.data
#### dataHash(str) ⇒ <code>string</code>
Hash a string to a code.

| Param | Type |
| --- | --- |
| str | <code>string</code> |

#### hasData(str) ⇒ <code>boolean</code>
If string contain {{}}

| Param | Type |
| --- | --- |
| str | <code>string</code> |

#### dataSearch(el) ⇒ <code>Array</code>
Search data bind in element, return a array with data info.

| Param | Type |
| --- | --- |
| el | <code>HTMLElement</code> |

#### dataBind(sArr, data) ⇒ <code>object</code>
Use dataSearch result to bind a data object, return a related map.

| Param | Type |
| --- | --- |
| sArr | <code>array</code> |
| data | <code>object</code> |

#### dataObserve(data, el) ⇒ <code>Object</code>
Observing data from a element

| Param | Type |
| --- | --- |
| data | <code>object</code> |
| el | <code>HTMLElement</code> |

#### dataDiff(oldData, newData, res)
diff the old data and new data to return difference array

| Param | Type |
| --- | --- |
| oldData | <code>object</code> |
| newData | <code>object</code> |
| res | <code>array</code> |


## About abolished

- It's a mistake to write that code, "I don't know her."
