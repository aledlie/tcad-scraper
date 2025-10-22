# TCAD Scraper

A web scraping tool built with Puppeteer and TypeScript for extracting property tax information from the Travis Central Appraisal District (TCAD) website.

## Overview

This project contains multiple implementations of a web scraper designed to automate the collection of property tax data. The scraper uses headless browser automation to search for properties and extract detailed information including owner names, property types, addresses, and assessed/appraised values.

## Features

- Automated property search using Puppeteer
- Extraction of comprehensive property data:
  - Owner name
  - Property type
  - City
  - Property address
  - Assessed value
  - Property ID
  - Appraised value
  - Geographic ID
  - Legal description
- HTML parsing with Cheerio for efficient data extraction
- Configurable browser window size
- Support for dynamic content loading

## Files

- **scraper.ts** - Main implementation targeting Travis CAD's staging environment
  - Uses Puppeteer with non-headless mode for debugging
  - Implements Cheerio for parsing search results
  - Filters empty results and outputs property data
  - Includes TODO items for additional features

- **scraper2.ts** - Alternative/experimental implementation
  - Basic Puppeteer setup example
  - Different target URL for testing purposes

- **scraper.js** / **scraper2.js** - Compiled JavaScript versions

- **tsconfig.json** - TypeScript configuration with ES5 target and CommonJS modules

- **results.png** - Screenshot of scraping results (debugging output)

## Usage

The scraper navigates to the TCAD property search page, enters a search query, waits for results to load, and extracts property information from the results table.

Example search flow:
1. Navigate to property search page
2. Enter search term (e.g., "dede")
3. Wait for results grid to load
4. Parse and extract property data using CSS selectors
5. Filter and output valid property records

## Dependencies

- puppeteer - Headless browser automation
- cheerio - HTML parsing and manipulation
- pending-xhr-puppeteer - XHR request tracking (referenced but not actively used)

## Development Notes

- TypeScript strict mode enabled with some relaxed settings
- Commented code includes plans for horizontal scrolling to load additional columns
- Browser instance remains open after scraping for debugging (close commented out)

## TODO

- Implement dynamic column extraction using a dictionary approach
- Handle scrolling to load all table columns
- Create reusable extraction helper function
- Clean up commented debugging code
