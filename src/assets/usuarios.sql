CREATE TABLE IF NOT EXISTS usuarios(
    nombre TEXT,
    fecha_nac TEXT,
    reside TEXT,
    email TEXT,
    descrip TEXT,
    imagen TEXT,
    usuario_id TEXT PRIMARY KEY,
);

-- INSERT INTO usuarios(nombre, fecha_nac, reside, email, descrip, imagen, usuario_id) VALUES ('Marie', '13/05/2001','Monterrey','a@gmail.com','i love minecraft','https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg','1');

/*
# iOS
ionic cordova build ios

# Android
ionic cordova build android

# Windows
ionic cordova build windows

----------------------------------

# iOS
ionic cordova run ios -l

# Android
ionic cordova run android -l

# Windows
ionic cordova run windows -l
*/
