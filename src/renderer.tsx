import { Component, LensRendererExtension } from '@k8slens/extensions';
import * as registries from '@k8slens/extensions/dist/src/extensions/registries';
import React from 'react';

const enum id {
  capsule = 'capsule',
  tenants = 'tenants',
  resourceBudget = 'resourcebudget'
}

export const Icon = (props: Component.IconProps) =>
  <Component.Icon {...props} material='lens' tooltip='Capsule'/>;

export default class RendererExtension extends LensRendererExtension {
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
}
