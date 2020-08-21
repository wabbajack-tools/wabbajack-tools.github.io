import * as React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import { useDropzone } from 'react-dropzone';

import ErrorDisplay from '../../../components/ErrorDisplay';
import ArchiveTable from '../../../components/ArchiveTable';

import { Typography } from '@material-ui/core';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { IModlist } from '../../../types/modlists';

const dragContainerStyle: CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: '2px',
  borderRadius: '2px',
  borderColor: '#03DAC6',
  borderStyle: 'dashed',
  backgroundColor: '#242424',
  color: '#FFFFFF',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const ManifestPage: React.FC = () => {
  const store = useLocalStore(() => {
    return {
      abort: false,
      error: false,
      badResult: false,
      finished: false,
      content: '',
    };
  });

  const onDrop = (acceptedFiles: any[]) => {
    if (acceptedFiles.length !== 1) {
      console.log(`Unacceptable file length: ${acceptedFiles.length}`);
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onabort = () => {
      console.log('File reading was aborted!');
      store.abort = true;
    };

    reader.onerror = () => {
      console.log('File reading has failed!');
      store.error = true;
    };

    reader.onload = () => {
      const result = reader.result;
      if (result === null) {
        console.log('Result is null!');
        store.badResult = true;
      }
      if (typeof result === 'string') {
        store.content = result;
        store.finished = true;
      } else {
        console.log('Result is not a string!');
        store.badResult = true;
        console.log(result);
      }
    };

    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    maxSize: 1000000,
    accept: '.json',
    multiple: false,
  });

  const dragAndDrop = useObserver(() => {
    if (store.finished) return undefined;
    return (
      <div style={dragContainerStyle} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>
            Drag 'n' drop the manifest file here, or click to select the file
          </p>
        )}
      </div>
    );
  });

  const errorList = useObserver(() => {
    if (store.finished) return undefined;
    if (store.abort) {
      return <ErrorDisplay message="File Reader aborted, check console log!" />;
    }
    if (store.error) {
      return (
        <ErrorDisplay message="File Reader encountered an error, check console log!" />
      );
    }
    if (store.badResult) {
      return <ErrorDisplay message="Contents from uploaded file are bad!" />;
    }
    return undefined;
  });

  const archiveTable = useObserver(() => {
    if (!store.finished) return undefined;

    const json = JSON.parse(store.content);
    if (json === undefined) {
      console.log(store.content);
      return (
        <ErrorDisplay message="Parsed contents are undefined! Check console log for contents." />
      );
    }
    if (json === null) {
      console.log(store.content);
      return (
        <ErrorDisplay message="Parsed contents are null! Check console log for contents." />
      );
    }
    const modlist = json as IModlist;

    return <ArchiveTable title={modlist.Name} archives={modlist.Archives} />;
  });

  return (
    <React.Fragment>
      <Typography variant="h4">Manifest Viewer</Typography>
      <Typography variant="body1">
        You can upload any Modlist Manifest and view the Modlist contents
        similar to the Archive Search from the Gallery.
      </Typography>
      {dragAndDrop}
      {errorList}
      {archiveTable}
    </React.Fragment>
  );
};

export default ManifestPage;
