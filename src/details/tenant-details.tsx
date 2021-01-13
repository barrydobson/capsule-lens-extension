import { Component } from '@k8slens/extensions';
import React from 'react';
import { Tenant } from '../tenant';
import './tenant-details.scss';

export type Props = Component.KubeObjectDetailsProps<Tenant>

export class TenantDetails extends React.Component<Props> {
  render() {
    const { object: tenant } = this.props;
    if (!tenant) return null;

    const { spec, status } = tenant;

    return (
      <div className='CustomTenantDetails'>
        <Metrics />
        <Component.KubeObjectMeta object={tenant} />
        <Component.DrawerItem name='Namespace quota'>{spec.namespaceQuota}</Component.DrawerItem>
        <Component.DrawerItem name='Namespace count'>{status.size}</Component.DrawerItem>
        <Component.DrawerItem name='Owner name'>{spec.owner.name}</Component.DrawerItem>
        <Component.DrawerItem name='Owner kind'>{spec.owner.kind}</Component.DrawerItem>
      </div>
    );
  }
}

//

const Metrics = () => (
  <div className='Metrics flex justify-center align-center'>
    Metrics Placeholder
  </div>
);
