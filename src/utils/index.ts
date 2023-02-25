import { Dimensions } from "react-native";
import moment from "moment";

export const WINDOW = Dimensions.get('window');




export const howmuchTime_IsPast = (timeOnSend: number) => {
    var time = moment(timeOnSend * 1000).fromNow()

    // if time difference is less than hour
    if (time.includes("minute") || time.includes("seconds")) {
        return time;
    }

    // time diff greater than hour
    var newTime = moment(timeOnSend)
    let month = moment.monthsShort(newTime.month())
    let day = newTime.date()
    let sentTime = moment(timeOnSend).format('hh:mm A')

    let newTimeStr = month + " " + day + ", " + sentTime

    return newTimeStr
}
