export{};

class Bank {
    public saldo: number = 0;
    public riwayat: {
        tipe: string,
        uang: number,
        waktu: Date,
    }[] = [];

    constructor() {
        const data = localStorage.getItem("bankData");
        if (data) {
            const jumlah = JSON.parse(data);
            this.saldo = jumlah.saldo;
            this.riwayat = jumlah.riwayat;
        }
    }

    saveKeLocalStorage() {
        localStorage.setItem("bankData", JSON.stringify ({
            saldo: this.saldo,
            riwayat: this.riwayat,
        }));
    };

    setSaldo( uang: number ) {
        this.saldo += uang;
        this.riwayat.push({
            tipe: "setor",
            uang: uang,
            waktu: new Date(),
        });

        this.saveKeLocalStorage();
    }

    getSaldo() {
        return this.saldo;
    }

    getRiwayat() {
        return this.riwayat;
    }
}

const B = new Bank();

const input = document.getElementById('masukanUang') as HTMLInputElement;
const tombol = document.getElementById('masukan') as HTMLInputElement;
const total = document.getElementById('jumlah') as HTMLInputElement;
const riwayat = document.getElementById('riwayat') as HTMLInputElement;

tombol.addEventListener("click", () => {
    const jumlah = Number(input.value);

    if (jumlah <= 0) return alert("Saldo tidak valid!");
    B.setSaldo(jumlah);

    total.innerText = B.getSaldo().toLocaleString('id-ID');
    getRiwayat();

    input.value = "";
});

function getRiwayat() {
    riwayat.innerHTML = "";

    B.getRiwayat().forEach(item => {
        const pertanda = document.createElement('li');
        pertanda.textContent = `${item.tipe} Rp ${item.uang.toLocaleString('id-ID')} - ${item.waktu.toLocaleString('id-ID')}`;
        riwayat.appendChild(pertanda);
    })
}


