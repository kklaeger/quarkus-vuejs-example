import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";
import UserListElement from "@/components/UserListElement.vue";
import { User } from "@/models/User";

const localVue = createLocalVue();
localVue.use(Buefy);

describe(UserListElement.name + " component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render successfully.", () => {
    const user: User = { id: 1, name: "Test" };

    const wrapper = shallowMount(UserListElement, {
      localVue,
      propsData: { user }
    });

    expect(wrapper.text()).toMatch("Test");
    expect(wrapper).toMatchSnapshot();
  });
});
