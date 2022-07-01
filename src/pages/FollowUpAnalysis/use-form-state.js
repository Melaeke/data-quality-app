import { useConfig } from '@dhis2/app-runtime'
import { useState } from 'react'
import { ethiopian } from '../../components/DatePicker/utils/ConstantEthoipian.js'
import { DateEthiopian } from '../../components/DatePicker/utils/DateEthiopian.js'
import threeMonthsAgo from '../../helpers/threeMonthsAgo.js'

const useFormState = () => {
    const { baseUrl, systemInfo } = useConfig()

    const [startDate, setStartDate] = useState(threeMonthsAgo(systemInfo.calendar))
    const [endDate, setEndDate] = useState(
        systemInfo.calendar === ethiopian.ETHIOPIAN_NAME ? new DateEthiopian() : new Date()
    )
    const [organisationUnitId, setOrganisationUnitId] = useState(null)
    const [dataSetIds, setDataSetIds] = useState([])

    const handleStartDateChange = (event, date) => {
        setStartDate(systemInfo.calendar === ethiopian.ETHIOPIAN_NAME ? new DateEthiopian(date) : new Date(date))
    }
    const handleEndDateChange = (event, date) => {
        setEndDate(systemInfo.calendar === ethiopian.ETHIOPIAN_NAME ? new DateEthiopian(date) : new Date(date))
    }
    const handleDataSetsChange = ({ selected }) => {
        setDataSetIds(selected)
    }

    return {
        startDate,
        handleStartDateChange,
        endDate,
        handleEndDateChange,
        organisationUnitId,
        handleOrganisationUnitChange: setOrganisationUnitId,
        dataSetIds,
        handleDataSetsChange,
    }
}

export default useFormState
