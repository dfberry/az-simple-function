const { KeyVaultSecret } = require("@azberry/az-simple");
import { isEmptyString } from './strings';

const keyVaultName = process.env.AZURE_KEY_VAULT_NAME;

export async function getSecret(secretName:string):Promise<any>{
  if(isEmptyString(secretName)) return { error: "secretName is empty"}

  const kvSecretMgr = new KeyVaultSecret(keyVaultName);
    
    const {name, value, error} = await kvSecretMgr.getSecret(secretName);

    return {
      name, 
      value, 
      error
    }
}