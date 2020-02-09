## Make a RESTful API for Point of Sales with Node.js and Express.js

<br />

### Product

<br />
Untuk melihat daftar seluruh product<br />
http://localhost:9999/products<br />
Untuk melihat daftar seluruh product dengan sorting, pagination, dan search by name<br />
Bisa dilakukan dengan menambahkan query string
page = untuk melakukan pagination
sort = untuk melakukan sorting
dir = untuk melakukan sorting secara descending
search = untuk melakukan pencarian
Contoh : http://localhost:9999/products?search=[keyword]&sort=[type]&page=[page]

<br />
Untuk melakukan pencarian terhadap product yg memiliki id tertentu<br />
http://localhost:9999/product/1<br />
"1" = id product yg ingin kita telusuri<br />
<br />
Untuk mengubah detail dari suatu product<br />
http://localhost:9999/product/1<br />
"1" = id product yg ingin kita ubah<br />
Dengan method patch, di dalam form body masukan data yg ingin diubah<br />
<br />
Untuk menghapus suatu product<br />
http://localhost:9999/product/1<br />
"1" = id product yg ingin kita ubah<br />
Kirim request dengan menggunakan method delete<br />
<br />
Untuk menambahkan product baru<br />
http://localhost:9999/products<br />
Dengan method post, di dalam form body masukan data yg ingin diubah<br />

<br />

### User

<br />
Untuk registrasi user<br />
http://localhost:9999/register<br />
Dengan method post, masukkan key "username" dengan value username yg diinginkan<br />
dan key "password" dengan value password yg diinginkan<br />
Username tidak boleh menggunakan symbol dan harus terdiri dari 4 - 16 character<br />
Password tidak boleh menggunakan symbol dan minimal harus terdiri dari 6 character<br />
<br />
Agar bisa melakukan proses transaksi, silahkan login terlebih dahulu<br />
http://localhost:9999/login<br />
Dengan method post, masukkan key "username" dengan value username yg diinginkan<br />
dan key "password" dengan value password<br />
Jika proses login berhasil, maka anda akan mendapatkan sebuah token<br />
<br />
Setiap kita ingin melakukan transakti, kita harus selalu menginclude token yg tadi kita dapatkan ke headers<br />
Untuk key-nya diisi dengan "user-token" dan valuenya diisi dengan token yg tadi<br />
<br />
Untuk menambah barang ke cart<br />
http://localhost:9999/user<br />
Dengan method patch, masukkan key "id" diisi dengan product id dan key "qty" diisi dengan quantity yg ingin ditambah<br />
<br />
Untuk mengurangi barang dari cart<br />
http://localhost:9999/user<br />
Pengoperasiannya sama seperti jika ingin menambah barang, hanya saja disini kita menggunakan method delete<br />
<br />
Untuk melihat isi dari cart, bisa menggunakan method get<br />
http://localhost:9999/user<br />
<br />
Untuk melakukan payment, bisa menggunakan method post<br />
http://localhost:9999/user<br />
Jika transaksi berhasil maka barang yg ada di cart otomatis berpindah ke data history,<br />
selama stock dari barang yg dibeli masih tersedia<br />
<br />
Untuk melihat history payment<br />
http://localhost:9999/history<br />
Jika kita ingin meng-filter sesuai tanggal, bisa masukkan key "start" dan "end"<br />
sesuai tanggal yg diinginkan dengan format seperti "2012-01-31"<br />
