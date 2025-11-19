var Bank = /** @class */ (function () {
    function Bank() {
        this.saldo = 0;
        this.riwayat = [];
        var data = localStorage.getItem("bankData");
        if (data) {
            var jumlah = JSON.parse(data);
            this.saldo = jumlah.saldo;
            this.riwayat = jumlah.riwayat;
        }
    }
    Bank.prototype.saveKeLocalStorage = function () {
        localStorage.setItem("bankData", JSON.stringify({
            saldo: this.saldo,
            riwayat: this.riwayat,
        }));
    };
    ;
    Bank.prototype.setSaldo = function (uang) {
        this.saldo += uang;
        this.riwayat.push({
            tipe: "setor",
            uang: uang,
            waktu: new Date(),
        });
        this.saveKeLocalStorage();
    };
    Bank.prototype.getSaldo = function () {
        return this.saldo;
    };
    Bank.prototype.getRiwayat = function () {
        return this.riwayat;
    };
    return Bank;
}());
var B = new Bank();
var input = document.getElementById('masukanUang');
var tombol = document.getElementById('masukan');
var total = document.getElementById('jumlah');
var riwayat = document.getElementById('riwayat');
tombol.addEventListener("click", function () {
    var jumlah = Number(input.value);
    if (jumlah <= 0)
        return alert("Saldo tidak valid!");
    B.setSaldo(jumlah);
    total.innerText = B.getSaldo().toLocaleString('id-ID');
    getRiwayat();
    input.value = "";
});
function getRiwayat() {
    riwayat.innerHTML = "";
    B.getRiwayat().forEach(function (item) {
        var pertanda = document.createElement('li');
        pertanda.textContent = "".concat(item.tipe, " Rp ").concat(item.uang.toLocaleString('id-ID'), " - ").concat(item.waktu.toLocaleString('id-ID'));
        riwayat.appendChild(pertanda);
    });
}
