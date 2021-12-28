export function haddenIdCard( idCard ) {
    return idCard?idCard.replace(/^(.{4})(?:\d+)(.{4})$/,"$1******$2"):idCard;
}
export function haddenPhone( phone ) {
    return phone?phone.replace(/^(.{3})(?:\d+)(.{2})$/,"$1******$2"):phone;
}
export function getdate(date) {
    var date = new Date(date);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
