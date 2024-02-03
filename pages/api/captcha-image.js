import * as fs from 'fs'
import { withIronSession } from 'next-iron-session';
const dognum=0.5;

export function newCaptcha() {
    return (new Array(9)).fill(null).map((value,index)=>{
        const isDog=Math.random()<dognum;
        let number=1;
        isDog?number=Math.floor(Math.random()*10)+1:Math.floor(Math.random()*13)+1;
        const fileName=(isDog?'dog':'muffin')+number+'.png';
     return './public/dogs-and-muffins/'+fileName;
    });
}

export default withIronSession(async function  handler(req,res) {
    const index=req.query.index;
    if (!req.session.get('captchaImages')) {
        req.session.set('captchaImages', newCaptcha());
        await req.session.save();
    }

    const captchaImages = req.session.get('captchaImages');

    res.setHeader('Content-Type', 'image/png');
    const image = fs.readFileSync(captchaImages[index]);
    res.status(200).send(image);
}
, {
  password:process.env.SESSION_SECRECT,
  cookieName: 'my-cookie',
  cookieOptions: {
    secure: process.env.SESSION_SECRECT === 'production' ? true : false,
  },
 
});

 
