import React from 'react';

import { Container, Typography, Link } from '@material-ui/core';

export default function ModAuthors() {
  return (
    <Container
      maxWidth="md"
      style={{ paddingTop: '16px', paddingBottom: '16px' }}
    >
      <Typography variant="h4">Information for Mod Authors</Typography>
      <Typography variant="body2" component="i">
        Before reading this section, make sure you have read the{' '}
        <Link href="/info/general">General Information</Link> page.
      </Typography>
      <Typography variant="body1" style={{ paddingTop: '4px' }}>
        Depending on which modding scene you came from, you may have different
        experiences with <i>Modpacks</i>, <i>Modlists</i> and
        <i> Automated Installers</i>. It is important to understand what and how
        Wabbajack operates before forming an opinion.
      </Typography>
      <Typography variant="h6" style={{ marginTop: '16px' }}>
        Common questions
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        How does Wabbajack download mods from the Nexus?
      </Typography>
      <Typography>
        Wabbajack uses the official{' '}
        <Link href="https://app.swaggerhub.com/apis-docs/NexusMods/nexus-mods_public_api_params_in_form_data/1.0#/">
          Nexus API
        </Link>{' '}
        to retrieve download links from the Nexus. Downloads using the API are
        the same as direct downloads from the Nexus meaning this will count
        towards your download count and give you donation points.
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        How can I opt out of having my mod be included in a Modlist?
      </Typography>
      <Typography>
        We use the official Nexus API to download mods. Everyone who has access
        to the Nexus can download your mod. The Nexus does not lock out API
        access based on <i>author preferences</i>.
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        Will the end user even know they use my mod?
      </Typography>
      <Typography>
        Your mod is exposed in several layers of the user experience when
        installing a Modlist. Before the installation even starts, the user has
        access to the manifest of the Modlist. This contains a list of all mods
        to be installed as well as the authors, version, size, links and more
        meta data depending on origin.
        <br />
        Wabbajack will start a Slideshow during installation which features all
        mods to be installed in random order. The Slideshow displays the title,
        author, main image, description, version and a link to the Nexus page.
        <br />
        After installation the user most likely needs to check the instructions
        of the Modlist for recommended MCM options. If your mod has an MCM and
        needs a lot of configuring than your mod will likely be featured in the
        instructions.
        <br />
        Some Modlists have an extensive README that contains a section dedicated
        to some of the important mods in the setup with links to the mod page
        and mod author page.
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        A Wabbajack user reports problems with my mod, how should I respond?
      </Typography>
      <Typography>
        Depending on the Modlist used by the user, its best to handle them like
        any other user. Our curated Modlists have dedicated support channels
        behind them on our Discord so redirect them to our Discord for those
        lists.
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        What if my mod is not on the Nexus?
      </Typography>
      <Typography>
        As long as your mod is accessible and available on the Internet, we can
        can quickly create a downloader for whatever site you are hosting your
        mods on. Even if the site does not have an API or requires a login, we
        can always just resort to our internal browser and download the mod as
        if a user would go to the website using Firefox/Chrome and click the
        download button.
      </Typography>
    </Container>
  );
}
