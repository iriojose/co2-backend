let { AUTH_URL } = require('../keys');
let { getTenantId, createAxios } = require('./axios');
let atob = require('atob');

const validar = async function(req, res, next) {
    console.log(`[DATE] ${new Date()}`);
    try {
        let head = req.headers['x-access-control'];
        let tenantId = getTenantId(req);

        console.log("[LOG] Request for tenantId: "+tenantId)

        let connection = createAxios(AUTH_URL, tenantId);

        if (!tenantId) return res.status(502).json({ message: 'A tenant ID must be specified' })
        
        connection.post(`/validate`, { token: JSON.parse(atob(head)) }).then(r => {
            let { data } = r;
            if (!data.validado) return res.status(401).json({ message: 'Invalid token' });
               
            console.log("[LOG] Token validated.")

            req.userId = data.id;
            next();
        }).catch(function(){
            return res.status(403).json({ message: "You are not allowed to use this API. Please contact: teamlead@somossistemas.com." });
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    
}

module.exports = { validar }