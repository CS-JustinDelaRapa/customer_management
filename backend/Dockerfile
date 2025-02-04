FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files first
COPY composer.json composer.lock ./

# Set composer environment
ENV COMPOSER_ALLOW_SUPERUSER=1

# Install composer dependencies
RUN composer install --no-scripts --no-autoloader

# Copy existing application directory
COPY . .

# Generate autoloader
RUN composer dump-autoload

# Change ownership of our applications
RUN chown -R www-data:www-data /var/www
