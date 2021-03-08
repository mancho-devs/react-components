/* External dependencies */
import { Text } from 'atomize';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

export default function Footer() {
  const { site } = useStaticQuery(query);
  const textMargin = {
    b: '1rem',
    t: '1rem',
  };

  const copy = `© ${site.siteMetadata.companyName}. Все права защищены.`;

  return (
    <Text m={textMargin}>{copy}</Text>
  );
}

const query = graphql`
  query Footer {
    site {
      siteMetadata {
        companyName
      }
    }
  }
`;
