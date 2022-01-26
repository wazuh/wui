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
  LabelHTMLAttributes,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';
import { CommonProps, ExclusiveUnion } from '../../common';

interface WuiFormLabelCommonProps {
  isFocused?: boolean;
  isInvalid?: boolean;
  /**
   * Default type is a `label` but can be changed to a `legend`
   * if using inside a `fieldset`.
   */
  type?: 'label' | 'legend';
}

type LabelProps = {
  type?: 'label';
} & WuiFormLabelCommonProps &
  LabelHTMLAttributes<HTMLLabelElement>;

type LegendProps = {
  type: 'legend';
} & WuiFormLabelCommonProps &
  HTMLAttributes<HTMLLegendElement>;

export type WuiFormLabelProps = CommonProps &
  ExclusiveUnion<LabelProps, LegendProps>;

export const WuiFormLabel: FunctionComponent<WuiFormLabelProps> = ({
  type = 'label',
  isFocused,
  isInvalid,
  children,
  className,
  ...rest
}: WuiFormLabelProps) => {
  const classes = classNames('wuiFormLabel', className, {
    'wuiFormLabel-isFocused': isFocused,
    'wuiFormLabel-isInvalid': isInvalid,
  });

  if (type === 'legend') {
    return (
      <legend
        className={classes}
        {...(rest as HTMLAttributes<HTMLLegendElement>)}>
        {children}
      </legend>
    );
  } else {
    return (
      <label
        className={classes}
        {...(rest as LabelHTMLAttributes<HTMLLabelElement>)}>
        {children}
      </label>
    );
  }
};
