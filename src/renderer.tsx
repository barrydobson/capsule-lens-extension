import { Renderer } from '@k8slens/extensions';
import * as registries from '@k8slens/extensions/dist/src/extensions/registries';
import React from 'react';
import { TenantDetails } from './details/tenant';
import { CustomResourceQuotaPage } from './pages/resource-quotas';
import { CustomTenantPage } from './pages/tenants';
import { Tenant } from './tenant';

const enum id {
  capsule = 'capsule',
  tenants = 'tenants',
  resourceBudget = 'resourcebudget'
}

export const Icon: React.FC<Renderer.Component.IconProps> = props =>
  <Renderer.Component.Icon {...props} material='verified_user' tooltip='Capsule'/>;

export default class RendererExtension extends Renderer.LensExtension {
  clusterPages: registries.PageRegistration[] = [
    {
      id: id.tenants,
      components: {
        Page: () => <CustomTenantPage extension={this} />
      }
    },
    {
      id: id.resourceBudget,
      components: {
        Page: () => <CustomResourceQuotaPage extension={this} />
      }
    }
  ];

  clusterPageMenus: registries.ClusterPageMenuRegistration[] = [
    {
      id: id.capsule,
      title: 'Capsule',
      components: { Icon }
    },
    {
      parentId: id.capsule,
      target: { pageId: id.tenants },
      title: 'Tenants',
      components: { Icon }
    },
    {
      parentId: id.capsule,
      target: { pageId: id.resourceBudget },
      title: 'Resource Budget',
      components: { Icon }
    }
  ];

  kubeObjectDetailItems: registries.KubeObjectDetailRegistration[] = [
    {
      kind: Tenant.kind,
      apiVersions: ['capsule.clastix.io/v1alpha1'],
      components: {
        Details: TenantDetails
      }
    }
  ];
}
