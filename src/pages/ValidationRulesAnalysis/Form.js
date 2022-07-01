import i18n from '@dhis2/d2-i18n'
import { Button, Checkbox, CircularLoader } from '@dhis2/ui'
import { DatePicker } from '../../components/DatePicker/DatePicker.js'
import PropTypes from 'prop-types'
import React from 'react'
import AvailableOrganisationUnitsTree from '../../components/AvailableOrganisationUnitsTree/AvailableOrganisationUnitsTree.js'
import cssPageStyles from '../Page.module.css'
import jsPageStyles from '../PageStyles.js'
import styles from './Form.module.css'
import ValidationRuleGroupsSelect from './ValidationRuleGroupsSelect.js'
import { useConfig } from '@dhis2/app-runtime'

const Form = ({
    onSubmit,
    valid,
    loading,
    onOrganisationUnitChange,
    startDate,
    onStartDateChange,
    endDate,
    onEndDateChange,
    onValidationRuleGroupChange,
    sendNotfications,
    onSendNotificationsChange,
    persistNewResults,
    onPersistNewResultsChange,
}) => {

    const { baseUrl, systemInfo } = useConfig()
    return (<>
        <div className="row">
            <div className="col-sm-12 col-md-6">
                <div className={cssPageStyles.formLabel}>
                    {i18n.t('Parent organisation unit')}
                </div>
                <AvailableOrganisationUnitsTree
                    onChange={onOrganisationUnitChange}
                />
            </div>
            <div className="col-sm-12 col-md-6">
                <DatePicker
                    calendar={systemInfo.calendar}
                    textFieldStyle={jsPageStyles.inputForm}
                    floatingLabelText={i18n.t('Start Date')}
                    onChange={onStartDateChange}
                    value={startDate}
                    defaultDate={new Date()}
                    endDate={endDate}
                />
                <DatePicker
                    calendar={systemInfo.calendar}
                    textFieldStyle={jsPageStyles.inputForm}
                    floatingLabelText={i18n.t('End Date')}
                    onChange={onEndDateChange}
                    value={endDate}
                    defaultDate={new Date()}
                    startDate={startDate}
                />
                <div>
                    <ValidationRuleGroupsSelect
                        onChange={onValidationRuleGroupChange}
                    />
                </div>
                <div className={styles.checkboxes}>
                    <Checkbox
                        label={i18n.t('Send Notifications')}
                        checked={sendNotfications}
                        onChange={onSendNotificationsChange}
                    />
                    <Checkbox
                        label={i18n.t('Persist new results')}
                        checked={persistNewResults}
                        onChange={onPersistNewResultsChange}
                    />
                </div>
            </div>
        </div>
        <Button
            primary
            className={cssPageStyles.mainButton}
            disabled={!valid || loading}
            onClick={onSubmit}
        >
            {loading ? (
                <>
                    {i18n.t('Validating...')}
                    <CircularLoader small />
                </>
            ) : (
                i18n.t('Validate')
            )}
        </Button>
    </>
    )
}

Form.propTypes = {
    endDate: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    persistNewResults: PropTypes.bool.isRequired,
    sendNotfications: PropTypes.bool.isRequired,
    startDate: PropTypes.object.isRequired,
    valid: PropTypes.bool.isRequired,
    onEndDateChange: PropTypes.func.isRequired,
    onOrganisationUnitChange: PropTypes.func.isRequired,
    onPersistNewResultsChange: PropTypes.func.isRequired,
    onSendNotificationsChange: PropTypes.func.isRequired,
    onStartDateChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onValidationRuleGroupChange: PropTypes.func.isRequired,
}

export default Form
