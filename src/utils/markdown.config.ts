import * as React from 'react';
import { MarkdownOptions, ComponentOverride } from 'markdown-to-jsx';
import { Typography, Link } from '@material-ui/core';
import { getGitHubLinkFromRaw } from './other';

const h4: ComponentOverride = {
  component: Typography,
  props: {
    variant: 'h4',
    style: {
      marginTop: '8px',
      marginBottom: '8px',
    },
  },
};

const h5: ComponentOverride = {
  component: Typography,
  props: {
    variant: 'h5',
    style: {
      marginTop: '4px',
      marginBottom: '4px',
    },
  },
};

const options = (
  baseURL?: string | undefined,
  externalURL?: string | undefined
): MarkdownOptions => {
  return {
    overrides: {
      h1: h4,
      h2: h4,
      h3: h5,
      h4: h5,
      h5,
      h6: {
        component: Typography,
        props: {
          variant: 'h6',
        },
      },
      p: {
        component: Typography,
        props: {
          variant: 'body2',
        },
      },
      a: {
        component: Link,
      },
      img: {
        component: 'img',
        props: {
          style: {
            width: '100%',
            marginTop: '8px',
            marginBottom: '8px',
          },
        },
      },
    },
    createElement(type, props, children) {
      if (type === 'img') {
        const anyProps = props as any;
        if (anyProps.src === undefined)
          return React.createElement(type, props, children);

        if (externalURL === undefined)
          return React.createElement(type, props, children);
        console.log(externalURL);
        const src = anyProps.src as string;
        console.log(src);
        const split = externalURL.split('/');
        const url = externalURL.replace(split[split.length - 1], '');
        anyProps.src = `${url}${src}`;
        return React.createElement(type, anyProps, children);
      }

      const anyType = type as any;
      if (anyType.options === undefined)
        return React.createElement(type, props, children);
      if (anyType.options.name === undefined)
        return React.createElement(type, props, children);

      const name = anyType.options.name as string;
      if (name !== 'MuiLink') return React.createElement(type, props, children);

      const anyProps = props as any;
      if (anyProps.href === undefined)
        return React.createElement(type, props, children);

      let href = anyProps.href as string;
      if (href.startsWith('#')) {
        if (baseURL === undefined)
          return React.createElement(type, props, children);

        anyProps.href = `${baseURL}${href}`;
      } else if (href.endsWith('.md') && !href.startsWith('http')) {
        if (externalURL === undefined)
          return React.createElement(type, props, children);

        if (externalURL.startsWith('https://raw.githubusercontent.com')) {
          anyProps.href = `${getGitHubLinkFromRaw(externalURL)}${href}`;
        }
      }

      return React.createElement(type, anyProps, children);
    },
  };
};

export default options;
