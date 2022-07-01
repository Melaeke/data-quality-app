import { ethiopian } from "../components/DatePicker/utils/ConstantEthoipian"
import { DateEthiopian } from "../components/DatePicker/utils/DateEthiopian"

const threeMonthsAgo = (calendar) => {
    if (ethiopian.ETHIOPIAN_NAME === calendar) {
        let today = new DateEthiopian()
        return new DateEthiopian(today.getFullYear(), today.getMonth() - 3, today.getDate())
    }
    const date = new Date()
    date.setMonth(date.getMonth() - 3)
    return date
}

export default threeMonthsAgo
