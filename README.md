# m

Parsing [@mimori_suzuko](https://twitter.com/mimori_suzuko) tweet. Try it [here](https://mimorisuzuko.github.io/m/).

## Usage

```
npm i --save @mimorisuzuko/m
```

## Example

If `value` is...

```
入浴剤がないと基本的にお風呂浸かりたくない。
でも今日は中から昆布がたくさん出てきて、一瞬何かわからなくてギョっとしたわー…>_<…
```

as a result of `m.parse(value)` is 

```json
[
	"入浴剤がないと基本的にお風呂浸かりたくない。",
	"でも今日は中から昆布がたくさん出てきて、",
	"一瞬何かわからなくてギョっとしたわー…>_<…"
]
```

## API

### `m.trim(text: String)`

Trim RT, URL, Hashtag, and so on.

### `m.parse(text: String)`

Parse a text by the special @mimori_suzuko separator.