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

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { WuiIcon, IconColor } from '../icon';

import { WuiFlexGroup, WuiFlexItem } from '../flex';

type WuiHealthProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    /**
     * Sets the color of the dot icon.
     * It accepts any `IconColor`: `default`, `primary`, `secondary`, `success`, `accent`, `warning`, `danger`, `text`,
     * `subdued` or `ghost`; or any valid CSS color value as a `string`
     */
    color?: IconColor;
  };

export const WuiHealth: FunctionComponent<WuiHealthProps> = ({
  children,
  className,
  color,
  ...rest
}) => {
  const classes = classNames('wuiHealth', className);

  return (
    <div className={classes} {...rest}>
      <WuiFlexGroup gutterSize="xs" alignItems="center" responsive={false}>
        <WuiFlexItem grow={false}>
          <WuiIcon type="dot" color={color} />
        </WuiFlexItem>
        <WuiFlexItem grow={false}>{children}</WuiFlexItem>
      </WuiFlexGroup>
    </div>
  );
};
