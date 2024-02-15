const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err){ 
            console.log(`${err}`) 
            return res.status(403).json({ error: 'Invalid Token' });}

            const { role, empID } = decoded;;
        console.log(role);
        console.log("ID:" ,empID);
        if (role==="Admin") {
            req.urole = role;
            req.empID = empID;
            next();
        }else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

const verifyTester = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err){ 
            console.log(`${err}`) 
            return res.status(403).json({ error: 'Invalid Token' });}

            const { role, empID } = decoded;;
        console.log(role);
        console.log(empID);
        if (role==="Tester") {
            req.urole = role;
            req.empID = empID;
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};

const verifyDev = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err){ 
            console.log(`${err}`) 
            return res.status(403).json({ error: 'Invalid Token' });}

            const { role, empID } = decoded;;
        console.log(role);
        console.log(empID);
        if (role==="Developer") {
            req.urole = role;
            req.empID = empID;
            next();
        } else {
            return res.status(403).json({ error: 'Unauthorized' });
        }
    });
};




module.exports = {verifyAdmin , verifyTester , verifyDev };
