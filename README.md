# Announcements plugin for Backstage

The plugins within this repository have been migrated to [backstage/community-repos](https://github.com/backstage/community-plugins). You can find the code under the new announcements [workspace](https://github.com/backstage/community-plugins/tree/main/workspaces/announcements).

  All plugins are perserved at version 0.1.1, and the new packages are available at the following locations:

  - [@backstage-community/plugin-announcements](https://www.npmjs.com/package/@backstage-community/plugin-announcements)
  - [@backstage-community/plugin-announcements-backend](https://www.npmjs.com/package/@backstage-community/plugin-announcements-backend)
  - [@backstage-community/plugin-announcements-common](https://www.npmjs.com/package/@backstage-community/plugin-announcements-common)
  - [@backstage-community/plugin-announcements-react](https://www.npmjs.com/package/@backstage-community/plugin-announcements-react)
  - [@backstage-community/plugin-announcements-node](https://www.npmjs.com/package/@backstage-community/plugin-announcements-node)

Looking to contribute or help maintain? Check out the [contributing guide](https://github.com/backstage/community-plugins/blob/main/CONTRIBUTING.md) in the community plugins repository.


## Overview

The Announcements plugin manages and displays announcements within Backstage.

This plugin provides:

- a component to display the latest announcement as a banner, if there is one
- a component to display the latest announcements, for example on a homepage
- pages to list, view, create, edit and delete announcements
- integration with the [`@backstage/plugin-search`](https://github.com/backstage/backstage/tree/master/plugins/search) plugin
- integration with the [`@backstage/plugin-permission-backend`](https://github.com/backstage/backstage/tree/master/plugins/permission-backend) plugin
- integration with the [`@backstage/plugin-events-backend`](https://github.com/backstage/backstage/tree/master/plugins/events-backend) plugin
- integration with the [`@backstage/plugin-signals-backend`](https://github.com/backstage/backstage/tree/master/plugins/signals-backend) plugin

## Installation

Find [installation instructions](./docs/index.md#installation) in our documentation.

## How does it look?

### Latest announcement banner

![Latest announcement banner](./docs/images/announcement_banner.png)

### Announcements card

![Announcements card](./docs/images/announcements_card.png)

### Announcements page

![Announcements page](./docs/images/announcements_page.png)

### Announcements search

![Announcements search results](./docs/images/announcements_search.png)

### Admin Portal

![Announcements admin portal](./docs/images/announcements_admin_portal.png)

## License

This library is under the [MIT](LICENSE.md) license.

## Special thanks & Disclaimer

We want to thank K-Phoen for creating the announcement plugins found [here](https://github.com/K-Phoen/backstage-plugin-announcements). Their work has been invaluable in providing a foundation for our development efforts, and we are grateful for the time and effort they put into creating this plugin.

In the spirit of Procore’s values of openness, our focus will be on meeting our internal needs, meaning we are making changes to the plugin that are incompatible with the original. We are happy to share it with the community and welcome all pull requests and issues.
