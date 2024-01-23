# @procore-oss/backstage-plugin-announcements-backend

## 0.5.2

### Patch Changes

- 35670f3: Upgrade Backstage to 1.22.1
- Updated dependencies [35670f3]
  - @procore-oss/backstage-plugin-announcements-common@0.1.3

## 0.5.1

### Patch Changes

- 857c323: set correct build database migrations folder path

## 0.5.0

### Minor Changes

- 4968543: The backend now contains a local seeded database with announcements and categories. The README file was updated to include instructions on how to set things up. Minor documentation edits were made across the project to align with the format updates in the backend's readme.

## 0.4.0

### Minor Changes

- 43e6b6a: Exposes the announcements plugin's permissions in a metadata endpoint

### Patch Changes

- bce49e0: Improves test coverage significantly for the backend plugin
- 24df174: chore: bump dev dependencies where possible
- c81ae81: Fix AnnouncementCollatorApi iterable error

## 0.3.5

### Patch Changes

- 90a19ec: upgrade backstage to v1.18.0
- c3c379d: bump backstage to v1.16.0
- Updated dependencies [90a19ec]
- Updated dependencies [c3c379d]
  - @procore-oss/backstage-plugin-announcements-common@0.1.2

## 0.3.4

### Patch Changes

- 57792bf: Fixed the correct endpoint call by AnnouncementCollatorApi

## 0.3.3

### Patch Changes

- 4f7a351: bump all packages
- Updated dependencies [4f7a351]
  - @procore-oss/backstage-plugin-announcements-common@0.1.1

## 0.2.0

### Minor Changes

- 2f5aa27: Introduce announcement categories

### Patch Changes

- 793d5b9: Bump Backstage dependencies to 1.15.0
- ab3813f: Bump Backstage dependencies
- b8c5c87: Paginate results in the announcements page
- Updated dependencies [793d5b9]
- Updated dependencies [ab3813f]
  - @procore-oss/backstage-plugin-announcements-common@0.0.7

## 0.1.4

### Patch Changes

- 7d25e84: Bump Backstage-related dependencies
- Updated dependencies [7d25e84]
  - @procore-oss/backstage-plugin-announcements-common@0.0.6

## 0.1.3

### Patch Changes

- 0e1d000: Give up on workspace:^ constraints
- 56d5e6d: Try and setup release pipeline to replace 'workspace:\*' version constraints
- Updated dependencies [0e1d000]
- Updated dependencies [56d5e6d]
  - @procore-oss/backstage-plugin-announcements-common@0.0.5

## 0.1.2

### Patch Changes

- Updated dependencies [9bdc37d]
  - @procore-oss/backstage-plugin-announcements-common@0.0.4

## 0.1.1

### Patch Changes

- Updated dependencies [6c9bf32]
  - @procore-oss/backstage-plugin-announcements-common@0.0.3

## 0.1.0

### Minor Changes

- 062aca5: Add permissioning around creating and deleting announcements

### Patch Changes

- 0c12eea: Bump Backstage dependencies
- Updated dependencies [062aca5]
- Updated dependencies [0c12eea]
  - @procore-oss/backstage-plugin-announcements-common@0.0.2

## 0.0.5

### Patch Changes

- c6b1bda: Fix announcement link in search results

## 0.0.4

### Patch Changes

- 785ac0b: Bump dependencies to match Backstage 1.8.0

## 0.0.3

### Patch Changes

- 81aeb2a: Fix announcements edit endpoint
- a5e68b3: Fix DateTime handling differences across Postgres and sqlite
- b518090: Adjust log levels in search collator

## 0.0.2

### Patch Changes

- ff90090: Fix dev environment
