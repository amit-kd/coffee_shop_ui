export class Utility {
    static deepClone(src) {
        return { ...src };
    }

    static getDateInFormat(year, isTime = false) {
        let today = new Date();
        let todayString: String;
        if (!isTime) {
            let dd = today.getDate();
            let ddStr: String = dd.toString();;
            let mm = today.getMonth() + 1; //January is 0!
            let mmStr: String = mm.toString();
            let yyyy = today.getFullYear();
            if (year) {
                yyyy += year;
            }
            if (dd < 10) {
                ddStr = '0' + dd;
            }
            if (mm < 10) {
                mmStr = '0' + mm;
            }
            todayString = yyyy + '-' + mmStr + '-' + ddStr;
        } else {
            let hh = today.getHours();
            let hhStr: String = hh.toString();;
            let mm = today.getMinutes();
            let mmStr: String = mm.toString();
            if (hh < 10) {
                hhStr = '0' + hh;
            }
            if (mm < 10) {
                mmStr = '0' + mm;
            }
            todayString = hhStr + ':' + mmStr;
        }

        return todayString;
    }
}