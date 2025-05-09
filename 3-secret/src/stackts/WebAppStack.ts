import { createStack, ResourceComposer } from '@kubricate/core';
import { Deployment } from 'kubernetes-models/apps/v1/Deployment';
import { Service } from 'kubernetes-models/v1/Service';
import { joinPath } from '@kubricate/toolkit';

export interface WebAppStackOptions {
  name: string;
  namespace?: string;
  imageName: string;
  replicas?: number;
  imageRegistry?: string;
  port?: number;
  env?: EnvironmentApplication[];
}

export interface EnvironmentApplication {
  name: string;
  value: string;
}


export const WebAppStack = createStack('WebAppStack', (data: WebAppStackOptions) => {
  const port = data.port || 80;
  const replicas = data.replicas || 1;
  const imageRegistry = data.imageRegistry || '';

  const metadata = { name: data.name, namespace: data.namespace };
  const labels = { app: data.name };

  return new ResourceComposer()
    .addClass({
      id: 'deployment',
      type: Deployment,
      config: {
        metadata,
        spec: {
          replicas: replicas,
          selector: {
            matchLabels: labels,
          },
          template: {
            metadata: {
              labels,
            },
            spec: {
              containers: [
                {
                  image: joinPath(imageRegistry, data.imageName),
                  name: data.name,
                  ports: [{ containerPort: port }],
                  env: data.env,
                },
              ],
            },
          },
        },
      },
    })
    .addClass({
      id: 'service',
      type: Service,
      config: {
        metadata,
        spec: {
          selector: labels,
          type: 'LoadBalancer',
          ports: [
            {
              port,
              targetPort: port,
            },
          ],
        },
      },
    });
});