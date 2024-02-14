const bcrypt = require('bcrypt')
// Generate a salt (only once) and store it securely
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const hashPassword = async (password) => {
    try {
        // Hash password using the pre-generated salt
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = hashPassword;

//   const comparePassword = async () => {
//     try {
//         const passwordEnteredByUser = "123456@abcde"
//         const hash = await hashPassword(passwordEnteredByUser)
        
//         bcrypt.compare(passwordEnteredByUser, hash, function(err, isMatch) {
//             if (err) {
//                 throw err
//             } else if (!isMatch) {
//                 console.log("Password doesn't match!")
//             } else {
//                 console.log("Password matches!")
//             }
//         })
//     } catch (error) {
//         console.error(error)
//     }
// }

// comparePassword()