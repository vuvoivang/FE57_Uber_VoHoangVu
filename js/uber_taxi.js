function createRow(id, detail, use, unit_price, total) {
    var content = `
        <td>${detail}</td>
        <td>${use}</td>
        <td>${unit_price}</td>
        <td>${total}</td>
    `;
    var tagTR = document.createElement("tr");
    tagTR.innerHTML = content;
    getEleId(id).appendChild(tagTR);

}
function Trip(id_car, price_first, first, price_second, second, price_third, price_waiting, time_waiting, km) {
    this.name = id_car;
    this.price_first = price_first;
    this.first = first;
    this.price_second = price_second;
    this.second = second;
    this.price_third = price_third;
    this.price_waiting = price_waiting;
    this.time_waiting = time_waiting;
    this.km = km;
    var total_wait = this.price_waiting * this.time_waiting;
    this.calcPrice = function () {
        if (this.km <= first) return this.price_first * this.km + total_wait;
        else if (this.km <= second) return this.first * this.price_first + (this.km - this.first) * this.price_second + total_wait;
        else return this.first * this.price_first + (this.second - this.first) * this.price_second + (this.km - this.second) * this.price_third + total_wait;
    }
    this.printBill = function () {
        getEleId("headBill").innerHTML = `
        <tr>
            <th>Chi tiết</th>
            <th>Sử dụng</th>
            <th>Đơn giá</th>
            <th>Thành tiền</th>
        </tr>
        `;
        if (this.km <= first) {
            createRow("bodyBill", id_car, this.km + ' km', this.price_first, this.price_first * this.km);
        }
        else if (this.km <= second) {
            createRow("bodyBill", id_car, this.first + ' km', this.price_first, this.price_first * this.first);
            createRow("bodyBill", id_car, (this.km - this.first) + ' km', this.price_second, (this.km - this.first) * this.price_second);
        }
        else {
            createRow("bodyBill", id_car, this.first + ' km', this.price_first, this.price_first * this.first);
            createRow("bodyBill", id_car, (this.second - this.first) + ' km', this.price_second, (this.second - this.first) * this.price_second);
            createRow("bodyBill", id_car, (this.km - this.second) + ' km', this.price_third, (this.km - this.second) * this.price_third);
        }
        createRow("bodyBill", "Thời gian chờ", this.time_waiting + ' phút', this.price_waiting, this.price_waiting * this.time_waiting);
        createRow("bodyBill", "Total", "", "", this.calcPrice());
    }
}