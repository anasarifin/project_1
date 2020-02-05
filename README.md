## Make a RESTful API for Point of Sales with Node.js and Express.js

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
