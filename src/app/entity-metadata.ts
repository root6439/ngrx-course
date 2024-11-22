import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import { compareCourses } from './shared/models/course';
import { compareLessons } from './shared/models/lesson';

const entityMetadata: EntityMetadataMap = {
  Course: {
    sortComparer: compareCourses,
    entityDispatcherOptions: {
      optimisticUpdate: true,
    },
  },
  Lesson: {
    sortComparer: compareLessons,
  },
};

const pluralNames = {};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames,
};
