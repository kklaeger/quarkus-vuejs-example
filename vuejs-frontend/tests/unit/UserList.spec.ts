import { shallowMount } from "@vue/test-utils";
import UserList from "@/components/UserList.vue";

describe(UserList.name + " component", () => {
  it("should render successfully.", () => {
    const wrapper = shallowMount(UserList);
    expect(wrapper).toMatchSnapshot();
  });
});
