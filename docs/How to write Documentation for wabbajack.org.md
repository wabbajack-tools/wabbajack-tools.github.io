---
title: How to write Documentation for wabbajack.org
author: erri120
published: 2021-08-10
---

Create a new markdown file in the [docs](https://github.com/wabbajack-tools/wabbajack-tools.github.io/tree/redux/docs) folder and start the file with the following header:

```markdown
---
title: Title of the Document
author: your username
published: yyyy-MM-dd
updated: yyyy-MM-dd
---
```

Dates should be in the `yyyy-MM-dd` format meaning first the year `2021` then the month `08` (`01` to `12`) and finally the day `10` (`01` to `31`). Also note that the `updated` field is only required if you updated the file at any point in time. The actual markdown contents after the header have to follow these rules:

- don't use a h1 heading (`#`) that includes the title of the document as it is redundant
- don't use relative links; always use absolute links especially for images.
