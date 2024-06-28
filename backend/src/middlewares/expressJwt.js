import { expressjwt } from "express-jwt";


const jwtValiodation = () =>{
    console.log('In middleware')
    const secret = process.env.JWT_SECRET;    
    return expressjwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/login',
            '/api/auth/signup',
            /^\/public\/.*/,
        ]
    });
}
export{jwtValiodation}