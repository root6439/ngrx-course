import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory,
} from '@ngrx/data';
import { EntityCollectionService } from './../../../node_modules/@ngrx/data/src/entity-services/entity-collection-service.d';
import { Injectable } from '@angular/core';
import { Lesson } from '../shared/models/lesson';

@Injectable({
  providedIn: 'root',
})
export class LessonEntityService extends EntityCollectionServiceBase<Lesson> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Lesson', serviceElementsFactory);
  }
}
