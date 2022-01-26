import React from 'react';

import { WuiCallOut, WuiLink, WuiSpacer } from '../../../../src/components';

export default () => (
  <div>
    <WuiCallOut
      title="Check it out, here's a really long title that will wrap within a narrower browser"
      iconType="search">
      <p>
        Here&rsquo;s some stuff that you need to know. We can make this text
        really long so that, when viewed within a browser that&rsquo;s fairly
        narrow, it will wrap, too.
      </p>
      <p>
        And some other stuff on another line, just for kicks. And{' '}
        <WuiLink href="#">here&rsquo;s a link</WuiLink>.
      </p>
    </WuiCallOut>

    <WuiSpacer size="m" />

    <WuiCallOut
      title="Callouts can exist as just a title. Simply omit the child content."
      iconType="gear"
    />

    <WuiSpacer size="m" />

    <WuiCallOut
      size="s"
      title="This is a small callout for more unintrusive but constant messages."
      iconType="pin"
    />
  </div>
);
