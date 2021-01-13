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
    const resourceQuotas = spec.resourceQuotas
      ?.flatMap(rq => Object.entries(rq.hard || {}));

    return (
      <div className='CustomTenantDetails'>
        <Metrics />
        <Component.KubeObjectMeta object={tenant} />
        <Component.DrawerItem name='Namespace quota'>{spec.namespaceQuota}</Component.DrawerItem>
        <Component.DrawerItem name='Namespace count'>{status.size}</Component.DrawerItem>
        <Component.DrawerItem name='Owner name'>{spec.owner.name}</Component.DrawerItem>
        <Component.DrawerItem name='Owner kind'>{spec.owner.kind}</Component.DrawerItem>
        <Labels name='Node selector' dict={spec.nodeSelector} />
        <Labels name='Resource Quotas' pairs={resourceQuotas} />
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

const Labels = (
  props: {
    name: string;
    values?: string[];
    pairs?: [string, unknown][];
    dict?: Record<string, unknown>;
  }
) => {
  if (!props.values && !props.pairs && !props.dict)
    return null;

  return (
    <Component.DrawerItem labelsOnly name={props.name}>
      {props.pairs && props.pairs.map(([key, value]) => (
        <Component.Badge key={key} label={`${key}=${value}`} />
      ))}
      {props.dict && Object.entries(props.dict).map(([key, value]) => (
        <Component.Badge key={key} label={`${key}=${value}`} />
      ))}
      {props.values && props.values.map(value => (
        <Component.Badge key={value} label={value} />
      ))}
    </Component.DrawerItem>
  );
};
