import { useConfig } from '@dhis2/app-runtime'
import { useState } from 'react'
import { ethiopian } from '../../components/DatePicker/utils/ConstantEthoipian.js'
import { DateEthiopian } from '../../components/DatePicker/utils/DateEthiopian.js'
import threeMonthsAgo from '../../helpers/threeMonthsAgo.js'
import { ALL_VALIDATION_RULE_GROUPS_ID } from './ValidationRuleGroupsSelect.js'

const useFormState = () => {
    const { baseUrl, systemInfo } = useConfig()

    
    const [organisationUnitId, setOrganisationUnitId] = useState(null)
    const [startDate, setStartDate] = useState(threeMonthsAgo(systemInfo.calendar))
    const [endDate, setEndDate] = useState(systemInfo.calendar===ethiopian.ETHIOPIAN_NAME ? new DateEthiopian(): new Date())
    const [validationRuleGroupId, setValidationRuleGroupId] = useState(
        ALL_VALIDATION_RULE_GROUPS_ID
    )
    const [sendNotfications, setSendNotifications] = useState(false)
    const [persistNewResults, setPersistNewResults] = useState(false)

    const handleStartDateChange = (event, date) => {
        setStartDate(systemInfo.calendar === ethiopian.ETHIOPIAN_NAME ? new DateEthiopian(date) : new Date(date))
    }
    const handleEndDateChange = (event, date) => {
        setEndDate(systemInfo.calendar === ethiopian.ETHIOPIAN_NAME ? new DateEthiopian(date) : new Date(date))
    }
    const handleSendNotificationsChange = ({ checked }) => {
        setSendNotifications(checked)
    }
    const handlePersistNewResultsChange = ({ checked }) => {
        setPersistNewResults(checked)
    }

    return {
        organisationUnitId,
        handleOrganisationUnitChange: setOrganisationUnitId,
        startDate,
        handleStartDateChange,
        endDate,
        handleEndDateChange,
        validationRuleGroupId,
        handleValidationRuleGroupChange: setValidationRuleGroupId,
        sendNotfications,
        handleSendNotificationsChange,
        persistNewResults,
        handlePersistNewResultsChange,
    }
}

export default useFormState
