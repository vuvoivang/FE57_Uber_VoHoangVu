function getEleId(id) {
    return document.getElementById(id);
}
function getId(name) {
    var arr = document.getElementsByName(name);
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].checked) {
            // console.log(arr[i].id);
            return arr[i].id;
        }
    }
    return "none";
}
var validation = new Validation();
function getTrip() {
    var id = getId("selector");
    var km = getEleId("totalKm").value;
    var time_wait = getEleId("time_wait").value;
    var trip;
    if (id == "uberX") {
        trip = new Trip(id, 8000, 1, 12000, 20, 10000, 2000, time_wait, km);
    }
    else if (id == "uberSUV") trip = new Trip(id, 9000, 1, 14000, 20, 12000, 3000, time_wait, km);
    else if (id == "uberBlack") trip = new Trip(id, 10000, 1, 16000, 20, 14000, 4000, time_wait, km);
    else {
        alert("Vui lòng chọn loại xe!");
        return;
    }
    var isValid = true;
    isValid = validation.checkFilled(km, "Vui lòng điền số km!") &&
        validation.checkNumber(km, "Vui lòng nhập số lượng km là một số!") &&
        validation.checkFilled(time_wait, "Vui lòng điền thời gian chờ") &&
        validation.checkNumber(time_wait, "Vui lòng nhập thời gian chờ là một số!");
    if (!isValid) return null;

    return trip;
}
getEleId("calcPayment").onclick = function () {
    var trip = getTrip();
    if (trip == null) return;
    var totalPay = trip.calcPrice(trip.km);
    getEleId("divThanhTien").style.display = "block";
    getEleId("xuatTien").innerHTML = " " + totalPay + " ";


}
getEleId("printBill").onclick = function (event) {
    var trip = getTrip();
    if (trip == null) {
        // getEleId("divBill").style.display = "block";
        // getEleId("headBill").innerHTML = "";
        // getEleId("bodyBill").innerHTML = `
        // <tr>
        //     <h1 class="text-danger">In hoá đơn thất bại! Vui lòng thử lại</h1>
        // </tr>
        // `;
        event.stopPropagation();
        return;
    }
    getEleId("divBill").style.display = "block";
    getEleId("headBill").innerHTML = "";
    getEleId("bodyBill").innerHTML = "";
    trip.printBill();


}
