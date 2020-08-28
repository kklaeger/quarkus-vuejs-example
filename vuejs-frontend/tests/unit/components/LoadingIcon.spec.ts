import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";
import LoadingIcon from "@/components/LoadingIcon.vue";

const localVue = createLocalVue();
localVue.use(Buefy);

describe(LoadingIcon.name + " component", () => {
  it("should render successfully.", () => {
    const wrapper = shallowMount(LoadingIcon, { localVue });
    expect(wrapper).toMatchSnapshot();
  });
});
