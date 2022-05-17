
/**
 * 
 * @param {Object} req The express request object
 * @param {Number} level The level needed in order to permit the 
 * @returns 
 */
function verifyPermissions(req, level) {
    return new Promise((resolve, reject) => {
        if (req && req.session && req.session.passport && req.session.passport.user && req.session.passport.user.permission >= level) {
            resolve('User has permission')
        } else {
            reject('User does not have permission')
        }
    })
}

module.exports = {verifyPermissions}