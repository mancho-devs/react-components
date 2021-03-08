/* External dependencies */
import { useStaticQuery } from 'gatsby';
import React from 'react';
import renderer from 'react-test-renderer';

/* Local dependencies */
import Footer from '../';

describe('Footer', () => {
  beforeEach(() => {
    useStaticQuery.mockImplementationOnce(() => ({
      site: {
        siteMetadata: {
          companyName: 'Company'
        }
      }
    }));
  });

  it('renders correctly', () => {
    const component = renderer.create(<Footer />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
