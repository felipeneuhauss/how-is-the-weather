## Intro

All resources added in this project are initial concepts to highlight all NextJS frontend ecosystem.
Only few forecasts attributes were used for this test.

Live project -> [https://how-is-the-weather-utjt.vercel.app/](https://how-is-the-weather-utjt.vercel.app/)


## Getting Started
1. Firstly, This project loads places from google maps API. In order to test it locally please install this [chrome CORS extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)


2. Secondly, rename de file .env.example to .env.local

```env
OPEN_WEATHER_MAP_API_KEY=
OPEN_WEATHER_MAP_API_URL_COORD=https://api.openweathermap.org/data/3.0/onecall?
OPEN_WEATHER_MAP_API_URL_CITY=http://api.openweathermap.org/geo/1.0/direct?
OPEN_WEATHER_MAP_API_URL_CITY_REVERSE=http://api.openweathermap.org/geo/1.0/reverse?
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
```
3. And then
```bash
yarn install
#  and after that
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## E2E Tests

To run the tests locally:

```bash
yarn run dev
# and 
yarn run cypress
```

## Storybook

Storybook is a JavaScript tool that allows developers to create organized 
UI systems making both the building process and documentation more 
efficient and easier to use - [Reference here](https://www.freecodecamp.org/news/what-is-storybook-and-how-can-i-use-it-to-create-a-component-libary-in-react/)

A simple story was added as example using the WeatherForecast component. 
The idea is to add every new component here in order to track them.

```bash
yarn storybook
```

Open [http://localhost:6006/](http://localhost:6006/) with your browser to see the result.

![Storybook](./docs/storybook.png)

### CI/CD

The Github Actions are defined as the CI/CD process.
_Cypress tests_ and the _[Lighthouse](https://github.com/GoogleChrome/lighthouse-ci) evaluation_ run every push in the main branch

*For the next project version, assertions can be defined for Lighthouse in order to avoid any Core Web Vitals regressions*

![Storybook](./docs/cicd.png)

## TODOS
- [x] Get user location
- [x] Save locations on cookies
- [x] Get current weather
- [x] Create component to show the weather
- [x] Autocomplete google search
- [x] Get city weather
- [x] Create component to show the weather
- [x] Get weather by city
- [x] Save the users cities - cookies
- [x] Load cities after reload
- [x] Invalidate page after 60 minutes?
- [x] Add storybook
- [x] Add github cicd
- [x] Add lighthouse
- [x] Add cypress tests
- [ ] Add Docker

## Timesheet

The whole time spent in this project is related in the report bellow or in this [ink](https://wakatime.com/@ca63550e-cc01-4bb5-8f08-3b1c43419b28/projects/calxdoamwv?start=2022-09-28&end=2022-10-04)

![Wakatime](./docs/time.png)
