const _ = require('lodash');

const separator = new RegExp(
	_.join(
		_.concat([
			'❤️',
			'♥︎',
			'💕',
			'♪',
			'！',
			'？',
			'、',
			'…',
			'。',
		], _.map([
			'o(^▽^)o',
			'⊂((・x・))⊃',
			'(OvO)',
			'(*^^*)',
			'＼(^o^)／',
			'(o^^o)',
			'(((o(*ﾟ▽ﾟ*)o)))',
			'(=ﾟωﾟ)ﾉ',
			'∑(ﾟДﾟ)',
			'(・ω・)',
			'( ；´Д｀)',
			'(Ｔ＿Ｔ)',
			'(*^o^*)',
			'( ´θ｀)ノ',
			'∧( \'Θ\' )∧',
			'((((；ﾟДﾟ)))))))',
			'( ´ ▽ ` )ﾉ',
			'*\\(^o^)/*',
			'|∀・)',
			'(^^)',
			'(*_*)',
			'\\(｀ω´ )/',
			'(♯｀∧´)',
			'(*^_^*)',
			'(　ﾟдﾟ)',
			'Σ（ﾟдﾟlll',
			'( ^ω^ )',
			'>_<',
			'♪───Ｏ（≧∇≦）Ｏ────♪',
			'( *｀ω´)',
			'\\(｀ω´ )/',
			'(*ﾟ▽ﾟ*)'
		], (a) => a.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))), '|')
);

const m = {
	/**
	 * Trim RT, URL, Hashtag, and so on.
	 * @param {String} text
	 * @returns {String}
	 */
	trim: (text) => {
		// escape
		text = text.replace(/\n/g, '\\n');
		// remove "RT @..."
		const m0 = text.match(/RT @/);
		if (m0) { text = text.substring(0, m0.index); }
		// remove "QT @..."
		const m1 = text.match(/QT @/);
		if (m1) { text = text.substring(0, m1.index); }
		// remove URL　"http://t.co/..."
		text = text.replace(/http(s)?:\/\/t.co\/\w+/g, '');
		// remove q “@...”
		text = text.replace(/“@(.+)”/, '');
		// remove "#..."
		text = text.replace(/#\w+/, '');
		// remove "“@..."
		const m2 = text.match(/“@.+/, '');
		if (m2) { text = text.substring(0, m2.index); }
		text = text.replace(/\\n/g, '\n');
		// remove "【...】"
		text = text.replace(/【.+】/g, '');
		// remove "#..."
		text = text.replace(/#\S+/, '');
		// remove "RT url"
		text = text.replace(/RT\s?$/, '');

		text = text.replace(/\&gt;/g, '>');
		text = text.replace(/\&lt;/g, '<');
		text = text.replace(/&amp;/g, '&');

		return text.trim();
	},

	/**
	 * Parse a text by the special @mimori_suzuko separator.
	 * @param {String} text
	 * @returns {String[]}
	 */
	parse: (text) => {
		const results = [];
		_.forEach(_.split(text, '\n'), (line) => {
			const data = [];
			let index = 0;
			while (true) {
				const head = line.substring(0, index);
				const tail = line.substring(index);
				const m = tail.match(separator);
				if (!m) {
					const ttext = _.trim(line);
					if (_.includes(['♥️', '笑', '！'], ttext)) {
						const lastIndex = data.length - 1;
						data[lastIndex] += ttext;
					} else {
						data.push(ttext);
					}
					break;
				}
				let matchedIndex = m.index;
				const openBracketIndex = _.lastIndexOf(tail, '「', matchedIndex);
				const closeBracketIndex = _.indexOf(tail, '」', matchedIndex);
				const openRoundBracketIndex = _.lastIndexOf(tail, '(', matchedIndex);
				const closeRoundBracketIndex = _.indexOf(tail, ')', matchedIndex);
				if (openBracketIndex > -1 && openBracketIndex < matchedIndex - 1 && matchedIndex - 1 < closeBracketIndex) {
					index = closeBracketIndex + 1;
					continue;
				} else if (openRoundBracketIndex > -1 && openRoundBracketIndex < matchedIndex - 1 && matchedIndex - 1 < closeRoundBracketIndex) {
					index = closeRoundBracketIndex + 1;
					continue;
				}
				matchedIndex += m[0].length;
				const thead = tail.substring(0, matchedIndex);
				const ttail = tail.substring(matchedIndex);
				if (_.includes([m[0], '笑', '！', '♪───Ｏ（≧∇≦）Ｏ────♪'], tail)) {
					const lastIndex = data.length - 1;
					if (lastIndex === -1) {
						data.push(tail);
					} else {
						data[data.length - 1] += tail;
					}
					break;
				} else if (_.includes([m[0], '笑', '！'], thead)) {
					const lastIndex = data.length - 1;
					data[lastIndex] += thead;
				} else {
					const ttext = _.trim(head + thead);
					data.push(ttext);
				}
				line = ttail;
			}
			_.forEach(data, (a) => {
				const b = _.trim(a);
				if (b) { results.push(b); }
			});
		});
		return results;
	}
};

module.exports = m;
