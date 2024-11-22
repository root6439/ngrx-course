import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { compareCourses } from './shared/models/course';

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
  },
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
