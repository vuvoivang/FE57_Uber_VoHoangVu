function Validation() {
    this.checkFilled = function (value, mess) {
        if (value !== "") {
            return true;
        }
        else {
            alert(mess);
            return false;
        }
    }
    this.checkNumber = function (value, mess) {
        var pattern = /^\d+$/;
        if (pattern.test(value)) {
            return true;
        }
        else {
            alert(mess);
            return false;
        }
    }
}