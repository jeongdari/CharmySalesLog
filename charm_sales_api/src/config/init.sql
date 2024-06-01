-- Drop and create the database
DROP DATABASE IF EXISTS saleslog;
CREATE DATABASE saleslog;
USE saleslog;

-- Create Users table
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- Encrypted
    email VARCHAR(255),
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Sales table
CREATE TABLE Sales (
    sale_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    card_payment_amt DECIMAL(10, 2) NOT NULL,
    cash_payment_amt DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_sales_date (date) -- Ensure only one sales record per day
);

-- Create WeeklyAggregatedSales table
CREATE TABLE WeeklyAggregatedSales (
    week_year INT NOT NULL, -- Format: YYYYWW
    total_sales DECIMAL(10, 2) NOT NULL,
    average_daily_sales DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (week_year)
);

-- Create MonthlyAggregatedSales table
CREATE TABLE MonthlyAggregatedSales (
    month_year CHAR(7) NOT NULL, -- Format: YYYY-MM
    total_sales DECIMAL(10, 2) NOT NULL,
    average_daily_sales DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (month_year)
);

-- Procedure to populate WeeklyAggregatedSales
DELIMITER //

CREATE PROCEDURE PopulateWeeklyAggregatedSales()
BEGIN
    DELETE FROM WeeklyAggregatedSales;

    INSERT INTO WeeklyAggregatedSales (week_year, total_sales, average_daily_sales)
    SELECT 
        YEAR(date) * 100 + WEEK(date, 3) AS week_year,
        SUM(card_payment_amt + cash_payment_amt) AS total_sales,
        SUM(card_payment_amt + cash_payment_amt) / COUNT(DISTINCT DATE(date)) AS average_daily_sales
    FROM Sales
    GROUP BY week_year;
END //

DELIMITER ;

-- Procedure to populate MonthlyAggregatedSales
DELIMITER //

CREATE PROCEDURE PopulateMonthlyAggregatedSales()
BEGIN
    DELETE FROM MonthlyAggregatedSales;

    INSERT INTO MonthlyAggregatedSales (month_year, total_sales, average_daily_sales)
    SELECT 
        DATE_FORMAT(date, '%Y-%m') AS month_year,
        SUM(card_payment_amt + cash_payment_amt) AS total_sales,
        SUM(card_payment_amt + cash_payment_amt) / COUNT(DISTINCT DATE(date)) AS average_daily_sales
    FROM Sales
    GROUP BY month_year;
END //

DELIMITER ;

-- Triggers to call the procedures after insert
DELIMITER //

CREATE TRIGGER after_sales_insert
AFTER INSERT ON Sales
FOR EACH ROW
BEGIN
    CALL PopulateWeeklyAggregatedSales();
    CALL PopulateMonthlyAggregatedSales();
END; //

DELIMITER ;