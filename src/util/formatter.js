export function formatDate(datatime){
	let yy = datatime.getFullYear();
	let mm = datatime.getMonth() > 9 ? datatime.getMonth() : datatime.getMonth() + 1;
	let dd = datatime.getDate() > 9 ? datatime.getDate() : datatime.getDate() + 1;
	return `${yy}年${mm}月${dd}日`;
}