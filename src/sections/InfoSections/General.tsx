import * as React from 'react';

import { Container, Typography, Link } from '@material-ui/core';

export default () => (
  <Container
    maxWidth="md"
    style={{ paddingTop: '16px', paddingBottom: '16px' }}
  >
    <Typography variant="h4">General Information</Typography>

    {/* TERMINOLOGY */}

    <Typography variant="h5" style={{ marginTop: '16px' }}>
      Terminology:
    </Typography>
    <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
      Modpack
    </Typography>
    <Typography variant="body1">
      Commonly found in the Minecraft modding scene, a modpack is a collection
      of mods put together in a single file. Often compressed into a zip, 7z or
      rar archive. This single file contains an entire modding setup and is very
      large in size as every file from every mod is included. Uploading a
      Modpack to the Internet means distributing possible copyrighted content
      and has lead to huge backlash in other modding scenes.
    </Typography>
    <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
      Modlist (Written guide)
    </Typography>
    <Typography variant="body1">
      A written guide like{' '}
      <Link href="https://wiki.step-project.com/STEP:2.10.0">STEP</Link>,{' '}
      <Link href="https://wiki.nexusmods.com/index.php/User:Darkladylexy/Lexys_LOTD_SE">
        Lexys LOTD SE Mod Guide
      </Link>{' '}
      or <Link href="https://thephoenixflavour.com/">The Phoenix Flavour</Link>{' '}
      tell the user what, when and how to download and install. In order to
      reproduce the same setup of the guide author you will pick up a lot of new
      modding tricks and learn something unknown to you before. Depending on the
      depth of the guide, process not only takes a very long time but is very
      error prone if the user does not read everything carefully.
    </Typography>
    <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
      Modlist (Wabbajack)
    </Typography>
    <Typography variant="body1">
      A Wabbajack Modlist can be compared to a written guide except it is not
      written for humans but for machines. The resulting <code>.wabbajack</code>{' '}
      file contains instructions on what, when and how to download and install
      in order to replicate the entire setup of the author without bundling any
      assets.
    </Typography>

    {/* HOW IT WORKS */}

    <Typography variant="h5" style={{ marginTop: '16px' }}>
      How Wabbajack works:
    </Typography>
    {/* COMPILATION */}
    <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
      Compilation
    </Typography>
    <Typography variant="body1">
      To compile a Modlist, Wabbajack needs a lot of information and has to know
      from where every file came from. We start by indexing <b>everything</b>:
      your game, downloads and installation folder and create a{' '}
      <i>VFS cache file</i> containing the location and{' '}
      <Link href="https://github.com/Cyan4973/xxHash">xxHash</Link> of every
      indexed file.
      <br />
      After WJ indexed all files and done some pre-validating of the archives,
      we run every file through a <i>Compilation Stack</i>. This stack contains{' '}
      <i>Compilation Steps</i> that find out from where a file came from. It
      starts at the top and falls through until one step assigns the file a
      reason to exist and origin. Some steps simply ignore files like logs,
      caches or crash dumbs while other deconstruct BSAs, include zEdit patches,
      patch the game ESMs or re-target paths in config files.
      <br />
      The Compilation Stack is the meat of the entire process and will result in
      a list of directives that will later be saved in the output file. If one
      file dropped out of the stack it will have no match and the compilation
      will fail.
      <br />
      The last steps during compilation are all about verifying whether or not
      the archive is still downloadable, if the zEdit merges are valid and if
      the user can actually install the modlist.
    </Typography>
    {/* INSTALLATION */}
    <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
      Installation
    </Typography>
    <Typography variant="body1">
      Wabbajack is made to be a one click installer: You start the application,
      load the Modlist and hit Install.
      <br />
      We start, same as the Compilation, by hashing every file to find out if
      certain archives are already present. This means that you can close
      Wabbajack at any time and return to the installation when you got the time
      as the program will find what needs to be downloaded or installed.
      <br />
      Wabbajack can download from a multitude of different websites including,
      but not limited to, Nexus Mods, GitHub, MEGA, MediaFire, GDrive, Dropbox,
      AFKMods, BethesdaNet, DeadlyStream, LoversLab, ModDB, Steam Workshop,
      TESAlliance, VectorPlexus, ENBSeries and more!
      <br />
      After downloading, Wabbajack starts going through all Directives within
      the Modlist and installs the files according to the instructions of those
      Directives.
    </Typography>
  </Container>
);
