import { Component, LensRendererExtension } from '@k8slens/extensions';
import React from 'react';
import { Tenant } from '../tenant';
import { tenantStore } from '../tenant-store';
import './tenants.scss';

const enum sortBy {
  name = 'name',
  namespaceQuota = 'namespacequota',
  namespaceCount = 'namespacecount',
  ownerName = 'ownername',
  ownerKind = 'ownerkind',
  age = 'age',
}

export class CustomTenantPage extends React.Component<{ extension: LensRendererExtension }> {
  render() {
    return (
      <Component.KubeObjectListLayout
        className='CustomTenantPage'
        store={tenantStore}
        isClusterScoped={true}
        sortingCallbacks={{
          [sortBy.name]: (tenant: Tenant) => tenant.getName(),
          [sortBy.namespaceQuota]: (tenant: Tenant) => tenant.spec.namespaceQuota || 0,
          [sortBy.namespaceCount]: (tenant: Tenant) => tenant.status.size,
          [sortBy.ownerName]: (tenant: Tenant) => tenant.spec.owner.name,
          [sortBy.ownerKind]: (tenant: Tenant) => tenant.spec.owner.kind,
          [sortBy.age]: (tenant: Tenant) => tenant.metadata.creationTimestamp
        }}
        searchFilters={[
          (tenant: Tenant) => tenant.getSearchFields()
        ]}
        renderHeaderTitle='Tenants'
        renderTableHeader={[
          { title: 'Name', className: 'name', sortBy: sortBy.name },
          { title: 'Namespace Quota', className: 'namespace-quota', sortBy: sortBy.namespaceQuota },
          { title: 'Namespace Count', className: 'namespace-count', sortBy: sortBy.namespaceCount },
          { title: 'Owner Name', className: 'owner-name', sortBy: sortBy.ownerName },
          { title: 'Owner Kind', className: 'owner-kind', sortBy: sortBy.ownerKind },
          { title: 'Age', className: 'age', sortBy: sortBy.name }
        ]}
        renderTableContents={(tenant: Tenant) => [
          tenant.getName(),
          tenant.spec.namespaceQuota,
          tenant.status.size,
          tenant.spec.owner.name,
          tenant.spec.owner.kind,
          tenant.getAge()
        ]}
        addRemoveButtons={{
          onAdd: () => console.log('add')
        }}
      />
    );
  }
}
