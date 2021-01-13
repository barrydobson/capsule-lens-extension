import { Component, LensRendererExtension } from '@k8slens/extensions';
import * as registries from '@k8slens/extensions/dist/src/extensions/registries';
import React from 'react';
import { ResourceQuotaDetails } from './details/resource-quota-details';
import { CustomResourceQuotaPage } from './pages/resource-quotas';
import { CustomTenantPage } from './pages/tenants';

const enum id {
  capsule = 'capsule',
  tenants = 'tenants',
  resourceBudget = 'resourcebudget'
}

export const Icon = (props: Component.IconProps) =>
  <Component.Icon {...props} material='lens' tooltip='Capsule'/>;

export default class RendererExtension extends LensRendererExtension {
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
      kind: 'ResourceQuota',
      apiVersions: ['v1'],
      components: {
        Details: ResourceQuotaDetails
      }
    }
  ];
}
