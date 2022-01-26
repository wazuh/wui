/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  FunctionComponent,
  Fragment,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { WuiTitle, WuiTitleSize } from '../title/title';
import { WuiFlexGroup, WuiFlexItem } from '../flex';
import { WuiSpacer } from '../spacer';
import { WuiIcon, IconColor, IconType } from '../icon/icon';
import { WuiText, EuiTextColor } from '../text';

export type WuiEmptyPromptProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    iconType?: IconType;
    iconColor?: IconColor;
    title?: ReactElement<any>;
    titleSize?: WuiTitleSize;
    body?: ReactNode;
    actions?: ReactNode;
  };

export const WuiEmptyPrompt: FunctionComponent<WuiEmptyPromptProps> = ({
  iconType,
  iconColor = 'subdued',
  title,
  titleSize = 'm',
  body,
  actions,
  className,
  ...rest
}) => {
  const classes = classNames('wuiEmptyPrompt', className);

  let icon;

  if (iconType) {
    icon = (
      <Fragment>
        <WuiIcon type={iconType} size="xxl" color={iconColor} />
        <WuiSpacer size="s" />
      </Fragment>
    );
  }

  let content;

  if (body || title) {
    let titleEl;

    if (title) {
      titleEl = (
        <Fragment>
          <WuiTitle size={titleSize}>{title}</WuiTitle>
          <WuiSpacer size="m" />
        </Fragment>
      );
    }

    let bodyEl;

    if (body) {
      bodyEl = (
        <Fragment>
          <WuiText>{body}</WuiText>
        </Fragment>
      );
    }

    content = (
      <EuiTextColor color="subdued">
        {titleEl}
        {bodyEl}
      </EuiTextColor>
    );
  }

  let actionsEl;

  if (actions) {
    let actionsRow;

    if (Array.isArray(actions)) {
      actionsRow = (
        <WuiFlexGroup
          gutterSize="m"
          alignItems="center"
          justifyContent="center"
          direction="column">
          {actions.map((action, index) => (
            <WuiFlexItem key={index} grow={false}>
              {action}
            </WuiFlexItem>
          ))}
        </WuiFlexGroup>
      );
    } else {
      actionsRow = actions;
    }

    actionsEl = (
      <Fragment>
        <WuiSpacer size="s" />
        {actionsRow}
      </Fragment>
    );
  }

  return (
    <div className={classes} {...rest}>
      {icon}
      {content}
      {body && actions && <WuiSpacer size="l" />}
      {actionsEl}
    </div>
  );
};
