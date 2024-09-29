import { SignalsService } from '@backstage/plugin-signals-node';
import {
  initializePersistenceContext,
  PersistenceContext,
} from './persistence/persistenceContext';
import {
  DatabaseService,
  HttpAuthService,
  LoggerService,
  PermissionsService,
  RootConfigService,
} from '@backstage/backend-plugin-api';

type AnnouncementsContextOptions = {
  logger: LoggerService;
  config: RootConfigService;
  database: DatabaseService;
  permissions: PermissionsService;
  httpAuth: HttpAuthService;
  signals: SignalsService;
};

export type AnnouncementsContext = {
  logger: LoggerService;
  config: RootConfigService;
  persistenceContext: PersistenceContext;
  permissions: PermissionsService;
  httpAuth: HttpAuthService;
  signals: SignalsService;
};

export const buildAnnouncementsContext = async ({
  logger,
  config,
  database,
  permissions,
  httpAuth,
  signals,
}: AnnouncementsContextOptions): Promise<AnnouncementsContext> => {
  return {
    logger,
    config,
    persistenceContext: await initializePersistenceContext(database),
    permissions,
    httpAuth,
    signals,
  };
};
