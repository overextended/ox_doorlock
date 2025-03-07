CREATE TABLE
    IF NOT EXISTS `ox_doorlock` (
        `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
        `category` varchar(50) NOT NULL DEFAULT 'Uncategorized',
        `name` varchar(50) NOT NULL,
        `data` longtext NOT NULL,
        PRIMARY KEY (`id`)
    );
