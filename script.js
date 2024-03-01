const ms = {
	h: 3600000, // hour
	d: 86400000, // day
	w: 604800000 // week
};

const increaseDate = (date, value) => new Date(date.valueOf() + value); // increase date by value
const decreaseDate = (date, value) => new Date(date.valueOf() - value); // decrease date by value

document.addEventListener('DOMContentLoaded', function() {
	const [now, startingMilestone] = [
		new Date(),
		new Date(2023, 11, 31, 7)
	];
	const fixedNow = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate(),
		7
	);
	const weekDay = ['Chủ Nhật', 'thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy'];
	const nowDoW = fixedNow.getDay(); // day of week
	const thisSunday = decreaseDate(fixedNow, ms.d * nowDoW);
	const lastSunday = decreaseDate(thisSunday, ms.w);
	const nextSunday = increaseDate(thisSunday, ms.w);
	const arrayOfSunday = [lastSunday, thisSunday, nextSunday];

	function formatDisplayText(date) {
		const sinceStartingMilestone = date.valueOf() - startingMilestone.valueOf();
		const weekPassed = Math.floor(sinceStartingMilestone.valueOf() / ms.w);
		const weekstart = increaseDate(date, ms.d);
		const weekend = increaseDate(date, ms.w);
		const [weekstartString, weekendString] = [
			weekstart,
			weekend
		].map((date) => date.toLocaleDateString('vi-VN'));
		return `Tuần từ ${weekstartString} đến ${weekendString} là tuần ${weekPassed % 2 ? 'lẻ' : 'chẵn'}`;
	};
	const content = [`Hôm nay là ${weekDay[nowDoW]} ${fixedNow.toLocaleDateString('vi-VN', { timezone: 'Asia/Jarkata' })}`, ...arrayOfSunday.map((sunday) => formatDisplayText(sunday))].join('\n');

	document.getElementById('result').innerText = content;
});
