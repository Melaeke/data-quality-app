/* eslint-disable */
/* React and Enzyme */
import React from 'react';
import { shallow } from 'enzyme';

/* Material UI */
import { RaisedButton, IconButton } from 'material-ui';
import DatePicker from 'material-ui/DatePicker';

/* React components */
import MinMaxOutlierAnalysis from './MinMaxOutlierAnalysis';
import OutlierAnalyisTable from '../../components/outlier-analysis-table/OutlierAnalysisTable';
import AvailableDatasetsSelect from '../../components/available-datasets-select/AvailableDatasetsSelect';
import AvailableOrganisationUnitsTree from "../../components/available-organisation-units-tree/AvailableOrganisationUnitsTree";

/* helpers */
import { i18nKeys } from '../../i18n';

import {
  sections,
  MIN_MAX_OUTLIER_ANALYSIS_SECTION_KEY,
} from '../sections.conf';

let pageInfo = {};
for(let i = 0; i < sections.length; i++) {
  const section = sections[i];
  if (section.key === MIN_MAX_OUTLIER_ANALYSIS_SECTION_KEY) {
    pageInfo = section.info;
    break;
  }
}

const ownShallow = () => {
  return shallow(
      <MinMaxOutlierAnalysis
          sectionKey={MIN_MAX_OUTLIER_ANALYSIS_SECTION_KEY}
          pageInfo={pageInfo}
      />,
      {
        context: {
          updateAppState: jest.fn(),
          translator: (key) => key,
        },
        disableLifecycleMethods: true
      }
  );
};

/* Mocks */
jest.mock('d2-ui/lib/org-unit-tree/OrgUnitTree.component', () => ('OrgUnitTree'));
jest.mock('d2-ui/lib/feedback-snackbar/FeedbackSnackbarTypes', () => ('FeedbackSnackbarTypes'));

describe('Test <MinMaxOutlierAnalysis /> rendering:', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = ownShallow();
  });

  it('Min Max Outlier Analysis renders without crashing', () => {
    ownShallow();
  });

  it('Should show correct title.', () =>{
    expect(wrapper.find('h1')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toBe(`<IconButton />${i18nKeys.minMaxOutlierAnalysis.header}<PageHelper />`);
  });

  it('Min Max Outlier Analysis renders a OutlierAnalyisTable', () => {
    expect(wrapper.find(OutlierAnalyisTable)).toHaveLength(1);
  });

  it('Min Max Outlier Analysis renders a RaisedButton', () => {
    expect(wrapper.find(RaisedButton)).toHaveLength(1);
  });

  it('Min Max Outlier Analysis renders am IconButton', () => {
    expect(wrapper.find(IconButton)).toHaveLength(1);
  });

  it('Renders a "Start Date" - DatePicker.', () => {
    expect(wrapper.find(DatePicker).at(0).props().floatingLabelText).toBe(i18nKeys.minMaxOutlierAnalysis.form.startDate);
  });

  it('Renders a "End Date" - DatePicker.', () => {
    expect(wrapper.find(DatePicker).at(1).props().floatingLabelText).toBe(i18nKeys.minMaxOutlierAnalysis.form.endDate);
  });

  it('Should render a disabled action button.', () => {
    wrapper.setState({
      organisationUnitId: null,
      startDate: new Date(),
      endDate: new Date(),
    });
    expect(wrapper.find(RaisedButton)).toHaveLength(1);
    expect(wrapper.find(RaisedButton).props().disabled).toBeTruthy();
    expect(wrapper.instance().isActionDisabled()).toBeTruthy();
  });

  it('Should render an active action button.', () => {
    wrapper.setState({
      organisationUnitId: 'TestOrganisationUnitId',
      dataSetIds: ['TestDataSetId'],
      startDate: new Date(),
      endDate: new Date(),
    });
    expect(wrapper.find(RaisedButton)).toHaveLength(1);
    expect(wrapper.find(RaisedButton).props().disabled).toBeFalsy();
    expect(wrapper.instance().isActionDisabled()).toBeFalsy();
  });

  it('Should not show "OutlierAnalyisTable" component when showTable is false.', () => {
    wrapper.setState({
      showTable: false,
    });
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(IconButton).props().style.display).toBe('none');
    expect(wrapper.find(OutlierAnalyisTable)).toHaveLength(1);
    expect(wrapper.find(OutlierAnalyisTable).parent().props().style.display).toBe('none');
  });

  it('Should show "OutlierAnalyisTable" component and back icon when showTable is true.', () => {
    wrapper.setState({
      showTable: true,
    });
    expect(wrapper.find(IconButton)).toHaveLength(1);
    expect(wrapper.find(IconButton).props().style.display).toBe('inline');
    expect(wrapper.find(OutlierAnalyisTable)).toHaveLength(1);
    expect(wrapper.find(OutlierAnalyisTable).parent().props().style.display).toBe('block');
  });
});

describe('Test <MinMaxOutlierAnalysis /> actions:', () => {

  it('Should call organisationUnitOnChange function when Available Organisation Units Tree changes.', () => {
    const spy = spyOn(MinMaxOutlierAnalysis.prototype, 'organisationUnitOnChange').and.callThrough();
    const wrapper = ownShallow();
    wrapper.setState({
      organisationUnitId: null,
    });
    wrapper.find(AvailableOrganisationUnitsTree).simulate('change', 'TestOrganisationUnitId');
    expect(spy).toHaveBeenCalledWith('TestOrganisationUnitId');
    expect(wrapper.state('organisationUnitId')).toBe('TestOrganisationUnitId');
  });

  it('Should call startDateOnChange function when Start Date DatePicker changes.', () => {
    const spy = spyOn(MinMaxOutlierAnalysis.prototype, 'startDateOnChange').and.callThrough();
    const wrapper = ownShallow();
    const testStartDate  = new Date();
    wrapper.setState({
      startDate: null,
    });
    wrapper.find(DatePicker).at(0).simulate('change', null, testStartDate);
    expect(spy).toHaveBeenCalledWith(null, testStartDate);
    expect(wrapper.state('startDate')).toMatchObject(testStartDate);
  });

  it('Should call endDateOnChange function when End Date DatePicker changes.', () => {
    const spy = spyOn(MinMaxOutlierAnalysis.prototype, 'endDateOnChange').and.callThrough();
    const wrapper = ownShallow();
    const testEndDate  = new Date();
    wrapper.setState({
      endDate: null,
    });
    wrapper.find(DatePicker).at(1).simulate('change', null, testEndDate);
    expect(spy).toHaveBeenCalledWith(null, testEndDate);
    expect(wrapper.state('endDate')).toMatchObject(testEndDate);
  });

  it('Should call dataSetsOnChange function when AvailableDatasetsSelect changes.', () => {
    const spy = spyOn(MinMaxOutlierAnalysis.prototype, 'dataSetsOnChange');
    const wrapper = ownShallow();
    wrapper.setState({
      dataSetIds: null,
    });
    wrapper.find(AvailableDatasetsSelect).at(0).simulate('change', null, null, ['TestDataSetId']);
    expect(spy).toHaveBeenCalled();
  });

  it('Min Max Outlier Analysis calls start method when RaisedButton is clicked', () => {
    const spy = spyOn(MinMaxOutlierAnalysis.prototype, 'start');
    const wrapper = ownShallow();
    wrapper.find(RaisedButton).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('Min Max Outlier Analysis calls back method when IconButton (back) is clicked', () => {
    const spy = spyOn(MinMaxOutlierAnalysis.prototype, 'back');
    const wrapper = ownShallow();
    wrapper.find(IconButton).simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('Min Max Outlier Analysis update state when back button is clicked', () => {
    const wrapper = ownShallow();
    wrapper.setState({showTable: true});
    wrapper.find(IconButton).simulate('click');
    expect(wrapper.state('showTable')).toBe(false);
  });

});
