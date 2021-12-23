export function haddenIdCard( idCard ) {
    return idCard?idCard.replace(/^(.{4})(?:\d+)(.{4})$/,"$1******$2"):idCard;
}
export function haddenPhone( phone ) {
    return phone?phone.replace(/^(.{3})(?:\d+)(.{2})$/,"$1******$2"):phone;
}