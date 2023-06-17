
const userAcc = require('../models/userAccount');




exports.registerUser = async (req, res) => {
    try {
        const { name, password, username, email } = req.body;
        const newAccount = await userAcc.create({
            name, password, username, email
        })

        const token = newAccount.getJWTToken();
      
        res.status(201).json({ success: true, newAccount, token });
    }

    catch (err) {
        res.json({ error: err })
    }

}


