const crypto = require('crypto');

const hashPwd = p => {
    const hmac = crypto.createHmac(
        'sha512',
        'aerg vrT%$ ty 45yhgerw453 %$^#$%gsrebg%$NYDVS 43RTGsgv 54wy SRDG%EG$%#G gsew%RG%RHdfb 54yhFDB%Gfsb 45GSHRSTG$#H^$',
    );
    hmac.update(p);
    return hmac.digest('hex');
};

module.exports = {
    hashPwd,
}