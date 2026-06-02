# Hunting Shop Product Requirements Document

## Project Overview

Build a modern, fast, mobile-first hunting equipment catalog website similar to Huberts.lv but with significantly improved user experience, navigation, speed, and maintainability.

The website is NOT an e-commerce store initially. Customers cannot purchase products online. Instead, they can submit product inquiries or order requests.

The website must be easy for non-technical staff to manage through Google Sheets without requiring developer involvement.

---

# Main Goals

1. Extremely fast website (Google PageSpeed 90+ mobile).
2. Excellent mobile experience.
3. Easy category navigation.
4. Easy product search.
5. Google Sheets-based product management.
6. Inquiry/order request system.
7. SEO optimized.
8. Future-ready for full e-commerce expansion.

---

# Target Users

## Primary

* Hunters
* Sport shooters
* Outdoor enthusiasts

## Secondary

* Professional hunting organizations
* Hunting clubs
* Government and security customers

---

# Design Requirements

## Style

Premium hunting and outdoor aesthetic.

Design should feel:

* Professional
* Rugged
* Premium
* Trustworthy

Avoid:

* Outdated ecommerce themes
* Cluttered interfaces
* Excessive animations
* Slow page transitions

---

# Color Palette

Primary:

* Dark forest green
* Dark charcoal

Secondary:

* Khaki
* Sand
* Earth tones

Accent:

* Orange (call-to-action buttons)

Background:

* White or very light gray

---

# Typography

Modern and highly readable.

Desktop:

* Large headings
* Comfortable spacing

Mobile:

* Large touch-friendly interface
* Minimum 16px body text

---

# Website Structure

## Homepage

Sections:

1. Hero banner
2. Main categories
3. Featured products
4. Featured brands
5. New arrivals
6. Promotions
7. About company
8. Contact section

---

## Categories

Examples:

### Weapons

Subcategories:

* Rifles
* Shotguns
* Handguns
* Air Rifles

### Ammunition

Subcategories:

* Rifle Ammunition
* Shotgun Ammunition
* Handgun Ammunition

### Optics

Subcategories:

* Scopes
* Binoculars
* Thermal Optics
* Night Vision
* Rangefinders

### Hunting Equipment

Subcategories:

* Knives
* Bags
* Backpacks
* Cleaning Kits
* Hunting Accessories

### Clothing

Subcategories:

* Jackets
* Pants
* Boots
* Gloves
* Hats

### Brands

Brand listing page.

---

# Navigation Requirements

Maximum navigation depth:

Home → Category → Product

No more than 3 clicks.

Requirements:

* Sticky header
* Mega menu on desktop
* Slide-out menu on mobile
* Breadcrumbs
* Search always visible

---

# Product Listing Page

Features:

* Grid layout
* Large product images
* Fast loading
* Filters

Filters:

* Category
* Brand
* Price Range
* Availability
* Product Type

Sorting:

* Newest
* Name
* Price

---

# Product Detail Page

Must include:

* Product name
* Main image
* Image gallery
* Description
* Technical specifications
* Brand
* Category
* Product code
* Availability status

Buttons:

* Request Product
* Ask Question

No shopping cart.

No payment processing.

No checkout.

---

# Search

Critical feature.

Requirements:

* Instant search
* Search products
* Search brands
* Search categories

Results should appear while typing.

Target response:
< 300ms

---

# Product Inquiry System

Instead of checkout:

Button:
"Request Product"

Form fields:

* Name
* Phone
* Email
* Product
* Message

When submitted:

1. Send email to store Gmail.
2. Save request in Google Sheet.
3. Show success confirmation.

---

# Product Management System

## Main Requirement

Store employees must manage everything using Google Sheets.

No admin panel required initially.

---

# Google Sheet Structure

Sheet: Categories

Columns:

* Category ID
* Category Name
* Parent Category
* Sort Order
* Active

---

Sheet: Brands

Columns:

* Brand ID
* Brand Name
* Logo URL
* Active

---

Sheet: Products

Columns:

* Product ID
* Product Name
* SKU
* Category ID
* Brand ID
* Price
* Description
* Specifications
* Main Image URL
* Gallery URLs
* Availability
* Featured
* Active

---

Sheet: Orders

Columns:

* Date
* Product
* Name
* Phone
* Email
* Message
* Status

---

# Synchronization

Requirements:

Website automatically syncs with Google Sheets.

Update interval:
Every 5 minutes.

Changes should appear automatically.

No deployment required.

No coding required.

---

# Image Management

Images stored in:

Preferred:

* Cloudinary

Alternative:

* Google Drive

Google Sheet stores image URLs.

---

# SEO Requirements

Every product page must have:

* SEO title
* SEO description
* Structured data
* Open Graph metadata

Generate sitemap automatically.

Generate robots.txt automatically.

---

# Performance Requirements

Mobile PageSpeed:
90+

Desktop PageSpeed:
95+

Largest Contentful Paint:
< 2 seconds

First Contentful Paint:
< 1.5 seconds

Image optimization required.

Lazy loading required.

---

# Technical Stack

Frontend:
Next.js

Styling:
Tailwind CSS

Hosting:
Vercel

Data Source:
Google Sheets API

Images:
Cloudinary

Email:
Gmail API

Forms:
Google Sheets + Gmail

---

# Future Features (Not in MVP)

Phase 2:

* Shopping cart
* Online payments
* Customer accounts
* Order history
* Inventory management
* ERP integration
* Supplier integration

Architecture must support future expansion without rebuilding the website.

---

# Success Criteria

1. Non-technical employee can add a new product in under 2 minutes.
2. Product appears on website automatically.
3. Customer can find any product within 3 clicks.
4. Mobile PageSpeed score above 90.
5. Inquiry requests are delivered to both Gmail and Google Sheets.
6. Website feels modern, premium, and faster than competitors.
