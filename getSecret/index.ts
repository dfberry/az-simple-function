import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { getKeyVaultSecret } from '../azberry/key-vault';
import { isEmptyString } from '../util/strings';

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  try {
    context.log('HTTP trigger function processed a request.');
    const name = req.query.name || (req.body && req.body.name);

    const isEmpty = isEmptyString(name);

    if (isEmpty) {
      context.res = {
        status: 404
      };
      return;
    }

    const secretResult = getKeyVaultSecret(name);

    context.res = {
      status: 200 /* Defaults to 200 */,
      body: {secretResult}
    };
  } catch (err) {
    context.res = {
      status: 500,
      err
    };
  }
};

export default httpTrigger;
