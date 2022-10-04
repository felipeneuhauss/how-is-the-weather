import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import WeatherForecast from '../components/WeatherForecast';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'components/WeatherForecast',
  component: WeatherForecast,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    forecast: { control: 'object' },
  },
} as ComponentMeta<typeof WeatherForecast>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof WeatherForecast> = (args) => <WeatherForecast {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  forecast: {
    id: '65UtGtWZzOKEDreTry2Mb',
    where: 'Lisbon, PT',
    when: 'Tue, 10/04',
    desc: 'Clear',
    temp: '22.35º',
    icon: '01n',
    nextDays: [{
      when: 'Wed, 10/05', desc: 'Clear', min: '18ºC', max: '27ºC', icon: '01d', id: 1664971200,
    }, {
      when: 'Thu, 10/06', desc: 'Clouds', min: '17ºC', max: '26ºC', icon: '04d', id: 1665057600,
    }, {
      when: 'Fri, 10/07', desc: 'Clouds', min: '19ºC', max: '27ºC', icon: '02d', id: 1665144000,
    }, {
      when: 'Sat, 10/08', desc: 'Clear', min: '20ºC', max: '29ºC', icon: '01d', id: 1665230400,
    }, {
      when: 'Sun, 10/09', desc: 'Clouds', min: '19ºC', max: '23ºC', icon: '04d', id: 1665316800,
    }, {
      when: 'Mon, 10/10', desc: 'Clouds', min: '18ºC', max: '22ºC', icon: '02d', id: 1665403200,
    }],
  },
};
