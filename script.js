const ms = {
	h: 3600000, // hour
	d: 86400000, // day
	w: 604800000 // week
}

const incDate = (date, value) => new Date(date.valueOf() + value); // increase date by value
const decDate = (date, value) => new Date(date.valueOf() - value); // decrease date by value
const vnTimezone = (date) => incDate(date, ms.h * 7); // increase date by 7 hours
const msWeek = (date) => Math.floor(date.valueOf() / ms.w);

document.addEventListener('DOMContentLoaded', function() {
	const [now, milestone] = [
		new Date(),
		new Date(2023, 11, 31)
	].map(date => vnTimezone(date));
	const doW = now.getDay();
	const sunday = decDate(now, ms.d * doW);
	const [lastSun, nextSun] = [
		decDate(sunday, ms.w),
		incDate(sunday, ms.w)
	];
	function formatDisplayText(date) {
		const sinceMilestone = date.valueOf() - milestone.valueOf();
		const oddEven = Boolean(msWeek(sinceMilestone) % 2);
		const monday = incDate(date, ms.d).toLocaleDateString('vi-VN');
		return `Thứ hai ${monday} tuần ${oddEven ? 'lẻ' : 'chẵn'}`;
	}
	document.getElementById('result').innerText = [lastSun, sunday, nextSun].map(formatDisplayText).join('\n');
})
