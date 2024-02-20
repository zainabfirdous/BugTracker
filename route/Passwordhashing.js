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
