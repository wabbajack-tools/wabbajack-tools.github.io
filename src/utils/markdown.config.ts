import * as React from 'react';
import { MarkdownOptions, ComponentOverride } from 'markdown-to-jsx';
import { Typography, Link } from '@material-ui/core';
import { getGitHubLinkFromRaw } from './other';
import { getGitLabLinkFromRaw } from './other';
import { CSSProperties } from '@material-ui/core/styles/withStyles';

const headingStyle: CSSProperties = {
  marginTop: '24px',
  marginBottom: '16px',
  fontWeight: 600,
  lineHeight: '1.25',
};

const topHeadingStyle: CSSProperties = {
  paddingBottom: '.3em',
  borderBottom: '1px solid #eaecef',
};

const options = (
  baseURL?: string | undefined,
  externalURL?: string | undefined
): MarkdownOptions => {
  return {
    overrides: {
      h1: {
        component: 'h1',
        props: {
          variant: 'h1',
          style: {
            ...headingStyle,
            ...topHeadingStyle,
            fontSize: '2em',
            marginTop: '0 !important',
          },
        },
      },
      h2: {
        component: 'h2',
        props: {
          variant: 'h2',
          style: {
            ...headingStyle,
            ...topHeadingStyle,
            fontSize: '1.5em',
          },
        },
      },
      h3: {
        component: 'h3',
        props: {
          variant: 'h3',
          style: {
            ...headingStyle,
            fontSize: '1.25em',
          },
        },
      },
      h4: {
        component: 'h4',
        props: {
          variant: 'h4',
          style: {
            ...headingStyle,
            fontSize: '1em',
            textAlign: 'initial',
          },
        },
      },
      p: {
        component: Typography,
        props: {
          variant: 'body2',
          style: {
            marginTop: '0',
            marginBottom: '16px',
            fontSize: '16px',
            lineHeight: '1.5',
            wordWrap: 'break-word',
          },
        },
      },
      /*a: {
        component: Link,
      },*/
      img: {
        component: 'img',
        props: {
          style: {
            //width: '100%',
            maxWidth: '100%',
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

        const src = anyProps.src as string;
        if (src.startsWith('https://' || src.startsWith('http://')))
          return React.createElement(type, props, children);
        //console.log(`src: ${src}`);
        //console.log(`externalURL: ${externalURL}`);
        const split = externalURL.split('/');
        const url = externalURL.replace(split[split.length - 1], '');
        anyProps.src = `${url}${src}`;
        //console.log(`final src: ${anyProps.src}`);

        return React.createElement(type, anyProps, children);
      }

      const anyProps = props as any;

      if (
        type === 'h1' ||
        type == 'h2' ||
        type == 'h3' ||
        type == 'h4' ||
        type == 'h5' ||
        type == 'h6'
      ) {
        return React.createElement(Typography, props, children);
      }

      if (type !== 'a') return React.createElement(type, props, children);

      /*const anyType = type as any;
      if (anyType.options === undefined)
        return React.createElement(type, props, children);
      if (anyType.options.name === undefined)
        return React.createElement(type, props, children);

      const name = anyType.options.name as string;
      if (name !== 'MuiLink') return React.createElement(type, props, children);*/

      if (anyProps.href === undefined)
        return React.createElement(type, props, children);

      let href = anyProps.href as string;
      if (href.startsWith('#')) {
        const linkProps: React.LinkHTMLAttributes<HTMLLinkElement> = {
          href: `${baseURL}${href}`,
          onClick: (event) => {
            event.preventDefault();
            const element = document.getElementById(href.slice(1));
            if (element == null) return;
            element.scrollIntoView();
          },
        };
        return React.createElement('a', linkProps, children);
      } else if (href.endsWith('.md') && !href.startsWith('http')) {
        if (externalURL === undefined)
          return React.createElement(type, props, children);

        if (externalURL.startsWith('https://raw.githubusercontent.com')) {
          anyProps.href = `${getGitHubLinkFromRaw(externalURL)}${href}`;
        }
		
		else if (externalURL.startsWith('https://gitlab.com')) {
			anyProps.href = `${getGitLabLinkFromRaw(externalURL)}${href}`;
		}
      }

      return React.createElement(type, anyProps, children);
    },
  };
};

export default options;
