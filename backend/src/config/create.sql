-- 고객 테이블 (customers)
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) UNIQUE,
    address VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 일정 테이블 (schedules)
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL, -- 날짜 형식은 DATE 또는 DATETIME 사용 (타입스크립트 'string'에서 유추)
    customerId INT NOT NULL,
    description TEXT,
    memo TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(id) ON DELETE CASCADE
);

-- 예약 테이블 (reservations)
CREATE TABLE reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    region VARCHAR(100) NOT NULL,
    meetingDate DATE NOT NULL, -- 날짜 형식
    meetingTime VARCHAR(50) NOT NULL, -- 시간 형식
    meetingPlace VARCHAR(255) NOT NULL,
    manager VARCHAR(255) NOT NULL,
    reservationMaker VARCHAR(255) NOT NULL,
    reservationMakerContact VARCHAR(255) NOT NULL,
    importantDocs TEXT,
    currencyInfo VARCHAR(100),
    otherItems TEXT,
    memo TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);