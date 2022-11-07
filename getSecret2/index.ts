import { AzureFunction, Context, HttpRequest } from '@azure/functions';
const { KeyVaultSecret } = require("@azberry/az-simple");
import { isEmptyString } from '../util/strings';

const keyVaultName = process.env.AZURE_KEY_VAULT_NAME;



async function getSecret(secretName:string):Promise<any>{
  if(isEmptyString(secretName)) return { error: "stringname is empty"}

  const kvSecretMgr = new KeyVaultSecret(keyVaultName);
    
    const {name, value, error} = await kvSecretMgr.getSecret(secretName);

    return {
      name, 
      value, 
      error
    }
}

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    
    context.log('HTTP trigger function processed a request.');
    const secretName = req.query.secretname || (req.body && req.body.secretname);

    const result = await getSecret(secretName);

    console.log("after get secret");

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: result
    };

    
  } catch (err) {
    context.res = {
      status: 500,
      err
    };
  }
};

export default httpTrigger;
