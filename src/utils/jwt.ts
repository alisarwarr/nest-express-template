import * as jwt from 'jsonwebtoken';

export const generateToken = (obj) => {
    //return jwt.sign({ id }, process.env.TOKEN_SECRET);               // save as { id: '676940fce2a23e7845699eae', iat: 1734953223 } because passed only id .
    return jwt.sign(obj, process.env.TOKEN_SECRET                      // save as { id: '676940fce2a23e7845699eae', role: 'user', iat: 1734953223 } because passed whole object .
        , {
            expiresIn: process.env.TOKEN_EXPIRATION
        }
    );
}

export const generateRefreshToken = (obj) => {
    //return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET);       // save as { id: '676940fce2a23e7845699eae', iat: 1734953223 } because passed only id .
    return jwt.sign(obj, process.env.REFRESH_TOKEN_SECRET              // save as { id: '676940fce2a23e7845699eae', role: 'user', iat: 1734953223 } because passed whole object .
        , {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
        }
    );
}