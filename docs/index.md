# Getting started

## Installation

- [Plugin setup](setup.md)

## Usage

- [Integration with `@backstage/plugin-search`](search.md)
- [Display latest announcements on a page](latest-announcements-on-page.md)
- [Display a banner for the latest announcement](latest-announcement-banner.md)

## Customization

### Overriding the AnnouncementCard

It is possible to specify the length of the title for announcements rendered on the `AnnouncementsPage`. You can do this by passing a `cardOptions` prop to the `AnnouncementsPage` component. The `cardOptions` prop accepts an object with the following properties:

```ts
{
  titleLength: number; // defaults to 50
}
```

Example

```tsx
<AnnouncementsPage cardOptions={{ titleLength: 10 }} />
```
