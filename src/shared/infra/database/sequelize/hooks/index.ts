import models from '../models';
import { UniqueEntityID } from '../../../../domain/UniqueEntityID';
import { DomainEvents } from '../../../../domain/events/DomainEvents';

const dispatchEventsCallback = (model: any, primaryKeyField: string) => {
  const aggregateId = new UniqueEntityID(model[primaryKeyField]);
  DomainEvents.dispatchEventsForAggregate(aggregateId);
};

(async function createHooksForAggregateRoots() {
  // const { User } = models;
// console.log("models",models)
// console.log("User",User)
  // User.addHook('afterCreate', (m: any) =>
  //   dispatchEventsCallback(m, 'base_user_id')
  // );
  // User.addHook('afterDestroy', (m: any) =>
  //   dispatchEventsCallback(m, 'base_user_id')
  // );
  // User.addHook('afterUpdate', (m: any) =>
  //   dispatchEventsCallback(m, 'base_user_id')
  // );
  // User.addHook('afterSave', (m: any) =>
  //   dispatchEventsCallback(m, 'base_user_id')
  // );
  // User.addHook('afterUpsert', (m: any) =>
  //   dispatchEventsCallback(m, 'base_user_id')
  // );

  // Member.addHook('afterCreate', (m: any) =>
  //   dispatchEventsCallback(m, 'member_id')
  // );
  // Member.addHook('afterDestroy', (m: any) =>
  //   dispatchEventsCallback(m, 'member_id')
  // );
  // Member.addHook('afterUpdate', (m: any) =>
  //   dispatchEventsCallback(m, 'member_id')
  // );
  // Member.addHook('afterSave', (m: any) =>
  //   dispatchEventsCallback(m, 'member_id')
  // );
  // Member.addHook('afterUpsert', (m: any) =>
  //   dispatchEventsCallback(m, 'member_id')
  // );

  // Post.addHook('afterCreate', (m: any) => dispatchEventsCallback(m, 'post_id'));
  // Post.addHook('afterDestroy', (m: any) =>
  //   dispatchEventsCallback(m, 'post_id')
  // );
  // Post.addHook('afterUpdate', (m: any) => dispatchEventsCallback(m, 'post_id'));
  // Post.addHook('afterSave', (m: any) => dispatchEventsCallback(m, 'post_id'));
  // Post.addHook('afterUpsert', (m: any) => dispatchEventsCallback(m, 'post_id'));

  console.log('[Hooks]: Sequelize hooks setup.');
})();
