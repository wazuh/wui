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
import { CommonProps } from '../common';
import classNames from 'classnames';

import { WuiStepProps, WuiStep } from './step';

export type WuiContainedStepProps = Omit<WuiStepProps, 'step'>;

export interface WuiStepsProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  /**
   * An array of `WuiStep` objects excluding the `step` prop
   */
  steps: WuiContainedStepProps[];
  /**
   * The number the steps should begin from
   */
  firstStepNumber?: number;
  /**
   * The HTML tag used for the title
   */
  headingElement?: string;
  /**
   * Title sizing equivalent to WuiTitle, but only `m`, `s` and `xs`. Defaults to `s`
   */
  titleSize?: WuiStepProps['titleSize'];
}

function renderSteps(
  steps: WuiContainedStepProps[],
  firstStepNumber: number,
  headingElement: string,
  titleSize?: WuiStepProps['titleSize']
) {
  return steps.map((step, index) => {
    const { className, children, title, status, ...rest } = step;

    return (
      <WuiStep
        className={className}
        key={index}
        headingElement={headingElement}
        step={firstStepNumber + index}
        title={title}
        titleSize={titleSize}
        status={status}
        {...rest}>
        {children}
      </WuiStep>
    );
  });
}

export const WuiSteps: FunctionComponent<WuiStepsProps> = ({
  className,
  firstStepNumber = 1,
  headingElement = 'p',
  titleSize,
  steps,
  ...rest
}) => {
  const classes = classNames('wuiSteps', className);

  return (
    <div className={classes} {...rest}>
      {renderSteps(steps, firstStepNumber, headingElement, titleSize)}
    </div>
  );
};
