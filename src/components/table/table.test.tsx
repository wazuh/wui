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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { WuiTable } from './table';
import { WuiTableRow } from './table_row';
import { WuiTableRowCell } from './table_row_cell';
import { WuiTableBody } from './table_body';
import { WuiTableHeader } from './table_header';
import { WuiTableHeaderCell } from './table_header_cell';

test('renders WuiTable', () => {
  const component = (
    <WuiTable {...requiredProps}>
      <WuiTableHeader>
        <WuiTableHeaderCell>Hi Title</WuiTableHeaderCell>
        <WuiTableHeaderCell>Bye Title</WuiTableHeaderCell>
      </WuiTableHeader>
      <WuiTableBody>
        <WuiTableRow>
          <WuiTableRowCell>Hi</WuiTableRowCell>
        </WuiTableRow>
        <WuiTableRow>
          <WuiTableRowCell>Bye</WuiTableRowCell>
        </WuiTableRow>
      </WuiTableBody>
    </WuiTable>
  );
  expect(render(component)).toMatchSnapshot();
});
