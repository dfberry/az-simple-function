import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { isEmptyString } from '../shared/strings';
import { getSecret } from '../shared/simple';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    
    context.log('HTTP trigger function processed a request.');
    const secretName = req.query.secretname || (req.body && req.body.secretname);

    if(isEmptyString(secretName)) {
      context.res = {
        status: 404 /* Defaults to 200 */,
        body: "`secretname param is missing"
      };
      return;
    }

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
