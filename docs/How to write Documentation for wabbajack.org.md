---
title: How to write Documentation for wabbajack.org
author: erri120
published: 2021-08-10
id: 97570123ad1d4421986fe51985d201aa
---

Create a new markdown file in the [docs](https://github.com/wabbajack-tools/wabbajack-tools.github.io/tree/redux/docs) folder and start the file with the following header:

```markdown
---
title: Title of the Document
author: your username
published: yyyy-MM-dd
updated: yyyy-MM-dd
id: GUID
---
```

The id has to be a valid GUID without spaces or hyphens like `b58be82681864ada85c0e4854ac17de8`. You can generate these on sites like [guidgenerator.com](https://guidgenerator.com/online-guid-generator.aspx) or [duckduckgo.com](https://duckduckgo.com/?t=ffab&q=generate+guid&ia=answer) or with powershell using the `New-Guid` command. Just make sure to remove the spaces and hyphens.

Dates should be in the `yyyy-MM-dd` format meaning first the year `2021` then the month `08` (`01` to `12`) and finally the day `10` (`01` to `31`). Also note that the `updated` field is only required if you updated the file at any point in time. The actual markdown contents after the header have to follow these rules:

- don't use a h1 heading (`#`) that includes the title of the document as it is redundant
- don't use relative links; always use absolute links especially for images.
