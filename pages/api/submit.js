
import { withIronSession } from 'next-iron-session';
import { newCaptcha } from './captcha-image';

  export default withIronSession(async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { selectedImages } = req.body;
        console.log(selectedImages)
        
        const captchaImages=req.session.get('captchaImages');

       const dogsOnly=captchaImages.map((path,index)=>{
            return path.includes('/dogs-and-muffins/dog') ? index:-1;
       }).filter(
        index=>index!==-1
       );
       
      const isValidCaptcha=JSON.stringify(dogsOnly)===JSON.stringify(selectedImages.sort());
      if (!isValidCaptcha) {
        req.session.set('captchaImages', newCaptcha());
        await req.session.save();
      }
  
      res.status(200).json({ isValidCaptcha });
      } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      // Handle other HTTP methods if needed
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
, {
  password:process.env.SESSION_SECRECT,
  cookieName: 'my-cookie',
  cookieOptions: {
    secure: process.env.SESSION_SECRECT === 'production' ? true : false,
  },
 
});

 

  