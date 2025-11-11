<style>
    @page {
        size: A4 portrait;
        /* margin: 15mm; */
    }

    body {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: #000;
    }

    .textBener {
        font-family: "Times New Roman", serif;
        font-size: 12px;
        color: #000;
    }

    .container {
        width: 100%;
        border: 1px solid #000;
        padding: 5px;
        box-sizing: border-box;
    }

    table {
        border-collapse: collapse;
        width: 100%;
    }

    td,
    th {
        border: 1px solid #000;
        padding: 1px 2px;
        vertical-align: middle;
    }

    .no-border td,
    .no-border th {
        border: none;
    }

    .center {
        text-align: center;
    }

    .right {
        text-align: right;
    }

    .bold {
        font-weight: bold;
    }

    .section-title {
        font-weight: bold;
        text-align: center;
        margin: 5px 0;
    }

    .small-text {
        font-size: 10px;
    }

    .remark {
        height: 60px;
    }

    .signature td {
        height: 30px;
    }
</style>

<!DOCTYPE html>
<html lang="id">
<script>
    document.addEventListener("DOMContentLoaded", function() {
        const params = new URLSearchParams(window.location.search);

        const referensi = params.get("referensi");
        const tanggal = params.get("tanggal");
        const halaman = params.get("halaman");
        const effisiensi = params.get("effisiensi");
        const shiftValue = params.get("shiftValue");
        const timeStart = params.get("timeStart");
        const timeEnd = params.get("timeEnd");
        const spek_mesin = params.get("spek_mesin");
        const spek_benang = params.get("spek_benang");
        const timeA = params.get("timeA");
        const timeB = params.get("timeB");
        const timeC = params.get("timeC");
        const timeD = params.get("timeD");
        const timeE = params.get("timeE");
        const timeF = params.get("timeF");
        const timeG = params.get("timeG");
        const c1A = params.get("c1A");
        const c1B = params.get("c1B");
        const c1C = params.get("c1C");
        const c1D = params.get("c1D");
        const c1E = params.get("c1E");
        const c1F = params.get("c1F");
        const c1G = params.get("c1G");
        const c2A = params.get("c2A");
        const c2B = params.get("c2B");
        const c2C = params.get("c2C");
        const c2D = params.get("c2D");
        const c2E = params.get("c2E");
        const c2F = params.get("c2F");
        const c2G = params.get("c2G");
        const c3A = params.get("c3A");
        const c3B = params.get("c3B");
        const c3C = params.get("c3C");
        const c3D = params.get("c3D");
        const c3E = params.get("c3E");
        const c3F = params.get("c3F");
        const c3G = params.get("c3G");
        const c4A = params.get("c4A");
        const c4B = params.get("c4B");
        const c4C = params.get("c4C");
        const c4D = params.get("c4D");
        const c4E = params.get("c4E");
        const c4F = params.get("c4F");
        const c4G = params.get("c4G");
        const c5A = params.get("c5A");
        const c5B = params.get("c5B");
        const c5C = params.get("c5C");
        const c5D = params.get("c5D");
        const c5E = params.get("c5E");
        const c5F = params.get("c5F");
        const c5G = params.get("c5G");
        const c6A = params.get("c6A");
        const c6B = params.get("c6B");
        const c6C = params.get("c6C");
        const c6D = params.get("c6D");
        const c6E = params.get("c6E");
        const c6F = params.get("c6F");
        const c6G = params.get("c6G");
        const c7A = params.get("c7A");
        const c7B = params.get("c7B");
        const c7C = params.get("c7C");
        const c7D = params.get("c7D");
        const c7E = params.get("c7E");
        const c7F = params.get("c7F");
        const c7G = params.get("c7G");
        const c8A = params.get("c8A");
        const c8B = params.get("c8B");
        const c8C = params.get("c8C");
        const c8D = params.get("c8D");
        const c8E = params.get("c8E");
        const c8F = params.get("c8F");
        const c8G = params.get("c8G");
        const flA = params.get("flA");
        const flB = params.get("flB");
        const flC = params.get("flC");
        const flD = params.get("flD");
        const flE = params.get("flE");
        const flF = params.get("flF");
        const flG = params.get("flG");
        const scA = params.get("scA");
        const scB = params.get("scB");
        const scC = params.get("scC");
        const scD = params.get("scD");
        const scE = params.get("scE");
        const scF = params.get("scF");
        const scG = params.get("scG");
        const jnA = params.get("jnA");
        const jnB = params.get("jnB");
        const jnC = params.get("jnC");
        const jnD = params.get("jnD");
        const jnE = params.get("jnE");
        const jnF = params.get("jnF");
        const jnG = params.get("jnG");
        const d1A = params.get("d1A");
        const d1B = params.get("d1B");
        const d1C = params.get("d1C");
        const d1D = params.get("d1D");
        const d1E = params.get("d1E");
        const d1F = params.get("d1F");
        const d1G = params.get("d1G");
        const d2A = params.get("d2A");
        const d2B = params.get("d2B");
        const d2C = params.get("d2C");
        const d2D = params.get("d2D");
        const d2E = params.get("d2E");
        const d2F = params.get("d2F");
        const d2G = params.get("d2G");
        const d3A = params.get("d3A");
        const d3B = params.get("d3B");
        const d3C = params.get("d3C");
        const d3D = params.get("d3D");
        const d3E = params.get("d3E");
        const d3F = params.get("d3F");
        const d3G = params.get("d3G");
        const d4A = params.get("d4A");
        const d4B = params.get("d4B");
        const d4C = params.get("d4C");
        const d4D = params.get("d4D");
        const d4E = params.get("d4E");
        const d4F = params.get("d4F");
        const d4G = params.get("d4G");
        const d5A = params.get("d5A");
        const d5B = params.get("d5B");
        const d5C = params.get("d5C");
        const d5D = params.get("d5D");
        const d5E = params.get("d5E");
        const d5F = params.get("d5F");
        const d5G = params.get("d5G");
        const d6A = params.get("d6A");
        const d6B = params.get("d6B");
        const d6C = params.get("d6C");
        const d6D = params.get("d6D");
        const d6E = params.get("d6E");
        const d6F = params.get("d6F");
        const d6G = params.get("d6G");
        const srA = params.get("srA");
        const srB = params.get("srB");
        const srC = params.get("srC");
        const srD = params.get("srD");
        const srE = params.get("srE");
        const srF = params.get("srF");
        const srG = params.get("srG");
        const mrA = params.get("mrA");
        const mrB = params.get("mrB");
        const mrC = params.get("mrC");
        const mrD = params.get("mrD");
        const mrE = params.get("mrE");
        const mrF = params.get("mrF");
        const mrG = params.get("mrG");
        const mvA = params.get("mvA");
        const mvB = params.get("mvB");
        const mvC = params.get("mvC");
        const mvD = params.get("mvD");
        const mvE = params.get("mvE");
        const mvF = params.get("mvF");
        const mvG = params.get("mvG");
        const mpp1A = params.get("mpp1A");
        const mpp1B = params.get("mpp1B");
        const mpp1C = params.get("mpp1C");
        const mpp1D = params.get("mpp1D");
        const mpp1E = params.get("mpp1E");
        const mpp1F = params.get("mpp1F");
        const mpp1G = params.get("mpp1G");
        const mpp2A = params.get("mpp2A");
        const mpp2B = params.get("mpp2B");
        const mpp2C = params.get("mpp2C");
        const mpp2D = params.get("mpp2D");
        const mpp2E = params.get("mpp2E");
        const mpp2F = params.get("mpp2F");
        const mpp2G = params.get("mpp2G");
        const qbA = params.get("qbA");
        const qbB = params.get("qbB");
        const qbC = params.get("qbC");
        const qbD = params.get("qbD");
        const qbE = params.get("qbE");
        const qbF = params.get("qbF");
        const qbG = params.get("qbG");
        const fewA = params.get("fewA");
        const fewB = params.get("fewB");
        const fewC = params.get("fewC");
        const fewD = params.get("fewD");
        const fewE = params.get("fewE");
        const fewF = params.get("fewF");
        const fewG = params.get("fewG");
        const swA = params.get("swA");
        const swB = params.get("swB");
        const swC = params.get("swC");
        const swD = params.get("swD");
        const swE = params.get("swE");
        const swF = params.get("swF");
        const swG = params.get("swG");
        const noyA = params.get("noyA");
        const noyB = params.get("noyB");
        const noyC = params.get("noyC");
        const noyD = params.get("noyD");
        const noyE = params.get("noyE");
        const noyF = params.get("noyF");
        const noyG = params.get("noyG");
        const wgA = params.get("wgA");
        const wgB = params.get("wgB");
        const wgC = params.get("wgC");
        const wgD = params.get("wgD");
        const wgE = params.get("wgE");
        const wgF = params.get("wgF");
        const wgG = params.get("wgG");
        const rs1A = params.get("rs1A");
        const rs1B = params.get("rs1B");
        const rs1C = params.get("rs1C");
        const rs1D = params.get("rs1D");
        const rs1E = params.get("rs1E");
        const rs1F = params.get("rs1F");
        const rs1G = params.get("rs1G");
        const rs2A = params.get("rs2A");
        const rs2B = params.get("rs2B");
        const rs2C = params.get("rs2C");
        const rs2D = params.get("rs2D");
        const rs2E = params.get("rs2E");
        const rs2F = params.get("rs2F");
        const rs2G = params.get("rs2G");
        const rs3A = params.get("rs3A");
        const rs3B = params.get("rs3B");
        const rs3C = params.get("rs3C");
        const rs3D = params.get("rs3D");
        const rs3E = params.get("rs3E");
        const rs3F = params.get("rs3F");
        const rs3G = params.get("rs3G");
        const strA = params.get("strA");
        const strB = params.get("strB");
        const strC = params.get("strC");
        const strD = params.get("strD");
        const strE = params.get("strE");
        const strF = params.get("strF");
        const strG = params.get("strG");
        const rA = params.get("rA");
        const rB = params.get("rB");
        const rC = params.get("rC");
        const rD = params.get("rD");
        const rE = params.get("rE");
        const rF = params.get("rF");
        const rG = params.get("rG");
        const uotA = params.get("uotA");
        const uotB = params.get("uotB");
        const uotC = params.get("uotC");
        const uotD = params.get("uotD");
        const uotE = params.get("uotE");
        const uotF = params.get("uotF");
        const uotG = params.get("uotG");
        const lotA = params.get("lotA");
        const lotB = params.get("lotB");
        const lotC = params.get("lotC");
        const lotD = params.get("lotD");
        const lotE = params.get("lotE");
        const lotF = params.get("lotF");
        const lotG = params.get("lotG");
        const at1A = params.get("at1A");
        const at1B = params.get("at1B");
        const at1C = params.get("at1C");
        const at1D = params.get("at1D");
        const at1E = params.get("at1E");
        const at1F = params.get("at1F");
        const at1G = params.get("at1G");
        const at2A = params.get("at2A");
        const at2B = params.get("at2B");
        const at2C = params.get("at2C");
        const at2D = params.get("at2D");
        const at2E = params.get("at2E");
        const at2F = params.get("at2F");
        const at2G = params.get("at2G");
        const at3A = params.get("at3A");
        const at3B = params.get("at3B");
        const at3C = params.get("at3C");
        const at3D = params.get("at3D");
        const at3E = params.get("at3E");
        const at3F = params.get("at3F");
        const at3G = params.get("at3G");
        const time1 = params.get("time1");
        const remark1 = params.get("remark1");
        const time2 = params.get("time2");
        const remark2 = params.get("remark2");
        const time3 = params.get("time3");
        const remark3 = params.get("remark3");
        const time4 = params.get("time4");
        const remark4 = params.get("remark4");
        const time5 = params.get("time5");
        const remark5 = params.get("remark5");
        const time6 = params.get("time6");
        const remark6 = params.get("remark6");
        const kwhM1 = params.get("kwhM1");
        const kwhM2 = params.get("kwhM2");
        const jamProd = params.get("jamProd");
        const ppA = params.get("ppA");
        const ppB = params.get("ppB");
        const ppC = params.get("ppC");
        const ppD = params.get("ppD");
        const cacA = params.get("cacA");
        const cacB = params.get("cacB");
        const cacC = params.get("cacC");
        const cacD = params.get("cacD");
        const cacE = params.get("cacE");
        const cacF = params.get("cacF");
        const mbA = params.get("mbA");
        const mbB = params.get("mbB");
        const mbC = params.get("mbC");
        const mbD = params.get("mbD");
        const mbE = params.get("mbE");
        const mbF = params.get("mbF");
        const uvA = params.get("uvA");
        const uvB = params.get("uvB");
        const uvC = params.get("uvC");
        const uvD = params.get("uvD");
        const uvE = params.get("uvE");
        const uvF = params.get("uvF");
        const asbA = params.get("asbA");
        const asbB = params.get("asbB");
        const asbC = params.get("asbC");
        const asbD = params.get("asbD");
        const asbE = params.get("asbE");
        const asbF = params.get("asbF");
        const llA = params.get("llA");
        const llB = params.get("llB");
        const llC = params.get("llC");
        const llD = params.get("llD");
        const llF = params.get("llF");
        const bhn1A = params.get("bhn1A");
        const bhn1B = params.get("bhn1B");
        const bhn1C = params.get("bhn1C");
        const bhn1D = params.get("bhn1D");
        const bhn1E = params.get("bhn1E");
        const bhn1F = params.get("bhn1F");
        const bhn2A = params.get("bhn2A");
        const bhn2B = params.get("bhn2B");
        const bhn2C = params.get("bhn2C");
        const bhn2D = params.get("bhn2D");
        const bhn2E = params.get("bhn2E");
        const bhn2F = params.get("bhn2F");
        const bngM = params.get("bngM");
        const prongM = params.get("prongM");
        const silM = params.get("silM");
        const bngL = params.get("bngL");
        const prongL = params.get("prongL");
        const silL = params.get("silL");
        const bngMe = params.get("bngMe");
        const prongMe = params.get("prongMe");
        const silMe = params.get("silMe");
        const bngGB = params.get("bngGB");
        const prongGB = params.get("prongGB");
        const silGB = params.get("silGB");
        const bngLL = params.get("bngLL");
        const prongLL = params.get("prongLL");
        const silLL = params.get("silLL");
        const total = params.get("total");

        if (referensi) document.getElementById("referensi").textContent = referensi;
        if (tanggal) {
            const tgl = tanggal.split(' ')[0];
            document.getElementById("tanggal").value = tgl;
        }
        if (halaman) document.getElementById("halaman").innerHTML = halaman;
        if (effisiensi) document.getElementById("effisiensi").textContent = effisiensi;
        if (shiftValue) {
            document.getElementById("shiftValue").value = shiftValue;
            const targetShift = document.querySelector(`.shift-option[data-value="${shiftValue}"]`);
            if (targetShift) targetShift.classList.add("active");
        }
        if (timeStart) {
            const date = new Date(timeStart);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                document.getElementById("timeStart").value = `${jam}:${menit}`;
            } else {
                const match = timeStart.match(/(\d{2}):(\d{2})/);
                if (match) document.getElementById("timeStart").value = `${match[1]}:${match[2]}`;
            }
        }
        if (timeEnd) {
            const date = new Date(timeEnd);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                document.getElementById("timeEnd").value = `${jam}:${menit}`;
            } else {
                const match = timeEnd.match(/(\d{2}):(\d{2})/);
                if (match) document.getElementById("timeEnd").value = `${match[1]}:${match[2]}`;
            }
        }
        if (spek_mesin) document.getElementById("spek_mesin").textContent = spek_mesin;
        if (spek_benang) document.getElementById("spek_benang").textContent = spek_benang;
        if (timeA) {
            let jamMenit = "";
            const date = new Date(timeA);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeA.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeA").textContent = jamMenit;
        }
        if (timeB) {
            let jamMenit = "";
            const date = new Date(timeB);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeB.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeB").textContent = jamMenit;
        }
        if (timeC) {
            let jamMenit = "";
            const date = new Date(timeC);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeC.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeC").textContent = jamMenit;
        }
        if (timeD) {
            let jamMenit = "";
            const date = new Date(timeD);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeD.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeD").textContent = jamMenit;
        }
        if (timeE) {
            let jamMenit = "";
            const date = new Date(timeE);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeE.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeE").textContent = jamMenit;
        }
        if (timeF) {
            let jamMenit = "";
            const date = new Date(timeF);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeF.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeF").textContent = jamMenit;
        }
        if (timeG) {
            let jamMenit = "";
            const date = new Date(timeG);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = timeG.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("timeG").textContent = jamMenit;
        }
        if (c1A) document.getElementById("c1A").textContent = c1A;
        if (c1B) document.getElementById("c1B").textContent = c1B;
        if (c1C) document.getElementById("c1C").textContent = c1C;
        if (c1D) document.getElementById("c1D").textContent = c1D;
        if (c1E) document.getElementById("c1E").textContent = c1E;
        if (c1F) document.getElementById("c1F").textContent = c1F;
        if (c1G) document.getElementById("c1G").textContent = c1G;
        if (c2A) document.getElementById("c2A").textContent = c2A;
        if (c2B) document.getElementById("c2B").textContent = c2B;
        if (c2C) document.getElementById("c2C").textContent = c2C;
        if (c2D) document.getElementById("c2D").textContent = c2D;
        if (c2E) document.getElementById("c2E").textContent = c2E;
        if (c2F) document.getElementById("c2F").textContent = c2F;
        if (c2G) document.getElementById("c2G").textContent = c2G;
        if (c3A) document.getElementById("c3A").textContent = c3A;
        if (c3B) document.getElementById("c3B").textContent = c3B;
        if (c3C) document.getElementById("c3C").textContent = c3C;
        if (c3D) document.getElementById("c3D").textContent = c3D;
        if (c3E) document.getElementById("c3E").textContent = c3E;
        if (c3F) document.getElementById("c3F").textContent = c3F;
        if (c3G) document.getElementById("c3G").textContent = c3G;
        if (c4A) document.getElementById("c4A").textContent = c4A;
        if (c4B) document.getElementById("c4B").textContent = c4B;
        if (c4C) document.getElementById("c4C").textContent = c4C;
        if (c4D) document.getElementById("c4D").textContent = c4D;
        if (c4E) document.getElementById("c4E").textContent = c4E;
        if (c4F) document.getElementById("c4F").textContent = c4F;
        if (c4G) document.getElementById("c4G").textContent = c4G;
        if (c5A) document.getElementById("c5A").textContent = c5A;
        if (c5B) document.getElementById("c5B").textContent = c5B;
        if (c5C) document.getElementById("c5C").textContent = c5C;
        if (c5D) document.getElementById("c5D").textContent = c5D;
        if (c5E) document.getElementById("c5E").textContent = c5E;
        if (c5F) document.getElementById("c5F").textContent = c5F;
        if (c5G) document.getElementById("c5G").textContent = c5G;
        if (c6A) document.getElementById("c6A").textContent = c6A;
        if (c6B) document.getElementById("c6B").textContent = c6B;
        if (c6C) document.getElementById("c6C").textContent = c6C;
        if (c6D) document.getElementById("c6D").textContent = c6D;
        if (c6E) document.getElementById("c6E").textContent = c6E;
        if (c6F) document.getElementById("c6F").textContent = c6F;
        if (c6G) document.getElementById("c6G").textContent = c6G;
        if (c7A) document.getElementById("c7A").textContent = c7A;
        if (c7B) document.getElementById("c7B").textContent = c7B;
        if (c7C) document.getElementById("c7C").textContent = c7C;
        if (c7D) document.getElementById("c7D").textContent = c7D;
        if (c7E) document.getElementById("c7E").textContent = c7E;
        if (c7F) document.getElementById("c7F").textContent = c7F;
        if (c7G) document.getElementById("c7G").textContent = c7G;
        if (c8A) document.getElementById("c8A").textContent = c8A;
        if (c8B) document.getElementById("c8B").textContent = c8B;
        if (c8C) document.getElementById("c8C").textContent = c8C;
        if (c8D) document.getElementById("c8D").textContent = c8D;
        if (c8E) document.getElementById("c8E").textContent = c8E;
        if (c8F) document.getElementById("c8F").textContent = c8F;
        if (c8G) document.getElementById("c8G").textContent = c8G;
        if (flA) document.getElementById("flA").textContent = flA;
        if (flB) document.getElementById("flB").textContent = flB;
        if (flC) document.getElementById("flC").textContent = flC;
        if (flD) document.getElementById("flD").textContent = flD;
        if (flE) document.getElementById("flE").textContent = flE;
        if (flF) document.getElementById("flF").textContent = flF;
        if (flG) document.getElementById("flG").textContent = flG;
        if (scA) document.getElementById("scA").textContent = scA;
        if (scB) document.getElementById("scB").textContent = scB;
        if (scC) document.getElementById("scC").textContent = scC;
        if (scD) document.getElementById("scD").textContent = scD;
        if (scE) document.getElementById("scE").textContent = scE;
        if (scF) document.getElementById("scF").textContent = scF;
        if (scG) document.getElementById("scG").textContent = scG;
        if (jnA) document.getElementById("jnA").textContent = jnA;
        if (jnB) document.getElementById("jnB").textContent = jnB;
        if (jnC) document.getElementById("jnC").textContent = jnC;
        if (jnD) document.getElementById("jnD").textContent = jnD;
        if (jnE) document.getElementById("jnE").textContent = jnE;
        if (jnF) document.getElementById("jnF").textContent = jnF;
        if (jnG) document.getElementById("jnG").textContent = jnG;
        if (d1A) document.getElementById("d1A").textContent = d1A;
        if (d1B) document.getElementById("d1B").textContent = d1B;
        if (d1C) document.getElementById("d1C").textContent = d1C;
        if (d1D) document.getElementById("d1D").textContent = d1D;
        if (d1E) document.getElementById("d1E").textContent = d1E;
        if (d1F) document.getElementById("d1F").textContent = d1F;
        if (d1G) document.getElementById("d1G").textContent = d1G;
        if (d2A) document.getElementById("d2A").textContent = d2A;
        if (d2B) document.getElementById("d2B").textContent = d2B;
        if (d2C) document.getElementById("d2C").textContent = d2C;
        if (d2D) document.getElementById("d2D").textContent = d2D;
        if (d2E) document.getElementById("d2E").textContent = d2E;
        if (d2F) document.getElementById("d2F").textContent = d2F;
        if (d2G) document.getElementById("d2G").textContent = d2G;
        if (d3A) document.getElementById("d3A").textContent = d3A;
        if (d3B) document.getElementById("d3B").textContent = d3B;
        if (d3C) document.getElementById("d3C").textContent = d3C;
        if (d3D) document.getElementById("d3D").textContent = d3D;
        if (d3E) document.getElementById("d3E").textContent = d3E;
        if (d3F) document.getElementById("d3F").textContent = d3F;
        if (d3G) document.getElementById("d3G").textContent = d3G;
        if (d4A) document.getElementById("d4A").textContent = d4A;
        if (d4B) document.getElementById("d4B").textContent = d4B;
        if (d4C) document.getElementById("d4C").textContent = d4C;
        if (d4D) document.getElementById("d4D").textContent = d4D;
        if (d4E) document.getElementById("d4E").textContent = d4E;
        if (d4F) document.getElementById("d4F").textContent = d4F;
        if (d4G) document.getElementById("d4G").textContent = d4G;
        if (d5A) document.getElementById("d5A").textContent = d5A;
        if (d5B) document.getElementById("d5B").textContent = d5B;
        if (d5C) document.getElementById("d5C").textContent = d5C;
        if (d5D) document.getElementById("d5D").textContent = d5D;
        if (d5E) document.getElementById("d5E").textContent = d5E;
        if (d5F) document.getElementById("d5F").textContent = d5F;
        if (d5G) document.getElementById("d5G").textContent = d5G;
        if (d6A) document.getElementById("d6A").textContent = d6A;
        if (d6B) document.getElementById("d6B").textContent = d6B;
        if (d6C) document.getElementById("d6C").textContent = d6C;
        if (d6D) document.getElementById("d6D").textContent = d6D;
        if (d6E) document.getElementById("d6E").textContent = d6E;
        if (d6F) document.getElementById("d6F").textContent = d6F;
        if (d6G) document.getElementById("d6G").textContent = d6G;
        if (srA) document.getElementById("srA").textContent = srA;
        if (srB) document.getElementById("srB").textContent = srB;
        if (srC) document.getElementById("srC").textContent = srC;
        if (srD) document.getElementById("srD").textContent = srD;
        if (srE) document.getElementById("srE").textContent = srE;
        if (srF) document.getElementById("srF").textContent = srF;
        if (srG) document.getElementById("srG").textContent = srG;
        if (mrA) document.getElementById("mrA").textContent = mrA;
        if (mrB) document.getElementById("mrB").textContent = mrB;
        if (mrC) document.getElementById("mrC").textContent = mrC;
        if (mrD) document.getElementById("mrD").textContent = mrD;
        if (mrE) document.getElementById("mrE").textContent = mrE;
        if (mrF) document.getElementById("mrF").textContent = mrF;
        if (mrG) document.getElementById("mrG").textContent = mrG;
        if (mvA) document.getElementById("mvA").textContent = mvA;
        if (mvB) document.getElementById("mvB").textContent = mvB;
        if (mvC) document.getElementById("mvC").textContent = mvC;
        if (mvD) document.getElementById("mvD").textContent = mvD;
        if (mvE) document.getElementById("mvE").textContent = mvE;
        if (mvF) document.getElementById("mvF").textContent = mvF;
        if (mvG) document.getElementById("mvG").textContent = mvG;
        if (mpp1A) document.getElementById("mpp1A").textContent = mpp1A;
        if (mpp1B) document.getElementById("mpp1B").textContent = mpp1B;
        if (mpp1C) document.getElementById("mpp1C").textContent = mpp1C;
        if (mpp1D) document.getElementById("mpp1D").textContent = mpp1D;
        if (mpp1E) document.getElementById("mpp1E").textContent = mpp1E;
        if (mpp1F) document.getElementById("mpp1F").textContent = mpp1F;
        if (mpp1G) document.getElementById("mpp1G").textContent = mpp1G;
        if (mpp2A) document.getElementById("mpp2A").textContent = mpp2A;
        if (mpp2B) document.getElementById("mpp2B").textContent = mpp2B;
        if (mpp2C) document.getElementById("mpp2C").textContent = mpp2C;
        if (mpp2D) document.getElementById("mpp2D").textContent = mpp2D;
        if (mpp2E) document.getElementById("mpp2E").textContent = mpp2E;
        if (mpp2F) document.getElementById("mpp2F").textContent = mpp2F;
        if (mpp2G) document.getElementById("mpp2G").textContent = mpp2G;
        if (qbA) document.getElementById("qbA").textContent = qbA;
        if (qbB) document.getElementById("qbB").textContent = qbB;
        if (qbC) document.getElementById("qbC").textContent = qbC;
        if (qbD) document.getElementById("qbD").textContent = qbD;
        if (qbE) document.getElementById("qbE").textContent = qbE;
        if (qbF) document.getElementById("qbF").textContent = qbF;
        if (qbG) document.getElementById("qbG").textContent = qbG;
        if (fewA) document.getElementById("fewA").textContent = fewA;
        if (fewB) document.getElementById("fewB").textContent = fewB;
        if (fewC) document.getElementById("fewC").textContent = fewC;
        if (fewD) document.getElementById("fewD").textContent = fewD;
        if (fewE) document.getElementById("fewE").textContent = fewE;
        if (fewF) document.getElementById("fewF").textContent = fewF;
        if (fewG) document.getElementById("fewG").textContent = fewG;
        if (swA) document.getElementById("swA").textContent = swA;
        if (swB) document.getElementById("swB").textContent = swB;
        if (swC) document.getElementById("swC").textContent = swC;
        if (swD) document.getElementById("swD").textContent = swD;
        if (swE) document.getElementById("swE").textContent = swE;
        if (swF) document.getElementById("swF").textContent = swF;
        if (swG) document.getElementById("swG").textContent = swG;
        if (noyA) document.getElementById("noyA").textContent = noyA;
        if (noyB) document.getElementById("noyB").textContent = noyB;
        if (noyC) document.getElementById("noyC").textContent = noyC;
        if (noyD) document.getElementById("noyD").textContent = noyD;
        if (noyE) document.getElementById("noyE").textContent = noyE;
        if (noyF) document.getElementById("noyF").textContent = noyF;
        if (noyG) document.getElementById("noyG").textContent = noyG;
        if (wgA) document.getElementById("wgA").textContent = wgA;
        if (wgB) document.getElementById("wgB").textContent = wgB;
        if (wgC) document.getElementById("wgC").textContent = wgC;
        if (wgD) document.getElementById("wgD").textContent = wgD;
        if (wgE) document.getElementById("wgE").textContent = wgE;
        if (wgF) document.getElementById("wgF").textContent = wgF;
        if (wgG) document.getElementById("wgG").textContent = wgG;
        if (rs1A) document.getElementById("rs1A").textContent = rs1A;
        if (rs1B) document.getElementById("rs1B").textContent = rs1B;
        if (rs1C) document.getElementById("rs1C").textContent = rs1C;
        if (rs1D) document.getElementById("rs1D").textContent = rs1D;
        if (rs1E) document.getElementById("rs1E").textContent = rs1E;
        if (rs1F) document.getElementById("rs1F").textContent = rs1F;
        if (rs1G) document.getElementById("rs1G").textContent = rs1G;
        if (rs2A) document.getElementById("rs2A").textContent = rs2A;
        if (rs2B) document.getElementById("rs2B").textContent = rs2B;
        if (rs2C) document.getElementById("rs2C").textContent = rs2C;
        if (rs2D) document.getElementById("rs2D").textContent = rs2D;
        if (rs2E) document.getElementById("rs2E").textContent = rs2E;
        if (rs2F) document.getElementById("rs2F").textContent = rs2F;
        if (rs2G) document.getElementById("rs2G").textContent = rs2G;
        if (rs3A) document.getElementById("rs3A").textContent = rs3A;
        if (rs3B) document.getElementById("rs3B").textContent = rs3B;
        if (rs3C) document.getElementById("rs3C").textContent = rs3C;
        if (rs3D) document.getElementById("rs3D").textContent = rs3D;
        if (rs3E) document.getElementById("rs3E").textContent = rs3E;
        if (rs3F) document.getElementById("rs3F").textContent = rs3F;
        if (rs3G) document.getElementById("rs3G").textContent = rs3G;
        if (strA) document.getElementById("strA").textContent = strA;
        if (strB) document.getElementById("strB").textContent = strB;
        if (strC) document.getElementById("strC").textContent = strC;
        if (strD) document.getElementById("strD").textContent = strD;
        if (strE) document.getElementById("strE").textContent = strE;
        if (strF) document.getElementById("strF").textContent = strF;
        if (strG) document.getElementById("strG").textContent = strG;
        if (rA) document.getElementById("rA").textContent = rA;
        if (rB) document.getElementById("rB").textContent = rB;
        if (rC) document.getElementById("rC").textContent = rC;
        if (rD) document.getElementById("rD").textContent = rD;
        if (rE) document.getElementById("rE").textContent = rE;
        if (rF) document.getElementById("rF").textContent = rF;
        if (rG) document.getElementById("rG").textContent = rG;
        if (uotA) document.getElementById("uotA").textContent = uotA;
        if (uotB) document.getElementById("uotB").textContent = uotB;
        if (uotC) document.getElementById("uotC").textContent = uotC;
        if (uotD) document.getElementById("uotD").textContent = uotD;
        if (uotE) document.getElementById("uotE").textContent = uotE;
        if (uotF) document.getElementById("uotF").textContent = uotF;
        if (uotG) document.getElementById("uotG").textContent = uotG;
        if (lotA) document.getElementById("lotA").textContent = lotA;
        if (lotB) document.getElementById("lotB").textContent = lotB;
        if (lotC) document.getElementById("lotC").textContent = lotC;
        if (lotD) document.getElementById("lotD").textContent = lotD;
        if (lotE) document.getElementById("lotE").textContent = lotE;
        if (lotF) document.getElementById("lotF").textContent = lotF;
        if (lotG) document.getElementById("lotG").textContent = lotG;
        if (at1A) document.getElementById("at1A").textContent = at1A;
        if (at1B) document.getElementById("at1B").textContent = at1B;
        if (at1C) document.getElementById("at1C").textContent = at1C;
        if (at1D) document.getElementById("at1D").textContent = at1D;
        if (at1E) document.getElementById("at1E").textContent = at1E;
        if (at1F) document.getElementById("at1F").textContent = at1F;
        if (at1G) document.getElementById("at1G").textContent = at1G;
        if (at2A) document.getElementById("at2A").textContent = at2A;
        if (at2B) document.getElementById("at2B").textContent = at2B;
        if (at2C) document.getElementById("at2C").textContent = at2C;
        if (at2D) document.getElementById("at2D").textContent = at2D;
        if (at2E) document.getElementById("at2E").textContent = at2E;
        if (at2F) document.getElementById("at2F").textContent = at2F;
        if (at2G) document.getElementById("at2G").textContent = at2G;
        if (at3A) document.getElementById("at3A").textContent = at3A;
        if (at3B) document.getElementById("at3B").textContent = at3B;
        if (at3C) document.getElementById("at3C").textContent = at3C;
        if (at3D) document.getElementById("at3D").textContent = at3D;
        if (at3E) document.getElementById("at3E").textContent = at3E;
        if (at3F) document.getElementById("at3F").textContent = at3F;
        if (at3G) document.getElementById("at3G").textContent = at3G;
        if (time1) {
            let jamMenit = "";
            const date = new Date(time1);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = time1.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("time1").textContent = jamMenit;
        }
        if (remark1) document.getElementById("remark1").textContent = remark1;
        if (time2) {
            let jamMenit = "";
            const date = new Date(time2);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = time2.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("time2").textContent = jamMenit;
        }
        if (remark2) document.getElementById("remark2").textContent = remark2;
        if (time3) {
            let jamMenit = "";
            const date = new Date(time3);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = time3.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("time3").textContent = jamMenit;
        }
        if (remark3) document.getElementById("remark3").textContent = remark3;
        if (time4) {
            let jamMenit = "";
            const date = new Date(time4);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = time4.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("time4").textContent = jamMenit;
        }
        if (remark4) document.getElementById("remark4").textContent = remark4;
        if (time5) {
            let jamMenit = "";
            const date = new Date(time5);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = time5.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("time5").textContent = jamMenit;
        }
        if (remark5) document.getElementById("remark5").textContent = remark5;
        if (time6) {
            let jamMenit = "";
            const date = new Date(time6);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = time6.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("time6").textContent = jamMenit;
        }
        if (remark6) document.getElementById("remark6").textContent = remark6;
        if (kwhM1) document.getElementById("kwhM1").textContent = kwhM1;
        if (kwhM2) document.getElementById("kwhM2").textContent = kwhM2;
        if (jamProd) {
            let jamMenit = "";
            const date = new Date(jamProd);
            if (!isNaN(date)) {
                const jam = String(date.getHours()).padStart(2, "0");
                const menit = String(date.getMinutes()).padStart(2, "0");
                jamMenit = `${jam}:${menit}`;
            } else {
                const match = jamProd.match(/(\d{2}):(\d{2})/);
                if (match) jamMenit = `${match[1]}:${match[2]}`;
            }
            if (jamMenit) document.getElementById("jamProd").textContent = jamMenit;
        }
        if (ppA) document.getElementById("ppA").textContent = ppA;
        if (ppB) document.getElementById("ppB").textContent = ppB;
        if (ppC) document.getElementById("ppC").textContent = ppC;
        if (ppD) document.getElementById("ppD").textContent = ppD;
        if (cacA) document.getElementById("cacA").textContent = cacA;
        if (cacB) document.getElementById("cacB").textContent = cacB;
        if (cacC) document.getElementById("cacC").textContent = cacC;
        if (cacD) document.getElementById("cacD").textContent = cacD;
        if (cacE) document.getElementById("cacE").textContent = cacE;
        if (cacF) document.getElementById("cacF").textContent = cacF;
        if (mbA) document.getElementById("mbA").textContent = mbA;
        if (mbB) document.getElementById("mbB").textContent = mbB;
        if (mbC) document.getElementById("mbC").textContent = mbC;
        if (mbD) document.getElementById("mbD").textContent = mbD;
        if (mbE) document.getElementById("mbE").textContent = mbE;
        if (mbF) document.getElementById("mbF").textContent = mbF;
        if (uvA) document.getElementById("uvA").textContent = uvA;
        if (uvB) document.getElementById("uvB").textContent = uvB;
        if (uvC) document.getElementById("uvC").textContent = uvC;
        if (uvD) document.getElementById("uvD").textContent = uvD;
        if (uvE) document.getElementById("uvE").textContent = uvE;
        if (uvF) document.getElementById("uvF").textContent = uvF;
        if (asbA) document.getElementById("asbA").textContent = asbA;
        if (asbB) document.getElementById("asbB").textContent = asbB;
        if (asbC) document.getElementById("asbC").textContent = asbC;
        if (asbD) document.getElementById("asbD").textContent = asbD;
        if (asbE) document.getElementById("asbE").textContent = asbE;
        if (asbF) document.getElementById("asbF").textContent = asbF;
        if (llA) document.getElementById("llA").textContent = llA;
        if (llB) document.getElementById("llB").textContent = llB;
        if (llC) document.getElementById("llC").textContent = llC;
        if (llD) document.getElementById("llD").textContent = llD;
        if (llF) document.getElementById("llF").textContent = llF;
        if (bhn1A) document.getElementById("bhn1A").textContent = bhn1A;
        if (bhn1B) document.getElementById("bhn1B").textContent = bhn1B;
        if (bhn1C) document.getElementById("bhn1C").textContent = bhn1C;
        if (bhn1D) document.getElementById("bhn1D").textContent = bhn1D;
        if (bhn1E) document.getElementById("bhn1E").textContent = bhn1E;
        if (bhn1F) document.getElementById("bhn1F").textContent = bhn1F;
        if (bhn2A) document.getElementById("bhn2A").textContent = bhn2A;
        if (bhn2B) document.getElementById("bhn2B").textContent = bhn2B;
        if (bhn2C) document.getElementById("bhn2C").textContent = bhn2C;
        if (bhn2D) document.getElementById("bhn2D").textContent = bhn2D;
        if (bhn2E) document.getElementById("bhn2E").textContent = bhn2E;
        if (bhn2F) document.getElementById("bhn2F").textContent = bhn2F;
        if (bngM) document.getElementById("bngM").textContent = bngM;
        if (prongM) document.getElementById("prongM").textContent = prongM;
        if (silM) document.getElementById("silM").textContent = silM;
        if (bngL) document.getElementById("bngL").textContent = bngL;
        if (prongL) document.getElementById("prongL").textContent = prongL;
        if (silL) document.getElementById("silL").textContent = silL;
        if (bngMe) document.getElementById("bngMe").textContent = bngMe;
        if (prongMe) document.getElementById("prongMe").textContent = prongMe;
        if (silMe) document.getElementById("silMe").textContent = silMe;
        if (bngGB) document.getElementById("bngGB").textContent = bngGB;
        if (prongGB) document.getElementById("prongGB").textContent = prongGB;
        if (silGB) document.getElementById("silGB").textContent = silGB;
        if (bngLL) document.getElementById("bngLL").textContent = bngLL;
        if (prongLL) document.getElementById("prongLL").textContent = prongLL;
        if (silLL) document.getElementById("silLL").textContent = silLL;
        if (total) document.getElementById("total").textContent = total;

        setTimeout(() => {
            window.print();
        }, 500);
    });
</script>

<body>
    <div class="container">
        <table>
            <tr>
                <td colspan="2" class="bold textBener"
                    style="border-bottom:none !important; text-align: center; width:400px !important">
                    PT. KERTA
                    RAJASA RAYA</td>
                <td class="small-text left" style="border-right:none !important">No. Referensi:</td>
                <td colspan="4" class="small-text left" style="width:100px; border-left:none !important" id="referensi"
                    contenteditable="true"></td>
            </tr>
            <tr>
                <td colspan="2" class="textBener"
                    style="border-top:none !important; border-bottom:none !important; text-align: center;">
                    Woven Bag /
                    Jumbo Bag Industrial</td>
                <td class="small-text left" style="border-right:none !important">Tanggal:</td>
                <td colspan="4" class="small-text left" style="border-left:none !important">
                    <input class="small-text left" type="date" id="tanggal"
                        style="border:none; width:50%; outline:none;">
                </td>
            </tr>
            <tr>
                <td colspan="2" class="textBener" style="border-top:none !important; text-align: center;">
                    fm - 7.5 - 01 - ex - 03 - 02</td>
                <td class="small-text left" style="border-right:none !important">Halaman:</td>
                <td colspan="4" class="small-text left" style="border-left:none !important" contenteditable="false"
                    id="halaman">
                    1&emsp;Dari&emsp;1</td>
            </tr>
            <tr>
                <td colspan="2" class="center bold textBener">LAPORAN PRODUKSI EXTRUDER</td>
                <td colspan="4" class="center bold textBener">FORM</td>
            </tr>
            <tr class="textBener">
                <td colspan="4" class="center bold" style="border-right:none !important"></td>
                <td colspan="1" class="center bold"
                    style="border-left:none !important; border-right:none !important; text-align: right;">Effisiensi :
                </td>
                <td colspan="1" class="center bold"
                    style="border-left:none !important; width: 100px; text-align: left;" id="effisiensi"
                    contenteditable="true"></td>
            </tr>
        </table>
        <table>
            <tr class="textBener">
                <td style="width: 110px; border-right:none !important">Shift / Time</td>
                <td style="width: 5px; border-left:none !important; border-right:none !important">:</td>
                <td style="border-left:none !important; border-right:none !important; text-align:center;">
                    <div id="shiftSelector" style="display:inline-flex; gap:2px; font-weight:bold; cursor:pointer;">
                        <span class="shift-option" data-value="A">A</span> /
                        <span class="shift-option" data-value="B">B</span> /
                        <span class="shift-option" data-value="C">C</span> /
                        <span class="shift-option" data-value="D">D</span>
                    </div>
                    <input type="hidden" id="shiftValue" name="shiftValue">
                </td>

                <style>
                    .shift-option {
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        text-align: center;
                        line-height: 20px;
                        border-radius: 50%;
                        transition: 0.2s;
                    }

                    .shift-option.active {
                        border: 2px solid black;
                    }

                    .shift-option:hover {
                        background-color: #f0f0f0;
                    }
                </style>

                <script>
                    document.querySelectorAll('.shift-option').forEach(el => {
                        el.addEventListener('click', function() {
                            // Hilangkan lingkaran dari semua
                            document.querySelectorAll('.shift-option').forEach(opt => opt.classList.remove('active'));
                            // Tambahkan lingkaran pada yang diklik
                            this.classList.add('active');
                            // Simpan value ke hidden input
                            document.getElementById('shiftValue').value = this.dataset.value;
                            console.log("Shift terpilih:", this.dataset.value);
                        });
                    });
                </script>
                <td style="width: 110px; border-left:none !important; border-right:none !important; text-align:right;">
                    <input type="time" id="timeStart"
                        style="width:100px; border:none; outline:none; text-align:center;">
                </td>
                <td style="width: 30px; border-left:none !important; border-right:none !important; text-align:center;">
                    s/d
                </td>
                <td style="width: 110px; border-left:none !important; text-align:left;">
                    <input type="time" id="timeEnd"
                        style="width:100px; border:none; outline:none; text-align:center;">
                </td>
                <td style="text-align: center; width: 80px">Manager</td>
                <td style="text-align: center; width: 80px">Supervisor</td>
                <td style="text-align: center; width: 80px">Chief of Group</td>
            </tr>
            <tr class="textBener">
                <td style="border-right:none !important">Spec. of Machine</td>
                <td style="border-left:none !important; border-right:none !important">:</td>
                <td colspan="4" style="border-left:none !important" id="spek_mesin" contenteditable="true"></td>
                <td style="border-bottom:none !important"></td>
                <td style="border-bottom:none !important"></td>
                <td style="border-bottom:none !important"></td>
            </tr>
            <tr class="textBener">
                <td style="border-right:none !important">Spec. of Yarn</td>
                <td style="border-left:none !important; border-right:none !important">:</td>
                <td colspan="4" style="border-left:none !important" id="spek_benang" contenteditable="true"></td>
                <td style="border-top:none !important"></td>
                <td style="border-top:none !important"></td>
                <td style="border-top:none !important"></td>
            </tr>
        </table>
        <table>
            <tr>
                <th colspan="2">Time</th>
                <th class="center small-text" id="timeA" contenteditable="true" style="width:120px; color: red">
                </th>
                <th class="center small-text" id="timeB" contenteditable="true" style="width:120px"></th>
                <th class="center small-text" id="timeC" contenteditable="true" style="width:120px"></th>
                <th class="center small-text" id="timeD" contenteditable="true" style="width:120px"></th>
                <th class="center small-text" id="timeE" contenteditable="true" style="width:120px"></th>
                <th class="center small-text" id="timeF" contenteditable="true" style="width:120px"></th>
                <th class="center small-text" id="timeG" contenteditable="true" style="width:120px"></th>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important"></td>
                <td style="width: 30px">C1</td>
                <td class="center small-text" id="c1A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c1B" contenteditable="true"></td>
                <td class="center small-text" id="c1C" contenteditable="true"></td>
                <td class="center small-text" id="c1D" contenteditable="true"></td>
                <td class="center small-text" id="c1E" contenteditable="true"></td>
                <td class="center small-text" id="c1F" contenteditable="true"></td>
                <td class="center small-text" id="c1G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;"></td>
                <td>C2</td>
                <td class="center small-text" id="c2A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c2B" contenteditable="true"></td>
                <td class="center small-text" id="c2C" contenteditable="true"></td>
                <td class="center small-text" id="c2D" contenteditable="true"></td>
                <td class="center small-text" id="c2E" contenteditable="true"></td>
                <td class="center small-text" id="c2F" contenteditable="true"></td>
                <td class="center small-text" id="c2G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="width: 150px; text-align: left; border-bottom:none !important; border-top:none !important;">
                    Cylinder Temperature</td>
                <td>C3</td>
                <td class="center small-text" id="c3A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c3B" contenteditable="true"></td>
                <td class="center small-text" id="c3C" contenteditable="true"></td>
                <td class="center small-text" id="c3D" contenteditable="true"></td>
                <td class="center small-text" id="c3E" contenteditable="true"></td>
                <td class="center small-text" id="c3F" contenteditable="true"></td>
                <td class="center small-text" id="c3G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;"></td>
                <td>C4</td>
                <td class="center small-text" id="c4A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c4B" contenteditable="true"></td>
                <td class="center small-text" id="c4C" contenteditable="true"></td>
                <td class="center small-text" id="c4D" contenteditable="true"></td>
                <td class="center small-text" id="c4E" contenteditable="true"></td>
                <td class="center small-text" id="c4F" contenteditable="true"></td>
                <td class="center small-text" id="c4G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;">( C )</td>
                <td>C5</td>
                <td class="center small-text" id="c5A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c5B" contenteditable="true"></td>
                <td class="center small-text" id="c5C" contenteditable="true"></td>
                <td class="center small-text" id="c5D" contenteditable="true"></td>
                <td class="center small-text" id="c5E" contenteditable="true"></td>
                <td class="center small-text" id="c5F" contenteditable="true"></td>
                <td class="center small-text" id="c5G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;"></td>
                <td>C6</td>
                <td class="center small-text" id="c6A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c6B" contenteditable="true"></td>
                <td class="center small-text" id="c6C" contenteditable="true"></td>
                <td class="center small-text" id="c6D" contenteditable="true"></td>
                <td class="center small-text" id="c6E" contenteditable="true"></td>
                <td class="center small-text" id="c6F" contenteditable="true"></td>
                <td class="center small-text" id="c6G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;"></td>
                <td>C7</td>
                <td class="center small-text" id="c7A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c7B" contenteditable="true"></td>
                <td class="center small-text" id="c7C" contenteditable="true"></td>
                <td class="center small-text" id="c7D" contenteditable="true"></td>
                <td class="center small-text" id="c7E" contenteditable="true"></td>
                <td class="center small-text" id="c7F" contenteditable="true"></td>
                <td class="center small-text" id="c7G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-top:none !important;"></td>
                <td>C8</td>
                <td class="center small-text" id="c8A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="c8B" contenteditable="true"></td>
                <td class="center small-text" id="c8C" contenteditable="true"></td>
                <td class="center small-text" id="c8D" contenteditable="true"></td>
                <td class="center small-text" id="c8E" contenteditable="true"></td>
                <td class="center small-text" id="c8F" contenteditable="true"></td>
                <td class="center small-text" id="c8G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-bottom:none !important;">Flange ( C )</td>
                <td>FL</td>
                <td class="center small-text" id="flA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="flB" contenteditable="true"></td>
                <td class="center small-text" id="flC" contenteditable="true"></td>
                <td class="center small-text" id="flD" contenteditable="true"></td>
                <td class="center small-text" id="flE" contenteditable="true"></td>
                <td class="center small-text" id="flF" contenteditable="true"></td>
                <td class="center small-text" id="flG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-bottom:none !important; border-top:none !important;">
                    Screen ( C )
                </td>
                <td>SC</td>
                <td class="center small-text" id="scA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="scB" contenteditable="true"></td>
                <td class="center small-text" id="scC" contenteditable="true"></td>
                <td class="center small-text" id="scD" contenteditable="true"></td>
                <td class="center small-text" id="scE" contenteditable="true"></td>
                <td class="center small-text" id="scF" contenteditable="true"></td>
                <td class="center small-text" id="scG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-top:none !important;">Joint ( C )</td>
                <td>JN</td>
                <td class="center small-text" id="jnA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="jnB" contenteditable="true"></td>
                <td class="center small-text" id="jnC" contenteditable="true"></td>
                <td class="center small-text" id="jnD" contenteditable="true"></td>
                <td class="center small-text" id="jnE" contenteditable="true"></td>
                <td class="center small-text" id="jnF" contenteditable="true"></td>
                <td class="center small-text" id="jnG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important;"></td>
                <td>D1</td>
                <td class="center small-text" id="d1A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="d1B" contenteditable="true"></td>
                <td class="center small-text" id="d1C" contenteditable="true"></td>
                <td class="center small-text" id="d1D" contenteditable="true"></td>
                <td class="center small-text" id="d1E" contenteditable="true"></td>
                <td class="center small-text" id="d1F" contenteditable="true"></td>
                <td class="center small-text" id="d1G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-bottom:none !important; border-top:none !important;">
                    Die
                    Temperature</td>
                <td>D2</td>
                <td class="center small-text" id="d2A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="d2B" contenteditable="true"></td>
                <td class="center small-text" id="d2C" contenteditable="true"></td>
                <td class="center small-text" id="d2D" contenteditable="true"></td>
                <td class="center small-text" id="d2E" contenteditable="true"></td>
                <td class="center small-text" id="d2F" contenteditable="true"></td>
                <td class="center small-text" id="d2G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;"></td>
                <td>D3</td>
                <td class="center small-text" id="d3A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="d3B" contenteditable="true"></td>
                <td class="center small-text" id="d3C" contenteditable="true"></td>
                <td class="center small-text" id="d3D" contenteditable="true"></td>
                <td class="center small-text" id="d3E" contenteditable="true"></td>
                <td class="center small-text" id="d3F" contenteditable="true"></td>
                <td class="center small-text" id="d3G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;">( C )</td>
                <td>D4</td>
                <td class="center small-text" id="d4A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="d4B" contenteditable="true"></td>
                <td class="center small-text" id="d4C" contenteditable="true"></td>
                <td class="center small-text" id="d4D" contenteditable="true"></td>
                <td class="center small-text" id="d4E" contenteditable="true"></td>
                <td class="center small-text" id="d4F" contenteditable="true"></td>
                <td class="center small-text" id="d4G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-bottom:none !important; border-top:none !important;"></td>
                <td>D5</td>
                <td class="center small-text" id="d5A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="d5B" contenteditable="true"></td>
                <td class="center small-text" id="d5C" contenteditable="true"></td>
                <td class="center small-text" id="d5D" contenteditable="true"></td>
                <td class="center small-text" id="d5E" contenteditable="true"></td>
                <td class="center small-text" id="d5F" contenteditable="true"></td>
                <td class="center small-text" id="d5G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="border-top:none !important;"></td>
                <td>D6</td>
                <td class="center small-text" id="d6A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="d6B" contenteditable="true"></td>
                <td class="center small-text" id="d6C" contenteditable="true"></td>
                <td class="center small-text" id="d6D" contenteditable="true"></td>
                <td class="center small-text" id="d6E" contenteditable="true"></td>
                <td class="center small-text" id="d6F" contenteditable="true"></td>
                <td class="center small-text" id="d6G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-bottom:none !important; border-right:none !important;">
                    Melt Pump / Extruder</td>
                <td style="border-left:none !important; border-bottom:none !important;">(Rpm)</td>
                <td class="center small-text" id="srA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="srB" contenteditable="true"></td>
                <td class="center small-text" id="srC" contenteditable="true"></td>
                <td class="center small-text" id="srD" contenteditable="true"></td>
                <td class="center small-text" id="srE" contenteditable="true"></td>
                <td class="center small-text" id="srF" contenteditable="true"></td>
                <td class="center small-text" id="srG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Motor Current</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (A)
                </td>
                <td class="center small-text" id="mrA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="mrB" contenteditable="true"></td>
                <td class="center small-text" id="mrC" contenteditable="true"></td>
                <td class="center small-text" id="mrD" contenteditable="true"></td>
                <td class="center small-text" id="mrE" contenteditable="true"></td>
                <td class="center small-text" id="mrF" contenteditable="true"></td>
                <td class="center small-text" id="mrG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text" style="display: none">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Motor Voltage</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (V)
                </td>
                <td class="center small-text" id="mvA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="mvB" contenteditable="true"></td>
                <td class="center small-text" id="mvC" contenteditable="true"></td>
                <td class="center small-text" id="mvD" contenteditable="true"></td>
                <td class="center small-text" id="mvE" contenteditable="true"></td>
                <td class="center small-text" id="mvF" contenteditable="true"></td>
                <td class="center small-text" id="mvG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Pressure Before Die</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (bar)</td>
                <td class="center small-text" id="mpp1A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="mpp1B" contenteditable="true"></td>
                <td class="center small-text" id="mpp1C" contenteditable="true"></td>
                <td class="center small-text" id="mpp1D" contenteditable="true"></td>
                <td class="center small-text" id="mpp1E" contenteditable="true"></td>
                <td class="center small-text" id="mpp1F" contenteditable="true"></td>
                <td class="center small-text" id="mpp1G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Pressure Before Filter</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (Kgf/cm)</td>
                <td class="center small-text" id="mpp2A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="mpp2B" contenteditable="true"></td>
                <td class="center small-text" id="mpp2C" contenteditable="true"></td>
                <td class="center small-text" id="mpp2D" contenteditable="true"></td>
                <td class="center small-text" id="mpp2E" contenteditable="true"></td>
                <td class="center small-text" id="mpp2F" contenteditable="true"></td>
                <td class="center small-text" id="mpp2G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Water Bath/Chiller/Temp Yarn</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (C)
                </td>
                <td class="center small-text" id="qbA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="qbB" contenteditable="true"></td>
                <td class="center small-text" id="qbC" contenteditable="true"></td>
                <td class="center small-text" id="qbD" contenteditable="true"></td>
                <td class="center small-text" id="qbE" contenteditable="true"></td>
                <td class="center small-text" id="qbF" contenteditable="true"></td>
                <td class="center small-text" id="qbG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Film Effective Width</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (mm)</td>
                <td class="center small-text" id="fewA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="fewB" contenteditable="true"></td>
                <td class="center small-text" id="fewC" contenteditable="true"></td>
                <td class="center small-text" id="fewD" contenteditable="true"></td>
                <td class="center small-text" id="fewE" contenteditable="true"></td>
                <td class="center small-text" id="fewF" contenteditable="true"></td>
                <td class="center small-text" id="fewG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Slitter Width</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (mm)</td>
                <td class="center small-text" id="swA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="swB" contenteditable="true"></td>
                <td class="center small-text" id="swC" contenteditable="true"></td>
                <td class="center small-text" id="swD" contenteditable="true"></td>
                <td class="center small-text" id="swE" contenteditable="true"></td>
                <td class="center small-text" id="swF" contenteditable="true"></td>
                <td class="center small-text" id="swG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    No. of Yarn</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (pcs)</td>
                <td class="center small-text" id="noyA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="noyB" contenteditable="true"></td>
                <td class="center small-text" id="noyC" contenteditable="true"></td>
                <td class="center small-text" id="noyD" contenteditable="true"></td>
                <td class="center small-text" id="noyE" contenteditable="true"></td>
                <td class="center small-text" id="noyF" contenteditable="true"></td>
                <td class="center small-text" id="noyG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-top:none !important; border-right:none !important;">
                    Water Gap</td>
                <td style="border-left:none !important; border-top:none !important;">(mm)</td>
                <td class="center small-text" id="wgA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="wgB" contenteditable="true"></td>
                <td class="center small-text" id="wgC" contenteditable="true"></td>
                <td class="center small-text" id="wgD" contenteditable="true"></td>
                <td class="center small-text" id="wgE" contenteditable="true"></td>
                <td class="center small-text" id="wgF" contenteditable="true"></td>
                <td class="center small-text" id="wgG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-bottom:none !important; border-right:none !important;">
                    1 Roll Speed
                </td>
                <td style="border-left:none !important; border-bottom:none !important;">(m/min)</td>
                <td class="center small-text" id="rs1A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="rs1B" contenteditable="true"></td>
                <td class="center small-text" id="rs1C" contenteditable="true"></td>
                <td class="center small-text" id="rs1D" contenteditable="true"></td>
                <td class="center small-text" id="rs1E" contenteditable="true"></td>
                <td class="center small-text" id="rs1F" contenteditable="true"></td>
                <td class="center small-text" id="rs1G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    2 Roll Speed</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (m/min)</td>
                <td class="center small-text" id="rs2A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="rs2B" contenteditable="true"></td>
                <td class="center small-text" id="rs2C" contenteditable="true"></td>
                <td class="center small-text" id="rs2D" contenteditable="true"></td>
                <td class="center small-text" id="rs2E" contenteditable="true"></td>
                <td class="center small-text" id="rs2F" contenteditable="true"></td>
                <td class="center small-text" id="rs2G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    3 Roll Speed</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (m/min)</td>
                <td class="center small-text" id="rs3A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="rs3B" contenteditable="true"></td>
                <td class="center small-text" id="rs3C" contenteditable="true"></td>
                <td class="center small-text" id="rs3D" contenteditable="true"></td>
                <td class="center small-text" id="rs3E" contenteditable="true"></td>
                <td class="center small-text" id="rs3F" contenteditable="true"></td>
                <td class="center small-text" id="rs3G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    Stretching Ratio</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (Times)</td>
                <td class="center small-text" id="strA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="strB" contenteditable="true"></td>
                <td class="center small-text" id="strC" contenteditable="true"></td>
                <td class="center small-text" id="strD" contenteditable="true"></td>
                <td class="center small-text" id="strE" contenteditable="true"></td>
                <td class="center small-text" id="strF" contenteditable="true"></td>
                <td class="center small-text" id="strG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left;border-top:none !important; border-right:none !important;">
                    Relax</td>
                <td style="border-left:none !important; border-top:none !important;">(%)</td>
                <td class="center small-text" id="rA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="rB" contenteditable="true"></td>
                <td class="center small-text" id="rC" contenteditable="true"></td>
                <td class="center small-text" id="rD" contenteditable="true"></td>
                <td class="center small-text" id="rE" contenteditable="true"></td>
                <td class="center small-text" id="rF" contenteditable="true"></td>
                <td class="center small-text" id="rG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td style="text-align: left; border-bottom:none !important; border-right:none !important;">
                    Oven Temp</td>
                <td style="border-left:none !important; border-bottom:none !important;">(C)</td>
                <td class="center small-text" id="uotA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="uotB" contenteditable="true"></td>
                <td class="center small-text" id="uotC" contenteditable="true"></td>
                <td class="center small-text" id="uotD" contenteditable="true"></td>
                <td class="center small-text" id="uotE" contenteditable="true"></td>
                <td class="center small-text" id="uotF" contenteditable="true"></td>
                <td class="center small-text" id="uotG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    1 Anneling Temp</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (C)
                </td>
                <td class="center small-text" id="lotA" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="lotB" contenteditable="true"></td>
                <td class="center small-text" id="lotC" contenteditable="true"></td>
                <td class="center small-text" id="lotD" contenteditable="true"></td>
                <td class="center small-text" id="lotE" contenteditable="true"></td>
                <td class="center small-text" id="lotF" contenteditable="true"></td>
                <td class="center small-text" id="lotG" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    2 Anneling Temp</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (C)
                </td>
                <td class="center small-text" id="at1A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="at1B" contenteditable="true"></td>
                <td class="center small-text" id="at1C" contenteditable="true"></td>
                <td class="center small-text" id="at1D" contenteditable="true"></td>
                <td class="center small-text" id="at1E" contenteditable="true"></td>
                <td class="center small-text" id="at1F" contenteditable="true"></td>
                <td class="center small-text" id="at1G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    1 Chiller Low / High Pressure</td>
                <td style="border-left:none !important; border-bottom:none !important; border-top:none !important;">
                    (C)
                </td>
                <td class="center small-text" id="at2A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="at2B" contenteditable="true"></td>
                <td class="center small-text" id="at2C" contenteditable="true"></td>
                <td class="center small-text" id="at2D" contenteditable="true"></td>
                <td class="center small-text" id="at2E" contenteditable="true"></td>
                <td class="center small-text" id="at2F" contenteditable="true"></td>
                <td class="center small-text" id="at2G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td
                    style="text-align: left; border-bottom:none !important; border-top:none !important; border-right:none !important;">
                    2 Chiller Low / High Pressure</td>
                <td style="border-left:none !important; border-top:none !important;">(C)</td>
                <td class="center small-text" id="at3A" contenteditable="true" style="color: red"></td>
                <td class="center small-text" id="at3B" contenteditable="true"></td>
                <td class="center small-text" id="at3C" contenteditable="true"></td>
                <td class="center small-text" id="at3D" contenteditable="true"></td>
                <td class="center small-text" id="at3E" contenteditable="true"></td>
                <td class="center small-text" id="at3F" contenteditable="true"></td>
                <td class="center small-text" id="at3G" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td class="bold">T I M E</td>
                <td colspan="8" class="bold">R E M A R K</td>
            </tr>
            <tr class="center small-text">
                <td class="center small-text" id="time1" contenteditable="true">&nbsp;</td>
                <td colspan="8" class="small-text" id="remark1" style="text-align: left"
                    contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td class="center small-text" id="time2" contenteditable="true">&nbsp;</td>
                <td colspan="8" class="small-text" id="remark2" style="text-align: left"
                    contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td class="center small-text" id="time3" contenteditable="true">&nbsp;</td>
                <td colspan="8" class="small-text" id="remark3" style="text-align: left"
                    contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td class="center small-text" id="time4" contenteditable="true">&nbsp;</td>
                <td colspan="8" class="small-text" id="remark4" style="text-align: left"
                    contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td class="center small-text" id="time5" contenteditable="true">&nbsp;</td>
                <td colspan="8" class="small-text" id="remark5" style="text-align: left"
                    contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td class="center small-text" id="time6" contenteditable="true">&nbsp;</td>
                <td colspan="8" class="small-text" id="remark6" style="text-align: left"
                    contenteditable="true"></td>
            </tr>
        </table>
        <table>
            <tr class="textBener">
                <td rowspan="2" class="bold" style="text-align: center; width: 50px;">BAHAN
                </td>
                <td colspan="4" class="bold" style="text-align: center">SPEK :</td>
                <td rowspan="2" class="bold" style="text-align: center; width: 50px;">Kwh
                    Meter</td>
                <td style="text-align: center; width: 80px;" class="small-text" id="kwhM1"
                    contenteditable="true"></td>
                <td style="text-align: center; width: 50px;">Jam Prod</td>
            </tr>
            <tr class="center small-text">
                <td>Trade Mark</td>
                <td style="width: 100px">Kode</td>
                <td>Lot number</td>
                <td style="width: 100px">Kg</td>
                <td class="small-text" id="kwhM2" contenteditable="true"></td>
                <td class="small-text" id="jamProd" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td>P . P</td>
                <td id="ppA" style="text-align: left" contenteditable="true"></td>
                <td id="ppB" style="text-align: left" contenteditable="true"></td>
                <td id="ppC" style="text-align: left" contenteditable="true"></td>
                <td id="ppD" style="text-align: left" contenteditable="true"></td>
                <td colspan="2">Umur Sarangan</td>
                <td>Umur Silet</td>
            </tr>
            <tr class="center small-text">
                <td>CaCO3</td>
                <td id="cacA" style="text-align: left" contenteditable="true"></td>
                <td id="cacB" style="text-align: left" contenteditable="true"></td>
                <td id="cacC" style="text-align: left" contenteditable="true"></td>
                <td id="cacD" style="text-align: left" contenteditable="true"></td>
                <td style="text-align: left; border-right:none !important;">P1 =</td>
                <td style="border-left:none !important;" id="cacE" contenteditable="true"> /
                </td>
                <td id="cacF" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td>M . B</td>
                <td id="mbA" style="text-align: left" contenteditable="true"></td>
                <td id="mbB" style="text-align: left" contenteditable="true"></td>
                <td id="mbC" style="text-align: left" contenteditable="true"></td>
                <td id="mbD" style="text-align: left" contenteditable="true"></td>
                <td style="text-align: left; border-right:none !important;">P2 =</td>
                <td style="border-left:none !important;" id="mbE" contenteditable="true"> /
                </td>
                <td id="mbF" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td>U . V</td>
                <td id="uvA" style="text-align: left" contenteditable="true"></td>
                <td id="uvB" style="text-align: left" contenteditable="true"></td>
                <td id="uvC" style="text-align: left" contenteditable="true"></td>
                <td id="uvD" style="text-align: left" contenteditable="true"></td>
                <td style="text-align: left; border-right:none !important;">N . G -)</td>
                <td style="border-right:none !important; border-left:none !important;" id="uvE"
                    contenteditable="true"></td>
                <td style="border-left:none !important;" id="uvF" contenteditable="true">
                    =&emsp;&emsp;&emsp;krj</td>
            </tr>
            <tr class="center small-text">
                <td>A . S</td>
                <td id="asbA" style="text-align: left" contenteditable="true"></td>
                <td id="asbB" style="text-align: left" contenteditable="true"></td>
                <td id="asbC" style="text-align: left" contenteditable="true"></td>
                <td id="asbD" style="text-align: left" contenteditable="true"></td>
                <td style="text-align: left; border-right:none !important;">&emsp;&emsp;&nbsp; -)</td>
                <td style="border-right:none !important; border-left:none !important;" id="asbE"
                    contenteditable="true"></td>
                <td style="border-left:none !important;" id="asbF" contenteditable="true">
                    =&emsp;&emsp;&emsp;krj</td>
            </tr>
            <tr class="center small-text">
                <td>Lain-lain</td>
                <td id="llA" style="text-align: left" contenteditable="true"></td>
                <td id="llB" style="text-align: left" contenteditable="true"></td>
                <td id="llC" style="text-align: left" contenteditable="true"></td>
                <td id="llD" style="text-align: left" contenteditable="true"></td>
                <td colspan="3" id="llF" style="text-align: left" contenteditable="true"></td>
            </tr>
            <tr class="center small-text">
                <td id="bhn1A" style="text-align: left" contenteditable="true"></td>
                <td id="bhn1B" style="text-align: left" contenteditable="true"></td>
                <td id="bhn1C" style="text-align: left" contenteditable="true"></td>
                <td id="bhn1D" style="text-align: left" contenteditable="true"></td>
                <td id="bhn1E" style="text-align: left" contenteditable="true"></td>
                <td colspan="3" id="bhn1F" style="text-align: left" contenteditable="true">&nbsp;</td>
            </tr>
            <tr class="center small-text">
                <td id="bhn2A" style="text-align: left" contenteditable="true"></td>
                <td id="bhn2B" style="text-align: left" contenteditable="true"></td>
                <td id="bhn2C" style="text-align: left" contenteditable="true"></td>
                <td id="bhn2D" style="text-align: left" contenteditable="true"></td>
                <td id="bhn2E" style="text-align: left" contenteditable="true"></td>
                <td colspan="3" id="bhn2F" style="text-align: left" contenteditable="true">&nbsp;</td>
            </tr>
        </table>
        <table>
            <tr class="center bold textBener">
                <td colspan="3">MANUSIA</td>
                <td colspan="3">LISTRIK</td>
                <td colspan="3">MESIN</td>
                <td colspan="3">GANTI BENANG</td>
                <td colspan="3">LAIN-LAIN</td>
                <td rowspan="2">TOTAL</td>
            </tr>
            <tr class="center small-text">
                <td>Bng</td>
                <td>Prong</td>
                <td>Sil</td>
                <td>Bng</td>
                <td>Prong</td>
                <td>Sil</td>
                <td>Bng</td>
                <td>Prong</td>
                <td>Sil</td>
                <td>Bng</td>
                <td>Prong</td>
                <td>Sil</td>
                <td>Bng</td>
                <td>Prong</td>
                <td>Sil</td>
            </tr>
            <tr class="center small-text">
                <td id="bngM" style="width: 40px" contenteditable="true">&nbsp;</td>
                <td id="prongM" style="width: 40px" contenteditable="true"></td>
                <td id="silM" style="width: 40px" contenteditable="true"></td>
                <td id="bngL" style="width: 40px" contenteditable="true"></td>
                <td id="prongL" style="width: 40px" contenteditable="true"></td>
                <td id="silL" style="width: 40px" contenteditable="true"></td>
                <td id="bngMe" style="width: 40px" contenteditable="true"></td>
                <td id="prongMe" style="width: 40px" contenteditable="true"></td>
                <td id="silMe" style="width: 40px" contenteditable="true"></td>
                <td id="bngGB" style="width: 40px" contenteditable="true"></td>
                <td id="prongGB" style="width: 40px" contenteditable="true"></td>
                <td id="silGB" style="width: 40px" contenteditable="true"></td>
                <td id="bngLL" style="width: 40px" contenteditable="true"></td>
                <td id="prongLL" style="width: 40px" contenteditable="true"></td>
                <td id="silLL" style="width: 40px" contenteditable="true"></td>
                <td id="total" style="width: 50px" contenteditable="true"></td>
            </tr>
        </table>
    </div>
</body>

</html>
