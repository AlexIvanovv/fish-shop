const isEmail = (email) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailToCheck = email
        .replace(/\s/g, '')   // Remove all white space characters (needs to be "greedy" to not stop after finding the first match)
        .replace(/,,+/g, ',')   // Remove any surplus commas from anywhere in the string
        .replace(/(^,|,$)/g, '')   // Remove a comma (if present) from the start or end of the string
        .split(',')

    const isValidEmail = emailRegex.test(emailToCheck)

    if (!isValidEmail) {
        return "Моля напишете валиден емейл адрес"
    }
}
module.exports = isEmail