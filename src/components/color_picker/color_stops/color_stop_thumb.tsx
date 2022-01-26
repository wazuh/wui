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
  ReactChild,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../../common';
import {
  getPositionFromStop,
  getStopFromMouseLocation,
  isColorInvalid,
  isStopInvalid,
} from './utils';
import { useMouseMove, getChromaColor } from '../utils';
import { keys } from '../../../services';

import { WuiButtonIcon } from '../../button';
import { WuiColorPicker, WuiColorPickerProps } from '../color_picker';
import { WuiFlexGroup, WuiFlexItem } from '../../flex';
import { WuiFieldNumber, WuiFormRow } from '../../form';
import { WuiI18n } from '../../i18n';
import { WuiPopover } from '../../popover';
import { WuiScreenReaderOnly } from '../../accessibility';
import { WuiSpacer } from '../../spacer';
import { WuiRangeThumb } from '../../form/range/range_thumb';

export interface ColorStop {
  stop: number;
  color: string;
}

interface WuiColorStopThumbProps extends CommonProps, ColorStop {
  className?: string;
  onChange: (colorStop: ColorStop) => void;
  onFocus?: () => void;
  onRemove?: () => void;
  globalMin: number;
  globalMax: number;
  localMin: number;
  localMax: number;
  min?: number;
  max?: number;
  isRangeMin?: boolean;
  isRangeMax?: boolean;
  parentRef?: HTMLDivElement | null;
  colorPickerMode: WuiColorPickerProps['mode'];
  colorPickerShowAlpha?: WuiColorPickerProps['showAlpha'];
  colorPickerSwatches?: WuiColorPickerProps['swatches'];
  disabled?: boolean;
  readOnly?: boolean;
  isPopoverOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  'data-index'?: string;
  'aria-valuetext'?: string;
}

export const WuiColorStopThumb: FunctionComponent<WuiColorStopThumbProps> = ({
  className,
  stop,
  color,
  onChange,
  onFocus,
  onRemove,
  globalMin,
  globalMax,
  localMin,
  localMax,
  min,
  max,
  isRangeMin = false,
  isRangeMax = false,
  parentRef,
  colorPickerMode,
  colorPickerShowAlpha,
  colorPickerSwatches,
  disabled,
  readOnly,
  isPopoverOpen,
  openPopover,
  closePopover,
  'data-index': dataIndex,
  'aria-valuetext': ariaValueText,
}) => {
  const background = useMemo(() => {
    const chromaColor = getChromaColor(color, colorPickerShowAlpha);
    return chromaColor ? chromaColor.css() : undefined;
  }, [color, colorPickerShowAlpha]);
  const [hasFocus, setHasFocus] = useState(isPopoverOpen);
  const [colorIsInvalid, setColorIsInvalid] = useState(
    isColorInvalid(color, colorPickerShowAlpha)
  );
  const [stopIsInvalid, setStopIsInvalid] = useState(isStopInvalid(stop));
  const [numberInputRef, setNumberInputRef] = useState();
  const popoverRef = useRef<WuiPopover>(null);

  useEffect(() => {
    if (isPopoverOpen && popoverRef && popoverRef.current) {
      popoverRef.current.positionPopoverFixed();
    }
  }, [isPopoverOpen, stop]);

  const getStopFromMouseLocationFn = (location: { x: number; y: number }) => {
    // Guard against `null` ref in usage
    return getStopFromMouseLocation(location, parentRef!, globalMin, globalMax);
  };

  const getPositionFromStopFn = (stop: ColorStop['stop']) => {
    // Guard against `null` ref in usage
    return getPositionFromStop(stop, parentRef!, globalMin, globalMax);
  };

  const handleOnRemove = () => {
    if (onRemove) {
      closePopover();
      onRemove();
    }
  };

  const handleFocus = () => {
    setHasFocus(true);
    if (onFocus) {
      onFocus();
    }
  };

  const setHasFocusTrue = () => setHasFocus(true);
  const setHasFocusFalse = () => setHasFocus(false);

  const handleColorChange = (value: ColorStop['color']) => {
    setColorIsInvalid(isColorInvalid(value, colorPickerShowAlpha));
    onChange({ stop, color: value });
  };

  const handleStopChange = (value: ColorStop['stop']) => {
    const willBeInvalid = value > localMax || value < localMin;

    if (willBeInvalid) {
      if (value > localMax) {
        value = localMax;
      }
      if (value < localMin) {
        value = localMin;
      }
    }
    setStopIsInvalid(isStopInvalid(value));
    onChange({ stop: value, color });
  };

  const handleStopInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);

    const willBeInvalid = value > globalMax || value < globalMin;

    if (willBeInvalid) {
      if (value > globalMax && max != null) {
        value = globalMax;
      }
      if (value < globalMin && min != null) {
        value = globalMin;
      }
    }

    setStopIsInvalid(isStopInvalid(value));
    onChange({ stop: value, color });
  };

  const handlePointerChange = (
    location: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    if (isFirstInteraction) return; // Prevents change on the initial MouseDown event
    if (parentRef == null) {
      return;
    }
    const newStop = getStopFromMouseLocationFn(location);
    handleStopChange(newStop);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case keys.ENTER:
        event.preventDefault();
        openPopover();
        break;

      case keys.ARROW_LEFT:
        event.preventDefault();
        if (readOnly) return;
        handleStopChange(stop - 1);
        break;

      case keys.ARROW_RIGHT:
        event.preventDefault();
        if (readOnly) return;
        handleStopChange(stop + 1);
        break;
    }
  };

  const [handleMouseDown, handleInteraction] = useMouseMove<HTMLButtonElement>(
    handlePointerChange
  );

  const handleOnMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!readOnly) {
      handleMouseDown(e);
    }
    openPopover();
  };

  const handleTouchInteraction = (e: React.TouchEvent<HTMLButtonElement>) => {
    if (!readOnly) {
      handleInteraction(e);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    handleTouchInteraction(e);
    openPopover();
  };

  const classes = classNames(
    'wuiColorStopPopover',
    {
      'wuiColorStopPopover-hasFocus': hasFocus || isPopoverOpen,
    },
    className
  );

  // console.log('render', stop);

  return (
    <WuiPopover
      ref={popoverRef}
      className={classes}
      anchorClassName="wuiColorStopPopover__anchor"
      panelPaddingSize="s"
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      ownFocus={isPopoverOpen}
      initialFocus={numberInputRef}
      panelClassName={
        numberInputRef ? undefined : 'wuiColorStopPopover-isLoadingPanel'
      }
      style={{
        left: `${getPositionFromStopFn(stop)}%`,
      }}
      button={
        <WuiI18n
          tokens={[
            'wuiColorStopThumb.buttonAriaLabel',
            'wuiColorStopThumb.buttonTitle',
          ]}
          defaults={[
            'Press the Enter key to modify this stop. Press Escape to focus the group',
            'Click to edit, drag to reposition',
          ]}>
          {([buttonAriaLabel, buttonTitle]: ReactChild[]) => {
            const ariaLabel = buttonAriaLabel as string;
            const title = buttonTitle as string;
            return (
              <WuiRangeThumb
                data-test-subj="wuiColorStopThumb"
                data-index={dataIndex}
                min={localMin}
                max={localMax}
                value={stop}
                onFocus={handleFocus}
                onBlur={setHasFocusFalse}
                onMouseOver={setHasFocusTrue}
                onMouseOut={setHasFocusFalse}
                onKeyDown={handleKeyDown}
                onMouseDown={handleOnMouseDown}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchInteraction}
                aria-valuetext={ariaValueText}
                aria-label={ariaLabel}
                title={title}
                className="wuiColorStopThumb"
                tabIndex={-1}
                style={{
                  background,
                }}
                disabled={disabled}
              />
            );
          }}
        </WuiI18n>
      }>
      <div className="wuiColorStop" data-test-subj="wuiColorStopPopover">
        <WuiScreenReaderOnly>
          <p aria-live="polite">
            <WuiI18n
              token="wuiColorStopThumb.screenReaderAnnouncement"
              default="A popup with a color stop edit form opened.
            Tab forward to cycle through form controls or press
            escape to close this popup."
            />
          </p>
        </WuiScreenReaderOnly>
        <WuiFlexGroup gutterSize="s" responsive={false}>
          <WuiFlexItem>
            <WuiI18n
              tokens={[
                'wuiColorStopThumb.stopLabel',
                'wuiColorStopThumb.stopErrorMessage',
              ]}
              defaults={['Stop value', 'Value is out of range']}>
              {([stopLabel, stopErrorMessage]: React.ReactChild[]) => (
                <WuiFormRow
                  label={stopLabel}
                  display="rowCompressed"
                  isInvalid={stopIsInvalid}
                  error={stopIsInvalid ? stopErrorMessage : null}>
                  <WuiFieldNumber
                    inputRef={setNumberInputRef}
                    compressed={true}
                    readOnly={readOnly}
                    min={isRangeMin || min == null ? undefined : localMin}
                    max={isRangeMax || max == null ? undefined : localMax}
                    value={isStopInvalid(stop) ? '' : stop}
                    isInvalid={stopIsInvalid}
                    onChange={handleStopInputChange}
                  />
                </WuiFormRow>
              )}
            </WuiI18n>
          </WuiFlexItem>
          {!readOnly && (
            <WuiFlexItem grow={false}>
              <WuiFormRow display="rowCompressed" hasEmptyLabelSpace={true}>
                <WuiI18n
                  token="wuiColorStopThumb.removeLabel"
                  default="Remove this stop">
                  {(removeLabel: string) => (
                    <WuiButtonIcon
                      iconType="trash"
                      color="danger"
                      aria-label={removeLabel}
                      title={removeLabel}
                      disabled={!onRemove}
                      onClick={handleOnRemove}
                    />
                  )}
                </WuiI18n>
              </WuiFormRow>
            </WuiFlexItem>
          )}
        </WuiFlexGroup>
        {!readOnly && <WuiSpacer size="s" />}
        <WuiColorPicker
          readOnly={readOnly}
          onChange={handleColorChange}
          color={color}
          mode={readOnly ? 'secondaryInput' : colorPickerMode}
          swatches={colorPickerSwatches}
          display="inline"
          showAlpha={colorPickerShowAlpha}
          isInvalid={colorIsInvalid}
          secondaryInputDisplay={
            colorPickerMode === 'swatch' ? 'none' : 'bottom'
          }
        />
      </div>
    </WuiPopover>
  );
};
