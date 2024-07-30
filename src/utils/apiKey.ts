import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

// Generate an API key using CryptoJS
export const generateApiKey = () => {
  const apiKey = CryptoJS.lib.WordArray.random(16).toString();
  console.log(apiKey,"kj");
  return apiKey;
};

// Sign the API key using JWT
export const signApiKey = (apiKey:string, secret:string) => {
  console.log(apiKey,"hhhhhhhhhhhhhh", secret);
  try{
  return jwt.sign({ payload: apiKey }, secret, { expiresIn: '1h' });
  }catch(e){
    console.log(e,"lknknd");
  }
};

// Create and sign the API key
export const createAndSignApiKey = (secret:any) => {
  const apiKey = generateApiKey();
  const signedApiKey = signApiKey(apiKey, secret);
  return signedApiKey;
};
