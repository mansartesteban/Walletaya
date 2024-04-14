import { ref } from "vue";

const settings = ref({
  defaultTokenFrom: "tether",
  defaultTokenTo: "tether",
  defaultCurrency: "€",
  leftHanded: false,
});

export default () => {
  return settings.value;
};

/*

A11y:
- Right-handed/Left-handed :
  - Permits to modify interface actions to provide a better user experience
  - Exemple : When modify and delete buttons a next to each other, the delete button will be placed the farest to the main hand of the user to avoid misstouches 
 */
