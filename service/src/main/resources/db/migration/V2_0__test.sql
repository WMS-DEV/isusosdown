SCREATE TABLE IF NOT EXISTS `test`
(
    `id`
    int
    NOT
    NULL
    AUTO_INCREMENT
    PRIMARY
    KEY,
    `name`
    varchar
(
    20
),
    `email` varchar
(
    50
),
    `date_of_birth` timestamp

    ) ENGINE=InnoDB DEFAULT CHARSET=UTF8;