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

import React, { FunctionComponent, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';

import { WuiFlexGroup, WuiFlexItem } from '../../flex';
import { htmlIdGenerator } from '../../../services';

export type WuiHeaderAlertProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    /**
     * Adds a link to the alert.
     */
    action?: ReactNode;
    date: ReactNode;
    text?: ReactNode;
    title: ReactNode;
    /**
     * Accepts an `WuiBadge` that displays on the alert
     */
    badge?: ReactNode;
  };

export const WuiHeaderAlert: FunctionComponent<WuiHeaderAlertProps> = ({
  action,
  className,
  date,
  text,
  title,
  badge,
  ...rest
}) => {
  const classes = classNames('wuiHeaderAlert', className);

  const ariaId = htmlIdGenerator()();

  return (
    <article aria-labelledby={`${ariaId}-title`} className={classes} {...rest}>
      <WuiFlexGroup justifyContent="spaceBetween">
        <WuiFlexItem>
          <div className="wuiHeaderAlert__date">{date}</div>
        </WuiFlexItem>
        {badge && <WuiFlexItem grow={false}>{badge}</WuiFlexItem>}
      </WuiFlexGroup>

      <h3 id={`${ariaId}-title`} className="wuiHeaderAlert__title">
        {title}
      </h3>
      <div className="wuiHeaderAlert__text">{text}</div>
      {action && <div className="wuiHeaderAlert__action wuiLink">{action}</div>}
    </article>
  );
};
