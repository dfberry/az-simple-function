const { KeyVaultSecret } = require("@azberry/az-simple");

const keyVaultName = process.env.AZURE_KEY_VAULT_NAME;

export async function getKeyVaultSecret(secretName: string): Promise<any>{

    // expect Key Vault Secrets User RBAC role

    const kvSecretMgr = new KeyVaultSecret(keyVaultName);

    const secretValue = await kvSecretMgr.getSecret(secretName);

    return secretValue;
}
