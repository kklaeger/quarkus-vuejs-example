import { shallowMount } from "@vue/test-utils";
import Header from "@/components/Header.vue";

describe(Header.name + " component", () => {
  it("should render successfully.", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper).toMatchSnapshot();
  });
});
