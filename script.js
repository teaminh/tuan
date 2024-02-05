const ms = {
	h: 3600000, // hour
	d: 86400000, // day
	w: 604800000 // week
};

const increaseDate = (date, value) => new Date(date.valueOf() + value); // increase date by value
const decreaseDate = (date, value) => new Date(date.valueOf() - value); // decrease date by value
const toVNTimezone = (date) => increaseDate(date, ms.h * 7); // increase date by 7 hours
const msToWeek = (date) => Math.floor(date.valueOf() / ms.w);

document.addEventListener('DOMContentLoaded', function() {
	const [now, startingMilestone] = [
		new Date(),
		new Date(2023, 11, 31)
	].map((date) => toVNTimezone(date));
	const nowDoW = now.getDay(); // day of week
	const thisSunday = decreaseDate(now, ms.d * nowDoW);
	const lastSunday = decreaseDate(thisSunday, ms.w);
	const nextSunday = increaseDate(thisSunday, ms.w);
	const arrayOfSunday = [lastSunday, thisSunday, nextSunday];

	function formatDisplayText(date) {
		const sinceStartingMilestone = date.valueOf() - startingMilestone.valueOf();
		const weekPassed = msToWeek(sinceStartingMilestone);
		const weekstart = increaseDate(date, ms.d);
		const weekend = increaseDate(date, ms.w);
		const [weekstartString, weekendString] = [
			weekstart,
			weekend
		].map((date) => date.toLocaleDateString('vi-VN'));
		return `Tuần từ ${weekstartString} đến ${weekendString} là tuần ${weekPassed % 2 ? 'lẻ' : 'chẵn'}`;
	};
	const content = arrayOfSunday.map((sunday) => formatDisplayText(sunday)).join('\n');

	document.getElementById('result').innerText = content;
});
