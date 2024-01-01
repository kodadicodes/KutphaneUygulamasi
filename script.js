class Kitap { // Kitap adında bir sınıf oluşturuluyor
    constructor(kitapAdi, kitapYazari, kitapISBN) { // Sınıfın yapıcı fonksiyonu tanımlanıyor
        this.kitapAdi = kitapAdi; // kitapAdi parametresi, kitapAdi özelliğine atanıyor
        this.kitapYazari = kitapYazari; // kitapYazari parametresi, kitapYazari özelliğine atanıyor
        this.kitapISBN = kitapISBN; // kitapISBN parametresi, kitapISBN özelliğine atanıyor
    }
}
class Arayuz { // Arayuz adında bir sınıf oluşturuluyor
    kitapEkle(yeniKitap) { // kitapEkle adında bir metot tanımlanıyor

        const tablo = document.getElementById("kitapListesi"); // "kitapListesi" id'li eleman seçiliyor

        const satir = document.createElement("tr"); // Yeni bir "tr" elemanı oluşturuluyor

        // Yeni oluşturulan "tr" elemanının içeriği belirleniyor
        satir.innerHTML = ` 
        <td>${yeniKitap.kitapAdi}</td>
        <td>${yeniKitap.kitapYazari}</td>
        <td>${yeniKitap.kitapISBN}</td>
        <td><a href = "#" class = "delete">X</a></td>
      `;

        tablo.appendChild(satir); // Yeni "tr" elemanı, "tablo" elemanının çocuğu olarak ekleniyor

    }

    mesajGoster(mesaj, className) { // mesajGoster adında bir metot tanımlanıyor
        const mesajKutusu = document.createElement("div") // Yeni bir "div" elemanı oluşturuluyor
        mesajKutusu.className=`alert ${className}`; // Yeni "div" elemanının sınıfı belirleniyor
        mesajKutusu.appendChild(document.createTextNode(mesaj)); // Yeni "div" elemanına bir metin düğümü ekleniyor
        const container = document.querySelector(".container"); // ".container" sınıfına sahip eleman seçiliyor
        const form = document.getElementById("formKitap"); // "formKitap" id'li eleman seçiliyor
        container.insertBefore(mesajKutusu, form); // "mesajKutusu" elemanı, "form" elemanından önce ekleniyor
        setTimeout(function(){ // Belirli bir süre sonra bir işlem gerçekleştiriliyor
            const mesajKutusu = document.querySelector(".alert").remove(); // ".alert" sınıfına sahip eleman seçiliyor ve kaldırılıyor
        },2000);
    }

    kitapSay() { // kitapSay adında bir metot tanımlanıyor

        const tablo = document.getElementById("kitapListesi"); // "kitapListesi" id'li eleman seçiliyor
        const kitapSayisi = document.getElementsByTagName("tr").length - 1; // "tr" etiketine sahip tüm elemanlar seçiliyor ve sayısı belirleniyor
        document.getElementById("sonuc").innerHTML = kitapSayisi + " kayıtlı kitap bulunmaktadır"; // "sonuc" id'li elemanın içeriği belirleniyor
    }
    kitapSil(target) { // kitapSil adında bir metot tanımlanıyor

        if (target.className == "delete"){ // Eğer hedef elemanın sınıfı "delete" ise
            target.parentNode.parentNode.remove(); // Hedef elemanın ebeveyninin ebeveyni kaldırılıyor
        }

    }
    formuTemizleme() { // formuTemizleme adında bir metot tanımlanıyor
        document.getElementById("txtKitapAdi").value = ""; // "txtKitapAdi" id'li elemanın değeri temizleniyor
        document.getElementById("txtKitapYazari").value = ""; // "txtKitapYazari" id'li elemanın değeri temizleniyor
        document.getElementById("txtKitapISBN").value = ""; // "txtKitapISBN" id'li elemanın değeri temizleniyor
    }
}
document.getElementById("formKitap").addEventListener("submit", function (e) { // "formKitap" id'li elemana bir "submit" olay dinleyicisi ekleniyor

    const kitapAdi = document.getElementById("txtKitapAdi").value, // "txtKitapAdi" id'li elemanın değeri alınıyor
        kitapYazari = document.getElementById("txtKitapYazari").value, // "txtKitapYazari" id'li elemanın değeri alınıyor
        kitapISBN = document.getElementById("txtKitapISBN").value; // "txtKitapISBN" id'li elemanın değeri alınıyor

    const yeniKitap = new Kitap(kitapAdi, kitapYazari, kitapISBN); // Yeni bir Kitap nesnesi oluşturuluyor

    const islem = new Arayuz(); // Yeni bir Arayuz nesnesi oluşturuluyor

    if (kitapAdi != "" && kitapYazari != "" && kitapISBN != "") { // Eğer kitapAdi, kitapYazari ve kitapISBN değerleri boş değilse
        islem.kitapEkle(yeniKitap); // kitapEkle metodu çağrılıyor
        islem.formuTemizleme(); // formuTemizleme metodu çağrılıyor
        islem.mesajGoster("Kitap Eklendi", "success"); // mesajGoster metodu çağrılıyor
    }
    else {

        islem.mesajGoster("Gerekli alanları doldurun","error") // mesajGoster metodu çağrılıyor
    }
    islem.kitapSay(); // kitapSay metodu çağrılıyor


    e.preventDefault(); // Olayın varsayılan işlemi engelleniyor
});

document.getElementById("kitapListesi").addEventListener("click", function (e) { // "kitapListesi" id'li elemana bir "click" olay dinleyicisi ekleniyor
    const islem = new Arayuz(); // Yeni bir Arayuz nesnesi oluşturuluyor
    islem.kitapSil(e.target); // kitapSil metodu çağrılıyor
    islem.kitapSay(); // kitapSay metodu çağrılıyor
    islem.mesajGoster("Kitap silindi", "success"); // mesajGoster metodu çağrılıyor

    e.preventDefault(); // Olayın varsayılan işlemi engelleniyor
});
