const m = require('../index');

const areas = document.querySelectorAll('textarea');

const yo = () => {
	const v = areas[0].value;

	areas[1].value = m.trim(v);
	areas[2].value = JSON.stringify(m.parse(v), null, '\t');

	requestAnimationFrame(yo);
};

yo();