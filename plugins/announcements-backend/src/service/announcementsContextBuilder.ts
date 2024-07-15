import {
  initializePersistenceContext,
  PersistenceContext,
} from './persistence/persistenceContext';
import {
  DatabaseService,
  HttpAuthService,
  LoggerService,
  PermissionsService,
} from '@backstage/backend-plugin-api';

export type AnnouncementsContextOptions = {
  logger: LoggerService;
  database: DatabaseService;
  permissions: PermissionsService;
  httpAuth: HttpAuthService;
};

export type AnnouncementsContext = {
  logger: LoggerService;
  persistenceContext: PersistenceContext;
  permissions: PermissionsService;
  httpAuth: HttpAuthService;
};

export const buildAnnouncementsContext = async ({
  logger,
  database,
  permissions,
  httpAuth,
}: AnnouncementsContextOptions): Promise<AnnouncementsContext> => {
  return {
    logger: logger,
    persistenceContext: await initializePersistenceContext(database),
    permissions: permissions,
    httpAuth: httpAuth,
  };
};
