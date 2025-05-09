import { SecretManager } from '@kubricate/core';
import { OpaqueSecretProvider } from '@kubricate/plugin-kubernetes';
import { EnvConnector } from '@kubricate/plugin-env';
import { config } from './shared-config';

export const secretManager = new SecretManager()
  .addConnector('EnvConnector', new EnvConnector())
  .addProvider(
    'OpaqueSecretProvider',
    new OpaqueSecretProvider({
      namespace: config.namespace,
      name: 'secret-application',
    })
  )
  .setDefaultConnector('EnvConnector')
  .setDefaultProvider('OpaqueSecretProvider')
  .addSecret({
    name: 'APP_SECRET',
  }).
  addSecret({
    name: 'DATABASE_CONNECTION_STRING',
  })
  .addSecret({
    name: 'APP_ID',
  });