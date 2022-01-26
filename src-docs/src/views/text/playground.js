import { PropTypes } from 'react-view';
import { WuiText, EuiTextColor } from '../../../../src/components/';
import { propUtilityForPlayground } from '../../services/playground';

export const textConfig = () => {
  const docgenInfo = Array.isArray(WuiText.__docgenInfo)
    ? WuiText.__docgenInfo[0]
    : WuiText.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: `<h1>This is Heading One</h1>
    <p>
      Far out in the uncharted backwaters of the <a href="#">unfashionable</a>{' '}
      end of the western spiral arm of the Galaxy lies a small unregarded
      yellow sun. When suddenly some wild JavaScript code appeared!{' '}
    </p>`,
    hidden: false,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'WuiText',
      props: propsToUse,
      scope: {
        WuiText,
      },
      imports: {
        '@wazuh/wui': {
          named: ['WuiText'],
        },
      },
    },
    setGhostBackground,
  };
};

export const textColorConfig = () => {
  const docgenInfo = Array.isArray(EuiTextColor.__docgenInfo)
    ? EuiTextColor.__docgenInfo[0]
    : EuiTextColor.__docgenInfo;
  const propsToUse = propUtilityForPlayground(docgenInfo.props);

  propsToUse.children = {
    type: PropTypes.ReactNode,
    value: '<h1>This is Heading One</h1>',
    hidden: false,
  };

  const setGhostBackground = {
    color: 'ghost',
  };

  return {
    config: {
      componentName: 'EuiTextColor',
      props: propsToUse,
      scope: {
        EuiTextColor,
      },
      imports: {
        '@wazuh/wui': {
          named: ['EuiTextColor'],
        },
      },
    },
    setGhostBackground,
  };
};
