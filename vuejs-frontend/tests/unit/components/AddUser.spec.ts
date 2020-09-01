import { shallowMount, createLocalVue } from "@vue/test-utils";
import Buefy from "buefy";
import AddUser from "@/components/AddUser.vue";
import AddUserModal from "@/components/AddUserModal.vue";

const localVue = createLocalVue();
localVue.use(Buefy);

describe(AddUser.name + " component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should open and close modal.", async () => {
    const wrapper = shallowMount(AddUser, { localVue });

    expect(wrapper.findComponent(AddUserModal).exists()).toBeFalsy();

    await wrapper.find("button").trigger("click");

    expect(wrapper.findComponent(AddUserModal).exists()).toBeTruthy();

    await wrapper.findComponent(AddUserModal).vm.$emit("close");

    expect(wrapper.findComponent(AddUserModal).exists()).toBeFalsy();

    expect(wrapper).toMatchSnapshot();
  });
});
