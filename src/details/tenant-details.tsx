import { Component } from '@k8slens/extensions';
import React from 'react';
import { Tenant, Metadata, AdditionalRoleBinding, AllowList } from '../tenant';
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
        <AllowList name='External service IPs' value={spec.externalServiceIPs} />
        <AllowList name='Container registries' value={spec.containerRegistries} />
        <AllowList name='Ingress classes' value={spec.ingressClasses} />
        <AllowList name='Storage classes' value={spec.storageClasses} />
        <Metadata name='Namespaces metadata' value={spec.namespacesMetadata} />
        <Metadata name='Services metadata' value={spec.servicesMetadata} />
        <AdditionalRoleBindings values={spec.additionalRoleBindings} />
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

const AllowList = (props: { name: string, value?: AllowList }) => {
  if (!props.value)
    return null;

  return (
    <Component.DrawerItem name={props.name}>
      <Labels name='Allowed' values={props.value.allowed} />
      {props.value.allowedRegex && (
        <Component.DrawerItem name='Allowed regex'>
          <code>{props.value.allowedRegex}</code>
        </Component.DrawerItem>
      )}
    </Component.DrawerItem>
  );
};

const Metadata = (props: { name: string, value?: Metadata }) => {
  if (!props.value)
    return null;

  return (
    <Component.DrawerItem name={props.name}>
      <Labels
        name='Additional annotations'
        dict={props.value.additionalAnnotations}
      />
      <Labels
        name='Additional labels'
        dict={props.value.additionalLabels}
      />
    </Component.DrawerItem>
  );
};

const AdditionalRoleBindings = (props: { values?: AdditionalRoleBinding[] }) => {
  if (!props.values)
    return null;

  return (
    <Component.DrawerItem name='Additional role bindings'>
      <Component.DrawerParamToggler label={props.values.length}>
        {props.values.map(binding => {
          const subjects = binding.subjects
            .flatMap(subject => Object.entries(subject));

          return <>
            <Component.DrawerItem name='Cluster role name'>
              {binding.clusterRoleName}
            </Component.DrawerItem>
            <Component.DrawerItem name='Subjects'>
              {subjects.map(([key, value]) => (
                <Component.DrawerItem key={key} name={key}>
                  {value}
                </Component.DrawerItem>
              ))}
            </Component.DrawerItem>
          </>;
        })}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};
