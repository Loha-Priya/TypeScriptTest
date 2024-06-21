import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'
import assert from 'assert';
const bandNames:string[] = [];

Given(`the user opens the EA test application`, async () => {
console.log('Application launched successfully');
});

When(`the user validates the api request status`, async () => {
    await driver.pause(2000)
        const apiUrl = 'https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals'; // API endpoint URL
        const response = await fetch(apiUrl);
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                data.forEach((festival:any) => {
                    if (festival.bands) {
                        festival.bands.forEach((band: { name: never; }) => {
                            if (band.name) {
                                bandNames.push(band.name);
                            }
                        });
                    }
                });
            } else {
                throw new Error('API response is not an array: '+ data);
            }
        } else {
            throw new Error('API request failed: '+ response.status+' '+ response.statusText);
        }
   
});

When(`the user gets the request data from the api`, async () => {
    console.log(bandNames);
});

Then(`the data from API should be shown in the front end`, async () => {
    for (const iterator of bandNames) {
        await $((`//android.widget.TextView[@resource-id="com.energyaustralia.codingtestsample:id/titleTextView" and @text="xxx"]`).replace('xxx', iterator)).scrollIntoView()
        expect(await $((`//android.widget.TextView[@resource-id="com.energyaustralia.codingtestsample:id/titleTextView" and @text="xxx"]`).replace('xxx', iterator))).toBeDisplayedInViewport()
        console.log(iterator+': Validated');
        (await $("//android")).addValue
    }  
});
