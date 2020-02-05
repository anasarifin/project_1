## Make a RESTful API for Point of Sales with Node.js and Express.js


### Product
Untuk melihat daftar seluruh product
http://localhost:9999/products

Untuk melihat daftar seluruh product dengan pagination, 5 products per halaman
http://localhost:9999/products/1
"1" = halaman yg ingin anda kunjungi

Untuk melihat daftar seluruh product dengan sorting
http://localhost:9999/products/sort/type
"type" = jenis data yg ingin disorting (contoh: name, price, stock, updated_at, dll.)
Bisa juga melakukan sorting secara descending dengan menambah parameter /desc
Contoh: http://localhost:9999/products/sort/name/desc

Untuk melakukan pencarian terhadap product dengan keyword tertentu
http://localhost:9999/products/search/keyword
"keyword" = keyword yg kita ingin cari berdasarkan nama product

Untuk melakukan pencarian terhadap product yg memiliki id tertentu
http://localhost:9999/product/1
"1" = id product yg ingin kita telusuri

Untuk mengubah detail dari suatu product
http://localhost:9999/product/1
"1" = id product yg ingin kita ubah
Dengan method patch, di dalam form body masukan data yg ingin diubah

Untuk menghapus suatu product
http://localhost:9999/product/1
"1" = id product yg ingin kita ubah
Kirim request dengan menggunakan method delete

Untuk menambahkan product baru
http://localhost:9999/products
Dengan method post, di dalam form body masukan data yg ingin diubah





### User
Untuk registrasi user
http://localhost:9999/register
Dengan method post, masukkan key "username" dengan value username yg diinginkan dan key "password" dengan value password yg diinginkan
Username tidak boleh menggunakan symbol dan harus terdiri dari 4 - 16 character
Password tidak boleh menggunakan symbol dan minimal harus terdiri dari 6 character

Agar bisa melakukan proses transaksi, silahkan login terlebih dahulu
http://localhost:9999/login
Dengan method post, masukkan key "username" dengan value username yg diinginkan dan key "password" dengan value password
Jika proses login berhasil, maka anda akan mendapatkan sebuah token

Setiap kita ingin melakukan transakti, kita harus selalu menginclude token yg tadi kita dapatkan ke headers
Untuk key-nya diisi dengan "user-token" dan valuenya diisi dengan token yg tadi

Untuk menambah barang ke cart
http://localhost:9999/user
Dengan method patch, masukkan key sesuai dengan product id dan valuenya diisi dengan quantity yg ingin ditambah
Kita bisa melakukan proses ini secara batch, dengan menambah key yg lainnya

Untuk mengurangi barang dari cart
http://localhost:9999/user
Pengoperasiannya sama seperti jika ingin menambah barang, hanya saja disini kita menggunakan method delete.

Untuk melihat isi dari cart, bisa menggunakan method get
http://localhost:9999/user

Jika kita ingin melihat cart milik orang lain
http://localhost:9999/user/name
"Name" = nama username yg ingin kita lihat cartnya

Untuk melakukan payment, bisa menggunakan method post
http://localhost:9999/user

