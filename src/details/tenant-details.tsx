import { Component } from '@k8slens/extensions';
import React from 'react';
import { Tenant } from '../tenant';
import './tenant-details.scss';

export type Props = Component.KubeObjectDetailsProps<Tenant>

export class TenantDetails extends React.Component<Props> {
  render() {
    const { object: tenant } = this.props;
    if (!tenant) return null;

    return (
      <div className='CustomTenantDetails'>
      </div>
    );
  }
}
