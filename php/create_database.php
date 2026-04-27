<?php

$mysqli = new mysqli("db", "usuario", getenv('MYSQL_PASSWORD'), "ayuntamiento");

if ($mysqli->connect_errno) {
    die("Error connecting to database: " . $mysqli->connect_errno);
}

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$mysqli->set_charset("utf8mb4");

echo "Creating tables...<br>";

function removeTables()
{
    global $mysqli;

    $tables = ["comments", "news_images", "news", "municipios"];

    foreach ($tables as $tableName) {
        $dropQuery = "DROP TABLE IF EXISTS $tableName";

        if ($mysqli->query($dropQuery) === TRUE) {
            echo "Table $tableName dropped successfully<br>";
        } else {
            echo "Error dropping table $tableName: " . $mysqli->error . "<br>";
        }
    }
}

removeTables();

$query = "
CREATE TABLE news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    content TEXT NOT NULL,
    municipality VARCHAR(255) NOT NULL
);

CREATE TABLE news_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    news_id INT NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE
);

CREATE TABLE municipios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
";

if ($mysqli->multi_query($query) === TRUE) {
    echo "Tables created successfully<br>";

    while ($mysqli->more_results() && $mysqli->next_result()) {
        // Limpia resultados pendientes
    }
} else {
    die("Error creating the tables: " . $mysqli->error);
}

echo "<br>Inserting data...<br>";

$query = "
INSERT INTO news (title, created_at, content, municipality) VALUES
(
    'Nueva programación cultural de primavera',
    '2026-04-01 10:00:00',
    'El Ayuntamiento ha presentado la nueva programación cultural de primavera, que incluirá conciertos, exposiciones, talleres infantiles y actividades para mayores. Las actividades se celebrarán en distintos espacios municipales durante los próximos meses.',
    'Granada'
),
(
    'Cortes de tráfico por obras en la plaza principal',
    '2026-04-03 09:30:00',
    'El Ayuntamiento informa de cortes temporales de tráfico debido a las obras de mejora del pavimento en la plaza principal. Se habilitarán rutas alternativas y se recomienda a los vecinos planificar sus desplazamientos con antelación.',
    'Granada'
),

(
    'Abierto el plazo de inscripción para actividades deportivas',
    '2026-04-05 12:15:00',
    'Ya está abierto el plazo de inscripción para las actividades deportivas municipales. La oferta incluye fútbol, baloncesto, natación, gimnasia de mantenimiento y actividades al aire libre para todas las edades.',
    'Granada'
),
(
    'El mercado municipal amplía su horario',
    '2026-04-07 08:45:00',
    'El mercado municipal amplía su horario de apertura con el objetivo de facilitar las compras a los vecinos. La medida se aplicará durante los fines de semana y días festivos especiales.',
    'Granada'
);

INSERT INTO news_images (news_id, image_url) VALUES
(
    2,
    '../../../img/atasco.jpeg'
),
(
    2,
    '../../../img/trafico.jpeg'
),
(
    1,
    '../../../img/cultura.jpeg'
),
(
    3,
    '../../../img/deportes.jpeg'
);

INSERT INTO comments (news_id, username, email, content, created_at) VALUES
(
    1,
    'Pepe',
    'pepe@gmail.com',
    'Me parece una iniciativa muy buena para fomentar la cultura en el municipio.',
    '2026-04-01 11:20:00'
),
(
    1,
    'María',
    'maria@gmail.com',
    'Estaría bien que publicaran también el calendario completo de actividades.',
    '2026-04-01 12:10:00'
),
(
    2,
    'Juan',
    'juan@gmail.com',
    'Gracias por avisar de los cortes de tráfico. Sería útil poner señalización con tiempo.',
    '2026-04-03 10:05:00'
),
(
    2,
    'Maria',
    'maria@gmail.com',
    'Cuanto tiempo durarán los cortes de tráfico? Es importante para planificar mis desplazamientos.',
    '2026-04-05 12:23:00'
),
(
    3,
    'Lucía',
    'lucia@gmail.com',
    '¿Las actividades deportivas tendrán plazas limitadas?',
    '2026-04-05 13:00:00'
);

INSERT INTO municipios (name) VALUES
('Granada'),
('Armilla'),
('Maracena'),
('Albolote'),
('Atarfe'),
('La Zubia'),
('Ogíjares');
";

if ($mysqli->multi_query($query) === TRUE) {
    while ($mysqli->more_results() && $mysqli->next_result()) {
        // Limpia resultados pendientes
    }

    echo "Data inserted successfully";
} else {
    echo "Error inserting data: " . $mysqli->error;
}

echo "<br>Database setup complete";

$mysqli->close();
