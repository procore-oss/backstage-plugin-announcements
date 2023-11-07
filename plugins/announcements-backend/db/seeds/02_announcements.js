/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('announcements').del();
  await knex('announcements').insert([
    {
      id: '0',
      publisher: 'default:group/developer-enablement',
      title: 'Introducing Backstage',
      excerpt: 'The developer enablement team is exited to announce Backstage!',
      body: 'Backstage is an open platform for building developer portals. Powered by a centralized software catalog, Backstage restores order to your microservices and infrastructure and enables your product teams to ship high-quality code quickly — without compromising autonomy. Backstage unifies all your infrastructure tooling, services, and documentation to create a streamlined development environment from end to end.',
      created_at: '2022-01-21T12:21:08.539Z',
      category: 'internal-developer-portal',
    },
    {
      id: '1',
      publisher: 'default:group/sre',
      title: 'New DORA Metrics',
      excerpt: 'The next round of DORA metrics are here',
      body: 'The DevOps Research and Assessment (DORA) team was founded in 2014 as an independent research group focused on investigating the practices and capabilities that drive high performance in software delivery and financial results. The DORA team is known for the annual State of DevOps report that has been published for seven consecutive years, from 2014 to 2021. In 2019, DORA was acquired by Google.',
      created_at: '2022-03-26T15:28:08.539Z',
      category: 'infrastructure',
    },
    {
      id: '2',
      publisher: 'default:user/guest',
      title: 'Community blog post',
      excerpt: 'How to scale your infrastructure',
      body: `Today we will dive into some strategies you can use to scale Ruby on Rails applications to a huge user base.

      One obvious way of scaling applications is to throw more money at them. And it works amazingly well — add a few more servers, upgrade your database server, and voila, a lot of the performance issues just go poof!
      
      But it is often also possible to scale applications without adding more servers. That's what we will discuss today.
      
      Let's get going!`,
      category: 'infrastructure',
      created_at: '2022-04-10T15:28:01.539Z',
    },
    {
      id: '3',
      publisher: 'default:group/incident-management',
      title: 'Incident Response Metrics',
      excerpt: 'Quarterly respone metrics',
      body: 'You will find the incident response metrics for the last quarter here. Our average time to resolve an incident is 2 hours. We are aiming to reduce this to 1 hour by the end of the year.',
      created_at: '2022-04-26T15:28:08.539Z',
    },
    {
      id: '4',
      publisher: 'default:user/kurtaking',
      title: 'What a wonderful announcement',
      excerpt: 'Happy to announce this announcement',
      body: 'We are happy to announce the new Announcements feature!',
      created_at: '2022-8-18T15:28:08.539Z',
    },
    {
      id: '5',
      publisher: 'default:group/developer-enablement',
      title: 'Introducing Software Catalog',
      excerpt: 'Thank you Spotify. The Software Catalog is here!',
      body: 'The Backstage Software Catalog is a centralized system that keeps track of ownership and metadata for all the software in your ecosystem (services, websites, libraries, data pipelines, etc). The catalog is built around the concept of metadata YAML files stored together with the code, which are then harvested and visualized in Backstage.',
      created_at: '2022-9-01T05:28:08.539Z',
      category: 'internal-developer-portal',
    },
    {
      id: '6',
      publisher: 'default:group/sre',
      title: 'New feature: Announcements',
      excerpt: 'We are happy to announce the new Announcements feature!',
      body: 'We are happy to announce the new Announcements feature!',
      created_at: '2022-10-31T15:28:08.539Z',
    },
    {
      id: '7',
      publisher: 'default:user/guest',
      title: 'Required upgrade to Node 20',
      excerpt: 'All services are required to upgrade to Node 20',
      body: 'Service leveraging node are required to upgrade to Node 20 by the end of the month. Please contact the platform team if you have any questions.',
      category: 'javascript',
      created_at: '2023-01-01T15:28:08.539Z',
    },
    {
      id: '8',
      publisher: 'default:user/guest',
      title: 'Lorem Ipsum: A really long announcement example',
      excerpt: 'A long announcement!',
      body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      created_at: '2023-02-02T15:28:08.539Z',
      category: 'product-updates',
    },
    {
      id: '9',
      publisher: 'default:group/documentation',
      title: 'Documentation, upgrading to TechDocs',
      excerpt:
        'TechDocs is Spotify’s homegrown docs-like-code solution built directly into Backstage.',
      body: 'TechDocs is Spotify’s homegrown docs-like-code solution built directly into Backstage. Engineers write their documentation in Markdown files which live together with their code - and with little configuration get a nice-looking doc site in Backstage. Today, it is one of the core products in Spotify’s developer experience offering with 5000+ documentation sites and around 10000 average daily hits. Read more about TechDocs in its announcement blog post. 🎉',
      created_at: '2023-03-03T15:28:08.539Z',
      category: 'product-updates',
    },
    {
      id: '10',
      publisher: 'default:group/team-environments',
      title: 'Brownout: Service A',
      excerpt: 'Service A will be browned out for 2 hours',
      body: 'Service A will be browned out for 2 hours. Please contact the environments team if you have any questions.',
      created_at: '2023-04-04T15:28:08.539Z',
      category: 'infrastructure',
    },
  ]);
};
