import React from 'react';

import { Container, Typography, Link } from '@material-ui/core';

export default function General() {
  return (
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
        of mods put together in a single file. Often compressed into a zip, 7z
        or rar archive. This single file contains an entire modding setup and is
        very large in size as every file from every mod is included.
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        Modlist (Written guide)
      </Typography>
      <Typography variant="body1">
        A written guide like{' '}
        <Link href="https://wiki.step-project.com/STEP:2.10.0">STEP</Link> or{' '}
        <Link href="https://wiki.nexusmods.com/index.php/User:Darkladylexy/Lexys_LOTD_SE">
          Lexys LOTD SE Mod Guide
        </Link>
        . Tells the user what, when and how to download mods to reproduce the
        setup of the guide author. Depending on the depth of the guide, this
        process not only takes a very long time but is very error prone if the
        user does not read everything carefully.
      </Typography>
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        Modlist (Wabbajack)
      </Typography>
      <Typography variant="body1">
        A Modlist produced by Wabbajack is a set of instructions on how to
        reproduce an entire setup without including mod files or without having
        the user read a master thesis on how mod Skyrim. A list of all possible
        instructions can be viewed{' '}
        <Link href="https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Lib/Data.cs">
          here
        </Link>{' '}
        (instructions are internally called Directives).
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
        To compile a Modlist, Wabbajack needs either an MO2 or Vortex
        installation. We have separate compilers for both of them but the
        general procedure is the same: <br />
        Wabbajack starts by indexing <b>everything</b>: your game, downloads and
        installation folder. Using information provided by the modlist author,
        Wabbajack tries to find out where every file came from. We support
        different sites like Nexus Mods, ModDB, LoversLab, Steam Workshop Items
        and{' '}
        <Link href="https://github.com/wabbajack-tools/wabbajack/tree/master/Wabbajack.Lib/Downloaders">
          more
        </Link>
        . After Wabbajack gathered information about every file and found no
        issues like missing information, it runs every file through a{' '}
        <i>Compilation Stack</i>.<br />
        The Compilation Stack is a collection of Steps that try to create a
        Directive for every file. Taking a look at the{' '}
        <Link href="https://github.com/wabbajack-tools/wabbajack/blob/master/Wabbajack.Lib/MO2Compiler.cs#L496">
          MO2 Stack
        </Link>{' '}
        we can see that log or cache files get ignored. A list of all
        Compilation Steps can be found{' '}
        <Link href="https://github.com/wabbajack-tools/wabbajack/tree/master/Wabbajack.Lib/CompilationSteps">
          here
        </Link>
        .<br />
        After we ran every file through the stack we look for files that had no
        match. Compilation is stopped if we find duplicates or missing files.
        The last steps are about validating the archives to see if they exist
        and are available to download.
      </Typography>
      {/* INSTALLATION */}
      <Typography variant="subtitle1" style={{ marginTop: '8px' }}>
        Installation
      </Typography>
      <Typography variant="body1">
        Wabbajack is made to be a one click installer: you start Wabbajack, load
        the Modlist and hit Install. Like with Compilation, we start by hashing
        every file. If the user has already downloaded the needed archives than
        we can skip doing that again, but if they are missing some than
        Wabbajack will download those archives for them. This requires a Nexus
        Premium Account since the API for getting download links only works for
        premium users. <br />
        After downloading, Wabbajack starts going through all Directives within
        the Modlist and installs the files according to the instructions of
        those Directives.
      </Typography>
    </Container>
  );
}
