import { Meta, StoryFn } from '@storybook/react';

import { StoryHelperFactory } from '@etabli/.storybook/helpers';
import { AccessibilityPage } from '@etabli/src/app/(public)/(compliance)/accessibility/AccessibilityPage';
import { AsVisitor as PublicLayoutAsVisitorStory } from '@etabli/src/app/(public)/PublicLayout.stories';

type ComponentType = typeof AccessibilityPage;
const { generateMetaDefault, prepareStory } = StoryHelperFactory<ComponentType>();

export default {
  title: 'Pages/Accessibility',
  component: AccessibilityPage,
  ...generateMetaDefault({
    parameters: {},
  }),
} as Meta<ComponentType>;

const Template: StoryFn<ComponentType> = (args) => {
  return <AccessibilityPage />;
};

const NormalStory = Template.bind({});
NormalStory.args = {};
NormalStory.parameters = {};

export const Normal = prepareStory(NormalStory);

const WithLayoutStory = Template.bind({});
WithLayoutStory.args = {};
WithLayoutStory.parameters = {
  layout: 'fullscreen',
};

export const WithLayout = prepareStory(WithLayoutStory, {
  layoutStory: PublicLayoutAsVisitorStory,
});
