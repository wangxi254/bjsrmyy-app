const fetchUrl = 'https://share.chemi.ren';

const billTimeUnit = 30;
const billFreeTimeUnit = 15;

const hideIdentityCard = identityCard  => {
	let identityCardStr=identityCard;
	let midentityCard = identityCardStr && identityCardStr.length > 15? identityCardStr.substring(0, 3) + ' **** **** **** ' + identityCardStr.substring(15) : '' ;
	return midentityCard;
}

// 字符串转时间戳
const dealIOSTimeFormat = timestr  => {
	console.log("timestr===>",timestr);
	if(timestr && timestr.length > 0){
		let time = timestr.replace(/-/g,'/');
		return time;
	}else{
		return timestr;
	}
	
}

module.exports = {
	hideIdentityCard,
	dealIOSTimeFormat
};

