const fetchUrl = 'https://share.chemi.ren';

const billTimeUnit = 30;
const billFreeTimeUnit = 15;

const hideIdentityCard = identityCard  => {
	let identityCardStr=identityCard;
	let midentityCard = identityCardStr && identityCardStr.length > 15? identityCardStr.substring(0, 3) + ' **** **** **** ' + identityCardStr.substring(15) : '' ;
	return midentityCard;
}

module.exports = {
	hideIdentityCard
};

