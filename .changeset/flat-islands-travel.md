---
'@procore-oss/backstage-plugin-announcements': minor
---

Fixes issues when theme object is empty. To solve this issue fallbacks are provided:

- theme provided from mui useTheme function,
- if previous fallback is not working hardcoded value is used.
