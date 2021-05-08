const {OAuth2Client} = require('google-auth-library');



const client = new OAuth2Client(process.env.CLIENT_GOOGLE_ID);

const googleVerify = async ( id_token ) => {
  const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_GOOGLE_ID ,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const { name, email, picture: img } = ticket.getPayload();
//   const userid = payload['sub'];
  // If request specified a G Suite domain:
  // const domain = payload['hd'];

  return {
    name,
    email,
    img
  }
}
// verify().catch(console.error);


module.exports = {
    googleVerify
}